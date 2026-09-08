import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatPostDate } from "@/lib/paths";
import { toImageSrc } from "@/lib/paths";

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="art-a art-blog-card">
      <div className="post type-post status-publish format-standard has-post-thumbnail">
        <Link className="art-port-cover post-thumbnail" href={post.permalink}>
          <Image
            src={toImageSrc(post.thumbnail)}
            alt={post.title}
            width={1280}
            height={768}
            className="attachment-arter_1280x768 size-arter_1280x768 wp-post-image"
          />
        </Link>
        <div className="art-post-description">
          <div className="art-project-category mb-15">
            <Link href={post.permalink}>
              <span className="art-el-date">{formatPostDate(post.date)}</span>
            </Link>
            {" / "}
            <span className="art-el-category">{post.category}</span>
          </div>
          <Link href={post.permalink}>
            <h5 className="mb-15">{post.title}</h5>
          </Link>
          <div className="art-el-description">
            <p>{post.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
