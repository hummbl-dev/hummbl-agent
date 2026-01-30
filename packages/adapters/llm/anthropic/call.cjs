"use strict";

const { readFileSync, existsSync } = require("node:fs");
const { join, dirname } = require("node:path");

const CFG_DIR = join(dirname(__filename), "../../../../configs/moltbot");
const CFG_BASE = join(CFG_DIR, "llm.anthropic.json");
const CFG_LOCAL = join(CFG_DIR, "llm.anthropic.local.json");

function loadJson(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}
function loadCfg() {
  const base = loadJson(CFG_BASE);
  if (existsSync(CFG_LOCAL)) {
    const local = loadJson(CFG_LOCAL);
    return { ...base, ...local };
  }
  return base;
}

function ok(res) {
  return Object.assign({ ok: true }, res);
}
function fail(res) {
  return Object.assign({ ok: false }, res);
}

async function fetchWithTimeout(url, init, timeout_ms) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeout_ms);
  try {
    return await fetch(url, { ...init, signal: ac.signal });
  } finally {
    clearTimeout(t);
  }
}

function bounds({ model, purpose, max_output_tokens }) {
  if (typeof model !== "string" || model.length < 1 || model.length > 128) return "invalid_input:model";
  if (typeof purpose !== "string" || purpose.length < 1 || purpose.length > 64) return "invalid_input:purpose";
  if (max_output_tokens != null) {
    if (typeof max_output_tokens !== "number" || !Number.isFinite(max_output_tokens)) return "invalid_input:max_output_tokens";
    if (max_output_tokens < 1 || max_output_tokens > 8192) return "invalid_input:max_output_tokens:bounds";
  }
  return null;
}

module.exports = {
  id: "adapter.llm.anthropic.call",
  version: "0.1.0",
  async run(input) {
    try {
      const cfg = loadCfg();

      const tuple_sha256 = input?.tuple_sha256;
      const prompt = input?.prompt;
      const model = input?.model || cfg.default_model;
      const purpose = input?.purpose;
      const max_output_tokens_req = input?.max_output_tokens;

      if (typeof tuple_sha256 !== "string" || tuple_sha256.length !== 64) {
        return fail({ error: "invalid_input:tuple_sha256", provider: "anthropic", mode: "dry_run" });
      }
      if (typeof prompt !== "string" || prompt.length < 1) {
        return fail({ error: "invalid_input:prompt", provider: "anthropic", mode: "dry_run", tuple_sha256 });
      }

      const err = bounds({ model, purpose, max_output_tokens: max_output_tokens_req });
      if (err) return fail({ error: err, provider: "anthropic", mode: "dry_run", tuple_sha256 });

      if (!cfg.enabled) {
        return fail({ error: "config_disabled", provider: "anthropic", mode: "dry_run", tuple_sha256, model });
      }

      const allowed = Array.isArray(cfg.allowed_models) ? cfg.allowed_models : [];
      if (allowed.length === 0 || !allowed.includes(model)) {
        return fail({ error: "model_not_allowed", provider: "anthropic", mode: "dry_run", tuple_sha256, model });
      }

      const liveGuardEnv = cfg.live_guard_env || "MOLTBOT_LIVE_LLM_CALLS";
      if (cfg.dry_run !== false || process.env[liveGuardEnv] !== "1") {
        return fail({ error: "live_guard_disabled", provider: "anthropic", mode: "dry_run", tuple_sha256, model });
      }

      const tokenEnv = cfg.token_env || "MOLTBOT_ANTHROPIC_API_KEY";
      const token = process.env[tokenEnv];
      if (!token || typeof token !== "string") {
        return fail({ error: "auth_missing", provider: "anthropic", mode: "dry_run", tuple_sha256, model });
      }

      const timeout_ms = Number.isFinite(cfg.timeout_ms) ? cfg.timeout_ms : 15000;
      const cap = Number.isFinite(cfg.max_output_tokens_cap) ? cfg.max_output_tokens_cap : 2048;
      const def = Number.isFinite(cfg.max_output_tokens_default) ? cfg.max_output_tokens_default : 512;
      const max_output_tokens = Math.max(1, Math.min(cap, max_output_tokens_req ?? def));

      const body = {
        model,
        max_tokens: max_output_tokens,
        messages: [{ role: "user", content: prompt }]
      };

      const res = await fetchWithTimeout(
        "https://api.anthropic.com/v1/messages",
        {
          method: "POST",
          headers: {
            "x-api-key": token,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
          },
          body: JSON.stringify(body)
        },
        timeout_ms
      );

      if (!res.ok) {
        return fail({ error: `provider_error:${res.status}`, provider: "anthropic", mode: "live", tuple_sha256, model });
      }

      const data = await res.json().catch(() => null);
      const text = data?.content?.[0]?.text;
      if (typeof text !== "string") {
        return fail({ error: "provider_error:parse", provider: "anthropic", mode: "live", tuple_sha256, model });
      }

      return ok({
        provider: "anthropic",
        mode: "live",
        tuple_sha256,
        model,
        output_text: text
      });
    } catch (e) {
      return { ok: false, error: "internal_error", provider: "anthropic", mode: "dry_run" };
    }
  }
};
