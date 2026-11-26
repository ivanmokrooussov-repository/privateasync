/**
 * Site settings the owner edits. Tool facts live in src/data/tools.json, not here.
 *
 * Affiliate links: add a tracking URL under affiliateLinks, keyed by the tool id.
 * Leave a tool out of this map to keep linking to its official site.
 * Do not put tracking URLs in tools.json. The affiliate_url field there is only
 * the vendor's public program page, when one was found.
 */

export const siteName = "PrivateAsync";

/** Keep this in sync with `site` in astro.config.mjs. No trailing slash. */
export const siteUrl = "https://privateasync.pages.dev";

export const contactUrl = "https://mokrooussov.gumroad.com";

/**
 * Paid full dataset on Gumroad. Leave this as an empty string to hide the button.
 * Example: "https://mokrooussov.gumroad.com/l/privateasync"
 */
export const GUMROAD_DATASET_URL = "";

/**
 * Tracking URLs this site is paid for. Key is the tool id from tools.json.
 * Example:
 *   geekbot: "https://example.com/your-affiliate-link",
 */
export const affiliateLinks: Record<string, string> = {};

/**
 * Tool ids included in the free CSV sample (about 10 rows).
 * The sample is rebuilt by `npm run build`.
 */
export const SAMPLE_TOOL_IDS = [
  "signal",
  "wire",
  "mattermost",
  "zulip",
  "cap",
  "loom",
  "geekbot",
  "jitsi-meet",
  "proton-mail-business",
  "sync-com",
];
