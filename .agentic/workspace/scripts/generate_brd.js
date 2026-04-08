#!/usr/bin/env node

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
