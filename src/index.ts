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

const ANSI = {
  reset: "\u001B[0m",
  bold: "\u001B[1m",
  red: "\u001B[31m",
  green: "\u001B[32m",
  cyan: "\u001B[36m",
};

function colorize(text: string, color: string) {
  if (!process.stdout.isTTY) {
    return text;
  }

  return `${color}${text}${ANSI.reset}`;
}

function formatBlock(title: string, lines: string[]) {
  const content = [title, ...lines];
  const width = Math.max(...content.map((line) => line.length));
  const border = `+${"-".repeat(width + 2)}+`;
  const body = content.map((line) => `| ${line.padEnd(width)} |`);

  return [border, ...body, border].join("\n");
}

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

  const output = formatBlock(
    colorize("create-agentic-starter ready", `${ANSI.bold}${ANSI.green}`),
    [
      `Folder: ${cwd}`,
      `Next: ${colorize("@.agentic/init.md", `${ANSI.bold}${ANSI.cyan}`)}`,
    ],
  );

  console.log(output);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  const output = formatBlock(
    colorize("create-agentic-starter failed", `${ANSI.bold}${ANSI.red}`),
    [message],
  );
  console.error(output);
  process.exitCode = 1;
});
