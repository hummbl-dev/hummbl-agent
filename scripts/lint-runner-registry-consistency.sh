#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REGISTRY_FILE="${ROOT_DIR}/packages/skills/registry/src/registry.json"

if [[ ! -f "${REGISTRY_FILE}" ]]; then
  echo "Missing registry.json: ${REGISTRY_FILE}" >&2
  exit 1
fi

files=$(find "${ROOT_DIR}/packages/runners" -maxdepth 2 -name CAPABILITIES.json -print)

if [[ -z "${files}" ]]; then
  echo "No CAPABILITIES.json files found" >&2
  exit 1
fi

node <<'NODE'
const fs = require("fs");
const path = require("path");

const registryPath = path.resolve(process.cwd(), "packages/skills/registry/src/registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const compat = new Set();
for (const skill of registry) {
  if (Array.isArray(skill.runnerCompatibility)) {
    for (const runner of skill.runnerCompatibility) {
      compat.add(runner);
    }
  }
}

const files = fs
  .readdirSync(path.resolve(process.cwd(), "packages/runners"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => path.resolve(process.cwd(), "packages/runners", d.name, "CAPABILITIES.json"))
  .filter((p) => fs.existsSync(p));

let ok = true;
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const id = data.runnerId;
  if (!id) {
    console.error(`Missing runnerId in ${file}`);
    ok = false;
    continue;
  }
  if (id !== "template" && !compat.has(id)) {
    console.error(`RunnerId '${id}' not present in any skill runnerCompatibility`);
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}
NODE
