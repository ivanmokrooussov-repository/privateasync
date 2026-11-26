import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Public site URL. Keep this in sync with siteUrl in src/config.ts.
export default defineConfig({
  site: "https://privateasync.pages.dev",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [sitemap()],
});
