# Experiment Run Walkthrough (applying **P1** framing and **DE3** decomposition)

## 1) Open an experiment run

```bash
scripts/experiment-run.sh
```

This creates:

- `_state/experiments/YYYY-MM-DD/RUN.md`
- `_state/experiments/YYYY-MM-DD/PROPOSALS.md`
- `_state/experiments/YYYY-MM-DD/APPROVAL.md`

## 2) Draft a proposal

Edit:

```
_state/experiments/YYYY-MM-DD/PROPOSALS.md
```

Add a short proposal, for example:

```
## Proposed Changes
- Add a lint check ensuring router outputs include policyChecks.
```

## 3) Review + approve

Use the checklist:

```
docs/experiment-approval-checklist.md
```

Then update:

```
_state/experiments/YYYY-MM-DD/APPROVAL.md
```

Set:

```
Status: APPROVED
```

## 4) Apply changes (manual)

Once approved, apply changes using normal workflows:

- For code changes: edit + commit.
- For execution: use `scripts/run-cmd.sh` for governed commands.

## 5) Record outcome

Update:

```
_state/experiments/YYYY-MM-DD/RUN.md
```

Add a short outcome summary and next steps.
