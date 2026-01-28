import type { VendorName } from "./vendorPaths";

export type UpstreamMapping = {
  upstream: VendorName;
  provides: string[];
  kernelConcepts: string[];
  usagePolicy: "wrap, do not edit";
  knownRisks: string[];
};

export const UPSTREAM_MAPPINGS: UpstreamMapping[] = [
  {
    upstream: "moltbot",
    provides: ["gateway", "multi-agent routing", "sessions"],
    kernelConcepts: ["Runner", "Tool", "RunState"],
    usagePolicy: "wrap, do not edit",
    knownRisks: ["API drift", "config divergence"],
  },
  {
    upstream: "moltbot-registry",
    provides: ["skills registry", "distribution"],
    kernelConcepts: ["Tool", "Memory"],
    usagePolicy: "wrap, do not edit",
    knownRisks: ["licensing", "schema changes"],
  },
  {
    upstream: "everything-claude-code",
    provides: ["Claude Code conventions", "agent/command patterns"],
    kernelConcepts: ["Agent", "Task", "Runner"],
    usagePolicy: "wrap, do not edit",
    knownRisks: ["behavioral drift", "conflicting abstractions"],
  },
];
