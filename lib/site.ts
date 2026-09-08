import { datePartsInTimeZone } from "@/lib/paths";

export const site = {
  title: "Gervis Bermudez | Blog",
  author: "Gervis Bermudez",
  email: "gervisbermudez@outlook.com",
  description:
    "I develop creative solutions to complex problems, from challenging technical tests to building custom CMSs. I explore the world of code and graphic design to turn ideas into reality.",
  twitter: "gervisbermudez",
  github: "gervisbermudez",
  linkedin: "https://www.linkedin.com/in/gervisbermudez/",
  instagram: "https://www.instagram.com/gervisbermudez",
  whatsapp: "https://wa.me/541157614613",
  calendly: "https://calendly.com/gervisbermudez",
  phone: "+54 11 5761-4613",
  phoneHref: "tel:+541157614613",
  locale: "es_ES",
  defaultBanner: "/uploads/2024/03/luca-bravo-XJXWbfSo2f0-unsplash-2.jpg",
  favicon32: "/uploads/2024/03/Vectorized-Logo-150x150.png",
  favicon192: "/uploads/2024/03/Vectorized-Logo-300x300.png",
  postsPerPage: 6,
  birthday: "1993-04-06",
} as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function shouldIndex(): boolean {
  if (process.env.VERCEL_ENV === "preview") return false;
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!fromEnv) return false;
  try {
    const host = new URL(fromEnv).hostname;
    if (host === "localhost" || host.endsWith(".vercel.app")) return false;
  } catch {
    return false;
  }
  return true;
}

export function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getSiteUrl()}${path}`;
}

export function ageFromBirthday(isoDate = site.birthday): number {
  const [bornYear, bornMonth, bornDay] = isoDate.split("-").map(Number);
  const today = datePartsInTimeZone(new Date());
  let age = today.year - bornYear;
  if (
    today.month < bornMonth ||
    (today.month === bornMonth && today.day < bornDay)
  ) {
    age -= 1;
  }
  return age;
}

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/contact/", label: "Contact" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/about-me/", label: "About" },
  { href: "/blog/", label: "Blog" },
] as const;
