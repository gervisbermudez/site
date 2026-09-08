---
name: local-preview
description: >-
  Run or build this Next.js site locally, then verify changed pages. Use when
  previewing, serving, building, or checking that /public and /uploads URLs work.
---

# Local preview

This branch is Next.js. Do not start Jekyll/`docker compose` unless you are working on `main`.

## Dev server

```bash
npm install
npm run dev
```

Site: `http://localhost:3000`. `predev` copies Arter CSS files that have `?ver=` in the filename to clean names so Next can serve them.

## Production-like build

```bash
npm run build
npm start
```

Do not use `output: 'export'` and do not deploy `_site/` from this branch.

## Verify after a change

- New post: `/blog/` (thumbnail + description) and `/blog/YYYY/MM/DD/slug/`.
- New case study: `/portfolio/` (filter + card) and `/portfolio/<slug>/`.
- Layout/CSS: home, blog, one post, portfolio, contact — Arter chrome (sidebar + menu) still renders.
- Images: `next/image` uses `/uploads/...`. Post HTML still uses `/public/uploads/...` (rewrite).

Do not start a second `next dev` if port 3000 is already in use.
