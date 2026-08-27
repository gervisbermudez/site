---
name: jekyll-pages-deploy
description: Diagnoses and fixes GitHub Pages / Jekyll path, baseurl, canonical, and CI build issues for this repo. Use when CSS 404s on github.io, broken links in production, deploy workflow failures, or baseurl /site drift.
---

# Jekyll Pages deploy

## Workflow

1. Compare local vs prod config. `_config.yml`: `url` and `baseurl` empty. `_config_prod.yml`: `url=https://gervisbermudez.github.io`, `baseurl=/site`.
2. CI source of truth: `.github/workflows/static.yml` must run `bundle exec jekyll build --config _config_prod.yml` and deploy `_site` to `gh-pages`.
3. Asset 404s on `https://gervisbermudez.github.io/site` are almost always a missing `| relative_url` / `| absolute_url`, or a nested `../public` path. **Do not hardcode `/site`** to “fix” them — that breaks local serve and can double-prefix.
4. Canonical: `{{ site.url }}{{ site.baseurl }}{{ page.url }}` in `_includes/head.html`. Share URLs in `_layouts/post.html` use the same concatenation.
5. Cite **file + line** for every diagnosis. Prefer a Liquid filter fix over config/workflow changes.
6. Do not add gems. Do not change the deploy workflow unless the user asked. Plugins stay: `jekyll-feed`, `jekyll-paginate`, `jekyll-seo-tag`, `jekyll-sitemap`.

## Checks

- Local: `bundle exec jekyll serve` (empty baseurl)
- Prod build: `bundle exec jekyll build --config _config_prod.yml`
- In `_site`, CSS/JS/img hrefs should start with `/site/` **because Jekyll wrote them**, not because templates contain `/site`

Typical failures and the head/workflow lines to inspect: [reference.md](reference.md)
