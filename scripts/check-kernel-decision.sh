#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [[ -z "${GITHUB_EVENT_NAME:-}" || "${GITHUB_EVENT_NAME}" != "pull_request" ]]; then
  exit 0
fi

if [[ ! -d "${ROOT_DIR}/.git" ]]; then
  echo "Git repository not found; skipping kernel decision check" >&2
  exit 0
fi

git fetch origin main >/dev/null 2>&1 || true

cd "${ROOT_DIR}"

kernel_changed=$(git diff --name-only origin/main...HEAD -- packages/kernel | wc -l | tr -d ' ')
decision_changed=$(git diff --name-only origin/main...HEAD -- _state/decisions | wc -l | tr -d ' ')
override_present=false
if [[ -f "${ROOT_DIR}/_state/decisions/KERNEL_CHANGE_OK" ]]; then
  override_present=true
fi

if [[ "${kernel_changed}" != "0" ]]; then
  if [[ "${decision_changed}" != "0" || "${override_present}" == true ]]; then
    exit 0
  fi
  echo "Kernel changes detected in packages/kernel/ without a decision note." >&2
  echo "Add or update a file under _state/decisions/ or include _state/decisions/KERNEL_CHANGE_OK." >&2
  exit 1
fi
