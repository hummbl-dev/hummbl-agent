import test from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, unlinkSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../../../..");
const LOCAL_CFG = join(REPO_ROOT, "configs/moltbot/llm.openai.local.json");

const require = createRequire(import.meta.url);
const call = require(join(REPO_ROOT, "packages/adapters/llm/openai/call.cjs"));

function writeLocal(cfg) {
  writeFileSync(LOCAL_CFG, JSON.stringify(cfg, null, 2) + "\n", "utf8");
}
function removeLocal() {
  if (existsSync(LOCAL_CFG)) unlinkSync(LOCAL_CFG);
}

const tuple = "a".repeat(64);

function baseInput(extra = {}) {
  return {
    purpose: "plan",
    prompt: "hello",
    tuple_sha256: tuple,
    ...extra
  };
}

test("openai: config_disabled by default", async () => {
  removeLocal();
  delete process.env.MOLTBOT_LIVE_LLM_CALLS;
  delete process.env.MOLTBOT_OPENAI_API_KEY;
  const res = await call.run(baseInput());
  assert.equal(res.ok, false);
  assert.equal(res.error, "config_disabled");
});

test("openai: model_not_allowed when allowlist empty", async () => {
  removeLocal();
  writeLocal({ enabled: true, dry_run: true, allowed_models: [] });
  const res = await call.run(baseInput());
  assert.equal(res.ok, false);
  assert.equal(res.error, "model_not_allowed");
  removeLocal();
});

test("openai: live_guard_disabled when dry_run=false but guard missing", async () => {
  removeLocal();
  writeLocal({
    enabled: true,
    dry_run: false,
    allowed_models: ["gpt-4.1-mini"],
    default_model: "gpt-4.1-mini"
  });
  process.env.MOLTBOT_LIVE_LLM_CALLS = "0";
  process.env.MOLTBOT_OPENAI_API_KEY = "x";
  const res = await call.run(baseInput());
  assert.equal(res.ok, false);
  assert.equal(res.error, "live_guard_disabled");
  removeLocal();
  delete process.env.MOLTBOT_LIVE_LLM_CALLS;
  delete process.env.MOLTBOT_OPENAI_API_KEY;
});

test("openai: auth_missing when guard enabled but token absent", async () => {
  removeLocal();
  writeLocal({
    enabled: true,
    dry_run: false,
    allowed_models: ["gpt-4.1-mini"],
    default_model: "gpt-4.1-mini"
  });
  process.env.MOLTBOT_LIVE_LLM_CALLS = "1";
  delete process.env.MOLTBOT_OPENAI_API_KEY;
  const res = await call.run(baseInput());
  assert.equal(res.ok, false);
  assert.equal(res.error, "auth_missing");
  removeLocal();
  delete process.env.MOLTBOT_LIVE_LLM_CALLS;
});

test("openai: prompt length guard", async () => {
  removeLocal();
  writeLocal({ enabled: true, dry_run: true, allowed_models: ["gpt-4.1-mini"], default_model: "gpt-4.1-mini" });
  const longPrompt = "x".repeat(60000);
  const res = await call.run(baseInput({ prompt: longPrompt }));
  assert.equal(res.ok, false);
  assert.equal(res.error, "invalid_input:prompt:bounds");
  removeLocal();
});
