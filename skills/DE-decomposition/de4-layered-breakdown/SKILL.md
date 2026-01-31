---
name: de4-layered-breakdown
description: Apply DE4 Layered Breakdown to decompose from system to subsystem to component progressively.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de4-layered-breakdown","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# DE4 Layered Breakdown

Apply the DE4 Layered Breakdown transformation to decompose from system to subsystem to component progressively.

## What is DE4?

**DE4 (Layered Breakdown)** Decompose from system to subsystem to component progressively.

## When to Use DE4

### Ideal Situations

- Break a complex problem into manageable parts
- Separate concerns to isolate risk and effort
- Create modular workstreams for parallel progress

### Trigger Questions

- "How can we use Layered Breakdown here?"
- "What changes if we apply DE4 to this breaking down an implementation plan?"
- "Which assumptions does DE4 help us surface?"

## The DE4 Process

### Step 1: Define the focus

```typescript
// Using DE4 (Layered Breakdown) - Establish the focus
const focus = "Decompose from system to subsystem to component progressively";
```

### Step 2: Apply the model

```typescript
// Using DE4 (Layered Breakdown) - Apply the transformation
const output = applyModel("DE4", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using DE4 (Layered Breakdown) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using DE4 (Layered Breakdown) - Example in a breaking down an implementation plan
const result = applyModel("DE4", "Decompose from system to subsystem to component progressively" );
```

## Integration with Other Transformations

- **DE4 -> P1**: Pair with P1 when sequencing matters.
- **DE4 -> CO5**: Use CO5 to validate or stress-test.
- **DE4 -> IN2**: Apply IN2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires DE4
- [ ] Apply the model using explicit DE4 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit DE4 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de4-layered-breakdown"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/de4-layered-breakdown
```

### Usage with Commands

```bash
/apply-transformation DE4 "Decompose from system to subsystem to component progressively"
```

---
*Apply DE4 to create repeatable, explicit mental model reasoning.*
