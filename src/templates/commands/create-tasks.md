# Create Tasks

Read:

- `@.agentic/context.md`
- `.agentic/workspace/memory/project-overview.md`
- `.agentic/workspace/memory/requirements.md`
- `.agentic/workspace/memory/architecture.md` if it exists
- `.agentic/workspace/documents/plan.*` if it exists
- `.agentic/workspace/documents/brd.*` if it exists
- `.agentic/workspace/documents/frd.*` if it exists
- relevant files under `.agentic/workspace/project/`

## Your job

1. Maintain any internal draft content under `.agentic/workspace/documents/tasks.md` and structured export input under `.agentic/workspace/documents/tasks.json` if useful.
2. Produce the user-facing task breakdown at `.docs/tasks/tasks.xlsx`.
3. Use or update the starter script at `.agentic/workspace/scripts/generate_tasks.js` when export automation is needed.
4. If the user already provided a template file/path/reference, follow it.
5. Otherwise ask whether they want a specific task breakdown style or structure.
6. If neither a template nor a style is provided, use the built-in default structure and starter script shape.
7. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
8. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
9. Ask the user before running any `npm install`.
10. If the project's template or style requires different export logic, update `.agentic/workspace/scripts/generate_tasks.js` instead of inventing a separate export path by default.
11. Produce a practical task breakdown with modules, roles, dependencies, sequencing, and status placeholders.
12. If relevant source material is outside `.agentic/workspace/project/`, move or organize it into the workspace by default unless the user explicitly says not to.
13. If execution detail is missing, ask focused questions and keep refining instead of routing.
14. If the user explicitly asked for this task planning work, continue it directly using the existing workspace context instead of routing them backward.

When the tasks are complete enough, tell the user the available next options, and also make it clear they can ask for something else by saying what they want to do next.

- `@.agentic/commands/create-plan.md`
- `@.agentic/commands/create-proposal.md`
- `@.agentic/commands/create-brd.md`
