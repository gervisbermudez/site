# arter-ui-change reference

## Where to change what

| Goal | File |
| --- | --- |
| Color, type, spacing, visibility | `public/css/styles.css` |
| Sidebar (avatar, skills, social) | `_includes/side.html` |
| Nav labels / order | `_includes/menu.html` |
| Head assets, canonical, OG | `_includes/head.html` |
| Contact CTA strip | `_includes/contact-banner.html` |
| Top background | `_includes/top-banner.html` (posts) or in-page `.art-top-bg` |
| Shell | `_layouts/default.html` |
| Post chrome | `_layouts/post.html` |

## CSS pattern

Override Arter selectors already used in `styles.css`:

```css
.art-banner .art-banner-overlay .art-banner-title h1 { color: #ffffff; }
.art-menu-bar nav .main-menu .menu-item a { ... }
.art-info-bar .art-ls-social a { ... }
```

Do not introduce a parallel class system (`.hero`, `.nav-v2`) and then rewrite HTML to match.

## Shared surfaces (must check)

1. Home — `index.html`
2. About — `about-me/index.html`
3. Blog index — `blog/index.html`
4. One post — any `_posts/*.html` via `layout: post`
5. Portfolio index — `portfolio/index.html`
6. Contact — `contact/index.html`

Viewports: **1440** (desktop) and **390** (mobile). Sidebar + menu + footer must stay consistent across all six.

## Asset URLs in includes

New `href`/`src`/`url()` in includes must use `| relative_url`. Do not add `../public` or `/site`.

## Do not

- Delete Elementor wrappers to “simplify” markup
- Pretty-print or re-indent entire exported HTML files
- Commit `_site/`
- Edit plugin/theme vendor trees by default
