# TEST PLAN

## Deterministic Checks

- Verify all files in src/ are type-only (no runtime side effects).
- Validate every entity type includes id and provenance via EntityMeta.
- Confirm RunState fields map to CURRENT_STATE headings.
- Confirm MemoryNote includes tags, hummblModelCodes, confidence, and source provenance.
- Confirm Runner includes allowedTools permissions and Tool declares capabilities.
- Detect schema drift by comparing exported types to a baseline snapshot.
- Verify memory consolidation determinism via stable globalHash rules.
- Enforce RunState mirror invariants against _state/CURRENT_STATE.md.
