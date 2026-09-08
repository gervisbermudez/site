import { ContentFrame } from "@/components/layout/ContentFrame";
import { Footer } from "@/components/layout/Footer";
import { PostCard } from "@/components/blog/PostCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { paginatePosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Blog – Gervis Bermudez",
  path: "/blog/",
});

export default function BlogPage() {
  const { posts, page, totalPages } = paginatePosts(1, site.postsPerPage);

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
