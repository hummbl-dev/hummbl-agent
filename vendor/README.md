# VENDOR

## Purpose
Upstream mirrors pinned by commit for reproducible integration.

## Update Procedure
- Use `scripts/sync-upstreams.sh` only.
- Do not edit `vendor/*` directly (except this README and `vendor/UPSTREAM_PINS.md`).
Pins are commit SHAs; branch names are not accepted as pins.

## Add a New Upstream
1. Add the upstream entry to `scripts/sync-upstreams.sh`.
2. Run `./scripts/sync-upstreams.sh init` and execute the printed commands.
3. Record the pin in `vendor/UPSTREAM_PINS.md` (the script will update it).

## No-Edit Rule
No edits inside `vendor/*` except `vendor/README.md` and `vendor/UPSTREAM_PINS.md`.
