---
name: in13-opportunity-cost-focus
description: Apply IN13 Opportunity Cost Focus to evaluate options by what must be forgone rather than what is gained.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in13-opportunity-cost-focus","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN13 Opportunity Cost Focus

Apply the IN13 Opportunity Cost Focus transformation to evaluate options by what must be forgone rather than what is gained.

## What is IN13?

**IN13 (Opportunity Cost Focus)** Evaluate options by what must be forgone rather than what is gained.

## When to Use IN13

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Opportunity Cost Focus here?"
- "What changes if we apply IN13 to this risk assessment for a launch?"
- "Which assumptions does IN13 help us surface?"

## The IN13 Process

### Step 1: Define the focus

```typescript
// Using IN13 (Opportunity Cost Focus) - Establish the focus
const focus = "Evaluate options by what must be forgone rather than what is gained";
```

### Step 2: Apply the model

```typescript
// Using IN13 (Opportunity Cost Focus) - Apply the transformation
const output = applyModel("IN13", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN13 (Opportunity Cost Focus) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN13 (Opportunity Cost Focus) - Example in a risk assessment for a launch
const result = applyModel("IN13", "Evaluate options by what must be forgone rather than what is gained" );
```

## Integration with Other Transformations

- **IN13 -> P1**: Pair with P1 when sequencing matters.
- **IN13 -> DE3**: Use DE3 to validate or stress-test.
- **IN13 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN13
- [ ] Apply the model using explicit IN13 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN13 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in13-opportunity-cost-focus"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in13-opportunity-cost-focus
```

### Usage with Commands

```bash
/apply-transformation IN13 "Evaluate options by what must be forgone rather than what is gained"
```

---
*Apply IN13 to create repeatable, explicit mental model reasoning.*
