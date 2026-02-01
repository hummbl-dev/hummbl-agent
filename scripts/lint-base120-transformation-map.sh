#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MAP_FILE="${ROOT_DIR}/docs/base120.transformation-map.json"
CANONICAL_FILE="${ROOT_DIR}/docs/base120.v1.0.canonical.json"

if [[ ! -f "${MAP_FILE}" ]]; then
  echo "Missing transformation map: ${MAP_FILE}" >&2
  exit 1
fi

if [[ ! -f "${CANONICAL_FILE}" ]]; then
  echo "Missing Base120 canonical JSON: ${CANONICAL_FILE}" >&2
  exit 1
fi

node <<'NODE'
const fs = require("fs");
const path = require("path");

const mapPath = path.resolve(process.cwd(), "docs/base120.transformation-map.json");
const canonicalPath = path.resolve(process.cwd(), "docs/base120.v1.0.canonical.json");

let map;
let canonical;
try {
  map = JSON.parse(fs.readFileSync(mapPath, "utf8"));
} catch (err) {
  console.error("Transformation map is not valid JSON:", mapPath);
  process.exit(1);
}

try {
  canonical = JSON.parse(fs.readFileSync(canonicalPath, "utf8"));
} catch (err) {
  console.error("Base120 canonical JSON is not valid:", canonicalPath);
  process.exit(1);
}

const mapping = map && map.mapping;
if (!mapping || typeof mapping !== "object") {
  console.error("Transformation map must include a mapping object");
  process.exit(1);
}

const allowedPrefixes = ["P", "IN", "CO", "DE", "RE", "SY"];
const allowedTransformations = new Set([
  "T.PER",
  "T.INV",
  "T.COM",
  "T.DEC",
  "T.REC",
  "T.SYS",
]);

let ok = true;
for (const prefix of allowedPrefixes) {
  const value = mapping[prefix];
  if (!value) {
    console.error(`Missing mapping for prefix ${prefix}`);
    ok = false;
    continue;
  }
  if (!allowedTransformations.has(value)) {
    console.error(`Invalid transformation code for ${prefix}: ${value}`);
    ok = false;
  }
}

for (const key of Object.keys(mapping)) {
  if (!allowedPrefixes.includes(key)) {
    console.error(`Unexpected mapping prefix: ${key}`);
    ok = false;
  }
}

const models = Array.isArray(canonical.models) ? canonical.models : [];
const prefixRe = /^(P|IN|CO|DE|RE|SY)\d+$/;
for (const model of models) {
  const id = model && model.id;
  if (!id || typeof id !== "string") {
    console.error("Invalid model id in canonical JSON:", id);
    ok = false;
    continue;
  }
  const match = id.match(prefixRe);
  if (!match) {
    console.error(`Unexpected Base120 model id format: ${id}`);
    ok = false;
    continue;
  }
  const prefix = match[1];
  if (!mapping[prefix]) {
    console.error(`No transformation mapping for Base120 prefix: ${prefix}`);
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}
NODE
