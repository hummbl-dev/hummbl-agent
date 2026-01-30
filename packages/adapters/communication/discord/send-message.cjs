"use strict";

const { readFileSync, existsSync } = require("node:fs");
const path = require("node:path");

const BASE_CONFIG_PATH = path.resolve(__dirname, "../../../../configs/moltbot/communication.discord.json");
const LOCAL_CONFIG_PATH = path.resolve(__dirname, "../../../../configs/moltbot/communication.discord.local.json");

function ok(res) {
  return Object.assign({ ok: true }, res);
}
function fail(res) {
  return Object.assign({ ok: false }, res);
}

function loadConfig() {
  const base = JSON.parse(readFileSync(BASE_CONFIG_PATH, "utf8"));
  if (existsSync(LOCAL_CONFIG_PATH)) {
    const local = JSON.parse(readFileSync(LOCAL_CONFIG_PATH, "utf8"));
    const merged = { ...base, ...local };
    if (Array.isArray(local.allowed_channel_ids)) {
      merged.allowed_channel_ids = local.allowed_channel_ids;
    }
    return merged;
  }
  return base;
}

function boundsCheck({ channel_id, text }) {
  if (typeof channel_id !== "string" || channel_id.length < 1 || channel_id.length > 128) {
    return "invalid_input:channel_id";
  }
  if (typeof text !== "string" || text.length < 1 || text.length > 4000) {
    return "invalid_input:text";
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
  id: "adapter.communication.discord.send-message",
  version: "0.1.0",
  async run(input) {
    try {
      const channel_id = input?.channel_id;
      const text = input?.text;
      const tuple_sha256 = input?.tuple_sha256;

      const err = boundsCheck({ channel_id, text });
      if (err) {
        return fail({ error: err, provider: "discord", channel_id, tuple_sha256, mode: "dry_run" });
      }

      const cfg = loadConfig();

      if (!cfg?.enabled) {
        return fail({ error: "config_disabled", provider: "discord", channel_id, tuple_sha256, mode: "dry_run" });
      }

      if (!Array.isArray(cfg.allowed_channel_ids) || !cfg.allowed_channel_ids.includes(channel_id)) {
        return fail({ error: "channel_not_allowed", provider: "discord", channel_id, tuple_sha256, mode: "dry_run" });
      }

      const tokenEnv = cfg.token_env || "MOLTBOT_DISCORD_BOT_TOKEN";
      const token = process.env[tokenEnv];
      if (!token || typeof token !== "string") {
        return fail({ error: "auth_missing", provider: "discord", channel_id, tuple_sha256, mode: "dry_run" });
      }

      const timeout_ms = Number.isFinite(cfg.timeout_ms) ? cfg.timeout_ms : 8000;
      const liveGuard = process.env.MOLTBOT_LIVE_SEND === "1";
      const wantsLive = cfg.dry_run === false;

      if (wantsLive && !liveGuard) {
        return fail({ error: "live_guard_disabled", provider: "discord", channel_id, tuple_sha256, mode: "dry_run" });
      }

      const dry_run = cfg.dry_run !== false || !liveGuard;

      if (dry_run) {
        return ok({ provider: "discord", mode: "dry_run", channel_id, tuple_sha256 });
      }

      const url = `https://discord.com/api/v10/channels/${encodeURIComponent(channel_id)}/messages`;

      const res = await fetchWithTimeout(
        url,
        {
          method: "POST",
          headers: {
            "Authorization": `Bot ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ content: text })
        },
        timeout_ms
      );

      if (!res.ok) {
        return fail({ error: `provider_error:${res.status}`, provider: "discord", channel_id, tuple_sha256, mode: "live" });
      }

      const data = await res.json().catch(() => null);
      return ok({
        provider: "discord",
        mode: "live",
        channel_id,
        tuple_sha256,
        message_id: data?.id ? String(data.id) : undefined
      });
    } catch (e) {
      return { ok: false, error: "internal_error", provider: "discord", mode: "dry_run" };
    }
  }
};
