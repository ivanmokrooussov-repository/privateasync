export interface Tool {
  id: string;
  name: string;
  category: string;
  official_url: string;
  description: string;
  free_tier: string;
  pricing_as_shown: string;
  e2ee: string;
  open_source: string;
  repo_url: string;
  self_hostable: string;
  hq_jurisdiction: string;
  platforms: string;
  compliance_claims: string;
  affiliate_program: string;
  affiliate_url: string;
  affiliate_terms: string;
  date_verified: string;
  source_urls: string[];
  field_sources?: Record<string, string[]>;
}

export type ColumnId =
  | "name"
  | "category"
  | "price"
  | "free"
  | "e2ee"
  | "oss"
  | "host"
  | "jurisdiction"
  | "platforms"
  | "compliance"
  | "verified";

export interface Category {
  slug: string;
  name: string;
  summary: string;
  /** Comparison page paths, with a trailing slash. */
  related: string[];
}
