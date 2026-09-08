import Link from "next/link";
import { blogPagePath } from "@/lib/posts";

export function BlogPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="art-a art-pagination">
      <div className="pagination">
        <div>
          {page > 1 ? (
            <Link
              href={blogPagePath(page - 1)}
              className="previous art-link art-color-link art-w-chevron art-left-link"
            >
              Anterior
            </Link>
          ) : null}
        </div>
        <div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) =>
            num === page ? (
              <span className="current" key={num}>
                {num}
              </span>
            ) : (
              <Link href={blogPagePath(num)} key={num}>
                {num}
              </Link>
            ),
          )}
        </div>
        <div>
          {page < totalPages ? (
            <Link
              href={blogPagePath(page + 1)}
              className="next art-link art-color-link art-w-chevron"
            >
              Siguiente
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
