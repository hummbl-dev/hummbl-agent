import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validateBindings } from "../dist/router/src/base120/validateBindings.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

// Base120 codes imported from kernel (canonical source: ../../kernel/src/base120.ts)
// Inlined here to avoid runtime TypeScript loader
const BASE120_CODES = new Set([
  // P - Perspective (20)
  "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10",
  "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20",
  // IN - Inversion (20)
  "IN1", "IN2", "IN3", "IN4", "IN5", "IN6", "IN7", "IN8", "IN9", "IN10",
  "IN11", "IN12", "IN13", "IN14", "IN15", "IN16", "IN17", "IN18", "IN19", "IN20",
  // CO - Composition (20)
  "CO1", "CO2", "CO3", "CO4", "CO5", "CO6", "CO7", "CO8", "CO9", "CO10",
  "CO11", "CO12", "CO13", "CO14", "CO15", "CO16", "CO17", "CO18", "CO19", "CO20",
  // DE - Decomposition (20)
  "DE1", "DE2", "DE3", "DE4", "DE5", "DE6", "DE7", "DE8", "DE9", "DE10",
  "DE11", "DE12", "DE13", "DE14", "DE15", "DE16", "DE17", "DE18", "DE19", "DE20",
  // RE - Recursion (20)
  "RE1", "RE2", "RE3", "RE4", "RE5", "RE6", "RE7", "RE8", "RE9", "RE10",
  "RE11", "RE12", "RE13", "RE14", "RE15", "RE16", "RE17", "RE18", "RE19", "RE20",
  // SY - Systems (20)
  "SY1", "SY2", "SY3", "SY4", "SY5", "SY6", "SY7", "SY8", "SY9", "SY10",
  "SY11", "SY12", "SY13", "SY14", "SY15", "SY16", "SY17", "SY18", "SY19", "SY20",
]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// packages/router/scripts -> repo root = ../../..
const repoRoot = path.resolve(__dirname, "../../..");
const manifestPath = path.join(repoRoot, "skills", "MANIFEST.json");

const raw = fs.readFileSync(manifestPath, "utf8");
const manifest = JSON.parse(raw);

const knownSkillIds = new Set(
  Array.isArray(manifest?.skills) ? manifest.skills.map((s) => s?.id).filter(Boolean) : []
);

const result = validateBindings(BASE120_BINDINGS, knownSkillIds, BASE120_CODES);

if (!result.ok) {
  console.error(JSON.stringify({ ok: false, errors: result.errors }, null, 2));
  process.exit(1);
}

console.log("✓ Bindings valid");