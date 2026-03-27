import type { FileMap } from "./index.js";
import { readTemplate } from "../lib/template-loader.js";

export const coreFiles: FileMap = {
  ".agentic/init.md": readTemplate("./templates/core/init.md"),
  ".agentic/context.md": readTemplate("./templates/core/context.md"),
};
