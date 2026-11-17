"use client";

/* Yellow brush TekKREW logo with a website-intro animation.
   Order: brush stroke sweeps in → "TEKKREW" wipes on → star pops with a small sparkle.
   The three pieces are separate transparent PNGs (public/brand-yellow) stacked in the same frame,
   so the artwork itself is never redrawn or recoloured. Motion lives in globals.css (.tk-brush…). */

/** After the intro the star keeps a gentle sparkle on a loop. Set to false for a one-time intro. */
const IDLE_SPARKLE = true;

const W = 939;
const H = 446;

export default function TekkrewBrushLogo({ play, className = "" }: { play: boolean; className?: string }) {
  return (
    <div
      className={`tk-brush ${play ? "tk-brush--play" : ""} ${IDLE_SPARKLE ? "tk-brush--idle" : ""} ${className}`}
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="TekKREW"
    >
      <img className="tk-brush__layer tk-brush__stroke" src="/brand-yellow/tk-yellow-brush.png" alt="" width={W} height={H} decoding="async" draggable={false} />
      <img className="tk-brush__layer tk-brush__text" src="/brand-yellow/tk-yellow-text.png" alt="" width={W} height={H} decoding="async" draggable={false} />
      <img className="tk-brush__layer tk-brush__star" src="/brand-yellow/tk-yellow-star.png" alt="" width={W} height={H} decoding="async" draggable={false} />
      <span className="tk-brush__sparkles" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
