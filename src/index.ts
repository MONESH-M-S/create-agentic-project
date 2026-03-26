import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

type FileMap = Record<string, string>;

const AGENTS_PATH = "AGENTS.md";
const GITIGNORE_PATH = ".gitignore";
const AGENTS_MARKER_START = "<!-- from create-agentic-starter:agents:start -->";
const AGENTS_MARKER_END = "<!-- from create-agentic-starter:agents:end -->";
const GITIGNORE_MARKER_START = "# from create-agentic-starter:start";
const GITIGNORE_MARKER_END = "# from create-agentic-starter:end";

const RESET_PATHS = [".agentic"];

const fileContents = (): FileMap => ({
  ".agentic/init.md": `# Init

Read \`@.agentic/context.md\` first.

You are starting a fresh AI session inside this project. Your job is to quickly understand what this project is, what context already exists, and what the user still needs to provide.

## Read Scope

1. Read only root-level files and folders in the current project.
2. Do not recursively inspect the full repository.
3. Treat \`.agentic/\` as the exception:
   - inspect \`.agentic/workspace/project/\`
   - inspect \`.agentic/workspace/memory/\`
   - inspect \`.agentic/workspace/documents/\`
4. Use existing workspace context if it is already present.

## Response Style

1. Be concise and synthesis-first.
2. Do not dump a full file inventory unless the user explicitly asks.
3. Do not mirror the prompt structure back to the user.
4. Respond with either:
   - a short synthesized summary of what you understand, or
   - a few focused questions if important context is still missing

## What To Do

1. Infer what kind of project this is from the root-level signals.
2. Check whether \`.agentic/workspace/project/\`, \`.agentic/workspace/memory/\`, and \`.agentic/workspace/documents/\` already contain useful context.
3. Build the best current understanding from:
   - root-level signals
   - existing workspace files
   - the user's message in this chat
4. If project context is thin, ask a small number of targeted questions about:
   - project goal
   - target users
   - scope or modules
   - available references such as screenshots, docs, notes, links, or file paths
   - desired outputs
5. If enough context exists, give a short summary of the project and the most important missing pieces.
6. If the user mentions screenshots, notes, requirement docs, links, or file paths, tell them how those should be placed or referenced under \`.agentic/workspace/project/\`.
7. After the first useful exchange, create or update:
   - \`.agentic/workspace/memory/project-overview.md\`
   - \`.agentic/workspace/memory/requirements.md\`
   - \`.agentic/workspace/memory/open-questions.md\`
8. Write drafts even from partial information.
9. Clearly separate confirmed facts, assumptions, and open questions.
10. Do not route immediately just because the workspace is empty. Do useful synthesis or ask focused questions first.
11. Once you have done useful intake work, end with:

\`Next type @.agentic/commands/project-requirements.md\`
`,
  ".agentic/context.md": `# Context

This repository uses a prompt-based project kick-off system.

## Folder Map

- \`.agentic/init.md\`: session bootstrap prompt
- \`.agentic/context.md\`: shared rules and folder semantics
- \`.agentic/commands/\`: prompt files for distinct tasks
- \`.agentic/workspace/project/\`: raw project materials
- \`.agentic/workspace/memory/\`: evolving AI-maintained understanding
- \`.agentic/workspace/documents/\`: polished markdown outputs

## Workspace Semantics

### Project

Use \`.agentic/workspace/project/\` for:

- Figma screenshots
- requirement notes
- requirement documents
- links captured into markdown files
- user-supplied project references

### Memory

Use \`.agentic/workspace/memory/\` for:

- \`project-overview.md\`
- \`requirements.md\`
- \`open-questions.md\`
- \`architecture.md\`
- assumptions and structured working memory

### Documents

Use \`.agentic/workspace/documents/\` for polished outputs:

- \`brd.md\`
- \`frd.md\`
- \`estimate.md\`
- \`proposal.md\`

## Working Rules

1. Reuse and improve existing workspace files when they already exist.
2. Do not scan the whole repository unless the user explicitly asks.
3. Ask only the minimum blocking questions required to continue.
4. Always end by telling the user the exact next command to run.
`,
  ".agentic/commands/project-requirements.md": `# Project Requirements

Read:

- \`@.agentic/context.md\`
- relevant existing files inside \`.agentic/workspace/project/\`
- \`.agentic/workspace/memory/project-overview.md\` if it exists
- \`.agentic/workspace/memory/requirements.md\` if it exists
- \`.agentic/workspace/memory/open-questions.md\` if it exists

## Your job

1. Refine and deepen the initial understanding created during \`@.agentic/init.md\`.
2. Collect any missing project explanation, goals, users, scope, screenshots, references, and known deliverables.
3. Accept either:
   - existing file paths already shared by the user, or
   - fresh explanation typed in chat
4. Tell the user where each input belongs under \`.agentic/workspace/project/\`.
5. Organize and normalize the project context so the later architecture and document steps can rely on it.
6. Create or update:
   - \`.agentic/workspace/memory/project-overview.md\`
   - \`.agentic/workspace/memory/requirements.md\`
   - \`.agentic/workspace/memory/open-questions.md\`
7. Capture assumptions separately from confirmed facts.
8. Reduce open questions where possible before handing off to architecture.
9. Ask only for missing details that block useful requirement understanding.

When done, tell the user:

\`Next type @.agentic/commands/architecture.md\`
`,
  ".agentic/commands/architecture.md": `# Architecture

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- relevant files under \`.agentic/workspace/project/\`
- \`.agentic/workspace/memory/open-questions.md\` if it exists

## Your job

1. Produce or update \`.agentic/workspace/memory/architecture.md\`.
2. Explain the recommended system architecture based on the known requirements.
3. Cover frontend, backend, data, integrations, authentication, deployment, and key risks when relevant.
4. Add a diagram description or mermaid diagram when supported.
5. Mention draw.io MCP only as an optional tool if available in the user's environment.
6. Ask only the minimum blocking questions.

When done, tell the user:

\`Next type @.agentic/commands/create-brd.md\`
`,
  ".agentic/commands/create-brd.md": `# Create BRD

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- \`.agentic/workspace/memory/architecture.md\`
- relevant files under \`.agentic/workspace/project/\`

## Your job

1. Create or update \`.agentic/workspace/documents/brd.md\`.
2. Produce a polished markdown Business Requirements Document.
3. Use confirmed facts first and clearly label assumptions where needed.
4. If critical information is missing, ask only the minimum blocking questions before drafting.

When done, tell the user:

\`Next type @.agentic/commands/create-frd.md\`
`,
  ".agentic/commands/create-frd.md": `# Create FRD

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- \`.agentic/workspace/memory/architecture.md\`
- \`.agentic/workspace/documents/brd.md\` if it exists
- relevant files under \`.agentic/workspace/project/\`

## Your job

1. Create or update \`.agentic/workspace/documents/frd.md\`.
2. Produce a polished markdown Functional Requirements Document.
3. Cover modules, flows, validations, roles, and edge cases where relevant.
4. Ask only the minimum blocking questions.

When done, tell the user:

\`Next type @.agentic/commands/create-estimate.md\`
`,
  ".agentic/commands/create-estimate.md": `# Create Estimate

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- \`.agentic/workspace/memory/architecture.md\`
- \`.agentic/workspace/documents/brd.md\` if it exists
- \`.agentic/workspace/documents/frd.md\` if it exists

## Your job

1. Create or update \`.agentic/workspace/documents/estimate.md\`.
2. Produce a markdown estimate with effort breakdown, assumptions, dependencies, and risks.
3. Keep the estimate aligned with the known scope and clearly state uncertainty.
4. Ask only the minimum blocking questions.

When done, tell the user:

\`Next type @.agentic/commands/create-proposal.md\`
`,
  ".agentic/commands/create-proposal.md": `# Create Proposal

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- \`.agentic/workspace/memory/architecture.md\`
- \`.agentic/workspace/documents/brd.md\` if it exists
- \`.agentic/workspace/documents/frd.md\` if it exists
- \`.agentic/workspace/documents/estimate.md\` if it exists

## Your job

1. Create or update \`.agentic/workspace/documents/proposal.md\`.
2. Produce a polished markdown proposal using the known scope, architecture direction, and estimate.
3. Make gaps explicit instead of inventing details.
4. Ask only the minimum blocking questions.

When done, tell the user the v1 workflow is complete and list the generated files.
`,
});

