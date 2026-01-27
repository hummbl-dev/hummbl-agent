#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

files=$(find "${ROOT_DIR}/packages/runners" -maxdepth 2 -name CAPABILITIES.json -print)

if [[ -z "${files}" ]]; then
  echo "No CAPABILITIES.json files found" >&2
  exit 1
fi

node <<'NODE'
const fs = require("fs");

const files = process.argv.slice(1);
let ok = true;

const allowedMode = new Set(["manual", "api"]);
const allowedNetwork = new Set(["none", "restricted", "open"]);
const allowedExec = new Set(["none", "allowlisted"]);
const allowedSupports = new Set(["prompt", "log", "dateOverride"]);

for (const file of files) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    console.error(`Invalid JSON: ${file}`);
    ok = false;
    continue;
  }

  if (!data.runnerId || typeof data.runnerId !== "string") {
    console.error(`Missing runnerId: ${file}`);
    ok = false;
  }
  if (!allowedMode.has(data.mode)) {
    console.error(`Invalid mode in ${file}`);
    ok = false;
  }
  if (!allowedNetwork.has(data.network)) {
    console.error(`Invalid network in ${file}`);
    ok = false;
  }
  if (!allowedExec.has(data.exec)) {
    console.error(`Invalid exec in ${file}`);
    ok = false;
  }
  if (data.artifacts !== "hashed") {
    console.error(`artifacts must be 'hashed' in ${file}`);
    ok = false;
  }
  if (!Array.isArray(data.supports)) {
    console.error(`supports must be array in ${file}`);
    ok = false;
  } else {
    const supports = new Set(data.supports);
    if (supports.size !== data.supports.length) {
      console.error(`supports contains duplicates in ${file}`);
      ok = false;
    }
    for (const entry of data.supports) {
      if (!allowedSupports.has(entry)) {
        console.error(`supports contains invalid value '${entry}' in ${file}`);
        ok = false;
      }
    }
    for (const req of ["prompt", "log", "dateOverride"]) {
      if (!supports.has(req)) {
        console.error(`supports missing '${req}' in ${file}`);
        ok = false;
      }
    }
  }
}

if (!ok) {
  process.exit(1);
}
NODE
