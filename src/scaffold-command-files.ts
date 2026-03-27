import type { FileMap } from "./scaffold.js";

export const commandFiles: FileMap = {
  ".agentic/commands/project-requirements.md": `# Project Requirements

Read:

- \`@.agentic/context.md\`
- relevant existing files inside \`.agentic/workspace/project/\`
- \`.agentic/workspace/memory/project-overview.md\` if it exists
- \`.agentic/workspace/memory/requirements.md\` if it exists
- \`.agentic/workspace/memory/open-questions.md\` if it exists

## Your job

1. Refine and deepen the initial understanding created during \`@.agentic/init.md\`.
2. Collect any missing project explanation, goals, users, scope, screenshots, references, and known deliverables.
3. Accept either:
   - existing file paths already shared by the user, or
   - fresh explanation typed in chat
4. Move or organize project inputs into \`.agentic/workspace/project/\` by default unless the user explicitly says not to.
5. Organize and normalize the project context so later architecture and deliverable steps can rely on it.
6. Create or update:
   - \`.agentic/workspace/memory/project-overview.md\`
   - \`.agentic/workspace/memory/requirements.md\`
   - \`.agentic/workspace/memory/open-questions.md\`
7. Capture assumptions separately from confirmed facts.
8. Reduce open questions where possible before handing off.
9. If the requirement understanding is still weak or important gaps remain, continue asking focused project questions and keep updating the memory files.
10. Only ask for missing details that block useful requirement understanding.

When the requirements are strong enough, tell the user the available next options:

- \`@.agentic/commands/architecture.md\` (recommended)
- \`@.agentic/commands/create-plan.md\`
- \`@.agentic/commands/create-proposal.md\`
`,
  ".agentic/commands/architecture.md": `# Architecture

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- relevant files under \`.agentic/workspace/project/\`
- \`.agentic/workspace/memory/open-questions.md\` if it exists

## Your job

1. Produce or update \`.agentic/workspace/memory/architecture.md\`.
2. Explain the recommended system architecture based on the known requirements.
3. Cover frontend, backend, data, integrations, authentication, deployment, and key risks when relevant.
4. Add a diagram description or mermaid diagram when supported.
5. Mention draw.io MCP only as an optional tool if available in the user's environment.
6. If relevant screenshots, notes, or references are found outside \`.agentic/workspace/project/\`, move or organize them into the workspace by default unless the user explicitly says not to.
7. If architecture-critical information is still missing, ask architecture-specific questions and keep updating \`.agentic/workspace/memory/architecture.md\` instead of routing yet.
8. Ask only the minimum blocking questions.

When the architecture is strong enough, tell the user the available next options:

- \`@.agentic/commands/create-brd.md\`
- \`@.agentic/commands/create-proposal.md\`
- \`@.agentic/commands/create-plan.md\`
- \`@.agentic/commands/create-tasks.md\`
`,
  ".agentic/commands/create-brd.md": `# Create BRD

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- \`.agentic/workspace/memory/architecture.md\`
- relevant files under \`.agentic/workspace/project/\`

## Your job

1. Maintain any internal draft content under \`.agentic/workspace/documents/brd.*\` if useful.
2. Produce the user-facing BRD at \`.docs/brd/brd.docx\`.
3. Assume Node.js export scripts will later convert structured content and templates into the final \`.docx\`.
4. If the user already provided a template file/path/reference, follow it.
5. Otherwise ask whether they want a specific BRD style or structure.
6. If neither a template nor a style is provided, use the built-in default structure.
7. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
8. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
9. Ask the user before running any \`npm install\`.
10. Use confirmed facts first and clearly label assumptions where needed.
11. If relevant source material is outside \`.agentic/workspace/project/\`, move or organize it into the workspace by default unless the user explicitly says not to.
12. If critical information is missing, ask only the minimum blocking questions and keep improving the BRD draft instead of routing yet.

When the BRD is solid enough to define functional requirements, tell the user:

\`Next type @.agentic/commands/create-frd.md\`
`,
  ".agentic/commands/create-frd.md": `# Create FRD

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- \`.agentic/workspace/memory/architecture.md\`
- \`.agentic/workspace/documents/brd.*\` if it exists
- relevant files under \`.agentic/workspace/project/\`

## Your job

1. Maintain any internal draft content under \`.agentic/workspace/documents/frd.*\` if useful.
2. Produce the user-facing FRD at \`.docs/frd/frd.docx\`.
3. Assume Node.js export scripts will later convert structured content into the final \`.docx\`.
4. Keep the content behavior straightforward unless the user explicitly supplies a template or style preference.
5. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
6. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
7. Ask the user before running any \`npm install\`.
8. Cover modules, flows, validations, roles, and edge cases where relevant.
9. If relevant source material is outside \`.agentic/workspace/project/\`, move or organize it into the workspace by default unless the user explicitly says not to.
10. If important functional details are still missing, ask focused follow-up questions and keep improving the FRD instead of routing yet.
11. Ask only the minimum blocking questions.

When the FRD is strong enough for estimation, tell the user:

\`Next type @.agentic/commands/create-estimate.md\`
`,
  ".agentic/commands/create-estimate.md": `# Create Estimate

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- \`.agentic/workspace/memory/architecture.md\`
- \`.agentic/workspace/documents/brd.*\` if it exists
- \`.agentic/workspace/documents/frd.*\` if it exists

## Your job

1. Maintain any internal draft content under \`.agentic/workspace/documents/estimate.*\` if useful.
2. Produce the user-facing estimate at \`.docs/estimate/estimate.xlsx\`.
3. Assume Node.js export scripts will later convert structured content and templates into the final \`.xlsx\`.
4. If the user already provided a template file/path/reference, follow it.
5. Otherwise ask whether they want a specific estimate style or structure.
6. If neither a template nor a style is provided, use the built-in default structure.
7. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
8. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
9. Ask the user before running any \`npm install\`.
10. Keep the estimate aligned with the known scope and clearly state uncertainty.
11. If relevant source material is outside \`.agentic/workspace/project/\`, move or organize it into the workspace by default unless the user explicitly says not to.
12. If the estimate is too uncertain because key delivery information is missing, ask focused follow-up questions and keep refining the estimate instead of routing yet.
13. Ask only the minimum blocking questions.

When the estimate is strong enough for proposal drafting, tell the user:

\`Next type @.agentic/commands/create-proposal.md\`
`,
  ".agentic/commands/create-proposal.md": `# Create Proposal

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- \`.agentic/workspace/memory/architecture.md\`
- \`.agentic/workspace/documents/brd.*\` if it exists
- \`.agentic/workspace/documents/frd.*\` if it exists
- \`.agentic/workspace/documents/estimate.*\` if it exists

## Your job

1. Maintain any internal draft content under \`.agentic/workspace/documents/proposal.*\` if useful.
2. Produce the user-facing proposal at \`.docs/proposal/proposal.pptx\`.
3. Assume Node.js export scripts will later convert structured content and templates into the final \`.pptx\`.
4. Keep the prompt focused on presentation-ready content unless the user explicitly provides a template or style preference.
5. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
6. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
7. Ask the user before running any \`npm install\`.
8. Make gaps explicit instead of inventing details.
9. If relevant screenshots, decks, notes, or references are found outside \`.agentic/workspace/project/\`, move or organize them into the workspace by default unless the user explicitly says not to.
10. If key proposal inputs are still missing, ask focused questions and keep improving the proposal instead of prematurely declaring completion.
11. Ask only the minimum blocking questions.

When the proposal is complete enough for handoff, tell the user the workflow is complete and list the generated files.
`,
  ".agentic/commands/create-plan.md": `# Create Plan

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- \`.agentic/workspace/memory/architecture.md\` if it exists
- relevant files under \`.agentic/workspace/project/\`

## Your job

1. Maintain any internal draft content under \`.agentic/workspace/documents/plan.*\` if useful.
2. If the user has not already specified the preferred plan output, ask whether they want:
   - a document-style plan, or
   - a spreadsheet-style plan
3. If the user already provided a template file/path/reference, follow it.
4. Otherwise ask whether they want a specific plan style or structure.
5. If neither a template nor a style is provided, use the built-in default structure.
6. Produce the user-facing output at:
   - \`.docs/plan/plan.docx\` for document-style plan output, or
   - \`.docs/plan/plan.xlsx\` for spreadsheet-style plan output
7. Assume Node.js export scripts will later convert structured content and templates into the final output format.
8. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
9. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
10. Ask the user before running any \`npm install\`.
11. Include phases, milestones, dependencies, assumptions, risks, and sequencing.
12. If relevant source material is outside \`.agentic/workspace/project/\`, move or organize it into the workspace by default unless the user explicitly says not to.
13. If planning inputs are missing, ask focused questions and keep refining instead of routing.

When the plan is complete enough, tell the user the available next options:

- \`@.agentic/commands/architecture.md\`
- \`@.agentic/commands/create-tasks.md\`
- \`@.agentic/commands/create-brd.md\`
- \`@.agentic/commands/create-proposal.md\`
`,
  ".agentic/commands/create-tasks.md": `# Create Tasks

Read:

- \`@.agentic/context.md\`
- \`.agentic/workspace/memory/project-overview.md\`
- \`.agentic/workspace/memory/requirements.md\`
- \`.agentic/workspace/memory/architecture.md\` if it exists
- \`.agentic/workspace/documents/plan.*\` if it exists
- \`.agentic/workspace/documents/brd.*\` if it exists
- \`.agentic/workspace/documents/frd.*\` if it exists
- relevant files under \`.agentic/workspace/project/\`

## Your job

1. Maintain any internal draft content under \`.agentic/workspace/documents/tasks.*\` if useful.
2. Produce the user-facing task breakdown at \`.docs/tasks/tasks.xlsx\`.
3. Assume Node.js export scripts will later convert structured content and templates into the final \`.xlsx\`.
4. If the user already provided a template file/path/reference, follow it.
5. Otherwise ask whether they want a specific task breakdown style or structure.
6. If neither a template nor a style is provided, use the built-in default structure.
7. If export dependencies are needed, first check whether the target project root already has a usable Node environment.
8. Prefer the project root if it is suitable; otherwise ask the user which path should receive the install.
9. Ask the user before running any \`npm install\`.
10. Produce a practical task breakdown with modules, roles, dependencies, sequencing, and status placeholders.
11. If relevant source material is outside \`.agentic/workspace/project/\`, move or organize it into the workspace by default unless the user explicitly says not to.
12. If execution detail is missing, ask focused questions and keep refining instead of routing.

When the tasks are complete enough, tell the user the available next options:

- \`@.agentic/commands/create-plan.md\`
- \`@.agentic/commands/create-proposal.md\`
- \`@.agentic/commands/create-brd.md\`
`,
};
