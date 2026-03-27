import { readTemplate } from "./template-loader.js";

export const AGENTS_PATH = "AGENTS.md";

export const AGENTS_MARKER_START =
  "<!-- from create-agentic-starter:agents:start -->";
export const AGENTS_MARKER_END =
  "<!-- from create-agentic-starter:agents:end -->";

const agentsContent = readTemplate("./templates/meta/agents.md").trimEnd();

export const agentsBlock = `${AGENTS_MARKER_START}
${agentsContent}
${AGENTS_MARKER_END}
`;
