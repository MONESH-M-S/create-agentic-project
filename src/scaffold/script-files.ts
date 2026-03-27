import type { FileMap } from "./index.js";

const sharedScript = `#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

function resolveFromRoot(targetPath) {
  return path.resolve(process.cwd(), targetPath);
}

function ensureParentDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readJsonFile(relativePath) {
  const absolutePath = resolveFromRoot(relativePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(
      "Input file not found: " +
        relativePath +
        "\\nCreate it first under .agentic/workspace/documents/ or pass --input."
    );
  }

  return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
}

function loadPackage(packageName) {
  try {
    return require(packageName);
  } catch (error) {
    console.error("Missing dependency:", packageName);
    console.error(
      "Install it in the target project's chosen Node environment before running this script."
    );
    console.error("Current working directory:", process.cwd());
    process.exit(1);
  }
}

function writeBuffer(relativePath, buffer) {
  const absolutePath = resolveFromRoot(relativePath);
  ensureParentDir(absolutePath);
  fs.writeFileSync(absolutePath, buffer);
  return absolutePath;
}

function writeSuccess(label, absolutePath) {
  console.log(label + " written to " + absolutePath);
}

function toParagraphs(docx, lines, options = {}) {
  if (!Array.isArray(lines) || lines.length === 0) {
    return [];
  }

  return lines.map((line) =>
    new docx.Paragraph({
      text: String(line),
      bullet: options.bullet ? { level: 0 } : undefined,
      spacing: { after: options.bullet ? 80 : 160 },
    })
  );
}

function deriveColumns(rows) {
  const firstRow = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

  if (!firstRow || Array.isArray(firstRow)) {
    return [];
  }

  return Object.keys(firstRow).map((key) => ({
    header: key,
    key,
    width: Math.max(String(key).length + 4, 18),
  }));
}

module.exports = {
  parseArgs,
  resolveFromRoot,
  readJsonFile,
  loadPackage,
  writeBuffer,
  writeSuccess,
  toParagraphs,
  deriveColumns,
};
`;

const brdScript = `#!/usr/bin/env node

const shared = require("./_shared.js");
const docx = shared.loadPackage("docx");

const args = shared.parseArgs(process.argv.slice(2));
const inputPath = args.input || ".agentic/workspace/documents/brd.json";
const outputPath = args.output || ".docs/brd/brd.docx";
const data = shared.readJsonFile(inputPath);

const children = [
  new docx.Paragraph({
    text: data.title || "Business Requirements Document",
    heading: docx.HeadingLevel.TITLE,
  }),
];

if (data.subtitle) {
  children.push(
    new docx.Paragraph({
      text: String(data.subtitle),
      spacing: { after: 240 },
    })
  );
}

for (const section of data.sections || []) {
  if (section.heading) {
    children.push(
      new docx.Paragraph({
        text: String(section.heading),
        heading: docx.HeadingLevel.HEADING_1,
      })
    );
  }

  children.push(...shared.toParagraphs(docx, section.paragraphs));
  children.push(...shared.toParagraphs(docx, section.bullets, { bullet: true }));
}

const document = new docx.Document({
  sections: [{ children }],
});

docx.Packer.toBuffer(document).then((buffer) => {
  const absolutePath = shared.writeBuffer(outputPath, buffer);
  shared.writeSuccess("BRD", absolutePath);
});
`;

const frdScript = `#!/usr/bin/env node

const shared = require("./_shared.js");
const docx = shared.loadPackage("docx");

const args = shared.parseArgs(process.argv.slice(2));
const inputPath = args.input || ".agentic/workspace/documents/frd.json";
const outputPath = args.output || ".docs/frd/frd.docx";
const data = shared.readJsonFile(inputPath);

const children = [
  new docx.Paragraph({
    text: data.title || "Functional Requirements Document",
    heading: docx.HeadingLevel.TITLE,
  }),
];

for (const moduleItem of data.modules || []) {
  children.push(
    new docx.Paragraph({
      text: String(moduleItem.name || "Module"),
      heading: docx.HeadingLevel.HEADING_1,
    })
  );

  children.push(...shared.toParagraphs(docx, moduleItem.summary ? [moduleItem.summary] : []));
  children.push(...shared.toParagraphs(docx, moduleItem.features, { bullet: true }));
  children.push(...shared.toParagraphs(docx, moduleItem.validations, { bullet: true }));
  children.push(...shared.toParagraphs(docx, moduleItem.edgeCases, { bullet: true }));
}

const document = new docx.Document({
  sections: [{ children }],
});

docx.Packer.toBuffer(document).then((buffer) => {
  const absolutePath = shared.writeBuffer(outputPath, buffer);
  shared.writeSuccess("FRD", absolutePath);
});
`;

