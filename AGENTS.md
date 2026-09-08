# Agent instructions

Personal site of **Gervis Bermudez**: blog + portfolio. **This branch (`nextjs-migration`) is Next.js App Router + TypeScript**, keeping the Arter look via the existing theme CSS. Production on `main` is still Jekyll at `https://gervisbermudez.github.io/site`.

Do not merge this branch or deploy it as production until the owner asks. Do not push to `gh-pages`. Do not edit `.github/workflows/static.yml` as the production deploy.

## Stack

- Next.js App Router (TypeScript), `trailingSlash: true`
- Theme CSS: `public/themes/arter/` + overrides in `public/css/styles.css`
- Chrome: React components with Arter classes (`art-app`, sidebar, menu)
- Posts and case studies: HTML + front matter (not Markdown). Bodies stay HTML; do not convert Elementor to React.
- No jQuery, no `public/themes/arter/assets/js/main.js` (Swup). Use `next/link`, React filters, lightbox, Swiper, Prism.
- Hosting target: **Vercel** (not `output: 'export'` / GitHub Pages)

## Directory map

| Path | Role |
| --- | --- |
| `app/` | App Router routes (`/`, `/blog/`, `/portfolio/<slug>/`, …) |
| `components/` | Arter chrome, home, blog, portfolio, journey |
| `lib/` | Posts, portfolio YAML, timeline, Liquid HTML helpers |
| `_posts/` | Blog posts (`YYYY-MM-DD-slug.html`) |
| `_data/portfolio.yml` | Portfolio grid source of truth |
| `portfolio/<slug>/index.html` | Case study HTML body |
| `_data/personal_timeline.yml` | Journey chapters + photos |
| `public/uploads/` | Images (`YYYY/MM/filename`) |
| `public/css/styles.css` | Site-specific CSS |
| `public/plugins/`, `public/themes/` | WordPress dumps — do not rewrite |

Jekyll page HTML (`index.html`, `about-me/`, `_layouts/`, `_includes/`) was removed; chrome lives in React. Keep `_posts/` and `portfolio/<slug>/index.html`.

## URLs

- Permalinks: `/blog/YYYY/MM/DD/slug/`, `/portfolio/<slug>/`, `/blog/page/2/`, `/about-me/`, `/contact/`, `/journey/`
- Static files live in `public/` and are served from `/` (`/uploads/...`, `/themes/arter/...`). A rewrite also serves Jekyll-style `/public/...` paths.
- In React/`next/image`, use `/uploads/...` (no `public/` prefix).
- In post HTML, keep `{{ '/public/uploads/...' | relative_url }}`; `lib/html.ts` turns Liquid into `/public/...`.

## Hard rules

1. **Do not clean Elementor markup** in post or case-study HTML.
2. **Posts are HTML files**, not `.md`. Body lives inside `<div class="page-body">` (newer posts).
3. **Do not edit** `public/plugins/` or vendor theme JS/CSS unless asked.
4. **Do not invent pages** in the main nav. Menu is Home, Contact, Portfolio, About, Blog. Journey is not in the menu.
5. New CSS goes in `public/css/styles.css` or `app/globals.css` for Next-only widgets.
6. Lightbox: `data-magnific-image` on post figures; Journey galleries use `data-magnific-gallery`.

## Voice and language

- Posts and case studies: **English**, first person, conversational, process-first.
- UI is mixed EN/ES (`Anterior` / `Siguiente` on the blog). Do not “fix” existing Spanish UI unless asked.
- Author is always `Gervis Bermudez`.

## Common workflows

- New blog post → skill `write-blog-post`
- New portfolio item → skill `add-portfolio-item`
- Run locally → skill `local-preview`

## Vercel (not cut over)

This branch is meant to preview on Vercel. Production cutover is **out of scope** until requested.

When you *are* ready to cut over:

1. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://gervisbermudez.com` or the `vercel.app` URL).
2. Attach the project to this repo; deploy the `nextjs-migration` branch first as a preview.
3. After go-live: 301 `https://gervisbermudez.github.io/site/:path*` → the new origin (including `/site/` prefix stripped).
4. Only then stop GitHub Pages / replace `.github/workflows/static.yml`.

## Verification

After UI or content changes: `npm run dev` or `npm run build`, then check the changed URL (and `/blog/` if a post, `/portfolio/` if a case study). Confirm images load, code blocks highlight with Prism, and lightbox opens on `data-magnific-image` links.
