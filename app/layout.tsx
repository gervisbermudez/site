import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { absoluteUrl, shouldIndex, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: site.title,
    template: "%s",
  },
  description: site.description,
  robots: shouldIndex()
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: [
      { url: site.favicon32, sizes: "32x32" },
      { url: site.favicon192, sizes: "192x192" },
    ],
    apple: site.favicon192,
  },
};

const themeCss = [
  "/themes/arter/assets/css/bootstrap.css",
  "/themes/arter/assets/fonts/font-awesome/css/font-awesome.css",
  "/themes/arter/style.css",
  "/plugins/elementor/assets/css/frontend.min.css",
  "/uploads/elementor/css/post-45.css",
  "/css/styles.css",
  "/plugins/code-block-for-elementor/assets/prism-okaidia.css",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" prefix="og: http://ogp.me/ns#">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Courier+Prime:400,400italic,700,700italic&subset=latin,latin-ext"
        />
        {themeCss.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <link rel="alternate" type="application/rss+xml" title={`${site.title} – Feed`} href="/feed.xml" />
      </head>
      <body className="home page-template default--scrolling">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
