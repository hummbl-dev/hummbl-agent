---
name: re20-recursive-governance-guardrails-that-learn
description: Apply RE20 Recursive Governance (Guardrails that Learn) to establish rules that adapt based on their own effectiveness.
version: 1.0.0
metadata: {"moltbot":{"nix":{"plugin":"github:hummbl-dev/hummbl-agent?dir=skills/RE-recursion/re20-recursive-governance-guardrails-that-learn","systems":["aarch64-darwin","x86_64-linux"]}}}
---

# RE20 Recursive Governance (Guardrails that Learn)

Apply the RE20 Recursive Governance (Guardrails that Learn) transformation to establish rules that adapt based on their own effectiveness.

## What is RE20?

**RE20 (Recursive Governance (Guardrails that Learn))** Establish rules that adapt based on their own effectiveness.

## When to Use RE20

### Ideal Situations

- Iterate toward a better solution using feedback loops
- Refine a process through repeated cycles
- Scale a pattern through repetition and standardization

### Trigger Questions

- "How can we use Recursive Governance (Guardrails that Learn) here?"
- "What changes if we apply RE20 to this iterating a workflow over several cycles?"
- "Which assumptions does RE20 help us surface?"

## The RE20 Process

### Step 1: Define the focus

```typescript
// Using RE20 (Recursive Governance (Guardrails that Learn)) - Establish the focus
const focus = "Establish rules that adapt based on their own effectiveness";
```

### Step 2: Apply the model

```typescript
// Using RE20 (Recursive Governance (Guardrails that Learn)) - Apply the transformation
const output = applyModel("RE20", focus);
```

### Step 3: Synthesize outcomes

```typescript
// Using RE20 (Recursive Governance (Guardrails that Learn)) - Capture insights and decisions
const insights = summarize(output);
```

## Practical Example

```typescript
// Using RE20 (Recursive Governance (Guardrails that Learn)) - Example in a iterating a workflow over several cycles
const result = applyModel("RE20", "Establish rules that adapt based on their own effectiveness" );
```

## Integration with Other Transformations

- **RE20 -> CO5**: Pair with CO5 when sequencing matters.
- **RE20 -> SY8**: Use SY8 to validate or stress-test.
- **RE20 -> IN3**: Apply IN3 to compose the output.

## Implementation Checklist

- [ ] Identify the context that requires RE20
- [ ] Apply the model using explicit RE20 references
- [ ] Document assumptions and outputs
- [ ] Confirm alignment with stakeholders or owners

## Common Pitfalls

- Treating the model as a checklist instead of a lens
- Skipping documentation of assumptions or rationale
- Over-applying the model without validating impact

## Best Practices

- Use explicit RE20 references in comments and docs
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
    { source = "github:hummbl-dev/hummbl-agent?dir=skills/RE-recursion/re20-recursive-governance-guardrails-that-learn"; }
  ];
}
```

### Manual Installation

```bash
moltbot-registry install hummbl-agent/re20-recursive-governance-guardrails-that-learn
```

### Usage with Commands

```bash
/apply-transformation RE20 "Establish rules that adapt based on their own effectiveness"
```

---
*Apply RE20 to create repeatable, explicit mental model reasoning.*
