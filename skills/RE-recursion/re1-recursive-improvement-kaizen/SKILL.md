---
name: re1-recursive-improvement-kaizen
description: Apply RE1 Recursive Improvement (Kaizen) to continuously refine process through small, frequent enhancements.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/RE-recursion/re1-recursive-improvement-kaizen","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# RE1 Recursive Improvement (Kaizen)

Apply the RE1 Recursive Improvement (Kaizen) transformation to continuously refine process through small, frequent enhancements.

## What is RE1?

**RE1 (Recursive Improvement (Kaizen))** Continuously refine process through small, frequent enhancements.

## When to Use RE1

### Ideal Situations

- Iterate toward a better solution using feedback loops
- Refine a process through repeated cycles
- Scale a pattern through repetition and standardization

### Trigger Questions

- "How can we use Recursive Improvement (Kaizen) here?"
- "What changes if we apply RE1 to this iterating a workflow over several cycles?"
- "Which assumptions does RE1 help us surface?"

## The RE1 Process

### Step 1: Define the focus

```typescript
// Using RE1 (Recursive Improvement (Kaizen)) - Establish the focus
const focus = "Continuously refine process through small, frequent enhancements";
```

### Step 2: Apply the model

```typescript
// Using RE1 (Recursive Improvement (Kaizen)) - Apply the transformation
const output = applyModel("RE1", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using RE1 (Recursive Improvement (Kaizen)) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using RE1 (Recursive Improvement (Kaizen)) - Example in a iterating a workflow over several cycles
const result = applyModel("RE1", "Continuously refine process through small, frequent enhancements" );
```

## Integration with Other Transformations

- **RE1 -> CO5**: Pair with CO5 when sequencing matters.
- **RE1 -> SY8**: Use SY8 to validate or stress-test.
- **RE1 -> IN3**: Apply IN3 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires RE1
- [ ] Apply the model using explicit RE1 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit RE1 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/RE-recursion/re1-recursive-improvement-kaizen"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/re1-recursive-improvement-kaizen
```

### Usage with Commands

```bash
/apply-transformation RE1 "Continuously refine process through small, frequent enhancements"
```

---
*Apply RE1 to create repeatable, explicit mental model reasoning.*
