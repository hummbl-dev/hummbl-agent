#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DATE_STR="$(date +%Y-%m-%d)"

file=""
source=""
note=""

usage() {
  echo "Usage: $0 --file <path> --source <ref> [--note <text>] [--date YYYY-MM-DD]" >&2
  exit 1
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --file)
      file="${2:-}"
      shift 2
      ;;
    --source)
      source="${2:-}"
      shift 2
      ;;
    --note)
      note="${2:-}"
      shift 2
      ;;
    --date)
      DATE_STR="${2:-}"
      shift 2
      ;;
    *)
      usage
      ;;
  esac

done

if [[ -z "${file}" || -z "${source}" ]]; then
  usage
fi

if [[ ! -f "${file}" ]]; then
  echo "File not found: ${file}" >&2
  exit 1
fi

EVIDENCE_DIR="${ROOT_DIR}/_state/evidence/${DATE_STR}"
mkdir -p "${EVIDENCE_DIR}"

base_name="$(basename "${file}")"
timestamp="$(date +%H%M%S)"

safe_name="${timestamp}-${base_name}"

dest="${EVIDENCE_DIR}/${safe_name}"
cp "${file}" "${dest}"

hash="$(${ROOT_DIR}/scripts/sha256-file.sh "${dest}")"

meta_file="${EVIDENCE_DIR}/EVIDENCE.md"
if [[ ! -f "${meta_file}" ]]; then
  {
    echo "# Evidence Log ${DATE_STR}"
    echo ""
  } > "${meta_file}"
fi

{
  echo "- file: _state/evidence/${DATE_STR}/${safe_name}"
  echo "  hash: ${hash}"
  echo "  source: ${source}"
  if [[ -n "${note}" ]]; then
    echo "  note: ${note}"
  fi
} >> "${meta_file}"

echo "Evidence imported: ${dest}"
