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

const file = path.resolve(process.cwd(), "packages/skills/registry/src/registry.json");
let data;
try {
  data = JSON.parse(fs.readFileSync(file, "utf8"));
} catch (err) {
  console.error("registry.json is not valid JSON");
  process.exit(1);
}

if (!Array.isArray(data)) {
  console.error("registry.json must be an array");
  process.exit(1);
}

const idSet = new Set();
let ok = true;

const semverRe = /^[0-9]+\.[0-9]+\.[0-9]+$/;
const idRe = /^[a-z0-9]+(-[a-z0-9]+)*$/;

for (const skill of data) {
  const id = skill.id;
  if (!id || typeof id !== "string" || !idRe.test(id)) {
    console.error(`Invalid id: ${id}`);
    ok = false;
  } else if (idSet.has(id)) {
    console.error(`Duplicate id: ${id}`);
    ok = false;
  }
  idSet.add(id);

  if (!skill.summary || skill.summary.length > 140) {
    console.error(`Summary too long or missing for id: ${id}`);
    ok = false;
  }

  if (!skill.version || !semverRe.test(skill.version)) {
    console.error(`Invalid version for id: ${id}`);
    ok = false;
  }

  if (!Array.isArray(skill.inputs)) {
    console.error(`inputs missing for id: ${id}`);
    ok = false;
  }
  if (!Array.isArray(skill.outputs)) {
    console.error(`outputs missing for id: ${id}`);
    ok = false;
  }

  if (!Array.isArray(skill.examples) || skill.examples.length < 1) {
    console.error(`examples missing for id: ${id}`);
    ok = false;
  }

  if (!Array.isArray(skill.requiredTools) || skill.requiredTools.some(t => !t.toolId)) {
    console.error(`requiredTools invalid for id: ${id}`);
    ok = false;
  }

  if (!skill.permissions || !skill.permissions.network || !skill.permissions.filesystem || !skill.permissions.exec || !skill.permissions.secrets) {
    console.error(`permissions missing for id: ${id}`);
    ok = false;
  }

  if (!skill.provenance || !skill.provenance.createdAt) {
    console.error(`provenance.createdAt missing for id: ${id}`);
    ok = false;
  }

  if (!Array.isArray(skill.runnerCompatibility) || skill.runnerCompatibility.length < 1) {
    console.error(`runnerCompatibility missing for id: ${id}`);
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}
NODE
