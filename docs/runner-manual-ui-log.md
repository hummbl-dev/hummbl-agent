# Manual UI Runner Logging (Vendor-Agnostic) (using **P1** framing)

Use this when you run a model via a vendor UI or CLI manually.

## Steps

1. Generate the prompt packet:

   ```bash
   scripts/orchestrate.sh
   ```

2. Paste the prompt into the vendor UI.
3. Save the response to a file under `_state/runs/YYYY-MM-DD/artifacts/`.
4. Hash and log the response:

   ```bash
   packages/runners/<runner>/scripts/log-run.sh "UI response captured" \
     --artifact "_state/runs/YYYY-MM-DD/artifacts/<file>.txt" --hash-file
   ```

## Required metadata (recommended)

- vendor name and model (if available)
- timestamp
- prompt hash (already logged if prompt artifact is hashed)
- response hash
