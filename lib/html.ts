import { toPublicUrl } from "@/lib/paths";

export function processLiquidHtml(html: string): string {
  let out = html.replace(/\.\.\/(?:\.\.\/)*public\//g, "/public/");

  out = out.replace(
    /\{\{\s*['"]([^'"]+)['"]\s*\|\s*relative_url\s*\}\}/g,
    (_, assetPath: string) => toPublicUrl(assetPath),
  );

  out = out.replace(/\{%\s*include\s+[^%]+%\}/g, "");
  out = out.replace(/\{%(?![{])[^%]+%\}/g, "");

  return out;
}

export function extractScrollBody(html: string): string {
  const scrollbar = html.match(
    /<div id="scrollbar"[^>]*>([\s\S]*)$/,
  );
  let inner = scrollbar ? scrollbar[1] : html;

  const cut = inner.search(
    /\{%\s*include\s+(contact-banner|portfolio-navigator|footer)\.html/,
  );
  if (cut !== -1) {
    inner = inner.slice(0, cut);
  }

  inner = inner.replace(
    /<div class="container-fluid">\s*<!-- footer -->[\s\S]*$/i,
    "",
  );

  return processLiquidHtml(inner).trim();
}
