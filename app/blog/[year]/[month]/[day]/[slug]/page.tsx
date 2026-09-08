import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentFrame } from "@/components/layout/ContentFrame";
import { ContactBanner } from "@/components/layout/ContactBanner";
import { Footer } from "@/components/layout/Footer";
import { ShareButtons } from "@/components/blog/ShareButtons";
import {
  getAdjacentPosts,
  getPostByParams,
  getPosts,
} from "@/lib/posts";
import { formatPostDate, toImageSrc } from "@/lib/paths";
import { buildMetadata } from "@/lib/metadata";

type Params = {
  year: string;
  month: string;
  day: string;
  slug: string;
};

export function generateStaticParams() {
  return getPosts().map((post) => ({
    year: post.year,
    month: post.month,
    day: post.day,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { year, month, day, slug } = await params;
  const post = getPostByParams(year, month, day, slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: post.permalink,
    image: post.banner,
    type: "article",
    publishedTime: post.date.toISOString(),
    authors: [post.author],
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { year, month, day, slug } = await params;
  const post = getPostByParams(year, month, day, slug);
  if (!post) notFound();
  const { newer, older } = getAdjacentPosts(post.permalink);

  return (
    <ContentFrame>
      <div className="container-fluid">
        <div className="row p-30-0">
          <div className="col-lg-12">
            <div className="art-section-title">
              <div className="art-title-frame">
                <h1>{post.title}</h1>
                {post.subtitle ? (
                  <p className="art-post-subtitle">{post.subtitle}</p>
                ) : null}
              </div>
              <div className="art-right-frame">
                <div className="art-project-category">
                  {formatPostDate(post.date)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="art-a art-project-cover">
              <a
                href={toImageSrc(post.banner)}
                className="art-portfolio-item-frame art-horizontal"
                data-magnific-image
              >
                <Image
                  src={toImageSrc(post.banner)}
                  alt={post.title}
                  width={1920}
                  height={1080}
                  className="attachment-arter_1920xAuto size-arter_1920xAuto wp-post-image"
                  priority
                />
                <span className="art-item-hover">
                  <i className="fas fa-expand" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="art-a art-card">
              <div className="content-box">
                <div className="single-post-text">
                  <div
                    className="post-html"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                  />
                  <ContactBanner image={post.contactBanner || post.banner} />
                </div>
                <div className="post-text-bottom">
                  <span className="cat-links">
                    Posted in {post.category}
                  </span>
                  <span className="byline">
                    {" "}
                    by <span className="author vcard">{post.author}</span>
                  </span>
                  <ShareButtons
                    title={post.title}
                    path={post.permalink}
                    description={post.description}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="art-a art-pagination">
              {newer ? (
                <Link
                  href={newer.permalink}
                  className="art-link art-color-link art-w-chevron art-left-link"
                >
                  <span>Anterior</span>
                </Link>
              ) : (
                <div className="art-empty-space" />
              )}
              <div className="art-pagination-center art-m-hidden">
                <Link className="art-link" href="/blog/">
                  All posts
                </Link>
              </div>
              {older ? (
                <Link
                  href={older.permalink}
                  className="art-link art-color-link art-w-chevron"
                >
                  <span>Siguiente</span>
                </Link>
              ) : (
                <div className="art-empty-space" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </ContentFrame>
  );
}
