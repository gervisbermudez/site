import type { Metadata } from "next";
import { absoluteUrl, shouldIndex, site } from "@/lib/site";
import { toImageSrc } from "@/lib/paths";

type MetaInput = {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  authors,
}: MetaInput): Metadata {
  const desc = description || site.description;
  const url = absoluteUrl(path);
  const imagePath = image ? toImageSrc(image) : site.defaultBanner;
  const imageUrl = absoluteUrl(imagePath);

  return {
    title,
    description: desc,
    robots: shouldIndex()
      ? { index: true, follow: true }
      : { index: false, follow: false },
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
      },
    },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: site.title,
      locale: site.locale,
      type,
      images: [{ url: imageUrl }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [imageUrl],
    },
  };
}
