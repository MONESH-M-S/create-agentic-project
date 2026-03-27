import type { FileMap } from "./scaffold.js";

export const coreFiles: FileMap = {
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
11. If important project basics are still missing, continue asking focused questions and keep updating the memory files instead of routing forward yet.
12. Only when you have done enough useful intake work to create a solid initial understanding, end with:

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
- \`.agentic/workspace/documents/\`: internal drafts and intermediate artifacts
- \`.agentic/workspace/scripts/\`: optional Node export helpers
- \`.docs/\`: user-facing deliverables

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

### Internal Documents

Use \`.agentic/workspace/documents/\` for internal drafts or intermediate artifacts such as:

- draft BRD content
- draft FRD content
- draft estimate content
- draft proposal content
- draft plan content
- draft task breakdowns

### Scripts

Use \`.agentic/workspace/scripts/\` for optional Node.js export helpers.

Planned library stack:

- \`docx\` for \`.docx\`
- \`pptxgenjs\` for \`.pptx\`
- \`exceljs\` for \`.xlsx\`

Install behavior:

1. Check whether the target project root already has a usable Node environment.
2. Prefer installing there if suitable.
3. If root is not suitable or is ambiguous, ask the user which path should receive the install.
4. Ask the user before running any \`npm install\`.

### User Outputs

Use \`.docs/\` for user-facing deliverables:

- \`.docs/brd/brd.docx\`
- \`.docs/frd/frd.docx\`
- \`.docs/estimate/estimate.xlsx\`
- \`.docs/proposal/proposal.pptx\`
- \`.docs/plan/plan.docx\` or \`.docs/plan/plan.xlsx\`
- \`.docs/tasks/tasks.xlsx\`

## Working Rules

1. Reuse and improve existing workspace files when they already exist.
2. Do not scan the whole repository unless the user explicitly asks.
3. If relevant project assets are outside \`.agentic/workspace/project/\`, move them into the workspace by default and then use the workspace copy.
4. Only avoid moving files when the user explicitly asks to keep them in place.
5. Keep internal working material in \`.agentic/workspace/\` and user-facing deliverables in \`.docs/\`.
6. Prefer the target project root for Node-based export dependencies when a usable Node setup already exists there.
7. If root is not suitable, ask the user which path should be used for dependency installation.
8. Ask the user before running any install command.
9. Ask only the minimum blocking questions required to continue.
10. Always end by telling the user the exact next command to run or listing the available next options.
`,
};
