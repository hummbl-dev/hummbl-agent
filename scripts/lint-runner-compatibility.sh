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
const capabilityMap = new Map();
const virtualCaps = new Map([
  ["local-cli", { network: "none", exec: "allowlisted" }],
]);
const networkOrder = { none: 0, restricted: 1, open: 2 };
const execOrder = { none: 0, allowlisted: 1 };

const runnerDirs = fs
  .readdirSync(path.resolve(process.cwd(), "packages/runners"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => path.resolve(process.cwd(), "packages/runners", d.name, "CAPABILITIES.json"))
  .filter((p) => fs.existsSync(p));

for (const file of runnerDirs) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (data.runnerId) {
    capabilityMap.set(data.runnerId, data);
  }
}

let ok = true;
for (const skill of registry) {
  const runners = Array.isArray(skill.runnerCompatibility)
    ? skill.runnerCompatibility
    : [];

  for (const runner of runners) {
    if (capabilityMap.has(runner) || allowedVirtual.has(runner)) {
      continue;
    }
    console.error(
      `RunnerId '${runner}' in skill '${skill.id}' has no CAPABILITIES.json and is not virtual.`
    );
    ok = false;
  }

  const neededNetwork = skill.permissions?.network || "none";
  const neededExec = skill.permissions?.exec || "none";

  const hasNetworkCoverage = runners.some((runner) => {
    const cap = capabilityMap.get(runner) || virtualCaps.get(runner);
    if (!cap) return false;
    return networkOrder[cap.network] >= networkOrder[neededNetwork];
  });

  const hasExecCoverage = runners.some((runner) => {
    const cap = capabilityMap.get(runner) || virtualCaps.get(runner);
    if (!cap) return false;
    return execOrder[cap.exec] >= execOrder[neededExec];
  });

  if (!hasNetworkCoverage) {
    console.error(
      `No runner in skill '${skill.id}' supports network=${neededNetwork}`
    );
    ok = false;
  }

  if (!hasExecCoverage) {
    console.error(
      `No runner in skill '${skill.id}' supports exec=${neededExec}`
    );
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}
NODE
