#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

node <<'NODE'
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = process.cwd();
const ignorePath = path.join(root, ".secretsignore");
let ignore = [];
if (fs.existsSync(ignorePath)) {
  ignore = fs
    .readFileSync(ignorePath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

const patterns = [
  { name: "OpenAI key", re: /\bsk-[A-Za-z0-9]{20,}\b/ },
  { name: "Anthropic key", re: /\bsk-ant-[A-Za-z0-9\-_]{20,}\b/ },
  { name: "GitHub PAT", re: /\bghp_[A-Za-z0-9]{36,}\b/ },
  { name: "GitHub token", re: /\bgho_[A-Za-z0-9]{36,}\b/ },
  { name: "GitHub app token", re: /\bghs_[A-Za-z0-9]{36,}\b/ },
  { name: "GitHub PAT v2", re: /\bgithub_pat_[A-Za-z0-9_]{22,}\b/ },
  { name: "Slack token", re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/ },
  { name: "Google API key", re: /\bAIza[0-9A-Za-z\-_]{35}\b/ },
  { name: "Bearer token", re: /Bearer\s+[A-Za-z0-9._\-]{20,}/ },
  { name: "xAI key", re: /\bxai-[A-Za-z0-9]{20,}\b/ },
  { name: "AWS Access Key ID", re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "Private key header", re: /-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/ }
];

const files = execSync("git ls-files", { encoding: "utf8" })
  .split("\n")
  .map((f) => f.trim())
  .filter(Boolean)
  .filter((f) => !f.startsWith("vendor/"))
  .filter((f) => !f.endsWith(".png") && !f.endsWith(".jpg") && !f.endsWith(".pdf") && !f.endsWith(".zip"));

let ok = true;
for (const file of files) {
  if (ignore.some((rule) => file.startsWith(rule))) continue;
  let content;
  try {
    content = fs.readFileSync(path.join(root, file), "utf8");
  } catch {
    continue;
  }
  for (const pat of patterns) {
    if (pat.re.test(content)) {
      console.error(`Secret pattern detected (${pat.name}) in ${file}`);
      ok = false;
    }
  }
}

if (!ok) process.exit(1);
NODE
