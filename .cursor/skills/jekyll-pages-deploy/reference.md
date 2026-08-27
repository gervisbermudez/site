# jekyll-pages-deploy reference

## Config delta

| Key | `_config.yml` (local) | `_config_prod.yml` (prod) |
| --- | --- | --- |
| `url` | `""` | `https://gervisbermudez.github.io` |
| `baseurl` | `""` | `/site` |
| plugins | feed, paginate, seo-tag, sitemap | same |
| `permalink` | `/blog/:categories/:year/:month/:day/:title` | same |

Live site: `https://gervisbermudez.github.io/site`

## CI (`.github/workflows/static.yml`)

- Trigger: push to `main`
- Ruby 3.2, `bundle install`
- Build: `bundle exec jekyll build --config _config_prod.yml`
- Deploy: `JamesIves/github-pages-deploy-action@v4`, folder `_site`, branch `gh-pages`

## Canonical / OG

`_includes/head.html`:

- `<link rel="canonical" href="{{site.url}}{{ site.baseurl }}{{page.url}}" />`
- `og:url` / `twitter:url` same pattern
- `og:locale` is `es_ES` (do not “fix” to en)

Some asset tags in the same file still use `{{ site.baseurl }}/public/css/styles.css` (empty locally, `/site` in prod). Prefer migrating new tags to `| relative_url`. Do not replace that with a hardcoded `/site`.

## Typical 404 patterns

```html
<!-- BAD: nested relative, breaks on about-me/, blog/, portfolio/<slug>/ -->
url(../../public/uploads/2024/03/hero.jpg)

<!-- BAD: hardcoded prod prefix -->
href="/site/public/css/styles.css"

<!-- GOOD -->
href="{{ '/public/css/styles.css' | relative_url }}"
style="background-image: url({{ '/public/uploads/2024/03/hero.jpg' | relative_url }});"
```

Known leftover: `_includes/top-banner.html` uses `../../../../public/uploads/...`. Nested clones in `portfolio/start-cms/index.html` use `../../public/...`. Fix those with `relative_url` when touching the file for a deploy bug.

## Diagnose checklist

- [ ] Cite file:line
- [ ] Confirm which config the failing build used
- [ ] Confirm the broken URL in `_site` vs the Liquid source
- [ ] No hardcoded `/site` introduced
- [ ] Gemfile / plugin list unchanged unless requested
