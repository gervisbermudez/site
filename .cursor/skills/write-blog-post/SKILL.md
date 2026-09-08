---
name: write-blog-post
description: >-
  Draft or edit an HTML blog post for this Next.js site, including front matter,
  Prism code blocks, figures, and upload paths. Use when the user wants a new
  post, to publish to the blog, or to edit files in _posts/.
---

# Write a blog post

Posts are **HTML**, not Markdown. Copy `_posts/2026-09-07-improve-dont-replace-a-vue-3-button-architecture.html` as the canonical shape. Next.js reads `_posts/` via `lib/posts.ts`.

## Checklist

```
- [ ] Filename _posts/YYYY-MM-DD-kebab-slug.html
- [ ] Front matter complete
- [ ] thumbnail + banner under public/uploads/YYYY/MM/
- [ ] Body wrapped in <div class="page-body">
- [ ] Code HTML-encoded inside Prism wrappers
- [ ] Images use relative_url + data-magnific-image
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

Permalink is `/blog/YYYY/MM/DD/slug/` from the filename (not Jekyll `:title` Liquid).

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

Encode inside `<code>`: `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`, `"` → `&quot;`, `'` → `&#x27;`.

## Figures

```html
<figure class="image">
    <a href="{{'/public/uploads/YYYY/MM/file.svg' | relative_url}}" data-magnific-image>
        <img src="{{'/public/uploads/YYYY/MM/file.svg' | relative_url}}"
            alt="Describe the diagram"
            title="Short title" />
    </a>
    <figcaption>One-line caption.</figcaption>
</figure>
```

`lib/html.ts` resolves `| relative_url` to `/public/...` (rewritten to files in `public/`).

## After writing

1. Confirm the post appears on `/blog/` (paginated, 6 per page).
2. Serve (`npm run dev`) and open the post URL plus `/blog/`.
3. Check OG tags: `description`, `banner`, title.

See [examples.md](examples.md) for encoded snippets.
