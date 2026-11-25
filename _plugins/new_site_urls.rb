# frozen_string_literal: true

# When `redirect_to_new_site` is set (production config only), replace each HTML
# page with a short redirect to `new_site_url`. The feed keeps stable Atom ids
# and points its links at that host. Local builds leave the flag off.
module Jekyll
  module NewSiteUrls
    module_function

    def enabled?(site)
      site.config["redirect_to_new_site"] == true &&
        !site.config["new_site_url"].to_s.strip.empty?
    end

    def base_url(site)
      site.config["new_site_url"].to_s.chomp("/")
    end

    def skip?(doc)
      path = doc.relative_path.to_s
      url = doc.url.to_s
      name = doc.respond_to?(:name) ? doc.name.to_s : File.basename(path)
      return true if path.include?("webfonts") || url.include?("webfonts")
      return true if path.end_with?(".woff2.html") || url.end_with?(".woff2.html")
      return true if %w[feed.xml sitemap.xml robots.txt].include?(name)
      return true if url.end_with?("/feed.xml", "/sitemap.xml", "/robots.txt")

      false
    end

    def map_document(doc, base, post: false)
      return post_url(doc, base) if post

      url = doc.url.to_s

      return "#{base}/" if url == "/" || url == "/index.html" || url == "/404.html"
      return "#{base}/blog/" if url == "/blog/"
      return "#{base}/blog/page/#{::Regexp.last_match(1)}/" if url =~ %r{\A/blog/page(\d+)/\z}

      return "#{base}/about-me/" if url.start_with?("/author/")
      return "#{base}/blog/" if url.start_with?("/category/")

      # Permalink parent folders (category / year / month / day) are redirect
      # stubs. Send them to the blog index, not to a same-path URL.
      if doc.data["layout"] == "redirect" && doc.data["new_url"].to_s.empty?
        return "#{base}/about-me/" if url.start_with?("/author/")
        return "#{base}/blog/"
      end

      if url.start_with?("/blog/") && url !~ %r{\A/blog/page\d+/}
        return "#{base}/blog/"
      end

      return "#{base}#{url}" if same_path_page?(url)

      nil
    end

    def same_path_page?(url)
      return true if %w[/portfolio/ /about-me/ /contact/ /journey/].include?(url)
      return true if url.start_with?("/portfolio/") && url.length > "/portfolio/".length

      false
    end

    def post_url(post, base)
      name = post.basename.to_s
      m = name.match(/\A(\d{4})-(\d{2})-(\d{2})-(.+)\.html\z/)
      return nil unless m

      y, mo, d, slug = m.captures
      "#{base}/blog/#{y}/#{mo}/#{d}/#{slug}/"
    end
  end

  class NewSiteUrlsGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
      apply!(site)
    end

    module Applicator
      module_function

      def apply!(site)
        return unless NewSiteUrls.enabled?(site)

        prefer_custom_feed!(site)
        base = NewSiteUrls.base_url(site)
        site.pages.each { |doc| assign_new_url(doc, base, post: false) }
        site.posts.docs.each { |doc| assign_new_url(doc, base, post: true) }
      end

      # jekyll-feed also emits /feed.xml. Keep the source template, which
      # points each entry at new_url.
      def prefer_custom_feed!(site)
        feeds = site.pages.select { |page| page.name == "feed.xml" }
        return if feeds.length < 2

        custom = feeds.find { |page| page.content.to_s.include?("post.new_url") }
        return unless custom

        feeds.each { |page| site.pages.delete(page) unless page.equal?(custom) }
      end

      def assign_new_url(doc, base, post:)
        return if NewSiteUrls.skip?(doc)
        return unless doc.data["new_url"].to_s.empty?

        new_url = NewSiteUrls.map_document(doc, base, post: post)
        if new_url.nil?
          Jekyll.logger.warn("New site redirect:", "no mapping for #{doc.url}; sending home")
          new_url = "#{base}/"
        end

        doc.data["new_url"] = new_url
        doc.data["redirect_to"] = new_url
        doc.data["layout"] = "redirect"
        doc.data["robots"] = "noindex"
      end
    end

    def apply!(site)
      Applicator.apply!(site)
    end
  end

  Jekyll::Hooks.register :site, :pre_render do |site|
    Jekyll::NewSiteUrlsGenerator::Applicator.apply!(site) if NewSiteUrls.enabled?(site)
  end
end