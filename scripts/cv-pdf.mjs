// Prints the built /cv page to public/saba-janelidze-cv.pdf with headless Chrome, so the PDF always matches the page.
// Run it through `npm run cv:pdf` (build, print, build again so the new PDF is in dist/).
// It serves dist/ itself on a free port (Astro allows only one preview server at a time).
// Chrome: CHROME_PATH, or the default install path on Windows or macOS.
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const dist = resolve("dist");
const out = resolve("public/saba-janelidze-cv.pdf");
const chrome =
  process.env.CHROME_PATH ??
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find(existsSync);
if (!chrome) throw new Error("Chrome not found: set CHROME_PATH");

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2", ".webp": "image/webp", ".svg": "image/svg+xml" };
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  // /cv is built as dist/cv.html (no trailing slashes on this site).
  const file = [join(dist, path), join(dist, `${path}.html`)].find((f) => f.startsWith(dist) && existsSync(f) && extname(f));
  if (!file) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const { port } = server.address();

try {
  // Asynchronous, so this script's server can answer Chrome while it prints.
  await promisify(execFile)(chrome, [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=5000",
    `--print-to-pdf=${out}`,
    `http://127.0.0.1:${port}/cv`,
  ], { timeout: 120000 });
  console.log(`wrote ${out}`);
} finally {
  server.close();
}
