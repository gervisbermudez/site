import { ContentFrame } from "@/components/layout/ContentFrame";
import { Footer } from "@/components/layout/Footer";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { getPortfolio } from "@/lib/portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Portfolio – Gervis Bermudez | Blog",
  path: "/portfolio/",
});

export default function PortfolioPage() {
  const { categories, items } = getPortfolio();

  return (
    <ContentFrame>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="art-section-title">
              <div className="art-title-frame">
                <h4 className="art-title-h">
                  <span> Portfolio </span>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <PortfolioGrid categories={categories} items={items} columns={2} />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </ContentFrame>
  );
}
