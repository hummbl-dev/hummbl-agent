import { readFileSync } from "node:fs";

function fail(msg) {
  console.error(`[FAIL] ${msg}`);
  process.exit(1);
}

const cfg = JSON.parse(readFileSync("configs/moltbot/llm.anthropic.json", "utf8"));

if (cfg.enabled === true) fail("configs/moltbot/llm.anthropic.json: enabled must remain false");
if (cfg.dry_run === false) fail("configs/moltbot/llm.anthropic.json: dry_run must remain true");

console.log("[OK] committed LLM config remains disabled + dry_run");
