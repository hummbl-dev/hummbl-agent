# AGENTS

Date: 2026-01-26

## Purpose

Define HUMMBL agent coordination protocols for the shared workspace.

## Default Protocols (using **P1** and **DE3**)

- SITREP cadence: hourly
- Escalation triggers: blocker, decision_needed, resource_conflict
- Handoff policy: automatic_agent_handoff

## Agent Roles

- claude-sonnet: lead_strategy
- windsurf-cascade: implementation
- chatgpt-5: product_qa
- cursor: execution_prototyping

## Routing Notes

- mental.model/base120/transformation keywords route to hummbl-architect
- sitrep/status/report/update route to sitrep-generator
- default routes to hummbl-main
