---
name: in20-antigoals-and-anti-patterns-catalog
description: Apply IN20 Antigoals & Anti-Patterns Catalog to document failure modes to avoid rather than success patterns to emulate.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in20-antigoals-and-anti-patterns-catalog","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN20 Antigoals & Anti-Patterns Catalog

Apply the IN20 Antigoals & Anti-Patterns Catalog transformation to document failure modes to avoid rather than success patterns to emulate.

## What is IN20?

**IN20 (Antigoals & Anti-Patterns Catalog)** Document failure modes to avoid rather than success patterns to emulate.

## When to Use IN20

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Antigoals & Anti-Patterns Catalog here?"
- "What changes if we apply IN20 to this risk assessment for a launch?"
- "Which assumptions does IN20 help us surface?"

## The IN20 Process

### Step 1: Define the focus

```typescript
// Using IN20 (Antigoals & Anti-Patterns Catalog) - Establish the focus
const focus = "Document failure modes to avoid rather than success patterns to emulate";
```

### Step 2: Apply the model

```typescript
// Using IN20 (Antigoals & Anti-Patterns Catalog) - Apply the transformation
const output = applyModel("IN20", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN20 (Antigoals & Anti-Patterns Catalog) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN20 (Antigoals & Anti-Patterns Catalog) - Example in a risk assessment for a launch
const result = applyModel("IN20", "Document failure modes to avoid rather than success patterns to emulate" );
```

## Integration with Other Transformations

- **IN20 -> P1**: Pair with P1 when sequencing matters.
- **IN20 -> DE3**: Use DE3 to validate or stress-test.
- **IN20 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN20
- [ ] Apply the model using explicit IN20 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN20 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in20-antigoals-and-anti-patterns-catalog"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in20-antigoals-and-anti-patterns-catalog
```

### Usage with Commands

```bash
/apply-transformation IN20 "Document failure modes to avoid rather than success patterns to emulate"
```

---
*Apply IN20 to create repeatable, explicit mental model reasoning.*
