# TEST PLAN

## Deterministic Checks

- registry.json parses as JSON.
- ids are unique and lowercase-with-dashes.
- summaries are <= 140 chars.
- versions match x.y.z.
- inputs/outputs arrays exist for each skill.
- examples length >= 1 for each skill.
- requiredTools.toolId non-empty.
- permissions fields present.
- provenance.createdAt present.
- runnerCompatibility non-empty.
