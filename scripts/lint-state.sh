#!/usr/bin/env bash

set -euo pipefail

STATE_FILE="_state/CURRENT_STATE.md"

if [[ ! -f "${STATE_FILE}" ]]; then
  echo "Missing ${STATE_FILE}" >&2
  exit 1
fi

required_headings=(
  "## Objective"
  "## Constraints"
  "## Current plan (next 3 steps)"
  "## Workstream locks"
  "## Next handoff"
)

missing=0
for heading in "${required_headings[@]}"; do
  if ! grep -Fq "${heading}" "${STATE_FILE}"; then
    echo "Missing heading: ${heading}" >&2
    missing=1
  fi
done

if [[ ${missing} -ne 0 ]]; then
  exit 1
fi
