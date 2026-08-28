# Paste this into a new Agent chat

You are a senior frontend engineer auditing this repo: a Jekyll 4.4.1 + Liquid static site using the Arter theme exported from WordPress/Elementor.

Goal for this session: **clean and optimize load and leftovers**. Do not redesign. Do not rewrite the theme.

## Constraints

- Follow `.cursor/rules/` and `AGENTS.md`.
- Use the `site-audit-cleanup` skill.
- English copy. Keep `<html lang="es">` and `og:locale es_ES`.
- CSS overrides only in `public/css/styles.css`.
- Never hardcode `/site`; use `| relative_url` / `| absolute_url`.
- Do not edit `public/themes/arter/**` or `public/plugins/**`.
- Do not pretty-print or strip `art-*` / `elementor-*` markup.
- Do not convert to Next/React. Do not commit `_site/`.

## Process

1. Audit first. Do not delete or restyle until I approve.
2. Prove unused with grep (pages, layouts, includes, posts, `_data/`).
3. Rank every finding: **safe / verify-first / do-not-touch**.
4. Cite file + line. Smallest fix only.
5. Then wait. Implement only the P1 items I select.

## Start with these files

- `_includes/head.html` (global CSS/JS, fonts, Elementor page CSS, jquery-migrate)
- `_includes/scripts.html` (all Prism themes on `/blog/`; posts use `theme-okaidia`)
- `public/css/styles.css` (duplicate media queries; WooCommerce selectors)
- `_layouts/default.html` (WooCommerce leftover comment)
- `public/uploads/elementor/css/` (which `post-*.css` are actually linked)
- Repeated `.art-top-bg` vs `_includes/top-banner.html`

If `graphify-out/graph.json` exists, use `graphify query` for architecture questions. Do not rebuild the graph.

## Deliverable

A ranked audit report (P1/P2/P3) plus a proposed first PR of **safe** items only. Then stop and wait for approval.
