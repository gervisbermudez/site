import Image from "next/image";
import type { TimelineChapter } from "@/lib/timeline";

export function JourneyChapter({ chapter }: { chapter: TimelineChapter }) {
  return (
    <article className="journey-chapter" id={chapter.id}>
      <div className="journey-chapter__mark" aria-hidden="true" />
      <header className="journey-chapter__header">
        <div className="journey-chapter__heading">
          <h2 className="journey-chapter__title">
            <span className="journey-chapter__emoji" aria-hidden="true">
              {chapter.emoji}
            </span>
            {chapter.title}
          </h2>
          <p className="journey-chapter__role">{chapter.role}</p>
        </div>
        <span className="journey-chapter__period">{chapter.period}</span>
      </header>
      <div
        className="journey-chapter__story"
        dangerouslySetInnerHTML={{ __html: chapter.storyHtml }}
      />
      {chapter.stack.length ? (
        <ul className="journey-stack">
          {chapter.stack.map((tag) => (
            <li className="journey-stack__tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      {chapter.photos.length ? (
        <div className="journey-gallery wp-block-gallery">
          {chapter.photos.map((photo) => (
            <div className="art-grid-item" key={photo.file}>
              <a
                className="journey-gallery__item"
                href={photo.href}
                data-magnific-gallery
                title={photo.caption || undefined}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption || chapter.title}
                  width={400}
                  height={400}
                />
                <span className="journey-gallery__zoom" aria-hidden="true">
                  <i className="fas fa-expand" />
                </span>
              </a>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
