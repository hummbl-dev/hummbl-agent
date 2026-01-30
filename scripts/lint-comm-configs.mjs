import { readFileSync } from "node:fs";

function fail(msg) {
  console.error(`[FAIL] ${msg}`);
  process.exit(1);
}

function guard(path) {
  const cfg = JSON.parse(readFileSync(path, "utf8"));
  if (cfg.enabled === true) fail(`${path}: enabled must remain false in committed config`);
  if (cfg.dry_run === false) fail(`${path}: dry_run must remain true in committed config`);
  if (!Array.isArray(cfg.allowed_channel_ids)) fail(`${path}: allowed_channel_ids must be an array`);
}

guard("configs/moltbot/communication.slack.json");
guard("configs/moltbot/communication.discord.json");
console.log("[OK] committed communication configs remain disabled and dry-run");
