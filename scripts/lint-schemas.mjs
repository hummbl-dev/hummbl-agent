import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv/dist/2020.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const schemasDir = path.join(rootDir, "schemas");
const enumsDir = path.join(schemasDir, "enums");

const ajv = new Ajv({ strict: false, validateFormats: false });

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

const enumFiles = fs.existsSync(enumsDir)
  ? fs.readdirSync(enumsDir).filter((file) => file.endsWith(".json"))
  : [];

for (const file of enumFiles) {
  const schema = readJson(path.join(enumsDir, file));
  ajv.addSchema(schema);
}

const schemaFiles = fs
  .readdirSync(schemasDir)
  .filter((file) => file.endsWith(".schema.json"));

for (const file of schemaFiles) {
  const schema = readJson(path.join(schemasDir, file));
  ajv.compile(schema);
}

console.log(`Validated ${schemaFiles.length} schemas with ${enumFiles.length} enums.`);
