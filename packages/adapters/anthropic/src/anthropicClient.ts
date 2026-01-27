import https from "https";
import { URL } from "url";
import type {
  AnthropicClientConfig,
  AnthropicMessageRequest,
  AnthropicResponse,
} from "./types";
import { scrubHeaders } from "./redaction";

const DEFAULT_BASE_URL = "https://api.anthropic.com/v1/";
const DEFAULT_TIMEOUT_MS = 60_000;
const DEFAULT_MAX_RESPONSE_BYTES = 1_048_576;
const DEFAULT_ALLOWED_DOMAINS = ["api.anthropic.com"];
const DEFAULT_ANTHROPIC_VERSION = "2023-06-01";

export class AnthropicError extends Error {
  status: number;
  requestId?: string;
  body?: string;
  constructor(message: string, status: number, requestId?: string, body?: string) {
    super(message);
    this.name = "AnthropicError";
    this.status = status;
    this.requestId = requestId;
    this.body = body;
  }
}

export class AnthropicClient {
  private config: AnthropicClientConfig;

  constructor(config: AnthropicClientConfig) {
    if (!config || !config.apiKey) {
      throw new Error("AnthropicClient requires apiKey");
    }
    this.config = config;
  }

  async createMessage<T = unknown>(
    request: AnthropicMessageRequest
  ): Promise<AnthropicResponse<T>> {
    if (!request || !request.model || !request.messages || !request.max_tokens) {
      throw new Error("AnthropicMessageRequest requires model, messages, max_tokens");
    }
    if ((request as { stream?: boolean }).stream) {
      throw new Error("Streaming responses are not supported in v0.1");
    }

    const baseUrl = this.config.baseUrl ?? DEFAULT_BASE_URL;
    const url = new URL("messages", baseUrl);
    this.assertAllowedDomain(url.hostname);

    const body = JSON.stringify(request);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body).toString(),
      "x-api-key": this.config.apiKey,
      "anthropic-version": this.config.anthropicVersion ?? DEFAULT_ANTHROPIC_VERSION,
    };

    const timeoutMs = this.config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const maxResponseBytes =
      this.config.maxResponseBytes ?? DEFAULT_MAX_RESPONSE_BYTES;

    return await new Promise<AnthropicResponse<T>>((resolve, reject) => {
      const req = https.request(
        {
          method: "POST",
          hostname: url.hostname,
          port: url.port || 443,
          path: url.pathname,
          headers,
        },
        (res) => {
          const chunks: Buffer[] = [];
          let total = 0;
          const requestId = res.headers["request-id"]
            ? String(res.headers["request-id"])
            : undefined;

          res.on("data", (chunk) => {
            const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
            total += buf.length;
            if (total > maxResponseBytes) {
              req.destroy();
              reject(
                new AnthropicError(
                  "Response exceeded maxResponseBytes",
                  res.statusCode || 0,
                  requestId
                )
              );
              return;
            }
            chunks.push(buf);
          });

          res.on("end", () => {
            const raw = Buffer.concat(chunks).toString("utf8");
            const status = res.statusCode || 0;
            const responseHeaders = scrubHeaders(res.headers);

            if (status < 200 || status >= 300) {
              reject(
                new AnthropicError(
                  `Anthropic API error (${status})`,
                  status,
                  requestId,
                  raw
                )
              );
              return;
            }

            let data: T;
            try {
              data = JSON.parse(raw) as T;
            } catch (err) {
              reject(
                new AnthropicError(
                  "Anthropic response was not valid JSON",
                  status,
                  requestId,
                  raw
                )
              );
              return;
            }

            resolve({
              status,
              headers: responseHeaders,
              requestId,
              data,
            });
          });
        }
      );

      req.on("error", (err) => {
        reject(err);
      });

      req.setTimeout(timeoutMs, () => {
        req.destroy(new Error("Anthropic request timed out"));
      });

      req.write(body);
      req.end();
    });
  }

  private assertAllowedDomain(hostname: string): void {
    const allowed = this.config.allowedDomains ?? DEFAULT_ALLOWED_DOMAINS;
    if (!allowed.includes(hostname)) {
      throw new Error(`AnthropicClient blocked domain: ${hostname}`);
    }
  }
}
