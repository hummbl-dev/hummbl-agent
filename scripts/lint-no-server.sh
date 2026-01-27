#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Use fixed-string search to avoid regex issues
patterns=(
  "http.createServer"
  "https.createServer"
  "net.createServer"
  "app.listen("
  "server.listen("
)

paths=(
  "${ROOT_DIR}/packages/adapters"
  "${ROOT_DIR}/packages/runners"
  "${ROOT_DIR}/scripts"
)

found=0
for dir in "${paths[@]}"; do
  if [[ -d "${dir}" ]]; then
    for pattern in "${patterns[@]}"; do
      matches=$(rg -n --fixed-strings --hidden -g "*.{js,ts,mjs,cjs,py,sh}" -e "${pattern}" "${dir}" || true)
      if [[ -n "${matches}" ]]; then
        # Ignore this script's own pattern list
        matches=$(echo "${matches}" | grep -v "scripts/lint-no-server.sh" || true)
      fi
      if [[ -n "${matches}" ]]; then
        echo "Disallowed server pattern '${pattern}' found:" >&2
        echo "${matches}" >&2
        found=1
      fi
    done
  fi
done

if [[ "${found}" -ne 0 ]]; then
  exit 1
fi
