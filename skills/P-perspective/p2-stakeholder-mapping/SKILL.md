---
name: p2-stakeholder-mapping
description: Apply P2 Stakeholder Mapping to identify all parties with interest, influence, or impact in a system or decision.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p2-stakeholder-mapping","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P2 Stakeholder Mapping

Apply the P2 Stakeholder Mapping transformation to identify all parties with interest, influence, or impact in a system or decision.

## What is P2?

**P2 (Stakeholder Mapping)** Identify all parties with interest, influence, or impact in a system or decision.

## When to Use P2

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use Stakeholder Mapping here?"
- "What changes if we apply P2 to this product requirements review?"
- "Which assumptions does P2 help us surface?"

## The P2 Process

### Step 1: Define the focus

```typescript
// Using P2 (Stakeholder Mapping) - Establish the focus
const focus = "Identify all parties with interest, influence, or impact in a system or decision";
```

### Step 2: Apply the model

```typescript
// Using P2 (Stakeholder Mapping) - Apply the transformation
const output = applyModel("P2", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P2 (Stakeholder Mapping) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P2 (Stakeholder Mapping) - Example in a product requirements review
const result = applyModel("P2", "Identify all parties with interest, influence, or impact in a system or decision" );
```

## Integration with Other Transformations

- **P2 -> DE3**: Pair with DE3 when sequencing matters.
- **P2 -> IN2**: Use IN2 to validate or stress-test.
- **P2 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P2
- [ ] Apply the model using explicit P2 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P2 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p2-stakeholder-mapping"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p2-stakeholder-mapping
```

### Usage with Commands

```bash
/apply-transformation P2 "Identify all parties with interest, influence, or impact in a system or decision"
```

---
*Apply P2 to create repeatable, explicit mental model reasoning.*
