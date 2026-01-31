#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const {
  enforceRequestSize,
  loadNetworkPolicy,
  checkRateLimit,
} = require("./network-guard.cjs");

const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf(name);
  if (idx === -1) return undefined;
  return args[idx + 1];
};

const type = getArg("--type");
const outPath = getArg("--out");
const model = getArg("--model");
const input = getArg("--input");
const system = getArg("--system");
const maxTokensArg = getArg("--max-tokens");
const checkRate = args.includes("--check-rate-limit");

if (!type || !outPath || !model || input === undefined) {
  console.error(
    "Usage: build-request.cjs --type <openai|anthropic> --out <path> --model <model> --input <text> [--system <text>] [--max-tokens N] [--check-rate-limit]"
  );
  process.exit(1);
}

const rootDir = path.resolve(__dirname, "..");

let body;
if (type === "openai") {
  body = { model, input };
} else if (type === "anthropic") {
  const maxTokens = maxTokensArg ? Number(maxTokensArg) : 256;
  if (!Number.isFinite(maxTokens) || !Number.isInteger(maxTokens) || maxTokens <= 0) {
    console.error("max-tokens must be a positive integer");
    process.exit(1);
  }
  body = {
    model,
    max_tokens: maxTokens,
    messages: [{ role: "user", content: input }],
  };
  if (system && system.length > 0) {
    body.system = system;
  }
} else {
  console.error("Unknown type. Use openai or anthropic.");
  process.exit(1);
}

const json = JSON.stringify(body, null, 2) + "\n";

let policy;
try {
  policy = loadNetworkPolicy(rootDir);
} catch (err) {
  console.error(err.message || "Failed to read network policy");
  process.exit(1);
}

try {
  if (checkRate) {
    checkRateLimit(rootDir, policy);
  }
  enforceRequestSize(json, policy.default?.maxRequestBytes);
} catch (err) {
  console.error(err.message || "Request too large");
  process.exit(1);
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, json, "utf8");
