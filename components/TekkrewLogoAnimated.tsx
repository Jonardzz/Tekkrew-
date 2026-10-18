"use client";

import { useEffect, useRef } from "react";
import { TK_LOGO_SVG } from "./tekkrewLogoSvg";

/* ================= TIMING — adjust here ================= */
const START_DELAY = 200; // wait before the pen starts, ms
const PEN_SPEED = 2600; // pen speed in SVG units per second — used for the scribble AND the lettering
const LETTER_GAP = 40; // tiny pen lift between letters, ms
const MOBILE_SPEED = 0.65; // on phone-size screens the pen runs at this fraction of PEN_SPEED (the logo is smaller there)
const MOBILE_START_DELAY = 350; // a slightly longer beat before drawing on phones, ms
/* Plays once; the finished logo then stays on screen. */
/* ======================================================== */

type Step = { path: SVGPathElement; len: number; start: number; dur: number; letter?: boolean; filled?: boolean };

function animate(root: HTMLElement): () => void {
  const svg = root.querySelector("svg");
  if (!svg) return () => undefined;
  const ink = svg.querySelector<SVGGElement>("#tk-ink")!;
  const exact = svg.querySelector<SVGPathElement>("#tk-scribble-exact")!;
  const scribble = Array.from(svg.querySelectorAll<SVGPathElement>("[data-order]")).sort(
    (a, b) => Number(a.dataset.order) - Number(b.dataset.order)
  );
  const letters = Array.from(svg.querySelectorAll<SVGPathElement>("[data-draw]")).sort(
    (a, b) => Number(a.dataset.draw) - Number(b.dataset.draw)
  );

  // prefers-reduced-motion: show the finished logo without animation
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    svg.classList.add("tk-done");
    return () => undefined;
  }

  const narrow = window.matchMedia("(max-width: 767px)").matches;
  const speed = narrow ? PEN_SPEED * MOBILE_SPEED : PEN_SPEED;
  const steps: Step[] = [];
  let t = narrow ? MOBILE_START_DELAY : START_DELAY;
  const add = (path: SVGPathElement, letter = false) => {
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len} ${len}`;
    path.style.strokeDashoffset = `${len}`;
    const dur = (len / speed) * 1000;
    steps.push({ path, len, start: t, dur, letter });
    t += dur;
  };
  scribble.forEach((p) => add(p));
  const scribbleEnd = t;
  letters.forEach((p) => {
    t += LETTER_GAP;
    add(p, true); // the pen traces each letter's outline, then the letter fills
  });
  const end = t;
  const clamp = (x: number) => Math.min(1, Math.max(0, x));

  let raf = 0;
  let origin: number | null = null;
  const frame = (now: number) => {
    if (origin === null) origin = now;
    const time = now - origin;
    for (const s of steps) {
      const k = clamp((time - s.start) / s.dur);
      s.path.style.strokeDashoffset = `${s.len * (1 - k)}`;
      if (s.letter && k >= 1 && !s.filled) {
        s.filled = true;
        s.path.classList.add("is-filled");
      }
    }
    // the exact traced scribble takes over from the painted line as the pen finishes it
    const swap = clamp((time - scribbleEnd) / 220);
    exact.style.opacity = String(swap);
    ink.style.opacity = String(1 - swap);
    if (time < end + 300) raf = requestAnimationFrame(frame);
    else {
      exact.style.opacity = "1";
      ink.style.display = "none";
      letters.forEach((p) => p.classList.add("is-settled")); // outlines fade, leaving the exact filled lettering
    }
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

/** Animated TekKREW logo: the scribble, then "TekKREW" and "EST. 2026", drawn by one pen at the same speed. Plays once. */
export default function TekkrewLogoAnimated({ play = true, className = "" }: { play?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !play) return;
    return animate(el);
  }, [play]);

  return (
    <div
      ref={ref}
      className={`tk-logo-embed ${play ? "" : "tk-logo-waiting"} ${className}`}
      dangerouslySetInnerHTML={{ __html: TK_LOGO_SVG }}
    />
  );
}
