"use client";

import { useEffect, useState } from "react";

export function TypingText({
  phrases,
  period = 2000,
}: {
  phrases: string[];
  period?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    const delay = deleting ? 40 : 90;
    const tick = window.setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          window.setTimeout(() => setDeleting(true), period);
        }
      } else {
        const next = current.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % phrases.length);
        }
      }
    }, delay);
    return () => window.clearTimeout(tick);
  }, [text, deleting, index, phrases, period]);

  return (
    <span className="txt-rotate">
      {text}
      <span className="typing-caret">|</span>
    </span>
  );
}
