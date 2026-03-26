import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function upsertManagedBlock(
  existingContent: string,
  block: string,
  startMarker: string,
  endMarker: string,
) {
  const pattern = new RegExp(
    `${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}\\n?`,
    "m",
  );

  if (pattern.test(existingContent)) {
    return existingContent.replace(pattern, `${block}\n`);
  }

  const suffix = existingContent.endsWith("\n") ? "\n" : "\n\n";
  return `${existingContent}${suffix}${block}\n`;
}

export async function upsertOptionalFile(
  cwd: string,
  relativePath: string,
  block: string,
  startMarker: string,
  endMarker: string,
) {
  const fullPath = path.join(cwd, relativePath);

  try {
    const existing = await readFile(fullPath, "utf8");
    const next = upsertManagedBlock(existing, block, startMarker, endMarker);
    await writeFile(fullPath, next, "utf8");
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }

    await writeFile(fullPath, `${block}\n`, "utf8");
  }
}
