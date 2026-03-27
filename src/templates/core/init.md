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
4. If `project-overview.md`, `requirements.md`, `architecture.md`, internal drafts, or user-facing outputs already exist, treat this as an in-progress workspace and resume from what is already known.
5. In resumed sessions:
   - give a short summary of what is already understood
   - mention only the most important missing or uncertain pieces
   - do not ask basic project questions again unless the existing memory is clearly incomplete, contradictory, or missing a blocking detail
   - if the user adds new context, update the relevant memory files before suggesting what to do next
   - suggest valid next commands based on the current progress instead of forcing `@.agentic/commands/project-requirements.md`
6. If the user directly asks to create or continue a specific deliverable and the existing context is sufficient, follow that request instead of routing them back through the recommended sequence.
7. If project context is still thin, ask a small number of targeted questions about:
   - project goal
   - target users
   - scope or modules
   - available references such as screenshots, docs, notes, links, or file paths
   - desired outputs
8. If enough context exists, give a short summary of the project and the most important missing pieces.
9. If the user mentions screenshots, notes, requirement docs, links, or file paths, move or organize them into `.agentic/workspace/project/` by default unless the user explicitly says not to.
10. After the first useful exchange, create or update:
   - `.agentic/workspace/memory/project-overview.md`
   - `.agentic/workspace/memory/requirements.md`
   - `.agentic/workspace/memory/open-questions.md`
11. Update `.agentic/workspace/memory/architecture.md` only if the new context changes architecture.
12. Write drafts even from partial information.
13. Clearly separate confirmed facts, assumptions, and open questions.
14. Do not route immediately just because the workspace is empty. Do useful synthesis or ask focused questions first.
15. Do not rewrite unrelated files just because `@.agentic/init.md` ran.
16. If important project basics are still missing, continue asking focused questions and keep updating the memory files instead of routing forward yet.
17. When suggesting next commands in resumed sessions, use the existing progress:
   - if requirements exist but architecture does not, recommend `@.agentic/commands/architecture.md`
   - if architecture exists, suggest `@.agentic/commands/create-brd.md`, `@.agentic/commands/create-proposal.md`, `@.agentic/commands/create-plan.md`, and `@.agentic/commands/create-tasks.md`
   - if BRD work already exists, also allow `@.agentic/commands/create-frd.md`
   - if FRD work already exists, also allow `@.agentic/commands/create-estimate.md`
   - if estimate work already exists, also allow `@.agentic/commands/create-proposal.md`
18. Only when you have done enough useful intake work for a first-time project, end by recommending the next command and also make it clear the user can say what they want to do now:

`Next type @.agentic/commands/project-requirements.md`
