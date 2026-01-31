#!/usr/bin/env bash
set -euo pipefail

if find packages -name "*.test.ts" | grep -q .; then
  echo "TS test files are disallowed. Use .test.mjs with compiled JS imports." >&2
  exit 1
fi
