---
name: in5-negative-space-framing
description: Apply IN5 Negative Space Framing to study what is absent rather than what is present.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in5-negative-space-framing","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN5 Negative Space Framing

Apply the IN5 Negative Space Framing transformation to study what is absent rather than what is present.

## What is IN5?

**IN5 (Negative Space Framing)** Study what is absent rather than what is present.

## When to Use IN5

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Negative Space Framing here?"
- "What changes if we apply IN5 to this risk assessment for a launch?"
- "Which assumptions does IN5 help us surface?"

## The IN5 Process

### Step 1: Define the focus

```typescript
// Using IN5 (Negative Space Framing) - Establish the focus
const focus = "Study what is absent rather than what is present";
```

### Step 2: Apply the model

```typescript
// Using IN5 (Negative Space Framing) - Apply the transformation
const output = applyModel("IN5", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN5 (Negative Space Framing) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN5 (Negative Space Framing) - Example in a risk assessment for a launch
const result = applyModel("IN5", "Study what is absent rather than what is present" );
```

## Integration with Other Transformations

- **IN5 -> P1**: Pair with P1 when sequencing matters.
- **IN5 -> DE3**: Use DE3 to validate or stress-test.
- **IN5 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN5
- [ ] Apply the model using explicit IN5 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN5 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in5-negative-space-framing"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in5-negative-space-framing
```

### Usage with Commands

```bash
/apply-transformation IN5 "Study what is absent rather than what is present"
```

---
*Apply IN5 to create repeatable, explicit mental model reasoning.*
