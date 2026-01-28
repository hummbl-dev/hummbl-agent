#!/usr/bin/env node
import fg from "fast-glob";
import { readFileSync } from "node:fs";

const PATTERNS = [
  "README.md",
  "docs/**/*",
  "configs/**/*",
  "scripts/**/*",
  "packages/**/*",
  "skills/**/*"
];

const IGNORE = [
  "**/node_modules/**",
  "**/.git/**",
  "**/_state/**",
  "**/vendor/**",
  "**/dist/**",
  "**/build/**",
  "**/coverage/**",
  "**/*.png",
  "**/*.jpg",
  "**/*.jpeg",
  "**/*.gif",
  "**/*.pdf"
];

const KEY = ["clawd", "hub"].join("");
const NEEDLES = [new RegExp(KEY, "gi"), /clawd\s*hub/gi];

function main() {
  const files = fg.sync(PATTERNS, { ignore: IGNORE, dot: false, onlyFiles: true, unique: true });
  let hits = 0;

  for (const file of files) {
    if (file === "scripts/lint-no-clawdhub.mjs") continue;
    let text;
    try {
      text = readFileSync(file, "utf8");
    } catch (err) {
      continue;
    }

    for (const re of NEEDLES) {
      if (re.test(text)) {
        hits += 1;
        console.error(`[FAIL] ${file}: contains forbidden legacy registry reference`);
        break;
      }
    }
  }

  if (hits > 0) process.exit(1);
  console.log("[OK] no ClawdHub references found");
}

main();
