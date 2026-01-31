---
name: plan-with-base120
description: Create a phased plan using HUMMBL Base120 transformations with explicit code references and rationale.
parameters:
  - name: context
    type: string
    required: true
    description: Goal or problem context to plan for
  - name: scope
    type: string
    required: false
    description: Scope of the plan (code, architecture, strategy, workflow, etc.)
  - name: constraints
    type: string
    required: false
    description: Known constraints or risks to incorporate
---

# Plan With Base120

Generate a structured plan using Base120 transformations with explicit codes and rationale.

## Usage

```bash
/plan-with-base120 "<CONTEXT>" [scope] [constraints]
```

## Output Requirements

- Use explicit transformation codes in comments (e.g., `// Using DE3 (Decomposition)`).
- Include phases, milestones, dependencies, and risks.
- Provide next steps with clear ownership.

## Example

```bash
/plan-with-base120 "Create the missing HUMMBL agents and commands" "repo-structure"
```

Expected output:

```typescript
// Using P1 (First Principles Framing) - Reduce the planning context to foundations
const framing = {
  technical: "Add missing agents and commands",
  user: "Improve HUMMBL workflow usability",
  system: "Keep repo structure consistent"
};

// Using DE3 (Decomposition) - Phase the work
const phases = [
  "agents",
  "commands",
  "configs_and_docs"
];
```
