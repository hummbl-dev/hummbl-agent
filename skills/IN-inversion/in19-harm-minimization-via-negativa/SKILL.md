---
name: in19-harm-minimization-via-negativa
description: Apply IN19 Harm Minimization (Via Negativa) to improve by removing harmful elements rather than adding beneficial ones.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in19-harm-minimization-via-negativa","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN19 Harm Minimization (Via Negativa)

Apply the IN19 Harm Minimization (Via Negativa) transformation to improve by removing harmful elements rather than adding beneficial ones.

## What is IN19?

**IN19 (Harm Minimization (Via Negativa))** Improve by removing harmful elements rather than adding beneficial ones.

## When to Use IN19

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Harm Minimization (Via Negativa) here?"
- "What changes if we apply IN19 to this risk assessment for a launch?"
- "Which assumptions does IN19 help us surface?"

## The IN19 Process

### Step 1: Define the focus

```typescript
// Using IN19 (Harm Minimization (Via Negativa)) - Establish the focus
const focus = "Improve by removing harmful elements rather than adding beneficial ones";
```

### Step 2: Apply the model

```typescript
// Using IN19 (Harm Minimization (Via Negativa)) - Apply the transformation
const output = applyModel("IN19", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN19 (Harm Minimization (Via Negativa)) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN19 (Harm Minimization (Via Negativa)) - Example in a risk assessment for a launch
const result = applyModel("IN19", "Improve by removing harmful elements rather than adding beneficial ones" );
```

## Integration with Other Transformations

- **IN19 -> P1**: Pair with P1 when sequencing matters.
- **IN19 -> DE3**: Use DE3 to validate or stress-test.
- **IN19 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN19
- [ ] Apply the model using explicit IN19 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN19 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in19-harm-minimization-via-negativa"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in19-harm-minimization-via-negativa
```

### Usage with Commands

```bash
/apply-transformation IN19 "Improve by removing harmful elements rather than adding beneficial ones"
```

---
*Apply IN19 to create repeatable, explicit mental model reasoning.*
