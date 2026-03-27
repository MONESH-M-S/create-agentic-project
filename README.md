# create-agentic-starter

`create-agentic-starter` scaffolds a lightweight `.agentic/` workspace inside an existing project so AI tools can follow a repeatable kick-off workflow.

The goal is to avoid rebuilding the same project-start process every time. Instead of manually re-creating prompts and folders for every new client engagement, this package sets up a standard structure for:

- requirement gathering
- architecture thinking
- BRD generation
- FRD generation
- estimation
- proposal drafting

It is designed for prompt-driven AI tools. The generated scaffold gives each new session a clear entrypoint with `@.agentic/init.md`, a set of reusable prompts in `.agentic/commands/`, and a workspace for project assets, memory, and generated documents.

## Usage

```bash
npx create-agentic-starter
```

```bash
bunx create-agentic-starter
```

Run the command inside an existing project folder.

The scaffold is non-interactive. It will:

- recreate `.agentic/`
- create `.docs/` for user-facing outputs
- preserve existing `AGENTS.md`, appending a marked `create-agentic-starter` section when needed
- never modify `.gitignore`
- never modify `README.md`
- print the next step for the team

## Generated Structure

The command sets up:

- `.agentic/init.md`
- `.agentic/context.md`
- `.agentic/commands/`
- `.agentic/workspace/project/`
- `.agentic/workspace/memory/`
- `.agentic/workspace/documents/`
- `.agentic/workspace/scripts/`
- `.docs/`
- `AGENTS.md`

## First Run Flow

After scaffolding:

1. Open your AI tool in the project.
2. Start a new session with `@.agentic/init.md`.
3. Follow the command sequence defined in `AGENTS.md`.
