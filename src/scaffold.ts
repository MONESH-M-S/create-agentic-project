export type FileMap = Record<string, string>;

export const RESET_PATHS = [".agentic"];

export const DIRECTORIES = [
  ".agentic",
  ".agentic/commands",
  ".agentic/workspace",
  ".agentic/workspace/project",
  ".agentic/workspace/memory",
  ".agentic/workspace/documents",
];

export const fileContents = (): FileMap => ({
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
6. If the user mentions screenshots, notes, requirement docs, links, or file paths, move or organize them into \`.agentic/workspace/project/\` by default unless the user explicitly says not to.
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

If relevant project materials are found outside this folder, move or organize them into \`.agentic/workspace/project/\` by default. Only leave them in place if the user explicitly says not to move them.

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
3. If relevant project assets are outside \`.agentic/workspace/project/\`, move them into the workspace by default and then use the workspace copy.
4. Only avoid moving files when the user explicitly asks to keep them in place.
5. Ask only the minimum blocking questions required to continue.
6. Always end by telling the user the exact next command to run.
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
4. Move or organize project inputs into \`.agentic/workspace/project/\` by default unless the user explicitly says not to.
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
6. If relevant screenshots, notes, or references are found outside \`.agentic/workspace/project/\`, move or organize them into the workspace by default unless the user explicitly says not to.
7. Ask only the minimum blocking questions.

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
4. If relevant source material is outside \`.agentic/workspace/project/\`, move or organize it into the workspace by default unless the user explicitly says not to.
5. If critical information is missing, ask only the minimum blocking questions before drafting.

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
4. If relevant source material is outside \`.agentic/workspace/project/\`, move or organize it into the workspace by default unless the user explicitly says not to.
5. Ask only the minimum blocking questions.

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
4. If relevant source material is outside \`.agentic/workspace/project/\`, move or organize it into the workspace by default unless the user explicitly says not to.
5. Ask only the minimum blocking questions.

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
4. If relevant screenshots, decks, notes, or references are found outside \`.agentic/workspace/project/\`, move or organize them into the workspace by default unless the user explicitly says not to.
5. Ask only the minimum blocking questions.

When done, tell the user the v1 workflow is complete and list the generated files.
`,
});
