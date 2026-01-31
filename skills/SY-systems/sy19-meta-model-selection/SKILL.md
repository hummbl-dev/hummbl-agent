---
name: sy19-meta-model-selection
description: Apply SY19 Meta-Model Selection to choose appropriate framework or tool for specific problem characteristics.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/SY-systems/sy19-meta-model-selection","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# SY19 Meta-Model Selection

Apply the SY19 Meta-Model Selection transformation to choose appropriate framework or tool for specific problem characteristics.

## What is SY19?

**SY19 (Meta-Model Selection)** Choose appropriate framework or tool for specific problem characteristics.

## When to Use SY19

### Ideal Situations

- Understand system-wide interactions and feedback loops
- Detect patterns that emerge across components
- Optimize for long-term system behavior, not just local gains

### Trigger Questions

- "How can we use Meta-Model Selection here?"
- "What changes if we apply SY19 to this analyzing coordination patterns across teams?"
- "Which assumptions does SY19 help us surface?"

## The SY19 Process

### Step 1: Define the focus

```typescript
// Using SY19 (Meta-Model Selection) - Establish the focus
const focus = "Choose appropriate framework or tool for specific problem characteristics";
```

### Step 2: Apply the model

```typescript
// Using SY19 (Meta-Model Selection) - Apply the transformation
const output = applyModel("SY19", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using SY19 (Meta-Model Selection) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using SY19 (Meta-Model Selection) - Example in a analyzing coordination patterns across teams
const result = applyModel("SY19", "Choose appropriate framework or tool for specific problem characteristics" );
```

## Integration with Other Transformations

- **SY19 -> P1**: Pair with P1 when sequencing matters.
- **SY19 -> DE3**: Use DE3 to validate or stress-test.
- **SY19 -> IN2**: Apply IN2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires SY19
- [ ] Apply the model using explicit SY19 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit SY19 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/SY-systems/sy19-meta-model-selection"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/sy19-meta-model-selection
```

### Usage with Commands

```bash
/apply-transformation SY19 "Choose appropriate framework or tool for specific problem characteristics"
```

---
*Apply SY19 to create repeatable, explicit mental model reasoning.*
