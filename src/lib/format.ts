import type { Tool } from "./types";

export interface ValueMeaning {
  value: string;
  means: string;
}

export const VALUE_GUIDE: Record<"e2ee" | "free_tier" | "open_source" | "self_hostable", ValueMeaning[]> = {
  e2ee: [
    {
      value: "yes",
      means: "Vendor states that the product uses end-to-end encryption.",
    },
    {
      value: "optional",
      means: "Vendor states that end-to-end encryption is optional, not the only mode.",
    },
    {
      value: "no_claim",
      means:
        "The official pages checked do not claim end-to-end encryption. This is not a test of who can read a message.",
    },
    {
      value: "unknown",
      means: "Unknown — not found on the pages checked.",
    },
  ],
  free_tier: [
    {
      value: "yes",
      means: "A free tier is recorded. Limits, if any, are in the price text.",
    },
    {
      value: "no_trial_only",
      means: "No free tier is recorded. The price text may mention a trial.",
    },
    {
      value: "unknown",
      means: "Unknown — not found on the pages checked.",
    },
  ],
  open_source: [
    {
      value: "yes",
      means: "Recorded as open source, from the vendor page or the repository.",
    },
    {
      value: "not_stated",
      means: "Not stated on the pages checked.",
    },
    {
      value: "unknown",
      means: "Unknown — not found on the pages checked.",
    },
  ],
  self_hostable: [
    {
      value: "yes",
      means: "Vendor states that self-hosting is available.",
    },
    {
      value: "not_stated",
      means: "Not stated on the pages checked.",
    },
    {
      value: "unknown",
      means: "Unknown — not found on the pages checked.",
    },
  ],
};

const SHORT_LABELS: Record<string, string> = {
  yes: "Yes",
  no: "No",
  optional: "Optional",
  no_claim: "No claim",
  no_trial_only: "No (trial only)",
  not_stated: "Not stated",
  unknown: "Unknown",
  none_found: "None found",
  "reseller-only": "Reseller only",
  "credit-only": "Credit only",
};

export function displayToken(value: string): string {
  return SHORT_LABELS[value] ?? value;
}

export function meaning(field: keyof typeof VALUE_GUIDE, value: string): string {
  return VALUE_GUIDE[field].find((row) => row.value === value)?.means ?? value;
}

export function pillTone(value: string): string {
  if (value === "yes") return "yes";
  if (value === "optional" || value === "credit-only") return "optional";
  if (value === "unknown" || value === "no_trial_only") return "unknown";
  return "muted";
}

export function complianceStatement(value: string): string {
  if (!value || value === "unknown") return "Unknown — not found on the pages checked.";
  return `Vendor states: “${value}”`;
}

export function affiliateProgramSentence(value: string): string {
  switch (value) {
    case "yes":
      return "A public affiliate or referral program with commission was recorded. The visit link on this site uses a tracking URL only when one is set in the site config.";
    case "credit-only":
      return "Recorded as referral credit only, not a cash commission.";
    case "reseller-only":
      return "Recorded as a reseller or partner program only. Not used as an affiliate link on this site.";
    case "none_found":
      return "No affiliate program was found when this row was checked.";
    case "no":
      return "Recorded as no affiliate program.";
    case "unknown":
      return "Unknown — not found on the pages checked.";
    default:
      return value;
  }
}

const COUNTRIES = [
  "Switzerland",
  "Germany",
  "Canada",
  "Belgium",
  "Netherlands",
  "United States",
  "France",
  "United Kingdom",
  "Sweden",
  "Austria",
  "Ireland",
  "Finland",
  "Norway",
  "Denmark",
  "Australia",
  "Singapore",
];

/** A country word that already appears in the recorded jurisdiction note. Never guesses one. */
export function jurisdictionFacet(value: string): string {
  if (!value || value.trim().toLowerCase() === "unknown") return "unknown";
  const found = COUNTRIES.find((country) => value.toLowerCase().includes(country.toLowerCase()));
  return found ?? "country not stated";
}

export function facetLabel(facet: string): string {
  if (facet === "unknown") return "Unknown";
  if (facet === "country not stated") return "Country not stated";
  return facet;
}

export function displayRecorded(value: string): string {
  if (!value || value === "unknown") return "Unknown";
  return value;
}

export function uniqueUrls(urls: string[] | undefined): string[] {
  const out: string[] = [];
  for (const url of urls ?? []) {
    if (url && url.startsWith("http") && !out.includes(url)) out.push(url);
  }
  return out;
}

export function fieldSources(tool: Tool, key: string): string[] {
  const specific = uniqueUrls(tool.field_sources?.[key]);
  if (specific.length > 0) return specific;
  return uniqueUrls(tool.source_urls).slice(0, 1);
}

export function sourceLabel(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/$/, "");
    return `${parsed.host.replace(/^www\./, "")}${path}`;
  } catch {
    return url;
  }
}

export function isHttpUrl(value: string | undefined): value is string {
  return Boolean(value && value.startsWith("http"));
}

export function verifiedDates(list: Tool[]): string[] {
  return [...new Set(list.map((tool) => tool.date_verified))].sort();
}

export function verifiedSentence(list: Tool[]): string {
  const dates = verifiedDates(list);
  if (dates.length === 0) return "No verified date is recorded.";
  if (dates.length === 1) return `Verified date on every row here: ${dates[0]}.`;
  return `Verified dates here run from ${dates[0]} to ${dates[dates.length - 1]}.`;
}

export function clipText(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  const base = (space > 80 ? cut.slice(0, space) : cut).replace(/[.,;:–-]+$/, "");
  return `${base}…`;
}

export function searchBlob(tool: Tool): string {
  return [
    tool.name,
    tool.id,
    tool.category,
    tool.description,
    tool.pricing_as_shown,
    tool.hq_jurisdiction,
    tool.platforms,
    tool.compliance_claims,
  ]
    .join(" ")
    .toLowerCase();
}
