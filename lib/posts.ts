import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { processLiquidHtml } from "@/lib/html";
import { parsePostDate } from "@/lib/paths";

export type Post = {
  slug: string;
  year: string;
  month: string;
  day: string;
  date: Date;
  author: string;
  title: string;
  subtitle?: string;
  description: string;
  thumbnail: string;
  banner: string;
  contactBanner?: string;
  category: string;
  tags: string[];
  html: string;
  permalink: string;
};

const POSTS_DIR = path.join(process.cwd(), "_posts");

function parseFilename(filename: string) {
  const match = filename.match(
    /^(\d{4})-(\d{2})-(\d{2})-(.+)\.html$/,
  );
  if (!match) return null;
  return {
    year: match[1],
    month: match[2],
    day: match[3],
    slug: match[4],
  };
}

function loadPost(filename: string): Post | null {
  const parsedName = parseFilename(filename);
  if (!parsedName) return null;

  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const date = parsePostDate(data.date);
  const { year, month, day, slug } = parsedName;
  const permalink = `/blog/${year}/${month}/${day}/${slug}/`;

  return {
    slug,
    year,
    month,
    day,
    date,
    author: String(data.author ?? "Gervis Bermudez"),
    title: String(data.title ?? slug),
    subtitle: data.subtitle ? String(data.subtitle) : undefined,
    description: String(data.description ?? ""),
    thumbnail: String(data.thumbnail ?? data.banner ?? ""),
    banner: String(data.banner ?? ""),
    contactBanner: data.contact_banner ? String(data.contact_banner) : undefined,
    category: String(data.category ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    html: processLiquidHtml(content),
    permalink,
  };
}

let cache: Post[] | null = null;

export function getPosts(): Post[] {
  if (process.env.NODE_ENV !== "development" && cache) return cache;
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".html"));
  const posts = files
    .map(loadPost)
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  if (process.env.NODE_ENV !== "development") cache = posts;
  return posts;
}

export function getPostByParams(
  year: string,
  month: string,
  day: string,
  slug: string,
): Post | undefined {
  return getPosts().find(
    (post) =>
      post.year === year &&
      post.month === month &&
      post.day === day &&
      post.slug === slug,
  );
}

export function getAdjacentPosts(permalink: string) {
  const posts = getPosts();
  const index = posts.findIndex((post) => post.permalink === permalink);
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

export function paginatePosts(page: number, perPage: number) {
  const posts = getPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const current = Math.min(Math.max(page, 1), totalPages);
  const start = (current - 1) * perPage;
  return {
    posts: posts.slice(start, start + perPage),
    page: current,
    totalPages,
    total: posts.length,
  };
}

export function blogPagePath(page: number): string {
  return page <= 1 ? "/blog/" : `/blog/page/${page}/`;
}
