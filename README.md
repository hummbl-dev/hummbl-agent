# HUMMBL Integration Workspace

This folder contains the integration work for HUMMBL Systems with Clawdbot, ClawdHub, and Everything Claude Code.

## Project Structure

```
hummbl-agent/
├── README.md                                  # This file
├── skills/                                    # Base120 mental model skills for ClawdHub
│   ├── P-perspective/p1-framing/              # P1 Perspective framing skill
│   └── integration/multi-agent-coordination/ # Multi-agent coordination skill
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
│   ├── clawdbot/                              # Clawdbot gateway/workspace configs
│   ├── claude-code/                           # Claude Code settings template
│   └── learning/                              # Continuous learning configs + instincts
├── scripts/                                   # Automation scripts
│   └── generate-sitrep.sh                     # SITREP generator
├── docs/                                      # Documentation
│   ├── workflow-examples.md                   # Usage examples
│   └── validation-checklist.md                # Lightweight validation checklist
└── examples/                                  # Example implementations
   └── README.md                               # Placeholder examples
```

## Integration Components

### 1. ClawdHub Skills
- Publish Base120 mental models as installable skills
- Version-controlled mental model evolution
- Community distribution and feedback

### 2. Clawdbot Integration
- Multi-agent coordination hub
- Voice-accessible mental models
- Cross-platform communication

### 3. Claude Code Enhancement
- HUMMBL-specific agents and commands
- Continuous learning of mental model patterns
- Automated SITREP generation

## Quick Start

1. **Review the current workflow**
   ```bash
   cat docs/workflow-examples.md
   ```

2. **Inspect agents, commands, and skills**
   ```bash
   ls agents commands skills
   ```

3. **Check configs and scripts**
   ```bash
   ls configs scripts
   ```

## Development Phases

- **Phase 1**: Foundation setup and basic skills (P1 + coordination)
- **Phase 2**: Agent integration and coordination hardening
- **Phase 3**: Automation and continuous learning expansion

## Goal

Make HUMMBL Base120 the mental intelligence layer for AI agent coordination, leveraging best-in-class tools for distribution, communication, and learning.

---
*HUMMBL Systems - Mental Models for AI Agent Coordination*
