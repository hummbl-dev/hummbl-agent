---
name: p11-role-perspective-taking
description: Apply P11 Role Perspective-Taking to temporarily inhabit specific roles to understand constraints and priorities.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p11-role-perspective-taking","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# P11 Role Perspective-Taking

Apply the P11 Role Perspective-Taking transformation to temporarily inhabit specific roles to understand constraints and priorities.

## What is P11?

**P11 (Role Perspective-Taking)** Temporarily inhabit specific roles to understand constraints and priorities.

## When to Use P11

### Ideal Situations

- Reframe a problem to uncover hidden assumptions or perspectives
- Align stakeholders around a shared understanding
- Clarify scope before choosing a solution path

### Trigger Questions

- "How can we use Role Perspective-Taking here?"
- "What changes if we apply P11 to this product requirements review?"
- "Which assumptions does P11 help us surface?"

## The P11 Process

### Step 1: Define the focus

```typescript
// Using P11 (Role Perspective-Taking) - Establish the focus
const focus = "Temporarily inhabit specific roles to understand constraints and priorities";
```

### Step 2: Apply the model

```typescript
// Using P11 (Role Perspective-Taking) - Apply the transformation
const output = applyModel("P11", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using P11 (Role Perspective-Taking) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using P11 (Role Perspective-Taking) - Example in a product requirements review
const result = applyModel("P11", "Temporarily inhabit specific roles to understand constraints and priorities" );
```

## Integration with Other Transformations

- **P11 -> DE3**: Pair with DE3 when sequencing matters.
- **P11 -> IN2**: Use IN2 to validate or stress-test.
- **P11 -> CO5**: Apply CO5 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires P11
- [ ] Apply the model using explicit P11 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit P11 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/P-perspective/p11-role-perspective-taking"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/p11-role-perspective-taking
```

### Usage with Commands

```bash
/apply-transformation P11 "Temporarily inhabit specific roles to understand constraints and priorities"
```

---
*Apply P11 to create repeatable, explicit mental model reasoning.*