const estimateScript = `#!/usr/bin/env node

const shared = require("./_shared.js");
const ExcelJS = shared.loadPackage("exceljs");

const args = shared.parseArgs(process.argv.slice(2));
const inputPath = args.input || ".agentic/workspace/documents/estimate.json";
const outputPath = args.output || ".docs/estimate/estimate.xlsx";
const data = shared.readJsonFile(inputPath);

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet(data.sheetName || "Estimate");
const rows = Array.isArray(data.rows) ? data.rows : [];

worksheet.columns = Array.isArray(data.columns) && data.columns.length > 0
  ? data.columns
  : shared.deriveColumns(rows);

for (const row of rows) {
  worksheet.addRow(row);
}

worksheet.views = [{ state: "frozen", ySplit: 1 }];

workbook.xlsx.writeBuffer().then((buffer) => {
  const absolutePath = shared.writeBuffer(outputPath, buffer);
  shared.writeSuccess("Estimate", absolutePath);
});
`;

const proposalScript = `#!/usr/bin/env node

const shared = require("./_shared.js");
const PptxGenJS = shared.loadPackage("pptxgenjs");

const args = shared.parseArgs(process.argv.slice(2));
const inputPath = args.input || ".agentic/workspace/documents/proposal.json";
const outputPath = args.output || ".docs/proposal/proposal.pptx";
const data = shared.readJsonFile(inputPath);

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "create-agentic-starter";

const titleSlide = pptx.addSlide();
titleSlide.addText(data.title || "Project Proposal", {
  x: 0.7,
  y: 1.0,
  w: 11.0,
  h: 0.8,
  fontSize: 24,
  bold: true,
});

if (data.subtitle) {
  titleSlide.addText(String(data.subtitle), {
    x: 0.7,
    y: 2.0,
    w: 10.5,
    h: 0.5,
    fontSize: 14,
    color: "666666",
  });
}

for (const slideData of data.slides || []) {
  const slide = pptx.addSlide();

  slide.addText(String(slideData.title || "Slide"), {
    x: 0.7,
    y: 0.5,
    w: 11,
    h: 0.6,
    fontSize: 20,
    bold: true,
  });

  const bullets = Array.isArray(slideData.bullets)
    ? slideData.bullets.map((item) => ({ text: String(item), options: { bullet: { indent: 18 } } }))
    : [];

  if (bullets.length > 0) {
    slide.addText(bullets, {
      x: 0.9,
      y: 1.5,
      w: 10.6,
      h: 4.5,
      fontSize: 16,
      breakLine: true,
    });
  } else if (slideData.body) {
    slide.addText(String(slideData.body), {
      x: 0.9,
      y: 1.5,
      w: 10.6,
      h: 4.5,
      fontSize: 16,
      breakLine: true,
    });
  }
}

pptx.writeFile({ fileName: shared.resolveFromRoot(outputPath) }).then(() => {
  shared.writeSuccess("Proposal", shared.resolveFromRoot(outputPath));
});
`;

const planScript = `#!/usr/bin/env node

const shared = require("./_shared.js");

const args = shared.parseArgs(process.argv.slice(2));
const inputPath = args.input || ".agentic/workspace/documents/plan.json";
const data = shared.readJsonFile(inputPath);
const format = args.format || data.format || "docx";

if (format === "xlsx") {
  const ExcelJS = shared.loadPackage("exceljs");
  const outputPath = args.output || ".docs/plan/plan.xlsx";
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.sheetName || "Plan");
  const rows = Array.isArray(data.rows) ? data.rows : [];

  worksheet.columns = Array.isArray(data.columns) && data.columns.length > 0
    ? data.columns
    : shared.deriveColumns(rows);

  for (const row of rows) {
    worksheet.addRow(row);
  }

  worksheet.views = [{ state: "frozen", ySplit: 1 }];

  workbook.xlsx.writeBuffer().then((buffer) => {
    const absolutePath = shared.writeBuffer(outputPath, buffer);
    shared.writeSuccess("Plan", absolutePath);
  });
} else {
  const docx = shared.loadPackage("docx");
  const outputPath = args.output || ".docs/plan/plan.docx";
  const children = [
    new docx.Paragraph({
      text: data.title || "Project Plan",
      heading: docx.HeadingLevel.TITLE,
    }),
  ];

  for (const phase of data.phases || []) {
    children.push(
      new docx.Paragraph({
        text: String(phase.name || "Phase"),
        heading: docx.HeadingLevel.HEADING_1,
      })
    );

    children.push(...shared.toParagraphs(docx, phase.summary ? [phase.summary] : []));
    children.push(...shared.toParagraphs(docx, phase.tasks, { bullet: true }));
    children.push(...shared.toParagraphs(docx, phase.risks, { bullet: true }));
  }

  const document = new docx.Document({
    sections: [{ children }],
  });

  docx.Packer.toBuffer(document).then((buffer) => {
    const absolutePath = shared.writeBuffer(outputPath, buffer);
    shared.writeSuccess("Plan", absolutePath);
  });
}
`;

