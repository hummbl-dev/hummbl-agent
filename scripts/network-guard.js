#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const DEFAULT_WINDOW_MS = 60_000;

const loadNetworkPolicy = (rootDir) => {
  const policyPath = path.join(rootDir, "configs", "network-policy.json");
  let policy;
  try {
    policy = JSON.parse(fs.readFileSync(policyPath, "utf8"));
  } catch (err) {
    throw new Error("Failed to read network-policy.json");
  }
  return policy;
};

const enforceRequestSize = (body, maxBytes) => {
  if (!maxBytes) return;
  const size = Buffer.byteLength(body, "utf8");
  if (size > maxBytes) {
    throw new Error(
      `Request exceeds maxRequestBytes (${size} > ${maxBytes})`
    );
  }
};

const enforceRateLimit = (rootDir, policy) => {
  const limitRaw = policy?.default?.rateLimitPerMinute;
  const limit = Number(limitRaw);
  if (!Number.isFinite(limit) || limit <= 0) return;

  const stateDir = path.join(rootDir, "_state");
  const statePath = path.join(stateDir, ".rate-limit.json");
  const now = Date.now();

  let state = { windowStart: now, count: 0 };
  try {
    if (fs.existsSync(statePath)) {
      const parsed = JSON.parse(fs.readFileSync(statePath, "utf8"));
      if (
        typeof parsed?.windowStart === "number" &&
        typeof parsed?.count === "number"
      ) {
        state = parsed;
      }
    }
  } catch (_) {
    state = { windowStart: now, count: 0 };
  }

  if (now - state.windowStart >= DEFAULT_WINDOW_MS) {
    state = { windowStart: now, count: 0 };
  }

  if (state.count >= limit) {
    throw new Error(`Rate limit exceeded (${limit} per minute)`);
  }

  state.count += 1;

  fs.mkdirSync(stateDir, { recursive: true });
  const tmpPath = `${statePath}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(state, null, 2) + "\n", "utf8");
  fs.renameSync(tmpPath, statePath);
};

const checkRateLimit = (rootDir, policy) => {
  const limitRaw = policy?.default?.rateLimitPerMinute;
  const limit = Number(limitRaw);
  if (!Number.isFinite(limit) || limit <= 0) return;

  const statePath = path.join(rootDir, "_state", ".rate-limit.json");
  const now = Date.now();

  try {
    if (!fs.existsSync(statePath)) return;
    const parsed = JSON.parse(fs.readFileSync(statePath, "utf8"));
    if (
      typeof parsed?.windowStart !== "number" ||
      typeof parsed?.count !== "number"
    ) {
      return;
    }
    if (now - parsed.windowStart >= DEFAULT_WINDOW_MS) {
      return;
    }
    if (parsed.count >= limit) {
      throw new Error(`Rate limit exceeded (${limit} per minute)`);
    }
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Rate limit")) {
      throw err;
    }
  }
};

module.exports = {
  loadNetworkPolicy,
  enforceRequestSize,
  enforceRateLimit,
  checkRateLimit,
};
