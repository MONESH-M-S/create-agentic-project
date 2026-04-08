#!/usr/bin/env node

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
        "\nCreate it first under .agentic/workspace/documents/ or pass --input."
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
