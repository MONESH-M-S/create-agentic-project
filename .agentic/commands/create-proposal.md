# Create Proposal

Read:

- `@.agentic/context.md`
- `.agentic/workspace/memory/project-overview.md`
- `.agentic/workspace/memory/requirements.md`
- `.agentic/workspace/memory/architecture.md`
- `.agentic/workspace/documents/brd.*` if it exists
- `.agentic/workspace/documents/frd.*` if it exists
- `.agentic/workspace/documents/estimate.*` if it exists

## Your job

1. Maintain any internal draft content under `.agentic/workspace/documents/proposal.md` and structured export input under `.agentic/workspace/documents/proposal.json` if useful.
2. Produce the user-facing proposal at `.docs/proposal/proposal.pptx`.
3. Use or update the starter script at `.agentic/workspace/scripts/generate_proposal.js` when export automation is needed.
4. Keep the prompt focused on presentation-ready content unless the user explicitly provides a template or style preference.
5. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
6. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
7. Ask the user before running any `npm install`.
8. If the project's template or style requires different export logic, update `.agentic/workspace/scripts/generate_proposal.js` instead of inventing a separate export path by default.
9. Make gaps explicit instead of inventing details.
10. If relevant screenshots, decks, notes, or references are found outside `.agentic/workspace/project/`, move or organize them into the workspace by default unless the user explicitly says not to.
11. If key proposal inputs are still missing, ask focused questions and keep improving the proposal instead of prematurely declaring completion.
12. Ask only the minimum blocking questions.
13. If the user explicitly asked for this proposal work, continue it directly using the existing workspace context instead of routing them backward.
14. Memory capture is always on for this step. Update:
   - `.agentic/workspace/memory/project-state.md`
   - `.agentic/workspace/memory/handoff.md`
   - `.agentic/workspace/memory/next-actions.md` if follow-up work remains
   - `.agentic/workspace/memory/decisions.md` if this step creates a meaningful product or technical decision
15. If this proposal work materially affects one or more features, update the matching feature files under `.agentic/workspace/memory/features/`.

When the proposal is complete enough for handoff, tell the user the workflow is complete and list the generated files.
