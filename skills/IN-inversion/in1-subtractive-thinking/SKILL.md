---
name: in1-subtractive-thinking
description: Apply IN1 Subtractive Thinking to improve systems by removing elements rather than adding complexity.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in1-subtractive-thinking","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN1 Subtractive Thinking

Apply the IN1 Subtractive Thinking transformation to improve systems by removing elements rather than adding complexity.

## What is IN1?

**IN1 (Subtractive Thinking)** Improve systems by removing elements rather than adding complexity.

## When to Use IN1

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Subtractive Thinking here?"
- "What changes if we apply IN1 to this risk assessment for a launch?"
- "Which assumptions does IN1 help us surface?"

## The IN1 Process

### Step 1: Define the focus

```typescript
// Using IN1 (Subtractive Thinking) - Establish the focus
const focus = "Improve systems by removing elements rather than adding complexity";
```

### Step 2: Apply the model

```typescript
// Using IN1 (Subtractive Thinking) - Apply the transformation
const output = applyModel("IN1", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN1 (Subtractive Thinking) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN1 (Subtractive Thinking) - Example in a risk assessment for a launch
const result = applyModel("IN1", "Improve systems by removing elements rather than adding complexity" );
```

## Integration with Other Transformations

- **IN1 -> P1**: Pair with P1 when sequencing matters.
- **IN1 -> DE3**: Use DE3 to validate or stress-test.
- **IN1 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN1
- [ ] Apply the model using explicit IN1 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN1 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in1-subtractive-thinking"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in1-subtractive-thinking
```

### Usage with Commands

```bash
/apply-transformation IN1 "Improve systems by removing elements rather than adding complexity"
```

---
*Apply IN1 to create repeatable, explicit mental model reasoning.*
