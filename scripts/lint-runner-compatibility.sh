#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REGISTRY_FILE="${ROOT_DIR}/packages/skills/registry/src/registry.json"

if [[ ! -f "${REGISTRY_FILE}" ]]; then
  echo "Missing registry.json: ${REGISTRY_FILE}" >&2
  exit 1
fi

node <<'NODE'
const fs = require("fs");
const path = require("path");

const registryPath = path.resolve(process.cwd(), "packages/skills/registry/src/registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

const allowedVirtual = new Set(["local-cli"]);
const caps = new Set();

const runnerDirs = fs
  .readdirSync(path.resolve(process.cwd(), "packages/runners"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => path.resolve(process.cwd(), "packages/runners", d.name, "CAPABILITIES.json"))
  .filter((p) => fs.existsSync(p));

for (const file of runnerDirs) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (data.runnerId) {
    caps.add(data.runnerId);
  }
}

let ok = true;
for (const skill of registry) {
  const runners = Array.isArray(skill.runnerCompatibility)
    ? skill.runnerCompatibility
    : [];
  for (const runner of runners) {
    if (caps.has(runner) || allowedVirtual.has(runner)) {
      continue;
    }
    console.error(
      `RunnerId '${runner}' in skill '${skill.id}' has no CAPABILITIES.json and is not virtual.`
    );
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}
NODE
