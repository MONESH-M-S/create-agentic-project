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
5. Ask only the minimum blocking questions needed to implement safely.
6. Memory capture is always on for this step. Update:
   - `.agentic/workspace/memory/project-state.md`
   - `.agentic/workspace/memory/handoff.md`
   - `.agentic/workspace/memory/features/index.md`
   - `.agentic/workspace/memory/features/<feature>.md`
7. Always update the feature status after the work. Use clear states such as:
   - `planned`
   - `in-progress`
   - `completed`
   - `blocked`
8. If implementation work is finished in this session, mark the feature as `completed` or `partially completed` clearly in the feature file and reflect that in `project-state.md`.
9. Update `.agentic/workspace/memory/decisions.md` only if the work creates a meaningful product or technical decision.
10. Update `.agentic/workspace/memory/requirements.md` only if the request changes product scope or behavior expectations.
11. Update `.agentic/workspace/memory/architecture.md` only if the work changes architecture or important technical direction.
12. Keep `project-state.md` and `handoff.md` short.
13. Use one file per feature under `.agentic/workspace/memory/features/` with kebab-case naming such as:
   - `landing-page.md`
   - `about-page.md`
   - `checkout.md`
14. Use this feature file structure:
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
15. Keep `.agentic/workspace/memory/features/index.md` short and update it with:
   - feature name
   - current status
   - short summary
   - priority if useful
   - aliases or route hints if useful
   - related feature file
16. When explaining or updating a meaningful feature flow, include a Mermaid flowchart if the tool supports Mermaid. If Mermaid is not supported, store the same flow as a short ordered text flow under `User Flow`.
17. Keep flow diagrams lightweight and readable. Use them for page flow, user journey, state transitions, approval flow, or feature branches, not for full system architecture.
18. Capture key code references for the feature, such as important routes, components, pages, services, hooks, modules, or files a teammate should inspect first.
19. Keep the main feature file as the latest agreed state. Do not keep every intermediate iteration of brainstorming or planning.
20. If something materially changes, add only a short `Revision Summary` entry with:
   - date
   - what changed
   - why
21. If implementation changed the final agreed plan, update the canonical feature sections instead of appending raw plan history.
22. `project-state.md` must also be updated so the feature appears under the correct section such as current priorities, in progress, blockers, or completed work.
23. `handoff.md` must mention whether the implementation was completed, partially completed, or left blocked, and what should happen next.

When the implementation work is complete enough, tell the user the available next options and make it clear they can also say what they want to do next.

- continue implementation work
- `@.agentic/commands/create-plan.md`
- `@.agentic/commands/create-tasks.md`
- `@.agentic/commands/create-brd.md`
- `@.agentic/commands/create-proposal.md`
