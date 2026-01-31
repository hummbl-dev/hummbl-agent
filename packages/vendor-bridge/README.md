# Vendor Bridge (Types Only)

Minimal bridge for documenting vendor upstreams and resolving expected paths.

## Scope

- Types only (no runtime guarantees)
- No dependencies
- No direct imports from vendor code

## Contents

- src/vendorPaths.ts: expected vendor paths
- src/mapping.ts: upstream-to-kernel mapping table
- src/index.ts: exports
- docs/UPSTREAM_MAPPING.md: human-readable mapping + rules
