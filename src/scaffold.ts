import { commandFiles } from "./scaffold-command-files.js";
import { coreFiles } from "./scaffold-core-files.js";
import { DIRECTORIES, RESET_PATHS } from "./scaffold-directories.js";
import { scriptFiles } from "./scaffold-script-files.js";

export type FileMap = Record<string, string>;

export { DIRECTORIES, RESET_PATHS };

export const fileContents = (): FileMap => ({
  ...coreFiles,
  ...commandFiles,
  ...scriptFiles,
});
