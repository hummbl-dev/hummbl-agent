#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RUNS_DIR="${ROOT_DIR}/_state/runs"
DATE_STR="$(date +%Y-%m-%d)"
RUN_DIR="${RUNS_DIR}/${DATE_STR}"
RUN_FILE="${RUN_DIR}/run.md"

mkdir -p "${RUN_DIR}"
if [[ ! -f "${RUN_FILE}" ]]; then
  {
    echo "# Run Log ${DATE_STR}"
    echo ""
  } > "${RUN_FILE}"
fi

stamp="$(date +%H:%M:%S)"
echo "- ${stamp} | Run opened" >> "${RUN_FILE}"
