---
name: co1-synergy-principle
description: Apply CO1 Synergy Principle to design combinations where integrated value exceeds sum of parts.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/CO-composition/co1-synergy-principle","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# CO1 Synergy Principle

Apply the CO1 Synergy Principle transformation to design combinations where integrated value exceeds sum of parts.

## What is CO1?

**CO1 (Synergy Principle)** Design combinations where integrated value exceeds sum of parts.

## When to Use CO1

### Ideal Situations

- Assemble components into a coherent whole
- Integrate multiple solutions into a unified approach
- Design systems that depend on clear interfaces and seams

### Trigger Questions

- "How can we use Synergy Principle here?"
- "What changes if we apply CO1 to this integrating two services?"
- "Which assumptions does CO1 help us surface?"

## The CO1 Process

### Step 1: Define the focus

```typescript
// Using CO1 (Synergy Principle) - Establish the focus
const focus = "Design combinations where integrated value exceeds sum of parts";
```

### Step 2: Apply the model

```typescript
// Using CO1 (Synergy Principle) - Apply the transformation
const output = applyModel("CO1", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using CO1 (Synergy Principle) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using CO1 (Synergy Principle) - Example in a integrating two services
const result = applyModel("CO1", "Design combinations where integrated value exceeds sum of parts" );
```

## Integration with Other Transformations

- **CO1 -> DE3**: Pair with DE3 when sequencing matters.
- **CO1 -> SY8**: Use SY8 to validate or stress-test.
- **CO1 -> RE2**: Apply RE2 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires CO1
- [ ] Apply the model using explicit CO1 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit CO1 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/CO-composition/co1-synergy-principle"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/co1-synergy-principle
```

### Usage with Commands

```bash
/apply-transformation CO1 "Design combinations where integrated value exceeds sum of parts"
```

---
*Apply CO1 to create repeatable, explicit mental model reasoning.*
