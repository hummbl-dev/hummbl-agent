---
name: in8-contrapositive-reasoning
description: Apply IN8 Contrapositive Reasoning to use logical equivalence that if A then B equals if not B then not A.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in8-contrapositive-reasoning","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN8 Contrapositive Reasoning

Apply the IN8 Contrapositive Reasoning transformation to use logical equivalence that if A then B equals if not B then not A.

## What is IN8?

**IN8 (Contrapositive Reasoning)** Use logical equivalence that if A then B equals if not B then not A.

## When to Use IN8

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Contrapositive Reasoning here?"
- "What changes if we apply IN8 to this risk assessment for a launch?"
- "Which assumptions does IN8 help us surface?"

## The IN8 Process

### Step 1: Define the focus

```typescript
// Using IN8 (Contrapositive Reasoning) - Establish the focus
const focus = "Use logical equivalence that if A then B equals if not B then not A";
```

### Step 2: Apply the model

```typescript
// Using IN8 (Contrapositive Reasoning) - Apply the transformation
const output = applyModel("IN8", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN8 (Contrapositive Reasoning) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN8 (Contrapositive Reasoning) - Example in a risk assessment for a launch
const result = applyModel("IN8", "Use logical equivalence that if A then B equals if not B then not A" );
```

## Integration with Other Transformations

- **IN8 -> P1**: Pair with P1 when sequencing matters.
- **IN8 -> DE3**: Use DE3 to validate or stress-test.
- **IN8 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN8
- [ ] Apply the model using explicit IN8 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN8 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in8-contrapositive-reasoning"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in8-contrapositive-reasoning
```

### Usage with Commands

```bash
/apply-transformation IN8 "Use logical equivalence that if A then B equals if not B then not A"
```

---
*Apply IN8 to create repeatable, explicit mental model reasoning.*
