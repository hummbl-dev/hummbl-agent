export type AnthropicMessage = {
  role: "user" | "assistant";
  content: string | Array<{ type: string; text?: string }>;
  [key: string]: unknown;
};

export type AnthropicMessageRequest = {
  model: string;
  max_tokens: number;
  messages: AnthropicMessage[];
  system?: string | Array<{ type: string; text: string }>;
  stream?: false;
  [key: string]: unknown;
};

export type AnthropicClientConfig = {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  maxResponseBytes?: number;
  allowedDomains?: string[];
  anthropicVersion?: string;
};

export type AnthropicResponse<T = unknown> = {
  status: number;
  headers: Record<string, string>;
  requestId?: string;
  data: T;
};
