# Architecture

Read:

- `@.agentic/context.md`
- `.agentic/workspace/memory/project-overview.md`
- `.agentic/workspace/memory/requirements.md`
- relevant files under `.agentic/workspace/project/`
- `.agentic/workspace/memory/open-questions.md` if it exists

## Your job

1. Produce or update `.agentic/workspace/memory/architecture.md`.
2. Explain the recommended system architecture based on the known requirements.
3. Cover frontend, backend, data, integrations, authentication, deployment, and key risks when relevant.
4. Add a diagram description or mermaid diagram when supported.
5. Mention draw.io MCP only as an optional tool if available in the user's environment.
6. If relevant screenshots, notes, or references are found outside `.agentic/workspace/project/`, move or organize them into the workspace by default unless the user explicitly says not to.
7. If architecture-critical information is still missing, ask architecture-specific questions and keep updating `.agentic/workspace/memory/architecture.md` instead of routing yet.
8. Ask only the minimum blocking questions.
9. If the user directly asks for a downstream deliverable and the architecture context is already sufficient, let them continue there instead of forcing this step to repeat.
10. For UI-heavy or design-led projects, you may use Figma MCP or a similar design integration if it is available and the user approves. Otherwise rely on the design assets already placed in `.agentic/workspace/project/`.
11. Memory capture is always on for this step. Update:
   - `.agentic/workspace/memory/architecture.md`
   - `.agentic/workspace/memory/decisions.md` for major technical choices
   - `.agentic/workspace/memory/project-state.md`
   - `.agentic/workspace/memory/handoff.md`
12. If architecture work affects a specific feature, update the matching file under `.agentic/workspace/memory/features/`.

When the architecture is strong enough, tell the user the available next options, and also make it clear they can ask for something else by saying what they want to do next.

- `@.agentic/commands/create-brd.md`
- `@.agentic/commands/create-proposal.md`
- `@.agentic/commands/create-plan.md`
- `@.agentic/commands/create-tasks.md`
