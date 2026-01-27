#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
POLICY_FILE="${ROOT_DIR}/configs/secrets-policy.json"

if [[ ! -f "${POLICY_FILE}" ]]; then
  echo "Missing ${POLICY_FILE}" >&2
  exit 1
fi

node <<'NODE'
const fs = require("fs");
const path = require("path");

const file = path.resolve(process.cwd(), "configs/secrets-policy.json");
let data;
try {
  data = JSON.parse(fs.readFileSync(file, "utf8"));
} catch (err) {
  console.error("secrets-policy.json is not valid JSON");
  process.exit(1);
}

let ok = true;
if (!data.version) {
  console.error("secrets-policy.json missing version");
  ok = false;
}
if (!Array.isArray(data.allowedSecrets)) {
  console.error("secrets-policy.json allowedSecrets must be array");
  ok = false;
}

const allowed = new Set(data.allowedSecrets || []);
if (allowed.size !== (data.allowedSecrets || []).length) {
  console.error("secrets-policy.json allowedSecrets contains duplicates");
  ok = false;
}

if (typeof data.requiredPrefix !== "string") {
  console.error("secrets-policy.json requiredPrefix must be string");
  ok = false;
}

if (!ok) process.exit(1);
NODE
