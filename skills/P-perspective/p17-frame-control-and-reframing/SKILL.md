---
name: p17-frame-control-and-reframing
description: Apply P17 Frame Control & Reframing to consciously select or reshape interpretive frames to enable new solutions.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p17-frame-control-and-reframing","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P17 Frame Control & Reframing

Apply the P17 Frame Control & Reframing transformation to consciously select or reshape interpretive frames to enable new solutions.

## What is P17?

**P17 (Frame Control & Reframing)** Consciously select or reshape interpretive frames to enable new solutions.

## When to Use P17

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use Frame Control & Reframing here?"
- "What changes if we apply P17 to this product requirements review?"
- "Which assumptions does P17 help us surface?"

## The P17 Process

### Step 1: Define the focus

```typescript
// Using P17 (Frame Control & Reframing) - Establish the focus
const focus = "Consciously select or reshape interpretive frames to enable new solutions";
```

### Step 2: Apply the model

```typescript
// Using P17 (Frame Control & Reframing) - Apply the transformation
const output = applyModel("P17", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P17 (Frame Control & Reframing) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P17 (Frame Control & Reframing) - Example in a product requirements review
const result = applyModel("P17", "Consciously select or reshape interpretive frames to enable new solutions" );
```

## Integration with Other Transformations

- **P17 -> DE3**: Pair with DE3 when sequencing matters.
- **P17 -> IN2**: Use IN2 to validate or stress-test.
- **P17 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P17
- [ ] Apply the model using explicit P17 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P17 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p17-frame-control-and-reframing"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p17-frame-control-and-reframing
```

### Usage with Commands

```bash
/apply-transformation P17 "Consciously select or reshape interpretive frames to enable new solutions"
```

---
*Apply P17 to create repeatable, explicit mental model reasoning.*
