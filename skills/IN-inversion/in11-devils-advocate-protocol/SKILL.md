---
name: in11-devils-advocate-protocol
description: Apply IN11 Devil's Advocate Protocol to assign explicit role to argue against group consensus or preferred option.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in11-devils-advocate-protocol","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN11 Devil's Advocate Protocol

Apply the IN11 Devil's Advocate Protocol transformation to assign explicit role to argue against group consensus or preferred option.

## What is IN11?

**IN11 (Devil's Advocate Protocol)** Assign explicit role to argue against group consensus or preferred option.

## When to Use IN11

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Devil's Advocate Protocol here?"
- "What changes if we apply IN11 to this risk assessment for a launch?"
- "Which assumptions does IN11 help us surface?"

## The IN11 Process

### Step 1: Define the focus

```typescript
// Using IN11 (Devil's Advocate Protocol) - Establish the focus
const focus = "Assign explicit role to argue against group consensus or preferred option";
```

### Step 2: Apply the model

```typescript
// Using IN11 (Devil's Advocate Protocol) - Apply the transformation
const output = applyModel("IN11", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN11 (Devil's Advocate Protocol) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN11 (Devil's Advocate Protocol) - Example in a risk assessment for a launch
const result = applyModel("IN11", "Assign explicit role to argue against group consensus or preferred option" );
```

## Integration with Other Transformations

- **IN11 -> P1**: Pair with P1 when sequencing matters.
- **IN11 -> DE3**: Use DE3 to validate or stress-test.
- **IN11 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN11
- [ ] Apply the model using explicit IN11 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN11 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in11-devils-advocate-protocol"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in11-devils-advocate-protocol
```

### Usage with Commands

```bash
/apply-transformation IN11 "Assign explicit role to argue against group consensus or preferred option"
```

---
*Apply IN11 to create repeatable, explicit mental model reasoning.*
