"use client";

/* Yellow brush Tekkrew logo, drawn by hand as a website intro:
   1) the brush underline is painted (two sweeps)
   2) "TEKKREW" is written letter by letter, stroke by stroke
   3) the star is drawn in one line, then sparkles
   The artwork is three transparent PNGs (public/brand-yellow) in one frame. Nothing is redrawn or recoloured:
   each PNG is revealed through an SVG mask whose strokes follow the pen. Motion lives in globals.css (.tk-brush…). */

/** After the intro the star keeps a gentle sparkle on a loop. Set to false for a one-time intro. */
const IDLE_SPARKLE = true;

const W = 939;
const H = 446;

/* ================= TIMING — adjust here (milliseconds) ================= */
const START = 120; // beat before the brush starts
const SWEEP = 380; // each of the two underline sweeps
const LETTER_STROKE = 118; // one pen stroke of a letter
const LETTER_GAP = 45; // lift of the pen between letters
const STAR = 540; // the star, drawn in one line
/* ======================================================================= */

type Stroke = { d: string; w: number; ms?: number; newLetter?: boolean };

// Pen paths, in the 939 × 446 frame of the artwork. `w` is the pen width (a bit wider than the paint).
const UNDERLINE: Stroke[] = [
  { d: "M30 404 Q 380 290 756 228", w: 78 },
  { d: "M176 424 Q 540 312 902 268", w: 84 },
];
const LETTERS: Stroke[] = [
  // T
  { d: "M22 196 L120 171", w: 52, newLetter: true },
  { d: "M73 182 L70 338", w: 52 },
  // E
  { d: "M150 150 L152 304", w: 50, newLetter: true },
  { d: "M146 160 L222 146", w: 44 },
  { d: "M152 224 L204 212", w: 44 },
  { d: "M152 296 L206 280", w: 46 },
  // K
  { d: "M252 120 L240 294", w: 52, newLetter: true },
  { d: "M330 118 L266 216", w: 48 },
  { d: "M262 214 L338 258", w: 48 },
  // K
  { d: "M374 96 L360 268", w: 52, newLetter: true },
  { d: "M446 88 L384 196", w: 48 },
  { d: "M380 194 L458 228", w: 48 },
  // R
  { d: "M470 96 L484 244", w: 52, newLetter: true },
  { d: "M462 104 Q 524 70 552 92 Q 572 118 540 146 L 498 168", w: 50, ms: 1.5 },
  { d: "M500 160 L572 214", w: 50 },
  // E
  { d: "M594 54 L602 212", w: 50, newLetter: true },
  { d: "M588 62 L662 46", w: 44 },
  { d: "M602 130 L650 118", w: 44 },
  { d: "M600 202 L652 184", w: 46 },
  // W
  { d: "M666 36 L693 196", w: 52, newLetter: true },
  { d: "M693 196 L736 40", w: 50 },
  { d: "M736 40 L760 184", w: 50 },
  { d: "M760 184 L796 18", w: 56 },
];
const STAR_PATH = "M786 136 L918 170 L756 224 L851 112 L866 250 L786 136";

export default function TekkrewBrushLogo({ play, className = "" }: { play: boolean; className?: string }) {
  let t = START;
  const sweeps = UNDERLINE.map((s) => {
    const item = { ...s, delay: t, dur: SWEEP };
    t += SWEEP * 0.82;
    return item;
  });
  t += 60;
  const underlineDone = t;
  const letters = LETTERS.map((s) => {
    if (s.newLetter) t += LETTER_GAP;
    const dur = LETTER_STROKE * (s.ms ?? 1);
    const item = { ...s, delay: t, dur };
    t += dur * 0.9;
    return item;
  });
  const textDone = t + 60;
  const starDelay = textDone + 40;
  const starDone = starDelay + STAR;

  const pen = (s: { d: string; w: number; delay: number; dur: number }, i: number) => (
    <path
      key={i}
      className="tk-brush__pen"
      d={s.d}
      pathLength={1}
      strokeWidth={s.w}
      style={{ animationDelay: `${Math.round(s.delay)}ms`, animationDuration: `${Math.round(s.dur)}ms` }}
    />
  );

  return (
    <div
      className={`tk-brush ${play ? "tk-brush--play" : ""} ${IDLE_SPARKLE ? "tk-brush--idle" : ""} ${className}`}
      style={{ aspectRatio: `${W} / ${H}`, ["--tk-star-done" as string]: `${Math.round(starDone)}ms` }}
      role="img"
      aria-label="Tekkrew"
    >
      <svg className="tk-brush__svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <mask id="tk-m-stroke" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            {sweeps.map(pen)}
          </mask>
          <mask id="tk-m-text" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            {letters.map(pen)}
          </mask>
          <mask id="tk-m-star" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            {pen({ d: STAR_PATH, w: 30, delay: starDelay, dur: STAR }, 0)}
          </mask>
        </defs>
        {/* masked copy = what the pen has painted so far; plain copy fades in at the end so every speck of paint is there */}
        <image href="/brand-yellow/tk-yellow-brush.png" width={W} height={H} mask="url(#tk-m-stroke)" />
        <image className="tk-brush__full" href="/brand-yellow/tk-yellow-brush.png" width={W} height={H} style={{ animationDelay: `${Math.round(underlineDone)}ms` }} />
        <image href="/brand-yellow/tk-yellow-text.png" width={W} height={H} mask="url(#tk-m-text)" />
        <image className="tk-brush__full" href="/brand-yellow/tk-yellow-text.png" width={W} height={H} style={{ animationDelay: `${Math.round(textDone)}ms` }} />
        <g className="tk-brush__star" style={{ animationDelay: `${Math.round(starDone - 40)}ms` }}>
          <image href="/brand-yellow/tk-yellow-star.png" width={W} height={H} mask="url(#tk-m-star)" />
          <image className="tk-brush__full" href="/brand-yellow/tk-yellow-star.png" width={W} height={H} style={{ animationDelay: `${Math.round(starDone)}ms` }} />
        </g>
      </svg>
      <span className="tk-brush__sparkles" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
