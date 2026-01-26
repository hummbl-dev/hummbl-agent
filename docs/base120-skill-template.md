# Base120 → Skill Definition Template

## Purpose

Standardize how a mental model becomes a governed skill definition.

## Template

### Mental Model

- Model code: `P1` / `IN3` / `DE3` / ...
- Model name: `name`
- Intent: `epistemic lens / reasoning operator`

### Skill Definition (Registry Entry)

- Skill id: `lowercase-with-dashes`
- Name: `human-readable`
- Summary: `<= 140 chars`
- Tags: `["base120", "model-code", "domain"]`
- Version: `0.1.0`
- Status: `experimental` | `active`
- Owners: `["owner"]`

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

## Migration Path

1. **Manual skill** (prompt/manual steps only)
2. **Scripted skill** (run-script steps added)
3. **Adapter-backed** (tools + policies enforced)
