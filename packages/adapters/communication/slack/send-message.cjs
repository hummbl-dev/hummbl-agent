"use strict";

const { readFileSync } = require("node:fs");

function loadJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function ok(res) {
  return Object.assign({ ok: true }, res);
}
function fail(res) {
  return Object.assign({ ok: false }, res);
}

function boundsCheck({ channel_id, text, thread_ts }) {
  if (typeof channel_id !== "string" || channel_id.length < 1 || channel_id.length > 128) {
    return "invalid_input:channel_id";
  }
  if (typeof text !== "string" || text.length < 1 || text.length > 4000) {
    return "invalid_input:text";
  }
  if (thread_ts != null && (typeof thread_ts !== "string" || thread_ts.length < 1 || thread_ts.length > 64)) {
    return "invalid_input:thread_ts";
  }
  return null;
}

async function fetchWithTimeout(url, init, timeout_ms) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeout_ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = {
  id: "adapter.communication.slack.send-message",
  version: "0.1.0",
  async run(input) {
    try {
      const channel_id = input?.channel_id;
      const text = input?.text;
      const thread_ts = input?.thread_ts;
      const tuple_sha256 = input?.tuple_sha256;

      const err = boundsCheck({ channel_id, text, thread_ts });
      if (err) {
        return fail({ error: err, provider: "slack", channel_id, tuple_sha256, mode: "dry_run" });
      }

      const cfg = loadJson("configs/moltbot/communication.slack.json");

      if (!cfg?.enabled) {
        return fail({ error: "config_disabled", provider: "slack", channel_id, tuple_sha256, mode: "dry_run" });
      }

      if (!Array.isArray(cfg.allowed_channel_ids) || !cfg.allowed_channel_ids.includes(channel_id)) {
        return fail({ error: "channel_not_allowed", provider: "slack", channel_id, tuple_sha256, mode: "dry_run" });
      }

      const tokenEnv = cfg.token_env || "MOLTBOT_SLACK_BOT_TOKEN";
      const token = process.env[tokenEnv];
      if (!token || typeof token !== "string") {
        return fail({ error: "auth_missing", provider: "slack", channel_id, tuple_sha256, mode: "dry_run" });
      }

      const timeout_ms = Number.isFinite(cfg.timeout_ms) ? cfg.timeout_ms : 8000;
      const dry_run = cfg.dry_run !== false;

      if (dry_run) {
        return ok({ provider: "slack", mode: "dry_run", channel_id, tuple_sha256 });
      }

      const body = { channel: channel_id, text };
      if (thread_ts) body.thread_ts = thread_ts;

      const res = await fetchWithTimeout(
        "https://slack.com/api/chat.postMessage",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(body)
        },
        timeout_ms
      );

      if (!res.ok) {
        return fail({ error: `provider_error:${res.status}`, provider: "slack", channel_id, tuple_sha256, mode: "live" });
      }

      const data = await res.json().catch(() => null);
      if (!data || data.ok !== true) {
        return fail({ error: "provider_error:slack_api", provider: "slack", channel_id, tuple_sha256, mode: "live" });
      }

      const ts = data.ts ? String(data.ts) : undefined;
      return ok({
        provider: "slack",
        mode: "live",
        channel_id,
        tuple_sha256,
        message_id: ts,
        thread_ts: ts
      });
    } catch (e) {
      return { ok: false, error: "internal_error", provider: "slack", mode: "dry_run" };
    }
  }
};
