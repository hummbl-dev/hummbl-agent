---
name: p15-assumption-surfacing
description: Apply P15 Assumption Surfacing to explicitly identify and document beliefs underlying plans or models.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p15-assumption-surfacing","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P15 Assumption Surfacing

Apply the P15 Assumption Surfacing transformation to explicitly identify and document beliefs underlying plans or models.

## What is P15?

**P15 (Assumption Surfacing)** Explicitly identify and document beliefs underlying plans or models.

## When to Use P15

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use Assumption Surfacing here?"
- "What changes if we apply P15 to this product requirements review?"
- "Which assumptions does P15 help us surface?"

## The P15 Process

### Step 1: Define the focus

```typescript
// Using P15 (Assumption Surfacing) - Establish the focus
const focus = "Explicitly identify and document beliefs underlying plans or models";
```

### Step 2: Apply the model

```typescript
// Using P15 (Assumption Surfacing) - Apply the transformation
const output = applyModel("P15", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P15 (Assumption Surfacing) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P15 (Assumption Surfacing) - Example in a product requirements review
const result = applyModel("P15", "Explicitly identify and document beliefs underlying plans or models" );
```

## Integration with Other Transformations

- **P15 -> DE3**: Pair with DE3 when sequencing matters.
- **P15 -> IN2**: Use IN2 to validate or stress-test.
- **P15 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P15
- [ ] Apply the model using explicit P15 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P15 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p15-assumption-surfacing"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p15-assumption-surfacing
```

### Usage with Commands

```bash
/apply-transformation P15 "Explicitly identify and document beliefs underlying plans or models"
```

---
*Apply P15 to create repeatable, explicit mental model reasoning.*
