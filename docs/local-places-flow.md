# Local Places Skill Workflow (using **P1** framing)

This flow covers run server → query → log artifacts.

## 1) Setup + Run the Server

```bash
cd skills/local-places
echo "GOOGLE_PLACES_API_KEY=your-key" > .env
uv venv
uv pip install -e ".[dev]"
uv run --env-file .env uvicorn local_places.main:app --host 127.0.0.1 --port 8000
```

Verify:

```bash
curl http://127.0.0.1:8000/ping
```

## 2) Resolve Location

```bash
curl -X POST http://127.0.0.1:8000/locations/resolve \
  -H "Content-Type: application/json" \
  -d '{"location_text": "Soho, London", "limit": 5}'
```

## 3) Search Places

```bash
curl -X POST http://127.0.0.1:8000/places/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "coffee shop",
    "location_bias": {"lat": 51.5137, "lng": -0.1366, "radius_m": 1000},
    "filters": {"open_now": true, "min_rating": 4.0},
    "limit": 10
  }'
```

## 4) Log Artifacts

Use governed logging to capture responses:

```bash
packages/runners/codex/scripts/log-run.sh "Local Places: resolve" --artifact /path/to/resolve.json --hash-file
packages/runners/codex/scripts/log-run.sh "Local Places: search" --artifact /path/to/search.json --hash-file
```

## Notes

- Skill reference: `skills/local-places/SKILL.md`
- Server reference: `skills/local-places/SERVER_README.md`
- Consider keeping raw responses under `_state/runs/YYYY-MM-DD/artifacts/`.
