#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <sitrep-file>" >&2
  exit 1
fi

file="$1"

if [[ ! -f "${file}" ]]; then
  echo "SITREP file not found: ${file}" >&2
  exit 1
fi

errors=0

first_line=$(head -n 1 "${file}")
if [[ "${first_line}" != STATUS:* ]]; then
  echo "Missing STATUS header (line 1)" >&2
  errors=$((errors + 1))
fi

required_sections=(
  "1. SITUATION"
  "2. INTELLIGENCE"
  "3. OPERATIONS"
  "4. ASSESSMENT"
  "5. RECOMMENDATIONS"
)

for section in "${required_sections[@]}"; do
  if ! grep -q "${section}" "${file}"; then
    echo "Missing section: ${section}" >&2
    errors=$((errors + 1))
  fi
done

if grep -qiE "learning systems?" "${file}"; then
  echo "Forbidden claim: learning systems" >&2
  errors=$((errors + 1))
fi

if grep -qiE "tracking systems?" "${file}"; then
  echo "Forbidden claim: tracking systems" >&2
  errors=$((errors + 1))
fi

if grep -qiE "gateway:\s" "${file}"; then
  echo "Forbidden claim: gateway state" >&2
  errors=$((errors + 1))
fi

if [[ ${errors} -ne 0 ]]; then
  exit 1
fi
