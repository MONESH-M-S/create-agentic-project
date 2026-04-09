# Export Scripts

This folder contains starter Node.js export helpers for deliverables in `.docs/`.

These scripts are meant to be a starting point. The AI agent should update the relevant script for the current project when the user provides a template, a preferred structure, or custom formatting rules.

This folder also contains a project-memory sync helper for implementation tracking inside `.agentic/workspace/memory/`.

## Included Starter Scripts

- `generate_brd.js`
- `generate_frd.js`
- `generate_estimate.js`
- `generate_proposal.js`
- `generate_plan.js`
- `generate_tasks.js`
- `sync_memory.js`
- `_shared.js`

## Planned Libraries

- `docx` for BRD, FRD, and document-style plan output
- `pptxgenjs` for proposal decks
- `exceljs` for estimate, tasks, and spreadsheet-style plan output

## Install Strategy

1. Check whether the target project root already has a usable Node environment.
2. Prefer installing export dependencies there if suitable.
3. If root is not suitable or is ambiguous, ask the user which path should receive the install.
4. Ask the user before running any `npm install`.

## Default Input Files

The starter scripts read structured input from `.agentic/workspace/documents/` by default:

- BRD: `brd.json`
- FRD: `frd.json`
- Estimate: `estimate.json`
- Proposal: `proposal.json`
- Plan: `plan.json`
- Tasks: `tasks.json`
- Memory sync: `memory-sync.json`

The agent may also keep matching `.md` drafts beside these files for human-readable working content.

## Default Outputs

- BRD: `.docs/brd/brd.docx`
- FRD: `.docs/frd/frd.docx`
- Estimate: `.docs/estimate/estimate.xlsx`
- Proposal: `.docs/proposal/proposal.pptx`
- Plan: `.docs/plan/plan.docx` or `.docs/plan/plan.xlsx`
- Tasks: `.docs/tasks/tasks.xlsx`

## Usage Pattern

1. Use the current prompt command to build the deliverable content.
2. Save or update structured export input under `.agentic/workspace/documents/`.
3. Adapt the relevant script if the project requires a custom template or style.
4. Install the needed package only after user approval.
5. Run the script from the project root.

## Memory Sync Usage Pattern

1. During implementation work, update `.agentic/workspace/documents/memory-sync.json`.
2. Run `sync_memory.js` in `checkpoint` mode before or near the first implementation edits.
3. Run `sync_memory.js` again in `finalize` mode before concluding the task.
4. Use `@.agentic/commands/sync-memory.md` when repo memory needs a manual refresh or repair.
