---
name: de7-pareto-decomposition-8020
description: Apply DE7 Pareto Decomposition (80/20) to identify vital few drivers producing most impact versus trivial many.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de7-pareto-decomposition-8020","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# DE7 Pareto Decomposition (80/20)

Apply the DE7 Pareto Decomposition (80/20) transformation to identify vital few drivers producing most impact versus trivial many.

## What is DE7?

**DE7 (Pareto Decomposition (80/20))** Identify vital few drivers producing most impact versus trivial many.

## When to Use DE7

### Ideal Situations

- Break a complex problem into manageable parts
- Separate concerns to isolate risk and effort
- Create modular workstreams for parallel progress

### Trigger Questions

- "How can we use Pareto Decomposition (80/20) here?"
- "What changes if we apply DE7 to this breaking down an implementation plan?"
- "Which assumptions does DE7 help us surface?"

## The DE7 Process

### Step 1: Define the focus

```typescript
// Using DE7 (Pareto Decomposition (80/20)) - Establish the focus
const focus = "Identify vital few drivers producing most impact versus trivial many";
```

### Step 2: Apply the model

```typescript
// Using DE7 (Pareto Decomposition (80/20)) - Apply the transformation
const output = applyModel("DE7", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using DE7 (Pareto Decomposition (80/20)) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using DE7 (Pareto Decomposition (80/20)) - Example in a breaking down an implementation plan
const result = applyModel("DE7", "Identify vital few drivers producing most impact versus trivial many" );
```

## Integration with Other Transformations

- **DE7 -> P1**: Pair with P1 when sequencing matters.
- **DE7 -> CO5**: Use CO5 to validate or stress-test.
- **DE7 -> IN2**: Apply IN2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires DE7
- [ ] Apply the model using explicit DE7 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit DE7 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de7-pareto-decomposition-8020"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/de7-pareto-decomposition-8020
```

### Usage with Commands

```bash
/apply-transformation DE7 "Identify vital few drivers producing most impact versus trivial many"
```

---
*Apply DE7 to create repeatable, explicit mental model reasoning.*
