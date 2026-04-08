#!/usr/bin/env node

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
