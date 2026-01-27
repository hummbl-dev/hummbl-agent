# TEST PLAN

- Reject missing apiKey
- Reject stream=true requests
- Reject non-allowlisted baseUrl domain
- Successful response parsing
- Enforce maxResponseBytes
- Error response returns AnthropicError with status + requestId
