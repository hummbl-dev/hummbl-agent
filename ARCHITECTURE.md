# ARCHITECTURE

## Overview

HUMMBL Agent is a governed multi-runner substrate for orchestrating AI agents across Claude Code, Codex, and Grok with strict execution boundaries, Base120 mental model integration, and comprehensive audit trails.

**Core principles:**

- **Registry-first:** Local `skills/MANIFEST.json` is authoritative; no external dependencies
- **Governed writes:** All process execution flows through policy-checked adapters
- **Artifact provenance:** Every run logged to `_state/runs/<date>/` with tuple gates
- **External-agent boundary:** External ecosystems informational only; no runtime coupling

## Components

### Kernel (Types-Only)

**Location:** `packages/kernel/`

**Purpose:** Provides shared type contracts for the entire system without runtime dependencies.

**Key exports:**

- Agent types (task, state, memory)
- Runner interfaces
- Tool definitions
- Tuple types (TupleV1)
- Artifact schemas

**Policy:** No runtime code; types only. Validated by `tsc --noEmit` in CI (`kernel-tuples` workflow).

### Router

**Location:** `packages/router/`

**Purpose:** Deterministic routing logic that selects skills based on capabilities, policies, and tuple scopes.

**Key responsibilities:**

- LLM vendor routing (Anthropic vs OpenAI based on purpose/scope)
- Skill selection from registry
- Capability matching
- Policy enforcement (network, exec, risk levels)

**Current state:** TypeScript source only (no compiled output); tests skipped pending build infrastructure.

### Skills Registry

**Location:** `packages/skills/registry/`, `skills/MANIFEST.json`

**Purpose:** Canonical registry of all available skills with integrity hashes.

**Structure:**

```json
{
  "version": "1.0.0",
  "registry_root": "skills",
  "skills": [
    {
      "id": "llm.anthropic.call",
      "path": "skills/llm/anthropic/call",
      "sha256_tree": "<hash>"
    }
  ]
}
```

**Governance:**

- `scripts/registry/compute-skills-manifest.mjs`: Regenerates manifest
- `scripts/registry/check-skills-manifest.mjs`: Validates hashes
- `scripts/lint-skill-registry.sh`: Enforces integrity
- CI ensures manifest is committed (no drift)

### Adapters

**Location:** `packages/adapters/`

**Purpose:** Governed wrappers for external capabilities.

#### Process Adapter

**Path:** `packages/adapters/process/`

**Enforces:**

- Allowlist of executable names (`configs/process-policy.allowlist`)
- Timeout limits
- Output size caps
- Working directory restrictions

**Usage:** All `run_in_terminal` calls in runners flow through this adapter.

#### LLM Adapters

**Paths:**

- `packages/adapters/llm/anthropic/`
- `packages/adapters/llm/openai/`

**Enforces:**

- Dry-run mode by default (requires `MOLTBOT_LIVE_LLM_CALLS=1`)
- Model allowlists
- Prompt length limits
- API key presence checks
- Tuple provenance (sha256 gate)

**Configuration:** `configs/moltbot/llm.{anthropic,openai}.local.json` (gitignored)

#### Communication Adapters

**Paths:**

- `packages/adapters/communication/slack/`
- `packages/adapters/communication/discord/`

**Enforces:**

- Stub-first (no live networking in Phase 1)
- Provider config validation
- Live guard (requires `MOLTBOT_LIVE_COMM=1`)
- Message content validation

**Configuration:** `configs/moltbot/comm.{slack,discord}.local.json` (gitignored)

### Runners

**Location:** `packages/runners/`

**Purpose:** Runner-specific scaffolding, prompts, and execution scripts.

**Runners:**

- `claude-code/`: Claude Code (Anthropic) integration
- `codex/`: OpenAI Codex runner
- `grok/`: xAI Grok runner
- `template/`: Scaffold for new runners

**Structure per runner:**

```
runner-name/
├── prompts/           # Prompt packets for orchestration
├── scripts/
│   ├── make-prompt.sh # Generate prompts from templates
│   ├── log-run.sh     # Capture run artifacts
│   └── run-*.sh       # Governed execution wrappers
└── CAPABILITIES.json  # Declared capabilities
```

**Governance:**

- `scripts/lint-runner-capabilities.sh`: Validates CAPABILITIES.json
- `scripts/lint-runner-registry-consistency.sh`: Cross-checks with registry
- `scripts/lint-runner-compatibility.sh`: Validates skill compatibility

### Vendor Bridge

**Location:** `packages/vendor-bridge/`

**Purpose:** Path mapping for vendor code without runtime coupling.

**Responsibilities:**

- Resolve vendor paths (if needed)
- No execution or imports from vendor code
- Documentation/reference only

