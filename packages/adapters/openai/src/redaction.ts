export const redactSecret = (value: string, secret: string): string => {
  if (!secret) return value;
  return value.split(secret).join("[REDACTED]");
};

export const scrubHeaders = (
  headers: Record<string, string | string[] | undefined>
): Record<string, string> => {
  const cleaned: Record<string, string> = {};
  for (const [key, val] of Object.entries(headers)) {
    if (!val) continue;
    const lower = key.toLowerCase();
    if (lower === "authorization") continue;
    cleaned[key] = Array.isArray(val) ? val.join(", ") : val;
  }
  return cleaned;
};
