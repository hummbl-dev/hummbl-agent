---
name: p14-reference-class-framing
description: Apply P14 Reference Class Framing to select comparable situations to inform judgment and avoid uniqueness bias.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p14-reference-class-framing","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P14 Reference Class Framing

Apply the P14 Reference Class Framing transformation to select comparable situations to inform judgment and avoid uniqueness bias.

## What is P14?

**P14 (Reference Class Framing)** Select comparable situations to inform judgment and avoid uniqueness bias.

## When to Use P14

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use Reference Class Framing here?"
- "What changes if we apply P14 to this product requirements review?"
- "Which assumptions does P14 help us surface?"

## The P14 Process

### Step 1: Define the focus

```typescript
// Using P14 (Reference Class Framing) - Establish the focus
const focus = "Select comparable situations to inform judgment and avoid uniqueness bias";
```

### Step 2: Apply the model

```typescript
// Using P14 (Reference Class Framing) - Apply the transformation
const output = applyModel("P14", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P14 (Reference Class Framing) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P14 (Reference Class Framing) - Example in a product requirements review
const result = applyModel("P14", "Select comparable situations to inform judgment and avoid uniqueness bias" );
```

## Integration with Other Transformations

- **P14 -> DE3**: Pair with DE3 when sequencing matters.
- **P14 -> IN2**: Use IN2 to validate or stress-test.
- **P14 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P14
- [ ] Apply the model using explicit P14 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P14 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p14-reference-class-framing"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p14-reference-class-framing
```

### Usage with Commands

```bash
/apply-transformation P14 "Select comparable situations to inform judgment and avoid uniqueness bias"
```

---
*Apply P14 to create repeatable, explicit mental model reasoning.*
