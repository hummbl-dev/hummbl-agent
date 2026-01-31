---
name: in6-inverseproof-by-contradiction
description: Apply IN6 Inverse/Proof by Contradiction to assume a claim is false, derive logical impossibility, thus proving the claim true.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in6-inverseproof-by-contradiction","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN6 Inverse/Proof by Contradiction

Apply the IN6 Inverse/Proof by Contradiction transformation to assume a claim is false, derive logical impossibility, thus proving the claim true.

## What is IN6?

**IN6 (Inverse/Proof by Contradiction)** Assume a claim is false, derive logical impossibility, thus proving the claim true.

## When to Use IN6

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Inverse/Proof by Contradiction here?"
- "What changes if we apply IN6 to this risk assessment for a launch?"
- "Which assumptions does IN6 help us surface?"

## The IN6 Process

### Step 1: Define the focus

```typescript
// Using IN6 (Inverse/Proof by Contradiction) - Establish the focus
const focus = "Assume a claim is false, derive logical impossibility, thus proving the claim true";
```

### Step 2: Apply the model

```typescript
// Using IN6 (Inverse/Proof by Contradiction) - Apply the transformation
const output = applyModel("IN6", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN6 (Inverse/Proof by Contradiction) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN6 (Inverse/Proof by Contradiction) - Example in a risk assessment for a launch
const result = applyModel("IN6", "Assume a claim is false, derive logical impossibility, thus proving the claim true" );
```

## Integration with Other Transformations

- **IN6 -> P1**: Pair with P1 when sequencing matters.
- **IN6 -> DE3**: Use DE3 to validate or stress-test.
- **IN6 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN6
- [ ] Apply the model using explicit IN6 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN6 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in6-inverseproof-by-contradiction"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in6-inverseproof-by-contradiction
```

### Usage with Commands

```bash
/apply-transformation IN6 "Assume a claim is false, derive logical impossibility, thus proving the claim true"
```

---
*Apply IN6 to create repeatable, explicit mental model reasoning.*
