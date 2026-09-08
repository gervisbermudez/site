import Link from "next/link";
import { TypingText } from "@/components/client/TypingText";

const HERO_BG =
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop";

const phrases = [
  "web applications",
  "ios and android applications.",
  "design mockups.",
  "automation tools.",
];

export function HeroBanner() {
  return (
    <div className="container-fluid">
      <div className="row p-30-0 p-lg-30-0 p-md-15-0">
        <div className="col-lg-12">
          <div
            className="art-a art-banner"
            style={{ backgroundImage: `url(${HERO_BG})` }}
          >
            <div className="art-banner-back" />
            <div className="art-banner-dec" />
            <div className="art-banner-overlay">
              <div className="art-banner-title">
                <h1 className="art-banner-title-h mb-15">
                  <span>
                    I&apos;m Developer
                    <br />
                  </span>
                </h1>
                <div className="art-lg-text art-code mb-25">
                  &lt;<i>code</i>&gt; I build{" "}
                  <TypingText phrases={phrases} />
                  &lt;/<i>code</i>&gt;
                  <br />
                  <br />
                  <br />
                </div>
                <div className="art-buttons-frame">
                  <Link href="/contact/" className="art-btn art-btn-md">
                    <span>Contact me</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
