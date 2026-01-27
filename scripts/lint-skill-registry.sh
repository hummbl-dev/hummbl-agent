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

const canonicalPath = path.resolve(process.cwd(), "docs/base120.v1.0.canonical.json");
let canonical;
try {
  canonical = JSON.parse(fs.readFileSync(canonicalPath, "utf8"));
} catch (err) {
  console.error("base120 canonical JSON missing or invalid:", canonicalPath);
  process.exit(1);
}

const canonicalCodes = new Set(
  Array.isArray(canonical.models) ? canonical.models.map((m) => m.id) : []
);
const modelBindingCodes = new Map();

const networkPolicyPath = path.resolve(process.cwd(), "configs/network-policy.json");
const secretsPolicyPath = path.resolve(process.cwd(), "configs/secrets-policy.json");
let networkPolicy = { allowlist: { domains: [] } };
let secretsPolicy = { allowedSecrets: [] };
try {
  networkPolicy = JSON.parse(fs.readFileSync(networkPolicyPath, "utf8"));
} catch (err) {
  console.error("network-policy.json missing or invalid:", networkPolicyPath);
  process.exit(1);
}
try {
  secretsPolicy = JSON.parse(fs.readFileSync(secretsPolicyPath, "utf8"));
} catch (err) {
  console.error("secrets-policy.json missing or invalid:", secretsPolicyPath);
  process.exit(1);
}

const allowedSecrets = new Set(secretsPolicy.allowedSecrets || []);
const allowedDomains = (networkPolicy.allowlist && Array.isArray(networkPolicy.allowlist.domains))
  ? networkPolicy.allowlist.domains
  : [];
const denyDomains = (networkPolicy.denylist && Array.isArray(networkPolicy.denylist.domains))
  ? networkPolicy.denylist.domains
  : [];
const wildcardDomains = allowedDomains.filter((d) => d.startsWith("*.")).map((d) => d.slice(1));
const allowedDomainSet = new Set(allowedDomains.filter((d) => !d.startsWith("*.")));

const isDomainAllowed = (domain) => {
  if (!domain || typeof domain !== "string") return false;
  if (allowedDomainSet.has(domain)) return true;
  return wildcardDomains.some((suffix) => domain.endsWith(suffix));
};

const isDomainDenied = (domain) => {
  if (!domain || typeof domain !== "string") return false;
  if (denyDomains.includes(domain)) return true;
  return denyDomains.some((suffix) => suffix.startsWith("*.") && domain.endsWith(suffix.slice(1)));
};

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

  if (skill.base120_bindings) {
    const b = skill.base120_bindings;
    const drives = Array.isArray(b.drives_selection) ? b.drives_selection : [];
    const sets = Array.isArray(b.sets_parameters)
      ? b.sets_parameters.map((entry) => entry && entry.model).filter(Boolean)
      : [];
    const adds = Array.isArray(b.adds_constraints)
      ? b.adds_constraints.map((entry) => entry && entry.model).filter(Boolean)
      : [];
    const stops = Array.isArray(b.stop_conditions)
      ? b.stop_conditions.map((entry) => entry && entry.model).filter(Boolean)
      : [];
    const codes = Array.from(new Set([...drives, ...sets, ...adds, ...stops]));
    for (const code of codes) {
      if (!canonicalCodes.has(code)) {
        console.error(`Invalid Base120 code '${code}' in skill ${id}`);
        ok = false;
      }
    }
    if (skill.skill_kind === "model_binding") {
      if (drives.length !== 1) {
        console.error(`model_binding must have exactly 1 drives_selection code: ${id}`);
        ok = false;
      }
      const code = drives[0];
      if (code) {
        const list = modelBindingCodes.get(code) || [];
        list.push(id);
        modelBindingCodes.set(code, list);
      }
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


  if (skill.permissions && skill.permissions.network && skill.permissions.network !== "none") {
    if (!skill.networkPolicy || !Array.isArray(skill.networkPolicy.domains) || skill.networkPolicy.domains.length === 0) {
      console.error(`networkPolicy.domains required for id: ${id}`);
      ok = false;
    } else {
      for (const domain of skill.networkPolicy.domains) {
        if (isDomainDenied(domain)) {
          console.error(`networkPolicy domain denied '${domain}' for id: ${id}`);
          ok = false;
        }
        if (!isDomainAllowed(domain)) {
          console.error(`networkPolicy domain not allowlisted '${domain}' for id: ${id}`);
          ok = false;
        }
      }
    }

    if (!skill.requiredSecrets || !Array.isArray(skill.requiredSecrets) || skill.requiredSecrets.length === 0) {
      console.error(`requiredSecrets required for networked skill id: ${id}`);
      ok = false;
    } else {
      for (const secret of skill.requiredSecrets) {
        if (!allowedSecrets.has(secret)) {
          console.error(`requiredSecret not allowlisted '${secret}' for id: ${id}`);
          ok = false;
        }
      }
    }

    if (!skill.requiredTools || skill.requiredTools.length === 0) {
      console.error(`requiredTools required for networked skill id: ${id}`);
      ok = false;
    }

    if (skill.permissions.secrets !== "read") {
      console.error(`networked skill must set permissions.secrets=read: ${id}`);
      ok = false;
    }
  }

  if (skill.requiredSecrets && skill.permissions && skill.permissions.secrets !== "read") {
    console.error(`requiredSecrets set but permissions.secrets is not read: ${id}`);
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


const expectedCodes = Array.from(canonicalCodes);
const missing = expectedCodes.filter((code) => !modelBindingCodes.has(code));
if (missing.length > 0) {
  console.error(`Missing model_binding entries for Base120 codes: ${missing.join(", ")}`);
  ok = false;
}

for (const [code, skills] of modelBindingCodes.entries()) {
  if (skills.length > 1) {
    console.error(`Duplicate model_binding for ${code}: ${skills.join(", ")}`);
    ok = false;
  }
}

const modelBindingCount = data.filter((skill) => skill.skill_kind === "model_binding").length;
if (modelBindingCount !== canonicalCodes.size) {
  console.error(`model_binding count ${modelBindingCount} does not match canonical ${canonicalCodes.size}`);
  ok = false;
}

if (!ok) {
  process.exit(1);
}
NODE
