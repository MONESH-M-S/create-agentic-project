# Implementation

Read:

- `@.agentic/context.md`
- `.agentic/workspace/memory/project-state.md`
- `.agentic/workspace/memory/handoff.md`
- `.agentic/workspace/memory/decisions.md` if it exists
- `.agentic/workspace/memory/project-overview.md` if it exists
- `.agentic/workspace/memory/requirements.md` if it exists
- `.agentic/workspace/memory/architecture.md` if it exists
- relevant feature files under `.agentic/workspace/memory/features/` if they exist
- relevant files under `.agentic/workspace/project/`

## Your job

1. Handle direct coding, feature, page, flow, or implementation requests.
2. Identify the affected feature or create a new feature record if needed.
   - use one canonical module or feature file as the source of truth
   - treat routes, screens, page names, and alternate labels as aliases or metadata, not as separate primary records
   - first try to match an existing feature by feature name, aliases, routes, or screens
   - if there is more than one plausible match, ask a short confirmation question before updating the wrong feature
   - only create a new feature file if no reasonable match exists
3. Do the requested implementation work using the existing project context.
4. If the user asks for a page, route, feature, component, or flow change, treat that as implementation work even if they did not tag a command.
5. If the current chat is already in implementation work, keep using implementation-memory behavior for later coding requests unless the user clearly changes to a different topic.
6. Follow-up UI changes, state changes, API wiring, mock endpoints, and related backend support should attach to the active parent feature by default.
   - examples that should usually stay under the same parent feature:
     - landing page redesign
     - theme support used by that landing page experience
     - landing-page APIs returning mock data
   - only split into a separate feature if the work is clearly independent, reusable across multiple areas, or the user explicitly wants it tracked separately
   - if multiple parent features are plausible, ask a short clarification question before updating memory
7. Ask only the minimum blocking questions needed to implement safely.
8. If the work is cross-cutting but requested in the middle of an active feature implementation session, attach it to that active parent feature by default and note the broader impact in `Related Areas`.
9. For APIs or data work created to support an active feature, store them under that same parent feature by default and capture the endpoints, purpose, and main files in `Implementation Notes` and `Key Code References`.
10. Memory capture is always on for this step and happens through `.agentic/workspace/scripts/sync_memory.js` using `.agentic/workspace/documents/memory-sync.json`.
11. Start checkpoint, before or near the first implementation edits:
   - identify or confirm the active parent feature
   - prepare or update `.agentic/workspace/documents/memory-sync.json` with:
     - `mode` = `checkpoint`
     - the active feature identity
     - `Current Status` = `in-progress`
     - a short note about what is being changed now
     - related route or screen if relevant
   - run `.agentic/workspace/scripts/sync_memory.js` so the feature file and `project-state.md` reflect active implementation work
   - update `handoff.md` during checkpoint only when useful for long-running or interrupted work
12. Final sync, before concluding the task:
   - update `.agentic/workspace/documents/memory-sync.json` with:
     - `mode` = `finalize`
     - final status such as `completed`, `partially completed`, or `blocked`
     - latest implementation notes
     - key code references
     - related areas if the work had cross-cutting impact
     - a short revision note when the change was meaningful
     - project-state and handoff summary
   - run `.agentic/workspace/scripts/sync_memory.js` to update:
     - `.agentic/workspace/memory/features/<feature>.md`
     - `.agentic/workspace/memory/features/index.md`
     - `.agentic/workspace/memory/project-state.md`
     - `.agentic/workspace/memory/handoff.md`
13. Use `.agentic/commands/sync-memory.md` as the manual recovery path when earlier implementation work missed or partially captured memory.
14. Always update the feature status after the work. Use clear states such as:
   - `planned`
   - `in-progress`
   - `completed`
   - `blocked`
15. If implementation work is finished in this session, mark the feature as `completed` or `partially completed` clearly in the feature file and reflect that in `project-state.md`.
16. Update `.agentic/workspace/memory/decisions.md` only if the work creates a meaningful product or technical decision.
17. Update `.agentic/workspace/memory/requirements.md` only if the request changes product scope or behavior expectations.
18. Update `.agentic/workspace/memory/architecture.md` only if the work changes architecture or important technical direction.
19. Keep `project-state.md` and `handoff.md` short.
20. Use one file per feature under `.agentic/workspace/memory/features/` with kebab-case naming such as:
   - `landing-page.md`
   - `about-page.md`
   - `checkout.md`
21. Use this feature file structure:
   - Feature Name
   - Current Status
   - Aliases
   - Routes / Screens
   - Related Areas
   - Summary
   - User Flow
   - Mermaid Flow Diagram
   - Requirements
   - Implementation Notes
   - Key Code References
   - Dependencies
   - Blockers
   - Decisions Affecting This Feature
   - Related Outputs or Docs
   - Revision Summary
   - Next Steps
22. Keep `.agentic/workspace/memory/features/index.md` short and update it with:
   - feature name
   - current status
   - short summary
   - priority if useful
   - aliases or route hints if useful
   - related feature file
23. When explaining or updating a meaningful feature flow, include a Mermaid flowchart if the tool supports Mermaid. If Mermaid is not supported, store the same flow as a short ordered text flow under `User Flow`.
24. Keep flow diagrams lightweight and readable. Use them for page flow, user journey, state transitions, approval flow, or feature branches, not for full system architecture.
25. Capture key code references for the feature, such as important routes, components, pages, services, hooks, modules, API handlers, mock-data files, or other modules a teammate should inspect first.
26. Keep the main feature file as the latest agreed state. Do not keep every intermediate iteration of brainstorming or planning.
27. If something materially changes, add only a short `Revision Summary` entry with:
   - date
   - what changed
   - why
28. If implementation changed the final agreed plan, update the canonical feature sections instead of appending raw plan history.
29. `project-state.md` must also be updated so the feature appears under the correct section such as current priorities, in progress, blockers, or completed work.
30. `handoff.md` must mention whether the implementation was completed, partially completed, or left blocked, and what should happen next.
31. Before concluding any coding step, complete the final sync through `.agentic/workspace/scripts/sync_memory.js`. If the feature file, `features/index.md`, `project-state.md`, and `handoff.md` were not updated, the implementation step is incomplete and should not be treated as done.

When the implementation work is complete enough, tell the user the available next options and make it clear they can also say what they want to do next.

- continue implementation work
- `@.agentic/commands/create-plan.md`
- `@.agentic/commands/create-tasks.md`
- `@.agentic/commands/create-brd.md`
- `@.agentic/commands/create-proposal.md`
