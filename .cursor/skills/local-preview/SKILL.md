---
name: local-preview
description: >-
  Run or build this Jekyll site locally with Docker Compose or Bundler, then
  verify changed pages. Use when previewing, serving, building, or checking
  that relative_url and GitHub Pages baseurl still work.
---

# Local preview

Prefer Docker when Compose is available. The gem volume is **external**.

## Docker

```bash
docker volume create jekyll_gems
docker compose up
```

Site: `http://localhost:4000` (livereload on `35729`). Uses `_config.yml` (`baseurl` empty).

If gems fail to install inside the container, recreate the volume only after confirming with the user:

```bash
docker volume rm jekyll_gems
docker volume create jekyll_gems
```

## Bundler (no Docker)

```bash
bundle install
bundle exec jekyll serve --livereload
```

Production-like build (this is what CI runs):

```bash
bundle exec jekyll build --config _config_prod.yml
```

Output is `_site/`. With prod config, asset URLs must start with `/site/`. Do not commit `_site/`.

## Verify after a change

- New post: `/blog/` (thumbnail + description) and the post permalink.
- New case study: `/portfolio/` (filter + card) and `portfolio/<slug>/`.
- Layout/CSS: home, blog, one post, portfolio, contact — Arter chrome (sidebar + menu) still renders.
- Broken images almost always mean a missing `| relative_url` or a path without `/public/uploads/...`.

Do not start a second `jekyll serve` if port 4000 is already in use. Reuse the running container or process.
