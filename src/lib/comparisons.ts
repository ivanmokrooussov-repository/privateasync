import { categories } from "./categories";
import { href } from "./paths";
import type { ColumnId, Tool } from "./types";
import { byName, tools } from "./tools";

export interface Comparison {
  slug: string;
  path: string;
  title: string;
  h1: string;
  description: string;
  paragraphs: string[];
  bullets?: string[];
  toolIds?: string[];
  select?: (tool: Tool) => boolean;
  columns: ColumnId[];
  pair?: [string, string];
  showE2eeGuide?: boolean;
  related: string[];
}

const chatCategoryNames = new Set(
  ["e2ee-team-chat", "self-hosted-open-source-chat", "threaded-discussion"]
    .map((slug) => categories.find((category) => category.slug === slug)?.name)
    .filter((name): name is string => Boolean(name)),
);

const chatOnly = new Set(
  ["e2ee-team-chat", "self-hosted-open-source-chat"]
    .map((slug) => categories.find((category) => category.slug === slug)?.name)
    .filter((name): name is string => Boolean(name)),
);

const standard: ColumnId[] = [
  "name",
  "price",
  "free",
  "e2ee",
  "oss",
  "host",
  "jurisdiction",
  "verified",
];

const withCategory: ColumnId[] = [
  "name",
  "category",
  "price",
  "free",
  "e2ee",
  "oss",
  "host",
  "jurisdiction",
  "verified",
];

const withCompliance: ColumnId[] = [
  "name",
  "price",
  "free",
  "e2ee",
  "oss",
  "host",
  "jurisdiction",
  "compliance",
  "verified",
];

