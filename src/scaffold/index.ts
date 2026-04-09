import { commandFiles } from "./command-files.js";
import { coreFiles } from "./core-files.js";
import { documentFiles } from "./document-files.js";
import { DIRECTORIES, RESET_PATHS } from "./directories.js";
import { memoryFiles } from "./memory-files.js";
import { scriptFiles } from "./script-files.js";

export type FileMap = Record<string, string>;

export { DIRECTORIES, RESET_PATHS };

export const fileContents = (): FileMap => ({
  ...coreFiles,
  ...commandFiles,
  ...documentFiles,
  ...memoryFiles,
  ...scriptFiles,
});
