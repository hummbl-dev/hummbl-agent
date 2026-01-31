# HUMMBL Integration Workspace

This folder contains the integration work for HUMMBL Systems with OpenClaw, OpenClaw registry, and Everything Claude Code.
(formerly MoltBot; references updated to OpenClaw).

## Project Structure

```
hummbl-agent/
├── .github/                                  # CI workflows + checks
├── README.md                                  # This file
├── _state/                                    # Canonical state + run logs
├── skills/                                    # Base120 and communication skills (local registry)
│   ├── P-perspective/                         # Perspective transformation (P1-P20)
│   ├── IN-inversion/                          # Inversion transformation (IN1-IN20)
│   ├── CO-composition/                        # Composition transformation (CO1-CO20)
│   ├── DE-decomposition/                      # Decomposition transformation (DE1-DE20)
│   ├── RE-recursion/                          # Recursion transformation (RE1-RE20)
│   ├── SY-systems/                            # Systems transformation (SY1-SY20)
│   └── integration/                           # Cross-transformation skills
├── packages/                                  # Governed contracts + execution layers
│   ├── kernel/                                # Types-only kernel interfaces
│   ├── skills/registry/                       # Skill registry (canonical JSON)
│   ├── router/                                # Deterministic routing skeleton
│   ├── runners/                               # Runner scaffolding + prompts
│   ├── adapters/process/                      # Governed process execution adapter
│   └── vendor-bridge/                         # Vendor mapping + path bridges
├── agents/                                    # HUMMBL-specific Claude Code agents
│   ├── hummbl-architect.md                    # System design with mental models
│   ├── hummbl-planner.md                      # Planning with Base120
│   ├── sitrep-generator.md                    # SITREP automation
│   └── transformation-guide.md                # Transformation selection guide
├── commands/                                  # HUMMBL slash commands
│   ├── apply-transformation.md                # Apply specific mental model
│   ├── plan-with-base120.md                   # Planning with mental models
│   ├── sitrep.md                              # Generate SITREPs
│   └── verify-hummbl.md                        # Verify HUMMBL compliance
├── configs/                                   # Configuration files
│   ├── moltbot/                              # OpenClaw gateway/workspace configs
│   ├── claude-code/                           # Claude Code settings template
│   ├── codex/                                 # Codex runner guidance
│   ├── grok/                                  # Grok runner guidance
│   └── learning/                              # Continuous learning configs + instincts
├── scripts/                                   # Automation scripts
│   ├── generate-sitrep.sh                     # SITREP generator
│   ├── orchestrate.sh                         # Open run + generate prompts
│   ├── run-cmd.sh                             # Governed command execution
│   ├── sync-upstreams.sh                      # Vendor pin tooling
│   └── lint-*.sh                              # Lint helpers (state, skills, SITREP)
├── docs/                                      # Documentation
│   ├── workflow-examples.md                   # Usage examples
│   ├── validation-checklist.md                # Lightweight validation checklist
│   ├── sitrep-schema.md                       # SITREP schema
│   ├── sitrep-lint-checklist.md               # SITREP lint checklist
│   ├── base120-skill-template.md              # Base120 → skill template
│   ├── runner-howto.md                         # Runner scaffold how-to
│   ├── experiment-mode.md                      # Controlled recursive improvement mode
│   ├── experiment-approval-checklist.md        # Human approval checklist
│   ├── experiment-run-walkthrough.md           # Experiment run walkthrough
│   ├── runner-manual-ui-log.md                 # Manual UI logging guide
│   ├── evidence-import.md                      # Governed evidence import
│   └── evidence-import-example.md              # Evidence import example
├── vendor/                                    # Upstream mirrors (submodules, pinned)
└── examples/                                  # Example implementations
   └── README.md                               # Placeholder examples
```

## Integration Components

### 1. OpenClaw registry Skills

