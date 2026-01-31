import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import assert from "node:assert/strict";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../..");
const scriptPath = path.join(repoRoot, "scripts", "run-cmd.sh");

const listFiles = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir) : []);

test("denies execution when freeze acknowledgment is false", () => {
  const date = "2099-01-01";
  const runDir = path.join(repoRoot, "_state", "runs", date);
  const decisionDir = path.join(repoRoot, "_state", "governor", "decisions");
  const requestDir = path.join(repoRoot, "_state", "governor", "requests");

  const decisionsBefore = listFiles(decisionDir).length;
  const requestsBefore = listFiles(requestDir).length;

  const result = spawnSync(
    "bash",
    [
      scriptPath,
      "--runner",
      "codex",
      "--date",
      date,
      "--name",
      "deny-test",
      "--freeze-ack",
      "false",
      "--",
      "git",
      "status",
      "--porcelain"
    ],
    { cwd: repoRoot, encoding: "utf8" }
  );

  assert.notEqual(result.status, 0, "expected denial to exit non-zero");
  assert.ok(fs.existsSync(decisionDir), "decision directory should exist");
  assert.ok(fs.existsSync(requestDir), "request directory should exist");

  const decisionsAfter = listFiles(decisionDir);
  const requestsAfter = listFiles(requestDir);
  assert.equal(decisionsAfter.length, decisionsBefore + 1, "decision record should be persisted");
  assert.equal(requestsAfter.length, requestsBefore + 2, "request record + hash should be persisted");

  const latestDecisionPath = path.join(decisionDir, decisionsAfter.sort().slice(-1)[0]);
  const decision = JSON.parse(fs.readFileSync(latestDecisionPath, "utf8"));
  assert.equal(decision.decision, "DENY");
  assert.equal(decision.halt_required, true);

  assert.ok(!fs.existsSync(runDir), "no run artifacts should be created");
});
