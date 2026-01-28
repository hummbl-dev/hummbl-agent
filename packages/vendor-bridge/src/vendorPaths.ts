export type VendorName = "moltbot" | "moltbot-registry" | "everything-claude-code";

export const VENDOR_ROOT = "vendor" as const;

export const VENDOR_PATHS: Record<VendorName, string> = {
  moltbot: "vendor/moltbot",
  moltbot-registry: "vendor/moltbot-registry",
  "everything-claude-code": "vendor/everything-claude-code",
};

export const vendorPath = (name: VendorName): string => VENDOR_PATHS[name];

// Existence checks are runner responsibility (types-only package).
