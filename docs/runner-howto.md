# Add a Vendor Runner (How‑To) (using **P1** framing and **DE3** decomposition)

## Example: `acme-ai`

### 1) Copy the template

```bash
cp -R packages/runners/template packages/runners/acme-ai
```

### 2) Update the prompt template header

Edit `packages/runners/acme-ai/prompt.md.template` and set the first line to:

```
# HUMMBL Runner Packet — ACME-AI
```

### 3) Update the README usage examples

Edit `packages/runners/acme-ai/README.md` and replace “template/vendor” with “acme-ai”.

### 4) Update the capabilities manifest

Edit `packages/runners/acme-ai/CAPABILITIES.json` with the correct runner id and mode.

### 5) (Optional) Add runner compatibility in the skill registry

Update relevant skills in `packages/skills/registry/src/registry.json`:

```json
"runnerCompatibility": ["claude-code", "codex", "acme-ai"]
```

### 6) Generate prompts and log runs

```bash
packages/runners/acme-ai/scripts/make-prompt.sh > /tmp/acme-ai-prompt.md

packages/runners/acme-ai/scripts/log-run.sh "Session start: acme-ai" \
  --artifact "_state/runs/YYYY-MM-DD/prompts/acme-ai-prompt.md" --hash-file
```

## Notes

- No vendor runtime code is required; runners only define prompt/log handling.
- The router and registry remain the single source of truth for compatibility.
