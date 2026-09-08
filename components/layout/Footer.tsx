import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} All Rights Reserved.</div>
      <div>
        Email:{" "}
        <a href={`mailto:${site.email}`} target="_blank" rel="noreferrer">
          {site.email}
        </a>
      </div>
    </footer>
  );
}
