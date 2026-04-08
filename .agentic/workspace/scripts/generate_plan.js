#!/usr/bin/env node

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
