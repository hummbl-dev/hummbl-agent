# HUMMBL Workspace Configuration

## Directory Structure

```
hummbl-agent/
├── AGENTS.md                 # HUMMBL agent coordination protocols
├── SOUL.md                   # HUMMBL system personality and principles
├── TOOLS.md                  # HUMMBL-specific tool configurations
├── skills/                   # Downloaded and custom skills
│   ├── generated/           # Auto-installed from OpenClaw registry
│   ├── base120/             # Base120 mental model skills
│   └── custom/              # HUMMBL-specific skills
├── workspace/               # Active project workspaces
├── sessions/                # Agent session history and coordination
└── config/                 # Workspace-specific configurations
```

## Installation Commands

### **Setup HUMMBL Workspace**

```bash
# Create workspace directory
mkdir -p hummbl-agent/{skills/{generated,base120,custom},workspace,sessions,config}

# Copy HUMMBL configuration
cp configs/moltbot/gateway.json ~/.moltbot/moltbot.json

# Initialize workspace
moltbot workspace init hummbl-agent --template mental-models
```

### **Install Base120 Skills**

```bash
# Install P1 First Principles Framing
moltbot-registry install hummbl-agent/p1-first-principles-framing

# Install additional Base120 skills as they're created
moltbot-registry install hummbl-agent/de3-decomposition
moltbot-registry install hummbl-agent/sy8-systems-thinking
```

### **Configure Claude Code Integration**

```bash
# Copy HUMMBL agents to Claude Code
cp agents/hummbl-architect.md ~/.claude/agents/
cp agents/hummbl-planner.md ~/.claude/agents/
cp agents/sitrep-generator.md ~/.claude/agents/
cp agents/transformation-guide.md ~/.claude/agents/

# Copy HUMMBL commands
cp commands/apply-transformation.md ~/.claude/commands/
cp commands/plan-with-base120.md ~/.claude/commands/
cp commands/sitrep.md ~/.claude/commands/
cp commands/verify-hummbl.md ~/.claude/commands/

# Update Claude Code settings (template)
cp configs/claude-code/settings.json ~/.claude/settings.json
```

## Gateway Management

### **Start HUMMBL Gateway**

```bash
# Start with HUMMBL configuration
moltbot gateway --config ~/.moltbot/moltbot.json --port 18789

# Or use the workspace command
moltbot workspace start hummbl-agent
```

### **Test Integration**

```bash
# Test mental model application
moltbot agent --message "Apply P1 perspective framing to our current integration challenge"

# Test agent coordination
moltbot agent --session hummbl-sitrep --message "Generate SITREP for integration progress"
```

## Multi-Agent Coordination

### **Agent Roles**

- **claude-sonnet**: Lead strategy and planning
- **windsurf-cascade**: Implementation and execution
- **chatgpt-5**: Product QA and validation
- **cursor**: Prototyping and development

### **Coordination Protocol**

```typescript
// SITREP coordination pattern
interface HUMMBLCoordination {
  sitrep: {
    frequency: "hourly";
    format: "SITREP-{N}: {Project} - {Phase}";
    sections: ["Situation", "Intelligence", "Operations", "Assessment", "Recommendations"];
  };
  escalation: {
    triggers: ["blocker", "decision_needed", "resource_conflict"];
    protocol: "automatic_agent_handoff";
  };
}
```

## Mental Model Integration

### **Automatic Application**

- Base120 transformations auto-detected in conversations
- Skills automatically applied based on context
- Usage tracked for learning and optimization

### **Documentation Standards**

- All transformations explicitly referenced: `// Using P1 (First Principles Framing)`
- Decision rationale documented with mental model citations
- Cross-referenced with skill documentation

## Continuous Learning

### **Pattern Recognition**

- Mental model usage patterns tracked
- Effectiveness measured by outcomes
- Instincts created for repeated patterns

### **Knowledge Evolution**

- Successful patterns become instincts
- Instincts cluster into new skills
- Skills evolve based on usage feedback

## Quality Assurance

### **HUMMBL Compliance**

- TypeScript strict mode enforced
- Mental model references required
- Documentation standards maintained
- Test coverage 80%+ required

### **Validation Checks**

```bash
# Verify HUMMBL compliance
moltbot doctor --hummbl

# Check mental model application
moltbot agent --message "Review recent work for Base120 compliance"

# Generate quality report
moltbot workspace report hummbl-agent --format markdown
```

## Troubleshooting

### **Common Issues**

- **Gateway won't start**: Check configuration syntax and port availability
- **Skills not loading**: Verify OpenClaw registry connection and skill format
- **Agent coordination failing**: Check session routing and protocol configuration

### **Debug Commands**

```bash
# Check gateway status
moltbot gateway status

# Test skill installation
moltbot-registry test hummbl-agent/p1-first-principles-framing

# Verify agent routing
moltbot agent --test-routing "mental.model"
```

## Next Steps

1. **Complete workspace setup** using commands above
2. **Test integration** with sample mental model application
3. **Create additional Base120 skills** following P1 pattern
4. **Set up continuous learning** for pattern evolution
5. **Document custom workflows** for your specific use cases

---
*HUMMBL workspace configured for multi-agent mental intelligence coordination.*
