---
name: re15-convergence-divergence-cycling
description: Apply RE15 Convergence-Divergence Cycling to alternate between expanding possibilities and narrowing to decisions.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/RE-recursion/re15-convergence-divergence-cycling","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# RE15 Convergence-Divergence Cycling

Apply the RE15 Convergence-Divergence Cycling transformation to alternate between expanding possibilities and narrowing to decisions.

## What is RE15?

**RE15 (Convergence-Divergence Cycling)** Alternate between expanding possibilities and narrowing to decisions.

## When to Use RE15

### Ideal Situations

- Iterate toward a better solution using feedback loops
- Refine a process through repeated cycles
- Scale a pattern through repetition and standardization

### Trigger Questions

- "How can we use Convergence-Divergence Cycling here?"
- "What changes if we apply RE15 to this iterating a workflow over several cycles?"
- "Which assumptions does RE15 help us surface?"

## The RE15 Process

### Step 1: Define the focus

```typescript
// Using RE15 (Convergence-Divergence Cycling) - Establish the focus
const focus = "Alternate between expanding possibilities and narrowing to decisions";
```

### Step 2: Apply the model

```typescript
// Using RE15 (Convergence-Divergence Cycling) - Apply the transformation
const output = applyModel("RE15", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using RE15 (Convergence-Divergence Cycling) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using RE15 (Convergence-Divergence Cycling) - Example in a iterating a workflow over several cycles
const result = applyModel("RE15", "Alternate between expanding possibilities and narrowing to decisions" );
```

## Integration with Other Transformations

- **RE15 -> CO5**: Pair with CO5 when sequencing matters.
- **RE15 -> SY8**: Use SY8 to validate or stress-test.
- **RE15 -> IN3**: Apply IN3 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires RE15
- [ ] Apply the model using explicit RE15 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit RE15 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/RE-recursion/re15-convergence-divergence-cycling"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/re15-convergence-divergence-cycling
```

### Usage with Commands

```bash
/apply-transformation RE15 "Alternate between expanding possibilities and narrowing to decisions"
```

---
*Apply RE15 to create repeatable, explicit mental model reasoning.*
