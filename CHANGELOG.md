# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- E2E validation pipeline fixes (.js → .cjs extensions)
- TypeScript test file guard (`scripts/lint-no-ts-tests.sh`)
- Test policy enforcement (`.test.mjs` only, no runtime TS loaders)
- CI workflow updated to enforce test policy
- Comprehensive governance documentation (SECURITY.md, ARCHITECTURE.md, GOVERNANCE.md, CONTRIBUTING.md)

### Changed

- Router tests converted to `.test.mjs` format (skipped pending build infrastructure)
- AGENTS.md updated with explicit test policy enforcement section
- GitHub Actions CI workflow updated to match test policy

### Fixed

- Base120 validator script extensions in `scripts/e2e-validate.sh`
- E2E validation pipeline now passes all checks

## Previous Changes

See git log for detailed history before governance documentation was established.
