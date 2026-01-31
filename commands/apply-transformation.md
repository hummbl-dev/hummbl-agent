---
name: apply-transformation
description: Apply HUMMBL Base120 mental model transformations with specific codes and context. Used by hummbl-architect agent for systematic mental model application.
parameters:
  - name: transformation
    type: string
    required: true
    description: Base120 transformation code (e.g., P1, DE3, SY8)
  - name: context
    type: string
    required: true
    description: Problem context or description to apply transformation to
  - name: scope
    type: string
    required: false
    description: Scope of application (code, architecture, strategy, etc.)
---

# Apply Transformation Command

Applies HUMMBL Base120 mental model transformations systematically with explicit code references and documented rationale.

## Usage

```bash
/apply-transformation <TRANSFORMATION_CODE> "<CONTEXT>" [scope]
```

## Parameters

- **TRANSFORMATION_CODE**: Base120 transformation code (P1-20, IN1-20, CO1-20, DE1-20, RE1-20, SY1-20)
- **CONTEXT**: Problem description or situation to apply transformation to
- **SCOPE**: Optional scope (code, architecture, strategy, workflow, etc.)

## Transformation Reference

### **P - Perspective Transformations**

- **P1**: First principles framing (reduce to foundational truths)
- **P2**: Stakeholder mapping
- **P3**: Identity stack

### **IN - Inversion Transformations**

- **IN1**: Reverse assumptions and constraints
- **IN2**: Work backward from desired outcome
- **IN3**: Test through opposite scenarios

### **CO - Composition Transformations**

- **CO1**: Build up from components
- **CO2**: Integrate multiple solutions
- **CO3**: Synthesize features and capabilities

### **DE - Decomposition Transformations**

- **DE1**: Break into manageable parts
- **DE2**: Modularize complex systems
- **DE3**: Separate concerns and dependencies

### **RE - Recursion Transformations**

- **RE1**: Iterative refinement
- **RE2**: Pattern repetition and scaling
- **RE3**: Self-reference and meta-thinking

### **SY - Systems Transformations**

- **SY1**: Identify system patterns
- **SY2**: Analyze emergent behaviors
- **SY3**: Optimize system interactions

## Examples

### **Apply First Principles Framing**

```bash
/apply-transformation P1 "Reduce this API design challenge to its foundational truths"
```

Expected output:

```typescript
// Using P1 (First Principles Framing) - Foundational framing
interface APIFirstPrinciples {
  coreGoal: "Deliver reliable, secure user data access";
  nonNegotiables: ["data integrity", "clear auth boundaries"];
  constraints: ["time-to-market", "team capacity"];
}
```

### **Apply Decomposition**

```bash
/apply-transformation DE3 "Break this complex integration into manageable components"
```

Expected output:

```typescript
// Using DE3 (Decomposition) - Modular breakdown
const integrationComponents = {
  foundation: ["agent_setup", "workspace_config"],
  implementation: ["skills", "commands", "automation"],
  validation: ["testing", "documentation", "deployment"]
};
```

### **Apply Systems Thinking**

```bash
/apply-transformation SY8 "Identify patterns in our multi-agent coordination"
```

Expected output:

```typescript
// Using SY8 (Systems) - Pattern recognition
const coordinationPatterns = {
  communication: "Agent handoff protocols",
  decision: "Mental model selection criteria",
  feedback: "Learning loop integration"
};
```

## Implementation Process

1. **Validate transformation code** - Ensure it's a valid Base120 code
2. **Analyze context** - Understand the problem domain
3. **Select appropriate technique** - Choose specific method within transformation
4. **Apply systematically** - Generate structured output
5. **Document rationale** - Explain WHY this transformation
6. **Provide examples** - Show practical application

## Integration with Skills

This command works seamlessly with Base120 skills:

- Skills provide detailed transformation guidance
- Command provides systematic application
- Agent coordinates between them

## Quality Standards

- **Always include transformation code** in comments
- **Document the reasoning** behind selection
- **Provide concrete examples** and applications
- **Follow HUMMBL coding standards**
- **Enable reproducible patterns**

---
*Systematic mental model application for consistent, intelligent problem-solving.*
