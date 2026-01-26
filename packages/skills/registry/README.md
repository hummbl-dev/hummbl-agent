# Skill Registry

Static, governed registry of skills available in hummbl-agent.

## Purpose

- Enumerate skills with deterministic metadata.
- Map skills to required tools/permissions and compatible runners.
- Enable future routing without runtime coupling.

## How to add a skill

1. Edit `src/registry.json`.
2. Run `scripts/lint-skill-registry.sh`.

## Field definitions (brief)

- `id`: lowercase-with-dashes, unique.
- `summary`: max 140 chars.
- `version`: semver-like `x.y.z`.
- `runnerCompatibility`: runner ids (string); recommended ids include claude-code, codex, grok, local-cli.
- `requiredTools`: tool ids and optional scopes.
- `permissions`: network/filesystem/exec/secrets.
- `provenance`: origin metadata and references.

## Governance

If changes impact kernel/tool contracts, add a decision note under `_state/decisions/`.
