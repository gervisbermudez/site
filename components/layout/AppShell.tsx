"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MenuBar } from "@/components/layout/MenuBar";
import { ChromeProvider, useChrome } from "@/components/layout/ChromeProvider";
import { SiteLightbox } from "@/components/client/Lightbox";
import { HtmlEnhancements } from "@/components/client/HtmlEnhancements";

function ShellInner({ children }: { children: ReactNode }) {
  const { closePanels } = useChrome();
  return (
    <div className="art-app">
      <div className="art-mobile-top-bar" onClick={closePanels} />
      <div className="art-app-wrapper">
        <div className="art-app-container">
          <Sidebar />
          <MenuBar />
          {children}
        </div>
      </div>
      <SiteLightbox />
      <HtmlEnhancements />
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ChromeProvider>
      <ShellInner>{children}</ShellInner>
    </ChromeProvider>
  );
}
