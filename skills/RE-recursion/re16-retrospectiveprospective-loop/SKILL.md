---
name: re16-retrospectiveprospective-loop
description: Apply RE16 Retrospective→Prospective Loop to use systematic reflection on past to inform future planning.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/RE-recursion/re16-retrospectiveprospective-loop","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# RE16 Retrospective→Prospective Loop

Apply the RE16 Retrospective→Prospective Loop transformation to use systematic reflection on past to inform future planning.

## What is RE16?

**RE16 (Retrospective→Prospective Loop)** Use systematic reflection on past to inform future planning.

## When to Use RE16

### Ideal Situations

- Iterate toward a better solution using feedback loops
- Refine a process through repeated cycles
- Scale a pattern through repetition and standardization

### Trigger Questions

- "How can we use Retrospective→Prospective Loop here?"
- "What changes if we apply RE16 to this iterating a workflow over several cycles?"
- "Which assumptions does RE16 help us surface?"

## The RE16 Process

### Step 1: Define the focus

```typescript
// Using RE16 (Retrospective→Prospective Loop) - Establish the focus
const focus = "Use systematic reflection on past to inform future planning";
```

### Step 2: Apply the model

```typescript
// Using RE16 (Retrospective→Prospective Loop) - Apply the transformation
const output = applyModel("RE16", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using RE16 (Retrospective→Prospective Loop) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using RE16 (Retrospective→Prospective Loop) - Example in a iterating a workflow over several cycles
const result = applyModel("RE16", "Use systematic reflection on past to inform future planning" );
```

## Integration with Other Transformations

- **RE16 -> CO5**: Pair with CO5 when sequencing matters.
- **RE16 -> SY8**: Use SY8 to validate or stress-test.
- **RE16 -> IN3**: Apply IN3 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires RE16
- [ ] Apply the model using explicit RE16 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit RE16 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/RE-recursion/re16-retrospectiveprospective-loop"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/re16-retrospectiveprospective-loop
```

### Usage with Commands

```bash
/apply-transformation RE16 "Use systematic reflection on past to inform future planning"
```

---
*Apply RE16 to create repeatable, explicit mental model reasoning.*
