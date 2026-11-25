import Link from "next/link";
import { getPersonalTimeline } from "@/lib/timeline";

export function HomeJourney() {
  const photos = [...getPersonalTimeline().homePreview].reverse();
  if (photos.length === 0) return null;

  return (
    <div className="container-fluid home-journey">
      <div className="row">
        <div className="col-lg-12">
          <div className="art-section-title">
            <div className="art-title-frame">
              <h4 className="art-title-h">
                <span> My journey 📸 </span>
              </h4>
            </div>
            <div className="art-right-frame">
              <Link className="art-link art-color-link art-w-chevron" href="/journey/">
                See the photos
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="home-journey__grid">
            {photos.map((photo, index) => (
              <Link
                key={`${photo.file}-${photo.chapter}`}
                className="home-journey__item"
                href={`/journey/#${photo.chapter}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={400}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : undefined}
                  loading={index === 0 ? undefined : "lazy"}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
