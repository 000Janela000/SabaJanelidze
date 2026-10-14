// Astro builds the whole site as plain static HTML into dist/.
// English lives at the root (/), Georgian under /ka/. URLs never end with a slash:
// /work/bitnet is built as dist/work/bitnet.html.
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.sabajanelidze.com",
  output: "static",
  trailingSlash: "never",
  build: {
    format: "file",
    // Put the CSS inside each HTML page: one request less before the first paint.
    inlineStylesheets: "always",
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ka"],
    routing: { prefixDefaultLocale: false },
  },
  compressHTML: true,
  server: { port: 4321 },
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    // Never inline scripts or fonts as data: URLs. A later Content-Security-Policy can then block inline scripts,
    // and the JavaScript budget check can measure real files.
    build: { assetsInlineLimit: 0 },
  },
});
