# create-agentic-starter

`create-agentic-starter` adds a reusable AI workspace to an existing project.

The idea is simple:

- keep project memory inside the repo
- let AI tools understand the project faster
- generate useful docs and plans
- keep feature status and flow easy to explain later

Instead of losing context in old chats, this package creates a small in-repo system under `.agentic/` so your team can reopen the project in Codex, Claude, Cursor, Zed, Antigravity, or similar tools and continue from shared memory.

## What You Get

After running the command, the project gets:

- prompts for project understanding, architecture, BRD, FRD, estimate, proposal, plan, tasks, and implementation
- a recovery command to refresh project memory if it ever gets out of sync
- repo-based project memory
- feature tracking files
- starter export scripts for `.docx`, `.xlsx`, and `.pptx`
- an internal memory-sync helper for implementation tracking

This means a teammate can pull the repo, open the agent, and ask things like:

- what is the current status of this project?
- what features are done or in progress?
- what is the flow of checkout or landing page?
- what decisions were already made?

## How To Run It

Run the command inside an existing project folder.

```bash
npx create-agentic-starter
```

or

```bash
bunx create-agentic-starter
```

The command is non-interactive. It does not ask setup questions.

## What The Command Creates

When you run it, it will:

- recreate `.agentic/`
- create a reusable workspace for prompts, memory, scripts, and outputs
- preserve an existing `AGENTS.md` and append its guide section
- print the next step: start with `@.agentic/init.md`

The important parts are:

- `.agentic/commands/`
  prompt files you can use in any AI tool
- `.agentic/workspace/memory/`
  shared project memory stored in the repo
- `.agentic/workspace/memory/features/`
  one file per feature, plus a feature index
- `.docs/`
  generated user-facing outputs

## Why This Is Useful

This setup helps your team keep project context inside the codebase itself.

- prompts can live with the project
- project memory can be updated as work happens
- workflows can evolve as the project grows
- everything can be version controlled with git
- context stays in your codebase instead of being spread across chats and tools

It is also flexible:

- add your own commands under `.agentic/commands/`
- edit the generated prompts
- remove anything you do not want
- shape the workflow around your team

## Typical Usage

1. Run `npx create-agentic-starter` or `bunx create-agentic-starter` in the target project.
2. Open that project in your AI tool.
3. Start a new session with `@.agentic/init.md`.
4. Let the agent understand the project and continue with the command you need.
5. As work happens, the agent updates project memory and feature files in the repo.
6. If memory ever looks stale, run `@.agentic/commands/sync-memory.md` to refresh it.

## What Makes It Useful Later

The long-term value is not only BRD or FRD generation.

It also gives you a lightweight project brain:

- current project state
- important decisions
- next actions
- handoff notes
- feature-by-feature status
- feature flow explanations, including Mermaid diagrams when supported

So later, instead of asking the original developer what happened, a lead or teammate can ask the agent and get the answer from repo memory.
