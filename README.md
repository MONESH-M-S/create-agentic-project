# create-agentic-starter

`create-agentic-starter` adds a reusable AI workflow to an existing project.

It is built for teams who want one standard setup for project understanding, planning, documentation, execution tracking, and future day-to-day project updates.

Instead of starting from scratch in every new repo, this creates a ready-to-use `.agentic/` workspace that can be used with tools like Codex, Claude, Cursor, Zed, Antigravity, and similar AI workflows.

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

## What It Does

When you run it, it will:

- recreate `.agentic/`
- create a reusable workspace for AI prompts, memory, scripts, and outputs
- preserve an existing `AGENTS.md` and append its guide section
- print the next step: start with `@.agentic/init.md`

## Why This Is Useful

This setup helps your team keep project context inside the repo itself.

- prompts can live with the project
- project memory can be updated over time
- workflows can evolve as the project grows
- everything can be version controlled with git
- the context stays in your codebase instead of being spread across chats and tools

You can also:

- add your own commands under `.agentic/commands/`
- edit the generated prompts
- remove anything you do not want
- shape the workflow around your team

## Basic Flow

1. Run `npx create-agentic-starter` or `bunx create-agentic-starter` in the target project.
2. Open that project in your AI tool.
3. Start a new session with `@.agentic/init.md`.
4. Let the agent understand the project and continue with the commands you need.
5. Keep extending the workflow as your team needs more project operations over time.
