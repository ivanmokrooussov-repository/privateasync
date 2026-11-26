import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "e2ee-team-chat",
    name: "E2EE team chat",
    summary:
      "Messengers filed here because the vendor claimed end-to-end encryption when the row was checked. The claim is linked on each tool page. This site did not test the encryption.",
    related: [
      "/end-to-end-encrypted-team-chat/",
      "/slack-alternatives-privacy/",
      "/guides/can-your-boss-read-your-slack-messages/",
    ],
  },
  {
    slug: "self-hosted-open-source-chat",
    name: "Self-hosted / open-source chat",
    summary:
      "Team chat recorded as something you can run yourself, or as an open-source server, based on the pages we checked. End-to-end encryption is a separate column and is not a “yes” for every tool here.",
    related: [
      "/self-hosted-slack-alternatives/",
      "/free-open-source-slack-alternatives/",
      "/slack-alternatives-privacy/",
    ],
  },
  {
    slug: "async-video-messaging",
    name: "Async video messaging",
    summary:
      "Recorded screen and camera messages sent instead of holding a meeting. A tool can sit in this category without an end-to-end encryption claim. Read that column.",
    related: ["/loom-alternatives/"],
  },
  {
    slug: "async-standups",
    name: "Async standups & check-ins",
    summary:
      "Standup and check-in tools: bots and web apps for a written daily update. Prices and free-tier limits are the text the vendor showed, including where a number was not captured.",
    related: ["/geekbot-alternatives/"],
  },
  {
    slug: "threaded-discussion",
    name: "Threaded discussion & forums",
    summary:
      "Tools organized around threads or topics rather than a live channel. Open source and self-hosting are recorded per tool and are not true of every row.",
    related: ["/async-first-team-chat/", "/free-open-source-slack-alternatives/"],
  },
  {
    slug: "private-video-meetings",
    name: "Private video meetings",
    summary:
      "Meetings grouped here as privacy-minded or self-hosted options. Not every vendor on this page claims end-to-end encryption. The column says which do.",
    related: ["/zoom-alternatives-end-to-end-encrypted/"],
  },
  {
    slug: "secure-file-sharing",
    name: "Secure file sharing",
    summary:
      "File storage and sharing tools included because the vendor claims encryption, the project can be self-hosted, or both. The encryption column is more specific than the category name.",
    related: ["/secure-file-sharing-for-teams/"],
  },
  {
    slug: "encrypted-email",
    name: "Encrypted email for teams",
    summary:
      "Email products included for private or business mail. The encryption column records a vendor claim of end-to-end encryption, an “optional” claim, or unknown.",
    related: ["/encrypted-email-for-business/"],
  },
];

export function categoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function categoryByName(name: string): Category | undefined {
  return categories.find((category) => category.name === name);
}
