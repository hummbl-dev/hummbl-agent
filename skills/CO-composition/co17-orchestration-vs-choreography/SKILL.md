---
name: co17-orchestration-vs-choreography
description: Apply CO17 Orchestration vs Choreography to choose between centralized coordination or distributed peer-to-peer interaction.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/CO-composition/co17-orchestration-vs-choreography","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# CO17 Orchestration vs Choreography

Apply the CO17 Orchestration vs Choreography transformation to choose between centralized coordination or distributed peer-to-peer interaction.

## What is CO17?

**CO17 (Orchestration vs Choreography)** Choose between centralized coordination or distributed peer-to-peer interaction.

## When to Use CO17

### Ideal Situations

- Assemble components into a coherent whole
- Integrate multiple solutions into a unified approach
- Design systems that depend on clear interfaces and seams

### Trigger Questions

- "How can we use Orchestration vs Choreography here?"
- "What changes if we apply CO17 to this integrating two services?"
- "Which assumptions does CO17 help us surface?"

## The CO17 Process

### Step 1: Define the focus

```typescript
// Using CO17 (Orchestration vs Choreography) - Establish the focus
const focus = "Choose between centralized coordination or distributed peer-to-peer interaction";
```

### Step 2: Apply the model

```typescript
// Using CO17 (Orchestration vs Choreography) - Apply the transformation
const output = applyModel("CO17", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using CO17 (Orchestration vs Choreography) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using CO17 (Orchestration vs Choreography) - Example in a integrating two services
const result = applyModel("CO17", "Choose between centralized coordination or distributed peer-to-peer interaction" );
```

## Integration with Other Transformations

- **CO17 -> DE3**: Pair with DE3 when sequencing matters.
- **CO17 -> SY8**: Use SY8 to validate or stress-test.
- **CO17 -> RE2**: Apply RE2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires CO17
- [ ] Apply the model using explicit CO17 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit CO17 references in comments and docs
- Keep the output focused and actionable
- Combine with adjacent transformations when needed

## Measurement and Success

- Clearer decisions and fewer unresolved assumptions
- Faster alignment across stakeholders
- Reusable artifacts for future iterations

## Installation and Usage

### Nix Installation

```nix
{
  programs.moltbot.plugins = [
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/CO-composition/co17-orchestration-vs-choreography"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/co17-orchestration-vs-choreography
```

### Usage with Commands

```bash
/apply-transformation CO17 "Choose between centralized coordination or distributed peer-to-peer interaction"
```

---
*Apply CO17 to create repeatable, explicit mental model reasoning.*
