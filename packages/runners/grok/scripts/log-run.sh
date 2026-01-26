#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../../../.." && pwd)"
RUNS_DIR="${ROOT_DIR}/_state/runs"
DATE_STR="$(date +%Y-%m-%d)"
RUN_DIR="${RUNS_DIR}/${DATE_STR}"
RUN_FILE="${RUN_DIR}/run.md"

summary=""
artifact_path=""
artifact_hash=""
use_hash_file=false
date_override=""

has_flags=false
for arg in "$@"; do
  if [[ "${arg}" == --* ]]; then
    has_flags=true
    break
  fi
done

if [[ "${has_flags}" == false ]]; then
  summary="${1:-}"
  artifact_path="${2:-}"
  artifact_hash="${3:-}"
else
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --artifact)
        artifact_path="${2:-}"
        shift 2
        ;;
      --hash)
        artifact_hash="${2:-}"
        shift 2
        ;;
      --date)
        date_override="${2:-}"
        shift 2
        ;;
      --hash-file)
        use_hash_file=true
        shift 1
        ;;
      *)
        if [[ -z "${summary}" ]]; then
          summary="$1"
          shift 1
        else
          echo "Unknown argument: $1" >&2
          exit 1
        fi
        ;;
    esac
  done
fi

if [[ -n "${date_override}" ]]; then
  DATE_STR="${date_override}"
  RUN_DIR="${RUNS_DIR}/${DATE_STR}"
  RUN_FILE="${RUN_DIR}/run.md"
fi

if [[ -z "${summary}" ]]; then
  echo "Usage: log-run.sh \"summary\" [artifact_path] [sha256] | log-run.sh \"summary\" [--artifact <path>] [--hash <sha256>] [--hash-file] [--date <YYYY-MM-DD>]" >&2
  exit 1
fi

if [[ "${use_hash_file}" == true && -n "${artifact_hash}" ]]; then
  echo "Use either --hash or --hash-file, not both" >&2
  exit 1
fi

artifact_abs="${artifact_path}"
artifact_display="${artifact_path}"
if [[ -n "${artifact_path}" && "${artifact_path}" != /* ]]; then
  artifact_abs="${ROOT_DIR}/${artifact_path}"
  artifact_display="${artifact_path#./}"
else
  case "${artifact_path}" in
    "${ROOT_DIR}/"*) artifact_display="${artifact_path#${ROOT_DIR}/}" ;;
  esac
fi

if [[ "${use_hash_file}" == true ]]; then
  if [[ -z "${artifact_path}" ]]; then
    echo "--hash-file requires --artifact <path>" >&2
    exit 1
  fi
  artifact_hash="$(${ROOT_DIR}/scripts/sha256-file.sh "${artifact_abs}")"
fi

mkdir -p "${RUN_DIR}"
if [[ ! -f "${RUN_FILE}" ]]; then
  {
    echo "# Run Log ${DATE_STR}"
    echo ""
  } > "${RUN_FILE}"
fi

stamp="$(date +%H:%M:%S)"
line="- ${stamp} | ${summary}"

if [[ -n "${artifact_path}" ]]; then
  line+=" | artifact=${artifact_display}"
fi
if [[ -n "${artifact_hash}" ]]; then
  line+=" | sha256=${artifact_hash}"
fi

echo "${line}" >> "${RUN_FILE}"
