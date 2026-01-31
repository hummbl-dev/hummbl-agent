# HUMMBL Validation Checklist

Lightweight checklist for verifying Base120 compliance and repo alignment.

## Quick Checklist

- [ ] Transformation codes referenced explicitly (P/IN/CO/DE/RE/SY).
- [ ] Rationale documented for each transformation.
- [ ] SITREP output uses 5 standard sections.
- [ ] Agents and commands referenced in docs exist on disk.
- [ ] Workspace paths use `~/clawd/hummbl-agent`.
- [ ] Tuple gates (`kernel-tuples` workflow) pass:
  - Kernel `tsc --noEmit`
  - Tuple vector verifier (hash + canonical)
  - Tuple linter over `configs/**` + `packages/skills/registry/**` (fixture keeps the path hot until real tuples land; once real tuples exist, set `TUPLES_LINT_STRICT=1` in CI and remove the fixture).

Example code reference:

```
// Using P1 (First Principles Framing) - Reduce to foundational truths
```

## Verify Command Output Conventions

The `/verify-hummbl` command should emit:

```
VERIFICATION RESULT: PASS|WARN|FAIL
Missing transformations: <number>
Documentation mismatches: <number>
Recommendations: <number>
```

If `WARN` or `FAIL`, provide a short list of findings after the summary block.

## Script Usage

```bash
./scripts/verify-hummbl.sh
```

Example output (passing):

```
VERIFICATION RESULT: PASS
Missing transformations: 0
Documentation mismatches: 0
Recommendations: 0
```

Example output (warn):

```
VERIFICATION RESULT: WARN
Missing transformations: 2
Documentation mismatches: 1
Recommendations: 2

Findings:
- Add explicit Base120 codes to documentation where missing.
- Replace legacy paths (/Users/others/hummbl or ~/clawd/hummbl) with hummbl-agent.
```

Example output (fail):

```
VERIFICATION RESULT: FAIL
Missing transformations: 1
Documentation mismatches: 3
Recommendations: 2

Findings:
- Missing file: agents/hummbl-planner.md
- Add explicit Base120 codes to documentation where missing.
- Replace legacy paths (/Users/others/hummbl or ~/clawd/hummbl) with hummbl-agent.
```
