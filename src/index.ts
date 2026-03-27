import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { upsertOptionalFile } from "./file-utils.js";
import {
  AGENTS_MARKER_END,
  AGENTS_MARKER_START,
  AGENTS_PATH,
  agentsBlock,
} from "./managed-files.js";
import { DIRECTORIES, RESET_PATHS, fileContents } from "./scaffold.js";

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

  console.log("");
  console.log("create-agentic-starter: scaffold created successfully.");
  console.log(`Project folder: ${cwd}`);
  console.log("");
  console.log("Next steps:");
  console.log("1. Open your AI tool in this folder.");
  console.log("2. Start a new chat with @.agentic/init.md");
  console.log("");
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`create-agentic-starter: failed to scaffold project. ${message}`);
  process.exitCode = 1;
});
