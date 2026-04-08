# Agentic Starter Guide

This project includes a reusable AI working area under `.agentic/` for project kick-off and delivery documentation.

## What This Is For

Use this scaffold when you want an AI tool to:

- understand a project from files, notes, screenshots, and links
- maintain structured project memory
- prepare internal drafts in `.agentic/workspace/`
- create user-facing deliverables in `.docs/`
- optionally use Node.js export helpers from `.agentic/workspace/scripts/`

## Folder Purpose

- `.agentic/init.md`: first prompt for every new AI session
- `.agentic/context.md`: shared rules and folder map
- `.agentic/commands/`: task-specific prompt files you reference in your AI tool
- `.agentic/workspace/project/`: raw project inputs such as screenshots, notes, requirement docs, and references
- `.agentic/workspace/memory/`: evolving AI-maintained project understanding
- `.agentic/workspace/documents/`: internal drafts and intermediate artifacts
- `.agentic/workspace/scripts/`: starter Node export helpers that can be adapted per project
- `.docs/`: user-facing deliverables

## How To Use It

1. Open your AI tool in this project.
2. Start every new session with `@.agentic/init.md`.
3. On fresh projects, follow the command flow below.
4. On resumed projects, let `@.agentic/init.md` summarize the current state and continue from the current stage.

## Command Flow

1. `@.agentic/init.md`
2. `@.agentic/commands/project-requirements.md`
3. `@.agentic/commands/architecture.md`
4. Then choose from the available options shown by the current command, such as:
   - `@.agentic/commands/implementation.md`
   - `@.agentic/commands/create-brd.md`
   - `@.agentic/commands/create-frd.md`
   - `@.agentic/commands/create-estimate.md`
   - `@.agentic/commands/create-proposal.md`
   - `@.agentic/commands/create-plan.md`
   - `@.agentic/commands/create-tasks.md`

If a workspace already contains memory and document progress, `@.agentic/init.md` should summarize what is already known, update memory with any new context from the user, and let the user continue from the relevant next step instead of restarting the full sequence.

Memory capture is automatic during normal work. Users do not need to run a separate prompt just to store project context.

For direct coding or feature requests, use `@.agentic/commands/implementation.md` or let `@.agentic/init.md` continue with implementation behavior automatically.
Once a chat is already working on a feature, follow-up coding requests should keep updating that same parent feature by default unless the topic clearly changes.

## Output Conventions

Default user-facing outputs live under `.docs/`:

- BRD: `.docs/brd/brd.docx`
- FRD: `.docs/frd/frd.docx`
- Estimate: `.docs/estimate/estimate.xlsx`
- Proposal: `.docs/proposal/proposal.pptx`
- Plan: `.docs/plan/plan.docx` or `.docs/plan/plan.xlsx`
- Tasks: `.docs/tasks/tasks.xlsx`

## Export Helpers

Starter export scripts live under `.agentic/workspace/scripts/`.

Adapt the relevant script when the project needs a custom template or style. Keep the script path stable by default instead of inventing a separate export path.

Figma MCP can be used as an optional accelerator for design intake when it is available. Ask the user before using it, and continue with normal screenshots or exported design assets when MCP is not available.

Dependency guidance:

1. Prefer the target project root if it already has a usable Node environment.
2. If root is not suitable, ask the user which path should receive the install.
3. Ask the user before running any `npm install`.

Planned library stack:

- `docx`
- `pptxgenjs`
- `exceljs`

## Shared Memory

`.agentic/workspace/memory/` is the shared project memory layer across tools such as Codex, Claude, Cursor, Antigravity, and others.

Use repo memory as the source of truth instead of tool-local memory paths or raw chat history.

Use `features/index.md` for quick feature lookup and one canonical file per module or feature for detailed status, aliases, routes, flow, key code references, and implementation context. When useful, store feature flow diagrams in Mermaid.
Store follow-up UI changes, theme work, API support, and mock-data work under the active parent feature by default unless they are clearly independent.

If your tool does not support `@file` references, paste the contents of the prompt file into a new chat manually.
