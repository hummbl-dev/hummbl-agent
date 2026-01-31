---
name: in17-counterfactual-negation
description: Apply IN17 Counterfactual Negation to imagine outcomes if key decision had been reversed.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in17-counterfactual-negation","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN17 Counterfactual Negation

Apply the IN17 Counterfactual Negation transformation to imagine outcomes if key decision had been reversed.

## What is IN17?

**IN17 (Counterfactual Negation)** Imagine outcomes if key decision had been reversed.

## When to Use IN17

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Counterfactual Negation here?"
- "What changes if we apply IN17 to this risk assessment for a launch?"
- "Which assumptions does IN17 help us surface?"

## The IN17 Process

### Step 1: Define the focus

```typescript
// Using IN17 (Counterfactual Negation) - Establish the focus
const focus = "Imagine outcomes if key decision had been reversed";
```

### Step 2: Apply the model

```typescript
// Using IN17 (Counterfactual Negation) - Apply the transformation
const output = applyModel("IN17", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN17 (Counterfactual Negation) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN17 (Counterfactual Negation) - Example in a risk assessment for a launch
const result = applyModel("IN17", "Imagine outcomes if key decision had been reversed" );
```

## Integration with Other Transformations

- **IN17 -> P1**: Pair with P1 when sequencing matters.
- **IN17 -> DE3**: Use DE3 to validate or stress-test.
- **IN17 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN17
- [ ] Apply the model using explicit IN17 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN17 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in17-counterfactual-negation"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in17-counterfactual-negation
```

### Usage with Commands

```bash
/apply-transformation IN17 "Imagine outcomes if key decision had been reversed"
```

---
*Apply IN17 to create repeatable, explicit mental model reasoning.*
