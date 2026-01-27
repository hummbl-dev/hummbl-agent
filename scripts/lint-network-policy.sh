#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
POLICY_FILE="${ROOT_DIR}/configs/network-policy.json"

if [[ ! -f "${POLICY_FILE}" ]]; then
  echo "Missing ${POLICY_FILE}" >&2
  exit 1
fi

node <<'NODE'
const fs = require("fs");
const path = require("path");

const file = path.resolve(process.cwd(), "configs/network-policy.json");
let data;
try {
  data = JSON.parse(fs.readFileSync(file, "utf8"));
} catch (err) {
  console.error("network-policy.json is not valid JSON");
  process.exit(1);
}

let ok = true;
if (!data.version) {
  console.error("network-policy.json missing version");
  ok = false;
}
if (!data.default || !data.default.network) {
  console.error("network-policy.json missing default.network");
  ok = false;
}
if (!data.allowlist || !Array.isArray(data.allowlist.domains)) {
  console.error("network-policy.json allowlist.domains must be array");
  ok = false;
}
if (!data.denylist || !Array.isArray(data.denylist.domains)) {
  console.error("network-policy.json denylist.domains must be array");
  ok = false;
}

const allowed = new Set(data.allowlist?.domains || []);
if (allowed.size !== (data.allowlist?.domains || []).length) {
  console.error("network-policy.json allowlist.domains contains duplicates");
  ok = false;
}

if (!ok) process.exit(1);
NODE
