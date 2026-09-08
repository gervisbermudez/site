"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-php";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function highlightCode() {
  document.querySelectorAll("pre code").forEach((block) => {
    try {
      const el = block as HTMLElement;
      if (
        el.classList.contains("language-html") &&
        !Prism.languages.html &&
        Prism.languages.markup
      ) {
        Prism.languages.html = Prism.languages.markup;
      }
      Prism.highlightElement(el);
    } catch (error) {
      console.warn("Prism highlight failed", error);
    }
  });
}

function initSwipers() {
  const instances: Swiper[] = [];
  document.querySelectorAll<HTMLElement>(".art-works-slider").forEach((el) => {
    if (el.classList.contains("swiper-initialized")) return;
    const root = el.closest(".container-fluid") ?? el.parentElement;
    instances.push(
      new Swiper(el, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: root?.querySelector(".swiper-pagination") as HTMLElement | undefined,
          clickable: true,
        },
        navigation: {
          prevEl: root?.querySelector(".art-works-swiper-prev") as HTMLElement | undefined,
          nextEl: root?.querySelector(".art-works-swiper-next") as HTMLElement | undefined,
        },
      }),
    );
  });
  return instances;
}

export function HtmlEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    highlightCode();
    const swipers = initSwipers();
    return () => {
      swipers.forEach((instance) => instance.destroy(true, true));
    };
  }, [pathname]);

  return null;
}
