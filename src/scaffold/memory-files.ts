import type { FileMap } from "./index.js";
import { readTemplate } from "../lib/template-loader.js";

export const memoryFiles: FileMap = {
  ".agentic/workspace/memory/project-state.md": readTemplate(
    "./templates/memory/project-state.md",
  ),
  ".agentic/workspace/memory/decisions.md": readTemplate(
    "./templates/memory/decisions.md",
  ),
  ".agentic/workspace/memory/next-actions.md": readTemplate(
    "./templates/memory/next-actions.md",
  ),
  ".agentic/workspace/memory/handoff.md": readTemplate(
    "./templates/memory/handoff.md",
  ),
};
