---
name: p6-point-of-view-anchoring
description: Apply P6 Point-of-View Anchoring to establish and maintain a consistent reference frame before analysis begins.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p6-point-of-view-anchoring","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P6 Point-of-View Anchoring

Apply the P6 Point-of-View Anchoring transformation to establish and maintain a consistent reference frame before analysis begins.

## What is P6?

**P6 (Point-of-View Anchoring)** Establish and maintain a consistent reference frame before analysis begins.

## When to Use P6

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use Point-of-View Anchoring here?"
- "What changes if we apply P6 to this product requirements review?"
- "Which assumptions does P6 help us surface?"

## The P6 Process

### Step 1: Define the focus

```typescript
// Using P6 (Point-of-View Anchoring) - Establish the focus
const focus = "Establish and maintain a consistent reference frame before analysis begins";
```

### Step 2: Apply the model

```typescript
// Using P6 (Point-of-View Anchoring) - Apply the transformation
const output = applyModel("P6", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P6 (Point-of-View Anchoring) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P6 (Point-of-View Anchoring) - Example in a product requirements review
const result = applyModel("P6", "Establish and maintain a consistent reference frame before analysis begins" );
```

## Integration with Other Transformations

- **P6 -> DE3**: Pair with DE3 when sequencing matters.
- **P6 -> IN2**: Use IN2 to validate or stress-test.
- **P6 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P6
- [ ] Apply the model using explicit P6 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P6 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p6-point-of-view-anchoring"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p6-point-of-view-anchoring
```

### Usage with Commands

```bash
/apply-transformation P6 "Establish and maintain a consistent reference frame before analysis begins"
```

---
*Apply P6 to create repeatable, explicit mental model reasoning.*
