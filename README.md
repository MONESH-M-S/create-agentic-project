# create-agentic-starter

`create-agentic-starter` scaffolds a reusable AI working area inside an existing project.

It is meant for teams who repeatedly do the same early project work:

- collect requirements
- understand screenshots, notes, and references
- define architecture
- prepare BRD, FRD, estimate, proposal, plan, and task outputs

Instead of rebuilding prompts, folders, and working conventions for every new project, this package gives the team a standard `.agentic/` setup that works across AI tools such as Codex, Claude, Cursor, Antigravity, and similar agentic workflows.

## What This Project Is Trying To Achieve

The package creates a lightweight but structured workflow inside the target project so an AI agent can:

- understand the project from the files already present
- gather missing context from the user
- keep project memory in one place
- generate internal drafts
- create user-facing deliverables under `.docs/`
- use starter export scripts for `.docx`, `.xlsx`, and `.pptx` outputs

The goal is not to generate code for the product itself on day one. The goal is to standardize the project kick-off and delivery-document workflow so any team member can start from the same foundation.

## How To Run It

Run the command inside an existing project folder.

```bash
npx create-agentic-starter
```

or

```bash
bunx create-agentic-starter
```

The command is non-interactive. It does not ask setup questions.

## What The Command Does

When you run it, it will:

- recreate `.agentic/`
- create `.docs/` for user-facing outputs
- preserve an existing `AGENTS.md` and append a marked `create-agentic-starter` section when needed
- print the next step for the team: start with `@.agentic/init.md`

## What Gets Created

The scaffold sets up:

- `.agentic/init.md`
- `.agentic/context.md`
- `.agentic/commands/`
- `.agentic/workspace/project/`
- `.agentic/workspace/memory/`
- `.agentic/workspace/documents/`
- `.agentic/workspace/scripts/`
- `.docs/`
- `AGENTS.md`

This gives you a clear split:

- `.agentic/workspace/project/` for raw project materials
- `.agentic/workspace/memory/` for AI-maintained project understanding
- `.agentic/workspace/documents/` for internal drafts and structured export input
- `.agentic/workspace/scripts/` for starter export scripts
- `.docs/` for final user-facing outputs

## Customization

The generated scaffold is fully yours after it is created.

- you can add any new prompt files you want under `.agentic/commands/`
- you can edit the existing prompts to match your workflow
- you can remove commands, files, or folders that you do not want
- you can version control everything with git inside your own repository

This setup stays inside your codebase. Your project memory, prompts, documents, and scripts live in your repo, so the working context is owned by your team and does not need to live in an external shared system.

## Export Scripts

The scaffold includes starter export scripts under `.agentic/workspace/scripts/` for:

- `.docx` via `docx`
- `.pptx` via `pptxgenjs`
- `.xlsx` via `exceljs`

These scripts are intentionally starter implementations. They are expected to be adapted by the AI agent when the user provides:

- a custom template
- a preferred document style
- a specific export structure

## Typical Workflow

1. Run `npx create-agentic-starter` or `bunx create-agentic-starter` in the target project.
2. Open that project in your AI tool.
3. Start a new session with `@.agentic/init.md`.
4. Let the agent understand the project, ask questions, and update memory files.
5. Continue with commands in `.agentic/commands/` such as:
   - `@.agentic/commands/project-requirements.md`
   - `@.agentic/commands/architecture.md`
   - `@.agentic/commands/create-brd.md`
   - `@.agentic/commands/create-frd.md`
   - `@.agentic/commands/create-estimate.md`
   - `@.agentic/commands/create-proposal.md`
   - `@.agentic/commands/create-plan.md`
   - `@.agentic/commands/create-tasks.md`

## Notes

- The scaffold is designed to be lightweight and easy to drop into an existing repo.
- It is prompt-driven first, with export scripts available when the workflow needs generated Office documents.
- `AGENTS.md` is used as the human-readable guide inside the target project.
