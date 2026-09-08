import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import matter from "gray-matter";
import { extractScrollBody } from "@/lib/html";
import { toImageSrc, toPublicUrl } from "@/lib/paths";

export type PortfolioCategory = {
  name: string;
  filter: string;
};

export type PortfolioItem = {
  title: string;
  category: string;
  image: string;
  imageSrc: string;
  description: string;
  link: string;
  slug: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  heading: string;
  description: string;
  banner: string;
  categoryLabel: string;
  html: string;
  permalink: string;
};

type PortfolioYaml = {
  categories: PortfolioCategory[];
  items: Array<{
    title: string;
    category: string;
    image: string;
    description: string;
    link: string;
  }>;
};

const DATA_FILE = path.join(process.cwd(), "_data/portfolio.yml");
const PORTFOLIO_DIR = path.join(process.cwd(), "portfolio");

const CATEGORY_LABELS: Record<string, string> = {
  "category-web": "Web",
  "category-design": "Design",
  "category-apps": "App",
};

function slugFromLink(link: string): string {
  return link.replace(/^\/?portfolio\//, "").replace(/\/$/, "");
}

export function getPortfolio(): {
  categories: PortfolioCategory[];
  items: PortfolioItem[];
} {
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  const data = yaml.load(raw) as PortfolioYaml;
  return {
    categories: data.categories,
    items: data.items.map((item) => ({
      ...item,
      image: toPublicUrl(item.image),
      imageSrc: toImageSrc(item.image),
      link: toPublicUrl(item.link),
      slug: slugFromLink(item.link),
    })),
  };
}

function categoryLabel(category: string): string {
  const first = category.split(/\s+/)[0];
  return CATEGORY_LABELS[first] ?? "Web";
}

export function getCaseStudies(): CaseStudy[] {
  const { items } = getPortfolio();
  return items.map((item) => {
    const file = path.join(PORTFOLIO_DIR, item.slug, "index.html");
    if (!fs.existsSync(file)) {
      throw new Error(
        `Missing case study HTML for slug "${item.slug}" (expected ${file})`,
      );
    }
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const heading = item.title;
    return {
      slug: item.slug,
      title: String(data.title ?? item.title),
      heading,
      description: String(data.description ?? item.description),
      banner: String(data.banner ?? item.image),
      categoryLabel: categoryLabel(item.category),
      html: extractScrollBody(content),
      permalink: `/portfolio/${item.slug}/`,
    };
  });
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((study) => study.slug === slug);
}

export function getAdjacentCaseStudies(slug: string) {
  const items = getPortfolio().items;
  const index = items.findIndex((item) => item.slug === slug);
  return {
    previous: index > 0 ? items[index - 1] : undefined,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : undefined,
  };
}
