# Context

This repository uses a prompt-based project kick-off system.

## Folder Map

- `.agentic/init.md`: session bootstrap prompt
- `.agentic/context.md`: shared rules and folder semantics
- `.agentic/commands/`: prompt files for distinct tasks
- `.agentic/workspace/project/`: raw project materials
- `.agentic/workspace/memory/`: evolving AI-maintained understanding
- `.agentic/workspace/documents/`: internal drafts and intermediate artifacts
- `.agentic/workspace/scripts/`: optional Node export helpers
- `.docs/`: user-facing deliverables

## Workspace Semantics

### Project

Use `.agentic/workspace/project/` for:

- Figma screenshots
- requirement notes
- requirement documents
- links captured into markdown files
- user-supplied project references

If relevant project materials are found outside this folder, move or organize them into `.agentic/workspace/project/` by default. Only leave them in place if the user explicitly says not to move them.

### Memory

Use `.agentic/workspace/memory/` for:

- `project-overview.md`
- `requirements.md`
- `open-questions.md`
- `architecture.md`
- assumptions and structured working memory

### Internal Documents

Use `.agentic/workspace/documents/` for internal drafts or intermediate artifacts such as:

- draft BRD content
- draft FRD content
- draft estimate content
- draft proposal content
- draft plan content
- draft task breakdowns
- structured export input such as `brd.json`, `frd.json`, `estimate.json`, `proposal.json`, `plan.json`, and `tasks.json`

### Scripts

Use `.agentic/workspace/scripts/` for Node.js export helpers.

Starter scripts are scaffolded there by default. Update the relevant script for the current project when the user provides a custom template, layout, or style requirement.

Planned library stack:

- `docx` for `.docx`
- `pptxgenjs` for `.pptx`
- `exceljs` for `.xlsx`

Install behavior:

1. Check whether the target project root already has a usable Node environment.
2. Prefer installing there if suitable.
3. If root is not suitable or is ambiguous, ask the user which path should receive the install.
4. Ask the user before running any `npm install`.

### User Outputs

Use `.docs/` for user-facing deliverables:

- `.docs/brd/brd.docx`
- `.docs/frd/frd.docx`
- `.docs/estimate/estimate.xlsx`
- `.docs/proposal/proposal.pptx`
- `.docs/plan/plan.docx` or `.docs/plan/plan.xlsx`
- `.docs/tasks/tasks.xlsx`

## Working Rules

1. Reuse and improve existing workspace files when they already exist.
2. Do not scan the whole repository unless the user explicitly asks.
3. If relevant project assets are outside `.agentic/workspace/project/`, move them into the workspace by default and then use the workspace copy.
4. Only avoid moving files when the user explicitly asks to keep them in place.
5. Keep internal working material in `.agentic/workspace/` and user-facing deliverables in `.docs/`.
6. In a fresh chat, treat existing memory files and existing outputs as the primary source of truth for resume behavior.
7. Do not restart basic intake if the workspace already contains strong memory unless the existing information is clearly incomplete or contradictory.
8. If the user directly asks for a specific deliverable or command, follow that request when enough context already exists.
9. Prefer the target project root for Node-based export dependencies when a usable Node setup already exists there.
10. If root is not suitable, ask the user which path should be used for dependency installation.
11. Ask the user before running any install command.
12. Ask only the minimum blocking questions required to continue.
13. Always end by telling the user the exact next command to run or listing the available next options.
