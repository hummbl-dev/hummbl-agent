#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../../../.." && pwd)"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

MODEL=""
INPUT=""
MAX_TOKENS="256"
DATE_STR="$(date +%F)"
NAME=""
SYSTEM_PROMPT=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --model)
      MODEL="$2"; shift 2;;
    --input)
      INPUT="$2"; shift 2;;
    --max-tokens)
      MAX_TOKENS="$2"; shift 2;;
    --date)
      DATE_STR="$2"; shift 2;;
    --name)
      NAME="$2"; shift 2;;
    --system)
      SYSTEM_PROMPT="$2"; shift 2;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1;;
  esac
done

if [[ -z "$MODEL" || -z "$INPUT" ]]; then
  echo "Usage: run-anthropic.sh --model <model> --input <text> [--max-tokens N] [--system <text>] [--date YYYY-MM-DD] [--name prefix]" >&2
  exit 1
fi

if [[ -z "${ANTHROPIC_API_KEY:-}" ]]; then
  echo "ANTHROPIC_API_KEY is required" >&2
  exit 1
fi

"${ROOT_DIR}/scripts/new-run.sh"

RUN_DIR="${ROOT_DIR}/_state/runs/${DATE_STR}"
ART_DIR="${RUN_DIR}/artifacts"
mkdir -p "${ART_DIR}"

TS="$(date +%H%M%S)"
if [[ -z "$NAME" ]]; then
  NAME="anthropic-message-${TS}"
fi

REQ_PATH_REL="_state/runs/${DATE_STR}/artifacts/${NAME}.request.json"
RES_PATH_REL="_state/runs/${DATE_STR}/artifacts/${NAME}.response.json"
META_PATH_REL="_state/runs/${DATE_STR}/artifacts/${NAME}.meta.json"

REQ_PATH="${ROOT_DIR}/${REQ_PATH_REL}"
RES_PATH="${ROOT_DIR}/${RES_PATH_REL}"
META_PATH="${ROOT_DIR}/${META_PATH_REL}"

if [[ -n "$SYSTEM_PROMPT" ]]; then
  cat <<JSON > "${REQ_PATH}"
{
  "model": "${MODEL}",
  "max_tokens": ${MAX_TOKENS},
  "system": "${SYSTEM_PROMPT}",
  "messages": [
    {"role": "user", "content": "${INPUT}"}
  ]
}
JSON
else
  cat <<JSON > "${REQ_PATH}"
{
  "model": "${MODEL}",
  "max_tokens": ${MAX_TOKENS},
  "messages": [
    {"role": "user", "content": "${INPUT}"}
  ]
}
JSON
fi

node "${SCRIPT_DIR}/anthropic-message.js" \
  --request "${REQ_PATH}" \
  --response "${RES_PATH}" \
  --meta "${META_PATH}"

SHA_REQ="$(${ROOT_DIR}/scripts/sha256-file.sh "${REQ_PATH}")"
SHA_RES="$(${ROOT_DIR}/scripts/sha256-file.sh "${RES_PATH}")"
SHA_META="$(${ROOT_DIR}/scripts/sha256-file.sh "${META_PATH}")"

LOG_SCRIPT="${SCRIPT_DIR}/log-run.sh"

"${LOG_SCRIPT}" "Anthropic message request (${MODEL})" --date "${DATE_STR}" --artifact "${REQ_PATH_REL}" --hash "${SHA_REQ}"
"${LOG_SCRIPT}" "Anthropic message response (${MODEL})" --date "${DATE_STR}" --artifact "${RES_PATH_REL}" --hash "${SHA_RES}"
"${LOG_SCRIPT}" "Anthropic message metadata (${MODEL})" --date "${DATE_STR}" --artifact "${META_PATH_REL}" --hash "${SHA_META}"

echo "Request: ${REQ_PATH_REL}"
echo "Response: ${RES_PATH_REL}"
echo "Meta: ${META_PATH_REL}"
