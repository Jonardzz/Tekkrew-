"use client";

import { memo, useEffect, useRef } from "react";
import { TK_LOGO_SVG } from "./tekkrewLogoSvg";

/* ================= TIMING — adjust here ================= */
const START_DELAY = 120; // short beat after the loader has faded, before the pen starts, ms
const PEN_SPEED = 2600; // scribble pen speed in SVG units per second
const SWEEP_SPEED = 1000; // "TekKREW" / "EST. 2026" ink sweep, SVG units per second across each letter (lower = slower)
const SWEEP_OVERLAP = 0.85; // next letter starts when the current one is 85% swept, so the hand never stops
const MOBILE_SPEED = 0.65; // on phone-size screens the pen runs at this fraction of PEN_SPEED (the logo is smaller there)
const MOBILE_START_DELAY = 200; // a slightly longer beat before drawing on phones, ms
/* Plays once; the finished logo then stays on screen. */
/* ======================================================== */

type Step = { start: number; dur: number; tick: (k: number) => void; done?: boolean };
const SVGNS = "http://www.w3.org/2000/svg";
function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, parent?: Element) {
  const node = document.createElementNS(SVGNS, tag);
  for (const k in attrs) node.setAttribute(k, String(attrs[k]));
  parent?.appendChild(node);
  return node;
}

type Prepared = { start: () => void; cancel: () => void };
const noop: Prepared = { start: () => undefined, cancel: () => undefined };

/** Measures paths and builds the masks up front (while the loader is still showing),
 *  so starting the animation later costs nothing. */
function prepare(root: HTMLElement): Prepared {
  const svg = root.querySelector("svg");
  if (!svg) return noop;
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
    return noop;
  }

  const narrow = window.matchMedia("(max-width: 767px)").matches;
  const pace = narrow ? MOBILE_SPEED : 1;
  const steps: Step[] = [];
  let t = narrow ? MOBILE_START_DELAY : START_DELAY;

  // 1) Scribble: one pen, strictly linear stroke-dashoffset at constant speed.
  scribble.forEach((path) => {
    // exact length (+2 so round caps never peek out before the pen arrives)
    const len = Math.ceil(path.getTotalLength()) + 2;
    path.style.strokeDasharray = `${len} ${len}`;
    path.style.strokeDashoffset = `${len}`;
    const dur = (len / (PEN_SPEED * pace)) * 1000;
    steps.push({ start: t, dur, tick: (k) => (path.style.strokeDashoffset = `${len * (1 - k)}`) });
    t += dur;
  });
  const scribbleEnd = t;

  // 2) Lettering: ink sweep. Each letter is wiped in left -> right by a mask with a soft leading edge.
  const defs = el("defs", {});
  svg.insertBefore(defs, svg.firstChild);
  const grad = el("linearGradient", { id: "tk-sweep-grad", x1: 0, x2: 1, y1: 0, y2: 0 }, defs);
  el("stop", { offset: 0, "stop-color": "#fff" }, grad);
  el("stop", { offset: 0.82, "stop-color": "#fff" }, grad);
  el("stop", { offset: 1, "stop-color": "#fff", "stop-opacity": 0 }, grad);
  letters.forEach((path, i) => {
    const b = path.getBBox();
    const pad = 6;
    const soft = Math.max(24, b.height * 0.25);
    const x = b.x - pad - soft;
    const full = b.width + 2 * pad + 2 * soft;
    const mask = el("mask", { id: `tk-sweep-${i}`, maskUnits: "userSpaceOnUse", x, y: b.y - pad, width: full, height: b.height + 2 * pad }, defs);
    const rect = el("rect", { x, y: b.y - pad, width: 0, height: b.height + 2 * pad, fill: "url(#tk-sweep-grad)" }, mask);
    path.setAttribute("mask", `url(#tk-sweep-${i})`);
    const dur = (b.width / (SWEEP_SPEED * pace)) * 1000 + 140;
    steps.push({
      start: t,
      dur,
      tick: (k) => {
        rect.setAttribute("width", String(full * k));
        if (k >= 1) path.removeAttribute("mask");
      },
    });
    t += dur * SWEEP_OVERLAP;
  });
  const end = Math.max(t, ...steps.map((s) => s.start + s.dur));
  const clamp = (x: number) => Math.min(1, Math.max(0, x));

  let raf = 0;
  let last: number | null = null;
  let time = 0;
  const frame = (now: number) => {
    // Linear clock driven by frame deltas. A dropped frame (e.g. the page still loading)
    // is capped at 50 ms, so the pen slows for an instant instead of jumping ahead.
    // Works at any refresh rate (60/120 Hz desktop, mobile WebKit).
    const dt = last === null ? 0 : Math.min(now - last, 50);
    last = now;
    time += dt;
    for (const s of steps) {
      const k = clamp((time - s.start) / s.dur); // strictly linear: no easing
      if (k <= 0 || (k >= 1 && s.done)) continue;
      if (k >= 1) s.done = true;
      s.tick(k);
    }
    // the exact traced scribble takes over from the painted line as the pen finishes it
    const swap = clamp((time - scribbleEnd) / 220);
    exact.style.opacity = String(swap);
    ink.style.opacity = String(1 - swap);
    if (time < end + 300) raf = requestAnimationFrame(frame);
    else {
      exact.style.opacity = "1";
      ink.style.display = "none";
    }
  };
  return {
    start: () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    },
    cancel: () => cancelAnimationFrame(raf),
  };
}

// The SVG lives in its own memoised node so React never re-renders (and resets) it
// when the wrapper's class changes — the prepared masks/dash state must survive until play.
const LOGO_HTML = { __html: TK_LOGO_SVG };
const LogoMarkup = memo(function LogoMarkup() {
  return <div dangerouslySetInnerHTML={LOGO_HTML} />;
});

/** Animated TekKREW logo: the scribble is drawn by a pen, then "TekKREW" and "EST. 2026" are swept in with ink. Plays once. */
export default function TekkrewLogoAnimated({ play = true, className = "" }: { play?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prepared = useRef<Prepared | null>(null);

  // Set everything up on mount (hidden), then just start the clock when `play` turns on.
  useEffect(() => {
    if (ref.current) prepared.current = prepare(ref.current);
    return () => prepared.current?.cancel();
  }, []);

  useEffect(() => {
    if (play) prepared.current?.start();
  }, [play]);

  return (
    <div ref={ref} className={`tk-logo-embed ${play ? "" : "tk-logo-waiting"} ${className}`}>
      <LogoMarkup />
    </div>
  );
}
