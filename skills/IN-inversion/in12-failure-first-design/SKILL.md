---
name: in12-failure-first-design
description: Apply IN12 Failure First Design to begin planning by identifying all possible failure modes and designing to prevent them.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in12-failure-first-design","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN12 Failure First Design

Apply the IN12 Failure First Design transformation to begin planning by identifying all possible failure modes and designing to prevent them.

## What is IN12?

**IN12 (Failure First Design)** Begin planning by identifying all possible failure modes and designing to prevent them.

## When to Use IN12

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Failure First Design here?"
- "What changes if we apply IN12 to this risk assessment for a launch?"
- "Which assumptions does IN12 help us surface?"

## The IN12 Process

### Step 1: Define the focus

```typescript
// Using IN12 (Failure First Design) - Establish the focus
const focus = "Begin planning by identifying all possible failure modes and designing to prevent them";
```

### Step 2: Apply the model

```typescript
// Using IN12 (Failure First Design) - Apply the transformation
const output = applyModel("IN12", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN12 (Failure First Design) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN12 (Failure First Design) - Example in a risk assessment for a launch
const result = applyModel("IN12", "Begin planning by identifying all possible failure modes and designing to prevent them" );
```

## Integration with Other Transformations

- **IN12 -> P1**: Pair with P1 when sequencing matters.
- **IN12 -> DE3**: Use DE3 to validate or stress-test.
- **IN12 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN12
- [ ] Apply the model using explicit IN12 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN12 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in12-failure-first-design"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in12-failure-first-design
```

### Usage with Commands

```bash
/apply-transformation IN12 "Begin planning by identifying all possible failure modes and designing to prevent them"
```

---
*Apply IN12 to create repeatable, explicit mental model reasoning.*
