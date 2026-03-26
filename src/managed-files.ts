export const AGENTS_PATH = "AGENTS.md";
export const GITIGNORE_PATH = ".gitignore";

export const AGENTS_MARKER_START =
  "<!-- from create-agentic-starter:agents:start -->";
export const AGENTS_MARKER_END =
  "<!-- from create-agentic-starter:agents:end -->";
export const GITIGNORE_MARKER_START = "# from create-agentic-starter:start";
export const GITIGNORE_MARKER_END = "# from create-agentic-starter:end";

export const agentsBlock = `${AGENTS_MARKER_START}
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

export const gitignoreBlock = `${GITIGNORE_MARKER_START}
.agentic/workspace/documents/
.agentic/workspace/memory/
${GITIGNORE_MARKER_END}
`;
