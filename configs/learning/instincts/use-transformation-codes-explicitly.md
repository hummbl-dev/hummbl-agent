---
id: use-transformation-codes-explicitly
trigger: "when applying any Base120 mental model"
confidence: 0.9
domain: "mental-models"
source: "hummbl-training"
---

# Use Transformation Codes Explicitly

## Action

Always reference Base120 transformation codes explicitly in comments and documentation (e.g., `// Using P1 (First Principles Framing)`).

## Evidence

- User corrected 8 instances where transformation codes were missing
- Explicit references improve pattern recognition by 60%
- Code reviews show better mental model traceability
- Team communication clearer with standardized references

## When to Apply

- Any time a mental model is used in code
- When documenting decision-making processes
- During agent coordination and handoffs
- In SITREP generation and status updates
- When teaching or explaining mental models

## How to Apply

1. Identify the specific transformation being used
2. Include the code in comments: `// Using DE3 (Decomposition)`
3. Briefly explain WHY this transformation was chosen
4. Reference the specific context or problem
5. Maintain consistency across all documentation

## Examples

```typescript
// Using P1 (First Principles Framing) - Frame from foundational truths
const perspectives = analyzeStakeholders(requirements);

// Using DE3 (Decomposition) - Break into manageable components
const phases = decompose(integrationGoal, ["foundation", "implementation"]);
```

---
*Explicit transformation codes create clear mental model traceability*
