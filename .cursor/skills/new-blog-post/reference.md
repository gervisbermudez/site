# new-blog-post reference

## Front matter template

Clone keys from `_posts/2025-03-24-next-js-and-tailwind-building-a-dynamic-space-x-launch-tracker.html`:

```yaml
---
layout: post
date: YYYY-MM-DD
author: Gervis Bermudez
title: "Title in English"
description: One-sentence summary
thumbnail: /public/uploads/YYYY/MM/slug-thumbnail.png
banner: /public/uploads/YYYY/MM/slug-banner.jpg
contact_banner: /public/uploads/YYYY/MM/slug-contact-banner.jpg
category: Web Development
tags: ["Tag One", "Tag Two"]
---
```

Required keys: `layout`, `date`, `author`, `title`, `description`, `thumbnail`, `banner`, `contact_banner`, `category`, `tags`.

## Body skeleton

```html
<div class="page-body">
    <p class="">Opening…</p>
    <h2 class="">Section</h2>
    <p class="">…</p>
    <a href="{{ '/public/uploads/YYYY/MM/figure.png' | relative_url }}">
        <img src="{{ '/public/uploads/YYYY/MM/figure.png' | relative_url }}" alt="…" />
    </a>
</div>
```

Keep Elementor code-block widgets if the post includes code (`elementor-widget-code-block-for-elementor`, `language-*`). Copy that structure from a recent post rather than inventing a new highlighter.

## Images

- Directory: `public/uploads/YYYY/MM/`
- Typical set: thumbnail, banner, contact_banner, plus in-body figures
- Front matter paths start with `/public/uploads/...`
- In-body: always `| relative_url`
- Do not point at files that do not exist unless the user will add them; then list the expected filenames

## Do not

- Include `contact-banner.html` in the post body (`_layouts/post.html` line ~90 already does)
- Hardcode `/site`
- Use `layout: default` on a post
- Translate to Spanish

## Done checklist

- [ ] Filename `_posts/YYYY-MM-DD-slug.html`
- [ ] All required front-matter keys
- [ ] `layout: post`
- [ ] Images under `public/uploads/YYYY/MM/` (or listed as placeholders)
- [ ] Body images use `relative_url`
- [ ] No duplicate contact banner
- [ ] Production permalink reported as `/site/blog/<category-slug>/YYYY/MM/DD/<slug>/`
