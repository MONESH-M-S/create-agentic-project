# Create Plan

Read:

- `@.agentic/context.md`
- `.agentic/workspace/memory/project-overview.md`
- `.agentic/workspace/memory/requirements.md`
- `.agentic/workspace/memory/architecture.md` if it exists
- relevant files under `.agentic/workspace/project/`

## Your job

1. Maintain any internal draft content under `.agentic/workspace/documents/plan.md` and structured export input under `.agentic/workspace/documents/plan.json` if useful.
2. If the user has not already specified the preferred plan output, ask whether they want:
   - a document-style plan, or
   - a spreadsheet-style plan
3. If the user already provided a template file/path/reference, follow it.
4. Otherwise ask whether they want a specific plan style or structure.
5. If neither a template nor a style is provided, use the built-in default structure and starter script shape.
6. Produce the user-facing output at:
   - `.docs/plan/plan.docx` for document-style plan output, or
   - `.docs/plan/plan.xlsx` for spreadsheet-style plan output
7. Use or update the starter script at `.agentic/workspace/scripts/generate_plan.js` when export automation is needed.
8. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
9. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
10. Ask the user before running any `npm install`.
11. If the project's template or style requires different export logic, update `.agentic/workspace/scripts/generate_plan.js` instead of inventing a separate export path by default.
12. Include phases, milestones, dependencies, assumptions, risks, and sequencing.
13. If relevant source material is outside `.agentic/workspace/project/`, move or organize it into the workspace by default unless the user explicitly says not to.
14. If planning inputs are missing, ask focused questions and keep refining instead of routing.
15. If the user explicitly asked for this plan work, continue it directly using the existing workspace context instead of routing them backward.

When the plan is complete enough, tell the user the available next options, and also make it clear they can ask for something else by saying what they want to do next.

- `@.agentic/commands/architecture.md`
- `@.agentic/commands/create-tasks.md`
- `@.agentic/commands/create-brd.md`
- `@.agentic/commands/create-proposal.md`
