"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// NAVIGATION — Tekkrew premium floating nav
// Desktop: glass pill with scroll-spy + sliding active indicator.
// Mobile: compact logo chip + morphing hamburger opening a staggered panel.
// ==========================================

const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "crew", label: "Crew" },
  { id: "events", label: "Media" },
  { id: "gallery", label: "Gallery" },
] as const;

type SectionId = (typeof NAV_SECTIONS)[number]["id"];

const INSTAGRAM_URL = "https://www.instagram.com/tekkrew_/";

const ArrowUpRight = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const panelVariants = {
  hidden: { opacity: 0, y: -14, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.05, delayChildren: 0.06 },
  },
  exit: { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.18, ease: "easeIn" as const } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-spy: highlight the section currently occupying the upper third of the viewport.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 60);
      const probe = window.scrollY + window.innerHeight * 0.4;
      let current: SectionId = "home";
      for (const section of NAV_SECTIONS) {
        if (section.id === "home") continue;
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= probe) current = section.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock body scroll only while the mobile menu is open, restoring whatever was set before.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const goTo = useCallback(
    (id: SectionId) => {
      const scroll = () => {
        if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
        else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      };
      if (menuOpen) {
        setMenuOpen(false);
        // Wait for the body scroll-lock to release before smooth-scrolling.
        window.setTimeout(scroll, 150);
      } else {
        scroll();
      }
    },
    [menuOpen]
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
      {/* ================= DESKTOP ================= */}
      <div className="hidden justify-center px-4 pt-5 md:flex lg:pt-6">
        <motion.nav
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Primary"
          className={`pointer-events-auto relative inline-flex items-center rounded-full border bg-[#0a0b0c]/75 px-2 py-2 backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-500 ${
            scrolled
              ? "border-accent/40 bg-[#0a0b0c]/90 shadow-[0_16px_50px_rgba(0,0,0,0.75),0_0_30px_rgba(255,230,0,0.08)]"
              : "border-accent/15 shadow-[0_10px_40px_rgba(0,0,0,0.55)]"
          }`}
        >
          {/* hairline glow across the top edge of the pill */}
          <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

          {/* Logo */}
          <button
            onClick={() => goTo("home")}
            aria-label="Back to top"
            className="group relative mr-2 h-9 w-9 flex-shrink-0 rounded-full bg-gradient-to-br from-accent via-[#8a7a00] to-accent/30 p-[2px] transition-shadow duration-300 hover:shadow-[0_0_18px_rgba(255,230,0,0.5)]"
          >
            <span className="relative block h-full w-full overflow-hidden rounded-full bg-black">
              <Image
                src="/Tekkrew.jpg"
                alt="Tekkrew logo"
                fill
                sizes="36px"
                priority
                className="object-cover transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
              />
            </span>
          </button>

          <span className="mx-1 h-5 w-px bg-white/10" />

          {/* Links with sliding active pill */}
          <div className="flex items-center px-1">
            {NAV_SECTIONS.map((section) => {
              const isActive = active === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => goTo(section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] lg:px-5 lg:text-[13px]"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-accent shadow-[0_0_18px_rgba(255,230,0,0.35)]"
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? "text-black" : "text-white/60 group-hover:text-white"
                    }`}
                  >
                    {section.label}
                  </span>
                  {!isActive && (
                    <span className="absolute inset-x-4 bottom-1 z-10 h-px origin-left scale-x-0 bg-accent/70 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </button>
              );
            })}
          </div>

          <span className="mx-1 h-5 w-px bg-white/10" />

          {/* Contact CTA — sweeping yellow fill on hover */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative ml-2 inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-accent/40 bg-black/40 px-5 py-2 text-xs font-black uppercase tracking-[0.14em] text-accent transition-all duration-300 hover:border-accent hover:text-black hover:shadow-[0_0_20px_rgba(255,230,0,0.45)] lg:text-[13px]"
          >
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative z-10">Contact</span>
            <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.nav>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="relative z-20 flex items-center justify-between px-4 pt-4 md:hidden">
        {/* Logo chip */}
        <motion.button
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => goTo("home")}
          aria-label="Back to top"
          className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-accent/20 bg-[#0a0b0c]/85 py-1.5 pl-1.5 pr-4 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          <span className="relative h-8 w-8 overflow-hidden rounded-full border border-accent/50">
            <Image src="/Tekkrew.jpg" alt="Tekkrew logo" fill sizes="32px" priority className="object-cover" />
          </span>
          <span className="font-display text-sm font-black italic tracking-wide text-white">
            Tekkrew<span className="text-accent">_</span>
          </span>
        </motion.button>

        {/* Morphing hamburger */}
        <motion.button
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={`pointer-events-auto relative flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 ${
            menuOpen
              ? "border-accent bg-accent shadow-[0_0_22px_rgba(255,230,0,0.45)]"
              : "border-accent/25 bg-[#0a0b0c]/85 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          }`}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-[2px] w-5 rounded-full transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45 bg-black" : "top-0 bg-white"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full transition-all duration-300 ${
                menuOpen ? "w-5 bg-black opacity-0" : "w-3.5 bg-accent opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-[2px] w-5 rounded-full transition-all duration-300 ${
                menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45 bg-black" : "bottom-0 bg-white"
              }`}
            />
          </span>
        </motion.button>
      </div>

      {/* Mobile menu panel + backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="pointer-events-auto fixed inset-0 z-10 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.nav
              key="nav-panel"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              aria-label="Mobile"
              className="pointer-events-auto fixed right-4 top-[4.75rem] z-10 w-[min(calc(100vw-2rem),22rem)] overflow-hidden rounded-[1.6rem] border border-accent/25 bg-[#0a0b0c]/95 shadow-[0_30px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(255,230,0,0.05)] backdrop-blur-2xl md:hidden"
            >
              <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

              <div className="flex items-center justify-between px-6 pb-2 pt-5">
                <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/40">Navigation</span>
                <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-accent">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-accent" />
                  HOU
                </span>
              </div>

              <div className="px-3 pb-3">
                {NAV_SECTIONS.map((section, i) => {
                  const isActive = active === section.id;
                  return (
                    <motion.button
                      key={section.id}
                      variants={itemVariants}
                      onClick={() => goTo(section.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors duration-200 ${
                        isActive ? "bg-accent/10" : "hover:bg-white/5 active:bg-white/10"
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold tabular-nums tracking-widest ${
                          isActive ? "text-accent" : "text-white/30"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-xl font-black italic ${isActive ? "text-accent" : "text-white"}`}
                      >
                        {section.label}
                      </span>
                      <span
                        className={`ml-auto h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-accent shadow-[0_0_10px_rgba(255,230,0,0.9)]"
                            : "bg-white/15 group-hover:bg-white/40"
                        }`}
                      />
                    </motion.button>
                  );
                })}
              </div>

              <div className="border-t border-white/10 p-3">
                <motion.a
                  variants={itemVariants}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3.5 text-xs font-black uppercase tracking-[0.2em] text-black shadow-[0_0_25px_rgba(255,230,0,0.25)] transition-transform active:scale-[0.98]"
                >
                  Contact <ArrowUpRight />
                </motion.a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}