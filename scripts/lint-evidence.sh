#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
EVIDENCE_ROOT="${ROOT_DIR}/_state/evidence"

files=$(find "${EVIDENCE_ROOT}" -name EVIDENCE.md -type f 2>/dev/null || true)

if [[ -z "${files}" ]]; then
  echo "No evidence logs found; skipping"
  exit 0
fi

node <<'NODE'
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const evidenceRoot = path.join(root, "_state", "evidence");
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && entry.name === "EVIDENCE.md") {
      files.push(full);
    }
  }
}

if (fs.existsSync(evidenceRoot)) {
  walk(evidenceRoot);
}

if (files.length === 0) {
  process.exit(0);
}

let ok = true;
const hashRe = /^sha256:[0-9a-f]{64}$/;

for (const file of files) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  let current = null;
  for (const line of lines) {
    if (line.startsWith("- file:")) {
      if (current && (!current.hash || !current.source)) {
        console.error(`Incomplete evidence block in ${file}`);
        ok = false;
      }
      const filePath = line.replace("- file:", "").trim();
      current = { file: filePath, hash: null, source: null };
      const abs = path.join(root, filePath);
      if (!fs.existsSync(abs)) {
        console.error(`Evidence file missing: ${filePath} (from ${file})`);
        ok = false;
      }
    } else if (current && line.trim().startsWith("hash:")) {
      const hash = line.replace("hash:", "").trim();
      current.hash = hash;
      if (!hashRe.test(hash)) {
        console.error(`Invalid hash '${hash}' in ${file}`);
        ok = false;
      }
    } else if (current && line.trim().startsWith("source:")) {
      current.source = line.replace("source:", "").trim();
      if (!current.source) {
        console.error(`Missing source in ${file}`);
        ok = false;
      }
    }
  }
  if (current && (!current.hash || !current.source)) {
    console.error(`Incomplete evidence block in ${file}`);
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}
NODE
