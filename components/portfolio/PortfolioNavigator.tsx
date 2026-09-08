import Link from "next/link";
import type { PortfolioItem } from "@/lib/portfolio";

export function PortfolioNavigator({
  previous,
  next,
}: {
  previous?: PortfolioItem;
  next?: PortfolioItem;
}) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="art-a art-pagination">
            {previous ? (
              <Link
                href={previous.link}
                className="art-link art-color-link art-w-chevron art-left-link"
              >
                <span>Previous project</span>
              </Link>
            ) : (
              <div className="art-empty-space" />
            )}
            <div className="art-pagination-center">
              <Link className="art-link" href="/portfolio/">
                All projects
              </Link>
            </div>
            {next ? (
              <Link href={next.link} className="art-link art-color-link art-w-chevron">
                <span>Next project</span>
              </Link>
            ) : (
              <div className="art-empty-space" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
