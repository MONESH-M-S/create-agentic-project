import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function readTemplate(relativePath: string) {
  const entryDir = process.argv[1]
    ? path.dirname(path.resolve(process.argv[1]))
    : path.dirname(fileURLToPath(import.meta.url));

  return readFileSync(path.join(entryDir, relativePath), "utf8");
}
