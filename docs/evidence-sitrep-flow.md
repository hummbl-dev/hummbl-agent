# Evidence + SITREP Workflow (using **P1** framing and **DE3** decomposition)

This flow covers capture evidence → lint → generate SITREP.

## 1) Capture Evidence (Canonical)

Import external observations into the governed evidence log:

```bash
scripts/import-observation.sh \
  --file /path/to/observations.jsonl \
  --source "external/observations" \
  --note "imported raw observations"
```

This writes:

- `_state/evidence/YYYY-MM-DD/<timestamp>-<file>`
- `_state/evidence/YYYY-MM-DD/EVIDENCE.md` (hash + source)

## 2) Lint Evidence

```bash
scripts/lint-evidence.sh
scripts/lint-artifact-secrets.sh
```

## 3) Generate SITREP (with lint)

```bash
scripts/generate-sitrep.sh
```

The generator automatically runs `scripts/lint-sitrep.sh` when available.

## Notes

- SITREP schema details: `docs/sitrep-schema.md`
- Evidence import reference: `docs/evidence-import.md`
- Output defaults to `sessions/sitreps` in the hummbl-agent workspace.
