#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MODE="offline"
DATE_STR="$(date +%F)"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mode)
      MODE="$2"; shift 2;;
    --date)
      DATE_STR="$2"; shift 2;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1;;
  esac
done

run() {
  echo "== $1 =="
  shift
  "$@"
}

cd "$ROOT_DIR"

# Verify required scripts exist
for f in scripts/validate-base120-refs.cjs scripts/validate-base120-canonical.cjs; do
  [ -f "$f" ] || { echo "Missing expected script: $f" >&2; exit 1; }
done

run "lint-state" scripts/lint-state.sh
run "kernel-decision" scripts/check-kernel-decision.sh
run "lint-skill-registry" scripts/lint-skill-registry.sh
run "lint-no-ts-tests" scripts/lint-no-ts-tests.sh
run "lint-base120-refs" node scripts/validate-base120-refs.cjs
run "lint-base120-canonical" node scripts/validate-base120-canonical.cjs
run "lint-network-policy" scripts/lint-network-policy.sh
run "lint-secrets-policy" scripts/lint-secrets-policy.sh
run "lint-secret-scan" scripts/lint-secret-scan.sh
run "lint-artifact-secrets" scripts/lint-artifact-secrets.sh
run "lint-no-server" scripts/lint-no-server.sh
run "lint-runner-capabilities" scripts/lint-runner-capabilities.sh
run "lint-runner-registry" scripts/lint-runner-registry-consistency.sh
run "lint-runner-compatibility" scripts/lint-runner-compatibility.sh
run "lint-base120-map" scripts/lint-base120-skill-map.sh
run "network-guard-regression" scripts/test-network-guard.sh

run "orchestrate" scripts/orchestrate.sh --force
run "governed-command" scripts/run-cmd.sh --runner codex --date "$DATE_STR" -- git status --porcelain

if [[ "$MODE" == "live" ]]; then
  if [[ -n "${OPENAI_API_KEY:-}" ]]; then
    run "openai-governed" scripts/run-openai-governed.sh --model gpt-4.1-mini --input "Hello from HUMMBL" --date "$DATE_STR"
  else
    echo "OPENAI_API_KEY not set; skipping OpenAI live test"
  fi

  if [[ -n "${ANTHROPIC_API_KEY:-}" ]]; then
    run "anthropic-governed" scripts/run-anthropic-governed.sh --model claude-3-5-sonnet-20241022 --input "Hello from HUMMBL" --date "$DATE_STR"
  else
    echo "ANTHROPIC_API_KEY not set; skipping Anthropic live test"
  fi
fi

echo "E2E validation complete (mode=${MODE})."
