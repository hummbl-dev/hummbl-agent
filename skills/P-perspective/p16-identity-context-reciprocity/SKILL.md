---
name: p16-identity-context-reciprocity
description: Apply P16 Identity-Context Reciprocity to recognize how identities shape interpretations and contexts reinforce identities.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p16-identity-context-reciprocity","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P16 Identity-Context Reciprocity

Apply the P16 Identity-Context Reciprocity transformation to recognize how identities shape interpretations and contexts reinforce identities.

## What is P16?

**P16 (Identity-Context Reciprocity)** Recognize how identities shape interpretations and contexts reinforce identities.

## When to Use P16

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use Identity-Context Reciprocity here?"
- "What changes if we apply P16 to this product requirements review?"
- "Which assumptions does P16 help us surface?"

## The P16 Process

### Step 1: Define the focus

```typescript
// Using P16 (Identity-Context Reciprocity) - Establish the focus
const focus = "Recognize how identities shape interpretations and contexts reinforce identities";
```

### Step 2: Apply the model

```typescript
// Using P16 (Identity-Context Reciprocity) - Apply the transformation
const output = applyModel("P16", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P16 (Identity-Context Reciprocity) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P16 (Identity-Context Reciprocity) - Example in a product requirements review
const result = applyModel("P16", "Recognize how identities shape interpretations and contexts reinforce identities" );
```

## Integration with Other Transformations

- **P16 -> DE3**: Pair with DE3 when sequencing matters.
- **P16 -> IN2**: Use IN2 to validate or stress-test.
- **P16 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P16
- [ ] Apply the model using explicit P16 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P16 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p16-identity-context-reciprocity"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p16-identity-context-reciprocity
```

### Usage with Commands

```bash
/apply-transformation P16 "Recognize how identities shape interpretations and contexts reinforce identities"
```

---
*Apply P16 to create repeatable, explicit mental model reasoning.*
