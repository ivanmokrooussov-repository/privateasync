import { affiliateLinks } from "../config";
import type { Tool } from "./types";

export function trackingUrl(tool: Tool): string {
  return affiliateLinks[tool.id]?.trim() ?? "";
}

export function isAffiliate(tool: Tool): boolean {
  return trackingUrl(tool).length > 0;
}

export function visitLink(tool: Tool): { href: string; affiliate: boolean } {
  const tracking = trackingUrl(tool);
  if (tracking) return { href: tracking, affiliate: true };
  return { href: tool.official_url, affiliate: false };
}

export function visitRel(affiliate: boolean): string {
  return affiliate ? "sponsored noopener" : "noopener";
}

export function anyAffiliate(list: Tool[]): boolean {
  return list.some((tool) => isAffiliate(tool));
}