export const comparisons: Comparison[] = [
  {
    slug: "slack-alternatives-privacy",
    path: href("/slack-alternatives-privacy"),
    title: "Slack alternatives on privacy fields | PrivateAsync",
    h1: "Slack alternatives, compared on the fields we verified",
    description:
      "Alphabetical comparison of team chat tools on price, free tier, end-to-end encryption claims, open source, self-hosting, and jurisdiction.",
    paragraphs: [
      "This page is for someone comparing team chat when privacy is part of the decision: the price the vendor showed, whether a free tier is recorded, whether the vendor claims end-to-end encryption, whether the project is open source, whether self-hosting is offered, and which jurisdiction note we stored.",
      "The rows are every tool in the two chat categories in this directory: E2EE team chat, and self-hosted / open-source chat. Slack is not in the dataset, so this page does not describe Slack’s encryption or its admin tools. The order is alphabetical by name.",
      "Read “No claim” as “the pages we checked did not claim end-to-end encryption.” It is not a lab result, and it is not a statement that a particular person can read a message. The price cell is the vendor’s text, including where a number was not on the page. Sources are on each tool page.",
    ],
    toolIds: [
      "wire",
      "threema-work",
      "element",
      "signal",
      "aws-wickr",
      "stackfield",
      "simplex-chat",
      "mattermost",
      "rocket-chat",
      "nextcloud-talk",
      "stoat",
      "campfire",
      "infomaniak-kchat",
    ],
    columns: [
      "name",
      "category",
      "price",
      "free",
      "e2ee",
      "oss",
      "host",
      "jurisdiction",
      "compliance",
      "verified",
    ],
    related: [
      "end-to-end-encrypted-team-chat",
      "self-hosted-slack-alternatives",
      "free-open-source-slack-alternatives",
      "can-your-boss-read-your-slack-messages",
    ],
  },
  {
    slug: "end-to-end-encrypted-team-chat",
    path: href("/end-to-end-encrypted-team-chat"),
    title: "Team chat whose vendors claim end-to-end encryption | PrivateAsync",
    h1: "End-to-end encrypted team chat, as claimed by the vendor",
    description:
      "The E2EE team chat category: each vendor’s pages claimed end-to-end encryption. Price, free tier, self-hosting, and jurisdiction are shown as recorded.",
    paragraphs: [
      "These rows are the whole E2EE team chat category. On the verified date, each vendor’s pages claimed end-to-end encryption. This directory did not audit the cryptography. What is covered — texts, files, calls, which clients — is only as specific as the source linked from the tool page.",
      "A shared “yes” on encryption does not make the other columns the same. Use the free-tier and price cells for whether a free plan is recorded and what the vendor actually printed. Use the jurisdiction cell for the note we stored, including when that note names a company and says the country was not stated.",
      "Signal’s dataset description records no admin console. That is a product shape, not a ranking. Tools with no affiliate program stay in this table in alphabetical order with the others.",
    ],
    toolIds: ["wire", "threema-work", "element", "signal", "aws-wickr", "stackfield", "simplex-chat"],
    columns: withCompliance,
    related: ["slack-alternatives-privacy", "can-your-boss-read-your-slack-messages", "self-hosted-slack-alternatives"],
  },
  {
    slug: "self-hosted-slack-alternatives",
    path: href("/self-hosted-slack-alternatives"),
    title: "Self-hosted Slack alternatives | PrivateAsync",
    h1: "Self-hosted Slack alternatives in this directory",
    description:
      "Mattermost, Rocket.Chat, Nextcloud Talk, Zulip, Stoat, Campfire, and Element, with the self-host and encryption fields recorded from vendor pages.",
    paragraphs: [
      "This page lists seven tools recorded as self-hostable that people look up as Slack alternatives: Mattermost, Rocket.Chat, Nextcloud Talk, Zulip, Stoat (formerly Revolt), Campfire (ONCE), and Element. Zulip is in threaded discussion. Element is in E2EE team chat. The other five are in self-hosted / open-source chat.",
      "Self-hosting is not the same field as end-to-end encryption. The groups under the introduction are counted from these rows. “No claim” means the pages checked did not claim end-to-end encryption. “Optional” means the vendor described it as optional.",
      "A self-hosted edition is not automatically a price of zero. Several price cells record a free self-hosted option and a separate paid hosted or supported plan. The cell is the vendor’s wording.",
    ],
    toolIds: ["mattermost", "rocket-chat", "nextcloud-talk", "zulip", "stoat", "campfire", "element"],
    columns: [
      "name",
      "category",
      "price",
      "free",
      "e2ee",
      "oss",
      "host",
      "jurisdiction",
      "compliance",
      "verified",
    ],
    related: ["slack-alternatives-privacy", "free-open-source-slack-alternatives", "async-first-team-chat"],
  },
  {
    slug: "free-open-source-slack-alternatives",
    path: href("/free-open-source-slack-alternatives"),
    title: "Open-source Slack alternatives | PrivateAsync",
    h1: "Open-source Slack alternatives, with the free-tier field we recorded",
    description:
      "Open-source tools in the chat and threaded-discussion categories, with repository links on each tool page and the free-tier value recorded beside the price.",
    paragraphs: [
      "The table is every tool in E2EE team chat, self-hosted / open-source chat, and threaded discussion whose open-source field is “yes”. Video, email, and file-sharing tools are left off, including open-source ones, because this page is about Slack alternatives.",
      "Open source and a free tier are different fields. A project can be open source and still record a paid hosted plan, a user cap, or a trial instead of a free tier. The price cell is where those limits were written down. Repository links are on the tool page.",
      "Every row is open source recorded as yes, because that is the rule for this page. Other columns can still say not stated or unknown. Tools whose open-source field is not stated are on the category pages instead.",
    ],
    select: (tool) => chatCategoryNames.has(tool.category) && tool.open_source === "yes",
    columns: [
      "name",
      "category",
      "price",
      "free",
      "e2ee",
      "oss",
      "host",
      "jurisdiction",
      "compliance",
      "verified",
    ],
    related: ["slack-alternatives-privacy", "self-hosted-slack-alternatives", "async-first-team-chat"],
  },
  {
    slug: "loom-alternatives",
    path: href("/loom-alternatives"),
    title: "Loom alternatives: price and encryption claims | PrivateAsync",
    h1: "Loom alternatives in this directory",
    description:
      "Async video tools, including Loom, compared on the price shown, the free tier, open source, self-hosting, and whether the vendor claims end-to-end encryption.",
    paragraphs: [
      "The rows are the whole Async video messaging category, Loom included, so the reference product sits in the same table as the alternatives. Compared fields are the price as shown, the free tier, open source, self-hosting, jurisdiction, and whether the vendor claims end-to-end encryption.",
      "Do not treat this category as a list of end-to-end encrypted video tools. The encryption groups below are counted from the rows. “No claim” means the official pages we checked did not claim end-to-end encryption. That is not, by itself, a finding about who inside a company can open a recording.",
      "Where a price cell says a figure was not captured, that is because it was not in the page we could read. Those cells stay incomplete instead of being filled in.",
    ],
    toolIds: ["loom", "cap", "tella", "zight", "screenpal", "claap", "vidyard", "supercut"],
    columns: withCompliance,
    related: ["geekbot-alternatives", "async-first-team-chat"],
  },
  {
    slug: "geekbot-alternatives",
    path: href("/geekbot-alternatives"),
    title: "Geekbot alternatives for async standups | PrivateAsync",
    h1: "Geekbot alternatives for async standups",
    description:
      "Async standup tools, Geekbot included, with the price shown, free tier, platforms the vendor named, and whether open source or self-hosting was stated.",
    paragraphs: [
      "The rows are the whole Async standups & check-ins category, Geekbot included. The useful columns for this search are the price as shown, the free-tier field, the platforms the vendor named, and whether open source or self-hosting was stated.",
      "None of these product pages need to be described as end-to-end encrypted unless the row says so. The encryption group below is counted from the dataset. Platform cells are only what the vendor listed. “Unknown” means the pages we checked did not list platforms.",
      "A free tier can still have a user cap or a credit limit. That limit is in the price text, not in a separate score.",
    ],
    toolIds: ["geekbot", "dailybot", "standuply", "steady", "standup-alice", "asincly", "morgenruf"],
    columns: ["name", "price", "free", "e2ee", "oss", "host", "platforms", "jurisdiction", "verified"],
    related: ["async-first-team-chat", "loom-alternatives"],
  },
  {
    slug: "zoom-alternatives-end-to-end-encrypted",
    path: href("/zoom-alternatives-end-to-end-encrypted"),
    title: "Zoom alternatives and the encryption claim | PrivateAsync",
    h1: "Private video meetings, and which vendors claim end-to-end encryption",
    description:
      "Eight meeting tools from the dataset, with the end-to-end encryption field shown per vendor. Not every row is a yes. Zoom itself is not in the dataset.",
    paragraphs: [
      "People search for a private or end-to-end encrypted alternative to Zoom. This page lists Proton Meet, Jitsi Meet, Element Call, Wire, Whereby, Brave Talk, BigBlueButton, and Galène. Wire is filed under team chat and is included because its listing covers calls. The others are in Private video meetings.",
      "The page URL matches that search. The encryption column does not. Read the groups below before treating the list as “all end-to-end encrypted.” “Optional” means the vendor described end-to-end encryption as optional. “No claim” means the pages we checked did not claim it.",
      "Zoom is not in the dataset. This page does not describe Zoom’s encryption. Order is alphabetical.",
    ],
    toolIds: [
      "proton-meet",
      "jitsi-meet",
      "element-call",
      "wire",
      "whereby",
      "brave-talk",
      "bigbluebutton",
      "galene",
    ],
    columns: [
      "name",
      "category",
      "price",
      "free",
      "e2ee",
      "oss",
      "host",
      "jurisdiction",
      "compliance",
      "verified",
    ],
    related: ["end-to-end-encrypted-team-chat", "slack-alternatives-privacy"],
  },
  {
    slug: "async-first-team-chat",
    path: href("/async-first-team-chat"),
    title: "Async team chat: Twist, Zulip, and the others | PrivateAsync",
    h1: "Async-first team chat and threaded discussion",
    description:
      "Twist, Zulip, Discourse, Flarum, and Basecamp compared on price, free tier, open source, self-hosting, and encryption claims. Includes a field-by-field look at Twist and Zulip.",
    paragraphs: [
      "These five tools are the Threaded discussion & forums category. They are grouped together because the product is organized around threads or topics rather than a live channel. This page does not score which one is “more async.” It lines up the fields we verified.",
      "Twist and Zulip are the pair people compare. The two cards below are only the recorded fields, so the differences that are actually in the dataset are visible. Neither card is placed first as a recommendation. The wider table keeps Discourse, Flarum, and Basecamp in the same view.",
    ],
    toolIds: ["twist", "zulip", "discourse", "flarum", "basecamp"],
    columns: standard,
    pair: ["twist", "zulip"],
    related: ["free-open-source-slack-alternatives", "self-hosted-slack-alternatives", "geekbot-alternatives"],
  },
  {
    slug: "encrypted-email-for-business",
    path: href("/encrypted-email-for-business"),
    title: "Encrypted email for business, as stated by the vendor | PrivateAsync",
    h1: "Encrypted email for teams and small businesses",
    description:
      "Five business email tools compared on the price shown, free tier, and what the vendor says about end-to-end encryption, plus the jurisdiction note we recorded.",
    paragraphs: [
      "The rows are the Encrypted email for teams category. The page is for comparing business email on the price as shown, the free tier, and what the vendor says about end-to-end encryption, plus the jurisdiction text we recorded.",
      "The category name is broader than the encryption column. Some vendors state end-to-end encryption, some state that it is optional, and for one tool the field was not found. The groups below are counted from the rows. We did not test whether every message in a mailbox is end-to-end encrypted.",
      "Jurisdiction notes are copied from the vendor pages, including limits inside the note (for example, servers named while the headquarters country was not stated). The cell shows that full note.",
    ],
    toolIds: ["proton-mail-business", "tuta", "mailfence", "startmail", "hushmail"],
    columns: withCompliance,
    related: ["secure-file-sharing-for-teams"],
  },
  {
    slug: "secure-file-sharing-for-teams",
    path: href("/secure-file-sharing-for-teams"),
    title: "Secure file sharing for teams | PrivateAsync",
    h1: "Secure file sharing for teams, with the encryption claim on the page",
    description:
      "Seven file-sharing tools compared on price, free tier, end-to-end encryption claims, open source, self-hosting, and jurisdiction, as recorded from vendor pages.",
    paragraphs: [
      "The rows are the Secure file sharing category. Compared fields are the price as shown, the free tier, the end-to-end encryption claim, open source, self-hosting, and jurisdiction.",
      "“Vendor states end-to-end encryption” and “vendor states that it is optional” are different rows. The groups below count them. A missing price was left unknown when the page we fetched did not show one.",
      "Open source and self-hosting are separate yes / not stated values. A tool can claim end-to-end encryption without publishing a repository, and a self-hosted tool can describe encryption as optional.",
    ],
    toolIds: ["tresorit", "proton-drive", "sync-com", "filen", "internxt", "nextcloud-hub", "cryptpad"],
    columns: withCompliance,
    related: ["encrypted-email-for-business"],
  },
  {
    slug: "can-your-boss-read-your-slack-messages",
    path: href("/guides/can-your-boss-read-your-slack-messages"),
    title: "Can your boss read your Slack messages? | PrivateAsync",
    h1: "Can your boss read your Slack or Teams messages?",
    description:
      "This directory cannot answer for Slack or Teams, because they are not in the dataset. It does show the end-to-end encryption field for the team-chat tools that were checked.",
    paragraphs: [
      "This directory cannot say whether your boss can read Slack or Microsoft Teams messages. Slack and Teams are not in the verified dataset, so this page does not describe their encryption, their admin export, or their retention tools.",
      "What it can show is the end-to-end encryption field for the team-chat tools we did check, taken from each vendor’s own pages. People ask the question because “encrypted” is used for more than one setup. Encryption of the connection, or of data on a disk, can be true while the provider can still open messages. This dataset records an end-to-end encryption claim only when the vendor’s pages make that claim. We do not treat a different kind of encryption as a “yes,” and we do not test the cryptography.",
      "A “yes” is not a promise that every file, call, bot, or backup is covered. The source link on the tool page is the page we used. A “no claim” is not proof that an employer can read a message. It means we will not describe the product as end-to-end encrypted, because the vendor pages we checked did not say that.",
      "If the decision is whether an administrator can read a workspace, look for a vendor page about admin export, compliance archives, or key management, and use the sources on the tool. This directory does not add that as a separate tested field. The table is every tool in the two chat categories, alphabetical, with the encryption value recorded.",
    ],
    showE2eeGuide: true,
    select: (tool) => chatOnly.has(tool.category),
    columns: ["name", "category", "e2ee", "price", "free", "oss", "host", "verified"],
    related: ["end-to-end-encrypted-team-chat", "slack-alternatives-privacy"],
  },
];

