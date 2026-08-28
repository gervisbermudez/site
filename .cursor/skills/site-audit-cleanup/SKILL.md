---
name: site-audit-cleanup
description: Audits this Jekyll/Arter site for dead CSS, unused assets, WordPress leftovers, and load bloat, then proposes a safe cleanup. Use when the user asks to audit, clean, optimize, reduce CSS/JS, remove unused files, or tidy exported markup.
---

# Site audit and cleanup

This site is a WordPress/Elementor export running on Jekyll. “Optimize” means **remove unused load and leftovers**, not rewrite the theme.

## Hard limits

- Do not convert to Next/React.
- Do not rewrite or pretty-print Arter/Elementor markup (`art-*`, `elementor-*`).
- Do not edit `public/themes/arter/**` or `public/plugins/**` except a justified one-off bug.
- Do not hardcode `/site`. Use `| relative_url` / `| absolute_url`.
- Do not commit or regenerate `_site/` as source.
- Do not translate copy. Keep `<html lang="es">` and `og:locale es_ES`.
- Visual overrides stay in `public/css/styles.css` only.

## Phase 1 — Audit only (default)

Do **not** delete or restyle until the user approves a ranked list.

1. Inventory load: `_includes/head.html`, `_includes/scripts.html`, `public/css/styles.css`.
2. Prove unused before proposing delete: grep references from pages, layouts, includes, posts, `_data/`. Vendor trees may stay on disk even if unlinked.
3. Rank findings: **safe / verify-first / do-not-touch**.
4. Report file + line, why it is unused, risk if removed, and the smallest fix.
5. After shared CSS/include/layout changes (only in a later phase), verify Home, About, Blog, one post, Portfolio, Contact at ~1440 and ~390.

Architecture questions: if `graphify-out/graph.json` exists, run `graphify query "..."` instead of rebuilding the graph.

## Known hotspots (verify, do not assume)

| Area | What to check |
| --- | --- |
| `_includes/scripts.html` | All Prism themes load on `/blog/` routes; posts use `theme-okaidia` only. Keep one theme + toolbar. |
| `_includes/head.html` | Global `elementor-post-214.css` and `elementor-post-45.css`; duplicate Swiper CSS (Arter + Elementor); `jquery-migrate`; two Google Fonts families (Poppins/Courier Prime vs Roboto). |
| `public/uploads/elementor/css/` | `post-8/25/98/99/108/109.css` exist; confirm which are linked. Page IDs in markup (`post-98`, `elementor-214`) are not proof the CSS file is loaded. |
| `public/css/styles.css` | Duplicate heading-color media queries; WooCommerce selectors copied from Arter with no store on this site. |
| `_includes/scripts.html` + `head.html` | WordPress leftovers: WooCommerce comment in `_layouts/default.html`, Site Kit comments, `jquery-migrate`. |
| `public/plugins/contact-form-7/**`, `public/plugins/url-shortify/**` | Present on disk; confirm they are not referenced before proposing unlink (do not delete vendor trees). |
| Pages | Repeated `.art-top-bg` blocks vs `{% include top-banner.html %}`. Deduplicate includes only if output matches. |
| `about-me/index.html` | Hardcoded `https://gervisbermudez.github.io/site/` — report; do not “fix” by hardcoding `/site` in templates. |
| `_config.yml` | Jekyll boilerplate comments; safe to trim, no behavior change. |

## Safe vs forbidden cleanup

**Safe (after approval):** drop unused `<link>`/`<script>` from includes; load Prism theme actually used; remove duplicate rules in `styles.css`; delete **unreferenced** files under `public/uploads/` or `public/css/` that we own; DRY repeated chrome via existing includes.

**Verify-first:** removing `jquery-migrate`, Elementor page CSS, a Swiper stylesheet, or Google Fonts. Diff computed styles / console before and after.

**Forbidden:** stripping `elementor-*` wrappers; renaming `art-*` classes; minifying vendor CSS by hand; deleting anything under `public/themes/arter/**` or `public/plugins/**`; pretty-printing whole exported HTML pages.

## Report format

```
## Findings
### P1 — safe
- file:line — unused because … — fix: …

### P2 — verify-first
- file:line — risk: … — how to verify: …

### P3 — do-not-touch
- path — leave it; reason: …

## Proposed first PR (P1 only)
Files, diff size, rollback.
```

## Phase 2 — Apply

Implement **only** the P1 items the user selected. One concern per change set. Re-serve with `bundle exec jekyll serve` and re-check the six surfaces if chrome/CSS changed.

User-facing paste prompt: [prompt.md](prompt.md)
