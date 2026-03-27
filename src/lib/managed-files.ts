export const AGENTS_PATH = "AGENTS.md";

export const AGENTS_MARKER_START =
  "<!-- from create-agentic-starter:agents:start -->";
export const AGENTS_MARKER_END =
  "<!-- from create-agentic-starter:agents:end -->";

export const agentsBlock = `${AGENTS_MARKER_START}
# Agentic Starter Guide

This project includes a reusable AI working area under \`.agentic/\` for project kick-off and delivery documentation.

## What This Is For

Use this scaffold when you want an AI tool to:

- understand a project from files, notes, screenshots, and links
- maintain structured project memory
- prepare internal drafts in \`.agentic/workspace/\`
- create user-facing deliverables in \`.docs/\`
- optionally use Node.js export helpers from \`.agentic/workspace/scripts/\`

## Folder Purpose

- \`.agentic/init.md\`: first prompt for every new AI session
- \`.agentic/context.md\`: shared rules and folder map
- \`.agentic/commands/\`: task-specific prompt files you reference in your AI tool
- \`.agentic/workspace/project/\`: raw project inputs such as screenshots, notes, requirement docs, and references
- \`.agentic/workspace/memory/\`: evolving AI-maintained project understanding
- \`.agentic/workspace/documents/\`: internal drafts and intermediate artifacts
- \`.agentic/workspace/scripts/\`: starter Node export helpers that can be adapted per project
- \`.docs/\`: user-facing deliverables

## How To Use It

1. Open your AI tool in this project.
2. Start every new session with \`@.agentic/init.md\`.
3. Follow the command flow below.

## Command Flow

1. \`@.agentic/init.md\`
2. \`@.agentic/commands/project-requirements.md\`
3. \`@.agentic/commands/architecture.md\`
4. Then choose from the available options shown by the current command, such as:
   - \`@.agentic/commands/create-brd.md\`
   - \`@.agentic/commands/create-frd.md\`
   - \`@.agentic/commands/create-estimate.md\`
   - \`@.agentic/commands/create-proposal.md\`
   - \`@.agentic/commands/create-plan.md\`
   - \`@.agentic/commands/create-tasks.md\`

## Output Conventions

Default user-facing outputs live under \`.docs/\`:

- BRD: \`.docs/brd/brd.docx\`
- FRD: \`.docs/frd/frd.docx\`
- Estimate: \`.docs/estimate/estimate.xlsx\`
- Proposal: \`.docs/proposal/proposal.pptx\`
- Plan: \`.docs/plan/plan.docx\` or \`.docs/plan/plan.xlsx\`
- Tasks: \`.docs/tasks/tasks.xlsx\`

## Export Helpers

Starter export scripts live under \`.agentic/workspace/scripts/\`.

Adapt the relevant script when the project needs a custom template or style. Keep the script path stable by default instead of inventing a separate export path.

Dependency guidance:

1. Prefer the target project root if it already has a usable Node environment.
2. If root is not suitable, ask the user which path should receive the install.
3. Ask the user before running any \`npm install\`.

Planned library stack:

- \`docx\`
- \`pptxgenjs\`
- \`exceljs\`

If your tool does not support \`@file\` references, paste the contents of the prompt file into a new chat manually.
${AGENTS_MARKER_END}
`;
