"use client";

import React, { useState, useEffect } from "react";
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

const LetterboxdIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="6" cy="12" r="3" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="18" cy="12" r="3" />
  </svg>
);

// --- TypeScript Definitions ---
interface SquadMember {
  name: string;
  role: string;
  heritage: string;
  flags: string[];
  location: string;
  image: string;
  gifImage?: string;
  imageClass?: string;
  story: React.ReactNode;
  links: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}

// --- Squad Data (Alphabetical Order) ---
const squadData: SquadMember[] = [
  {
    name: "Chaymae Qaddouri",
    role: "Football Freestyler",
    heritage: "Moroccan",
    flags: ["🇲🇦"],
    location: "Houston, Texas",
    image: "/Chaymae Qaddouri.jpeg",
    gifImage: "/Chaymae Qaddouri.gif",
    story: "Fusing Moroccan football heritage with absolute technical precision. Chaymae's flow is unmatched, redefining what ball control looks like on the concrete.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/c.qaddouri", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@chaymaeqaddouri?_r=1&_t=ZP-96YGPralUgJ", icon: <TikTokIcon /> },
      { name: "Collabs", url: "mailto:chaimaequa@gmail.com", icon: <EmailIcon /> },
    ]
  },
  {
    name: "Chuy Navarro",
    role: "Football Freestyler",
    heritage: "Mexican • American",
    flags: ["🇲🇽", "🇺🇸"],
    location: "Houston, Texas",
    image: "/Chuy.jpeg",
    gifImage: "/Chuy.gif",
    story: "Mexican-American street legend in the making. Chuy brings aggressive, high-energy tricks that hype the crowd and leave defenders lost.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/streetchuy", icon: <InstagramIcon /> },
    ]
  },
  {
    name: "Joseph Diaz",
    role: "Football Freestyler",
    heritage: "Colombian • American",
    flags: ["🇨🇴", "🇺🇸"],
    imageClass: "scale-[1.15] sm:scale-[1.25] md:scale-[1.35] origin-[50%_20%] object-[50%_20%]",
    location: "Houston, Texas",
    image: "/Joseph.jpg",
    gifImage: "/Joseph.gif",
    story: "Bringing pure Colombian flair mixed with American hustle. Joseph hits combos that shouldn't be possible, turning the street into his personal stage.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/freestyle_jrd", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@freestyle_jrd", icon: <TikTokIcon /> },
      { name: "Letterboxd", url: "https://letterboxd.com/freestyle_jrd/", icon: <LetterboxdIcon /> },
      { name: "Email", url: "mailto:joecr768@gmail.com", icon: <EmailIcon /> },
      { name: "Linktree", url: "https://linktr.ee/freestyle_jrd", icon: <LinkIcon /> },
    ]
  },
  {
    name: "Yami",
    role: "Football Freestyler",
    heritage: "Street Talent",
    flags: [],
    location: "Houston, Texas",
    image: "/Yami.jpg", 
    story: "Bringing unique rhythm and unmatched energy to the crew. Yami's style is all about expressing freedom through every movement on the pitch.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/groovyami?igsh=MXg2emphOHlzbjdxdQ==", icon: <InstagramIcon /> },
    ]
  },
  {
    name: "Zein زین Khitamy",
    role: "Football Freestyler",
    heritage: "Kenyan",
    flags: ["🇰🇪"],
    location: "Houston, Texas",
    image: "/Zein.jpg",
    gifImage: "/Zein.gif",
    story: "A master of flow and creative transitions. Zein brings an international freestyle flavor to the streets, pushing the boundaries of what's possible with a football.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/zeinkhitamy?igsh=MmRlY3UzYWdtejFz", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@zein.khitamy?_r=1&_t=ZP-96YG9S8jBGx", icon: <TikTokIcon /> },
    ]
  },
  {
    name: "Zohair Ali",
    role: "Football Freestyler",
    heritage: "Street Talent",
    flags: [],
    location: "Houston, Texas",
    image: "/Zo.jpg",
    gifImage: "/Zo.gif",
    story: (
      <>
        Zohair Ali is a street soccer player and content creator who brings energy, skill, and passion to every video. His content shows more than soccer. It inspires young athletes to believe in themselves, work hard, and build their own path. With 75K+ followers, millions of views, and big brand partners like <a href="https://www.nike.com" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-white hover:text-accent font-semibold underline decoration-accent/50 underline-offset-2 transition-colors">Nike</a> and <a href="https://www.adidas.com" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-white hover:text-accent font-semibold underline decoration-accent/50 underline-offset-2 transition-colors">Adidas</a>, Zohair is growing a strong community around soccer, culture, and creativity.
      </>
    ),
    links: [
      { name: "Instagram", url: "https://www.instagram.com/zostyler", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@zostyler?_r=1&_t=ZP-972sk7kVEkw", icon: <TikTokIcon /> },
      { name: "Email", url: "mailto:Zostyler.n02@gmail.com", icon: <EmailIcon /> },
    ]
  }
];

