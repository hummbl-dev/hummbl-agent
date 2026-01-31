---
name: in18-kill-criteria-and-stop-rules
description: Apply IN18 Kill-Criteria & Stop Rules to define conditions that trigger project termination before launch.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in18-kill-criteria-and-stop-rules","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# IN18 Kill-Criteria & Stop Rules

Apply the IN18 Kill-Criteria & Stop Rules transformation to define conditions that trigger project termination before launch.

## What is IN18?

**IN18 (Kill-Criteria & Stop Rules)** Define conditions that trigger project termination before launch.

## When to Use IN18

### Ideal Situations

- Stress-test a plan by reversing assumptions
- Identify risks by imagining failure states
- Simplify outcomes by removing unnecessary elements

### Trigger Questions

- "How can we use Kill-Criteria & Stop Rules here?"
- "What changes if we apply IN18 to this risk assessment for a launch?"
- "Which assumptions does IN18 help us surface?"

## The IN18 Process

### Step 1: Define the focus

```typescript
// Using IN18 (Kill-Criteria & Stop Rules) - Establish the focus
const focus = "Define conditions that trigger project termination before launch";
```

### Step 2: Apply the model

```typescript
// Using IN18 (Kill-Criteria & Stop Rules) - Apply the transformation
const output = applyModel("IN18", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using IN18 (Kill-Criteria & Stop Rules) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using IN18 (Kill-Criteria & Stop Rules) - Example in a risk assessment for a launch
const result = applyModel("IN18", "Define conditions that trigger project termination before launch" );
```

## Integration with Other Transformations

- **IN18 -> P1**: Pair with P1 when sequencing matters.
- **IN18 -> DE3**: Use DE3 to validate or stress-test.
- **IN18 -> SY8**: Apply SY8 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires IN18
- [ ] Apply the model using explicit IN18 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit IN18 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/IN-inversion/in18-kill-criteria-and-stop-rules"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/in18-kill-criteria-and-stop-rules
```

### Usage with Commands

```bash
/apply-transformation IN18 "Define conditions that trigger project termination before launch"
```

---
*Apply IN18 to create repeatable, explicit mental model reasoning.*
