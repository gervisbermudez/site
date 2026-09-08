"use client";

import type { ReactNode } from "react";
import { useChrome } from "@/components/layout/ChromeProvider";
import { TopBanner } from "@/components/layout/TopBanner";

export function ContentFrame({
  children,
  banner,
}: {
  children: ReactNode;
  banner?: string;
}) {
  const { menuOpen, infoOpen, closePanels } = useChrome();
  const contentActive = menuOpen || infoOpen;

  return (
    <div className={`art-content${contentActive ? " art-active" : ""}`}>
      <div className="art-curtain" onClick={closePanels} />
      <TopBanner src={banner} />
      <div className="transition-fade" id="swup">
        <div id="scrollbar" className="art-scroll-frame">
          {children}
        </div>
      </div>
    </div>
  );
}
