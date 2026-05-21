"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- SVG Icons ---
const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);
const EmailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);
const LinkIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);
const ArrowUpRightIcon = () => (
  <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

// --- Squad Data ---
const squadData = [
  {
    name: "Joseph Diaz",
    role: "Football Freestyler",
    heritage: "Colombian American",
    location: "Houston, Texas",
    image: "/Joseph.jpg",
    story: "Bringing pure Colombian flair mixed with American hustle. Joseph hits combos that shouldn't be possible, turning the street into his personal stage.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/freestyle_jrd", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@freestyle_jrd", icon: <TikTokIcon /> },
      { name: "Email", url: "mailto:joecr768@gmail.com", icon: <EmailIcon /> },
      { name: "Linktree", url: "https://linktr.ee/freestyle_jrd", icon: <LinkIcon /> },
    ]
  },
  {
    name: "Chaymae Qaddouri",
    role: "Football Freestyler",
    heritage: "Moroccan",
    location: "Houston, Texas",
    image: "/Chaymae Qaddouri.jpg",
    story: "Fusing Moroccan football heritage with absolute technical precision. Chaymae's flow is unmatched, redefining what ball control looks like on the concrete.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/c.qaddouri", icon: <InstagramIcon /> },
      { name: "Collabs", url: "mailto:chaimaequa@gmail.com", icon: <EmailIcon /> },
    ]
  },
  {
    name: "Chuy",
    role: "Football Freestyler",
    heritage: "Mexican American",
    location: "Houston, Texas",
    image: "/Chuy.jpg",
    story: "Mexican-American street legend in the making. Chuy brings aggressive, high-energy tricks that hype the crowd and leave defenders lost.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/streetchuy", icon: <InstagramIcon /> },
    ]
  }
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-[100svh] bg-bg text-text overflow-hidden selection:bg-accent selection:text-black">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-700 ease-in-out ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        <Hero />
        <SquadSection />
      </div>
    </main>
  );
}

// ==========================================
// 1. DELIBERATE, PROFESSIONAL LOADING SCREEN
// ==========================================
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const words = ["Skill", "Style", "Street"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // 800ms per word gives a clean, readable pace
    const interval = setInterval(() => setWordIndex((prev) => (prev + 1) % words.length), 800);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2400; // 2.4 seconds for a premium, intentional load sequence
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) requestAnimationFrame(step);
      else setTimeout(onComplete, 400); // Brief pause at 100% before fading out
    };
    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between">
      <div className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-muted uppercase tracking-[0.3em]">
        Tekkrew
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={wordIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text absolute">
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-display text-text tabular-nums leading-none">
        {count.toString().padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-stroke/50 origin-left">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.4, ease: "linear" }} className="w-full h-full bg-accent-gradient origin-left" style={{ boxShadow: "0 0 15px rgba(255, 230, 0, 0.4)" }} />
      </div>
    </motion.div>
  );
}

