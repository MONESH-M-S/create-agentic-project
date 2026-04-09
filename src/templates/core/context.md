# Context

This repository uses a prompt-based project kick-off system.

## Folder Map

- `.agentic/init.md`: session bootstrap prompt
- `.agentic/context.md`: shared rules and folder semantics
- `.agentic/commands/`: prompt files for distinct tasks
- `.agentic/commands/implementation.md`: implementation and feature-work prompt
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

Figma MCP or a similar design integration is optional. If it is available, it may be used to inspect designs or gather screenshots, but ask the user before using it. If it is not available, continue with screenshots, exported frames, links, or files placed under `.agentic/workspace/project/`.

### Memory

Use `.agentic/workspace/memory/` for:

- `project-overview.md`
- `requirements.md`
- `open-questions.md`
- `architecture.md`
- `project-state.md`
- `decisions.md`
- `next-actions.md`
- `handoff.md`
- `features/index.md` for quick feature lookup
- `features/` for one file per feature or workstream
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
2. Do not scan the whole repository by default, but do inspect the relevant codebase areas when the task requires it.
3. If relevant project assets are outside `.agentic/workspace/project/`, move them into the workspace by default and then use the workspace copy.
4. Only avoid moving files when the user explicitly asks to keep them in place.
5. Keep internal working material in `.agentic/workspace/` and user-facing deliverables in `.docs/`.
6. Treat `.agentic/workspace/memory/` as the canonical shared project memory across tools and sessions.
7. Do not rely on tool-local memory paths such as `~/.codex/...` as the primary source of truth.
8. Store outcomes, decisions, feature state, blockers, handoff notes, and next actions instead of raw chat transcripts.
9. In a fresh chat, treat existing memory files and existing outputs as the primary source of truth for resume behavior.
10. Do not restart basic intake if the workspace already contains strong memory unless the existing information is clearly incomplete or contradictory.
11. Use `.agentic/workspace/memory/` as the primary shared memory layer, but inspect relevant code outside `.agentic` when the user asks about implemented work, project structure, or when memory needs validation.
12. If code and memory disagree, prefer truth from the codebase and refresh memory accordingly.
13. When implementation details came from code inspection outside `.agentic`, make that clear in the response.
14. If the user directly asks for a specific deliverable, feature discussion, or implementation task and enough context already exists, do the work and capture the outcome automatically in the relevant memory files.
15. Update only the memory files affected by the current work instead of rewriting everything.
16. In fresh-project init, treat “understand/store the project context first” as a valid context-only mode.
17. In context-only mode, update repo memory and summarize what is known, but do not create implementation plans, architecture output, or delivery-oriented artifacts yet.
18. In fresh-project init, treat “refine requirements” as requirements-discovery mode, not implementation mode.
19. In requirements-discovery mode, keep asking requirement questions and updating memory unless the user explicitly asks to build something or a concrete implementation decision is truly necessary.
20. Do not create implementation plan artifacts by default for normal feature work.
21. If the current chat is already in implementation work, keep using implementation-memory behavior for later coding requests unless the user clearly changes to a different topic.
22. For normal coding work, update:
   - `.agentic/workspace/memory/features/index.md`
   - the relevant feature file under `.agentic/workspace/memory/features/`
   - `.agentic/workspace/memory/project-state.md`
   - `.agentic/workspace/memory/handoff.md`
23. When implementation work changes feature progress, always update the feature status and reflect that same status in `project-state.md` and `handoff.md`.
24. Attach follow-up UI changes, state changes, API wiring, mock endpoints, and related backend support to the active parent feature by default.
25. Only split follow-up work into a separate feature when it is clearly independent, reusable across multiple areas, or the user explicitly wants it tracked separately.
26. If the request is cross-cutting but arrives in the middle of an active feature implementation session, attach it to that active parent feature by default and note the broader impact in `Related Areas`.
27. If the request could reasonably belong to multiple parent features, ask a short clarification question before updating memory.
28. Use `features/index.md` as the quick summary layer and individual feature files as the detailed source of truth.
29. Use module-first canonical feature identity. Routes, screens, and alternate names should be stored as metadata or aliases under the same feature instead of becoming separate primary records.
30. If a user references a route or screen such as `/dashboard`, first try to match an existing feature by feature name, aliases, routes, or screens.
31. If more than one likely feature matches, ask a short clarification question before updating memory.
32. When a feature flow is important for understanding, store it in the feature file. Prefer Mermaid when the tool supports it, otherwise store the same flow as short ordered text.
33. Capture key code references in the feature file so teammates can quickly find the relevant routes, pages, components, services, API handlers, mock-data files, or modules.
34. Keep the latest agreed state in the main feature file and store only a short revision summary for meaningful changes.
35. Update `.agentic/workspace/memory/decisions.md` only when the work creates a meaningful product or technical decision.
36. Update `.agentic/workspace/memory/requirements.md` or `.agentic/workspace/memory/architecture.md` only when the current work actually changes them.
37. For implementation work, use two-phase memory capture:
   - start checkpoint before or near the first implementation edits
   - final sync before concluding the task
38. Use `.agentic/workspace/documents/memory-sync.json` as the structured handoff for implementation memory sync.
39. Use `.agentic/workspace/scripts/sync_memory.js` as the enforcement helper instead of manually editing all memory targets freehand every time.
40. The start checkpoint should mark the active parent feature as `in-progress` and show the current implementation focus in the feature file and `project-state.md`.
41. The final sync should update the feature file, `features/index.md`, `project-state.md`, and `handoff.md` with the completed, partially completed, or blocked outcome.
42. Before concluding any coding step, make sure the final sync happened through `.agentic/workspace/scripts/sync_memory.js`. If it did not, the implementation step is incomplete.
43. Users normally should not need to run memory sync manually, but `@.agentic/commands/sync-memory.md` is available as an optional recovery path when memory is stale or missed.
44. Prefer the target project root for Node-based export dependencies when a usable Node setup already exists there.
45. If root is not suitable, ask the user which path should be used for dependency installation.
46. Ask the user before running any install command.
47. Ask only the minimum blocking questions required to continue.
48. Always end by telling the user the exact next command to run or listing the available next options.
