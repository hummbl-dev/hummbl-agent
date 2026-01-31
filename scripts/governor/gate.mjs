import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv/dist/2019.js";

const args = process.argv.slice(2);
const parsed = {
  root: "",
  cmd: "",
  runner: "",
  cwd: "",
  date: "",
  freezeAck: "false",
  cmdArgs: []
};

let inCmdArgs = false;
for (let i = 0; i < args.length; i += 1) {
  const token = args[i];
  if (token === "--") {
    inCmdArgs = true;
    continue;
  }
  if (inCmdArgs) {
    parsed.cmdArgs.push(token);
    continue;
  }
  switch (token) {
    case "--root":
      parsed.root = args[i + 1] ?? "";
      i += 1;
      break;
    case "--cmd":
      parsed.cmd = args[i + 1] ?? "";
      i += 1;
      break;
    case "--runner":
      parsed.runner = args[i + 1] ?? "";
      i += 1;
      break;
    case "--cwd":
      parsed.cwd = args[i + 1] ?? "";
      i += 1;
      break;
    case "--date":
      parsed.date = args[i + 1] ?? "";
      i += 1;
      break;
    case "--freeze-ack":
      parsed.freezeAck = args[i + 1] ?? "false";
      i += 1;
      break;
    default:
      throw new Error(`Unknown argument: ${token}`);
  }
}

if (!parsed.root || !parsed.cmd || !parsed.runner || !parsed.cwd || !parsed.date) {
  throw new Error("Missing required governor gate arguments");
}

const freezeAck = parsed.freezeAck === "true";
const rootDir = parsed.root;
const allowlistPath = path.join(rootDir, "configs", "process-policy.allowlist");
const requestDir = path.join(rootDir, "_state", "governor", "requests");
const decisionDir = path.join(rootDir, "_state", "governor", "decisions");

const requestId = crypto.randomUUID();
const decisionId = crypto.randomUUID();
const timestamp = new Date().toISOString();

const repoContext = (() => {
  const fallback = { repo: "unknown", branch: "unknown", commit: "unknown" };
  try {
    const repoRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
      cwd: rootDir,
      encoding: "utf8"
    }).trim();
    const repoName = path.basename(repoRoot);
    const branch = execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
      cwd: rootDir,
      encoding: "utf8"
    }).trim();
    const commit = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: rootDir,
      encoding: "utf8"
    }).trim();
    return { repo: repoName, branch, commit };
  } catch {
    return fallback;
  }
})();

const request = {
  schema_version: "1.0.0",
  request_id: requestId,
  timestamp,
  requesting_agent: {
    id: "scripts/run-cmd.sh",
    type: "execution"
  },
  supervisor: "HUMMBL_GOVERNOR",
  declared_intent: "Run a governed command via scripts/run-cmd.sh",
  proposed_actions: [
    {
      action: `execute_command:${parsed.cmd}`,
      scope: `runner:${parsed.runner}`
    }
  ],
  artifacts: [
    {
      id: "process_policy_allowlist",
      type: "file",
      ref: "configs/process-policy.allowlist"
    },
    {
      id: "runner_dispatch",
      type: "file",
      ref: "scripts/run-cmd.sh"
    }
  ],
  repo_context: repoContext,
  freeze_status_acknowledgment: freezeAck
};

fs.mkdirSync(requestDir, { recursive: true });
fs.mkdirSync(decisionDir, { recursive: true });

const requestPath = path.join(requestDir, `request_${requestId}.json`);
const requestHashPath = path.join(requestDir, `request_${requestId}.sha256`);
if (fs.existsSync(requestPath)) {
  throw new Error(`Request path already exists: ${requestPath}`);
}

const ajv = new Ajv({ strict: false, validateFormats: false });
const requestSchemaPath = path.join(rootDir, "schemas", "inter_agent_request.schema.json");
const decisionSchemaPath = path.join(rootDir, "schemas", "governor_decision_record.schema.json");
const requestSchema = JSON.parse(fs.readFileSync(requestSchemaPath, "utf8"));
const decisionSchema = JSON.parse(fs.readFileSync(decisionSchemaPath, "utf8"));

const validateRequest = ajv.compile(requestSchema);
if (!validateRequest(request)) {
  throw new Error(`Request schema validation failed: ${ajv.errorsText(validateRequest.errors)}`);
}

fs.writeFileSync(requestPath, JSON.stringify(request, null, 2) + "\n", "utf8");
const requestHash = crypto.createHash("sha256").update(JSON.stringify(request)).digest("hex");
fs.writeFileSync(requestHashPath, `${requestHash}  ${path.basename(requestPath)}\n`, "utf8");

let decision = null;
const externalDecisionPath = process.env.HUMMBL_GOVERNOR_DECISION_JSON;
if (externalDecisionPath && fs.existsSync(externalDecisionPath)) {
  decision = JSON.parse(fs.readFileSync(externalDecisionPath, "utf8"));
} else {
  let reason = "AUTHORIZED";
  let violatedRule = "NONE";
  let decisionValue = "AUTHORIZE";
  let haltRequired = false;
  const constraints = ["SAFE_PATH_ONLY", "ALLOWLIST_ONLY", "REPO_CWD_ONLY"];

  if (!freezeAck) {
    decisionValue = "DENY";
    reason = "FREEZE_ACK_REQUIRED";
    violatedRule = "FREEZE_STATUS_MISSING";
    haltRequired = true;
  } else if (!fs.existsSync(allowlistPath)) {
    decisionValue = "DENY";
    reason = "ALLOWLIST_MISSING";
    violatedRule = "PROCESS_POLICY_ALLOWLIST";
    haltRequired = true;
  } else {
    const allowlist = fs
      .readFileSync(allowlistPath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.replace(/#.*/, "").trim())
      .filter(Boolean);
    if (!allowlist.includes(parsed.cmd)) {
      decisionValue = "DENY";
      reason = "COMMAND_NOT_ALLOWLISTED";
      violatedRule = "PROCESS_POLICY_ALLOWLIST";
      haltRequired = true;
    }
  }

  decision = {
    schema_version: "1.0.0",
    decision_id: decisionId,
    request_id: requestId,
    timestamp,
    governor: "HUMMBL_GOVERNOR",
    decision: decisionValue,
    action: `execute_command:${parsed.cmd}`,
    reason,
    violated_rule: violatedRule,
    constraints,
    halt_required: haltRequired
  };
}

const validateDecision = ajv.compile(decisionSchema);
if (!validateDecision(decision)) {
  throw new Error(`Decision schema validation failed: ${ajv.errorsText(validateDecision.errors)}`);
}

const decisionPath = path.join(decisionDir, `decision_${decision.decision_id}.json`);
if (fs.existsSync(decisionPath)) {
  throw new Error(`Decision path already exists: ${decisionPath}`);
}
fs.writeFileSync(decisionPath, JSON.stringify(decision, null, 2) + "\n", "utf8");

if (decision.decision !== "AUTHORIZE") {
  console.error(`Decision ${decision.decision}: ${decision.reason}`);
  console.error(`Decision record: ${decisionPath}`);
  process.exit(2);
}

console.log(`Decision record: ${decisionPath}`);
