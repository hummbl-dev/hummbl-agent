#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../../../.." && pwd)"
TEMPLATE="${ROOT_DIR}/packages/runners/grok/prompt.md.template"
STATE_FILE="${ROOT_DIR}/_state/CURRENT_STATE.md"

if [[ ! -f "${TEMPLATE}" ]]; then
  echo "Missing template: ${TEMPLATE}" >&2
  exit 1
fi
if [[ ! -f "${STATE_FILE}" ]]; then
  echo "Missing state file: ${STATE_FILE}" >&2
  exit 1
fi

cat "${TEMPLATE}"
echo ""
cat "${STATE_FILE}"
