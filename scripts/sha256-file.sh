#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <path>" >&2
  exit 1
fi

file_path="$1"

if command -v sha256sum >/dev/null 2>&1; then
  hash=$(sha256sum -- "$file_path" | awk '{print $1}')
elif command -v shasum >/dev/null 2>&1; then
  hash=$(shasum -a 256 -- "$file_path" | awk '{print $1}')
else
  echo "sha256sum or shasum is required" >&2
  exit 1
fi

echo "sha256:${hash}"
