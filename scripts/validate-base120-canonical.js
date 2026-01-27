#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT_DIR = path.resolve(__dirname, "..");
const canonicalPath =
  process.env.BASE120_CANONICAL ||
  path.join(ROOT_DIR, "docs", "base120.v1.0.canonical.json");

function die(message) {
  console.error(message);
  process.exit(1);
}

function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    die(`Failed to read JSON: ${filePath} (${err.message})`);
  }
}

if (!fs.existsSync(canonicalPath)) {
  die(`Base120 canonical JSON not found: ${canonicalPath}`);
}

const data = readJson(canonicalPath);
const errors = [];

const governance = data.governance || {};
if (governance.hash) {
  const algo = (governance.hash_algorithm || "").toUpperCase();
  if (algo !== "SHA-256") {
    errors.push(`Unsupported hash_algorithm: ${governance.hash_algorithm}`);
  } else {
    const fileHash = crypto
      .createHash("sha256")
      .update(fs.readFileSync(canonicalPath))
      .digest("hex");
    if (fileHash !== governance.hash) {
      errors.push("Canonical JSON hash does not match governance.hash");
    }
  }
}

const requiredTop = ["schema_version", "base120_version", "canonical", "model_count", "models", "governance"];
for (const key of requiredTop) {
  if (!(key in data)) errors.push(`Missing top-level field: ${key}`);
}

if (!Array.isArray(data.models)) {
  errors.push("models must be an array");
}

const models = Array.isArray(data.models) ? data.models : [];

if (typeof data.model_count === "number" && models.length !== data.model_count) {
  errors.push(`model_count (${data.model_count}) does not match models.length (${models.length})`);
}

const idRe = /^(P|IN|CO|DE|RE|SY)([1-9]|1[0-9]|20)$/;
const ids = [];
for (const model of models) {
  if (!model || typeof model !== "object") {
    errors.push("Model entry is not an object");
    continue;
  }
  if (!model.id || !idRe.test(model.id)) {
    errors.push(`Invalid id: ${model && model.id ? model.id : "(missing)"}`);
  }
  if (!model.name) errors.push(`Missing name for ${model.id || "(missing id)"}`);
  if (!model.domain) errors.push(`Missing domain for ${model.id || "(missing id)"}`);
  if (!model.definition) errors.push(`Missing definition for ${model.id || "(missing id)"}`);
  ids.push(model.id);
}

// Uniqueness
const uniqueIds = new Set(ids.filter(Boolean));
if (uniqueIds.size !== ids.filter(Boolean).length) {
  errors.push("Duplicate model ids detected");
}

// Expected full set
const domains = ["P", "IN", "CO", "DE", "RE", "SY"];
const expected = new Set();
for (const d of domains) {
  for (let i = 1; i <= 20; i++) {
    expected.add(`${d}${i}`);
  }
}

const missing = Array.from(expected).filter((id) => !uniqueIds.has(id));
const extra = Array.from(uniqueIds).filter((id) => !expected.has(id));
if (missing.length) errors.push(`Missing ids: ${missing.join(", ")}`);
if (extra.length) errors.push(`Unexpected ids: ${extra.join(", ")}`);

// Domain counts
const domainCounts = { P: 0, IN: 0, CO: 0, DE: 0, RE: 0, SY: 0 };
for (const id of uniqueIds) {
  const match = idRe.exec(id);
  if (match) {
    domainCounts[match[1]] += 1;
  }
}
for (const d of domains) {
  if (domainCounts[d] !== 20) {
    errors.push(`Domain ${d} count is ${domainCounts[d]} (expected 20)`);
  }
}

if (errors.length) {
  for (const err of errors) {
    console.error(`ERROR: ${err}`);
  }
  process.exit(1);
}

console.log(`Base120 canonical JSON OK (${models.length} models)`);
