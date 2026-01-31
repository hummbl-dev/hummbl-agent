# UPSTREAM_MAPPING

## moltbot

### What we borrow

- Gateway and routing configuration patterns
- Session and coordination idioms

### What we do not borrow

- Runtime code or internal modules

### Integration pattern

- Adapter layer under packages/ wraps inputs/outputs
- Skill layer under packages/ binds domain workflows

## moltbot-registry

### What we borrow

- Registry conventions for skills and metadata

### What we do not borrow

- Registry implementation or distribution code

### Integration pattern

- Adapter layer under packages/ converts kernel types to registry formats
- Skill layer under packages/ references only adapters

## everything-claude-code

### What we borrow

- Claude Code agent/command conventions

### What we do not borrow

- Runtime tooling or plugins

### Integration pattern

- Adapter layer under packages/ binds kernel types to conventions
- Skill layer under packages/ consumes adapters

## Rules

- No copy-paste; prefer wrappers.
- Do not edit vendor code; wrap and pin.
