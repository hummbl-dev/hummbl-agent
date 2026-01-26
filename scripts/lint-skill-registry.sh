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
const base120Re = /^[A-Z]{1,3}\d+$/;
const legacySlugRe = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const kindSet = new Set([
  "primitive_transformation",
  "integration_pattern",
  "model_binding"
]);
const primitiveTransformations = new Set([
  "T.PER",
  "T.INV",
  "T.COM",
  "T.DEC",
  "T.REC",
  "T.SYS",
]);

for (const skill of data) {
  const id = skill.id;
  if (!id || typeof id !== "string") {
    console.error(`Invalid id: ${id}`);
    ok = false;
  } else {
    if (idSet.has(id)) {
      console.error(`Duplicate id: ${id}`);
      ok = false;
    }
    if (!id.startsWith("S.")) {
      console.error(`Skill id must start with S.: ${id}`);
      ok = false;
    }
    if (base120Re.test(id)) {
      console.error(`Skill id must not be Base120-coded: ${id}`);
      ok = false;
    }
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

  if (!kindSet.has(skill.skill_kind)) {
    console.error(`Invalid skill_kind for id: ${id}`);
    ok = false;
  }

  if (skill.transformation_code && !primitiveTransformations.has(skill.transformation_code) && skill.transformation_code !== "T.INT") {
    console.error(`Invalid transformation_code for id: ${id}`);
    ok = false;
  }

  if (skill.skill_kind === "primitive_transformation") {
    if (!primitiveTransformations.has(skill.transformation_code)) {
      console.error(`primitive_transformation must declare a T.* transformation_code: ${id}`);
      ok = false;
    }
  }

  if (skill.skill_kind === "integration_pattern") {
    if (skill.transformation_code !== "T.INT") {
      console.error(`integration_pattern must use transformation_code T.INT: ${id}`);
      ok = false;
    }
  }

  if (skill.skill_kind === "model_binding") {
    if (skill.transformation_code) {
      console.error(`model_binding must not declare transformation_code: ${id}`);
      ok = false;
    }
  }

  if (!skill.base120_bindings) {
    console.error(`base120_bindings missing for id: ${id}`);
    ok = false;
  } else {
    const b = skill.base120_bindings;
    if (!Array.isArray(b.drives_selection)) {
      console.error(`base120_bindings.drives_selection missing for id: ${id}`);
      ok = false;
    }
    if (!Array.isArray(b.sets_parameters)) {
      console.error(`base120_bindings.sets_parameters missing for id: ${id}`);
      ok = false;
    }
    if (!Array.isArray(b.adds_constraints)) {
      console.error(`base120_bindings.adds_constraints missing for id: ${id}`);
      ok = false;
    }
    if (!Array.isArray(b.stop_conditions)) {
      console.error(`base120_bindings.stop_conditions missing for id: ${id}`);
      ok = false;
    }
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

  if (skill.skill_kind === "integration_pattern") {
    if (!Array.isArray(skill.dependsOnSkills) || skill.dependsOnSkills.length < 2) {
      console.error(`integration_pattern must depend on >=2 skills: ${id}`);
      ok = false;
    }
    if (!Array.isArray(skill.gates) || skill.gates.length < 1) {
      console.error(`integration_pattern must define gates: ${id}`);
      ok = false;
    }
    if (!Array.isArray(skill.evidenceBundle) || skill.evidenceBundle.length < 1) {
      console.error(`integration_pattern must define evidenceBundle: ${id}`);
      ok = false;
    }
  }

  if (skill.skill_kind === "primitive_transformation") {
    if (Array.isArray(skill.dependsOnSkills) && skill.dependsOnSkills.length > 0) {
      console.error(`primitive_transformation must not depend on skills: ${id}`);
      ok = false;
    }
    if (Array.isArray(skill.gates) && skill.gates.length > 0) {
      console.error(`primitive_transformation must not define gates: ${id}`);
      ok = false;
    }
    if (Array.isArray(skill.evidenceBundle) && skill.evidenceBundle.length > 0) {
      console.error(`primitive_transformation must not define evidenceBundle: ${id}`);
      ok = false;
    }
  }

  if (skill.skill_kind === "model_binding") {
    if (Array.isArray(skill.requiredTools) && skill.requiredTools.length > 0) {
      console.error(`model_binding must not require tools: ${id}`);
      ok = false;
    }
    if (!skill.permissions || skill.permissions.exec !== "none") {
      console.error(`model_binding must set exec to none: ${id}`);
      ok = false;
    }
  }

  if (skill.aliases !== undefined) {
    if (!Array.isArray(skill.aliases)) {
      console.error(`aliases must be an array for id: ${id}`);
      ok = false;
    } else {
      for (const alias of skill.aliases) {
        if (!alias || typeof alias !== "string") {
          console.error(`aliases must be non-empty strings for id: ${id}`);
          ok = false;
          continue;
        }
        if (alias === id) {
          console.error(`aliases must not duplicate id for id: ${id}`);
          ok = false;
        }
        if (alias.startsWith("S.")) {
          console.error(`aliases must not be canonical S.* ids for id: ${id}`);
          ok = false;
        }
        if (!base120Re.test(alias) && !legacySlugRe.test(alias)) {
          console.error(`aliases must be Base120 codes or legacy slugs for id: ${id}`);
          ok = false;
        }
      }
    }
  }
}

if (!ok) {
  process.exit(1);
}
NODE
