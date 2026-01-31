---
name: co6-gestalt-integration
description: Apply CO6 Gestalt Integration to perceive and leverage whole patterns rather than isolated components.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/CO-composition/co6-gestalt-integration","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# CO6 Gestalt Integration

Apply the CO6 Gestalt Integration transformation to perceive and leverage whole patterns rather than isolated components.

## What is CO6?

**CO6 (Gestalt Integration)** Perceive and leverage whole patterns rather than isolated components.

## When to Use CO6

### Ideal Situations

- Assemble components into a coherent whole
- Integrate multiple solutions into a unified approach
- Design systems that depend on clear interfaces and seams

### Trigger Questions

- "How can we use Gestalt Integration here?"
- "What changes if we apply CO6 to this integrating two services?"
- "Which assumptions does CO6 help us surface?"

## The CO6 Process

### Step 1: Define the focus

```typescript
// Using CO6 (Gestalt Integration) - Establish the focus
const focus = "Perceive and leverage whole patterns rather than isolated components";
```

### Step 2: Apply the model

```typescript
// Using CO6 (Gestalt Integration) - Apply the transformation
const output = applyModel("CO6", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using CO6 (Gestalt Integration) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using CO6 (Gestalt Integration) - Example in a integrating two services
const result = applyModel("CO6", "Perceive and leverage whole patterns rather than isolated components" );
```

## Integration with Other Transformations

- **CO6 -> DE3**: Pair with DE3 when sequencing matters.
- **CO6 -> SY8**: Use SY8 to validate or stress-test.
- **CO6 -> RE2**: Apply RE2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires CO6
- [ ] Apply the model using explicit CO6 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit CO6 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/CO-composition/co6-gestalt-integration"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/co6-gestalt-integration
```

### Usage with Commands

```bash
/apply-transformation CO6 "Perceive and leverage whole patterns rather than isolated components"
```

---
*Apply CO6 to create repeatable, explicit mental model reasoning.*
