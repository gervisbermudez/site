# frozen_string_literal: true

require "set"
require "addressable/uri"

# GitHub Pages has no directory indexes. Post permalinks
# `/blog/:categories/:year/:month/:day/:title` therefore 404 on every parent
# folder (category, year, month, day). Emit a tiny redirect page at each of
# those paths — plus leftover WordPress `/category/` and `/author/` URLs —
# instead of inventing archive pages.
#
# `post.url` is percent-encoded (`web%20development`). The filesystem path
# Jekyll already uses for the post is decoded (`web development`), and that
# is the folder GitHub Pages serves when a browser requests `%20`.
module Jekyll
  class BlogParentRedirects < Generator
    safe true
    priority :low

    def generate(site)
      dirs = Set.new

      site.posts.docs.each do |post|
        collect_permalink_parents(dirs, post.url)

        category = post.data["category"].to_s
        dirs << File.join("category", category) unless category.empty?

        author = post.data["author"].to_s
        dirs << File.join("author", author) unless author.empty?
      end

      existing = Set.new(
        site.pages.map(&:url) + site.posts.docs.map(&:url)
      )

      dirs.each do |dir|
        next if occupied?(existing, dir)

        redirect_to = dir.start_with?("author/") ? "/about-me/" : "/blog/"
        page = RedirectPage.new(site, dir, redirect_to)
        site.pages << page
        existing << page.url
      end
    end

    private

    def collect_permalink_parents(dirs, url)
      decoded = Addressable::URI.unencode(url.to_s)
      segments = decoded.sub(%r{\A/}, "").sub(%r{/\z}, "").split("/")
      segments.pop
      while segments.length > 1 && segments[0] == "blog"
        dirs << segments.join("/")
        segments.pop
      end
    end

    def occupied?(existing, dir)
      existing.include?("/#{dir}/") ||
        existing.include?("/#{dir}") ||
        existing.include?("/#{dir}.html")
    end
  end

  class RedirectPage < PageWithoutAFile
    def initialize(site, dir, redirect_to)
      @site = site
      @base = site.source
      @dir = dir
      @name = "index.html"
      @path = File.join(@base, @dir, @name)

      process(@name)

      self.data = {
        "layout" => "redirect",
        "redirect_to" => redirect_to,
        "sitemap" => false,
        "title" => "Redirecting"
      }
      self.content = ""
    end
  end
end
