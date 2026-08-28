---
name: pre-commit-review
description: Skeptical review of uncommitted git diffs before commit. Questions why each change exists and whether it is justified. Use when the user asks to review before commit, challenge the diff, question the why, or gate a commit.
---

# Pre-commit review

Review **uncommitted** work (staged + unstaged + untracked that belong in the commit). Do not commit. Do not amend. Do not push. Do not “fix while reviewing” unless the user asks after the verdict.

## Diff

```bash
git status
git diff
git diff --cached
git log -8 --oneline
```

If the working tree is clean, say so and stop. Do not invent a branch-vs-main review unless the user asked for that.

## Stance

Assume every hunk must earn its place. Missing bugs is secondary; **unjustified change** is the main failure.

For each logical change (not each file), answer:

1. **Claimed intent** — what problem does this solve? Infer from the diff; do not take the author’s story as given.
2. **Evidence** — is the problem real in this repo (file + line, grep, broken URL, unused asset)? If not proven, say so.
3. **Fit** — does it match `.cursor/rules/`, `AGENTS.md`, and the relevant skill (`arter-ui-change`, `new-blog-post`, `jekyll-pages-deploy`, `site-audit-cleanup`, …)?
4. **Smallest fix** — would a smaller edit, an include, or leaving vendor markup alone work?
5. **Cost** — visual risk, `baseurl` / `relative_url` risk, shared chrome blast radius, extra bytes, harder future diffs.

## Hard fails (block commit)

- Hardcoded `/site`
- Edits under `public/themes/arter/**` or `public/plugins/**` without a one-off bug justification
- Rewriting or pretty-printing Arter/Elementor markup “to clean it”
- Translating site copy, or changing `<html lang="es">` / `og:locale`
- Committing `_site/` or converting toward Next/React
- CSS overrides outside `public/css/styles.css` (except a justified one-off in theme/plugin)
- Scope creep: cleanup mixed with a feature, or drive-by reindent of exported HTML

## Soft challenges (ask, do not rubber-stamp)

- Deleting CSS/JS/assets without a grep proving unused
- Loading/unloading fonts, jQuery migrate, Elementor page CSS, extra Swiper — needs a verify plan
- New classes instead of overriding existing `art-*` / `elementor-*` selectors
- Duplicating chrome that already lives in `_includes/`
- Comments, config boilerplate, or “while I was here” edits with no user-visible or maintainability win
- Skills/rules/prompt files that only restate `AGENTS.md`

## Report format

```
## Verdict
commit | split | drop | rewrite
One sentence why.

## Intent vs diff
For each logical change:
- Intent: …
- Justified? yes / weak / no
- Challenge: …
- Keep / shrink / drop

## Blockers
file:line — …

## Questions for the author
- Why … instead of …?
```

If chrome/CSS/includes changed, note that Home, About, Blog, one post, Portfolio, and Contact still need ~1440 / ~390 checks **before** commit — do not run a full UI pass unless the user asked.

User-facing paste prompt: [prompt.md](prompt.md)
