---
name: in16-inverse-optimization
description: Apply IN16 Inverse Optimization to maximize worst outcomes to understand system vulnerabilities.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in16-inverse-optimization","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN16 Inverse Optimization

Apply the IN16 Inverse Optimization transformation to maximize worst outcomes to understand system vulnerabilities.

## What is IN16?

**IN16 (Inverse Optimization)** Maximize worst outcomes to understand system vulnerabilities.

## When to Use IN16

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Inverse Optimization here?"
- "What changes if we apply IN16 to this risk assessment for a launch?"
- "Which assumptions does IN16 help us surface?"

## The IN16 Process

### Step 1: Define the focus

```typescript
// Using IN16 (Inverse Optimization) - Establish the focus
const focus = "Maximize worst outcomes to understand system vulnerabilities";
```

### Step 2: Apply the model

```typescript
// Using IN16 (Inverse Optimization) - Apply the transformation
const output = applyModel("IN16", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN16 (Inverse Optimization) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN16 (Inverse Optimization) - Example in a risk assessment for a launch
const result = applyModel("IN16", "Maximize worst outcomes to understand system vulnerabilities" );
```

## Integration with Other Transformations

- **IN16 -> P1**: Pair with P1 when sequencing matters.
- **IN16 -> DE3**: Use DE3 to validate or stress-test.
- **IN16 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN16
- [ ] Apply the model using explicit IN16 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN16 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in16-inverse-optimization"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in16-inverse-optimization
```

### Usage with Commands

```bash
/apply-transformation IN16 "Maximize worst outcomes to understand system vulnerabilities"
```

---
*Apply IN16 to create repeatable, explicit mental model reasoning.*