- Publish Base120 mental models as installable skills
- Version-controlled mental model evolution
- Communication skills live under `skills/communication/**` (no external registry); see `docs/communication-enablement.md` for enabling Slack/Discord sends safely.
- LLM skills live under `skills/llm/**`; see `docs/llm-enablement.md` for the Anthropic wrapper rollout.

## External ecosystems (informational only)

This repository is **registry-first**: the only authoritative skill registry is the local `skills/` tree plus `skills/MANIFEST.json`, enforced by CI. External marketplaces or rebranded ecosystems (e.g., OpenClaw/ClawHub clusters or other vendor sites) are informational only and **not** dependencies:

- we do not install skills from external registries
- we do not require external services to resolve or execute skills
- internal identifiers (skill IDs, tuple capabilities, config paths, env vars) stay stable regardless of upstream branding changes

### 2. OpenClaw Integration

- Multi-agent coordination hub
- Voice-accessible mental models
- Cross-platform communication

### 3. Claude Code Enhancement

- HUMMBL-specific agents and commands
- Governed execution + artifact provenance
- Automated SITREP generation + lint

### 4. Codex Runner

- Prompt packet generation + run logging
- Governed execution via `scripts/run-cmd.sh`

### 5. Grok Runner

- Prompt packet generation + run logging
- Governed execution via `scripts/run-cmd.sh`

## Quick Start

1. **Review the current workflow**

   ```bash
   cat docs/workflow-examples.md
   ```

   - Workflows index: `docs/workflows-index.md`
   - Governed model calls: `docs/governed-model-call.md`
   - Skill selection + routing: `docs/skill-routing-flow.md`
   - Evidence + SITREP: `docs/evidence-sitrep-flow.md`
   - Local Places skill: `docs/local-places-flow.md`

2. **Inspect agents, commands, and skills**

   ```bash
   ls agents commands skills
   ```

3. **Check configs and scripts**

   ```bash
   ls configs scripts
   ```

4. **Optional: seed workspace coordination templates**

   ```bash
   mkdir -p hummbl-agent
   cp docs/templates/AGENTS.md hummbl-agent/AGENTS.md
   cp docs/templates/SOUL.md hummbl-agent/SOUL.md
   cp docs/templates/TOOLS.md hummbl-agent/TOOLS.md
   ```

5. **Open a run + generate prompts**

   ```bash
   scripts/orchestrate.sh
   ```

6. **Run a governed command**

   ```bash
   scripts/run-cmd.sh --runner codex -- git status --porcelain
   ```

7. **Grok runner example**

   ```bash
   packages/runners/grok/scripts/make-prompt.sh > /tmp/grok-prompt.md
   packages/runners/grok/scripts/log-run.sh "Session start: grok" \
     --artifact "_state/runs/YYYY-MM-DD/prompts/grok-prompt.md" --hash-file
   ```

## API Keys vs ChatGPT Auth

- Codex CLI can be used without API keys by setting `preferred_auth_method = "chatgpt"` in `~/.codex/config.toml`.
- Governed API calls (`scripts/run-openai-governed.sh`, `scripts/run-anthropic-governed.sh`) still require their vendor API keys.
- Example config:

  ```bash
  cp configs/codex/config.example.toml ~/.codex/config.toml
  ```

- Claude Code can use a Claude.ai subscription login (no API keys). If `ANTHROPIC_API_KEY` is set, it will use API billing instead.
  - Use `/login` inside Claude Code and verify with `/status`.
  - Ensure `ANTHROPIC_API_KEY` is unset in your shell and not injected via `~/.claude/settings.json`.

## Development Phases

- **Phase 1**: Foundation setup and basic skills (P1 + coordination)
- **Phase 2**: Agent integration and coordination hardening
- **Phase 3**: Automation and continuous learning expansion

## Goal

Make HUMMBL Base120 the mental intelligence layer for AI agent coordination, leveraging governed tooling and audit-first execution.

---
*HUMMBL Systems - Mental Models for AI Agent Coordination*
