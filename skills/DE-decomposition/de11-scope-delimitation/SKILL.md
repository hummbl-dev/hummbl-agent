---
name: de11-scope-delimitation
description: Apply DE11 Scope Delimitation to define precise boundaries of what is included versus excluded from consideration.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de11-scope-delimitation","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# DE11 Scope Delimitation

Apply the DE11 Scope Delimitation transformation to define precise boundaries of what is included versus excluded from consideration.

## What is DE11?

**DE11 (Scope Delimitation)** Define precise boundaries of what is included versus excluded from consideration.

## When to Use DE11

### Ideal Situations

- Break a complex problem into manageable parts
- Separate concerns to isolate risk and effort
- Create modular workstreams for parallel progress

### Trigger Questions

- "How can we use Scope Delimitation here?"
- "What changes if we apply DE11 to this breaking down an implementation plan?"
- "Which assumptions does DE11 help us surface?"

## The DE11 Process

### Step 1: Define the focus

```typescript
// Using DE11 (Scope Delimitation) - Establish the focus
const focus = "Define precise boundaries of what is included versus excluded from consideration";
```

### Step 2: Apply the model

```typescript
// Using DE11 (Scope Delimitation) - Apply the transformation
const output = applyModel("DE11", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using DE11 (Scope Delimitation) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using DE11 (Scope Delimitation) - Example in a breaking down an implementation plan
const result = applyModel("DE11", "Define precise boundaries of what is included versus excluded from consideration" );
```

## Integration with Other Transformations

- **DE11 -> P1**: Pair with P1 when sequencing matters.
- **DE11 -> CO5**: Use CO5 to validate or stress-test.
- **DE11 -> IN2**: Apply IN2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires DE11
- [ ] Apply the model using explicit DE11 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit DE11 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de11-scope-delimitation"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/de11-scope-delimitation
```

### Usage with Commands

```bash
/apply-transformation DE11 "Define precise boundaries of what is included versus excluded from consideration"
```

---
*Apply DE11 to create repeatable, explicit mental model reasoning.*
