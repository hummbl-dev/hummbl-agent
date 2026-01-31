---
name: p1-first-principles-framing
description: Apply P1 First Principles Framing to reduce complex problems to foundational truths that cannot be further simplified.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p1-first-principles-framing","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P1 First Principles Framing

Apply the P1 First Principles Framing transformation to reduce complex problems to foundational truths that cannot be further simplified.

## What is P1?

**P1 (First Principles Framing)** Reduce complex problems to foundational truths that cannot be further simplified.

## When to Use P1

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use First Principles Framing here?"
- "What changes if we apply P1 to this product requirements review?"
- "Which assumptions does P1 help us surface?"

## The P1 Process

### Step 1: Define the focus

```typescript
// Using P1 (First Principles Framing) - Establish the focus
const focus = "Reduce complex problems to foundational truths that cannot be further simplified";
```

### Step 2: Apply the model

```typescript
// Using P1 (First Principles Framing) - Apply the transformation
const output = applyModel("P1", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P1 (First Principles Framing) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P1 (First Principles Framing) - Example in a product requirements review
const result = applyModel("P1", "Reduce complex problems to foundational truths that cannot be further simplified" );
```

## Integration with Other Transformations

- **P1 -> DE3**: Pair with DE3 when sequencing matters.
- **P1 -> IN2**: Use IN2 to validate or stress-test.
- **P1 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P1
- [ ] Apply the model using explicit P1 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P1 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p1-first-principles-framing"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p1-first-principles-framing
```

### Usage with Commands

```bash
/apply-transformation P1 "Reduce complex problems to foundational truths that cannot be further simplified"
```

---
*Apply P1 to create repeatable, explicit mental model reasoning.*
