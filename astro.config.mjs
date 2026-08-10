import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Replace https://www.kiedy-matura.pl with https://www.<domain> before first build.
//
// Ikony: WĹASNY system SVG (src/components/Icon.astro + src/icons/set.ts).
// Ĺšwiadomie BEZ astro-icon / @iconify-json â€” wĹ‚asny zestaw ikon to twardy wymĂłg
// (CLAUDE.md "Ikony â€” wĹ‚asne SVG", playbook 05 Â§5). Nie dodawaj tu integracji icon().
export default defineConfig({
  site: "https://www.kiedy-matura.pl",

  integrations: [
    sitemap({
      // ĹšWIADOMIE bez lastmod: new Date() â€” bumpowaĹ‚by lastmod WSZYSTKICH
      // URL-i przy kaĹĽdym rebuildzie = szum dla Googlebota (audyt 2026-07-10).
      changefreq: "weekly",
      priority: 0.7,
      // Wyklucz strony z noindex. KaĹĽda dodatkowa wyindeksowana podstrona
      // (regulamin, dziÄ™kujemy, draftowe landingi) idzie tutaj.
      filter: (page) =>
        !page.includes("/polityka-prywatnosci") &&
        !page.includes("/regulamin"),
      serialize(item) {
        if (item.url === "https://www.kiedy-matura.pl/") item.priority = 1.0;
        return item;
      },
    }),
  ],

  output: "static",

  build: {
    assets: "_assets",
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
    define: {
      "import.meta.env.PUBLIC_API_BASE_URL": JSON.stringify(
        process.env.PUBLIC_API_BASE_URL || ""
      ),
    },
  },
});
