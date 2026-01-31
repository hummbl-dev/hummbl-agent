---
name: de13-failure-mode-analysis-fmea
description: Apply DE13 Failure Mode Analysis (FMEA) to enumerate potential failure points with severity, likelihood, and detectability ratings.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de13-failure-mode-analysis-fmea","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# DE13 Failure Mode Analysis (FMEA)

Apply the DE13 Failure Mode Analysis (FMEA) transformation to enumerate potential failure points with severity, likelihood, and detectability ratings.

## What is DE13?

**DE13 (Failure Mode Analysis (FMEA))** Enumerate potential failure points with severity, likelihood, and detectability ratings.

## When to Use DE13

### Ideal Situations

- Break a complex problem into manageable parts
- Separate concerns to isolate risk and effort
- Create modular workstreams for parallel progress

### Trigger Questions

- "How can we use Failure Mode Analysis (FMEA) here?"
- "What changes if we apply DE13 to this breaking down an implementation plan?"
- "Which assumptions does DE13 help us surface?"

## The DE13 Process

### Step 1: Define the focus

```typescript
// Using DE13 (Failure Mode Analysis (FMEA)) - Establish the focus
const focus = "Enumerate potential failure points with severity, likelihood, and detectability ratings";
```

### Step 2: Apply the model

```typescript
// Using DE13 (Failure Mode Analysis (FMEA)) - Apply the transformation
const output = applyModel("DE13", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using DE13 (Failure Mode Analysis (FMEA)) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using DE13 (Failure Mode Analysis (FMEA)) - Example in a breaking down an implementation plan
const result = applyModel("DE13", "Enumerate potential failure points with severity, likelihood, and detectability ratings" );
```

## Integration with Other Transformations

- **DE13 -> P1**: Pair with P1 when sequencing matters.
- **DE13 -> CO5**: Use CO5 to validate or stress-test.
- **DE13 -> IN2**: Apply IN2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires DE13
- [ ] Apply the model using explicit DE13 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit DE13 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de13-failure-mode-analysis-fmea"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/de13-failure-mode-analysis-fmea
```

### Usage with Commands

```bash
/apply-transformation DE13 "Enumerate potential failure points with severity, likelihood, and detectability ratings"
```

---
*Apply DE13 to create repeatable, explicit mental model reasoning.*
