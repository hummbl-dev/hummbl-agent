#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DATE_STR="$(date +%Y-%m-%d)"
RUN_DIR="${ROOT_DIR}/_state/runs/${DATE_STR}"
PROMPTS_DIR="${RUN_DIR}/prompts"

force=false
if [[ "${1:-}" == "--force" ]]; then
  force=true
fi

"${ROOT_DIR}/scripts/new-run.sh"
mkdir -p "${PROMPTS_DIR}"

claude_prompt="${PROMPTS_DIR}/claude-code-prompt.md"
codex_prompt="${PROMPTS_DIR}/codex-prompt.md"
grok_prompt="${PROMPTS_DIR}/grok-prompt.md"

if [[ -f "${claude_prompt}" && "${force}" == false ]]; then
  echo "Prompt already exists: ${claude_prompt}" >&2
  echo "Re-run with --force to overwrite." >&2
  exit 1
fi

if [[ -f "${codex_prompt}" && "${force}" == false ]]; then
  echo "Prompt already exists: ${codex_prompt}" >&2
  echo "Re-run with --force to overwrite." >&2
  exit 1
fi

if [[ -f "${grok_prompt}" && "${force}" == false ]]; then
  echo "Prompt already exists: ${grok_prompt}" >&2
  echo "Re-run with --force to overwrite." >&2
  exit 1
fi

"${ROOT_DIR}/packages/runners/claude-code/scripts/make-prompt.sh" > "${claude_prompt}"
"${ROOT_DIR}/packages/runners/codex/scripts/make-prompt.sh" > "${codex_prompt}"
"${ROOT_DIR}/packages/runners/grok/scripts/make-prompt.sh" > "${grok_prompt}"

cat <<EOT
Next steps
- Prompts:
  - ${claude_prompt}
  - ${codex_prompt}
  - ${grok_prompt}
- Suggested first logs:
  - packages/runners/claude-code/scripts/log-run.sh "Session start: claude-code" --artifact "${claude_prompt}" --hash-file
  - packages/runners/codex/scripts/log-run.sh "Session start: codex" --artifact "${codex_prompt}" --hash-file
  - packages/runners/grok/scripts/log-run.sh "Session start: grok" --artifact "${grok_prompt}" --hash-file
- Reminder: update CURRENT_STATE locks for lane assignments
EOT
