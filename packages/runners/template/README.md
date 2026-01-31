# Runner Template

Generic runner scaffold for adding new vendors.

## Usage

```bash
packages/runners/template/scripts/make-prompt.sh > /tmp/vendor-prompt.md
packages/runners/template/scripts/log-run.sh "Session start: vendor" \
  --artifact "_state/runs/YYYY-MM-DD/prompts/vendor-prompt.md" --hash-file
```

## Customize

- Copy this folder to `packages/runners/<vendor>/`.
- Update `prompt.md.template` header and any vendor-specific notes.
- Update `README.md` usage examples.
- Update `CAPABILITIES.json` for the new runner.
