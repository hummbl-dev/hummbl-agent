import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { serializeTupleV1, validateTupleV1 } from "../../packages/kernel/src/index.ts";

const vectorsPath = resolve(process.cwd(), "docs/specs/TUPLES_v1.0.test-vectors.json");
const data = JSON.parse(readFileSync(vectorsPath, "utf8"));

const PLACEHOLDER = "<SHA256_HEX>";
const hasPlaceholder = data.vectors.some((vector) => vector.sha256 === PLACEHOLDER);
if (hasPlaceholder) {
  console.error(`[FAIL] vectors contain placeholder sha256 (${PLACEHOLDER}). Refuse to pass.`);
  process.exit(1);
}

let hasFailure = false;
for (const vector of data.vectors) {
  const validation = validateTupleV1(vector.tuple);
  if (!validation.ok) {
    console.error(`[FAIL] ${vector.name}: validation ${validation.code}${validation.detail ? ` (${validation.detail})` : ""}`);
    hasFailure = true;
    continue;
  }

  const canonical = serializeTupleV1(vector.tuple);
  if (canonical !== vector.canonical) {
    console.error(`[FAIL] ${vector.name}: canonical mismatch`);
    console.error(`  expected: ${vector.canonical}`);
    console.error(`  received: ${canonical}`);
    hasFailure = true;
    continue;
  }

  const hash = createHash("sha256").update(Buffer.from(canonical, "utf8")).digest("hex");
  if (vector.sha256 !== "<SHA256_HEX>" && hash !== vector.sha256) {
    console.error(`[FAIL] ${vector.name}: sha256 mismatch`);
    console.error(`  expected: ${vector.sha256}`);
    console.error(`  received: ${hash}`);
    hasFailure = true;
    continue;
  }

  console.log(`[OK] ${vector.name}: sha256=${hash}`);
}

if (hasFailure) {
  process.exit(1);
}

console.log("All tuple vectors verified.");
