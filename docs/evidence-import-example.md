# Evidence Import Example (using **P1** framing)

## Example file

- `_state/evidence/evidence-example.md`

## Import command

```bash
scripts/generate-sitrep.sh --import _state/evidence/evidence-example.md \
  --source "local/evidence-example" --note "example evidence import"
```

## Expected

- Evidence is copied under `_state/evidence/YYYY-MM-DD/`.
- Hash + provenance recorded in `EVIDENCE.md`.
- SITREP includes a canonical evidence section.
