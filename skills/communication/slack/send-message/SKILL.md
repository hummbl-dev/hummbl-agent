# communication.slack.send-message

## Purpose

Send a text message to a Slack channel (or DM) via a Moltbot adapter.

## Inputs

- `channel_id` (string, required)
- `text` (string, required)
- `thread_ts` (string, optional)

## Tuple Gate

Requires a TupleV1 matching `tuples.json`:

- `capability`: `communication:send`
- `scope.channel`: `slack`
- `scope.target`: `channel_id`

## Notes

Phase 1 ships a stub adapter that validates inputs and returns a placeholder result. Networking hooks are intentionally omitted.
