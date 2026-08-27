---
name: new-blog-post
description: Creates a Jekyll blog post with the required front matter, Arter/post layout HTML, image placeholders, and production permalink. Use when adding a post, writing for _posts, or the user asks for a new article.
---

# New blog post

## Workflow

1. Clone front matter from the newest file in `_posts/` (currently `_posts/2025-03-24-*.html`). Keep the same keys; do not invent extras.
2. Create `_posts/YYYY-MM-DD-slug.html` with `layout: post`.
3. Body HTML must fit `_layouts/post.html`: a `.page-body` of paragraphs, headings, lists, and existing Elementor/code-block markup. Pipe every image with `| relative_url`.
4. Do **not** duplicate `{% include contact-banner.html %}` — the layout already includes it. Set `contact_banner` in front matter only.
5. Do not invent image paths. Put placeholders under `public/uploads/YYYY/MM/` matching the post date. If assets are missing, leave the path and list it.
6. English copy. Do not change `<html lang="es">` or translate the site.
7. When done, list files touched and the production permalink.

## Permalink

Config: `permalink: /blog/:categories/:year/:month/:day/:title`. Production prefix is `baseurl` `/site` from `_config_prod.yml` — do not hardcode `/site` in the post.

Example: category `Web Development`, date `2025-03-24`, slug from filename → `https://gervisbermudez.github.io/site/blog/web-development/2025/03/24/<slug>/`

Front-matter template and checklist: [reference.md](reference.md)
