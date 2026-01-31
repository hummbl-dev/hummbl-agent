---
name: sy20-systems-of-systems-coordination
description: Apply SY20 Systems-of-Systems Coordination to manage interactions between independent systems with emergent behaviors.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/SY-systems/sy20-systems-of-systems-coordination","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# SY20 Systems-of-Systems Coordination

Apply the SY20 Systems-of-Systems Coordination transformation to manage interactions between independent systems with emergent behaviors.

## What is SY20?

**SY20 (Systems-of-Systems Coordination)** Manage interactions between independent systems with emergent behaviors.

## When to Use SY20

### Ideal Situations

- Understand system-wide interactions and feedback loops
- Detect patterns that emerge across components
- Optimize for long-term system behavior, not just local gains

### Trigger Questions

- "How can we use Systems-of-Systems Coordination here?"
- "What changes if we apply SY20 to this analyzing coordination patterns across teams?"
- "Which assumptions does SY20 help us surface?"

## The SY20 Process

### Step 1: Define the focus

```typescript
// Using SY20 (Systems-of-Systems Coordination) - Establish the focus
const focus = "Manage interactions between independent systems with emergent behaviors";
```

### Step 2: Apply the model

```typescript
// Using SY20 (Systems-of-Systems Coordination) - Apply the transformation
const output = applyModel("SY20", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using SY20 (Systems-of-Systems Coordination) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using SY20 (Systems-of-Systems Coordination) - Example in a analyzing coordination patterns across teams
const result = applyModel("SY20", "Manage interactions between independent systems with emergent behaviors" );
```

## Integration with Other Transformations

- **SY20 -> P1**: Pair with P1 when sequencing matters.
- **SY20 -> DE3**: Use DE3 to validate or stress-test.
- **SY20 -> IN2**: Apply IN2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires SY20
- [ ] Apply the model using explicit SY20 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit SY20 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/SY-systems/sy20-systems-of-systems-coordination"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/sy20-systems-of-systems-coordination
```

### Usage with Commands

```bash
/apply-transformation SY20 "Manage interactions between independent systems with emergent behaviors"
```

---
*Apply SY20 to create repeatable, explicit mental model reasoning.*
