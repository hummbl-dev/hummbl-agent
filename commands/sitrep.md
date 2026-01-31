---
name: sitrep
description: Generate a HUMMBL SITREP with Base120 mental model tracking and coordination insights.
parameters:
  - name: project
    type: string
    required: true
    description: Project name for the SITREP header
  - name: phase
    type: string
    required: false
    description: Project phase or milestone
  - name: classification
    type: string
    required: false
    description: Classification label (e.g., UNCLASSIFIED)
---

# SITREP Command

Generate a standardized Situation Report with Base120 mental model references and coordination tracking.

## Usage

```bash
/sitrep "<PROJECT>" [phase] [classification]
```

## Required Sections

1. **Situation** (P1)
2. **Intelligence** (SY8)
3. **Operations** (DE3)
4. **Assessment** (IN2)
5. **Recommendations** (CO5)

## Example

```bash
/sitrep "HUMMBL-Agent" "Foundation" "UNCLASSIFIED"
```

Expected output:

```
SITREP-1: HUMMBL-Agent - Foundation | UNCLASSIFIED | 20260126-1500Z | HUMMBL-LEAD | 5 sections
```
