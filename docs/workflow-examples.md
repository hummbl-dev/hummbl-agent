# HUMMBL Integration Workflow and Examples

Complete guide for integrating HUMMBL Base120 mental models with OpenClaw, OpenClaw registry, and Claude Code for multi-agent coordination.

Workflows index: `docs/workflows-index.md`

## Quick Start Overview

```
HUMMBL Base120 Mental Models
         ↓
OpenClaw registry (Skills Distribution)
         ↓
OpenClaw (Multi-Agent Coordination)
         ↓
Claude Code (Development & Application)
```

## Installation Workflow

### **Step 1: Setup HUMMBL Workspace**

```bash
# Create workspace structure
mkdir -p hummbl-agent/{skills,agents,commands,configs,sessions}
cd hummbl-agent

# Copy configurations
cp configs/moltbot/gateway.json ~/.moltbot/moltbot.json
cp configs/learning/continuous-learning.json ~/.claude/homunculus/config.json
```

### **Step 2: Install Claude Code Components**

```bash
# Install HUMMBL agents
cp agents/hummbl-architect.md ~/.claude/agents/
cp agents/hummbl-planner.md ~/.claude/agents/
cp agents/sitrep-generator.md ~/.claude/agents/
cp agents/transformation-guide.md ~/.claude/agents/

# Install HUMMBL commands
cp commands/apply-transformation.md ~/.claude/commands/
cp commands/plan-with-base120.md ~/.claude/commands/
cp commands/sitrep.md ~/.claude/commands/
cp commands/verify-hummbl.md ~/.claude/commands/

# Update Claude Code settings
cp configs/claude-code/settings.json ~/.claude/settings.json
```

### **Step 3: Configure OpenClaw Gateway**

```bash
# Start HUMMBL gateway
moltbot gateway --config ~/.moltbot/moltbot.json --port 18789

# Verify configuration
moltbot gateway status
```

### **Step 4: Use local communication skill**

Tuple (canonical form): `agent:planner|communication:send|scope{channel=slack;target=C123456}`

```ts
const res = await callSkill("communication.slack.send-message", {
  channel_id: "C123456",
  text: "Phase 1 ready"
});
```

## Daily Workflow Examples

### **Example 1: Starting a New Project**

```bash
# 1. Reduce the project to first principles with P1
/apply-transformation P1 "Reduce this new API development project to its foundational truths"

# Expected output:
// Using P1 (First Principles Framing) - Foundational framing
const projectFirstPrinciples = {
  coreGoal: "Enable reliable customer data synchronization",
  nonNegotiables: ["data integrity", "secure access", "clear ownership"],
  constraints: ["timeline", "team size", "existing infra"]
};
```

### **Example 2: Complex Problem Decomposition**

```bash
# 2. Break down complex integration
/apply-transformation DE3 "Decompose the multi-agent integration challenge"

# Expected output:
// Using DE3 (Decomposition) - Systematic breakdown
const integrationTasks = {
  foundation: ["gateway_setup", "agent_configuration"],
  implementation: ["skill_development", "command_creation"],
  coordination: ["handoff_protocols", "communication_flows"],
  validation: ["testing_framework", "quality_assurance"]
};
```

### **Example 3: Multi-Agent Coordination**

```bash
# 3. Coordinate agents for feature development
moltbot agent --message "Apply multi-agent coordination using P1, DE3, SY8 for user authentication feature"

# Agent handoff sequence:
# claude-sonnet-4.5 → windsurf-cascade → chatgpt-5 → cursor
```

### **Example 4: Generating SITREPs**

```bash
# 4. Generate daily situation report
scripts/generate-sitrep.sh --show

# Expected SITREP format:
SITREP-1: HUMMBL-Integration - Foundation | UNCLASSIFIED | 20260126-1500Z | HUMMBL-LEAD | 5 sections

1. SITUATION
   // Using P1 (First Principles Framing) - Foundational assessment
   Technical: Core infrastructure 85% complete...
```

### **Example 4.5: Governed Model Call (Prompt → Request → API → Log)**

