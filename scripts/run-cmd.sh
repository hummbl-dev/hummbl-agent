#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ALLOWLIST_FILE="${ROOT_DIR}/configs/process-policy.allowlist"

runner=""
cwd="${ROOT_DIR}"
name=""
date_str="$(date +%Y-%m-%d)"

usage() {
  echo "Usage: $0 --runner <claude-code|codex> [--cwd <path>] [--name <artifact_prefix>] [--date <YYYY-MM-DD>] -- <cmd> [args...]" >&2
  exit 1
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --runner)
      runner="${2:-}"
      shift 2
      ;;
    --cwd)
      cwd="${2:-}"
      shift 2
      ;;
    --name)
      name="${2:-}"
      shift 2
      ;;
    --date)
      date_str="${2:-}"
      shift 2
      ;;
    --)
      shift
      break
      ;;
    *)
      usage
      ;;
  esac

done

if [[ -z "${runner}" ]]; then
  echo "Missing --runner" >&2
  usage
fi

case "${runner}" in
  claude-code|codex) ;;
  *) echo "Unknown runner: ${runner}" >&2; exit 1 ;;
 esac

if [[ $# -lt 1 ]]; then
  echo "Missing command" >&2
  usage
fi

cmd="$1"
shift
args=("$@")

if [[ "${cmd}" == */* ]]; then
  echo "Command must be an executable name, not a path: ${cmd}" >&2
  exit 1
fi

if [[ ! -f "${ALLOWLIST_FILE}" ]]; then
  echo "Allowlist missing: ${ALLOWLIST_FILE}" >&2
  exit 1
fi

allowed=false
while IFS= read -r line; do
  line="${line%%#*}"
  line="${line//$'\t'/}"
  line="${line//$'\r'/}"
  line="${line#"${line%%[![:space:]]*}"}"
  line="${line%"${line##*[![:space:]]}"}"
  if [[ -z "${line}" ]]; then
    continue
  fi
  if [[ "${line}" == "${cmd}" ]]; then
    allowed=true
    break
  fi
done < "${ALLOWLIST_FILE}"

if [[ "${allowed}" != true ]]; then
  echo "Command not allowlisted: ${cmd}" >&2
  exit 1
fi

if [[ -z "${name}" ]]; then
  name="${cmd}"
fi

if [[ ! -d "${cwd}" ]]; then
  echo "cwd does not exist: ${cwd}" >&2
  exit 1
fi

RUN_DIR="${ROOT_DIR}/_state/runs/${date_str}"
ART_DIR="${RUN_DIR}/artifacts"
mkdir -p "${ART_DIR}"

stdout_file="${ART_DIR}/${name}.stdout.txt"
stderr_file="${ART_DIR}/${name}.stderr.txt"
exit_file="${ART_DIR}/${name}.exitcode.txt"

"${ROOT_DIR}/scripts/new-run.sh" >/dev/null

set +e
(cd "${cwd}" && "${cmd}" "${args[@]}") >"${stdout_file}" 2>"${stderr_file}"
exit_code=$?
set -e

echo "${exit_code}" > "${exit_file}"

stdout_hash=$("${ROOT_DIR}/scripts/sha256-file.sh" "${stdout_file}")
stderr_hash=$("${ROOT_DIR}/scripts/sha256-file.sh" "${stderr_file}")
exit_hash=$("${ROOT_DIR}/scripts/sha256-file.sh" "${exit_file}")

log_tool="${ROOT_DIR}/packages/runners/${runner}/scripts/log-run.sh"

cmd_display="${cmd} ${args[*]}"

stdout_rel="${stdout_file#${ROOT_DIR}/}"
stderr_rel="${stderr_file#${ROOT_DIR}/}"
exit_rel="${exit_file#${ROOT_DIR}/}"

"${log_tool}" "cmd: ${cmd_display} (exit ${exit_code})" --date "${date_str}" --artifact "${stdout_rel}" --hash "${stdout_hash}"
"${log_tool}" "cmd: ${cmd_display} (stderr)" --date "${date_str}" --artifact "${stderr_rel}" --hash "${stderr_hash}"
"${log_tool}" "cmd: ${cmd_display} (exitcode)" --date "${date_str}" --artifact "${exit_rel}" --hash "${exit_hash}"

cat <<EOT
exit_code=${exit_code}
stdout=${stdout_file}
stdout_hash=${stdout_hash}
stderr=${stderr_file}
stderr_hash=${stderr_hash}
exitcode=${exit_file}
exitcode_hash=${exit_hash}
EOT
