"use strict";

const { readFileSync, existsSync } = require("node:fs");
const { join, dirname } = require("node:path");

const CFG_DIR = join(dirname(__filename), "../../../../configs/moltbot");
const CFG_BASE = join(CFG_DIR, "llm.openai.json");
const CFG_LOCAL = join(CFG_DIR, "llm.openai.local.json");

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

function ok(res) { return Object.assign({ ok: true }, res); }
function fail(res) { return Object.assign({ ok: false }, res); }

async function fetchWithTimeout(url, init, timeout_ms) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeout_ms);
  try {
    return await fetch(url, { ...init, signal: ac.signal });
  } finally {
    clearTimeout(t);
  }
}

function bounds({ model, purpose, prompt, max_output_tokens }) {
  if (typeof model !== "string" || model.length < 1 || model.length > 128) return "invalid_input:model";
  if (typeof purpose !== "string" || purpose.length < 1 || purpose.length > 64) return "invalid_input:purpose";
  if (typeof prompt !== "string" || prompt.length < 1) return "invalid_input:prompt";
  if (prompt.length > 50000) return "invalid_input:prompt:bounds";
  if (max_output_tokens != null) {
    if (typeof max_output_tokens !== "number" || !Number.isFinite(max_output_tokens)) return "invalid_input:max_output_tokens";
    if (max_output_tokens < 1 || max_output_tokens > 8192) return "invalid_input:max_output_tokens:bounds";
  }
  return null;
}

module.exports = {
  id: "adapter.llm.openai.call",
  version: "0.1.0",
  async run(input) {
    try {
      const cfg = loadCfg();

      const tuple_sha256 = input?.tuple_sha256;
      const model = input?.model || cfg.default_model;
      const purpose = input?.purpose;
      const prompt = input?.prompt;
      const max_output_tokens_req = input?.max_output_tokens;

      if (typeof tuple_sha256 !== "string" || tuple_sha256.length !== 64) {
        return fail({ error: "invalid_input:tuple_sha256", provider: "openai", mode: "dry_run" });
      }

      const err = bounds({ model, purpose, prompt, max_output_tokens: max_output_tokens_req });
      if (err) return fail({ error: err, provider: "openai", mode: "dry_run", tuple_sha256, model });

      if (!cfg.enabled) {
        return fail({ error: "config_disabled", provider: "openai", mode: "dry_run", tuple_sha256, model });
      }

      const allowed = Array.isArray(cfg.allowed_models) ? cfg.allowed_models : [];
      if (allowed.length === 0 || !allowed.includes(model)) {
        return fail({ error: "model_not_allowed", provider: "openai", mode: "dry_run", tuple_sha256, model });
      }

      const liveGuardEnv = cfg.live_guard_env || "MOLTBOT_LIVE_LLM_CALLS";
      if (cfg.dry_run !== false || process.env[liveGuardEnv] !== "1") {
        return fail({ error: "live_guard_disabled", provider: "openai", mode: "dry_run", tuple_sha256, model });
      }

      const tokenEnv = cfg.token_env || "MOLTBOT_OPENAI_API_KEY";
      const token = process.env[tokenEnv];
      if (!token || typeof token !== "string") {
        return fail({ error: "auth_missing", provider: "openai", mode: "dry_run", tuple_sha256, model });
      }

      const timeout_ms = Number.isFinite(cfg.timeout_ms) ? cfg.timeout_ms : 15000;
      const cap = Number.isFinite(cfg.max_output_tokens_cap) ? cfg.max_output_tokens_cap : 2048;
      const def = Number.isFinite(cfg.max_output_tokens_default) ? cfg.max_output_tokens_default : 512;
      const max_output_tokens = Math.max(1, Math.min(cap, max_output_tokens_req ?? def));

      const body = {
        model,
        input: prompt,
        max_output_tokens
      };

      const res = await fetchWithTimeout(
        "https://api.openai.com/v1/responses",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        },
        timeout_ms
      );

      if (!res.ok) {
        return fail({ error: `provider_error:${res.status}`, provider: "openai", mode: "live", tuple_sha256, model });
      }

      const data = await res.json().catch(() => null);
      let text = null;
      if (typeof data?.output_text === "string") {
        text = data.output_text;
      } else if (Array.isArray(data?.output)) {
        for (const item of data.output) {
          if (item?.type === "message" && Array.isArray(item?.content)) {
            for (const contentItem of item.content) {
              if (contentItem?.type === "output_text" && typeof contentItem?.text === "string") {
                text = contentItem.text;
                break;
              }
            }
          }
          if (text) break;
        }
      }

      if (typeof text !== "string") {
        return fail({ error: "provider_error:parse", provider: "openai", mode: "live", tuple_sha256, model });
      }

      return ok({
        provider: "openai",
        mode: "live",
        tuple_sha256,
        model,
        output_text: text
      });
    } catch (e) {
      return { ok: false, error: "internal_error", provider: "openai", mode: "dry_run" };
    }
  }
};
