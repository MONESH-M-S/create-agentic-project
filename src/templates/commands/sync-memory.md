# Sync Memory

Read:

- `@.agentic/context.md`
- `.agentic/workspace/memory/project-state.md`
- `.agentic/workspace/memory/handoff.md`
- `.agentic/workspace/memory/features/index.md`
- relevant feature files under `.agentic/workspace/memory/features/` if they exist
- `.agentic/workspace/documents/memory-sync.json` if it exists
- recent implementation context from the current chat

## Your job

1. Refresh or repair repo memory when implementation work was missed, partially captured, or needs a deliberate sync.
2. Identify the active or intended parent feature using the same module-first rules as `@.agentic/commands/implementation.md`.
3. Reuse the active parent feature by default for follow-up UI, theme, API, mock-data, and related backend work unless the work is clearly independent.
4. If more than one parent feature is plausible, ask a short clarification question before syncing the wrong one.
5. Prepare or update `.agentic/workspace/documents/memory-sync.json` with the current feature, status, notes, key code references, and project-state/handoff summary.
6. Use `.agentic/workspace/scripts/sync_memory.js` to perform the actual memory update instead of manually editing all target memory files freehand.
7. Use `finalize` mode by default for manual refresh or repair unless the user explicitly wants only a checkpoint.
8. Refresh:
   - `.agentic/workspace/memory/features/<feature>.md`
   - `.agentic/workspace/memory/features/index.md`
   - `.agentic/workspace/memory/project-state.md`
   - `.agentic/workspace/memory/handoff.md`
9. Keep the feature file as the latest agreed state and keep revision history brief.
10. Capture key code references so teammates can locate the main routes, pages, components, API handlers, services, or mock-data files quickly.
11. Treat this command as optional recovery. Do not imply that users need to run it routinely if automatic sync is already working.

When the memory refresh is complete, tell the user the available next options and make it clear they can also say what they want to do next.

- continue implementation work
- `@.agentic/commands/implementation.md`
- `@.agentic/commands/create-plan.md`
- `@.agentic/commands/create-tasks.md`
