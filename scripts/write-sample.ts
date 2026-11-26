import { writeFileSync } from "node:fs";
import { SAMPLE_TOOL_IDS } from "../src/config.ts";
import tools from "../src/data/tools.json" with { type: "json" };

const columns = [
  "id",
  "name",
  "category",
  "official_url",
  "description",
  "free_tier",
  "pricing_as_shown",
  "e2ee",
  "open_source",
  "repo_url",
  "self_hostable",
  "hq_jurisdiction",
  "platforms",
  "compliance_claims",
  "affiliate_program",
  "affiliate_url",
  "affiliate_terms",
  "date_verified",
  "source_urls",
] as const;

function escapeCell(value: unknown): string {
  const text = Array.isArray(value) ? value.join(" | ") : String(value ?? "");
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

const byId = new Map(tools.map((tool) => [tool.id, tool]));
const rows = SAMPLE_TOOL_IDS.map((id) => {
  const tool = byId.get(id);
  if (!tool) throw new Error(`Sample id “${id}” is not in src/data/tools.json.`);
  return tool;
});

const lines = [columns.join(",")];
for (const tool of rows) {
  lines.push(columns.map((column) => escapeCell(tool[column])).join(","));
}

const target = new URL("../public/sample-tools.csv", import.meta.url);
writeFileSync(target, `${lines.join("\n")}\n`, "utf8");
console.log(`Wrote ${rows.length} sample rows to public/sample-tools.csv`);
