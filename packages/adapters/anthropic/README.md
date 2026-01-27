# Anthropic Adapter (v0.1)

Minimal Anthropic Messages API adapter.

## Security posture

- No streaming (v0.1)
- No logging of secrets
- Allowed domains enforced (default: api.anthropic.com)
- One request per invocation

## Usage

```ts
import { AnthropicClient } from "./src/anthropicClient";

const client = new AnthropicClient({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const response = await client.createMessage({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 256,
  messages: [{ role: "user", content: "Hello from HUMMBL" }],
});

console.log(response.status, response.requestId);
```

## Notes

- Uses `https://api.anthropic.com/v1/messages`.
- Provide `anthropicVersion` if required by your account.
- Enforce network policy in the runner; this adapter only checks allowed domains.