```bash
# 1) Open a run and generate prompt packets
scripts/orchestrate.sh

# 2) Make a governed OpenAI response (request built + size/rate enforced)
export OPENAI_API_KEY="..."
scripts/run-openai-governed.sh --model gpt-4.1-mini --input "Summarize these notes: ..."

# 3) Make a governed Anthropic response (optional)
export ANTHROPIC_API_KEY="..."
scripts/run-anthropic-governed.sh --model claude-3-5-sonnet-20241022 --input "Summarize these notes: ..."
```

#### Notes

- Requests are built via `scripts/build-request.cjs` with JSON escaping and `maxRequestBytes` enforcement.
- Global rate limiting is enforced via `_state/.rate-limit.json`.
- Artifacts and hashes are logged under `_state/runs/YYYY-MM-DD/artifacts/`.
- Full walkthrough: `docs/governed-model-call.md`

### **Example 5: Skill Selection + Routing (Task → Decision → Prompt → Log)**

```bash
# 1) Open a run and generate prompt packets
scripts/orchestrate.sh

# 2) (App layer) run router decision
# - Use packages/router/src/router.ts to select skill + runner.

# 3) Log decision + prompt artifact
packages/runners/codex/scripts/log-run.sh "Route selected: <skillId>" --date YYYY-MM-DD
packages/runners/codex/scripts/log-run.sh "Prompt prepared" \
  --artifact "_state/runs/YYYY-MM-DD/prompts/<runner>-prompt.md" \
  --hash-file \
  --date YYYY-MM-DD
```

#### Notes

- Router output includes explain + alternatives for auditability.
- Full walkthrough: `docs/skill-routing-flow.md`

### **Example 6: Evidence + SITREP (Capture → Lint → Generate)**

```bash
# 1) Import evidence (canonical)
scripts/import-observation.sh \
  --file /path/to/observations.jsonl \
  --source "external/observations" \
  --note "imported raw observations"

# 2) Lint evidence
scripts/lint-evidence.sh
scripts/lint-artifact-secrets.sh

# 3) Generate SITREP (includes lint)
scripts/generate-sitrep.sh
```

#### Notes

- SITREP schema: `docs/sitrep-schema.md`
- Full walkthrough: `docs/evidence-sitrep-flow.md`

### **Example 7: Local Places Skill (Run → Query → Log)**

```bash
# 1) Run server
cd skills/local-places
echo "GOOGLE_PLACES_API_KEY=your-key" > .env
uv venv
uv pip install -e ".[dev]"
uv run --env-file .env uvicorn local_places.main:app --host 127.0.0.1 --port 8000

# 2) Resolve + search
curl -X POST http://127.0.0.1:8000/locations/resolve \
  -H "Content-Type: application/json" \
  -d '{"location_text": "Soho, London", "limit": 5}'

curl -X POST http://127.0.0.1:8000/places/search \
  -H "Content-Type: application/json" \
  -d '{"query": "coffee shop", "location_bias": {"lat": 51.5137, "lng": -0.1366, "radius_m": 1000}}'
```

#### Notes

- Full walkthrough: `docs/local-places-flow.md`

## Advanced Integration Examples

### **Example 5: System Pattern Analysis**

```typescript
// Using SY8 (Systems) - Identify coordination patterns
const systemAnalysis = {
  communicationPatterns: {
    effective: "Structured handoffs with 95% success rate",
    inefficient: "Ad-hoc decision making causing delays"
  },
  
  mentalModelUsage: {
    highImpact: "P1 first-principles framing reduces requirements churn by 40%",
    lowImpact: "IN2 applied inconsistently across agents"
  },
  
  coordinationBottlenecks: {
    primary: "Context loss during agent handoffs",
    secondary: "Decision quality varies by agent expertise"
  }
};
```

### **Example 6: Risk Mitigation with Inversion**

```bash
# Apply IN2 to identify coordination risks
/apply-transformation IN2 "What could cause our multi-agent coordination to fail?"

# Risk identification:
// Using IN2 (Inversion) - Failure mode analysis
const coordinationRisks = {
  handoffFailures: "Critical context loss between agents",
  communicationBreakdown: "Misaligned mental model applications",
  decisionConflicts: "Competing agent strategies without resolution",
  qualityDegradation: "Inconsistent standards across agents"
};
```

