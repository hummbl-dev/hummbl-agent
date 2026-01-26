import type { EntityMeta } from "./types";

export type Artifact = EntityMeta & {
  kind: string;
  name: string;
  mimeType?: string;
  uri?: string;
  sizeBytes?: number;
};
