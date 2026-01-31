import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import assert from "node:assert/strict";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../..");
const scriptPath = path.join(repoRoot, "scripts", "run-cmd.sh");

const extractDecisionPath = (output) => {
  const match = output.match(/Decision record:\s*(\S+)/);
  return match ? match[1] : null;
};

test("authorizes execution when freeze acknowledgment is true", () => {
  const date = "2099-01-01";
  const runDir = path.join(repoRoot, "_state", "runs", date);
  const decisionDir = path.join(repoRoot, "_state", "governor", "decisions");
  const requestDir = path.join(repoRoot, "_state", "governor", "requests");

  const result = spawnSync(
    "bash",
    [
      scriptPath,
      "--runner",
      "codex",
      "--date",
      date,
      "--name",
      "allow-test",
      "--freeze-ack",
      "true",
      "--",
      "git",
      "status",
      "--porcelain"
    ],
    { cwd: repoRoot, encoding: "utf8" }
  );

  assert.equal(result.status, 0, "expected authorize to exit zero");

  const decisionPath = extractDecisionPath(result.stdout);
  assert.ok(decisionPath, "decision record path should be reported");
  assert.ok(fs.existsSync(decisionPath), "decision record should exist");

  const decision = JSON.parse(fs.readFileSync(decisionPath, "utf8"));
  assert.equal(decision.decision, "AUTHORIZE");
  assert.equal(decision.halt_required, false);
  assert.ok(decision.constraints.includes("ALLOWLIST_ONLY"));
  assert.ok(decision.constraints.includes("REPO_CWD_ONLY"));
  const requestPath = path.join(requestDir, `request_${decision.request_id}.json`);
  const requestHashPath = path.join(requestDir, `request_${decision.request_id}.sha256`);
  assert.ok(fs.existsSync(requestPath), "request record should be persisted");
  assert.ok(fs.existsSync(requestHashPath), "request hash should be persisted");

  assert.ok(fs.existsSync(runDir), "run artifacts directory should be created");

  fs.rmSync(decisionPath);
  fs.rmSync(requestPath);
  fs.rmSync(requestHashPath);
  fs.rmSync(runDir, { recursive: true, force: true });
});
