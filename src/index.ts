import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { upsertOptionalFile } from "./lib/file-utils.js";
import {
  AGENTS_MARKER_END,
  AGENTS_MARKER_START,
  AGENTS_PATH,
  agentsBlock,
} from "./lib/managed-files.js";
import { DIRECTORIES, RESET_PATHS, fileContents } from "./scaffold/index.js";

async function resetGeneratedPaths(cwd: string) {
  await Promise.all(
    RESET_PATHS.map((target) =>
      rm(path.join(cwd, target), { recursive: true, force: true }),
    ),
  );
}

async function createDirectories(cwd: string) {
  await Promise.all(
    DIRECTORIES.map((dir) => mkdir(path.join(cwd, dir), { recursive: true })),
  );
}

async function writeScaffoldFiles(cwd: string) {
  const files = fileContents();

  await Promise.all(
    Object.entries(files).map(([relativePath, content]) =>
      writeFile(path.join(cwd, relativePath), content, "utf8"),
    ),
  );
}

async function main() {
  const cwd = process.cwd();

  await resetGeneratedPaths(cwd);
  await createDirectories(cwd);
  await writeScaffoldFiles(cwd);
  await upsertOptionalFile(
    cwd,
    AGENTS_PATH,
    agentsBlock,
    AGENTS_MARKER_START,
    AGENTS_MARKER_END,
  );

  console.log("create-agentic-starter: ready");
  console.log("Next: Start a new chat with @.agentic/init.md");
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(
    `create-agentic-starter: failed to scaffold project. ${message}`,
  );
  process.exitCode = 1;
});
