"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "crew", label: "Crew" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
];

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const probe = window.scrollY + window.innerHeight * 0.35;
        let current = "home";
        for (const link of NAV_LINKS) {
          const el = document.getElementById(link.id);
          if (el && el.offsetTop <= probe) current = link.id;
        }
        setActive(current);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}

const INSTAGRAM_URL = "https://www.instagram.com/tekkrew_/";

function scrollToSection(id: string) {
  if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
  else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ------------------------------------------------------------------ */
/* Desktop: glass pill                                                 */
/* ------------------------------------------------------------------ */

function DesktopNav({ active }: { active: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden justify-center pt-5 lg:flex">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="mr-2 flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-white/5"
        >
          <Image
            src="/Tekkrew.jpg"
            alt="Tekkrew logo"
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover ring-1 ring-accent/60"
          />
        </button>

        {NAV_LINKS.map((link) => {
          const isActive = active === link.id;
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className={`relative rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                isActive ? "text-black" : "text-white/60 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-accent shadow-[0_0_20px_rgba(255,230,0,0.35)]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          );
        })}

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative ml-2 overflow-hidden rounded-full border border-accent/60 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent transition-colors duration-300 hover:text-black"
        >
          <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 ease-out group-hover:translate-x-0" />
          <span className="relative z-10">Contact</span>
        </a>
      </motion.nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: ultra-minimal two-line trigger + full-screen overlay        */
/* ------------------------------------------------------------------ */

const overlayEase = [0.22, 1, 0.36, 1] as const;

function MobileNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const prevOverflow = useRef("");

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      prevOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevOverflow.current;
    }
    return () => {
      document.body.style.overflow = prevOverflow.current;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const go = (id: string) => {
    close();
    // Wait one frame so body scroll-lock releases before smooth scroll.
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <div className="lg:hidden">
      {/* Trigger: two hairline strokes, nothing else */}
      <motion.button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.88 }}
        className="fixed right-5 top-5 z-[70] flex h-11 w-11 items-center justify-center"
      >
        <span className="relative block h-4 w-7">
          <motion.span
            animate={
              open
                ? { rotate: 45, y: 7, width: "100%", backgroundColor: "#ffe600" }
                : { rotate: 0, y: 0, width: "100%", backgroundColor: "#ffffff" }
            }
            transition={{ duration: 0.35, ease: overlayEase }}
            className="absolute left-0 top-0 block h-[1.5px] origin-center rounded-full"
            style={{ width: "100%" }}
          />
          <motion.span
            animate={
              open
                ? { rotate: -45, y: -7, width: "100%", backgroundColor: "#ffe600" }
                : { rotate: 0, y: 0, width: "60%", backgroundColor: "#ffffff" }
            }
            transition={{ duration: 0.35, ease: overlayEase }}
            className="absolute bottom-0 right-0 block h-[1.5px] origin-center rounded-full"
          />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.15 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-[#050505]/95 px-8 pb-10 pt-28 backdrop-blur-2xl"
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((link, i) => {
                const isActive = active === link.id;
                return (
                  <div key={link.id} className="overflow-hidden border-b border-white/[0.06]">
                    <motion.button
                      type="button"
                      onClick={() => go(link.id)}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%", transition: { duration: 0.25, delay: (NAV_LINKS.length - i) * 0.03 } }}
                      transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: overlayEase }}
                      className="group flex w-full items-baseline gap-4 py-4 text-left"
                    >
                      <span className="text-[10px] font-bold tabular-nums tracking-[0.3em] text-accent/70">
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-4xl font-black italic leading-none transition-colors duration-300 ${
                          isActive ? "text-accent" : "text-white group-active:text-accent"
                        }`}
                      >
                        {link.label}
                      </span>
                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 self-center rounded-full bg-accent shadow-[0_0_10px_rgba(255,230,0,0.8)]" />
                      )}
                    </motion.button>
                  </div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: 0.45, ease: overlayEase }}
              className="flex flex-col gap-6"
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full bg-accent py-4 text-center text-sm font-black uppercase tracking-[0.25em] text-black shadow-[0_0_30px_rgba(255,230,0,0.25)] active:scale-[0.98]"
              >
                Contact
              </a>
              <p className="text-center text-[10px] uppercase tracking-[0.4em] text-white/30">
                Tekkrew — Houston, TX
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const active = useActiveSection();
  return (
    <>
      <DesktopNav active={active} />
      <MobileNav active={active} />
    </>
  );
}
