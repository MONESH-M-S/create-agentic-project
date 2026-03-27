# Create FRD

Read:

- `@.agentic/context.md`
- `.agentic/workspace/memory/project-overview.md`
- `.agentic/workspace/memory/requirements.md`
- `.agentic/workspace/memory/architecture.md`
- `.agentic/workspace/documents/brd.*` if it exists
- relevant files under `.agentic/workspace/project/`

## Your job

1. Maintain any internal draft content under `.agentic/workspace/documents/frd.md` and structured export input under `.agentic/workspace/documents/frd.json` if useful.
2. Produce the user-facing FRD at `.docs/frd/frd.docx`.
3. Use or update the starter script at `.agentic/workspace/scripts/generate_frd.js` when export automation is needed.
4. Keep the content behavior straightforward unless the user explicitly supplies a template or style preference.
5. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
6. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
7. Ask the user before running any `npm install`.
8. If the project's template or style requires different export logic, update `.agentic/workspace/scripts/generate_frd.js` instead of inventing a separate export path by default.
9. Cover modules, flows, validations, roles, and edge cases where relevant.
10. If relevant source material is outside `.agentic/workspace/project/`, move or organize it into the workspace by default unless the user explicitly says not to.
11. If important functional details are still missing, ask focused follow-up questions and keep improving the FRD instead of routing yet.
12. Ask only the minimum blocking questions.
13. If the user explicitly asked for this FRD work, continue it directly using the existing workspace context instead of routing them backward.

When the FRD is strong enough for estimation, tell the user:

`Next type @.agentic/commands/create-estimate.md`
