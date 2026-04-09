#!/usr/bin/env node

const shared = require("./_shared.js");

const SECTION_ORDER = [
  "Current Status",
  "Aliases",
  "Routes / Screens",
  "Related Areas",
  "Summary",
  "User Flow",
  "Mermaid Flow Diagram",
  "Requirements",
  "Implementation Notes",
  "Key Code References",
  "Dependencies",
  "Blockers",
  "Decisions Affecting This Feature",
  "Related Outputs or Docs",
  "Revision Summary",
  "Next Steps",
];

const PROJECT_STATE_SECTIONS = [
  "Current Phase",
  "Current Priorities",
  "In Progress",
  "Completed Outputs",
  "Active Features",
  "Blockers",
  "Suggested Next Actions",
];

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item || "").trim())
    .filter(Boolean);
}

function isPlaceholderLine(line) {
  const value = normalizeString(line);
  return (
    !value ||
    value === "- Not set yet" ||
    value === "- None noted" ||
    value === "- Not specified yet" ||
    value === "- Add current blockers here" ||
    value === "- Add the current top priorities here" ||
    value === "- Add active workstreams or features here with status" ||
    value === "- Add completed BRD, FRD, estimate, proposal, plan, tasks, or other deliverables here" ||
    value === "- Add links or references to feature files under `features/` with current status" ||
    value === "- Add the next recommended actions here" ||
    value === "- What happened:" ||
    value === "- What changed:" ||
    value === "- What remains open:" ||
    value === "- Where to continue next:"
  );
}

function dedupeList(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function parseSections(markdown) {
  if (!markdown) {
    return { title: "", sections: {} };
  }

  const lines = markdown.split("\n");
  let title = "";
  let currentSection = null;
  const sections = {};

  for (const line of lines) {
    if (!title && line.startsWith("# ")) {
      title = line.slice(2).trim();
      continue;
    }

    if (line.startsWith("## ")) {
      currentSection = line.slice(3).trim();
      sections[currentSection] = [];
      continue;
    }

    if (currentSection) {
      sections[currentSection].push(line);
    }
  }

  return {
    title,
    sections: Object.fromEntries(
      Object.entries(sections).map(([key, value]) => [key, value.join("\n").trim()])
    ),
  };
}

function extractBullets(sectionText) {
  if (!sectionText) {
    return [];
  }

  return sectionText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter((line) => !isPlaceholderLine("- " + line));
}

function formatBullets(items, emptyLabel) {
  const values = normalizeList(items);

  if (values.length === 0) {
    return "- " + emptyLabel;
  }

  return values.map((item) => "- " + item).join("\n");
}

function chooseSectionContent(value, existingValue, emptyLabel, options = {}) {
  const isList = options.list !== false;

  if (isList) {
    const items = normalizeList(value);

    if (items.length > 0) {
      return formatBullets(items, emptyLabel);
    }

    if (normalizeString(existingValue)) {
      return existingValue;
    }

    return "- " + emptyLabel;
  }

  const text = normalizeString(value);

  if (text) {
    return text;
  }

  if (normalizeString(existingValue)) {
    return existingValue;
  }

  return emptyLabel;
}

function buildRevisionSection(existingValue, revisionNote) {
  const existingItems = extractBullets(existingValue);
  const note = normalizeString(revisionNote);

  if (!note && existingItems.length === 0) {
    return "- No revision notes yet";
  }

  if (!note) {
    return existingItems.map((item) => "- " + item).join("\n");
  }

  const today = new Date().toISOString().slice(0, 10);
  const nextItems = dedupeList([today + ": " + note, ...existingItems]).slice(0, 5);
  return nextItems.map((item) => "- " + item).join("\n");
}

function buildFeatureMarkdown(existing, data, mode, featureName) {
  const sections = existing.sections || {};
  const status = normalizeString(data.status) || "planned";
  const checkpointNote = normalizeString(data.summary)
    ? "Current implementation focus: " + normalizeString(data.summary)
    : "Current implementation focus: update in progress";

  const nextImplementationNotes =
    mode === "checkpoint"
      ? [checkpointNote, ...extractBullets(sections["Implementation Notes"])]
      : normalizeList(data.implementation_notes);

  const contentBySection = {
    "Current Status": "- " + status,
    "Aliases": chooseSectionContent(data.aliases, sections["Aliases"], "None noted"),
    "Routes / Screens": chooseSectionContent(
      data.routes_or_screens,
      sections["Routes / Screens"],
      "None noted"
    ),
    "Related Areas": chooseSectionContent(
      data.related_areas,
      sections["Related Areas"],
      "None noted"
    ),
    "Summary": chooseSectionContent(data.summary, sections["Summary"], "Not set yet", {
      list: false,
    }),
    "User Flow": chooseSectionContent(data.user_flow, sections["User Flow"], "Not set yet", {
      list: false,
    }),
    "Mermaid Flow Diagram": chooseSectionContent(
      data.mermaid_flow_diagram,
      sections["Mermaid Flow Diagram"],
      "No diagram recorded yet.",
      { list: false }
    ),
    "Requirements": chooseSectionContent(
      data.requirements,
      sections["Requirements"],
      "Not specified yet"
    ),
    "Implementation Notes": chooseSectionContent(
      nextImplementationNotes,
      sections["Implementation Notes"],
      "No implementation notes yet"
    ),
    "Key Code References": chooseSectionContent(
      data.key_code_references,
      sections["Key Code References"],
      "No key code references yet"
    ),
    "Dependencies": chooseSectionContent(
      data.dependencies,
      sections["Dependencies"],
      "None noted"
    ),
    "Blockers": chooseSectionContent(data.blockers, sections["Blockers"], "None noted"),
    "Decisions Affecting This Feature": chooseSectionContent(
      data.decisions_affecting_this_feature,
      sections["Decisions Affecting This Feature"],
      "None noted"
    ),
    "Related Outputs or Docs": chooseSectionContent(
      data.related_outputs_or_docs,
      sections["Related Outputs or Docs"],
      "None noted"
    ),
    "Revision Summary": buildRevisionSection(sections["Revision Summary"], data.revision_note),
    "Next Steps": chooseSectionContent(data.next_steps, sections["Next Steps"], "None noted"),
  };

  return (
    "# " +
    featureName +
    "\n\n" +
    SECTION_ORDER.map((section) => "## " + section + "\n\n" + contentBySection[section]).join(
      "\n\n"
    ) +
    "\n"
  );
}

function parseFeatureIndex(markdown) {
  if (!markdown) {
    return [];
  }

  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|") && !line.includes("---"))
    .slice(1)
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim())
    )
    .filter((cells) => cells.length === 6 && cells[0] !== "Feature");
}

