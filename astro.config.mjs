// Astro builds the whole site as plain static HTML into dist/.
// English only for now (a Georgian page comes later; /ka redirects home until then). URLs never end with a slash:
// /cv is built as dist/cv.html.
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.sabajanelidze.com",
  output: "static",
  trailingSlash: "never",
  build: {
    format: "file",
    // Put the CSS inside each HTML page: one request less before the first paint.
    inlineStylesheets: "always",
  },
  compressHTML: true,
  server: { port: 4321 },
  devToolbar: { enabled: false },
  vite: {
    // Never inline scripts or fonts as data: URLs. A later Content-Security-Policy can then block inline scripts,
    // and the JavaScript budget check can measure real files.
    build: { assetsInlineLimit: 0 },
  },
});