## Integration Points

### External Agents (Claude Code, Codex, Grok)

**Boundary enforcement:**

- Agents invoke via `scripts/run-cmd.sh --runner <name>`
- All executions logged to `_state/runs/<date>/`
- Provenance captured (agent, timestamp, command, output)

**Protection:**

- Vendor code read-only (CI rejects edits)
- Process execution requires allowlist
- Network calls require policy approval

### Base120 Mental Models

**Integration:**

- Skills under `skills/P-perspective/`, `skills/IN-inversion/`, etc.
- Canonical JSON: `docs/base120.v1.0.canonical.json`
- Router uses Base120 bindings for selection
- Commands: `/apply-transformation`, `/plan-with-base120`

**Validation:**

- `scripts/validate-base120-canonical.cjs`: Validates canonical JSON
- `scripts/validate-base120-refs.cjs`: Checks skill references
- `scripts/lint-base120-skill-map.sh`: Ensures skill map current

### State Management

**Artifacts:**

- `_state/CURRENT_STATE.md`: Canonical state snapshot
- `_state/TODO.md`: Task tracking
- `_state/runs/<date>/`: Run logs (gitignored)
- `_state/evidence/`: Governed evidence imports
- `_state/decisions/`: Architectural decisions

**Governance:**

- `scripts/lint-state.sh`: Validates state format
- `scripts/check-kernel-decision.sh`: Ensures decision log current

## Data Flow

### Governed Command Execution

```
External Agent Request
  ↓
scripts/run-cmd.sh --runner <name> -- <command>
  ↓
Process Adapter (policy check)
  ↓
Allowlist validation
  ↓
Execute with timeout/caps
  ↓
Capture output to _state/runs/<date>/
  ↓
Return result to agent
```

### LLM Call Flow

```
Runner invokes skill (llm.anthropic.call)
  ↓
Router selects based on tuple scope
  ↓
LLM Adapter loads config
  ↓
Dry-run check (live guard)
  ↓
Model allowlist validation
  ↓
API call (if guards pass)
  ↓
Response logged with tuple sha256
  ↓
Return to runner
```

### Skill Registry Update

```
Add/modify skill in skills/<path>/
  ↓
Run scripts/registry/compute-skills-manifest.mjs
  ↓
Regenerate MANIFEST.json with hashes
  ↓
Commit MANIFEST.json
  ↓
CI validates manifest committed
  ↓
CI checks hashes match
```

## Security Boundaries

### Trust Zones

**Trusted:**

- Local skill registry (`skills/MANIFEST.json`)
- Kernel type contracts (`packages/kernel/`)
- Governance scripts (`scripts/*.sh`, `scripts/*.mjs`)

**Governed:**

- External process execution (allowlist required)
- Network calls (policy required)
- File writes (audit logged)

**Untrusted:**

- External registries (informational only)
- Vendor code (read-only reference)
- User-provided commands (validated before execution)

### Isolation Mechanisms

- **Process:** Allowlist + timeout + output caps
- **Network:** Policy + rate limits + domain allowlist
- **File system:** Protected paths (vendor/, configs/*.local.json)
- **Secrets:** Never committed; policy-validated storage

## Testing Strategy

**Test files:** `.test.mjs` only (no `.test.ts` allowed)

**Test runner:** Node's built-in `--test` flag

**Test types:**

- Unit tests: Adapter offline tests (config validation, guards)
- Integration tests: Router selection logic (pending build)
- E2E validation: `scripts/e2e-validate.sh` (all lints + tests)

**Enforcement:**

- `scripts/lint-no-ts-tests.sh`: Blocks `.test.ts` files
- CI runs all tests on every PR

## Extension Points

**Adding a new skill:**

1. Create `skills/<category>/<name>/SKILL.md`
2. Run `scripts/registry/compute-skills-manifest.mjs`
3. Commit both skill and updated `MANIFEST.json`
4. CI validates integrity

**Adding a new runner:**

1. Copy `packages/runners/template/`
2. Update `CAPABILITIES.json`
3. Add scripts (`make-prompt.sh`, `log-run.sh`)
4. Validate with `scripts/lint-runner-capabilities.sh`

**Adding a new adapter:**

1. Create under `packages/adapters/<type>/`
2. Implement governed interface (config, guards, dry-run)
3. Add `.test.mjs` tests
4. Update relevant policy files
5. Document in `docs/`

## References

- Kernel interface: `docs/RUNNER_KERNEL_INTERFACE.md`
- Runner how-to: `docs/runner-howto.md`
- Governed calls: `docs/governed-model-call.md`
- Skill routing: `docs/skill-routing-flow.md`
- Validation checklist: `docs/validation-checklist.md`
