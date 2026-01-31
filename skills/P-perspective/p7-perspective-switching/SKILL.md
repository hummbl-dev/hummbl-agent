---
name: p7-perspective-switching
description: Apply P7 Perspective Switching to rotate through multiple viewpoints to identify invariants and blind spots.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p7-perspective-switching","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P7 Perspective Switching

Apply the P7 Perspective Switching transformation to rotate through multiple viewpoints to identify invariants and blind spots.

## What is P7?

**P7 (Perspective Switching)** Rotate through multiple viewpoints to identify invariants and blind spots.

## When to Use P7

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use Perspective Switching here?"
- "What changes if we apply P7 to this product requirements review?"
- "Which assumptions does P7 help us surface?"

## The P7 Process

### Step 1: Define the focus

```typescript
// Using P7 (Perspective Switching) - Establish the focus
const focus = "Rotate through multiple viewpoints to identify invariants and blind spots";
```

### Step 2: Apply the model

```typescript
// Using P7 (Perspective Switching) - Apply the transformation
const output = applyModel("P7", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P7 (Perspective Switching) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P7 (Perspective Switching) - Example in a product requirements review
const result = applyModel("P7", "Rotate through multiple viewpoints to identify invariants and blind spots" );
```

## Integration with Other Transformations

- **P7 -> DE3**: Pair with DE3 when sequencing matters.
- **P7 -> IN2**: Use IN2 to validate or stress-test.
- **P7 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P7
- [ ] Apply the model using explicit P7 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P7 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p7-perspective-switching"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p7-perspective-switching
```

### Usage with Commands

```bash
/apply-transformation P7 "Rotate through multiple viewpoints to identify invariants and blind spots"
```

---
*Apply P7 to create repeatable, explicit mental model reasoning.*
