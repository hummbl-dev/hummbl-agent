---
name: in15-constraint-reversal
description: Apply IN15 Constraint Reversal to temporarily remove assumed constraints to explore alternative solution space.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in15-constraint-reversal","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN15 Constraint Reversal

Apply the IN15 Constraint Reversal transformation to temporarily remove assumed constraints to explore alternative solution space.

## What is IN15?

**IN15 (Constraint Reversal)** Temporarily remove assumed constraints to explore alternative solution space.

## When to Use IN15

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Constraint Reversal here?"
- "What changes if we apply IN15 to this risk assessment for a launch?"
- "Which assumptions does IN15 help us surface?"

## The IN15 Process

### Step 1: Define the focus

```typescript
// Using IN15 (Constraint Reversal) - Establish the focus
const focus = "Temporarily remove assumed constraints to explore alternative solution space";
```

### Step 2: Apply the model

```typescript
// Using IN15 (Constraint Reversal) - Apply the transformation
const output = applyModel("IN15", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN15 (Constraint Reversal) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN15 (Constraint Reversal) - Example in a risk assessment for a launch
const result = applyModel("IN15", "Temporarily remove assumed constraints to explore alternative solution space" );
```

## Integration with Other Transformations

- **IN15 -> P1**: Pair with P1 when sequencing matters.
- **IN15 -> DE3**: Use DE3 to validate or stress-test.
- **IN15 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN15
- [ ] Apply the model using explicit IN15 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN15 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in15-constraint-reversal"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in15-constraint-reversal
```

### Usage with Commands

```bash
/apply-transformation IN15 "Temporarily remove assumed constraints to explore alternative solution space"
```

---
*Apply IN15 to create repeatable, explicit mental model reasoning.*
