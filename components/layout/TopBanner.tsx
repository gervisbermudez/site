import { site } from "@/lib/site";

export function TopBanner({ src }: { src?: string }) {
  const image = src ?? site.defaultBanner;
  return (
    <div
      className="art-top-bg"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="art-top-bg-overlay" />
    </div>
  );
}
