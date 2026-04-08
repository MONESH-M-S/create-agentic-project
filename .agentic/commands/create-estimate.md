# Create Estimate

Read:

- `@.agentic/context.md`
- `.agentic/workspace/memory/project-overview.md`
- `.agentic/workspace/memory/requirements.md`
- `.agentic/workspace/memory/architecture.md`
- `.agentic/workspace/documents/brd.*` if it exists
- `.agentic/workspace/documents/frd.*` if it exists

## Your job

1. Maintain any internal draft content under `.agentic/workspace/documents/estimate.md` and structured export input under `.agentic/workspace/documents/estimate.json` if useful.
2. Produce the user-facing estimate at `.docs/estimate/estimate.xlsx`.
3. Use or update the starter script at `.agentic/workspace/scripts/generate_estimate.js` when export automation is needed.
4. If the user already provided a template file/path/reference, follow it.
5. Otherwise ask whether they want a specific estimate style or structure.
6. If neither a template nor a style is provided, use the built-in default structure and starter script shape.
7. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
8. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
9. Ask the user before running any `npm install`.
10. If the project's template or style requires different export logic, update `.agentic/workspace/scripts/generate_estimate.js` instead of inventing a separate export path by default.
11. Keep the estimate aligned with the known scope and clearly state uncertainty.
12. If relevant source material is outside `.agentic/workspace/project/`, move or organize it into the workspace by default unless the user explicitly says not to.
13. If the estimate is too uncertain because key delivery information is missing, ask focused follow-up questions and keep refining the estimate instead of routing yet.
14. Ask only the minimum blocking questions.
15. If the user explicitly asked for this estimate work, continue it directly using the existing workspace context instead of routing them backward.
16. Memory capture is always on for this step. Update:
   - `.agentic/workspace/memory/project-state.md`
   - `.agentic/workspace/memory/handoff.md`
   - `.agentic/workspace/memory/next-actions.md` if follow-up work remains
   - `.agentic/workspace/memory/decisions.md` if this step creates a meaningful product or technical decision
17. If this estimate work materially affects one or more features, update the matching feature files under `.agentic/workspace/memory/features/`.

When the estimate is strong enough for proposal drafting, recommend the next command and also make it clear the user can say what they want to do now:

`Next type @.agentic/commands/create-proposal.md`
