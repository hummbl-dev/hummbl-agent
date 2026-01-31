---
name: de16-hypothesis-disaggregation
description: Apply DE16 Hypothesis Disaggregation to break compound claim into testable sub-hypotheses.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de16-hypothesis-disaggregation","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# DE16 Hypothesis Disaggregation

Apply the DE16 Hypothesis Disaggregation transformation to break compound claim into testable sub-hypotheses.

## What is DE16?

**DE16 (Hypothesis Disaggregation)** Break compound claim into testable sub-hypotheses.

## When to Use DE16

### Ideal Situations

- Break a complex problem into manageable parts
- Separate concerns to isolate risk and effort
- Create modular workstreams for parallel progress

### Trigger Questions

- "How can we use Hypothesis Disaggregation here?"
- "What changes if we apply DE16 to this breaking down an implementation plan?"
- "Which assumptions does DE16 help us surface?"

## The DE16 Process

### Step 1: Define the focus

```typescript
// Using DE16 (Hypothesis Disaggregation) - Establish the focus
const focus = "Break compound claim into testable sub-hypotheses";
```

### Step 2: Apply the model

```typescript
// Using DE16 (Hypothesis Disaggregation) - Apply the transformation
const output = applyModel("DE16", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using DE16 (Hypothesis Disaggregation) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using DE16 (Hypothesis Disaggregation) - Example in a breaking down an implementation plan
const result = applyModel("DE16", "Break compound claim into testable sub-hypotheses" );
```

## Integration with Other Transformations

- **DE16 -> P1**: Pair with P1 when sequencing matters.
- **DE16 -> CO5**: Use CO5 to validate or stress-test.
- **DE16 -> IN2**: Apply IN2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires DE16
- [ ] Apply the model using explicit DE16 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit DE16 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de16-hypothesis-disaggregation"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/de16-hypothesis-disaggregation
```

### Usage with Commands

```bash
/apply-transformation DE16 "Break compound claim into testable sub-hypotheses"
```

---
*Apply DE16 to create repeatable, explicit mental model reasoning.*
