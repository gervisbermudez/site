"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { PostCard } from "@/components/blog/PostCard";
import type { Post } from "@/lib/posts";
import Link from "next/link";

export function RecentPosts({ posts }: { posts: Post[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;
    const swiper = new Swiper(root.querySelector(".art-blog-slider") as HTMLElement, {
      modules: [Navigation, Pagination],
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 1400,
      breakpoints: {
        0: { slidesPerView: 1 },
        720: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
      pagination: {
        el: root.querySelector(".swiper-pagination") as HTMLElement,
        clickable: true,
      },
      navigation: {
        prevEl: root.querySelector(".art-blog-swiper-prev") as HTMLElement,
        nextEl: root.querySelector(".art-blog-swiper-next") as HTMLElement,
      },
    });
    return () => swiper.destroy(true, true);
  }, [posts]);

  return (
    <div className="container-fluid" ref={containerRef}>
      <div className="row">
        <div className="col-lg-12">
          <div className="art-section-title">
            <div className="art-title-frame">
              <h4 className="art-title-h">
                <span> Recent Posts </span>
              </h4>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="swiper-container art-blog-slider swiper" style={{ overflow: "visible" }}>
            <div className="swiper-wrapper">
              {posts.map((post) => (
                <div className="swiper-slide" key={post.permalink}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="art-slider-navigation">
            <div className="art-sn-left">
              <div className="swiper-pagination" />
            </div>
            <div className="art-sn-right">
              <div className="art-slider-nav-frame">
                <div className="art-slider-nav art-blog-swiper-prev">
                  <i className="fas fa-chevron-left" />
                </div>
                <div className="art-slider-nav art-blog-swiper-next">
                  <i className="fas fa-chevron-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Link className="art-link art-color-link art-w-chevron" href="/blog/">
            See all my posts
          </Link>
        </div>
      </div>
    </div>
  );
}
