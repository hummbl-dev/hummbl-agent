# OpenAI Adapter (v0.1)

Minimal OpenAI adapter for the Responses API.

## Security posture

- No streaming (v0.1)
- No logging of secrets
- Allowed domains enforced (default: api.openai.com)
- One request per invocation

## Usage

```ts
import { OpenAIClient } from "./src/openaiClient";

const client = new OpenAIClient({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const response = await client.createResponse({
  model: "gpt-4.1-mini",
  input: "Hello from HUMMBL",
});

console.log(response.status, response.requestId);
```

## Notes

- Uses `https://api.openai.com/v1/responses`.
- Provide `organizationId` and `projectId` if required by your account.
- Enforce network policy in the runner; this adapter only checks allowed domains.
