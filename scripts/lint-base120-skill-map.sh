#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MAP_FILE="${ROOT_DIR}/docs/base120-skill-map.md"
GEN_SCRIPT="${ROOT_DIR}/scripts/generate-base120-skill-map.cjs"

if [[ ! -f "${MAP_FILE}" ]]; then
  echo "Missing ${MAP_FILE}" >&2
  exit 1
fi

if [[ ! -f "${GEN_SCRIPT}" ]]; then
  echo "Missing generator ${GEN_SCRIPT}" >&2
  exit 1
fi

tmpfile=$(mktemp)
tmp_expected=$(mktemp)
tmp_actual=$(mktemp)

BASE120_MAP_OUTPUT="${tmpfile}" node "${GEN_SCRIPT}" >/dev/null

# Normalize out the Generated timestamp line for deterministic diff
grep -v '^\- Generated:' "${MAP_FILE}" > "${tmp_expected}"
grep -v '^\- Generated:' "${tmpfile}" > "${tmp_actual}"

if ! diff -u "${tmp_expected}" "${tmp_actual}"; then
  echo "base120-skill-map.md is out of date. Run: node scripts/generate-base120-skill-map.cjs" >&2
  exit 1
fi

rm -f "${tmpfile}" "${tmp_expected}" "${tmp_actual}"
