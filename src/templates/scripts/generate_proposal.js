#!/usr/bin/env node

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
