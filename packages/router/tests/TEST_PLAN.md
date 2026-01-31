# TEST PLAN

## Deterministic Checks

- Tie-breaker: equal scores choose lexicographically smaller skillId.
- Policy deny returns POLICY_DENY with alternatives populated.
- NO_SKILL_MATCH when skills list is empty.
- NO_RUNNER_AVAILABLE when no runner overlaps skill compatibility.
- Permission ordering: none < restricted < open; exec none < allowlisted.
- Capabilities-aware selection requires runner capabilities to satisfy skill network/exec.
