#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, posix, relative } from "node:path";

const MANIFEST = "skills/MANIFEST.json";

function sha256Hex(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function listFiles(rootDir) {
  const out = [];
  const walk = (dir) => {
    for (const ent of readdirSync(dir)) {
      const p = join(dir, ent);
      const st = statSync(p);
      if (st.isDirectory()) walk(p);
      else if (st.isFile()) out.push(p);
    }
  };
  walk(rootDir);
  return out;
}

function normRel(abs) {
  return posix.normalize(relative(process.cwd(), abs).split("\\").join("/"));
}

function treeHash(dir) {
  const files = listFiles(dir)
    .map((abs) => ({ rel: normRel(abs), hash: sha256Hex(readFileSync(abs)) }))
    .sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));
  const material = files.map(({ rel, hash }) => `${rel}\u0000${hash}\n`).join("");
  return sha256Hex(Buffer.from(material, "utf8"));
}

function fail(msg) {
  console.error(`[FAIL] ${msg}`);
  process.exit(1);
}

function main() {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
  } catch (err) {
    fail(`cannot read ${MANIFEST}: ${err.message}`);
  }

  if (!manifest.skills || !Array.isArray(manifest.skills)) fail("bad manifest: missing skills[]");

  for (const skill of manifest.skills) {
    if (!skill.id || !skill.path || !skill.sha256_tree) fail(`bad entry: ${JSON.stringify(skill)}`);
    const actual = treeHash(skill.path);
    if (actual !== skill.sha256_tree) {
      fail(`hash mismatch for ${skill.id}\n expected: ${skill.sha256_tree}\n actual:   ${actual}\n tip: rerun scripts/registry/compute-skills-manifest.mjs`);
    }
  }

  console.log(`[OK] skills manifest verified (${manifest.skills.length} skill(s))`);
}

main();
