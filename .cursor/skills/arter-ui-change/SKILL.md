---
name: arter-ui-change
description: Makes visual or layout changes on the Arter/Elementor Jekyll theme without rewriting it. Use when changing CSS, homepage hero, sidebar, menu, contact hub, or shared includes.
---

# Arter UI change

## Workflow

1. Prefer a CSS override in `public/css/styles.css`. Keep `art-*` and `elementor-*` class names.
2. Touch `_includes/` or `_layouts/` only when CSS cannot do it. Keep diffs minimal. Do not restyle the theme into a new design system.
3. Do not edit `public/themes/arter/**` or `public/plugins/**` unless a one-off bug is justified in the change notes.
4. Shared chrome: `_layouts/default.html` + `_includes/side.html` + `_includes/menu.html` (+ `top-banner`, `footer`, `contact-banner` as used). A change here hits every page.
5. After the change, verify **six surfaces** at **1440** and **390**: Home (`index.html`), About (`about-me/`), Blog (`blog/`), one post (`_posts/`), Portfolio (`portfolio/`), Contact (`contact/`).
6. English copy stays English. Do not translate. Do not convert the site to Next/React.

Selector patterns and the verification checklist: [reference.md](reference.md)
