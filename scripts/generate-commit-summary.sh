#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: generate-commit-summary.sh [--date YYYY-MM-DD] [--repo PATH] [--output PATH]

Generate a summary report for commits made on the specified date.
Defaults to today's date and the current repository.
EOF
}

DATE="$(date +%Y-%m-%d)"
REPO_ROOT="${WORKSPACE_ROOT:-$(pwd)}"
OUTPUT=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --date)
      DATE="${2:-}"
      shift 2
      ;;
    --repo)
      REPO_ROOT="${2:-}"
      shift 2
      ;;
    --output)
      OUTPUT="${2:-}"
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [[ -z "${DATE}" ]]; then
  echo "Missing date value for --date" >&2
  exit 1
fi

if ! git -C "${REPO_ROOT}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repository: ${REPO_ROOT}" >&2
  exit 1
fi

if ! git -C "${REPO_ROOT}" rev-parse --verify HEAD >/dev/null 2>&1; then
  if [[ -n "${OUTPUT}" ]]; then
    mkdir -p "$(dirname "${OUTPUT}")"
    exec > "${OUTPUT}"
  fi
  repo_path="$(git -C "${REPO_ROOT}" rev-parse --show-toplevel)"
  generated_at="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "COMMIT SUMMARY REPORT"
  echo "Date: ${DATE}"
  echo "Repository: ${repo_path}"
  echo "Generated: ${generated_at}"
  echo ""
  echo "No commits found for ${DATE}."
  exit 0
fi

today="$(date +%Y-%m-%d)"
since="${DATE} 00:00:00"
until="${DATE} 23:59:59"
if [[ "${DATE}" == "${today}" ]]; then
  until="$(date +%Y-%m-%d\ %H:%M:%S)"
fi

mapfile -t commits < <(
  git -C "${REPO_ROOT}" log \
    --since="${since}" \
    --until="${until}" \
    --pretty=format:'%H|%h|%an|%ad|%s' \
    --date=iso
)

if [[ -n "${OUTPUT}" ]]; then
  mkdir -p "$(dirname "${OUTPUT}")"
  exec > "${OUTPUT}"
fi

repo_path="$(git -C "${REPO_ROOT}" rev-parse --show-toplevel)"
generated_at="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

echo "COMMIT SUMMARY REPORT"
echo "Date: ${DATE}"
echo "Repository: ${repo_path}"
echo "Generated: ${generated_at}"
echo ""

if [[ ${#commits[@]} -eq 0 ]]; then
  echo "No commits found for ${DATE}."
  exit 0
fi

declare -A type_counts=()

echo "Total commits: ${#commits[@]}"
echo ""
echo "Commit Details:"
for entry in "${commits[@]}"; do
  IFS='|' read -r full_hash short_hash author authored_at subject <<< "${entry}"
  echo "- ${short_hash} | ${authored_at} | ${author} | ${subject}"
  type="other"
  if [[ "${subject}" == *:* ]]; then
    type_candidate="${subject%%:*}"
    type_candidate="${type_candidate%%(*}"
    if [[ "${type_candidate}" =~ ^[A-Za-z]+$ ]]; then
      type="${type_candidate,,}"
    fi
  fi
  type_counts["${type}"]=$((type_counts["${type}"] + 1))
done

echo ""
echo "Commit Types:"
while IFS='|' read -r type count; do
  echo "- ${type}: ${count}"
done < <(
  for type in "${!type_counts[@]}"; do
    printf '%s|%s\n' "${type}" "${type_counts[${type}]}"
  done | sort
)
