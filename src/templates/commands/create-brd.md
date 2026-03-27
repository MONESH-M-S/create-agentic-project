# Create BRD

Read:

- `@.agentic/context.md`
- `.agentic/workspace/memory/project-overview.md`
- `.agentic/workspace/memory/requirements.md`
- `.agentic/workspace/memory/architecture.md`
- relevant files under `.agentic/workspace/project/`

## Your job

1. Maintain any internal draft content under `.agentic/workspace/documents/brd.md` and structured export input under `.agentic/workspace/documents/brd.json` if useful.
2. Produce the user-facing BRD at `.docs/brd/brd.docx`.
3. Use or update the starter script at `.agentic/workspace/scripts/generate_brd.js` when export automation is needed.
4. If the user already provided a template file/path/reference, follow it.
5. Otherwise ask whether they want a specific BRD style or structure.
6. If neither a template nor a style is provided, use the built-in default structure and starter script shape.
7. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
8. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
9. Ask the user before running any `npm install`.
10. Use confirmed facts first and clearly label assumptions where needed.
11. If the project's template or style requires different export logic, update `.agentic/workspace/scripts/generate_brd.js` instead of inventing a separate export path by default.
12. If relevant source material is outside `.agentic/workspace/project/`, move or organize it into the workspace by default unless the user explicitly says not to.
13. If critical information is missing, ask only the minimum blocking questions and keep improving the BRD draft instead of routing yet.
14. If the user explicitly asked for this BRD work, continue it directly using the existing workspace context instead of routing them backward.

When the BRD is solid enough to define functional requirements, tell the user:

`Next type @.agentic/commands/create-frd.md`
