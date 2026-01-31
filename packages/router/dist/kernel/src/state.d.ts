import type { EntityMeta, SHA256 } from "./types";
export type RunState = EntityMeta & {
    objective: string;
    constraints: string[];
    nextSteps: string[];
    locks: {
        scope: string;
        holder: string;
        until?: string;
    }[];
    nextHandoff: {
        for: string;
        instructions: string;
    }[];
    artifacts: {
        path: string;
        sha256?: SHA256;
        purpose?: string;
    }[];
    sourceRef?: string;
};
//# sourceMappingURL=state.d.ts.map