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

- `id`: canonical skill id in `S.*` namespace.
- `summary`: max 140 chars.
- `version`: semver-like `x.y.z`.
- `skill_kind`: `primitive_transformation` | `integration_pattern` | `model_binding`.
- `transformation_code`: `T.*` code for the transformation implemented by the skill.
- `base120_bindings`: selection/parameter/constraint/stop bindings for Base120 models.
- `aliases`: optional legacy ids or Base120 codes (non-canonical).
- `runnerCompatibility`: runner ids (string); recommended ids include claude-code, codex, grok, local-cli.
- `requiredTools`: tool ids and optional scopes.
- `permissions`: network/filesystem/exec/secrets.
- `provenance`: origin metadata and references.
- `dependsOnSkills` / `gates` / `evidenceBundle`: orchestration metadata for integration patterns.

## Namespace separation

- Transformations: `T.*` codes only.
- Mental models: Base120 codes only (e.g., `P1`, `SY1`), referenced in bindings.
- Skills: `S.*` ids only.

## Governance

If changes impact kernel/tool contracts, add a decision note under `_state/decisions/`.
