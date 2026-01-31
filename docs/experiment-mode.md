# Controlled Recursive Improvement Mode (applying **IN2** premortem and **SY8** systems thinking)

## Purpose

Enable safe, auditable experiments in recursive improvement while preserving human override.

## Core Principles

- **Proposal‑only**: the agent may propose changes, not apply them.
- **Human approval required** before any governance or code changes.
- **Sandboxed scope**: experiments live under `_state/experiments/` and optional feature branches.
- **Auditability**: all proposals, reviews, and approvals are logged.
- **Rate‑limited**: time‑boxed, single‑iteration cycles unless explicitly extended.

## Workflow

1. **Open an experiment run** with `scripts/experiment-run.sh`.
2. **Generate proposals** under `_state/experiments/YYYY-MM-DD/`.
3. **Review and approve** using the approval checklist.
4. **Apply changes manually** (or via standard governed scripts) after approval.
5. **Record outcomes** and close the run.

## What is allowed

- Drafting governance documents or templates.
- Proposing changes in `proposals/` without applying them.
- Running allowlisted read‑only commands if explicitly approved.

## What is not allowed

- Autonomous code changes without review.
- Recursive self‑modification of governance without explicit approval.
- Unscoped changes outside the experiment directory.

## Artifacts

- `RUN.md`: experiment log
- `PROPOSALS.md`: proposed changes
- `APPROVAL.md`: human approval record
