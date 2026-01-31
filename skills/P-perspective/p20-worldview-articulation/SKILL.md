---
name: p20-worldview-articulation
description: Apply P20 Worldview Articulation to make explicit the fundamental beliefs and values that drive interpretation and action.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p20-worldview-articulation","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P20 Worldview Articulation

Apply the P20 Worldview Articulation transformation to make explicit the fundamental beliefs and values that drive interpretation and action.

## What is P20?

**P20 (Worldview Articulation)** Make explicit the fundamental beliefs and values that drive interpretation and action.

## When to Use P20

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use Worldview Articulation here?"
- "What changes if we apply P20 to this product requirements review?"
- "Which assumptions does P20 help us surface?"

## The P20 Process

### Step 1: Define the focus

```typescript
// Using P20 (Worldview Articulation) - Establish the focus
const focus = "Make explicit the fundamental beliefs and values that drive interpretation and action";
```

### Step 2: Apply the model

```typescript
// Using P20 (Worldview Articulation) - Apply the transformation
const output = applyModel("P20", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P20 (Worldview Articulation) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P20 (Worldview Articulation) - Example in a product requirements review
const result = applyModel("P20", "Make explicit the fundamental beliefs and values that drive interpretation and action" );
```

## Integration with Other Transformations

- **P20 -> DE3**: Pair with DE3 when sequencing matters.
- **P20 -> IN2**: Use IN2 to validate or stress-test.
- **P20 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P20
- [ ] Apply the model using explicit P20 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P20 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p20-worldview-articulation"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p20-worldview-articulation
```

### Usage with Commands

```bash
/apply-transformation P20 "Make explicit the fundamental beliefs and values that drive interpretation and action"
```

---
*Apply P20 to create repeatable, explicit mental model reasoning.*
