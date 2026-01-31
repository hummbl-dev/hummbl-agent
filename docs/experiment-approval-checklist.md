# Experiment Approval Checklist (applying **IN2** premortem analysis)

## Safety

- [ ] Scope is limited to the experiment directory or a dedicated branch.
- [ ] No vendor/ code is modified.
- [ ] No secrets or network access required.

## Governance

- [ ] Proposal is documented in `PROPOSALS.md`.
- [ ] Decision rationale is logged in `APPROVAL.md`.
- [ ] Kernel/tool contracts unchanged unless a decision note is added.

## Execution

- [ ] Any command execution uses `scripts/run-cmd.sh`.
- [ ] Outputs are logged with hashes.
- [ ] Changes are applied manually after approval.

## Close‑out

- [ ] Outcome recorded in `RUN.md`.
- [ ] Next steps identified.
