import type { FileMap } from "./index.js";
import { readTemplate } from "../lib/template-loader.js";

export const documentFiles: FileMap = {
  ".agentic/workspace/documents/memory-sync.json": readTemplate(
    "./templates/documents/memory-sync.json",
  ),
};
