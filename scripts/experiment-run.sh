#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DATE_STR="$(date +%Y-%m-%d)"
RUN_DIR="${ROOT_DIR}/_state/experiments/${DATE_STR}"

mkdir -p "${RUN_DIR}"

run_file="${RUN_DIR}/RUN.md"
proposals_file="${RUN_DIR}/PROPOSALS.md"
approval_file="${RUN_DIR}/APPROVAL.md"

if [[ ! -f "${run_file}" ]]; then
  {
    echo "# Experiment Run ${DATE_STR}"
    echo ""
    echo "Status: OPEN"
    echo ""
    echo "## Log"
  } > "${run_file}"
fi

if [[ ! -f "${proposals_file}" ]]; then
  {
    echo "# Proposals"
    echo ""
    echo "## Proposed Changes"
  } > "${proposals_file}"
fi

if [[ ! -f "${approval_file}" ]]; then
  {
    echo "# Approval"
    echo ""
    echo "## Decision"
    echo "Status: PENDING"
    echo ""
    echo "## Rationale"
  } > "${approval_file}"
fi

echo "Opened experiment run: ${RUN_DIR}"
echo "- ${run_file}"
echo "- ${proposals_file}"
echo "- ${approval_file}"
