export type OpenAIInputItem = {
  role: "system" | "developer" | "user" | "assistant";
  content: string | Array<{ type: string; text?: string; image_url?: string }>;
  [key: string]: unknown;
};

export type OpenAIResponseRequest = {
  model: string;
  input: string | OpenAIInputItem[];
  stream?: false;
  [key: string]: unknown;
};

export type OpenAIClientConfig = {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  maxResponseBytes?: number;
  allowedDomains?: string[];
  organizationId?: string;
  projectId?: string;
};

export type OpenAIResponse<T = unknown> = {
  status: number;
  headers: Record<string, string>;
  requestId?: string;
  data: T;
};
