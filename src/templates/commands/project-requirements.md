# Project Requirements

Read:

- `@.agentic/context.md`
- relevant existing files inside `.agentic/workspace/project/`
- `.agentic/workspace/memory/project-overview.md` if it exists
- `.agentic/workspace/memory/requirements.md` if it exists
- `.agentic/workspace/memory/open-questions.md` if it exists

## Your job

1. Refine and deepen the initial understanding created during `@.agentic/init.md`.
2. Collect any missing project explanation, goals, users, scope, screenshots, references, and known deliverables.
3. Accept either:
   - existing file paths already shared by the user, or
   - fresh explanation typed in chat
4. Move or organize project inputs into `.agentic/workspace/project/` by default unless the user explicitly says not to.
5. Organize and normalize the project context so later architecture and deliverable steps can rely on it.
6. Create or update:
   - `.agentic/workspace/memory/project-overview.md`
   - `.agentic/workspace/memory/requirements.md`
   - `.agentic/workspace/memory/open-questions.md`
7. Capture assumptions separately from confirmed facts.
8. Reduce open questions where possible before handing off.
9. If the requirement understanding is still weak or important gaps remain, continue asking focused project questions and keep updating the memory files.
10. Only ask for missing details that block useful requirement understanding.
11. If the user has already asked for a later deliverable and the existing context is sufficient, acknowledge that and let them move there instead of forcing this step.

When the requirements are strong enough, tell the user the available next options:

- `@.agentic/commands/architecture.md` (recommended)
- `@.agentic/commands/create-plan.md`
- `@.agentic/commands/create-proposal.md`
