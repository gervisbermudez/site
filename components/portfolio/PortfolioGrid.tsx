"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioCategory, PortfolioItem } from "@/lib/portfolio";

export function PortfolioGrid({
  categories,
  items,
  columns = 2,
}: {
  categories: PortfolioCategory[];
  items: PortfolioItem[];
  columns?: 2 | 3;
}) {
  const [filter, setFilter] = useState("*");

  const visible = useMemo(() => {
    if (filter === "*") return items;
    const token = filter.replace(/^\./, "");
    return items.filter((item) => item.category.split(/\s+/).includes(token));
  }, [filter, items]);

  return (
    <>
      <div className="art-filter mb-30">
        {categories.map((category) => (
          <a
            key={category.name}
            href="#filter"
            className={`art-link${filter === category.filter ? " art-current" : ""}`}
            onClick={(event) => {
              event.preventDefault();
              setFilter(category.filter);
            }}
          >
            {category.name}
          </a>
        ))}
      </div>
      <div
        className={`art-grid art-grid-${columns}-col art-gallery${
          columns === 2 ? " art-grid-masonry" : ""
        }`}
      >
        {visible.map((item) => (
          <div className={`art-grid-item ${item.category}`} key={item.slug}>
            <a
              href={item.image}
              className="art-a art-portfolio-item-frame"
              data-magnific-image
            >
              <Image
                src={item.imageSrc}
                alt={item.title}
                width={800}
                height={600}
              />
              <span className="art-item-hover">
                <i className="fas fa-expand" />
              </span>
            </a>
            <div className="art-item-description">
              <h5 className="mb-15">{item.title}</h5>
              <div className="mb-15">{item.description}</div>
              <Link href={item.link} className="art-link art-color-link art-w-chevron">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
