import { existsSync, readFileSync, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function readTemplate(relativePath: string) {
  const candidateDirs = [
    path.dirname(realpathSync(fileURLToPath(import.meta.url))),
    process.argv[1] ? path.dirname(realpathSync(process.argv[1])) : null,
    process.argv[1] ? path.dirname(path.resolve(process.argv[1])) : null,
  ].filter((value): value is string => Boolean(value));

  for (const baseDir of candidateDirs) {
    const templatePath = path.join(baseDir, relativePath);

    if (existsSync(templatePath)) {
      return readFileSync(templatePath, "utf8");
    }
  }

  throw new Error(
    `Template not found: ${relativePath}. Checked: ${candidateDirs.join(", ")}`,
  );
}
