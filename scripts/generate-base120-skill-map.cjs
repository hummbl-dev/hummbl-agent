#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const canonicalPath =
  process.env.BASE120_CANONICAL ||
  path.join(ROOT_DIR, "docs", "base120.v1.0.canonical.json");
const registryPath = path.join(
  ROOT_DIR,
  "packages",
  "skills",
  "registry",
  "src",
  "registry.json"
);
const outputPath = (() => {
  const override = process.env.BASE120_MAP_OUTPUT;
  if (!override) {
    return path.join(ROOT_DIR, "docs", "base120-skill-map.md");
  }
  return path.isAbsolute(override)
    ? override
    : path.join(ROOT_DIR, override);
})();

function die(message) {
  console.error(message);
  process.exit(1);
}

function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    die(`Failed to read JSON: ${filePath} (${err.message})`);
  }
}

function formatUtc(date) {
  const iso = date.toISOString();
  // YYYY-MM-DDTHH:MM:SSZ -> YYYY-MM-DD HH:MM UTC
  return `${iso.slice(0, 10)} ${iso.slice(11, 16)} UTC`;
}

if (!fs.existsSync(canonicalPath)) {
  die(
    `Base120 canonical JSON not found. Set BASE120_CANONICAL or add ${canonicalPath}`
  );
}
if (!fs.existsSync(registryPath)) {
  die(`Registry JSON not found: ${registryPath}`);
}

const canonical = readJson(canonicalPath);
const registry = readJson(registryPath);

if (!canonical || !Array.isArray(canonical.models)) {
  die("Canonical JSON missing models array.");
}
if (!Array.isArray(registry)) {
  die("Registry JSON must be an array.");
}

const models = {};
for (const model of canonical.models) {
  if (model && model.id) models[model.id] = model;
}

const baseDirs = {
  P: "skills/P-perspective",
  IN: "skills/IN-inversion",
  CO: "skills/CO-composition",
  DE: "skills/DE-decomposition",
  RE: "skills/RE-recursion",
  SY: "skills/SY-systems",
};

const codeToSkillPaths = {};
for (const code of Object.keys(models)) {
  codeToSkillPaths[code] = [];
}

for (const relDir of Object.values(baseDirs)) {
  const absDir = path.join(ROOT_DIR, relDir);
  if (!fs.existsSync(absDir) || !fs.statSync(absDir).isDirectory()) {
    continue;
  }

  const entries = fs.readdirSync(absDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "README.md") continue;

    const token = entry.name.split("-")[0];
    if (!token) continue;

    const code = token.toUpperCase();
    if (!models[code]) continue;

    const relPath = path.join(relDir, entry.name);
    const skillMd = path.join(relPath, "SKILL.md");
    const skillMdAbs = path.join(ROOT_DIR, skillMd);

    if (fs.existsSync(skillMdAbs)) {
      codeToSkillPaths[code].push(skillMd.replace(/\\/g, "/"));
    } else {
      codeToSkillPaths[code].push(relPath.replace(/\\/g, "/"));
    }
  }
}

const codeToRegistry = {};
for (const code of Object.keys(models)) {
  codeToRegistry[code] = [];
}

for (const skill of registry) {
  const bindings = skill && skill.base120_bindings ? skill.base120_bindings : {};
  const drives = Array.isArray(bindings.drives_selection)
    ? bindings.drives_selection
    : [];
  const sets = Array.isArray(bindings.sets_parameters)
    ? bindings.sets_parameters.map((b) => b && b.model).filter(Boolean)
    : [];
  const adds = Array.isArray(bindings.adds_constraints)
    ? bindings.adds_constraints.map((b) => b && b.model).filter(Boolean)
    : [];
  const stops = Array.isArray(bindings.stop_conditions)
    ? bindings.stop_conditions.map((b) => b && b.model).filter(Boolean)
    : [];

  const allCodes = Array.from(new Set([...drives, ...sets, ...adds, ...stops]));
  for (const code of allCodes) {
    if (codeToRegistry[code]) {
      codeToRegistry[code].push(skill.id || "");
    }
  }
}

for (const code of Object.keys(codeToRegistry)) {
  codeToRegistry[code] = codeToRegistry[code].filter(Boolean).sort();
}

const rows = [];
for (const model of canonical.models) {
  const code = model.id;
  const name = model.name || "";
  const domain = model.domain || "";
  const skillPaths = (codeToSkillPaths[code] || []).sort();
  const registrySkills = codeToRegistry[code] || [];

  rows.push({
    code,
    name,
    domain,
    skillPaths: skillPaths.length ? skillPaths.join("; ") : "N/A",
    registry: registrySkills.length ? registrySkills.join("; ") : "N/A",
  });
}

const total = rows.length;
const withSkill = rows.filter((r) => r.skillPaths !== "N/A").length;
const withRegistry = rows.filter((r) => r.registry !== "N/A").length;

const missingSkill = rows.filter((r) => r.skillPaths === "N/A");
const missingRegistry = rows.filter((r) => r.registry === "N/A");

const lines = [];
lines.push("# Base120 -> HUMMBL Skills Map");
lines.push("");
lines.push("Generated mapping of canonical Base120 models to existing HUMMBL skill artifacts.");
lines.push("");
lines.push(`- Source: ${path.relative(ROOT_DIR, canonicalPath).replace(/\\/g, "/")}`);
lines.push(`- Generated: ${formatUtc(new Date())}`);
lines.push(`- Total models: ${total}`);
lines.push(`- Models with skill folders: ${withSkill}`);
lines.push(`- Models referenced in registry bindings: ${withRegistry}`);
lines.push("");
lines.push("## Mapping");
lines.push("");
lines.push("| Code | Name | Domain | Skill Path (skills/) | Registry Bindings (S.*) |");
lines.push("| --- | --- | --- | --- | --- |");
for (const row of rows) {
  lines.push(
    `| ${row.code} | ${row.name} | ${row.domain} | ${row.skillPaths} | ${row.registry} |`
  );
}

lines.push("");
lines.push("## Gaps");
lines.push("");
lines.push("### Models missing skill folders");
lines.push("");
if (missingSkill.length) {
  for (const row of missingSkill) {
    lines.push(`- ${row.code} (${row.name}) [${row.domain}]`);
  }
} else {
  lines.push("- None");
}

lines.push("");
lines.push("### Models missing registry bindings");
lines.push("");
if (missingRegistry.length) {
  for (const row of missingRegistry) {
    lines.push(`- ${row.code} (${row.name}) [${row.domain}]`);
  }
} else {
  lines.push("- None");
}

lines.push("");

fs.writeFileSync(outputPath, lines.join("\n"), "utf8");
console.log(`Wrote ${outputPath}`);
