# PrivateAsync

PrivateAsync is a small directory of privacy-focused and async team communication tools. After you build it, the site is a folder of plain files. There is no server to run, no accounts, and no tracking script.

The facts live in one file: `src/data/tools.json`. The pages are generated from that file. If a fact was not found, the file says `unknown` and the site says unknown. It does not guess.

The public address is [https://privateasync.pages.dev](https://privateasync.pages.dev).

## Update a tool

1. Open `src/data/tools.json`.
2. Find the tool by its `id` (for example `zulip`).
3. Change the fields. Use `unknown` when you did not find the fact. Do not fill a gap from memory.
4. Set `date_verified` to the day you checked, as `YYYY-MM-DD`.
5. Put the pages you actually opened in `source_urls`.
6. Save, then build (see below).

What the values mean:

| Field | Allowed values |
| --- | --- |
| `free_tier` | `yes`, `no_trial_only`, `unknown` |
| `e2ee` | `yes`, `optional`, `no_claim`, `unknown` |
| `open_source` | `yes`, `not_stated`, `unknown` |
| `self_hostable` | `yes`, `not_stated`, `unknown` |
| `affiliate_program` | `yes`, `credit-only`, `reseller-only`, `none_found`, `no`, `unknown` |

`e2ee` value `no_claim` means the pages you checked did not claim end-to-end encryption. It does not mean you tested the product. `not_stated` means the vendor did not state that field. `unknown` means you did not find it.

`affiliate_url` in this file is the vendor’s own program page, when you found one. It is **not** the tracking link for this site. Leave it as `unknown` when there is no such page.

`pricing_as_shown` is the price text from the vendor’s page, including “unknown” or a note that a number was not on the page. Do not rewrite it into a number the page did not show.

To add a tool, copy an existing block, give it a new `id` (lowercase letters, numbers, hyphens), and use a category name that already exists. The build stops if the category is new. To add a category, add it in `src/lib/categories.ts` as well, with the same name.

To remove a tool, delete its block. If a comparison page names that `id`, remove it from `src/lib/comparisons.ts` too. The build tells you which page still names it.

The wording on the site (“vendor states…”) and the methodology page come from these values. You do not edit that wording for each tool.

## Add an affiliate URL

1. Open `src/config.ts`.
2. Under `affiliateLinks`, add a line with the tool id and your tracking URL:

```ts
export const affiliateLinks: Record<string, string> = {
  geekbot: "https://example.com/your-tracking-link",
};
```

3. Build again.

The visit link for that tool then uses your URL, shows a small “affiliate” label, and sets `rel="sponsored noopener"`. Tools without a line keep the official URL. Alphabetical order does not change. The footer disclosure is already on every page; a page that contains one of these links repeats it above the link.

Leave `affiliateLinks` empty if you have no tracking URL yet.

## The dataset download

The free sample is about 10 tools. Their ids are `SAMPLE_TOOL_IDS` in `src/config.ts`. The build writes `public/sample-tools.csv` from those ids.

To show a button for the paid full file, set `GUMROAD_DATASET_URL` in `src/config.ts` to the Gumroad product link. Leave it as `""` and the button stays hidden. This site does not take payment.

Contact and “Get featured” already point at `https://mokrooussov.gumroad.com`. Change `contactUrl` in the same file if that address changes.

## Build

You need Node.js 22.

```bash
npm install
npm run build
```

The finished site is the `dist` folder. Open it locally with:

```bash
npm run preview
```

`npm run dev` is only for editing on your own computer.

## Cloudflare Pages

The site is deployed by **Direct Upload**. Cloudflare does not build it for you. You build on your computer and upload the result.

1. Install Node.js 22.
2. In this folder, run `npm install`, then `npm run build`.
3. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Direct Upload**.
4. Name the project `privateasync` if you want the address `https://privateasync.pages.dev`.
5. Upload the **contents** of the `dist` folder.
6. Leave environment variables empty. The site does not use any.
7. Do not turn on Cloudflare Web Analytics, and do not paste a tracking snippet, if you want the site to stay free of tracking scripts and cookies.

There is no build command and no output-directory setting on Cloudflare’s side when you use Direct Upload. The output directory matters only on your computer: it is `dist`.

If you later connect the Git repository instead of uploading by hand, the settings are:

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 22 (also recorded in `.node-version`)

The canonical address is set in two places. If you use a different domain, change both, then build and upload again:

- `site` in `astro.config.mjs`
- `siteUrl` in `src/config.ts`

Pages that name tools in sentences, not only in the table, are in `src/lib/comparisons.ts`. Category introductions are in `src/lib/categories.ts`.
