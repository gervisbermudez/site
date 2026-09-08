"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/site";
import { useChrome } from "@/components/layout/ChromeProvider";

export function MenuBar() {
  const pathname = usePathname();
  const { menuOpen, toggleMenu, closePanels } = useChrome();

  const current = navItems.find((item) => {
    if (item.href === "/") return pathname === "/";
    return pathname === item.href || pathname.startsWith(item.href);
  });

  return (
    <div className="art-menu-bar-fix">
      <div className={`art-menu-bar${menuOpen ? " art-active" : ""}`}>
        <div className="art-menu-bar-frame">
          <div className="art-menu-bar-header">
            <a
              className={`art-menu-bar-btn${menuOpen ? " art-active" : ""}`}
              href="#menu"
              onClick={(event) => {
                event.preventDefault();
                toggleMenu();
              }}
              aria-label="Toggle menu"
            >
              <span />
            </a>
          </div>
          <div className="art-current-page">
            {current ? <a href={current.href}>{current.label}</a> : null}
          </div>
          <div className="art-scroll-frame">
            <nav id="swupMenu">
              <ul id="menu-main-menu" className="main-menu">
                {navItems.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href || pathname.startsWith(item.href);
                  return (
                    <li
                      key={item.href}
                      className={`menu-item menu-item-type-post_type menu-item-object-page${
                        active ? " current-menu-item current_page_item" : ""
                      }`}
                    >
                      <Link href={item.href} onClick={closePanels}>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
