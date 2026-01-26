import type { EntityMeta, Provenance, SHA256 } from "./types";

export type MemoryNoteTag =
  | "preference"
  | "constraint"
  | "fact"
  | "policy"
  | "workflow";

export type MemoryNote = EntityMeta & {
  content: string;
  tags: MemoryNoteTag[];
  hummblModelCodes: string[]; // Base120 codes
  confidence: number; // 0..1
  ttlDays?: number;
  conflictKey?: string;
  source: {
    sourceType: string;
    sourceRef: string;
    hash?: SHA256;
  };
};

export type MemoryScope = "session" | "global";

export type ConsolidationDedupeRule = {
  field: "conflictKey" | "content" | "sourceRef" | "hash";
  strategy: "keep-highest-confidence" | "merge-tags" | "keep-latest";
};

export type ConsolidationParams = {
  scope: MemoryScope;
  notes: MemoryNote[];
  provenance: Provenance;
  dedupeRules: ConsolidationDedupeRule[];
  minConfidenceToPromote: number;
  allowTagPromotion: boolean;
};

export type ConsolidationResult = {
  added: number;
  merged: number;
  conflicts: number;
  globalHash?: SHA256;
};

export type MemoryStore = EntityMeta & {
  scope: MemoryScope;
  notes: MemoryNote[];
  addSessionNote: (note: MemoryNote) => void;
  listSessionNotes: () => MemoryNote[];
  listGlobalNotes: (filter?: {
    tags?: MemoryNoteTag[];
    minConfidence?: number;
  }) => MemoryNote[];
  consolidate: (params: ConsolidationParams) => ConsolidationResult;
};
