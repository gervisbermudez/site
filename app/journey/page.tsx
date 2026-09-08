import { ContentFrame } from "@/components/layout/ContentFrame";
import { Footer } from "@/components/layout/Footer";
import { JourneyChapter } from "@/components/journey/JourneyChapter";
import { getPersonalTimeline } from "@/lib/timeline";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "The journey behind the commits – Gervis Bermudez",
  description:
    "A personal timeline of the people, teams, and tools behind the CV — photos from WebFindYou to Santander Tecnología.",
  path: "/journey/",
});

export default function JourneyPage() {
  const timeline = getPersonalTimeline();

  return (
    <ContentFrame>
      <div className="container-fluid">
        <div className="row p-30-0">
          <div className="col-lg-12">
            <div className="art-section-title">
              <div className="art-title-frame">
                <h1>{timeline.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="art-a art-card journey">
              <div className="journey-intro">
                <p className="journey-lead">{timeline.lead}</p>
              </div>
              <div className="journey-timeline">
                {timeline.chapters.map((chapter) => (
                  <JourneyChapter key={chapter.id} chapter={chapter} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </ContentFrame>
  );
}
