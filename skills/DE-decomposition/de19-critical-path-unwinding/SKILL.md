---
name: de19-critical-path-unwinding
description: Apply DE19 Critical Path Unwinding to trace longest sequence of dependent tasks determining minimum project duration.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de19-critical-path-unwinding","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# DE19 Critical Path Unwinding

Apply the DE19 Critical Path Unwinding transformation to trace longest sequence of dependent tasks determining minimum project duration.

## What is DE19?

**DE19 (Critical Path Unwinding)** Trace longest sequence of dependent tasks determining minimum project duration.

## When to Use DE19

### Ideal Situations

- Break a complex problem into manageable parts
- Separate concerns to isolate risk and effort
- Create modular workstreams for parallel progress

### Trigger Questions

- "How can we use Critical Path Unwinding here?"
- "What changes if we apply DE19 to this breaking down an implementation plan?"
- "Which assumptions does DE19 help us surface?"

## The DE19 Process

### Step 1: Define the focus

```typescript
// Using DE19 (Critical Path Unwinding) - Establish the focus
const focus = "Trace longest sequence of dependent tasks determining minimum project duration";
```

### Step 2: Apply the model

```typescript
// Using DE19 (Critical Path Unwinding) - Apply the transformation
const output = applyModel("DE19", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using DE19 (Critical Path Unwinding) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using DE19 (Critical Path Unwinding) - Example in a breaking down an implementation plan
const result = applyModel("DE19", "Trace longest sequence of dependent tasks determining minimum project duration" );
```

## Integration with Other Transformations

- **DE19 -> P1**: Pair with P1 when sequencing matters.
- **DE19 -> CO5**: Use CO5 to validate or stress-test.
- **DE19 -> IN2**: Apply IN2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires DE19
- [ ] Apply the model using explicit DE19 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit DE19 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de19-critical-path-unwinding"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/de19-critical-path-unwinding
```

### Usage with Commands

```bash
/apply-transformation DE19 "Trace longest sequence of dependent tasks determining minimum project duration"
```

---
*Apply DE19 to create repeatable, explicit mental model reasoning.*
