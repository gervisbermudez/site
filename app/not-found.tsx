import Link from "next/link";
import { ContentFrame } from "@/components/layout/ContentFrame";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <ContentFrame>
      <div className="container-fluid">
        <div className="row p-30-0">
          <div className="col-lg-12">
            <div className="art-section-title">
              <div className="art-title-frame">
                <h1>404</h1>
              </div>
            </div>
            <p>This page is not here.</p>
            <p>
              <Link className="art-link art-color-link art-w-chevron" href="/">
                Home
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </ContentFrame>
  );
}
