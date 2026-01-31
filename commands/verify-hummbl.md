---
name: verify-hummbl
description: Verify HUMMBL compliance for Base120 usage, documentation, and coordination standards.
parameters:
  - name: target
    type: string
    required: false
    description: File or folder to check (default: current workspace)
  - name: mode
    type: string
    required: false
    description: Verification depth (quick, standard, deep)
---

# Verify HUMMBL Command

Run a structured compliance check for Base120 standards.

## Usage

```bash
/verify-hummbl [target] [mode]
```

## Checks Performed

- Presence of explicit transformation codes (P/IN/CO/DE/RE/SY)
- Rationale documented for mental model choices
- Consistent SITREP format (if applicable)
- Agent handoff notes include transformation references
- Documentation matches current repo structure

Example transformation reference:

```
// Using P1 (First Principles Framing) - Reduce to foundational truths
```

## Example

```bash
/verify-hummbl "docs/workflow-examples.md" "standard"
```

Expected output:

```
VERIFICATION RESULT: PASS
Missing transformations: 0
Documentation mismatches: 0
Recommendations: 1
```

## Conventions

- Output the summary block first.
- If `WARN` or `FAIL`, include a short list of findings after the summary block.
- Keep the findings list under 10 items unless the user requests full detail.