### **Example 7: Iterative Process Improvement**

```typescript
// Using RE2 (Recursion) - Continuous refinement
const improvementCycle = {
  iteration1: {
    action: "Implement standardized handoff protocols",
    result: "Handoff success improved from 65% to 85%",
    learning: "Context preservation is critical"
  },
  
  iteration2: {
    action: "Add mental model validation to handoffs",
    result: "Decision quality improved by 30%",
    learning: "Explicit transformation codes ensure alignment"
  },
  
  iteration3: {
    action: "Automate coordination pattern recognition",
    result: "Proactive issue prevention increased by 50%",
    learning: "Systematic pattern analysis enables prediction"
  }
};
```

## Real-World Use Cases

### **Use Case 1: API Development Project**

```bash
# Project kickoff with mental models
/apply-transformation P1 "Frame customer API development from technical, business, user, system perspectives"

# Decompose into manageable phases
/apply-transformation DE3 "Break API development into design, implementation, testing, deployment phases"

# Coordinate development team
moltbot agent --message "Apply multi-agent coordination for API development using claude-sonnet for architecture, windsurf-cascade for implementation"

# Daily progress tracking
scripts/generate-sitrep.sh
```

### **Use Case 2: System Migration**

```typescript
// Complex migration with multiple stakeholders
const migrationProject = {
  // Using P1 - Frame from all perspectives
  framing: {
    business: "Minimize downtime during legacy system migration",
    technical: "Ensure data integrity and system compatibility", 
    user: "Maintain seamless user experience",
    operational: "Reduce support burden during transition"
  },
  
  // Using DE3 - Decompose into phases
  phases: {
    planning: "Requirements analysis and migration strategy",
    preparation: "Infrastructure setup and data mapping",
    execution: "Gradual data migration with rollback capability",
    validation: "Comprehensive testing and performance optimization",
    completion: "Legacy decommissioning and cleanup"
  },
  
  // Using SY8 - Coordinate multiple teams
  coordination: {
    backend: "Database migration and API updates",
    frontend: "UI compatibility and user experience",
    devops: "Infrastructure and deployment automation",
    qa: "Testing strategy and validation frameworks"
  }
};
```

### **Use Case 3: Product Feature Launch**

```bash
# Feature development with full HUMMBL integration
echo "Starting feature development workflow..."

# 1. Frame the feature
/apply-transformation P1 "Frame new real-time collaboration feature from multiple stakeholder perspectives"

# 2. Coordinate agents
moltbot agent --session hummbl-main --message "Coordinate feature development using multi-agent coordination skill"

# 3. Monitor progress
moltbot agent --session hummbl-sitrep --message "Generate SITREP for feature development progress"

# 4. Quality validation
/apply-transformation IN2 "Identify potential failures in our collaboration feature launch"

# 5. Process improvement
/apply-transformation RE2 "How can we improve our feature development process based on lessons learned?"
```

## Troubleshooting Guide

### **Common Issues and Solutions**

#### **Issue 1: Agent Handoff Failures**

```bash
# Symptoms: Context loss, misunderstood requirements
# Diagnosis: Check handoff protocol compliance
scripts/generate-sitrep.sh | grep -A 10 "handoff"

# Solution: Apply SY8 to analyze patterns
/apply-transformation SY8 "Analyze our agent handoff patterns to identify failure points"

# Fix: Implement standardized handoff template
// Using CO5 (Composition) - Integrate handoff components
const handoffTemplate = {
  context: "Full mental model and decision history",
  objectives: "Clear next steps with success criteria", 
  validation: "Understanding confirmation before acceptance"
};
```

#### **Issue 2: Mental Model Inconsistency**

```bash
# Symptoms: Inconsistent transformation application, unclear decision rationale
# Diagnosis: Review mental model usage patterns
grep -r "Using.*(" sessions/ | tail -20

# Solution: Reinforce explicit code usage
/apply-transformation P1 "Why are we inconsistent with mental model application?"

# Fix: Create instinct for explicit codes
# Already created: use-transformation-codes-explicitly.md
```

#### **Issue 3: Coordination Bottlenecks**

