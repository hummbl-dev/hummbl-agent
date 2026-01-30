"use strict";

import fg from "fast-glob";
import { readFileSync } from "node:fs";

const GLOBS = ["README.md", "docs/**/*.md", "agents/**/*.md", "commands/**/*.md"];

const BRANDS = [
  "ClawHub",
  "clawhub",
  "OpenClaw",
  "openclaw",
  "MoltBot",
  "moltbot",
];

const DEPENDENCY_PHRASES = [
  "install",
  "installed",
  "installing",
  "require",
  "requires",
  "required",
  "dependency",
  "depends on",
  "pull from",
  "download from",
  "fetch from",
  "source of truth",
  "authoritative registry",
];

const DEP_REGEX = DEPENDENCY_PHRASES.map((phrase) => {
  const escaped = phrase.replace(/\s+/g, "\\s+");
  return new RegExp(`\\b${escaped}\\b`, "i");
});

const ALLOW = [
  /\binformational only\b/i,
  /\bexternal ecosystem\b/i,
  /\bexternal marketplace\b/i,
  /\bnot a dependency\b/i,
  /\bskills\/ is the sole registry\b/i,
  /https?:\/\/[^\s)]+/i,
];

const isAllowed = (line) => ALLOW.some((re) => re.test(line));

let failed = false;

const scanFile = (path) => {
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  lines.forEach((line, idx) => {
    if (!line) return;
    if (isAllowed(line)) return;
    const hasBrand = BRANDS.some((brand) => line.includes(brand));
    if (!hasBrand) return;
    const lower = line.toLowerCase();
    const hasDependencyWord = DEP_REGEX.some((re) => re.test(line));
    if (!hasDependencyWord) return;
    console.error(
      `[FAIL] ${path}:${idx + 1}: external brand used as dependency language -> ${line.trim()}`
    );
    failed = true;
  });
};

const main = async () => {
  const files = await fg(GLOBS, { dot: false, onlyFiles: true });
  if (files.length === 0) {
    console.log("[OK] no files matched for external-registry dependency lint");
    return;
  }
  files.forEach(scanFile);
  if (failed) {
    process.exit(1);
  } else {
    console.log(
      "[OK] external brand mentions are informational only (no dependency language)"
    );
  }
};

main().catch((err) => {
  console.error("[FAIL] lint-no-external-registry-deps:", err);
  process.exit(1);
});
