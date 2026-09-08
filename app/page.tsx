import Link from "next/link";
import { ContentFrame } from "@/components/layout/ContentFrame";
import { ContactBanner } from "@/components/layout/ContactBanner";
import { Footer } from "@/components/layout/Footer";
import { HeroBanner } from "@/components/home/HeroBanner";
import { Counters } from "@/components/home/Counters";
import { RecentPosts } from "@/components/home/RecentPosts";
import { Interests } from "@/components/home/Interests";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { getPosts } from "@/lib/posts";
import { getPortfolio } from "@/lib/portfolio";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Gervis Bermudez Blog | Home",
  path: "/",
});

export default function HomePage() {
  const posts = getPosts().slice(0, 6);
  const { categories, items } = getPortfolio();

  return (
    <ContentFrame>
      <HeroBanner />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <p>
              I&apos;m a Full Stack Developer with over 10 years of experience building
              scalable, modern web applications.
            </p>
            <p>
              My goal is to combine frontend and backend development with product
              vision to create solid, maintainable solutions, while incorporating
              AI-assisted tools to optimize development processes and
              productivity.
              <br />
              <br />
              <Link className="art-link art-color-link art-w-chevron" href="/about-me/">
                See my full profile
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Counters />
      <RecentPosts posts={posts} />
      <br />
      <Interests />
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
            <PortfolioGrid categories={categories} items={items} columns={3} />
          </div>
          <div className="col-md-12">
            <Link className="art-link art-color-link art-w-chevron" href="/portfolio/">
              See my entire portfolio
            </Link>
          </div>
        </div>
      </div>
      <ContactBanner />
      <div className="container-fluid">
        <Footer />
      </div>
    </ContentFrame>
  );
}
