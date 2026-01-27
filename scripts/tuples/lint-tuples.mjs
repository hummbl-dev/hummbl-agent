import fg from "fast-glob";
import { readFileSync } from "node:fs";
import { extname } from "node:path";
import { parse as parseYaml } from "yaml";
import { validateTupleV1 } from "../../packages/kernel/src/index.ts";

const GLOBS = [
  "packages/skills/registry/**/*.json",
  "configs/**/*.json",
  "configs/**/*.yml",
  "configs/**/*.yaml",
];

const STRICT = process.env.TUPLES_LINT_STRICT === "1";

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function looksLikeTupleCandidate(node) {
  return (
    isObject(node) &&
    Object.prototype.hasOwnProperty.call(node, "principal") &&
    Object.prototype.hasOwnProperty.call(node, "capability") &&
    Object.prototype.hasOwnProperty.call(node, "scope")
  );
}

function parseFile(path, text) {
  const ext = extname(path).toLowerCase();
  if (ext === ".json") {
    return JSON.parse(text);
  }
  if (ext === ".yml" || ext === ".yaml") {
    return parseYaml(text);
  }
  throw new Error(`Unsupported extension: ${ext}`);
}

function walk(node, pointer, out) {
  if (looksLikeTupleCandidate(node)) {
    out.push({ tuple: node, pointer });
  }

  if (Array.isArray(node)) {
    node.forEach((child, idx) => {
      walk(child, `${pointer}[${idx}]`, out);
    });
    return;
  }

  if (isObject(node)) {
    for (const key of Object.keys(node)) {
      const nextPointer = pointer === "$" ? `$.${key}` : `${pointer}.${key}`;
      walk(node[key], nextPointer, out);
    }
  }
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

async function main() {
  const files = await fg(GLOBS, { onlyFiles: true, unique: true });

  if (files.length === 0) {
    console.log("[OK] tuple-lint: no files matched globs.");
    return;
  }

  let checked = 0;
  let found = 0;

  for (const file of files) {
    let root;
    try {
      const text = readFileSync(file, "utf8");
      root = parseFile(file, text);
    } catch (err) {
      fail(`[FAIL] ${file}: parse error: ${err.message}`);
      continue;
    }

    const candidates = [];
    walk(root, "$", candidates);
    if (candidates.length === 0) continue;

    for (const candidate of candidates) {
      found += 1;
      const result = validateTupleV1(candidate.tuple);
      checked += 1;
      if (!result.ok) {
        fail(`[FAIL] ${file} ${candidate.pointer}: ${result.code}${result.detail ? ` (${result.detail})` : ""}`);
      }
    }
  }

  if (process.exitCode === 1) {
    console.error(`[FAIL] tuple-lint: ${checked} checked, ${found} candidates (invalid tuples present).`);
    return;
  }

  if (STRICT && found === 0) {
    console.error("[FAIL] tuple-lint strict mode: no tuple candidates found.");
    process.exit(1);
    return;
  }

  console.log(`[OK] tuple-lint: ${checked} checked, ${found} candidates (all valid).`);
}

main().catch((error) => {
  console.error(`[FAIL] tuple-lint: unhandled error: ${error.stack || error.message}`);
  process.exit(1);
});
