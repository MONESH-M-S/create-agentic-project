# Init

Read `@.agentic/context.md` first.

You are starting a fresh AI session inside this project. Your job is to quickly understand what this project is, what context already exists, what stage the project is already in, and what the user still needs from this session.

## Read Scope

1. Read only root-level files and folders in the current project.
2. Do not recursively inspect the full repository.
3. Treat `.agentic/` as the exception:
   - inspect `.agentic/workspace/project/`
   - inspect `.agentic/workspace/memory/`
   - inspect `.agentic/workspace/documents/`
   - inspect `.docs/`
4. Use existing workspace context if it is already present.

## Response Style

1. Be concise and synthesis-first.
2. Do not dump a full file inventory unless the user explicitly asks.
3. Do not mirror the prompt structure back to the user.
4. Respond with either:
   - a short synthesized summary of what you understand, or
   - a few focused questions if important context is still missing
5. When meaningful memory already exists, default to resume behavior rather than first-time intake behavior.

## What To Do

1. Infer what kind of project this is from the root-level signals.
2. Check whether `.agentic/workspace/project/`, `.agentic/workspace/memory/`, `.agentic/workspace/documents/`, and `.docs/` already contain useful context and progress markers.
3. Build the best current understanding from:
   - root-level signals
   - existing workspace files
   - the user's message in this chat
4. Treat repo memory under `.agentic/workspace/memory/` as the shared source of truth across tools and sessions.
5. If `project-overview.md`, `requirements.md`, `architecture.md`, `project-state.md`, internal drafts, or user-facing outputs already exist, treat this as an in-progress workspace and resume from what is already known.
6. In resumed sessions:
   - give a short summary of what is already understood
   - summarize current project state, active features, blockers, and next actions when that information exists
   - prioritize `.agentic/workspace/memory/features/index.md` as the quick feature summary when it exists
   - mention only the most important missing or uncertain pieces
   - do not ask basic project questions again unless the existing memory is clearly incomplete, contradictory, or missing a blocking detail
   - if the user adds new context, update the relevant memory files before suggesting what to do next
   - suggest valid next commands based on the current progress instead of forcing `@.agentic/commands/project-requirements.md`
7. Memory capture is always on. Do not require a separate memory-capture prompt to store useful project information.
8. If the user directly asks to create, continue, or implement something and the existing context is sufficient, follow that request instead of routing them back through the recommended sequence.
   - treat page work, feature work, component work, route work, and flow changes as implementation work
   - use the behavior of `@.agentic/commands/implementation.md` even if the user did not explicitly tag it
   - update the relevant feature file, `project-state.md`, and `handoff.md` before finishing
9. If project context is still thin, ask a small number of targeted questions about:
   - project goal
   - target users
   - scope or modules
   - available references such as screenshots, docs, notes, links, or file paths
   - desired outputs
10. When design references are important and the user mentions Figma, you may suggest using Figma MCP if it is available in the environment, but ask the user before using it. If it is not available, ask for screenshots, exported frames, links, or file paths and continue normally.
11. Judge the current context level before suggesting what comes next:
   - `partial context`: there is only a high-level understanding and important requirement detail is still missing
   - `sufficient requirements`: the project is understandable enough to move into architecture, but requirement refinement could still improve the result
   - `strong requirements`: the requirement understanding is detailed enough that architecture is the clear recommended next step
12. If enough context exists, give a short summary of the project and the most important missing pieces.
13. If the user mentions screenshots, notes, requirement docs, links, or file paths, move or organize them into `.agentic/workspace/project/` by default unless the user explicitly says not to.
14. After the first useful exchange, create or update:
   - `.agentic/workspace/memory/project-overview.md`
   - `.agentic/workspace/memory/requirements.md`
   - `.agentic/workspace/memory/open-questions.md`
   - `.agentic/workspace/memory/project-state.md`
   - `.agentic/workspace/memory/handoff.md`
15. Update `.agentic/workspace/memory/architecture.md` only if the new context changes architecture.
16. If the user is discussing a specific feature, create or update a feature file under `.agentic/workspace/memory/features/` using kebab-case naming and include: feature name, current status, summary, requirements, implementation notes, dependencies, blockers, decisions affecting the feature, related docs, and next steps.
17. Use module-first feature identity. Routes, screens, and alternate names should be treated as aliases or metadata attached to a canonical feature file.
18. If `.agentic/workspace/memory/features/index.md` exists, use it as the quick lookup layer for feature status before reading deeper feature files.
19. When the user asks about a specific feature, resolve likely matches by feature name, aliases, routes, or screens.
20. If one clear match exists, read the feature file and explain its status and flow from there. Show a Mermaid diagram if the environment supports Mermaid, otherwise explain the same flow in short ordered text.
21. If multiple likely matches exist, ask a short clarification question instead of guessing.
22. Write drafts even from partial information.
23. Clearly separate confirmed facts, assumptions, and open questions.
24. Do not route immediately just because the workspace is empty. Do useful synthesis or ask focused questions first.
25. Do not rewrite unrelated files just because `@.agentic/init.md` ran.
26. If important project basics are still missing, continue asking focused questions and keep updating the memory files instead of routing forward yet.
27. When suggesting next commands in resumed sessions, use the existing progress:
   - if requirements exist but architecture does not, recommend `@.agentic/commands/architecture.md`
   - if the user is asking for coding or feature work, allow `@.agentic/commands/implementation.md`
   - if architecture exists, suggest `@.agentic/commands/create-brd.md`, `@.agentic/commands/create-proposal.md`, `@.agentic/commands/create-plan.md`, and `@.agentic/commands/create-tasks.md`
   - if BRD work already exists, also allow `@.agentic/commands/create-frd.md`
   - if FRD work already exists, also allow `@.agentic/commands/create-estimate.md`
   - if estimate work already exists, also allow `@.agentic/commands/create-proposal.md`
28. For first-time projects, choose the handoff style based on the context level:
   - if the context is still partial, say you have a high-level understanding and offer:
     - `@.agentic/commands/project-requirements.md` to refine requirements further
     - `@.agentic/commands/architecture.md` only if the user wants to move forward with the current understanding
   - if the requirements are sufficient but not strong, present both `@.agentic/commands/project-requirements.md` and `@.agentic/commands/architecture.md`, with a light recommendation based on the remaining gaps
   - if the requirements are strong, recommend `@.agentic/commands/architecture.md`
29. Never make architecture sound mandatory when the current understanding is still high level.
30. When offering next steps, always make it clear the user can also say what they want to do now instead of following a listed command.
