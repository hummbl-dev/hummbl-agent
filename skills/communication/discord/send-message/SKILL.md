# communication.discord.send-message

## Purpose

Send a text message to a Discord channel via a Moltbot adapter.

## Inputs

- `channel_id` (string, required)
- `text` (string, required)

## Tuple Gate

Requires a TupleV1 matching `tuples.json`:

- `capability`: `communication:send`
- `scope.channel`: `discord`
- `scope.target`: `channel_id`

## Notes

Phase 1 ships a stub adapter only; networking calls will be added in later phases.