const agentsBlock = `${AGENTS_MARKER_START}
# Agentic Starter Guide

This project includes a reusable AI working area under \`.agentic/\` for project kick-off and pre-delivery documentation.

## What This Is For

Use this scaffold when you want an AI tool to:

- understand a project from files, notes, screenshots, and links
- maintain structured project memory
- generate markdown deliverables such as BRD, FRD, estimate, and proposal

## Folder Purpose

- \`.agentic/init.md\`: first prompt for every new AI session
- \`.agentic/context.md\`: shared rules and folder map
- \`.agentic/commands/\`: task-specific prompt files you reference in your AI tool
- \`.agentic/workspace/project/\`: raw project inputs such as screenshots, notes, requirement docs, and reference links
- \`.agentic/workspace/memory/\`: evolving AI-maintained project understanding
- \`.agentic/workspace/documents/\`: polished markdown deliverables

## How To Use It

1. Open your AI tool in this project.
2. Start every new session with \`@.agentic/init.md\`.
3. Follow the command sequence below.

## V1 Command Sequence

1. \`@.agentic/init.md\`
2. \`@.agentic/commands/project-requirements.md\`
3. \`@.agentic/commands/architecture.md\`
4. \`@.agentic/commands/create-brd.md\`
5. \`@.agentic/commands/create-frd.md\`
6. \`@.agentic/commands/create-estimate.md\`
7. \`@.agentic/commands/create-proposal.md\`

If your tool does not support \`@file\` references, paste the contents of the prompt file into a new chat manually.
${AGENTS_MARKER_END}
`;

const gitignoreBlock = `${GITIGNORE_MARKER_START}
.agentic/workspace/documents/
.agentic/workspace/memory/
${GITIGNORE_MARKER_END}
`;

const directories = [
  ".agentic",
  ".agentic/commands",
  ".agentic/workspace",
  ".agentic/workspace/project",
  ".agentic/workspace/memory",
  ".agentic/workspace/documents",
];

async function resetGeneratedPaths(cwd: string) {
  await Promise.all(
    RESET_PATHS.map((target) =>
      rm(path.join(cwd, target), { recursive: true, force: true }),
    ),
  );
}

async function createDirectories(cwd: string) {
  await Promise.all(
    directories.map((dir) => mkdir(path.join(cwd, dir), { recursive: true })),
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

function upsertManagedBlock(
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

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function upsertOptionalFile(
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
  await upsertOptionalFile(
    cwd,
    GITIGNORE_PATH,
    gitignoreBlock,
    GITIGNORE_MARKER_START,
    GITIGNORE_MARKER_END,
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
