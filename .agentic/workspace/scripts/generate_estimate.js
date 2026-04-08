#!/usr/bin/env node

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
