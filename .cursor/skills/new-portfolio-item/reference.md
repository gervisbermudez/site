# new-portfolio-item reference

## YAML item shape (Start CMS)

From `_data/portfolio.yml`:

```yaml
  - title: "Start CMS"
    category: "category-web"
    image: "public/uploads/2020/09/portfolio-1-2022-12-07-133630.png"
    description: "StartCMS is an intuitive and powerful content management system..."
    link: "portfolio/start-cms/"
```

Allowed `category` tokens (must match `categories.filter` in the same file):

- `category-web`
- `category-design`
- `category-apps`

Combined example: `category: "category-apps category-design"`

## Page front matter (clone)

From `portfolio/start-cms/index.html`:

```yaml
---
layout: default
title: Start CMS &#8211; Gervis Bermudez | Blog
next_page: gervis-bermudez-brand
banner: /public/uploads/2020/09/portfolio-1-2022-12-07-133630.png
description: "..."
---
```

Keep `layout: default`. Wire `next_page` to an existing slug if the page uses that include; otherwise match whatever the cloned file already does.

## Paths

| Field | Shape | Consumed as |
| --- | --- | --- |
| YAML `link` | `portfolio/<slug>/` | `item.link \| relative_url` on Home/Portfolio |
| YAML `image` | `public/uploads/...` | `item.image \| relative_url` |
| Page `banner` | `/public/uploads/...` | layout/includes |

Prefer `| relative_url` for any new asset URL. The cloned Start CMS page still has a nested `../../public/uploads/...` top background — do not copy that for new URLs; use Liquid.

## Do not

- Rebuild the portfolio grid or filter JS
- Add a new filter name without also adding it under `categories:`
- Hardcode `/site`
- Convert the case study to a React/Next page

## Done checklist

- [ ] New block in `_data/portfolio.yml` `items:`
- [ ] `portfolio/<slug>/index.html` cloned from Start CMS
- [ ] Category token(s) valid
- [ ] Image paths exist or listed as placeholders
- [ ] Production URL: `https://gervisbermudez.github.io/site/portfolio/<slug>/`