function normalizeTableCell(value) {
  return String(value || "").replace(/`/g, "").trim();
}

function buildFeatureIndex(markdown, featureName, status, summary, aliasHints, featureFile) {
  const rows = parseFeatureIndex(markdown)
    .filter((cells) => normalizeTableCell(cells[5]) !== "features/example-feature.md")
    .filter((cells) => normalizeTableCell(cells[5]) !== featureFile);

  rows.push([
    featureName,
    status,
    summary || "No summary recorded yet",
    "Medium",
    aliasHints.length > 0 ? aliasHints.join(", ") : "None noted",
    featureFile,
  ]);

  rows.sort((a, b) => a[0].localeCompare(b[0]));

  return [
    "# Features Index",
    "",
    "Use this file as the quick lookup view for all tracked features.",
    "",
    "## Features",
    "",
    "| Feature | Status | Summary | Priority | Aliases / Routes | Feature File |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows.map((cells) => "| " + cells.join(" | ") + " |"),
    "",
  ].join("\n");
}

function removeFeatureLines(items, featureName, featureSlug) {
  const lowerName = featureName.toLowerCase();
  const lowerSlug = featureSlug.toLowerCase();

  return items.filter((item) => {
    const lowerItem = item.toLowerCase();
    return !lowerItem.includes(lowerName) && !lowerItem.includes(lowerSlug);
  });
}

function updateFeatureList(items, featureLine, featureName, featureSlug) {
  const nextItems = removeFeatureLines(items, featureName, featureSlug);
  nextItems.push(featureLine);
  return dedupeList(nextItems);
}

function buildProjectState(markdown, data, mode, featureName, featureSlug, featureFile) {
  const parsed = parseSections(markdown);
  const sections = parsed.sections || {};
  const status = normalizeString(data.status) || "planned";
  const summary = normalizeString(data.summary) || "No summary recorded yet";
  const stateUpdate = data.project_state_update || {};

  const currentPriorities = normalizeList(stateUpdate.current_priorities);
  const completedOutputs = normalizeList(stateUpdate.completed_outputs);
  const suggestedNextActions = normalizeList(stateUpdate.suggested_next_actions);
  const blockers = normalizeList(stateUpdate.blockers);

  const inProgressItems =
    normalizeList(stateUpdate.in_progress).length > 0
      ? normalizeList(stateUpdate.in_progress)
      : removeFeatureLines(extractBullets(sections["In Progress"]), featureName, featureSlug);

  if (mode === "checkpoint") {
    inProgressItems.push(featureName + " (" + status + "): " + summary);
  } else if (status === "in-progress" || status === "partially completed") {
    inProgressItems.push(featureName + " (" + status + "): " + summary);
  }

  const activeFeatures =
    normalizeList(stateUpdate.active_features).length > 0
      ? normalizeList(stateUpdate.active_features)
      : updateFeatureList(
          extractBullets(sections["Active Features"]),
          "[" + featureName + "](" + featureFile + ") - " + status + ": " + summary,
          featureName,
          featureSlug
        );

  const blockerItems =
    blockers.length > 0
      ? blockers
      : removeFeatureLines(extractBullets(sections["Blockers"]), featureName, featureSlug);

  if (status === "blocked" && normalizeList(data.blockers).length > 0) {
    for (const item of normalizeList(data.blockers)) {
      blockerItems.push(featureName + ": " + item);
    }
  }

  const sectionContent = {
    "Current Phase":
      normalizeString(stateUpdate.current_phase) ||
      normalizeString(sections["Current Phase"]) ||
      "- Not set yet",
    "Current Priorities": formatBullets(
      currentPriorities.length > 0 ? currentPriorities : extractBullets(sections["Current Priorities"]),
      "Add the current top priorities here"
    ),
    "In Progress": formatBullets(
      dedupeList(inProgressItems),
      "Add active workstreams or features here with status"
    ),
    "Completed Outputs": formatBullets(
      completedOutputs.length > 0 ? completedOutputs : extractBullets(sections["Completed Outputs"]),
      "Add completed BRD, FRD, estimate, proposal, plan, tasks, or other deliverables here"
    ),
    "Active Features": formatBullets(
      dedupeList(activeFeatures),
      "Add links or references to feature files under `features/` with current status"
    ),
    "Blockers": formatBullets(
      dedupeList(blockerItems),
      "Add current blockers here"
    ),
    "Suggested Next Actions": formatBullets(
      suggestedNextActions.length > 0
        ? suggestedNextActions
        : extractBullets(sections["Suggested Next Actions"]),
      "Add the next recommended actions here"
    ),
  };

  return (
    "# Project State\n\n" +
    PROJECT_STATE_SECTIONS.map((section) => "## " + section + "\n\n" + sectionContent[section]).join(
      "\n\n"
    ) +
    "\n"
  );
}

function buildHandoff(markdown, data, mode, featureName) {
  const parsed = parseSections(markdown);
  const existing = extractBullets(parsed.sections["Latest Summary"]);
  const handoff = data.handoff_update || {};
  const status = normalizeString(data.status) || "planned";
  const summary = normalizeString(data.summary) || "Implementation updated.";
  const nextSteps = normalizeList(data.next_steps);
  const blockers = normalizeList(data.blockers);

  if (mode === "checkpoint" && !normalizeString(handoff.what_happened)) {
    return markdown || [
      "# Handoff",
      "",
      "Use this file to help the next session or next tool continue the work.",
      "",
      "## Latest Summary",
      "",
      "- What happened:",
      "- What changed:",
      "- What remains open:",
      "- Where to continue next:",
      "",
    ].join("\n");
  }

  const latestSummary = [
    "- What happened: " +
      (normalizeString(handoff.what_happened) || "Updated " + featureName + " (" + status + ")."),
    "- What changed: " +
      (normalizeString(handoff.what_changed) || summary),
    "- What remains open: " +
      (normalizeString(handoff.what_remains_open) ||
        (blockers[0] || nextSteps[0] || "No open follow-up captured.")),
    "- Where to continue next: " +
      (normalizeString(handoff.where_to_continue_next) ||
        nextSteps[0] ||
        "Continue with the next requested task."),
  ];

  return [
    "# Handoff",
    "",
    "Use this file to help the next session or next tool continue the work.",
    "",
    "## Latest Summary",
    "",
    ...latestSummary,
    "",
  ].join("\n");
}

function main() {
  const args = shared.parseArgs(process.argv.slice(2));
  const inputPath = args.input || ".agentic/workspace/documents/memory-sync.json";
  const data = shared.readJsonFile(inputPath);
  const mode = normalizeString(args.mode || data.mode || "finalize");
  const featureSlug = slugify(data.feature_slug || data.feature_name);
  const featureName = normalizeString(data.feature_name);

  if (!featureSlug || !featureName) {
    throw new Error(
      "memory-sync.json requires both feature_slug and feature_name before sync_memory.js can run."
    );
  }

  const featureFile = "features/" + featureSlug + ".md";
  const featureMemoryPath = ".agentic/workspace/memory/" + featureFile;
  const featureIndexPath = ".agentic/workspace/memory/features/index.md";
  const projectStatePath = ".agentic/workspace/memory/project-state.md";
  const handoffPath = ".agentic/workspace/memory/handoff.md";

  const existingFeature = parseSections(shared.readTextFile(featureMemoryPath));
  const existingIndex = shared.readTextFile(featureIndexPath) || "";
  const existingProjectState = shared.readTextFile(projectStatePath) || "";
  const existingHandoff = shared.readTextFile(handoffPath) || "";

  shared.writeText(
    featureMemoryPath,
    buildFeatureMarkdown(existingFeature, data, mode, featureName)
  );

  shared.writeText(
    featureIndexPath,
    buildFeatureIndex(
      existingIndex,
      featureName,
      normalizeString(data.status) || "planned",
      normalizeString(data.summary),
      dedupeList([...normalizeList(data.aliases), ...normalizeList(data.routes_or_screens)]),
      featureFile
    )
  );

  shared.writeText(
    projectStatePath,
    buildProjectState(existingProjectState, data, mode, featureName, featureSlug, featureFile)
  );

  shared.writeText(
    handoffPath,
    buildHandoff(existingHandoff, data, mode, featureName)
  );

  console.log("Memory sync complete for " + featureName + " (" + mode + ").");
}

main();
