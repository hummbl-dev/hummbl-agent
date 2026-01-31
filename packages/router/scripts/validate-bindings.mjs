import { validateBindings } from "../dist/router/src/base120/validateBindings.js";
import { BASE120_BINDINGS } from "../dist/router/src/base120/bindings.js";

const result = validateBindings(BASE120_BINDINGS);

if (!result.ok) {
  console.error(JSON.stringify({ ok: false, errors: result.errors }, null, 2));
  process.exit(1);
}

console.log("✓ Bindings valid");
