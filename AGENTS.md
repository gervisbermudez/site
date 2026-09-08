# Agent instructions

Personal site of **Gervis Bermudez**: blog + portfolio. Jekyll 4.4 with Arter/Elementor markup exported from WordPress. Production: `https://gervisbermudez.github.io/site`.

## Stack

- Jekyll `~> 4.4.1` with `jekyll-feed`, `jekyll-paginate`, `jekyll-seo-tag`, `jekyll-sitemap`
- Pages are HTML + Liquid, not Markdown (including `_posts/`)
- Theme assets: `public/themes/arter/`
- Overrides: `public/css/styles.css`
- Deploy: GitHub Actions (`.github/workflows/static.yml`) builds with `_config_prod.yml` and pushes `_site` to `gh-pages`

## Directory map

| Path | Role |
| --- | --- |
| `_posts/` | Blog posts (`YYYY-MM-DD-slug.html`) |
| `_layouts/` | `default.html`, `post.html` |
| `_includes/` | Shared chrome (head, menu, sidebar, footer, banners) |
| `_data/portfolio.yml` | Portfolio grid source of truth |
| `portfolio/` | One folder per case study (`index.html`) |
| `blog/`, `about-me/`, `contact/` | Static pages |
| `public/uploads/` | Images (`YYYY/MM/filename`) |
| `public/css/styles.css` | Site-specific CSS (edit here, not the theme) |
| `public/plugins/`, `public/themes/` | WordPress dumps — do not rewrite |

## Config

- `_config.yml` — local. `url` and `baseurl` are empty.
- `_config_prod.yml` — production. `url: https://gervisbermudez.github.io`, `baseurl: /site`.
- Timezone: `America/Argentina/Buenos_Aires`.
- Permalink: `/blog/:categories/:year/:month/:day/:title`.
- Pagination: 6 posts, path `/blog/page:num/`.

Never copy production `url`/`baseurl` into `_config.yml`. Always prefix asset and internal links with `| relative_url` so they work locally and on GitHub Pages.

## Hard rules

1. **Do not clean Elementor markup.** Class names, `data-id`, `elementor-*` wrappers, and Arter classes are load-bearing. Match existing pages; do not convert them to semantic HTML.
2. **Posts are HTML files**, not `.md`. Body lives inside `<div class="page-body">`.
3. **Do not edit** `public/plugins/` or vendor theme JS/CSS unless the user asks.
4. **Do not commit** `_site/`, `vendor/`, or `.env*`.
5. **Do not invent pages** in the main nav. Menu is `_includes/menu.html`.
6. New CSS goes in `public/css/styles.css`. Do not fight Arter by editing minified plugin CSS.
7. Images and internal hrefs: `{{ 'path' | relative_url }}` or `{{ page.banner | relative_url }}`. For lightbox images on posts, add `data-magnific-image` and `data-no-swup`.

## Voice and language

- Posts and case studies: **English**, first person, conversational, process-first (thesis, tradeoffs, what was skipped).
- UI is mixed EN/ES (`Anterior` / `Siguiente` on the blog). Do not “fix” existing Spanish UI unless asked.
- Sign off posts by inviting feedback and linking relevant GitHub/demo URLs. Author is always `Gervis Bermudez`.

## Common workflows

- New blog post → skill `write-blog-post`
- New portfolio item → skill `add-portfolio-item`
- Run locally → skill `local-preview`

## Verification

After UI or content changes: build or serve the site, then check the changed URL (and `/blog/` if a post, `/portfolio/` if a case study). Confirm images load under `baseurl`, code blocks highlight, and Swup does not intercept lightbox/external links.
