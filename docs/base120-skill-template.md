# Base120 → Skill Definition Template

## Purpose

Standardize how a mental model becomes a governed skill definition.

## Template

### Mental Model

- Model code: `P1` / `IN3` / `DE3` / ...
- Model name: `name`
- Intent: `epistemic lens / reasoning operator`

### Skill Definition (Registry Entry)

- Skill id: `S.<category>.<slug>.v<semver>`
- Name: `human-readable`
- Summary: `<= 140 chars`
- Tags: `["base120", "model-code", "domain"]`
- Version: `0.1.0`
- Status: `experimental` | `active`
- Owners: `["owner"]`
- Skill kind: `primitive_transformation` | `integration_pattern` | `model_binding`
- Transformation code: `T.PER` | `T.INV` | `T.COM` | `T.DEC` | `T.REC` | `T.SYS` | `T.INT`
- Base120 bindings:
  - drives_selection: `[model codes]`
  - sets_parameters: `[{model, param, rule}]`
  - adds_constraints: `[{model, constraint_id}]`
  - stop_conditions: `[{model, condition_id}]`

### Selection Signals

- Task title/description tags that should trigger selection
- RunState objective keywords
- Explicit mention of skill id

### Inputs / Outputs

- Inputs: list of required inputs (name/type/description)
- Outputs: list of expected outputs

### Permissions

- Network: none|restricted|open
- Filesystem: none|read|write
- Exec: none|allowlisted
- Secrets: none|read

### Safety

- Risk: low|medium|high
- Notes: `risk rationale`

### Execution Pattern (Start Manual)

- Step 1: manual/prompt step describing how to apply the model
- Step 2: optional run-script step (only when implemented)
- Step 3: log step for artifacts/handoffs

### Provenance

- createdAt: YYYY-MM-DD
- source: native | vendor-pattern
- references: [paths/links]

## Kind rules (enforced by lint)

- `primitive_transformation`: no `dependsOnSkills`, no `gates`, no `evidenceBundle`.
- `integration_pattern`: must `dependsOnSkills` (>=2), plus `gates` and `evidenceBundle`.
- `model_binding`: no tools, `permissions.exec = none`.

## Namespace reminders

- Transformations are `T.*` codes (never Base120 codes).
- Mental models are Base120 (`P1`, `SY1`, `DE3`, ...).
- Skills are `S.*` ids and reference Base120 only via bindings.

## Migration Path

1. **Manual skill** (prompt/manual steps only)
2. **Scripted skill** (run-script steps added)
3. **Adapter-backed** (tools + policies enforced)
