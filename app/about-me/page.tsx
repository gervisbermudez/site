import { ContentFrame } from "@/components/layout/ContentFrame";
import { Footer } from "@/components/layout/Footer";
import { AboutPage } from "@/components/about/AboutPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About me – Gervis Bermudez | Blog",
  path: "/about-me/",
});

export default function AboutMe() {
  return (
    <ContentFrame>
      <AboutPage />
      <div className="container-fluid">
        <Footer />
      </div>
    </ContentFrame>
  );
}
