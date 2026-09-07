---
name: write-blog-post
description: >-
  Draft or edit a Jekyll HTML blog post for this site, including front matter,
  Elementor/Prism code blocks, figures, and upload paths. Use when the user
  wants a new post, to publish to the blog, or to edit files in _posts/.
---

# Write a blog post

Posts are **HTML**, not Markdown. Copy `_posts/2026-09-07-improve-dont-replace-a-vue-3-button-architecture.html` as the canonical shape.

## Checklist

```
- [ ] Filename _posts/YYYY-MM-DD-kebab-slug.html
- [ ] Front matter complete
- [ ] thumbnail + banner under public/uploads/YYYY/MM/
- [ ] Body wrapped in <div class="page-body">
- [ ] Code HTML-encoded inside Prism wrappers
- [ ] Images use relative_url + magnific + data-no-swup
- [ ] Verify /blog/ card + post URL
```

## Front matter

```yaml
---
layout: post
date: YYYY-MM-DD
author: Gervis Bermudez
title: "Title in Title Case"
subtitle: "Optional short line under the H1"
description: "One or two sentences for the blog grid and OG tags."
thumbnail: /public/uploads/YYYY/MM/slug-thumbnail.png
banner: /public/uploads/YYYY/MM/slug-banner.png
contact_banner: /public/uploads/YYYY/MM/slug-contact.jpg
category: Web Development
tags: ["Vue.js", "TypeScript"]
---
```

`thumbnail` is the blog grid image. `banner` is the post cover. `contact_banner` is optional (falls back to `banner`). Paths **start with** `/public/uploads/`.

`category` is a display string (existing: `Web Development`). `tags` is a YAML list.

## Body

```html
<div class="page-body">
    <p class="">
        Opening in first person. Short thesis.<br /><br />
        Next beat in the same paragraph.
    </p>
    <h2 class="">
        Section title
    </h2>
    <!-- figures, code, more p/h2 -->
</div>
```

Voice: English, first person, honest about process and what was skipped. Close with takeaways, live/demo links (Font Awesome icons on GitHub/rocket links), and an invite to connect.

Inline code: `<code>...</code>` with entities (`&lt;button&gt;`). Apostrophes in copy: `&#8217;`.

## Code blocks

Always this wrapper (Prism `theme-okaidia`). Change `language-*` to match (`javascript`, `html`, `json`, `bash`, `typescript`).

```html
<div class="elementor-element elementor-element-a108a0e elementor-widget elementor-widget-code-block-for-elementor"
    data-id="a108a0e" data-element_type="widget" data-widget_type="code-block-for-elementor.default">
    <div class="elementor-widget-container">
        <pre class="line-numbers theme-okaidia language-typescript" data-show-toolbar="yes">
<code class="language-typescript">encoded source here</code></pre>
    </div>
</div>
```

Encode inside `<code>`: `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`, `"` → `&quot;`, `'` → `&#x27;`. Do not put raw `<script>` or unescaped tags in the snippet.

Liquid in the post body must not collide with Vue/JS `{{ }}`. For example text that looks like mustache, use HTML entities: `&#123;&#123;`.

## Figures

```html
<figure class="image">
    <a href="{{'/public/uploads/YYYY/MM/file.svg' | relative_url}}" data-magnific-image data-no-swup>
        <img src="{{'/public/uploads/YYYY/MM/file.svg' | relative_url}}"
            alt="Describe the diagram"
            title="Short title" />
    </a>
    <figcaption>One-line caption.</figcaption>
</figure>
```

Embed a live demo with `<iframe>` inside `<figure class="image">` when there is a public URL. Keep `data-no-swup` on asset links so Swup does not intercept them.

## Assets

Put files in `public/uploads/YYYY/MM/`. Prefer SVG for diagrams, PNG/JPG for photo banners. If generating images, write them to that folder and point `thumbnail`/`banner` at them.

## After writing

1. Confirm the post appears in `blog/index.html` via `paginator.posts` (no extra wiring).
2. Serve or build (skill `local-preview`) and open the post URL plus `/blog/`.
3. Check OG tags: `description`, `banner`, title.

See [examples.md](examples.md) for encoded snippets.
