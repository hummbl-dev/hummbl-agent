import test from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, unlinkSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../../../..");
const LOCAL_CFG = join(REPO_ROOT, "configs/moltbot/communication.slack.local.json");

const require = createRequire(import.meta.url);
const slack = require(join(REPO_ROOT, "packages/adapters/communication/slack/send-message.cjs"));

function writeLocal(cfg) {
  writeFileSync(LOCAL_CFG, JSON.stringify(cfg, null, 2) + "\n", "utf8");
}

function removeLocal() {
  if (existsSync(LOCAL_CFG)) unlinkSync(LOCAL_CFG);
}

test("slack: config_disabled when baseline config remains disabled", async () => {
  removeLocal();
  delete process.env.MOLTBOT_LIVE_SEND;
  delete process.env.MOLTBOT_SLACK_BOT_TOKEN;

  const res = await slack.run({
    channel_id: "C123",
    text: "hello",
    tuple_sha256: "0".repeat(64)
  });

  assert.equal(res.ok, false);
  assert.equal(res.error, "config_disabled");
});

test("slack: channel_not_allowed when allowlist missing channel", async () => {
  removeLocal();
  writeLocal({
    enabled: true,
    dry_run: true,
    allowed_channel_ids: ["C999"],
    token_env: "MOLTBOT_SLACK_BOT_TOKEN",
    timeout_ms: 8000
  });

  const res = await slack.run({
    channel_id: "C123",
    text: "hello",
    tuple_sha256: "1".repeat(64)
  });

  assert.equal(res.ok, false);
  assert.equal(res.error, "channel_not_allowed");

  removeLocal();
});

test("slack: dry_run success without env tokens", async () => {
  removeLocal();
  writeLocal({
    enabled: true,
    dry_run: true,
    allowed_channel_ids: ["C123"],
    token_env: "MOLTBOT_SLACK_BOT_TOKEN",
    timeout_ms: 8000
  });

  delete process.env.MOLTBOT_LIVE_SEND;
  process.env.MOLTBOT_SLACK_BOT_TOKEN = "x";

  const res = await slack.run({
    channel_id: "C123",
    text: "hello",
    thread_ts: "1700000000.000001",
    tuple_sha256: "2".repeat(64)
  });

  assert.equal(res.ok, true);
  assert.equal(res.mode, "dry_run");
  assert.equal(res.channel_id, "C123");
  assert.equal(res.tuple_sha256, "2".repeat(64));

  removeLocal();
  delete process.env.MOLTBOT_SLACK_BOT_TOKEN;
});

test("slack: live_guard_disabled when env guard absent", async () => {
  removeLocal();
  writeLocal({
    enabled: true,
    dry_run: false,
    allowed_channel_ids: ["C123"],
    token_env: "MOLTBOT_SLACK_BOT_TOKEN",
    timeout_ms: 8000
  });

  process.env.MOLTBOT_LIVE_SEND = "0";
  process.env.MOLTBOT_SLACK_BOT_TOKEN = "x";

  const res = await slack.run({
    channel_id: "C123",
    text: "hello",
    tuple_sha256: "3".repeat(64)
  });

  assert.equal(res.ok, false);
  assert.equal(res.error, "live_guard_disabled");
  assert.equal(res.mode, "dry_run");

  removeLocal();
  delete process.env.MOLTBOT_LIVE_SEND;
  delete process.env.MOLTBOT_SLACK_BOT_TOKEN;
});

test("slack: auth_missing when guard enabled without token", async () => {
  removeLocal();
  writeLocal({
    enabled: true,
    dry_run: false,
    allowed_channel_ids: ["C123"],
    token_env: "MOLTBOT_SLACK_BOT_TOKEN",
    timeout_ms: 8000
  });

  process.env.MOLTBOT_LIVE_SEND = "1";
  delete process.env.MOLTBOT_SLACK_BOT_TOKEN;

  const res = await slack.run({
    channel_id: "C123",
    text: "hello",
    tuple_sha256: "4".repeat(64)
  });

  assert.equal(res.ok, false);
  assert.equal(res.error, "auth_missing");

  removeLocal();
  delete process.env.MOLTBOT_LIVE_SEND;
});