export function comparisonBySlug(slug: string): Comparison {
  const page = comparisons.find((item) => item.slug === slug);
  if (!page) throw new Error(`No comparison page with slug “${slug}”.`);
  return page;
}

export function toolsForComparison(page: Comparison): Tool[] {
  if (page.toolIds && page.select) {
    throw new Error(`Comparison “${page.slug}” should set tool ids or a rule, not both.`);
  }
  let list: Tool[];
  if (page.toolIds) {
    const seen = new Set<string>();
    list = page.toolIds.map((id) => {
      if (seen.has(id)) throw new Error(`Comparison “${page.slug}” lists “${id}” twice.`);
      seen.add(id);
      const tool = tools.find((item) => item.id === id);
      if (!tool) {
        throw new Error(
          `src/lib/comparisons.ts: “${page.h1}” lists “${id}”, which is not a tool id in tools.json.`,
        );
      }
      return tool;
    });
  } else if (page.select) {
    list = tools.filter(page.select);
    if (list.length === 0) throw new Error(`Comparison “${page.slug}” matched no tools.`);
  } else {
    throw new Error(`Comparison “${page.slug}” has no tools.`);
  }
  return list.slice().sort(byName);
}

export function comparisonsForTool(tool: Tool): Comparison[] {
  return comparisons.filter((page) => {
    if (page.toolIds) return page.toolIds.includes(tool.id);
    return page.select?.(tool) ?? false;
  });
}

export const rootComparisons = comparisons.filter((page) => !page.path.startsWith("/guides/"));
