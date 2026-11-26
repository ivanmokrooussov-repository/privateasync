import { affiliateLinks, GUMROAD_DATASET_URL, SAMPLE_TOOL_IDS } from "../config";
import { categories } from "./categories";
import { comparisons, toolsForComparison } from "./comparisons";
import { VALUE_GUIDE } from "./format";
import { href } from "./paths";
import type { Tool } from "./types";
import { tools } from "./tools";

const ENUMS: Record<string, string[]> = {
  free_tier: VALUE_GUIDE.free_tier.map((row) => row.value),
  e2ee: VALUE_GUIDE.e2ee.map((row) => row.value),
  open_source: VALUE_GUIDE.open_source.map((row) => row.value),
  self_hostable: VALUE_GUIDE.self_hostable.map((row) => row.value),
  affiliate_program: ["yes", "credit-only", "reseller-only", "none_found", "no", "unknown"],
};

const RESERVED = new Set([
  "about",
  "methodology",
  "affiliate-disclosure",
  "privacy",
  "contact",
  "data",
  "get-featured",
  "categories",
  "tools",
  "guides",
  "comparisons",
  "index",
  "404",
  "sample-tools.csv",
]);

function requireHttps(label: string, value: string) {
  if (!value.startsWith("https://")) {
    throw new Error(`${label} must start with https://. Got: ${value}`);
  }
}

function checkTool(tool: Tool) {
  if (!/^[a-z0-9-]+$/.test(tool.id)) {
    throw new Error(`tools.json: id “${tool.id}” should be lowercase letters, numbers, and hyphens.`);
  }
  if (!categories.some((category) => category.name === tool.category)) {
    throw new Error(
      `tools.json: “${tool.name}” has category “${tool.category}”, which is not one of the categories in src/lib/categories.ts.`,
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tool.date_verified)) {
    throw new Error(`tools.json: “${tool.name}” has date_verified “${tool.date_verified}”. Use YYYY-MM-DD.`);
  }
  requireHttps(`tools.json official_url for “${tool.name}”`, tool.official_url);
  if (!tool.description?.trim()) {
    throw new Error(`tools.json: “${tool.name}” is missing a description.`);
  }
  if (!tool.pricing_as_shown?.trim()) {
    throw new Error(`tools.json: “${tool.name}” is missing pricing_as_shown. Use “unknown” if you did not find a price.`);
  }
  for (const field of Object.keys(ENUMS)) {
    const value = tool[field as keyof Tool];
    if (typeof value !== "string" || !ENUMS[field].includes(value)) {
      throw new Error(
        `tools.json: “${tool.name}” has ${field} “${String(value)}”. Allowed values: ${ENUMS[field].join(", ")}.`,
      );
    }
  }
  if (!Array.isArray(tool.source_urls) || tool.source_urls.length === 0) {
    throw new Error(`tools.json: “${tool.name}” needs at least one source URL.`);
  }
  for (const url of tool.source_urls) {
    requireHttps(`source URL for “${tool.name}”`, url);
  }
}

export function assertDataset() {
  const ids = new Set<string>();
  for (const tool of tools) {
    if (ids.has(tool.id)) throw new Error(`tools.json lists the id “${tool.id}” twice.`);
    ids.add(tool.id);
    checkTool(tool);
  }

  if (SAMPLE_TOOL_IDS.length < 8 || SAMPLE_TOOL_IDS.length > 12) {
    throw new Error("SAMPLE_TOOL_IDS in src/config.ts should be about 10 tool ids.");
  }
  const sampleSeen = new Set<string>();
  for (const id of SAMPLE_TOOL_IDS) {
    if (sampleSeen.has(id)) throw new Error(`SAMPLE_TOOL_IDS lists “${id}” twice.`);
    sampleSeen.add(id);
    if (!ids.has(id)) {
      throw new Error(`src/config.ts: sample id “${id}” is not in tools.json.`);
    }
  }

  for (const [id, url] of Object.entries(affiliateLinks)) {
    if (!ids.has(id)) {
      throw new Error(`src/config.ts: affiliate link for “${id}” does not match a tool id in tools.json.`);
    }
    if (url.trim()) requireHttps(`affiliate link for “${id}”`, url.trim());
  }

  if (GUMROAD_DATASET_URL.trim()) {
    requireHttps("GUMROAD_DATASET_URL", GUMROAD_DATASET_URL.trim());
  }

  const slugs = new Set<string>();
  const paths = new Set<string>();
  for (const page of comparisons) {
    if (slugs.has(page.slug)) throw new Error(`Two comparison pages use the slug “${page.slug}”.`);
    slugs.add(page.slug);
    if (paths.has(page.path)) throw new Error(`Two comparison pages use the path “${page.path}”.`);
    paths.add(page.path);
    if (RESERVED.has(page.slug)) {
      throw new Error(`Comparison slug “${page.slug}” clashes with another page.`);
    }
    if (page.path !== href(page.path)) {
      throw new Error(`Comparison path “${page.path}” should use the site’s trailing slash.`);
    }
    toolsForComparison(page);
    for (const related of page.related) {
      if (!slugs.has(related) && !comparisons.some((item) => item.slug === related)) {
        throw new Error(`Comparison “${page.slug}” links to unknown related slug “${related}”.`);
      }
    }
    if (page.pair) {
      for (const id of page.pair) {
        const list = toolsForComparison(page);
        if (!list.some((tool) => tool.id === id)) {
          throw new Error(`Comparison “${page.slug}” pair includes “${id}”, which is not in that table.`);
        }
      }
    }
  }

  for (const category of categories) {
    for (const path of category.related) {
      if (!paths.has(path)) {
        throw new Error(`Category “${category.name}” links to “${path}”, which is not a comparison page.`);
      }
    }
  }
}

assertDataset();
