# Next.js migration notes

Branch: `nextjs-migration`. `main` stays Jekyll + GitHub Pages.

## What is done

- Arter shell in React (`app/layout.tsx` + sidebar/menu)
- Posts from `_posts/`, case studies from `portfolio/<slug>/index.html`
- Permalinks with `trailingSlash: true`
- Sitemap (`/sitemap.xml`), RSS (`/feed.xml`)
- no jQuery / Swup / Isotope

## Vercel

Preview this branch on Vercel. Do **not** cut over production yet.

Env: `NEXT_PUBLIC_SITE_URL` (canonical origin, no trailing slash). Indexing (`robots` + meta) stays off until that env is a real non-`vercel.app` host.

Jekyll URL aliases already 301 inside Next:

- `/blog/page2/` → `/blog/page/2/`
- `/blog/:category/:year/:month/:day/:slug/` → `/blog/:year/:month/:day/:slug/`
- CodeIgniter `2024/05/07` → `2024/08/07`

After go-live (later):

- 301 `https://gervisbermudez.github.io/site/:path*` → `{NEXT_PUBLIC_SITE_URL}/:path*`
- Then retire `.github/workflows/static.yml` on `main`
