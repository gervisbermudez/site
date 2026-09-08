"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ChromeState = {
  menuOpen: boolean;
  infoOpen: boolean;
  toggleMenu: () => void;
  toggleInfo: () => void;
  closePanels: () => void;
};

const ChromeContext = createContext<ChromeState | null>(null);

export function ChromeProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const closePanels = useCallback(() => {
    setMenuOpen(false);
    setInfoOpen(false);
  }, []);

  const value = useMemo<ChromeState>(
    () => ({
      menuOpen,
      infoOpen,
      toggleMenu: () => {
        setMenuOpen((open) => !open);
        setInfoOpen(false);
      },
      toggleInfo: () => {
        setInfoOpen((open) => !open);
        setMenuOpen(false);
      },
      closePanels,
    }),
    [menuOpen, infoOpen, closePanels],
  );

  return (
    <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>
  );
}

export function useChrome() {
  const ctx = useContext(ChromeContext);
  if (!ctx) {
    throw new Error("useChrome must be used within ChromeProvider");
  }
  return ctx;
}
