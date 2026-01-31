---
name: p9-cultural-lens-shifting
description: Apply P9 Cultural Lens Shifting to adjust communication and interpretation for different cultural contexts and norms.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p9-cultural-lens-shifting","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P9 Cultural Lens Shifting

Apply the P9 Cultural Lens Shifting transformation to adjust communication and interpretation for different cultural contexts and norms.

## What is P9?

**P9 (Cultural Lens Shifting)** Adjust communication and interpretation for different cultural contexts and norms.

## When to Use P9

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use Cultural Lens Shifting here?"
- "What changes if we apply P9 to this product requirements review?"
- "Which assumptions does P9 help us surface?"

## The P9 Process

### Step 1: Define the focus

```typescript
// Using P9 (Cultural Lens Shifting) - Establish the focus
const focus = "Adjust communication and interpretation for different cultural contexts and norms";
```

### Step 2: Apply the model

```typescript
// Using P9 (Cultural Lens Shifting) - Apply the transformation
const output = applyModel("P9", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P9 (Cultural Lens Shifting) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P9 (Cultural Lens Shifting) - Example in a product requirements review
const result = applyModel("P9", "Adjust communication and interpretation for different cultural contexts and norms" );
```

## Integration with Other Transformations

- **P9 -> DE3**: Pair with DE3 when sequencing matters.
- **P9 -> IN2**: Use IN2 to validate or stress-test.
- **P9 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P9
- [ ] Apply the model using explicit P9 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P9 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p9-cultural-lens-shifting"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p9-cultural-lens-shifting
```

### Usage with Commands

```bash
/apply-transformation P9 "Adjust communication and interpretation for different cultural contexts and norms"
```

---
*Apply P9 to create repeatable, explicit mental model reasoning.*
