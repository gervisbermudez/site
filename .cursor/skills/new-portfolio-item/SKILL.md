---
name: new-portfolio-item
description: Adds a portfolio project by updating _data/portfolio.yml and cloning an existing project page. Use when adding a case study, portfolio item, or project page.
---

# New portfolio item

## Workflow

1. Read `_data/portfolio.yml` and clone `portfolio/start-cms/index.html`. Do not redesign the case-study page.
2. Append an `items:` entry with the **same YAML shape** as Start CMS: `title`, `category`, `image`, `description`, `link`.
3. `category` must be one or more of `category-web`, `category-design`, `category-apps` (space-separated if combined, e.g. `category-apps category-design`). Filters on the grid come from `categories:` in that YAML — do not reimplement the grid.
4. Create `portfolio/<slug>/index.html` by copying Start CMS. Keep Arter/Elementor class names. Update front matter (`title`, `banner`, `description`, `next_page`) and visible copy/images.
5. `link` in YAML is a site-relative path **without** leading slash, e.g. `portfolio/start-cms/`. Pages consume it with `| relative_url`.
6. `image` in YAML is relative, no leading slash: `public/uploads/...`. Do not invent missing image files; list placeholders.
7. Do not rewrite `portfolio/index.html` or the Isotope filter markup.

English copy. Report files touched and the production URL `/site/portfolio/<slug>/`.

YAML shape, page front matter, and checklist: [reference.md](reference.md)
