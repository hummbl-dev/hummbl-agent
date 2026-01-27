#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd -P)"
POLICY_PATH="${ROOT_DIR}/configs/network-policy.json"
STATE_PATH="${ROOT_DIR}/_state/.rate-limit.json"

tmp_dir="$(mktemp -d)"
cleanup() {
  rm -rf "${tmp_dir}"
}
trap cleanup EXIT

limit="$(node -e "const p=require('${POLICY_PATH}'); console.log(p.default.rateLimitPerMinute || 0)")"
max_bytes="$(node -e "const p=require('${POLICY_PATH}'); console.log(p.default.maxRequestBytes || 0)")"

if [[ -z "${max_bytes}" || "${max_bytes}" -le 0 ]]; then
  echo "maxRequestBytes not set in network-policy.json" >&2
  exit 1
fi

small_out="${tmp_dir}/small.request.json"
oversize_out="${tmp_dir}/oversize.request.json"

node "${ROOT_DIR}/scripts/build-request.cjs" \
  --type openai \
  --out "${small_out}" \
  --model "gpt-test" \
  --input "ok"

oversize_len=$((max_bytes + 10))
oversize_input="$(python3 - <<PY
print("x" * ${oversize_len})
PY
)"

set +e
node "${ROOT_DIR}/scripts/build-request.cjs" \
  --type openai \
  --out "${oversize_out}" \
  --model "gpt-test" \
  --input "${oversize_input}" 2>/dev/null
oversize_rc=$?
set -e

if [[ "${oversize_rc}" -eq 0 ]]; then
  echo "Expected build-request.cjs to fail on oversize input" >&2
  exit 1
fi

backup=""
if [[ -f "${STATE_PATH}" ]]; then
  backup="${tmp_dir}/rate-limit.backup.json"
  cp "${STATE_PATH}" "${backup}"
fi

if [[ -n "${limit}" && "${limit}" -gt 0 ]]; then
  now_ms="$(node -e 'console.log(Date.now())')"
  cat <<JSON > "${STATE_PATH}"
{
  "windowStart": ${now_ms},
  "count": ${limit}
}
JSON

  set +e
  node "${ROOT_DIR}/scripts/build-request.cjs" \
    --type openai \
    --out "${tmp_dir}/rate.request.json" \
    --model "gpt-test" \
    --input "ok" \
    --check-rate-limit 2>/dev/null
  rate_rc=$?
  set -e

  if [[ "${rate_rc}" -eq 0 ]]; then
    echo "Expected rate limit check to fail" >&2
    exit 1
  fi
fi

if [[ -n "${backup}" && -f "${backup}" ]]; then
  mv "${backup}" "${STATE_PATH}"
else
  rm -f "${STATE_PATH}"
fi

echo "network-guard regression checks passed"
