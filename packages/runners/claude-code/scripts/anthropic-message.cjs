#!/usr/bin/env node
"use strict";

const fs = require("fs");
const https = require("https");
const path = require("path");
const { URL } = require("url");

const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf(name);
  if (idx === -1) return undefined;
  return args[idx + 1];
};

const requestPath = getArg("--request");
const responsePath = getArg("--response");
const metaPath = getArg("--meta");
const baseUrlArg = getArg("--base-url");
const timeoutMsArg = getArg("--timeout-ms");
const maxBytesArg = getArg("--max-response-bytes");

if (!requestPath || !responsePath || !metaPath) {
  console.error("Usage: anthropic-message.cjs --request <file> --response <file> --meta <file>");
  process.exit(1);
}

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("ANTHROPIC_API_KEY is required");
  process.exit(1);
}

const root = path.resolve(__dirname, "../../../../");
const {
  loadNetworkPolicy,
  enforceRequestSize,
  enforceRateLimit,
} = require(path.join(root, "scripts", "network-guard.cjs"));

let networkPolicy = { allowlist: { domains: ["api.anthropic.com"] }, default: {} };
try {
  networkPolicy = loadNetworkPolicy(root);
} catch (err) {
  console.error(err.message || "Failed to read network-policy.json");
  process.exit(1);
}

const allowedDomains = new Set(
  Array.isArray(networkPolicy.allowlist?.domains)
    ? networkPolicy.allowlist.domains
    : []
);

const baseUrl = baseUrlArg || "https://api.anthropic.com/v1/";
const url = new URL("messages", baseUrl);
if (!allowedDomains.has(url.hostname)) {
  console.error(`Domain not allowlisted: ${url.hostname}`);
  process.exit(1);
}

const timeoutMs = timeoutMsArg ? Number(timeoutMsArg) : networkPolicy.default?.timeoutMs || 60000;
const maxResponseBytes = maxBytesArg
  ? Number(maxBytesArg)
  : networkPolicy.default?.maxResponseBytes || 1048576;

let requestBody;
try {
  requestBody = JSON.parse(fs.readFileSync(requestPath, "utf8"));
} catch (err) {
  console.error("Request file is not valid JSON");
  process.exit(1);
}

const body = JSON.stringify(requestBody);
try {
  enforceRequestSize(body, networkPolicy.default?.maxRequestBytes);
} catch (err) {
  console.error(err.message || "Request too large");
  process.exit(1);
}

try {
  enforceRateLimit(root, networkPolicy);
} catch (err) {
  console.error(err.message || "Rate limit exceeded");
  process.exit(1);
}
const headers = {
  "Content-Type": "application/json",
  "Content-Length": Buffer.byteLength(body).toString(),
  "x-api-key": apiKey,
  "anthropic-version": "2023-06-01",
};

const started = Date.now();
const req = https.request(
  {
    method: "POST",
    hostname: url.hostname,
    port: url.port || 443,
    path: url.pathname,
    headers,
  },
  (res) => {
    const chunks = [];
    let total = 0;
    const requestId = res.headers["request-id"]
      ? String(res.headers["request-id"])
      : "";

    res.on("data", (chunk) => {
      const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      total += buf.length;
      if (total > maxResponseBytes) {
        req.destroy();
        console.error("Response exceeded maxResponseBytes");
        process.exit(1);
      }
      chunks.push(buf);
    });

    res.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      const status = res.statusCode || 0;
      const durationMs = Date.now() - started;

      const meta = {
        status,
        requestId,
        durationMs,
        url: url.toString(),
        timestamp: new Date().toISOString(),
      };

      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8");

      if (status < 200 || status >= 300) {
        fs.writeFileSync(
          responsePath,
          JSON.stringify({ error: raw }, null, 2) + "\n",
          "utf8"
        );
        console.error(`Anthropic error ${status}`);
        process.exit(1);
      }

      let data;
      try {
        data = JSON.parse(raw);
      } catch (err) {
        fs.writeFileSync(
          responsePath,
          JSON.stringify({ error: "invalid_json", raw }, null, 2) + "\n",
          "utf8"
        );
        console.error("Anthropic response was not valid JSON");
        process.exit(1);
      }

      fs.writeFileSync(responsePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    });
  }
);

req.on("error", (err) => {
  console.error("Anthropic request failed:", err.message);
  process.exit(1);
});

req.setTimeout(timeoutMs, () => {
  req.destroy(new Error("Anthropic request timed out"));
});

req.write(body);
req.end();
