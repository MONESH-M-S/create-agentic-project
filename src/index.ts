import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

type FileMap = Record<string, string>;

const RESET_PATHS = [
  ".agentic",
  "workspace",
  "AGENTS.md",
  "README.md",
  ".gitignore",
];

const fileContents = (cwd: string): FileMap => {
  const projectName = path.basename(cwd);

  return {
    "README.md": `# ${projectName}

This project uses \`create-agentic-project\` to standardize discovery, architecture, documentation, and estimation workflows.

## Start Here

1. Drop Figma or requirement screenshots into \`.agentic/workspace/requirements/figma-screenshots/\`.
2. Open your AI tool in this folder.
3. Start a new chat with \`@.agentic/init.md\`.

## Flow

The scaffold guides the team through these steps:

1. Project understanding
2. Architecture
3. BRD
4. FRD
5. Estimation
`,
    ".gitignore": `.DS_Store
node_modules
dist
.agentic/workspace/analysis
.agentic/workspace/documents
`,
    "AGENTS.md": `# Agent Instructions

If your tool does not support \`@file\` references, start by pasting the contents of [./.agentic/init.md](./.agentic/init.md) into a new chat.

Core files:

- [./.agentic/init.md](./.agentic/init.md)
- [./.agentic/context.md](./.agentic/context.md)
- [./.agentic/instructions/01-project-understanding.md](./.agentic/instructions/01-project-understanding.md)
- [./.agentic/instructions/02-architecture.md](./.agentic/instructions/02-architecture.md)
- [./.agentic/instructions/03-brd.md](./.agentic/instructions/03-brd.md)
- [./.agentic/instructions/04-frd.md](./.agentic/instructions/04-frd.md)
- [./.agentic/instructions/05-estimation.md](./.agentic/instructions/05-estimation.md)
`,
    ".agentic/init.md": `# Init

You are bootstrapping this project workspace.

## Your job

1. Read \`@.agentic/context.md\`.
2. Scan the full \`.agentic/workspace/\` directory and summarize what already exists.
3. Inspect \`.agentic/workspace/requirements/\` for screenshots, requirement notes, references, or client material.
4. If \`.agentic/workspace/analysis/project-overview.md\` already exists, review and improve it instead of replacing useful content.
5. If \`.agentic/workspace/analysis/architecture.md\` already exists, review and improve it instead of replacing useful content.
6. Ask the user only for information that is truly missing and blocks accurate analysis.
7. Create or update \`.agentic/workspace/analysis/project-overview.md\` with:
   - project summary
   - goals
   - users or stakeholders
   - major modules
   - assumptions
   - risks
   - open questions
8. Create or update \`.agentic/workspace/analysis/architecture.md\` with an initial architecture direction if enough information exists.
9. End with a concise summary of what you found, what you created or updated, and tell the user:

\`Next type @.agentic/instructions/01-project-understanding.md\`
`,
    ".agentic/context.md": `# Context Map

This repository is scaffolded for an AI-assisted delivery workflow.

## Paths

- \`.agentic/init.md\`: first prompt to run in a new chat.
- \`.agentic/context.md\`: shared map every step should read before doing work.
- \`.agentic/instructions/\`: ordered step prompts.
- \`.agentic/workspace/requirements/\`: source inputs from client, discovery, screenshots, notes, and references.
- \`.agentic/workspace/requirements/figma-screenshots/\`: raw Figma screenshots dropped by the team.
- \`.agentic/workspace/analysis/\`: generated markdown outputs such as project understanding, architecture, BRD drafts, FRD drafts, and estimation notes.
- \`.agentic/workspace/documents/\`: exported deliverables such as \`.docx\`, \`.xlsx\`, or PDFs.
- \`.agentic/workspace/code/\`: implementation area for frontend, backend, shared packages, and related codebases.
- \`.agentic/workspace/scripts/\`: helper generators such as BRD or estimation export scripts.

## Working rules

1. Always read this file before executing an instruction step.
2. Reuse and improve existing files when present instead of blindly overwriting good work.
3. Save outputs only in the folders described above.
4. At the end of every step, tell the user the exact next prompt to run.
`,
    ".agentic/instructions/01-project-understanding.md": `# Step 01: Project Understanding

Read:

- \`@.agentic/context.md\`
- \`@.agentic/workspace/analysis/project-overview.md\` if it exists
- everything relevant inside \`@.agentic/workspace/requirements/\`

Your job:

1. Build a clear understanding of the project scope from the available inputs.
2. Identify business goal, target users, core workflows, major features, dependencies, constraints, assumptions, and risks.
3. Update or create \`.agentic/workspace/analysis/project-overview.md\` as a polished project-understanding document.
4. Keep the document practical and client-ready.
5. If information is missing, ask only the minimum blocking questions.

Output file:

- \`.agentic/workspace/analysis/project-overview.md\`

When done, tell the user:

\`Next type @.agentic/instructions/02-architecture.md\`
`,
    ".agentic/instructions/02-architecture.md": `# Step 02: Architecture

Read:

- \`@.agentic/context.md\`
- \`@.agentic/workspace/analysis/project-overview.md\`
- any relevant requirement material in \`@.agentic/workspace/requirements/\`

Your job:

1. Define the recommended system architecture for this project.
2. Cover frontend, backend, data, integrations, authentication, deployment, observability, and security where relevant.
3. Include a mermaid diagram if the AI tool supports it.
4. Update or create \`.agentic/workspace/analysis/architecture.md\`.
5. Keep it implementation-oriented and aligned with the project scope.

Output file:

- \`.agentic/workspace/analysis/architecture.md\`

When done, tell the user:

\`Next type @.agentic/instructions/03-brd.md\`
`,
    ".agentic/instructions/03-brd.md": `# Step 03: BRD

Read:

- \`@.agentic/context.md\`
- \`@.agentic/workspace/analysis/project-overview.md\`
- \`@.agentic/workspace/analysis/architecture.md\`
- any supporting requirement files in \`@.agentic/workspace/requirements/\`

Your job:

1. Create a Business Requirements Document based on the available context.
2. Cover executive summary, business goals, problem statement, users, scope, assumptions, dependencies, risks, milestones, and acceptance framing.
3. Save the markdown draft to \`.agentic/workspace/analysis/brd.md\`.
4. If a generator script exists in \`.agentic/workspace/scripts/\`, mention whether it can be used to export a \`.docx\` into \`.agentic/workspace/documents/\`.

Output file:

- \`.agentic/workspace/analysis/brd.md\`

When done, tell the user:

\`Next type @.agentic/instructions/04-frd.md\`
`,
    ".agentic/instructions/04-frd.md": `# Step 04: FRD

Read:

- \`@.agentic/context.md\`
- \`@.agentic/workspace/analysis/project-overview.md\`
- \`@.agentic/workspace/analysis/architecture.md\`
- \`@.agentic/workspace/analysis/brd.md\`
- any supporting requirement files in \`@.agentic/workspace/requirements/\`

Your job:

1. Create a Functional Requirements Document with feature-level detail.
2. Cover modules, user flows, functional requirements, validations, edge cases, roles, permissions, reporting needs, and non-functional considerations where relevant.
3. Save the markdown draft to \`.agentic/workspace/analysis/frd.md\`.
4. Keep the structure ready for handoff to product, design, and engineering teams.

Output file:

- \`.agentic/workspace/analysis/frd.md\`

When done, tell the user:

\`Next type @.agentic/instructions/05-estimation.md\`
`,
    ".agentic/instructions/05-estimation.md": `# Step 05: Estimation

Read:

- \`@.agentic/context.md\`
- \`@.agentic/workspace/analysis/project-overview.md\`
- \`@.agentic/workspace/analysis/architecture.md\`
- \`@.agentic/workspace/analysis/brd.md\`
- \`@.agentic/workspace/analysis/frd.md\`

Your job:

1. Create a delivery estimation based on the full project context.
2. Break effort down by module, role, and phase where possible.
3. Include assumptions, dependencies, delivery risks, and scope sensitivity.
4. Save the markdown draft to \`.agentic/workspace/analysis/estimation.md\`.
5. If the workspace includes generator scripts, mention whether the estimate can be exported into \`.agentic/workspace/documents/\`.

Output file:

- \`.agentic/workspace/analysis/estimation.md\`

When done, tell the user the workflow is complete and list the generated outputs.
`,
  };
};

const directories = [
  ".agentic",
  ".agentic/instructions",
  ".agentic/workspace",
  ".agentic/workspace/requirements",
  ".agentic/workspace/requirements/figma-screenshots",
  ".agentic/workspace/analysis",
  ".agentic/workspace/documents",
  ".agentic/workspace/code",
  ".agentic/workspace/scripts",
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
  const files = fileContents(cwd);

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

  console.log("");
  console.log("create-agentic-project: scaffold created successfully.");
  console.log(`Project folder: ${cwd}`);
  console.log("");
  console.log("Next steps:");
  console.log("1. Add screenshots to .agentic/workspace/requirements/figma-screenshots/");
  console.log("2. Open your AI tool in this folder.");
  console.log("3. Start a new chat with @.agentic/init.md");
  console.log("");
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`create-agentic-project: failed to scaffold project. ${message}`);
  process.exitCode = 1;
});
