#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
INDEX_FILE="${ROOT_DIR}/packages/router/src/index.ts"

if [[ ! -f "${INDEX_FILE}" ]]; then
  echo "Missing router index: ${INDEX_FILE}" >&2
  exit 1
fi

required_exports=("./types" "./policies" "./selectors" "./router" "./capabilities")

missing=0
for exp in "${required_exports[@]}"; do
  if ! grep -q "export \* from \"${exp}\";" "${INDEX_FILE}"; then
    echo "Missing export: ${exp}" >&2
    missing=1
  fi
done

if [[ ${missing} -ne 0 ]]; then
  exit 1
fi
