import raw from "../data/tools.json";
import { categoryByName } from "./categories";
import type { Tool } from "./types";

export function byName(a: Tool, b: Tool): number {
  return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
}

export const tools: Tool[] = (raw as Tool[]).slice().sort(byName);

export const toolById: Map<string, Tool> = new Map(tools.map((tool) => [tool.id, tool]));

export function requireTool(id: string): Tool {
  const tool = toolById.get(id);
  if (!tool) throw new Error(`No tool with id “${id}” in src/data/tools.json.`);
  return tool;
}

export function toolsInCategory(name: string): Tool[] {
  return tools.filter((tool) => tool.category === name);
}

export function categoryOf(tool: Tool) {
  const category = categoryByName(tool.category);
  if (!category) {
    throw new Error(
      `tools.json: “${tool.name}” has category “${tool.category}”, which is not listed in src/lib/categories.ts.`,
    );
  }
  return category;
}
