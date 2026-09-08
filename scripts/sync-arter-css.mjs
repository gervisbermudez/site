import { copyFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public");

/** Only the CSS files Next serves (originals keep WordPress `?ver=` names). */
const ORIGINALS = [
  "themes/arter/style.css?ver=6.6.2.css",
  "themes/arter/assets/css/bootstrap.css?ver=6.6.2.css",
  "themes/arter/assets/fonts/font-awesome/css/font-awesome.css?ver=6.6.2.css",
  "plugins/elementor/assets/css/frontend.min.css?ver=3.24.3.css",
  "uploads/elementor/css/post-45.css?ver=1721951380.css",
];

for (const relative of ORIGINALS) {
  const from = path.join(ROOT, relative);
  const to = path.join(ROOT, relative.replace(/\?ver=.*$/, ""));
  await copyFile(from, to);
}

console.log("Synced Arter CSS copies (stripped ?ver= filenames).");
