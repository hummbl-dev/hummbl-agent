# Governed Observation Import (using **P1** framing)

Use this to bring external observations into a canonical, hashed evidence log.

## Usage

```bash
scripts/import-observation.sh --file /path/to/observations.jsonl --source "external/observations" --note "imported raw observations"
```

## Output

- Copies the file under `_state/evidence/YYYY-MM-DD/`
- Records a hash + source in `EVIDENCE.md`

## Notes

- This is a one-way import; it does not modify the source file.
- Keep evidence small and explicit; large raw data should be referenced by hash only.
