#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PINS_FILE="${ROOT_DIR}/vendor/UPSTREAM_PINS.md"

usage() {
  echo "Usage: $0 {init|status|update <name> <ref>}" >&2
  exit 1
}

upstream_url() {
  case "${1}" in
    moltbot) echo "https://github.com/moltbot/moltbot.git" ;;
    moltbot-registry) echo "https://github.com/moltbot-registry/moltbot-registry.git" ;;
    everything-claude-code) echo "https://github.com/everything-claude-code/everything-claude-code.git" ;;
    *) return 1 ;;
  esac
}

upstream_path() {
  case "${1}" in
    moltbot) echo "vendor/moltbot" ;;
    moltbot-registry) echo "vendor/moltbot-registry" ;;
    everything-claude-code) echo "vendor/everything-claude-code" ;;
    *) return 1 ;;
  esac
}

write_pins_header() {
  if [[ ! -f "${PINS_FILE}" ]]; then
    {
      echo "# UPSTREAM_PINS"
      echo ""
      echo "| name | url | path | pinned_sha | pinned_ref | pinned_date | pinned_by |"
      echo "| --- | --- | --- | --- | --- | --- | --- |"
    } > "${PINS_FILE}"
  fi
}

upsert_pin() {
  local name="$1"
  local url="$2"
  local path="$3"
  local sha="$4"
  local ref="$5"
  local date_str="$6"
  local pinned_by="$7"

  write_pins_header

  if grep -q "^| ${name} |" "${PINS_FILE}"; then
    local tmp_file="${PINS_FILE}.tmp"
    awk -v n="${name}" -v u="${url}" -v p="${path}" -v s="${sha}" -v r="${ref}" -v d="${date_str}" -v b="${pinned_by}" '
      $0 ~ "^\\| " n " \\|" { printf "| %s | %s | %s | %s | %s | %s | %s |\n", n, u, p, s, r, d, b; next }
      { print }
    ' "${PINS_FILE}" > "${tmp_file}"
    mv "${tmp_file}" "${PINS_FILE}"
  else
    echo "| ${name} | ${url} | ${path} | ${sha} | ${ref} | ${date_str} | ${pinned_by} |" >> "${PINS_FILE}"
  fi
}

cmd_init() {
  echo "# Run these commands to initialize vendor submodules"
  for name in moltbot moltbot-registry everything-claude-code; do
    url="$(upstream_url "${name}")"
    path="$(upstream_path "${name}")"
    echo "git submodule add ${url} ${path}"
  done
  echo "git submodule update --init --recursive"

  date_str="$(date +%Y-%m-%d)"
  for name in moltbot moltbot-registry everything-claude-code; do
    url="$(upstream_url "${name}")"
    path="$(upstream_path "${name}")"
    upsert_pin "${name}" "${url}" "${path}" "unknown" "unknown" "${date_str}" "unknown"
  done
}

cmd_status() {
  if [[ ! -f "${ROOT_DIR}/.gitmodules" ]]; then
    echo "Submodules not initialized (.gitmodules missing)."
  fi

  date_str="$(date +%Y-%m-%d)"
  for name in moltbot moltbot-registry everything-claude-code; do
    url="$(upstream_url "${name}")"
    path="$(upstream_path "${name}")"
    if [[ -f "${ROOT_DIR}/.gitmodules" ]] && git submodule status -- "${path}" >/dev/null 2>&1; then
      sha="$(git -C "${ROOT_DIR}/${path}" rev-parse HEAD)"
      ref="$(git -C "${ROOT_DIR}/${path}" rev-parse --abbrev-ref HEAD)"
      echo "${name} | ${path} | ${url} | ${sha}"
      upsert_pin "${name}" "${url}" "${path}" "${sha}" "${ref}" "${date_str}" "status"
    else
      echo "${name} | ${path} | ${url} | not initialized"
      upsert_pin "${name}" "${url}" "${path}" "unknown" "unknown" "${date_str}" "status"
    fi
  done
}

cmd_update() {
  name="${1:-}"
  ref="${2:-}"
  if [[ -z "${name}" || -z "${ref}" ]]; then
    usage
  fi
  url="$(upstream_url "${name}")" || usage
  path="$(upstream_path "${name}")"

  echo "# Run these commands to update ${name}"
  echo "git submodule update --init ${path}"
  echo "cd ${path}"
  echo "git fetch --all --tags"
  echo "git checkout ${ref}"
  echo "SHA=\$(git rev-parse HEAD)"
  echo "REF=\$(git rev-parse --abbrev-ref HEAD)"
  echo "cd -"
  echo "${ROOT_DIR}/scripts/sync-upstreams.sh status"
  echo "git add ${path} .gitmodules vendor/UPSTREAM_PINS.md"
  echo "git commit -m \"Pin ${name} to \${SHA} (${ref})\""
}

case "${1:-}" in
  init) cmd_init ;;
  status) cmd_status ;;
  update) shift; cmd_update "$@" ;;
  *) usage ;;
esac
