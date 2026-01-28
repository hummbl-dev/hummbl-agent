#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, posix, relative } from "node:path";

const REGISTRY_ROOT = "skills";
const OUT = "skills/MANIFEST.json";

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

function listSkillDirs(root) {
  const entries = readdirSync(root).map((name) => join(root, name));
  const dirs = entries.filter((p) => statSync(p).isDirectory());
  const skillDirs = [];

  for (const d of dirs) {
    if (posix.basename(d) === "_registry") continue;
    const children = readdirSync(d)
      .map((name) => join(d, name))
      .filter((p) => statSync(p).isDirectory());
    if (children.length === 0) {
      skillDirs.push(d);
    } else {
      for (const c of children) {
        if (listFiles(c).length > 0) skillDirs.push(c);
      }
    }
  }

  return skillDirs
    .map((d) => posix.normalize(d.split("\\").join("/")))
    .sort();
}

function main() {
  const skillDirs = listSkillDirs(REGISTRY_ROOT);
  const skills = skillDirs.map((dir) => ({
    id: posix.normalize(dir.replace(/^skills\//, "")),
    path: dir,
    sha256_tree: treeHash(dir),
  }));

  const manifest = {
    version: "1.0.0",
    registry_root: REGISTRY_ROOT,
    skills,
  };

  writeFileSync(OUT, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`[OK] wrote ${OUT} with ${skills.length} skill(s)`);
}

main();
