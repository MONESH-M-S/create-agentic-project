import type { FileMap } from "./index.js";
import { readTemplate } from "../lib/template-loader.js";

export const commandFiles: FileMap = {
  ".agentic/commands/project-requirements.md": readTemplate(
    "./templates/commands/project-requirements.md",
  ),
  ".agentic/commands/architecture.md": readTemplate(
    "./templates/commands/architecture.md",
  ),
  ".agentic/commands/create-brd.md": readTemplate(
    "./templates/commands/create-brd.md",
  ),
  ".agentic/commands/create-frd.md": readTemplate(
    "./templates/commands/create-frd.md",
  ),
  ".agentic/commands/create-estimate.md": readTemplate(
    "./templates/commands/create-estimate.md",
  ),
  ".agentic/commands/create-proposal.md": readTemplate(
    "./templates/commands/create-proposal.md",
  ),
  ".agentic/commands/create-plan.md": readTemplate(
    "./templates/commands/create-plan.md",
  ),
  ".agentic/commands/create-tasks.md": readTemplate(
    "./templates/commands/create-tasks.md",
  ),
  ".agentic/commands/implementation.md": readTemplate(
    "./templates/commands/implementation.md",
  ),
};
