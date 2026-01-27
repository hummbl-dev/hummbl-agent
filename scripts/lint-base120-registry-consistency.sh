#!/usr/bin/env bash
set -euo pipefail

# Deprecated shim: Base120 registry consistency checks are enforced by
# scripts/lint-skill-registry.sh.

scripts/lint-skill-registry.sh
