import { absoluteUrl } from "@/lib/site";

export function ShareButtons({
  title,
  path,
  description,
}: {
  title: string;
  path: string;
  description: string;
}) {
  const url = absoluteUrl(path);
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="social-share">
      <span>Share:</span>
      <a
        className="share-btn share-btn-facebook"
        title="Share on Facebook"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-facebook" />
      </a>
      <a
        className="share-btn share-btn-twitter"
        title="Share on Twitter"
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-twitter" />
      </a>
      <a
        className="share-btn share-btn-linkedin"
        title="Share on Linkedin"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}&summary=${encodeURIComponent(description)}`}
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-linkedin" />
      </a>
    </div>
  );
}
