import Link from "next/link";
import { site } from "@/lib/site";
import { toImageSrc } from "@/lib/paths";

export function ContactBanner({ image }: { image?: string }) {
  const background = toImageSrc(image || site.defaultBanner);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div
            className="art-a art-banner"
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className="art-banner-overlay">
              <div className="art-banner-title text-center">
                <h1 className="art-banner-title-h mb-15">
                  <span> Ready to order your project? </span>
                </h1>
                <div className="art-lg-text art-code mb-25">
                  <span> Let&apos;s work together! </span>
                </div>
                <Link href="/contact/" className="art-btn art-btn-md">
                  <span> Contact me </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
