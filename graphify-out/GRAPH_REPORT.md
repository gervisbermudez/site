# Graph Report - gervis-site-graphify-corpus  (2026-08-27)

## Corpus Check
- Corpus is ~27,302 words - fits in a single context window. You may not need a graph.

## Summary
- 91 nodes · 194 edges · 9 communities
- Extraction: 91% EXTRACTED · 9% INFERRED · 1% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Portfolio Data Grid
- Shared Chrome Layouts
- Baseurl and Canonical
- Blog Posts
- Public Page Shell
- Portfolio Case Studies
- Local Config Plugins
- Prod Deploy Pipeline
- Agent Site Guidance

## God Nodes (most connected - your core abstractions)
1. `Default Layout` - 15 edges
2. `relative_url Filter` - 13 edges
3. `Liquid relative_url Filter` - 12 edges
4. `Post Layout` - 11 edges
5. `Arter Where-to-Change Map` - 10 edges
6. `Jekyll Pages Deploy` - 9 edges
7. `AGENTS Site Guidance` - 9 edges
8. `Local Jekyll Config` - 9 edges
9. `Contact Banner Include` - 9 edges
10. `Local vs Prod Config Delta` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Local baseurl` --semantically_similar_to--> `Production baseurl /site`  [INFERRED] [semantically similar]
  _config.yml → _config_prod.yml
- `Local url` --semantically_similar_to--> `Production url`  [INFERRED] [semantically similar]
  _config.yml → _config_prod.yml
- `Shared Chrome` --references--> `Footer`  [EXTRACTED]
  .cursor/skills/arter-ui-change/SKILL.md → _includes/footer.html
- `Jekyll Pages Deploy` --references--> `Deploy Jekyll to GitHub Pages`  [EXTRACTED]
  .cursor/skills/jekyll-pages-deploy/SKILL.md → .github/workflows/static.yml
- `styles.css via site.baseurl` --conceptually_related_to--> `relative_url Filter`  [INFERRED]
  _includes/head.html → .cursor/skills/jekyll-pages-deploy/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Shared Arter Chrome** — _layouts_default_layout, _includes_side_sidebar, _includes_menu_main_menu, _includes_top_banner_top_banner, _includes_footer_footer, _includes_contact_banner_contact_banner [EXTRACTED 1.00]
- **GitHub Pages Deploy Pipeline** — _config_local_jekyll_config, _config_prod_prod_jekyll_config, _github_workflows_static_deploy_jekyll_to_github_pages, _cursor_skills_jekyll_pages_deploy_skill_relative_url, _includes_head_canonical [EXTRACTED 1.00]
- **Portfolio Isotope Filter Taxonomy** — _data_portfolio_categories, _data_portfolio_category_web, _data_portfolio_category_design, _data_portfolio_category_apps, _data_portfolio_items [EXTRACTED 1.00]
- **Arter app chrome with side and menu** — _layouts_default_default_layout, _layouts_default_side, _layouts_default_menu, _layouts_default_arter_elementor [EXTRACTED 1.00]
- **Contact banner CTA across posts home and case studies** — _layouts_post_contact_banner, _layouts_post_post_layout, index_homepage, portfolio_start_cms_index_start_cms, portfolio_vuenotes_app_proposal_index_vuenotes [EXTRACTED 1.00]
- **Custom CMS Figma CodeIgniter Materialize stack** — _posts_2024_12_07_building_a_custom_cms_from_figma_to_code_igniter_with_materialize_post, portfolio_start_cms_index_start_cms, _posts_2024_08_07_lightweight_and_powerful_codeigniter_the_php_framework_post, _posts_2024_03_07_materialize_css_the_little_library_for_material_design_post [INFERRED 0.85]

## Communities (9 total, 0 thin omitted)

### Community 0 - "Portfolio Data Grid"
Cohesion: 0.17
Nodes (19): Portfolio next_page Front Matter, Portfolio YAML Item Shape, New Portfolio Item, Bridgestone Mobile App Proposal, Portfolio Filter Categories, category-apps, category-design, category-web (+11 more)

### Community 1 - "Shared Chrome Layouts"
Cohesion: 0.25
Nodes (16): default_banner, Arter Where-to-Change Map, Shared Chrome, relative_url Filter, Contact Banner Layout Ownership, Blog Post Front Matter, New Blog Post, Banner Image Fallback Chain (+8 more)

### Community 2 - "Baseurl and Canonical"
Cohesion: 0.27
Nodes (10): Local baseurl, Production url, Local url, CSS-First Override, Canonical URL Concatenation, Local vs Prod Config Delta, Canonical Link, og:locale es_ES (+2 more)

### Community 3 - "Blog Posts"
Cohesion: 0.42
Nodes (10): Jekyll Permalink via page.url, Post Layout, Liquid relative_url Filter, Materialize CSS the little library for Material Design, Designing a Note-Taking Web App with Google Material Design, Lightweight and powerful - CodeIgniter the php framework, Building a Custom CMS - From Figma to CodeIgniter with Materialize, Solving the Hotel Reservation Problem using Vue js with Vite (+2 more)

### Community 4 - "Public Page Shell"
Cohesion: 0.36
Nodes (9): Arter Elementor Chrome, Default Layout, Menu Include (menu.html), Sidebar Include (side.html), The Developer’s Superpower: AI + GitHub Copilot = Unstoppable Code, About Me Page, Contact Page, Home Page (+1 more)

### Community 5 - "Portfolio Case Studies"
Cohesion: 0.42
Nodes (9): Contact Banner Include, Contact Hub Grid, Price Solutions App Proposal, Bridgestone Mobile App Proposal, Gervis Bermudez Brand, Portfolio Categories, LoanAdmin, Start CMS (+1 more)

### Community 6 - "Local Config Plugins"
Cohesion: 0.40
Nodes (6): Local Jekyll Config, paginate, Jekyll Plugins, absolute_url Filter, Jekyll Pages Deploy, Footer

### Community 7 - "Prod Deploy Pipeline"
Cohesion: 0.40
Nodes (6): permalink, Production baseurl /site, Production Jekyll Config, Blog Permalink Pattern, build-deploy Job, Deploy Jekyll to GitHub Pages

### Community 8 - "Agent Site Guidance"
Cohesion: 0.40
Nodes (6): Arter UI Change, Six-Surface UI Verification, No Hardcoded /site Prefix, gtag Linker Domain, AGENTS Site Guidance, Graphify Query First

## Ambiguous Edges - Review These
- `Portfolio next_page Front Matter` → `Portfolio Navigator`  [AMBIGUOUS]
  .cursor/skills/new-portfolio-item/reference.md · relation: conceptually_related_to

## Knowledge Gaps
- **7 isolated node(s):** `Canonical URL Concatenation`, `paginate`, `og:locale es_ES`, `gtag Linker Domain`, `lazyloadRunObserver` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Portfolio next_page Front Matter` and `Portfolio Navigator`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `relative_url Filter` connect `Shared Chrome Layouts` to `Agent Site Guidance`, `Portfolio Data Grid`, `Baseurl and Canonical`, `Local Config Plugins`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Why does `New Portfolio Item` connect `Portfolio Data Grid` to `Agent Site Guidance`, `Shared Chrome Layouts`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Why does `AGENTS Site Guidance` connect `Agent Site Guidance` to `Portfolio Data Grid`, `Shared Chrome Layouts`, `Local Config Plugins`, `Prod Deploy Pipeline`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `relative_url Filter` (e.g. with `absolute_url Filter` and `styles.css via site.baseurl`) actually correct?**
  _`relative_url Filter` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Canonical URL Concatenation`, `paginate`, `og:locale es_ES` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._