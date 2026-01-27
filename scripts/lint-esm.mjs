#!/usr/bin/env node
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.cwd();

const listOutput = execSync("git ls-files '*.js'", { encoding: "utf8" }).trim();
if (!listOutput) {
  console.log("[OK] lint-esm: no .js files tracked");
  process.exit(0);
}

const files = listOutput.split("\n");
const ignoredPrefixes = ["node_modules/", "vendor/"];
const requireRe = /\brequire\s*\(/;
const moduleExportsRe = /\bmodule\.exports\b/;
const exportsRe = /\bexports\.[A-Za-z0-9_]+/;

const violations = [];
const readErrors = [];

for (const relativePath of files) {
  if (!relativePath) continue;
  if (ignoredPrefixes.some((prefix) => relativePath.startsWith(prefix))) continue;

  const absPath = join(repoRoot, relativePath);
  let content;
  try {
    content = readFileSync(absPath, "utf8");
  } catch (err) {
    readErrors.push(`${relativePath}: ${err.message}`);
    continue;
  }

  if (requireRe.test(content) || moduleExportsRe.test(content) || exportsRe.test(content)) {
    violations.push(relativePath);
  }
}

if (readErrors.length > 0) {
  console.error("[FAIL] lint-esm: unable to read tracked .js files:");
  for (const err of readErrors) console.error(` - ${err}`);
  process.exit(1);
}

if (violations.length > 0) {
  console.error("[FAIL] lint-esm: convert these .js files to ES modules or rename to .cjs:");
  for (const file of violations) console.error(` - ${file}`);
  process.exit(1);
}

console.log(`[OK] lint-esm: ${files.length} .js files checked, no CommonJS usage detected.`);
