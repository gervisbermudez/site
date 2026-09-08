import { notFound } from "next/navigation";
import { ContentFrame } from "@/components/layout/ContentFrame";
import { Footer } from "@/components/layout/Footer";
import { PostCard } from "@/components/blog/PostCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { paginatePosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

type Params = { num: string };

export function generateStaticParams() {
  const { totalPages } = paginatePosts(1, site.postsPerPage);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    num: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { num } = await params;
  const page = Number(num);
  return buildMetadata({
    title: `Blog – Gervis Bermudez`,
    path: `/blog/page/${page}/`,
  });
}

export default async function BlogPaged({
  params,
}: {
  params: Promise<Params>;
}) {
  const { num } = await params;
  const pageNum = Number(num);
  if (!Number.isFinite(pageNum) || pageNum < 2) notFound();

  const { posts, page, totalPages } = paginatePosts(pageNum, site.postsPerPage);
  if (pageNum > totalPages) notFound();

  return (
    <ContentFrame>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="art-section-title">
              <div className="art-title-frame">
                <h4 className="art-title-h">
                  <span> Blog </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {posts.map((post) => (
            <div className="col-lg-6" key={post.permalink}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <BlogPagination page={page} totalPages={totalPages} />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </ContentFrame>
  );
}
