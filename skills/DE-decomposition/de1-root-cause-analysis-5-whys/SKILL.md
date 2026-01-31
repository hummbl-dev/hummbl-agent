---
name: de1-root-cause-analysis-5-whys
description: Apply DE1 Root Cause Analysis (5 Whys) to iteratively ask why problems occur until fundamental cause emerges.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de1-root-cause-analysis-5-whys","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# DE1 Root Cause Analysis (5 Whys)

Apply the DE1 Root Cause Analysis (5 Whys) transformation to iteratively ask why problems occur until fundamental cause emerges.

## What is DE1?

**DE1 (Root Cause Analysis (5 Whys))** Iteratively ask why problems occur until fundamental cause emerges.

## When to Use DE1

### Ideal Situations

- Break a complex problem into manageable parts
- Separate concerns to isolate risk and effort
- Create modular workstreams for parallel progress

### Trigger Questions

- "How can we use Root Cause Analysis (5 Whys) here?"
- "What changes if we apply DE1 to this breaking down an implementation plan?"
- "Which assumptions does DE1 help us surface?"

## The DE1 Process

### Step 1: Define the focus

```typescript
// Using DE1 (Root Cause Analysis (5 Whys)) - Establish the focus
const focus = "Iteratively ask why problems occur until fundamental cause emerges";
```

### Step 2: Apply the model

```typescript
// Using DE1 (Root Cause Analysis (5 Whys)) - Apply the transformation
const output = applyModel("DE1", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using DE1 (Root Cause Analysis (5 Whys)) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using DE1 (Root Cause Analysis (5 Whys)) - Example in a breaking down an implementation plan
const result = applyModel("DE1", "Iteratively ask why problems occur until fundamental cause emerges" );
```

## Integration with Other Transformations

- **DE1 -> P1**: Pair with P1 when sequencing matters.
- **DE1 -> CO5**: Use CO5 to validate or stress-test.
- **DE1 -> IN2**: Apply IN2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires DE1
- [ ] Apply the model using explicit DE1 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit DE1 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de1-root-cause-analysis-5-whys"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/de1-root-cause-analysis-5-whys
```

### Usage with Commands

```bash
/apply-transformation DE1 "Iteratively ask why problems occur until fundamental cause emerges"
```

---
*Apply DE1 to create repeatable, explicit mental model reasoning.*
