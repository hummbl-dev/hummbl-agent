---
name: p19-sensemaking-canvases
description: Apply P19 Sensemaking Canvases to deploy structured templates to systematically capture and organize observations.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p19-sensemaking-canvases","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P19 Sensemaking Canvases

Apply the P19 Sensemaking Canvases transformation to deploy structured templates to systematically capture and organize observations.

## What is P19?

**P19 (Sensemaking Canvases)** Deploy structured templates to systematically capture and organize observations.

## When to Use P19

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use Sensemaking Canvases here?"
- "What changes if we apply P19 to this product requirements review?"
- "Which assumptions does P19 help us surface?"

## The P19 Process

### Step 1: Define the focus

```typescript
// Using P19 (Sensemaking Canvases) - Establish the focus
const focus = "Deploy structured templates to systematically capture and organize observations";
```

### Step 2: Apply the model

```typescript
// Using P19 (Sensemaking Canvases) - Apply the transformation
const output = applyModel("P19", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P19 (Sensemaking Canvases) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P19 (Sensemaking Canvases) - Example in a product requirements review
const result = applyModel("P19", "Deploy structured templates to systematically capture and organize observations" );
```

## Integration with Other Transformations

- **P19 -> DE3**: Pair with DE3 when sequencing matters.
- **P19 -> IN2**: Use IN2 to validate or stress-test.
- **P19 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P19
- [ ] Apply the model using explicit P19 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P19 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p19-sensemaking-canvases"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p19-sensemaking-canvases
```

### Usage with Commands

```bash
/apply-transformation P19 "Deploy structured templates to systematically capture and organize observations"
```

---
*Apply P19 to create repeatable, explicit mental model reasoning.*