// ==========================================
// 2. NAVBAR
// ==========================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <nav className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-1.5 py-1.5 md:px-2 md:py-2 transition-shadow duration-300 max-w-full overflow-x-auto no-scrollbar ${scrolled ? "shadow-lg shadow-black/80" : ""}`}>
        
        <div className="group relative w-8 h-8 md:w-9 md:h-9 rounded-full p-[2px] bg-accent-gradient cursor-pointer flex-shrink-0">
          <div className="w-full h-full bg-bg rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 relative">
            <Image 
              src="/Tekkrew.jpg" 
              alt="Tekkrew Logo" 
              fill
              sizes="40px"
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="hidden sm:block w-px h-5 bg-stroke mx-2 md:mx-3" />

        <div className="flex items-center gap-0.5 sm:gap-2 px-1 md:px-2">
          {["Home", "Crew", "Events"].map((link, i) => (
            <button
              key={link}
              onClick={() => {
                if (link === "Crew") document.getElementById("crew")?.scrollIntoView({ behavior: "smooth" });
                if (link === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-[11px] sm:text-xs md:text-sm rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 transition-colors whitespace-nowrap ${i === 0 ? "text-text bg-stroke/50" : "text-muted hover:text-text hover:bg-stroke/50"}`}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="w-px h-4 md:h-5 bg-stroke mx-1.5 md:mx-3" />

        <div className="flex items-center gap-1 md:gap-2">
          <a 
            href="https://www.instagram.com/tekkrew_/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted hover:text-accent p-1.5 transition-colors hidden sm:block"
          >
            <InstagramIcon />
          </a>
          <button className="btn-gradient-ring relative text-[11px] sm:text-xs md:text-sm text-text bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center transition-transform hover:scale-105 whitespace-nowrap">
            Book Us <ArrowUpRightIcon />
          </button>
        </div>
      </nav>
    </div>
  );
}

// ==========================================
// 3. HERO (NO VIDEO - Premium CSS Stadium Pitch)
// ==========================================
function Hero() {
  const roles = ["Freestylers", "Creators", "Ballers", "Champions"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((prev) => (prev + 1) % roles.length), 2000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center w-full bg-[#050505]">
      
      {/* PREMIUM BACKGROUND: 
        Replaced the heavy video with a lightweight, hardware-accelerated CSS pattern.
        It features a subtle "tactical grid" and a soft yellow stadium spotlight in the center.
      */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,230,0,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full pt-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[10px] md:text-xs text-white/80 uppercase tracking-[0.3em] mb-4 md:mb-8 font-bold"
        >
          Road to World Cup '26
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-display italic leading-[0.9] tracking-tight text-white mb-4 md:mb-6 drop-shadow-2xl"
        >
          Tekkrew
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 font-medium"
        >
          A squad of{" "}
          <span className="font-display italic text-transparent bg-clip-text bg-accent-gradient inline-block px-1 drop-shadow-md min-w-[120px] md:min-w-[180px]">
            {roles[roleIndex]}
          </span>{" "}
          taking over the pitch.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-8 md:mb-12 border-l-2 border-accent pl-4 text-left mx-auto"
        >
          Born on the concrete, headed for the global stage. We built Tekkrew to elevate the beautiful game with raw street style. As the world turns its eyes to North America for World Cup '26, we are bringing gravity-defying freestyle to the masses—and we are just getting started.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          <button className="btn-gradient-ring relative bg-text text-bg text-xs md:text-sm rounded-full px-6 md:px-7 py-3 md:py-3.5 font-bold transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,230,0,0.2)] w-full sm:w-auto">
            Watch Tape
          </button>
          <button onClick={() => document.getElementById("crew")?.scrollIntoView({ behavior: "smooth" })} className="btn-gradient-ring relative bg-black/50 backdrop-blur-sm text-text text-xs md:text-sm rounded-full px-6 md:px-7 py-3 md:py-3.5 border border-stroke font-bold transition-transform hover:scale-105 hover:bg-surface w-full sm:w-auto">
            Meet the Squad
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em]">PITCH DOWN</span>
        <div className="w-px h-8 md:h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-full bg-accent animate-scroll-dot rounded-full absolute top-0" />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. SQUAD SECTION
// ==========================================
function SquadSection() {
  return (
    <section id="crew" className="relative w-full bg-bg py-16 md:py-24 px-4 md:px-6 border-t border-stroke/50">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display italic font-black text-white mb-1 md:mb-2">The Roster</h2>
            <p className="text-accent text-xs md:text-sm uppercase tracking-widest font-bold">Houston, Texas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {squadData.map((member, index) => (
            <div 
              key={index}
              className="bg-surface/80 backdrop-blur-sm border border-stroke rounded-2xl p-5 md:p-8 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-accent/5 rounded-bl-full -z-0" />

              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] bg-stroke mb-4 md:mb-6 relative z-10 mx-auto md:mx-0">
                <div className="w-full h-full rounded-full bg-bg border-4 border-surface overflow-hidden relative">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale"
                  />
                </div>
              </div>
              
              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-display italic text-text mb-1">{member.name}</h3>
                <p className="text-[10px] md:text-xs font-bold text-transparent bg-clip-text bg-accent-gradient mb-3 md:mb-4 uppercase tracking-widest">{member.role}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 md:mb-6">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 bg-white/5 px-2 py-1 rounded-md border border-white/5">{member.heritage}</span>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 bg-white/5 px-2 py-1 rounded-md border border-white/5">{member.location}</span>
                </div>
                
                <p className="text-muted text-xs md:text-sm leading-relaxed mb-6 md:mb-8 italic">
                  &ldquo;{member.story}&rdquo;
                </p>
              </div>

              <div className="mt-auto flex items-center justify-center md:justify-start gap-3 relative z-10 pt-4 md:pt-6 border-t border-stroke/50">
                {member.links.map((link, i) => (
                  <a 
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-black hover:bg-accent transition-colors"
                    title={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}