// --- Gallery Image Pool ---
const initialGalleryImages = [
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14871.jpg",
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14863.jpg",
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14853.jpg",
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14822.jpg",
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14761.jpg",
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14501.jpg",
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14544.jpg",
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14562.jpg",
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14623.jpg",
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14664.jpg",
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14716.jpg",
  "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14705.jpg",
];

// ==========================================
// BACKGROUND COMPONENT: WARM FREESTYLE PITCH
// ==========================================
function TacticalPitchBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0b0c] overflow-hidden">
      
      {/* Massive Soft Yellow Spotlights */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(circle,rgba(255,230,0,0.08)_0%,rgba(255,230,0,0)_60%)] blur-[80px]" />
      <div className="absolute top-[40%] right-[-20%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,230,0,0.04)_0%,rgba(255,230,0,0)_70%)] blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(255,230,0,0.05)_0%,rgba(255,230,0,0)_70%)] blur-[100px]" />
      
      {/* Street Concrete Dot Texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#FFE600_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Dynamic Diagonal Accents */}
      <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent rotate-[15deg] transform origin-top" />
      <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-accent/5 to-transparent -rotate-[25deg] transform origin-top" />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#0a0b0c] to-transparent" />
    </div>
  );
}


export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-[100svh] bg-[#0a0b0c] text-text overflow-x-hidden selection:bg-accent selection:text-black">
      
      <TacticalPitchBackground />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div
        className={`relative z-10 transition-opacity duration-700 ease-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <Hero />
        <SquadSection />
        <EventsSection />
        <GallerySection />
      </div>
    </main>
  );
}

// ==========================================
// 1. LOADING SCREEN 
// ==========================================
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const words = ["Skill", "Street", "Passion"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setWordIndex((prev) => (prev + 1) % words.length), 733);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) requestAnimationFrame(step);
      else setTimeout(onComplete, 150);
    };
    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#0a0b0c] flex flex-col justify-between"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#FFE600_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      <div className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-accent uppercase tracking-[0.3em] font-bold">
        Tekkrew
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={wordIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="text-4xl md:text-6xl lg:text-7xl font-display italic text-white absolute drop-shadow-[0_0_15px_rgba(255,230,0,0.5)]">
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-display text-white tabular-nums leading-none">
        {count.toString().padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/10 origin-left">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.2, ease: "linear" }} className="w-full h-full bg-accent origin-left shadow-[0_0_20px_rgba(255,230,0,0.8)]" />
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
      <nav className={`inline-flex items-center rounded-full backdrop-blur-md border border-accent/20 bg-[#111]/90 px-1.5 py-1.5 md:px-2 md:py-2 transition-shadow duration-300 max-w-full overflow-x-auto no-scrollbar ${scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.8)]" : ""}`}>
        
        <div className="group relative w-8 h-8 md:w-9 md:h-9 rounded-full p-[2px] bg-gradient-to-br from-accent to-[#ccb800] cursor-pointer flex-shrink-0 shadow-[0_0_10px_rgba(255,230,0,0.3)]">
          <div className="w-full h-full bg-black rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 relative">
            <Image src="/Tekkrew.jpg" alt="Tekkrew Logo" fill sizes="40px" priority className="object-cover" />
          </div>
        </div>

        <div className="hidden sm:block w-px h-5 bg-white/20 mx-2 md:mx-3" />

        <div className="flex items-center gap-0.5 sm:gap-2 px-1 md:px-2">
          {["Home", "Crew", "Media"].map((link, i) => (
            <button
              key={link}
              onClick={() => {
                if (link === "Crew") document.getElementById("crew")?.scrollIntoView({ behavior: "smooth" });
                if (link === "Media") document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
                if (link === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-[11px] sm:text-xs md:text-sm rounded-full px-3 sm:px-5 py-1.5 sm:py-2 transition-all font-bold whitespace-nowrap ${i === 0 ? "text-black bg-accent shadow-[0_0_15px_rgba(255,230,0,0.4)]" : "text-white/70 hover:text-accent hover:bg-white/5"}`}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="w-px h-4 md:h-5 bg-white/20 mx-1.5 md:mx-3" />

        <div className="flex items-center gap-1 md:gap-2">
          <a
            href="https://www.instagram.com/tekkrew_/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-[11px] sm:text-xs md:text-sm font-bold text-white bg-white/5 border border-white/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 flex items-center justify-center transition-all hover:bg-accent hover:text-black hover:border-accent hover:shadow-[0_0_15px_rgba(255,230,0,0.5)] whitespace-nowrap"
          >
            Contact <ArrowUpRightIcon />
          </a>
        </div>
      </nav>
    </div>
  );
}

// ==========================================
// 3. HERO (Dynamic Expressive Layout)
// ==========================================
function Hero() {
  const roles = ["Freestylers", "Creators", "Ballers", "Champions"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((prev) => (prev + 1) % roles.length), 2000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center w-full overflow-hidden">
      
      {/* Massive Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
         <h1 className="text-[15rem] md:text-[25rem] lg:text-[35rem] font-display italic font-black text-transparent outline-text whitespace-nowrap" style={{ WebkitTextStroke: '2px #FFE600' }}>TEKKREW</h1>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full pt-10">
        
        {/* Tactical Pre-header Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 mb-6 md:mb-10 backdrop-blur-md shadow-[0_0_25px_rgba(255,230,0,0.2)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_5px_rgba(255,230,0,1)]" />
          <span className="text-[10px] md:text-xs text-accent uppercase tracking-[0.25em] font-black">Target: World Cup '26</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-display italic font-black leading-[0.85] tracking-tight text-white mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        >
          Tekkrew
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 font-bold tracking-wide drop-shadow-md"
        >
          A squad of{" "}
          <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#fff170] drop-shadow-[0_0_15px_rgba(255,230,0,0.4)] inline-block px-1 min-w-[120px] md:min-w-[180px]">
            {roles[roleIndex]}
          </span>{" "}
          taking over the pitch.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed max-w-2xl mb-12 border-l-4 border-accent pl-5 md:pl-6 text-left mx-auto backdrop-blur-md bg-white/5 py-3 pr-4 rounded-r-xl shadow-lg"
        >
          Born on the concrete, headed for the global stage. We built Tekkrew to elevate the beautiful game with raw street style. As the world turns its eyes to North America for World Cup '26, we are bringing gravity-defying freestyle to the masses—and we are just getting started.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          <button onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })} className="relative bg-accent text-black text-xs md:text-sm rounded-full px-8 py-4 font-black uppercase tracking-widest transition-all hover:scale-105 hover:bg-[#fff170] shadow-[0_0_25px_rgba(255,230,0,0.4)] w-full sm:w-auto">
            View Features
          </button>
          <button onClick={() => document.getElementById("crew")?.scrollIntoView({ behavior: "smooth" })} className="relative bg-black/60 backdrop-blur-sm text-white text-xs md:text-sm rounded-full px-8 py-4 border-2 border-white/20 font-bold uppercase tracking-widest transition-all hover:scale-105 hover:bg-white/10 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(255,230,0,0.2)] w-full sm:w-auto">
            Meet the Squad
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 z-10 flex flex-col items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[9px] md:text-[10px] text-accent uppercase tracking-[0.3em] font-black">Scroll Down</span>
        <div className="w-px h-10 md:h-14 bg-white/20 relative overflow-hidden">
          <div className="w-full h-full bg-accent animate-scroll-dot rounded-full absolute top-0 shadow-[0_0_10px_rgba(255,230,0,1)]" />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. SQUAD SECTION (FUT-Inspired Player Cards)
// ==========================================
function SquadSection() {
  const [activeGifIndex, setActiveGifIndex] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const handleTouchStart = () => {
      setIsTouchDevice(true);
      window.removeEventListener("touchstart", handleTouchStart);
    };
    window.addEventListener("touchstart", handleTouchStart);
    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, []);

  const handleCardEnter = (index: number) => {
    if (!isTouchDevice) setActiveGifIndex(index);
  };

  const handleCardLeave = () => {
    if (!isTouchDevice) setActiveGifIndex(null);
  };

  const handleCardClick = (index: number) => {
    if (isTouchDevice) {
      setActiveGifIndex((current) => (current === index ? null : index));
    }
  };

  return (
    <section id="crew" className="relative w-full py-20 md:py-32 px-4 md:px-6 z-10">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display italic font-black text-white mb-2 drop-shadow-md">The Tekkrew</h2>
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-[2px] bg-accent" />
              <p className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] font-black">Elite Roster</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {squadData.map((member, index) => {
            const isActive = activeGifIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => handleCardEnter(index)}
                onMouseLeave={handleCardLeave}
                onClick={() => handleCardClick(index)}
                className="relative bg-[#111] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-3 hover:border-accent hover:shadow-[0_20px_50px_rgba(255,230,0,0.15)] group flex flex-col cursor-pointer"
              >
                {/* Yellow Corner Accent */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-accent rounded-tl-[1.8rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-0" />

                {/* TOP HALF: Large Player Image */}
                <div className="relative w-full h-[320px] md:h-[380px] overflow-hidden bg-[#050505] z-0 border-b border-white/5">
                  <div className="w-full h-full relative transition-transform duration-1000 group-hover:scale-105">
                    
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={`object-cover transition-opacity duration-700 ease-in-out ${member.imageClass || "object-top"} ${
                        isActive && member.gifImage ? "opacity-0" : "opacity-100"
                      }`}
                    />

                    {member.gifImage && (
                      <Image
                        src={member.gifImage}
                        alt={`${member.name} Animated`}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={`object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${member.imageClass || "object-top"} ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-5 right-5 bg-black/80 backdrop-blur-md border border-accent/30 text-[9px] md:text-[10px] uppercase tracking-widest text-accent font-bold px-4 py-2 rounded-full pointer-events-none shadow-[0_0_15px_rgba(255,230,0,0.1)]">
                    {member.location}
                  </div>
                </div>
                
                {/* BOTTOM HALF: Info */}
                <div className="relative z-10 flex flex-col flex-1 p-8 pt-0 -mt-16 text-center items-center pointer-events-none">
                  
                  <h3 className="text-3xl md:text-4xl font-display italic font-black text-white drop-shadow-lg mb-2">{member.name}</h3>
                  <div className="w-16 h-[3px] bg-accent mb-3 rounded-full shadow-[0_0_10px_rgba(255,230,0,0.5)]" />
                  <p className="text-[10px] md:text-xs font-black text-white/70 uppercase tracking-[0.2em] mb-6">{member.role}</p>

                  {/* BOLD RECTANGULAR FLAG BADGES */}
                  {member.flags && member.flags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                      {member.flags.map((flag, idx) => (
                        <div 
                          key={idx} 
                          className="w-14 h-9 rounded-md border border-white/20 bg-black shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center justify-center text-3xl leading-none transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-[0_4px_15px_rgba(255,230,0,0.3)] backdrop-blur-sm"
                        >
                          {flag}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/60 bg-[#1a1a1a] px-4 py-2 rounded-full border border-white/10 shadow-inner">
                      {member.heritage}
                    </span>
                  </div>
                  
                  <div className="text-white/70 text-xs md:text-sm leading-relaxed mb-8 font-medium flex-1 pointer-events-auto px-2">
                    {member.story}
                  </div>

                  {/* Social Links Row */}
                  <div className="mt-auto flex flex-wrap items-center justify-center gap-4 pt-6 w-full border-t border-white/10 pointer-events-auto">
                    {member.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-11 h-11 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:bg-accent hover:border-accent transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(255,230,0,0.4)]"
                        title={link.name}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. MEDIA & FEATURES SECTION (Premium Broadcast Layout)
// ==========================================
function EventsSection() {
  return (
    <section id="events" className="relative w-full py-20 md:py-32 px-4 md:px-6">
      
      {/* Background Accent Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 md:space-y-24 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display italic font-black text-white mb-4 drop-shadow-lg">Media & Features</h2>
          <div className="inline-flex items-center gap-3">
             <div className="w-8 h-[2px] bg-accent" />
             <p className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] font-black">Press & Live Coverage</p>
             <div className="w-8 h-[2px] bg-accent" />
          </div>
        </div>

        {/* Feature 1: KHOU 11 (Left Text, Right Staggered Media) */}
        <div className="group relative w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-center p-8 md:p-12 rounded-[2.5rem] bg-[#111] border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-colors hover:border-accent/50">
           
           {/* Viewfinder Corners */}
           <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-accent rounded-tl-[2.3rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
           <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-accent rounded-br-[2.3rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
           
           {/* Glow Effect */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
           
           {/* Text Content */}
           <div className="flex-1 z-10 w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/10 text-accent text-[10px] font-black tracking-[0.25em] uppercase mb-8 shadow-[0_0_15px_rgba(255,230,0,0.15)]">
                 <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(255,230,0,0.8)]" />
                 Broadcast Feature
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-tight italic drop-shadow-lg">KHOU 11 Network</h2>
              
              <div className="border-l-4 border-accent pl-6 mb-8 py-2 bg-gradient-to-r from-accent/5 to-transparent pr-4 rounded-r-lg">
                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 font-medium">
                  Houston’s TekKrew was featured by KHOU 11 discussing the excitement around the World Cup festivities and how freestyle soccer brings people together in Houston.
                </p>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                  Thank you <a href="https://www.instagram.com/troyklesstv" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 underline-offset-4">@troyklesstv</a> on Instagram for interviewing us and giving TekKrew the opportunity to share our passion for freestyle soccer and the World Cup festivities in Houston.
                </p>
              </div>
           </div>
           
           {/* Media Content (Staggered Vertical Videos) */}
           <div className="w-full lg:w-1/2 flex flex-row items-center justify-center gap-4 sm:gap-6 relative z-10">
              <div className="relative w-1/2 max-w-[240px] sm:max-w-[280px] aspect-[9/16] z-10 shadow-[0_10px_30px_rgba(255,230,0,0.15)] border border-accent/50 rounded-[1.5rem] bg-black p-1">
                <video controls playsInline preload="metadata" poster="/houston-interview-2-thumbnail.jpg" className="aspect-[9/16] h-full w-full rounded-[1.3rem] bg-black object-contain" src="/Houston Interview 2.mp4" />
              </div>
              {/* Offset second video for masonry/collage feel */}
              <div className="relative w-1/2 max-w-[240px] sm:max-w-[280px] aspect-[9/16] z-0 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/20 rounded-[1.5rem] bg-black p-1 translate-y-6 sm:translate-y-12">
                <video controls playsInline preload="metadata" poster="/houston-interview-thumbnail.jpg" className="aspect-[9/16] h-full w-full rounded-[1.3rem] bg-black object-contain" src="/Houston Interview.mp4" />
              </div>
           </div>
        </div>

        {/* Feature 2: Telemundo (Right Text, Left Media) */}
        <div className="group relative w-full flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-center p-8 md:p-12 rounded-[2.5rem] bg-[#111] border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-colors hover:border-accent/50">
           
           <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-accent rounded-tr-[2.3rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-accent rounded-bl-[2.3rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
           
           <div className="flex-1 z-10 w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/40 bg-red-500/10 text-white text-[10px] font-black tracking-[0.25em] uppercase mb-8 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                 <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                 Live Coverage
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-tight italic drop-shadow-lg">Telemundo Countdown</h2>
              
              <div className="border-l-4 border-white/30 pl-6 mb-8 py-2 bg-gradient-to-r from-white/5 to-transparent pr-4 rounded-r-lg group-hover:border-accent transition-colors">
                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 font-medium">
                  From the streets of Alief to Cypress, Katy, and across the city, we are incredibly proud to represent the hustle and heart of the 713. Freestyle and streetstyle are the art forms we love to express, and we couldn't be more hyped to showcase our craft throughout the World Cup in the best city in Texas.
                </p>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                  A massive thank you to <a href="https://www.instagram.com/sergguerrero?igsh=MTdoN3o4cjd5ZThpag==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 underline-offset-4">@sergguerrero</a> and <a href="https://www.instagram.com/ubmartinez?igsh=NDhmYmVibTVyYW9m" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 underline-offset-4">@ubmartinez</a> for sharing our passion with the Latin community on <a href="https://www.instagram.com/telemundohou?igsh=b2xsd2ZiemU0c2dk" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 underline-offset-4">@telemundohou</a>. ¡Listos para el Mundial!
                </p>
              </div>
           </div>
           
           <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10">
              <div className="relative p-1 rounded-[1.5rem] bg-gradient-to-br from-white/20 via-white/5 to-transparent w-full shadow-[0_15px_30px_rgba(0,0,0,0.8)] border border-white/10 group-hover:border-accent/50 transition-colors duration-500">
                <video controls playsInline preload="metadata" poster="/telemundo-thumbnail.jpg" className="aspect-video h-full w-full rounded-[1.4rem] bg-black object-contain" src="/Telemundo Interview.mp4" />
              </div>
           </div>
        </div>

        {/* Feature 3: Stella Artois (Left Text, Right Media) */}
        <div className="group relative w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-center p-8 md:p-12 rounded-[2.5rem] bg-[#111] border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-colors hover:border-accent/50">
           
           <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-accent rounded-tl-[2.3rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
           <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-accent rounded-br-[2.3rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
           
           <div className="flex-1 z-10 w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white text-[10px] font-black tracking-[0.25em] uppercase mb-8 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                 <i className="fa-solid fa-star text-[10px] text-accent"></i>
                 VIP Event
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-tight italic drop-shadow-lg">FIFA x Stella Artois</h2>
              
              <div className="border-l-4 border-white/30 pl-6 mb-8 py-2 bg-gradient-to-r from-white/5 to-transparent pr-4 rounded-r-lg group-hover:border-accent transition-colors">
                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 font-medium">
                  This event was truly unforgettable. A huge thank you to everyone who showed such kindness and support—it gives me so much extra motivation to keep elevating my game. I love seeing freestyle appreciated by everyone, and it's amazing to know that the craft is admired regardless of the style.
                </p>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                  Shoutout to <a href="https://www.instagram.com/elgrandynamo" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 underline-offset-4">@elgrandynamo</a> for tagging along. Y también muchísimas gracias a <a href="https://www.instagram.com/allthingsmarlon" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 underline-offset-4">@allthingsmarlon</a> por estar atento de mí. I'm telling y'all, this year is about to go crazy.
                </p>
              </div>
           </div>
           
           <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10">
              <div className="relative p-1 rounded-[1.5rem] bg-gradient-to-br from-white/20 via-white/5 to-transparent w-full max-w-[300px] sm:max-w-sm shadow-[0_15px_30px_rgba(0,0,0,0.8)] border border-white/10 group-hover:border-accent/50 transition-colors duration-500">
                <video controls playsInline preload="metadata" poster="/fifa-stella-thumbnail.jpg" className="aspect-[9/16] h-full w-full rounded-[1.4rem] bg-black object-contain" src="/FIFA x Stella Artois Event.mp4" />
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 6. GALLERY SECTION 
// ==========================================
function GallerySection() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setImages(initialGalleryImages);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <section id="gallery" className="relative w-full py-20 md:py-32 px-4 md:px-6 border-t border-white/10 bg-[#0a0b0c]">
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out backdrop-blur-md"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-accent hover:text-black text-white rounded-full flex items-center justify-center transition-all z-50 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(255,230,0,0.5)]"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div
              className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged Freestyle Image"
                fill
                sizes="100vw"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 md:mb-20 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display italic font-black text-white mb-4 drop-shadow-md">Freestylers</h2>
          <div className="inline-flex items-center gap-3">
             <div className="w-6 h-[2px] bg-accent" />
             <p className="text-accent text-xs md:text-sm uppercase tracking-[0.3em] font-black">HOU — 4.24.26</p>
             <div className="w-6 h-[2px] bg-accent" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(src)}
              className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#111] border border-white/10 group cursor-pointer block text-left shadow-lg hover:border-accent/50 hover:shadow-[0_10px_30px_rgba(255,230,0,0.15)] transition-all duration-300"
              aria-label={`View photo ${index + 1}`}
            >
              <Image
                src={src}
                alt={`Freestyle event moment ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border border-accent bg-black/50 backdrop-blur-md flex items-center justify-center text-accent transform scale-50 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_15px_rgba(255,230,0,0.5)]">
                  <ArrowUpRightIcon />
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
           <a
              href="https://www.instagram.com/tekkrew_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#111] text-white/80 text-xs md:text-sm rounded-full px-8 py-4 font-bold uppercase tracking-wider border border-white/20 transition-all hover:bg-accent hover:text-black hover:border-accent hover:shadow-[0_0_20px_rgba(255,230,0,0.4)] shadow-xl"
            >
              See More on Instagram <ArrowUpRightIcon />
            </a>
        </div>
      </div>
    </section>
  );
}