import { notFound } from "next/navigation";
import { ContentFrame } from "@/components/layout/ContentFrame";
import { ContactBanner } from "@/components/layout/ContactBanner";
import { Footer } from "@/components/layout/Footer";
import { PortfolioNavigator } from "@/components/portfolio/PortfolioNavigator";
import {
  getAdjacentCaseStudies,
  getCaseStudy,
  getCaseStudies,
} from "@/lib/portfolio";
import { buildMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return buildMetadata({
    title: study.title,
    description: study.description,
    path: study.permalink,
    image: study.banner,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const { previous, next } = getAdjacentCaseStudies(slug);

  return (
    <ContentFrame>
      <div dangerouslySetInnerHTML={{ __html: study.html }} />
      <ContactBanner image={study.banner} />
      <PortfolioNavigator previous={previous} next={next} />
      <div className="container-fluid">
        <Footer />
      </div>
    </ContentFrame>
  );
}
