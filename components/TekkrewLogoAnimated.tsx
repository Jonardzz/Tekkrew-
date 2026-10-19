"use client";

import { memo, useEffect, useRef } from "react";
import { TK_LOGO_SVG } from "./tekkrewLogoSvg";
import { TK_WRITE_STROKES } from "./tekkrewWriteStrokes";

/* ================= TIMING — adjust here ================= */
const START_DELAY = 120; // short beat after the loader has faded, before the pen starts, ms
const PEN_SPEED = 2600; // scribble pen speed in SVG units per second
const WRITE_SPEED = 2300; // handwriting cruise speed for "TekKREW" / "EST. 2026", SVG units per second (lower = slower)
const CURVE_SLOWDOWN = 0.5; // on the tightest turns the pen slows to this share of the cruise speed (1 = no slowdown)
const SMALL_TEXT_SPEED = 0.45; // "EST. 2026" is tiny, so it's written at this share of the speed
const SETTLE_MS = 260; // when a letter is finished, the marker stroke settles into the exact letter shape
const MOBILE_SPEED = 1; // phones draw at the same speed as desktop
const MOBILE_START_DELAY = 120; // same beat as desktop
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

  // 2) Lettering: handwriting. A round marker as thick as the logo's letters writes each letter in natural
  //    pen order. Speed follows the shape (fast on straights, slower into curves and corners), each stroke
  //    eases in and out without ever stopping, and pen lifts depend on how far the hand travels.
  //    When a letter is done, the exact letter shape takes over, so the result is pixel-perfect.
  //    Everything is measured here (during the loader), so each frame only moves one dash.
  const ease = (u: number) => 0.55 * u + 0.45 * (u * u * u * (10 - 15 * u + 6 * u * u)); // never reaches zero speed
  const lim = (x: number) => Math.min(1, Math.max(0, x));
  const marker = el("g", { class: "tk-marker" });
  svg.appendChild(marker);
  let prevEnd: [number, number] | null = null;
  letters.forEach((letter, i) => {
    const def = TK_WRITE_STROKES[i];
    if (!def) return;
    const small = def.w < 10;
    letter.style.opacity = "0";
    letter.style.visibility = "hidden";
    const strokes = def.s.map((d) => el("path", { d, "stroke-width": def.w }, marker));
    strokes.forEach((p) => {
      const L = Math.ceil(p.getTotalLength()) + 2;
      p.style.strokeDasharray = `${L} ${L}`;
      p.style.strokeDashoffset = `${L}`;
      // sample the stroke; each piece gets a speed from how sharply the line turns there
      const n = Math.max(2, Math.ceil(L / (small ? 2 : 6)));
      const pts: [number, number][] = [];
      for (let j = 0; j <= n; j++) {
        const q = p.getPointAtLength((L * j) / n);
        pts.push([q.x, q.y]);
      }
      const lens = new Float32Array(n + 1);
      const times = new Float32Array(n + 1);
      const cruise = WRITE_SPEED * pace * (small ? SMALL_TEXT_SPEED : 1);
      for (let j = 1; j <= n; j++) {
        const a = pts[Math.max(0, j - 3)], m = pts[j - 1], c = pts[Math.min(n, j + 2)];
        const v1x = m[0] - a[0], v1y = m[1] - a[1], v2x = c[0] - m[0], v2y = c[1] - m[1];
        const den = Math.hypot(v1x, v1y) * Math.hypot(v2x, v2y) || 1;
        const straight = (Math.max(-1, Math.min(1, (v1x * v2x + v1y * v2y) / den)) + 1) / 2;
        const v = cruise * (CURVE_SLOWDOWN + (1 - CURVE_SLOWDOWN) * Math.pow(straight, 1.6));
        const ds = L / n;
        lens[j] = lens[j - 1] + ds;
        times[j] = times[j - 1] + (ds / v) * 1000;
      }
      const T = times[n];
      // pen lift: a quick hop inside a letter, a longer move when the hand travels to the next letter
      if (prevEnd) t += Math.min(260, 70 + Math.hypot(pts[0][0] - prevEnd[0], pts[0][1] - prevEnd[1]) / 6) / pace;
      prevEnd = pts[n];
      const lenAt = (tt: number) => {
        let lo = 0, hi = n;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (times[mid] < tt) lo = mid + 1;
          else hi = mid;
        }
        const j = Math.max(1, lo);
        const f = lim((tt - times[j - 1]) / (times[j] - times[j - 1] || 1));
        return lens[j - 1] + (lens[j] - lens[j - 1]) * f;
      };
      steps.push({ start: t, dur: T, tick: (k) => (p.style.strokeDashoffset = `${L - lenAt(ease(k) * T)}`) });
      t += T;
    });
    steps.push({
      start: t,
      dur: SETTLE_MS,
      tick: (k) => {
        if (letter.style.visibility) letter.style.visibility = "";
        letter.style.opacity = String(k);
        strokes.forEach((p) => (p.style.opacity = String(1 - k)));
        if (k >= 1) strokes.forEach((p) => (p.style.display = "none"));
      },
    });
  });
  const end = Math.max(t, ...steps.map((s) => s.start + s.dur));
  const clamp = (x: number) => Math.min(1, Math.max(0, x));

  exact.style.visibility = "hidden"; // the exact scribble isn't rendered until the hand-over
  let swapped = false;
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
    // (styles are only touched during the 220 ms hand-over, not on every frame)
    if (time >= scribbleEnd && !swapped) {
      const swap = clamp((time - scribbleEnd) / 220);
      if (exact.style.visibility) exact.style.visibility = "";
      exact.style.opacity = String(swap);
      ink.style.opacity = String(1 - swap);
      if (swap >= 1) {
        swapped = true;
        ink.style.display = "none";
      }
    }
    if (time < end + 300) raf = requestAnimationFrame(frame);
    else {
      exact.style.visibility = "";
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

/** Animated TekKREW logo: the scribble is drawn by a pen, then "TekKREW" and "EST. 2026" are handwritten with a marker. Plays once. */
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
