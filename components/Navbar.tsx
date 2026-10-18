"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// NAVIGATION — TekKREW premium floating nav
// Desktop: glass pill with scroll-spy + sliding active indicator.
// Mobile: compact logo chip + morphing hamburger opening a staggered panel.
// ==========================================

const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "tekkrew", label: "TekKREW" },
  { id: "media", label: "Press & Features" },
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
              ? "border-white/15 bg-[#0a0b0c]/90 shadow-[0_16px_50px_rgba(0,0,0,0.75)]"
              : "border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.55)]"
          }`}
        >
          {/* hairline glow across the top edge of the pill */}
          <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

          {/* Logo */}
          <button
            onClick={() => goTo("home")}
            aria-label="TekKREW, back to top"
            className="group relative mr-1 flex h-9 flex-shrink-0 items-center pl-3 pr-2"
          >
            <Image
              src="/tekkrew-logo.png"
              alt="TekKREW"
              width={800}
              height={420}
              priority
              className="-my-2 h-[52px] w-auto transition-transform duration-300 group-hover:scale-105"
            />
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
                      className="absolute inset-0 rounded-full bg-white/10"
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/60 group-hover:text-white"
                    } ${section.id === "tekkrew" ? "normal-case" : ""}`}
                  >
                    {section.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
                  )}
                  {!isActive && (
                    <span className="absolute inset-x-4 bottom-1 z-10 h-px origin-left scale-x-0 bg-accent/70 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </button>
              );
            })}
          </div>

          <span className="mx-1 h-5 w-px bg-white/10" />

          {/* Contact — crew Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group ml-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/80 transition-colors duration-300 hover:border-accent hover:text-accent lg:text-[13px]"
          >
            Contact
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.nav>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="relative z-20 flex items-center justify-end px-4 pt-4 md:hidden">
        {/* Hamburger → X (styles in globals.css: .tk-burger) */}
        <motion.button
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          data-open={menuOpen ? "" : undefined}
          className="tk-burger pointer-events-auto"
        >
          <span className="tk-burger__line tk-burger__line--top" />
          <span className="tk-burger__line tk-burger__line--bottom" />
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
              className="pointer-events-auto fixed right-4 top-[4.75rem] z-10 w-[min(calc(100vw-2rem),22rem)] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0a0b0c]/95 shadow-[0_30px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl md:hidden"
            >
              <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

              <div className="flex items-center justify-between px-6 pb-2 pt-5">
                <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/40">Navigation</span>
                <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">
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
                        isActive ? "bg-white/5" : "hover:bg-white/5 active:bg-white/10"
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
                        className={`font-display text-2xl font-black text-white ${section.id === "tekkrew" ? "" : "uppercase"}`}
                      >
                        {section.label}
                      </span>
                      <span
                        className={`ml-auto h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-accent"
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
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-3.5 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors active:border-accent active:text-accent"
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