```bash
# Symptoms: Decision delays, agent conflicts, duplicated work
# Diagnosis: Generate SITREP to identify issues
scripts/generate-sitrep.sh --show | grep -A 5 "ASSESSMENT"

# Solution: Apply IN2 for risk analysis
/apply-transformation IN2 "What coordination bottlenecks could derail our project?"

# Fix: Implement escalation protocols
const escalationProtocol = {
  trigger: "Decision deadlock or timeline risk",
  process: "Structured conflict resolution with clear criteria",
  timeout: "Automatic escalation after 2 hours of deadlock"
};
```

## Performance Optimization

### **Coordination Metrics to Track**

```typescript
// Key Performance Indicators
const kpis = {
  handoffSuccess: "Target: >95%, Current: 87%",
  decisionQuality: "Target: >90%, Current: 78%", 
  timeToDecision: "Target: <30min, Current: 45min",
  agentSatisfaction: "Target: >4.5/5, Current: 3.8/5"
};
```

### **Continuous Improvement Process**

```bash
# Weekly optimization cycle
echo "Starting weekly coordination optimization..."

# 1. Analyze patterns
/apply-transformation SY8 "Identify coordination patterns from the past week"

# 2. Generate improvement recommendations
moltbot agent --message "Apply RE2 to refine coordination protocols based on weekly performance"

# 3. Update configurations
scripts/generate-sitrep.sh

# 4. Implement changes
# Update agent configurations, handoff protocols, communication templates
```

## Integration with External Tools

### **GitHub Integration**

```bash
# Commit with mental model references
git commit -m "feat: Add user authentication

// Using P1 (First Principles Framing) - Reduce to core security, UX, and technical truths
// Using DE3 (Decomposition) - Break into auth service, UI components, and database schema
// Using CO5 (Composition) - Integrate OAuth2, JWT tokens, and session management"

# PR description with mental models
echo "## Mental Model Application

**P1 First Principles Framing:**
- Security: Must guarantee access control and auditability
- User: Must minimize friction without weakening security
- Technical: Must remain scalable and maintainable

**DE3 Decomposition:**
- Auth service for token management
- UI components for login forms
- Database schema for user data

**SY8 Systems Thinking:**
- Integration with existing user management
- Impact on overall system architecture
- Coordination between frontend and backend teams"
```

### **Slack/Discord Integration**

```bash
# Automated SITREP distribution
moltbot message send --to #hummbl-updates --message "$(scripts/generate-sitrep.sh)"

# Mental model alerts
moltbot message send --to #hummbl-coordination --message "🧠 Applied P1 to reduce requirements to first principles - see project board for details"
```

## Best Practices Summary

### **Daily Practices**

1. **Start with P1** - Reduce every challenge to first principles
2. **Use explicit codes** - Always reference transformation codes: `// Using DE3 (Decomposition)`
3. **Generate SITREPs** - Daily progress reports with mental model tracking
4. **Coordinate agents** - Use multi-agent coordination for complex tasks

### **Weekly Practices**  

1. **Pattern analysis** - Apply SY8 to identify coordination patterns
2. **Process refinement** - Use RE2 for iterative improvement
3. **Risk assessment** - Apply IN2 to identify potential failures
4. **Skill development** - Create new Base120 skills as needed

### **Quality Standards**

- **TypeScript strict mode** for all code
- **80%+ test coverage** for all implementations
- **Explicit mental model references** in documentation
- **Standardized handoff protocols** for agent coordination

---

## **Next Steps**

1. **Complete workspace setup** using the installation workflow
2. **Practice with examples** to build mental model intuition
3. **Create custom skills** for your specific use cases
4. **Measure and optimize** coordination effectiveness
5. **Share learnings** with the HUMMBL community

## **Community and Support**

- **OpenClaw registry**: Publish and share Base120 skills
- **Discord**: `discord.gg/clawd` for community support
- **Documentation**: `docs.clawd.bot` for detailed guides
- **GitHub**: `github.com/moltbot/moltbot` for issues and contributions

---
*HUMMBL Integration: Transforming how AI agents coordinate and collaborate using systematic mental models*
