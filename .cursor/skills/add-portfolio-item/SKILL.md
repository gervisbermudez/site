---
name: add-portfolio-item
description: >-
  Add or update a portfolio case study: YAML grid entry plus portfolio/<slug>/index.html
  in the Arter/Elementor layout. Use when the user adds a project, case study,
  or edits _data/portfolio.yml or files under portfolio/.
---

# Add a portfolio item

Two files must stay in sync: `_data/portfolio.yml` (grid) and `portfolio/<slug>/index.html` (detail). Copy `portfolio/start-cms/index.html` instead of inventing a simpler page.

## Checklist

```
- [ ] New folder portfolio/<slug>/index.html
- [ ] New item at the top of _data/portfolio.yml items (newest first)
- [ ] category uses category-web / category-design / category-apps
- [ ] Cover image in public/uploads/ and referenced in YAML + page banner
- [ ] Verify /portfolio/ filter + detail page
```

## YAML item

```yaml
  - title: "Project Name"
    category: "category-web"
    image: "public/uploads/YYYY/MM/cover.png"
    description: "One or two sentences. This is the grid blurb."
    link: "portfolio/the-slug/"
```

- `image` and `link` have **no** leading slash.
- Combined filters: `"category-apps category-design"` (space-separated).
- Categories in `categories:` at the top of the file are the filter chips. Do not add a new chip unless the user asks.

## Detail page front matter

```yaml
---
layout: default
title: Project Name – Gervis Bermudez | Blog
banner: /public/uploads/YYYY/MM/cover.png
description: "Longer SEO description."
---
```

Keep the Arter/Elementor shell from an existing case study: `art-content`, curtain, top background, `art-section-title`, cover frame, project body, `{% include contact-banner.html %}`, footer. Do not strip `elementor-*` wrappers.

Use `| relative_url` for every new image and internal link. For the top background, prefer the Liquid form used in `portfolio/index.html`, not `../../public/...`.

## After writing

Open `/portfolio/` and confirm the card shows under the right filter, then open the case study URL and check banner, copy, and Contact CTA.