const tasksScript = `#!/usr/bin/env node

const shared = require("./_shared.js");
const ExcelJS = shared.loadPackage("exceljs");

const args = shared.parseArgs(process.argv.slice(2));
const inputPath = args.input || ".agentic/workspace/documents/tasks.json";
const outputPath = args.output || ".docs/tasks/tasks.xlsx";
const data = shared.readJsonFile(inputPath);

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet(data.sheetName || "Tasks");
const rows = Array.isArray(data.rows) ? data.rows : [];

worksheet.columns = Array.isArray(data.columns) && data.columns.length > 0
  ? data.columns
  : shared.deriveColumns(rows);

for (const row of rows) {
  worksheet.addRow(row);
}

worksheet.views = [{ state: "frozen", ySplit: 1 }];

workbook.xlsx.writeBuffer().then((buffer) => {
  const absolutePath = shared.writeBuffer(outputPath, buffer);
  shared.writeSuccess("Tasks", absolutePath);
});
`;

export const scriptFiles: FileMap = {
  ".agentic/workspace/scripts/README.md": `# Export Scripts

This folder contains starter Node.js export helpers for deliverables in \`.docs/\`.

These scripts are meant to be a starting point. The AI agent should update the relevant script for the current project when the user provides a template, a preferred structure, or custom formatting rules.

## Included Starter Scripts

- \`generate_brd.js\`
- \`generate_frd.js\`
- \`generate_estimate.js\`
- \`generate_proposal.js\`
- \`generate_plan.js\`
- \`generate_tasks.js\`
- \`_shared.js\`

## Planned Libraries

- \`docx\` for BRD, FRD, and document-style plan output
- \`pptxgenjs\` for proposal decks
- \`exceljs\` for estimate, tasks, and spreadsheet-style plan output

## Install Strategy

1. Check whether the target project root already has a usable Node environment.
2. Prefer installing export dependencies there if suitable.
3. If root is not suitable or is ambiguous, ask the user which path should receive the install.
4. Ask the user before running any \`npm install\`.

## Default Input Files

The starter scripts read structured input from \`.agentic/workspace/documents/\` by default:

- BRD: \`brd.json\`
- FRD: \`frd.json\`
- Estimate: \`estimate.json\`
- Proposal: \`proposal.json\`
- Plan: \`plan.json\`
- Tasks: \`tasks.json\`

The agent may also keep matching \`.md\` drafts beside these files for human-readable working content.

## Default Outputs

- BRD: \`.docs/brd/brd.docx\`
- FRD: \`.docs/frd/frd.docx\`
- Estimate: \`.docs/estimate/estimate.xlsx\`
- Proposal: \`.docs/proposal/proposal.pptx\`
- Plan: \`.docs/plan/plan.docx\` or \`.docs/plan/plan.xlsx\`
- Tasks: \`.docs/tasks/tasks.xlsx\`

## Usage Pattern

1. Use the current prompt command to build the deliverable content.
2. Save or update structured export input under \`.agentic/workspace/documents/\`.
3. Adapt the relevant script if the project requires a custom template or style.
4. Install the needed package only after user approval.
5. Run the script from the project root.
`,
  ".agentic/workspace/scripts/_shared.js": sharedScript,
  ".agentic/workspace/scripts/generate_brd.js": brdScript,
  ".agentic/workspace/scripts/generate_frd.js": frdScript,
  ".agentic/workspace/scripts/generate_estimate.js": estimateScript,
  ".agentic/workspace/scripts/generate_proposal.js": proposalScript,
  ".agentic/workspace/scripts/generate_plan.js": planScript,
  ".agentic/workspace/scripts/generate_tasks.js": tasksScript,
};
