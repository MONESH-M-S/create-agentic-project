import type { FileMap } from "./index.js";
import { readTemplate } from "../lib/template-loader.js";

export const scriptFiles: FileMap = {
  ".agentic/workspace/scripts/README.md": readTemplate(
    "./templates/scripts/README.md",
  ),
  ".agentic/workspace/scripts/_shared.js": readTemplate(
    "./templates/scripts/_shared.js",
  ),
  ".agentic/workspace/scripts/generate_brd.js": readTemplate(
    "./templates/scripts/generate_brd.js",
  ),
  ".agentic/workspace/scripts/generate_frd.js": readTemplate(
    "./templates/scripts/generate_frd.js",
  ),
  ".agentic/workspace/scripts/generate_estimate.js": readTemplate(
    "./templates/scripts/generate_estimate.js",
  ),
  ".agentic/workspace/scripts/generate_proposal.js": readTemplate(
    "./templates/scripts/generate_proposal.js",
  ),
  ".agentic/workspace/scripts/generate_plan.js": readTemplate(
    "./templates/scripts/generate_plan.js",
  ),
  ".agentic/workspace/scripts/generate_tasks.js": readTemplate(
    "./templates/scripts/generate_tasks.js",
  ),
  ".agentic/workspace/scripts/sync_memory.js": readTemplate(
    "./templates/scripts/sync_memory.js",
  ),
};
