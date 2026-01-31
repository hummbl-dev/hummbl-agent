import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validateBindings } from "../dist/router/src/base120/validateBindings.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

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

const result = validateBindings(BASE120_BINDINGS, knownSkillIds);

if (!result.ok) {
  console.error(JSON.stringify({ ok: false, errors: result.errors }, null, 2));
  process.exit(1);
}

console.log("✓ Bindings valid");
