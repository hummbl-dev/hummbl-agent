---
name: sy13-incentive-architecture
description: Apply SY13 Incentive Architecture to design reward and penalty structures aligning individual actions with system goals.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/SY-systems/sy13-incentive-architecture","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# SY13 Incentive Architecture

Apply the SY13 Incentive Architecture transformation to design reward and penalty structures aligning individual actions with system goals.

## What is SY13?

**SY13 (Incentive Architecture)** Design reward and penalty structures aligning individual actions with system goals.

## When to Use SY13

### Ideal Situations

- Understand system-wide interactions and feedback loops
- Detect patterns that emerge across components
- Optimize for long-term system behavior, not just local gains

### Trigger Questions

- "How can we use Incentive Architecture here?"
- "What changes if we apply SY13 to this analyzing coordination patterns across teams?"
- "Which assumptions does SY13 help us surface?"

## The SY13 Process

### Step 1: Define the focus

```typescript
// Using SY13 (Incentive Architecture) - Establish the focus
const focus = "Design reward and penalty structures aligning individual actions with system goals";
```

### Step 2: Apply the model

```typescript
// Using SY13 (Incentive Architecture) - Apply the transformation
const output = applyModel("SY13", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using SY13 (Incentive Architecture) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using SY13 (Incentive Architecture) - Example in a analyzing coordination patterns across teams
const result = applyModel("SY13", "Design reward and penalty structures aligning individual actions with system goals" );
```

## Integration with Other Transformations

- **SY13 -> P1**: Pair with P1 when sequencing matters.
- **SY13 -> DE3**: Use DE3 to validate or stress-test.
- **SY13 -> IN2**: Apply IN2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires SY13
- [ ] Apply the model using explicit SY13 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit SY13 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/SY-systems/sy13-incentive-architecture"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/sy13-incentive-architecture
```

### Usage with Commands

```bash
/apply-transformation SY13 "Design reward and penalty structures aligning individual actions with system goals"
```

---
*Apply SY13 to create repeatable, explicit mental model reasoning.*
