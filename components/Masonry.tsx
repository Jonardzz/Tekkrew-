"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

export interface MasonryItem {
  id: string;
  img: string;
  /** height / width ratio, used to size each tile without distorting the photo */
  aspectRatio: number;
  alt?: string;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: MasonryItem[];
  onItemClick?: (item: MasonryItem) => void;
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  gap?: number;
  /** number of items to eager-load (first visible rows) */
  priorityCount?: number;
}

// Columns are derived from the measured container width (not viewport width),
// so the layout stays correct inside a max-width wrapper on any screen size.
const BREAKPOINTS: [number, number][] = [
  [1100, 5],
  [800, 4],
  [560, 3],
  [0, 2],
];

function getColumns(width: number) {
  for (const [min, cols] of BREAKPOINTS) {
    if (width >= min) return cols;
  }
  return 2;
}

export default function Masonry({
  items,
  onItemClick,
  ease = "power3.out",
  duration = 0.5,
  stagger = 0.04,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.97,
  blurToFocus = true,
  gap = 16,
  priorityCount = 4,
}: MasonryProps) {
  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const hasAnimatedIn = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    setReducedMotion(reduced);
    if (reduced) setRevealed(true); // no scroll-gated animation to skip motion entirely
  }, []);

  // Only trigger the entrance animation once the gallery actually scrolls into view.
  useEffect(() => {
    if (revealed) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef, revealed]);

  const columns = width ? getColumns(width) : 2;

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const h = columnWidth * item.aspectRatio;
      const y = colHeights[col];

      colHeights[col] += h + gap;
      return { ...item, x, y, w: columnWidth, h };
    });
  }, [columns, items, width, gap]);

  const containerHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map((item) => item.y + item.h));
  }, [grid]);

  const getInitialOffset = (item: GridItem) => {
    switch (animateFrom) {
      case "top":
        return { x: item.x, y: item.y - 80 };
      case "left":
        return { x: item.x - 80, y: item.y };
      case "right":
        return { x: item.x + 80, y: item.y };
      case "center":
        return { x: width / 2 - item.w / 2, y: item.y };
      case "bottom":
      default:
        return { x: item.x, y: item.y + 80 };
    }
  };

  useLayoutEffect(() => {
    if (!grid.length) return;

    if (!revealed) {
      // Park items at their final slot but invisible, so nothing flashes
      // unpositioned before the entrance animation is allowed to run.
      grid.forEach((item) => {
        gsap.set(`[data-key="${item.id}"]`, {
          opacity: 0,
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
        });
      });
      return;
    }

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasAnimatedIn.current) {
        if (reducedMotion) {
          gsap.set(selector, { opacity: 1, ...animProps, filter: "blur(0px)" });
          return;
        }
        const start = getInitialOffset(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(8px)" }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.7,
            ease: "power3.out",
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration: reducedMotion ? 0 : duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasAnimatedIn.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, revealed, stagger, animateFrom, blurToFocus, duration, ease, reducedMotion]);

  const handleMouseEnter = (id: string) => {
    if (isTouch || !scaleOnHover || reducedMotion) return;
    gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (id: string) => {
    if (isTouch || !scaleOnHover || reducedMotion) return;
    gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: containerHeight || undefined }}>
      {grid.map((item, index) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute overflow-hidden rounded-2xl border border-white/10 bg-[#111214] shadow-lg transition-colors duration-300 md:hover:border-accent/40 md:hover:shadow-[0_10px_30px_rgba(255,230,0,0.2)]"
          style={{ willChange: "transform, width, height, opacity" }}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={() => handleMouseLeave(item.id)}
        >
          <button
            type="button"
            onClick={() => onItemClick?.(item)}
            className="group relative block h-full w-full cursor-pointer"
            aria-label={item.alt || "View photo"}
          >
            <Image
              src={item.img}
              alt={item.alt || ""}
              fill
              loading={index < priorityCount ? "eager" : "lazy"}
              priority={index < priorityCount}
              quality={85}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover opacity-80 transition-all duration-500 md:group-hover:scale-105 md:group-hover:opacity-100"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent bg-black/50 text-accent shadow-[0_0_15px_rgba(255,230,0,0.5)] backdrop-blur-md">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
