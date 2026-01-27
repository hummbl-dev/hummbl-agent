#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

MODEL=""
INPUT=""
DATE_STR="$(date +%F)"
NAME=""

validate_date() {
  local value="$1"
  if [[ ! "${value}" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    echo "Invalid --date (expected YYYY-MM-DD): ${value}" >&2
    exit 1
  fi
}

validate_name() {
  local value="$1"
  if [[ -z "${value}" ]]; then
    return
  fi
  if [[ "${value}" == *"/"* || "${value}" == *"\\"* || "${value}" == *".."* ]]; then
    echo "Invalid --name (path traversal): ${value}" >&2
    exit 1
  fi
  if [[ ! "${value}" =~ ^[A-Za-z0-9._-]+$ ]]; then
    echo "Invalid --name (allowed: A-Z a-z 0-9 . _ -): ${value}" >&2
    exit 1
  fi
}

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
  echo "Usage: run-openai-governed.sh --model <model> --input <text> [--date YYYY-MM-DD] [--name prefix]" >&2
  exit 1
fi

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "OPENAI_API_KEY is required" >&2
  exit 1
fi

validate_date "${DATE_STR}"

RUN_DIR="${ROOT_DIR}/_state/runs/${DATE_STR}"
ART_DIR="${RUN_DIR}/artifacts"
mkdir -p "${ART_DIR}"

TS="$(date +%H%M%S)"
if [[ -z "$NAME" ]]; then
  NAME="openai-response-${TS}"
fi
validate_name "${NAME}"

REQ_PATH_REL="_state/runs/${DATE_STR}/artifacts/${NAME}.request.json"
RES_PATH_REL="_state/runs/${DATE_STR}/artifacts/${NAME}.response.json"
META_PATH_REL="_state/runs/${DATE_STR}/artifacts/${NAME}.meta.json"

REQ_PATH="${ROOT_DIR}/${REQ_PATH_REL}"
RES_PATH="${ROOT_DIR}/${RES_PATH_REL}"
META_PATH="${ROOT_DIR}/${META_PATH_REL}"

node "${ROOT_DIR}/scripts/build-request.cjs" \
  --type openai \
  --out "${REQ_PATH}" \
  --model "${MODEL}" \
  --input "${INPUT}" \
  --check-rate-limit

"${ROOT_DIR}/scripts/run-cmd.sh" \
  --runner codex \
  --date "${DATE_STR}" \
  --name "${NAME}" \
  -- node "${ROOT_DIR}/packages/runners/codex/scripts/openai-response.cjs" \
    --request "${REQ_PATH}" \
    --response "${RES_PATH}" \
    --meta "${META_PATH}"

SHA_REQ="$(${ROOT_DIR}/scripts/sha256-file.sh "${REQ_PATH}")"
SHA_RES="$(${ROOT_DIR}/scripts/sha256-file.sh "${RES_PATH}")"
SHA_META="$(${ROOT_DIR}/scripts/sha256-file.sh "${META_PATH}")"

LOG_SCRIPT="${ROOT_DIR}/packages/runners/codex/scripts/log-run.sh"

"${LOG_SCRIPT}" "OpenAI response request (${MODEL})" --date "${DATE_STR}" --artifact "${REQ_PATH_REL}" --hash "${SHA_REQ}"
"${LOG_SCRIPT}" "OpenAI response result (${MODEL})" --date "${DATE_STR}" --artifact "${RES_PATH_REL}" --hash "${SHA_RES}"
"${LOG_SCRIPT}" "OpenAI response metadata (${MODEL})" --date "${DATE_STR}" --artifact "${META_PATH_REL}" --hash "${SHA_META}"

echo "Request: ${REQ_PATH_REL}"
echo "Response: ${RES_PATH_REL}"
echo "Meta: ${META_PATH_REL}"
