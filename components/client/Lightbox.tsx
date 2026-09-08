"use client";

import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Slide = { src: string; alt?: string; title?: string };

function isImageHref(href: string | null): boolean {
  if (!href) return false;
  return /\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i.test(href);
}

function slideFromLink(link: HTMLAnchorElement): Slide | null {
  const href = link.getAttribute("href");
  if (!href || !isImageHref(href)) return null;
  return {
    src: href,
    alt: link.querySelector("img")?.getAttribute("alt") ?? "",
    title: link.getAttribute("title") ?? undefined,
  };
}

function slidesFromLinks(links: Iterable<Element>): Slide[] {
  const seen = new Set<string>();
  const slides: Slide[] = [];
  for (const el of links) {
    if (!(el instanceof HTMLAnchorElement)) continue;
    if (el.closest(".swiper-slide-duplicate")) continue;
    const slide = slideFromLink(el);
    if (!slide || seen.has(slide.src)) continue;
    seen.add(slide.src);
    slides.push(slide);
  }
  return slides;
}

function isLightboxLink(link: HTMLAnchorElement): boolean {
  return (
    link.hasAttribute("data-magnific-image") ||
    link.hasAttribute("data-magnific-gallery") ||
    link.hasAttribute("data-elementor-lightbox-slideshow") ||
    link.hasAttribute("data-elementor-open-lightbox") ||
    link.classList.contains("art-avatar-curtain") ||
    link.classList.contains("art-portfolio-item-frame")
  );
}

function collectFromTarget(target: Element): Slide[] | null {
  const galleryRoot = target.closest(
    ".journey-gallery, .wp-block-gallery, .art-works-slider",
  );
  if (galleryRoot) {
    const slides = slidesFromLinks(galleryRoot.querySelectorAll("a[href]"));
    if (slides.length) return slides;
  }

  const link = target.closest("a");
  if (!link || !isLightboxLink(link)) return null;
  const clicked = slideFromLink(link);
  if (!clicked) return null;

  const slideshow = link.getAttribute("data-elementor-lightbox-slideshow");
  if (slideshow) {
    const scope = link.closest(".art-scroll-frame") ?? document;
    const slides = slidesFromLinks(
      scope.querySelectorAll(
        `a[data-elementor-lightbox-slideshow="${CSS.escape(slideshow)}"]`,
      ),
    );
    if (slides.length) return slides;
  }

  if (link.hasAttribute("data-magnific-gallery")) {
    const scope =
      link.closest(".journey-chapter, .art-gallery, .art-grid") ??
      link.parentElement;
    if (scope) {
      const slides = slidesFromLinks(
        scope.querySelectorAll("a[data-magnific-gallery]"),
      );
      if (slides.length) return slides;
    }
  }

  if (link.hasAttribute("data-elementor-open-lightbox")) {
    const scope =
      link.closest(
        ".e-con-inner, .e-grid, .wp-block-gallery, .page-body, .post-html",
      ) ?? link.closest(".art-scroll-frame");
    if (scope) {
      const slides = slidesFromLinks(
        scope.querySelectorAll("a[data-elementor-open-lightbox]"),
      );
      if (slides.length) return slides;
    }
  }

  if (
    link.hasAttribute("data-magnific-image") ||
    link.classList.contains("art-portfolio-item-frame")
  ) {
    const scope =
      link.closest(".art-gallery, .post-html") ??
      (link.closest(".art-project-cover")
        ? link.closest(".art-scroll-frame")
        : null);
    if (scope) {
      const slides = slidesFromLinks(
        scope.querySelectorAll(
          "a[data-magnific-image], a.art-portfolio-item-frame",
        ),
      );
      if (slides.length) return slides;
    }
  }

  return [clicked];
}

export function SiteLightbox() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;
      if (target.closest(".yarl__root, .yarl__container")) return;
      const collected = collectFromTarget(target);
      if (!collected?.length) return;
      event.preventDefault();
      const href = target.closest("a")?.getAttribute("href");
      const start = Math.max(
        0,
        collected.findIndex((slide) => slide.src === href),
      );
      setSlides(collected);
      setIndex(start);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <Lightbox
      open={slides.length > 0}
      close={() => setSlides([])}
      index={index}
      slides={slides}
      on={{ view: ({ index: current }) => setIndex(current) }}
      carousel={{ finite: slides.length < 2 }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
