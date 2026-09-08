import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { getCaseStudies } from "@/lib/portfolio";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  const now = new Date();
  const staticRoutes = [
    "/",
    "/blog/",
    "/portfolio/",
    "/about-me/",
    "/contact/",
    "/journey/",
  ].map((path) => ({
    url: `${origin}${path}`,
    lastModified: now,
  }));

  const posts = getPosts().map((post) => ({
    url: `${origin}${post.permalink}`,
    lastModified: post.date,
  }));

  const studies = getCaseStudies().map((study) => ({
    url: `${origin}${study.permalink}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...posts, ...studies];
}
