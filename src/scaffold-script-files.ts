import type { FileMap } from "./scaffold.js";

export const scriptFiles: FileMap = {
  ".agentic/workspace/scripts/README.md": `# Export Scripts

This folder is reserved for optional Node.js export helpers that will later generate user-facing deliverables in \`.docs/\`.

## Planned Libraries

- \`docx\` for \`.docx\`
- \`pptxgenjs\` for \`.pptx\`
- \`exceljs\` for \`.xlsx\`

## Install Strategy

1. Check whether the target project root already has a usable Node environment.
2. Prefer installing export dependencies there if suitable.
3. If root is not suitable or is ambiguous, ask the user which path should receive the install.
4. Ask the user before running any \`npm install\`.

## Planned Outputs

- BRD: \`.docs/brd/brd.docx\`
- FRD: \`.docs/frd/frd.docx\`
- Estimate: \`.docs/estimate/estimate.xlsx\`
- Proposal: \`.docs/proposal/proposal.pptx\`
- Plan: \`.docs/plan/plan.docx\` or \`.docs/plan/plan.xlsx\`
- Tasks: \`.docs/tasks/tasks.xlsx\`

These scripts are placeholders for now. They define the intended contract but do not perform real generation yet.
`,
  ".agentic/workspace/scripts/generate_brd.js": `#!/usr/bin/env node

console.error("generate_brd.js is not implemented yet.");
console.error("Intended output: .docs/brd/brd.docx");
console.error("Planned library: docx");
process.exit(1);
`,
  ".agentic/workspace/scripts/generate_frd.js": `#!/usr/bin/env node

console.error("generate_frd.js is not implemented yet.");
console.error("Intended output: .docs/frd/frd.docx");
console.error("Planned library: docx");
process.exit(1);
`,
  ".agentic/workspace/scripts/generate_estimate.js": `#!/usr/bin/env node

console.error("generate_estimate.js is not implemented yet.");
console.error("Intended output: .docs/estimate/estimate.xlsx");
console.error("Planned library: exceljs");
process.exit(1);
`,
  ".agentic/workspace/scripts/generate_proposal.js": `#!/usr/bin/env node

console.error("generate_proposal.js is not implemented yet.");
console.error("Intended output: .docs/proposal/proposal.pptx");
console.error("Planned library: pptxgenjs");
process.exit(1);
`,
  ".agentic/workspace/scripts/generate_plan.js": `#!/usr/bin/env node

console.error("generate_plan.js is not implemented yet.");
console.error("Intended outputs: .docs/plan/plan.docx or .docs/plan/plan.xlsx");
console.error("Planned libraries: docx or exceljs");
process.exit(1);
`,
  ".agentic/workspace/scripts/generate_tasks.js": `#!/usr/bin/env node

console.error("generate_tasks.js is not implemented yet.");
console.error("Intended output: .docs/tasks/tasks.xlsx");
console.error("Planned library: exceljs");
process.exit(1);
`,
};
