#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../../../.." && pwd)"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

MODEL=""
INPUT=""
DATE_STR="$(date +%F)"
NAME=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --model)
      MODEL="$2"; shift 2;;
    --input)
      INPUT="$2"; shift 2;;
    --date)
      DATE_STR="$2"; shift 2;;
    --name)
      NAME="$2"; shift 2;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1;;
  esac
done

if [[ -z "$MODEL" || -z "$INPUT" ]]; then
  echo "Usage: run-openai.sh --model <model> --input <text> [--date YYYY-MM-DD] [--name prefix]" >&2
  exit 1
fi

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "OPENAI_API_KEY is required" >&2
  exit 1
fi

"${ROOT_DIR}/scripts/new-run.sh"

RUN_DIR="${ROOT_DIR}/_state/runs/${DATE_STR}"
ART_DIR="${RUN_DIR}/artifacts"
mkdir -p "${ART_DIR}"

TS="$(date +%H%M%S)"
if [[ -z "$NAME" ]]; then
  NAME="openai-response-${TS}"
fi

REQ_PATH_REL="_state/runs/${DATE_STR}/artifacts/${NAME}.request.json"
RES_PATH_REL="_state/runs/${DATE_STR}/artifacts/${NAME}.response.json"
META_PATH_REL="_state/runs/${DATE_STR}/artifacts/${NAME}.meta.json"

REQ_PATH="${ROOT_DIR}/${REQ_PATH_REL}"
RES_PATH="${ROOT_DIR}/${RES_PATH_REL}"
META_PATH="${ROOT_DIR}/${META_PATH_REL}"

cat <<JSON > "${REQ_PATH}"
{
  "model": "${MODEL}",
  "input": "${INPUT}"
}
JSON

node "${SCRIPT_DIR}/openai-response.js" \
  --request "${REQ_PATH}" \
  --response "${RES_PATH}" \
  --meta "${META_PATH}"

SHA_REQ="$(${ROOT_DIR}/scripts/sha256-file.sh "${REQ_PATH}")"
SHA_RES="$(${ROOT_DIR}/scripts/sha256-file.sh "${RES_PATH}")"
SHA_META="$(${ROOT_DIR}/scripts/sha256-file.sh "${META_PATH}")"

LOG_SCRIPT="${SCRIPT_DIR}/log-run.sh"

"${LOG_SCRIPT}" "OpenAI response request (${MODEL})" --date "${DATE_STR}" --artifact "${REQ_PATH_REL}" --hash "${SHA_REQ}"
"${LOG_SCRIPT}" "OpenAI response result (${MODEL})" --date "${DATE_STR}" --artifact "${RES_PATH_REL}" --hash "${SHA_RES}"
"${LOG_SCRIPT}" "OpenAI response metadata (${MODEL})" --date "${DATE_STR}" --artifact "${META_PATH_REL}" --hash "${SHA_META}"

echo "Request: ${REQ_PATH_REL}"
echo "Response: ${RES_PATH_REL}"
echo "Meta: ${META_PATH_REL}"
