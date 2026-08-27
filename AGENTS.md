# AGENTS

Personal site of Gervis Bermudez: Jekyll 4.4.1 + Liquid, Arter/Elementor static HTML/CSS/JS.

## Serve and build

```bash
bundle exec jekyll serve
bundle exec jekyll build --config _config_prod.yml
```

Local `_config.yml`: empty `url` / `baseurl`. Prod `_config_prod.yml`: `url=https://gervisbermudez.github.io`, `baseurl=/site`. Live: https://gervisbermudez.github.io/site

## Cursor

- Rules: `.cursor/rules/*.mdc` (site context always on; others glob-scoped)
- Skills: `.cursor/skills/*/SKILL.md` — `new-blog-post`, `new-portfolio-item`, `jekyll-pages-deploy`, `arter-ui-change`

## Graphify

If `graphify-out/graph.json` exists, answer architecture / “how does X relate to Y” questions with `graphify query "..."`. Do not rebuild the graph unless `--update` or the user asks.

## UI verification

After shared layout/CSS/include changes, check Home, About, Blog, one post, Portfolio, and Contact at ~1440 and ~390.

## Out of scope

Do not edit `public/plugins/**`, `public/themes/arter/**` (except a justified one-off bug), `_site/`, or `vendor/`. Do not convert to Next/React. Do not hardcode `/site`.
