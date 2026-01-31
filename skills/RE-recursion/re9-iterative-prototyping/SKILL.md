---
name: re9-iterative-prototyping
description: Apply RE9 Iterative Prototyping to cycle rapidly through build-test-learn loops with increasing fidelity.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/RE-recursion/re9-iterative-prototyping","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# RE9 Iterative Prototyping

Apply the RE9 Iterative Prototyping transformation to cycle rapidly through build-test-learn loops with increasing fidelity.

## What is RE9?

**RE9 (Iterative Prototyping)** Cycle rapidly through build-test-learn loops with increasing fidelity.

## When to Use RE9

### Ideal Situations

- Iterate toward a better solution using feedback loops
- Refine a process through repeated cycles
- Scale a pattern through repetition and standardization

### Trigger Questions

- "How can we use Iterative Prototyping here?"
- "What changes if we apply RE9 to this iterating a workflow over several cycles?"
- "Which assumptions does RE9 help us surface?"

## The RE9 Process

### Step 1: Define the focus

```typescript
// Using RE9 (Iterative Prototyping) - Establish the focus
const focus = "Cycle rapidly through build-test-learn loops with increasing fidelity";
```

### Step 2: Apply the model

```typescript
// Using RE9 (Iterative Prototyping) - Apply the transformation
const output = applyModel("RE9", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using RE9 (Iterative Prototyping) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using RE9 (Iterative Prototyping) - Example in a iterating a workflow over several cycles
const result = applyModel("RE9", "Cycle rapidly through build-test-learn loops with increasing fidelity" );
```

## Integration with Other Transformations

- **RE9 -> CO5**: Pair with CO5 when sequencing matters.
- **RE9 -> SY8**: Use SY8 to validate or stress-test.
- **RE9 -> IN3**: Apply IN3 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires RE9
- [ ] Apply the model using explicit RE9 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit RE9 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/RE-recursion/re9-iterative-prototyping"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/re9-iterative-prototyping
```

### Usage with Commands

```bash
/apply-transformation RE9 "Cycle rapidly through build-test-learn loops with increasing fidelity"
```

---
*Apply RE9 to create repeatable, explicit mental model reasoning.*
