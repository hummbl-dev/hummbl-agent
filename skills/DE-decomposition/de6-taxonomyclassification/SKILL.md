---
name: de6-taxonomyclassification
description: Apply DE6 Taxonomy/Classification to organize entities into hierarchical categories based on shared properties.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de6-taxonomyclassification","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# DE6 Taxonomy/Classification

Apply the DE6 Taxonomy/Classification transformation to organize entities into hierarchical categories based on shared properties.

## What is DE6?

**DE6 (Taxonomy/Classification)** Organize entities into hierarchical categories based on shared properties.

## When to Use DE6

### Ideal Situations

- Break a complex problem into manageable parts
- Separate concerns to isolate risk and effort
- Create modular workstreams for parallel progress

### Trigger Questions

- "How can we use Taxonomy/Classification here?"
- "What changes if we apply DE6 to this breaking down an implementation plan?"
- "Which assumptions does DE6 help us surface?"

## The DE6 Process

### Step 1: Define the focus

```typescript
// Using DE6 (Taxonomy/Classification) - Establish the focus
const focus = "Organize entities into hierarchical categories based on shared properties";
```

### Step 2: Apply the model

```typescript
// Using DE6 (Taxonomy/Classification) - Apply the transformation
const output = applyModel("DE6", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using DE6 (Taxonomy/Classification) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using DE6 (Taxonomy/Classification) - Example in a breaking down an implementation plan
const result = applyModel("DE6", "Organize entities into hierarchical categories based on shared properties" );
```

## Integration with Other Transformations

- **DE6 -> P1**: Pair with P1 when sequencing matters.
- **DE6 -> CO5**: Use CO5 to validate or stress-test.
- **DE6 -> IN2**: Apply IN2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires DE6
- [ ] Apply the model using explicit DE6 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit DE6 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/DE-decomposition/de6-taxonomyclassification"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/de6-taxonomyclassification
```

### Usage with Commands

```bash
/apply-transformation DE6 "Organize entities into hierarchical categories based on shared properties"
```

---
*Apply DE6 to create repeatable, explicit mental model reasoning.*
