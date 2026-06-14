"use client";

import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ==========================================
// 1. ICONS & SVG ASSETS
// ==========================================
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

// ==========================================
// 2. TYPES & DATA STRUCTURES
// ==========================================
interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface SquadMember {
  name: string;
  role: string;
  heritage: string;
  flags: string[];
  location: string;
  image: string;
  videoFile?: string;
  imageClass?: string;
  story: React.ReactNode;
  links: SocialLink[];
}

interface MediaVideo {
  src: string;
  poster: string;
  aspect: string;
  maxWidth: string;
  offset?: boolean;
}

interface MediaFeature {
  id: string;
  tag: string;
  tagIconClass?: string;
  title: string;
  desc1: React.ReactNode;
  desc2: React.ReactNode;
  videos: MediaVideo[];
  reverse?: boolean;
}

// --- Squad Data ---
const squadData: SquadMember[] = [
  {
    name: "Chaymae Qaddouri",
    role: "Football Freestyler",
    heritage: "Moroccan",
    flags: ["🇲🇦"],
    location: "Houston, Texas",
    image: "/Chaymae Qaddouri.jpeg",
    videoFile: "/Chaymae Qaddouri.mp4",
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
    videoFile: "/Chuy.mp4",
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
    videoFile: "/Joseph.mp4",
    story: "Bringing pure Colombian flair mixed with American hustle. Joseph hits combos that shouldn't be possible, turning the street into his personal stage.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/freestyle_jrd", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@freestyle_jrd", icon: <TikTokIcon /> },
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
    videoFile: "/Zein.mp4",
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
    videoFile: "/Zo.mp4",
    story: (
      <>
        Zohair Ali is a street soccer player and content creator who brings energy, skill, and passion to every video. His content shows more than soccer. It inspires young athletes to believe in themselves, work hard, and build their own path. With 75K+ followers, millions of views, and big brand partners like <a href="https://www.nike.com" target="_blank" rel="noopener noreferrer" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} className="text-white hover:text-accent font-bold transition-colors underline decoration-accent/50 underline-offset-2">Nike</a> and <a href="https://www.adidas.com" target="_blank" rel="noopener noreferrer" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} className="text-white hover:text-accent font-bold transition-colors underline decoration-accent/50 underline-offset-2">Adidas</a>, Zohair is growing a strong community around soccer, culture, and creativity.
      </>
    ),
    links: [
      { name: "Instagram", url: "https://www.instagram.com/zostyler", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@zostyler?_r=1&_t=ZP-972sk7kVEkw", icon: <TikTokIcon /> },
      { name: "Email", url: "mailto:Zostyler.n02@gmail.com", icon: <EmailIcon /> },
    ]
  }
];

const mediaData: MediaFeature[] = [
  {
    id: "khou",
    tag: "Broadcast Feature",
    tagIconClass: "bg-accent shadow-[0_0_8px_rgba(255,230,0,0.8)]",
    title: "KHOU 11 Network",
    desc1: "Houston’s TekKrew was featured by KHOU 11 discussing the excitement around the World Cup festivities and how freestyle soccer brings people together in Houston.",
    desc2: (
      <>
        Thank you <a href="https://www.instagram.com/troyklesstv" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@troyklesstv</a> on Instagram for interviewing us and giving TekKrew the opportunity to share our passion for freestyle soccer and the World Cup festivities in Houston.
      </>
    ),
    videos: [
      { src: "/Houston Interview 2.mp4", poster: "/houston-interview-2-thumbnail.jpg", aspect: "aspect-[9/16]", maxWidth: "max-w-[280px]" },
      { src: "/Houston Interview.mp4", poster: "/houston-interview-thumbnail.jpg", aspect: "aspect-[9/16]", maxWidth: "max-w-[280px]", offset: true }
    ],
    reverse: false
  },
  {
    id: "telemundo",
    tag: "Live Coverage",
    tagIconClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    title: "Telemundo Countdown",
    desc1: "From the streets of Alief to Cypress, Katy, and across the city, we are incredibly proud to represent the hustle and heart of the 713. Freestyle and streetstyle are the art forms we love to express, and we couldn't be more hyped to showcase our craft throughout the World Cup in the best city in Texas.",
    desc2: (
      <>
        A massive thank you to <a href="https://www.instagram.com/sergguerrero?igsh=MTdoN3o4cjd5ZThpag==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@sergguerrero</a> and <a href="https://www.instagram.com/ubmartinez?igsh=NDhmYmVibTVyYW9m" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@ubmartinez</a> for sharing our passion with the Latin community on <a href="https://www.instagram.com/telemundohou?igsh=b2xsd2ZiemU0c2dk" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@telemundohou</a>. ¡Listos para el Mundial!
      </>
    ),
    videos: [
      { src: "/Telemundo Interview.mp4", poster: "/telemundo-thumbnail.jpg", aspect: "aspect-video", maxWidth: "max-w-3xl" }
    ],
    reverse: true
  },
  {
    id: "stella",
    tag: "VIP Event",
    tagIconClass: "bg-accent shadow-[0_0_10px_rgba(255,230,0,0.8)]",
    title: "FIFA x Stella Artois",
    desc1: "This event was truly unforgettable. A huge thank you to everyone who showed such kindness and support—it gives me so much extra motivation to keep elevating my game. I love seeing freestyle appreciated by everyone, and it's amazing to know that the craft is admired regardless of the style.",
    desc2: (
      <>
        Shoutout to <a href="https://www.instagram.com/elgrandynamo" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@elgrandynamo</a> for tagging along. Y también muchísimas gracias a <a href="https://www.instagram.com/allthingsmarlon" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@allthingsmarlon</a> por estar atento de mí. I'm telling y'all, this year is about to go crazy.
      </>
    ),
    videos: [
      { src: "/FIFA x Stella Artois Event.mp4", poster: "/fifa-stella-thumbnail.jpg", aspect: "aspect-[9/16]", maxWidth: "max-w-[300px]" }
    ],
    reverse: false
  }
];

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
// 3. MAIN PAGE LAYOUT
// ==========================================
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-[100svh] bg-[#08090a] text-text overflow-x-hidden selection:bg-accent selection:text-black font-body">
      <BackgroundElements />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`relative z-10 transition-opacity duration-700 ease-out ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        <Hero />
        <SquadSection />
        <MediaSection />
        <GallerySection />
      </div>
    </main>
  );
}

// ==========================================
// 4. BACKGROUND & LOADER
// ==========================================
function BackgroundElements() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#08090a] overflow-hidden">
      {/* Mobile-optimized spot lights */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] md:w-[900px] h-[400px] md:h-[700px] bg-[radial-gradient(circle,rgba(255,230,0,0.08)_0%,rgba(255,230,0,0)_60%)] blur-[60px] md:blur-[100px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] md:w-[700px] h-[500px] md:h-[900px] bg-[radial-gradient(circle,rgba(255,230,0,0.04)_0%,rgba(255,230,0,0)_70%)] blur-[80px] md:blur-[120px]" />
      
      {/* Premium Tactical Pitch SVG Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="netMesh" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#FFE600" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#netMesh)" />
        <circle cx="50%" cy="50%" r="350" fill="none" stroke="#FFE600" strokeWidth="1.5" strokeDasharray="8 16" opacity="0.5" />
        <circle cx="50%" cy="50%" r="6" fill="#FFE600" opacity="0.9" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#ffffff" strokeWidth="1" opacity="0.15" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#FFE600" strokeWidth="1.5" strokeDasharray="8 16" opacity="0.3" />
        <path d="M-100 200 Q 400 300 500 700 T 1300 600" fill="none" stroke="#FFE600" strokeWidth="3" opacity="0.5" strokeDasharray="4 12" />
        <path d="M-50 800 Q 600 700 800 200 T 1500 100" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.2" />
      </svg>
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#08090a] to-transparent" />
    </div>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const words = ["Skill", "Street", "Passion"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setWordIndex((prev) => (prev + 1) % words.length), 200);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    let start: number | null = null;
    const duration = 600; // Drastically shortened load screen for mobile performance
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) requestAnimationFrame(step);
      else setTimeout(onComplete, 100);
    };
    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#08090a] flex flex-col justify-between"
    >
      <div className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-accent uppercase tracking-[0.3em] font-bold">
        Tekkrew
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={wordIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="text-4xl md:text-6xl lg:text-7xl font-display italic text-white absolute drop-shadow-[0_0_20px_rgba(255,230,0,0.4)]">
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-display text-white tabular-nums leading-none opacity-90 drop-shadow-md">
        {count.toString().padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/5 origin-left">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, ease: "linear" }} className="w-full h-full bg-accent origin-left shadow-[0_0_20px_rgba(255,230,0,0.8)]" />
      </div>
    </motion.div>
  );
}

// ==========================================
// 5. NAVBAR 
// ==========================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <nav className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-accent/20 bg-[#111214]/90 px-1.5 py-1.5 md:px-2 md:py-2 transition-all duration-300 max-w-full overflow-x-auto no-scrollbar ${scrolled ? "shadow-lg md:shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-accent/50" : ""}`}>
        
        <div className="group relative w-8 h-8 md:w-9 md:h-9 rounded-full p-[2px] bg-gradient-to-br from-accent to-[#ccb800] cursor-pointer flex-shrink-0 hover:shadow-[0_0_15px_rgba(255,230,0,0.6)] transition-all duration-300">
          <div className="w-full h-full bg-black rounded-full overflow-hidden flex items-center justify-center relative">
            <Image src="/Tekkrew.jpg" alt="Tekkrew Logo" fill sizes="40px" priority className="object-cover" />
          </div>
        </div>
        <div className="hidden sm:block w-px h-5 bg-white/10 mx-2 md:mx-3" />
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
        <div className="w-px h-4 md:h-5 bg-white/10 mx-1.5 md:mx-3" />
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
// 6. HERO SECTION
// ==========================================
function Hero() {
  const roles = ["Freestylers", "Creators", "Ballers", "Champions"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((prev) => (prev + 1) % roles.length), 2000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative min-h-[100svh] flex flex-col w-full overflow-hidden pt-24 pb-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-black/60 mb-6 md:mb-10 backdrop-blur-md shadow-[0_0_15px_rgba(255,230,0,0.2)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(255,230,0,1)]" />
          <span className="text-[10px] md:text-xs text-accent uppercase tracking-[0.25em] font-bold">Target: World Cup '26</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-display italic font-black leading-[0.85] tracking-tight text-white mb-6 drop-shadow-[0_0_35px_rgba(255,230,0,0.15)]"
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
          className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed max-w-2xl mb-12 border-l-4 border-accent pl-5 md:pl-6 text-left mx-auto backdrop-blur-md bg-[#111214]/80 py-4 pr-4 rounded-r-xl shadow-lg md:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          Born on the concrete, headed for the global stage. We built Tekkrew to elevate the beautiful game with raw street style. As the world turns its eyes to North America for World Cup '26, we are bringing gravity-defying freestyle to the masses—and we are just getting started.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          <button onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })} className="relative bg-accent text-black text-xs md:text-sm rounded-full px-8 py-4 font-black uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,230,0,0.2)] w-full sm:w-auto">
            Media Showcase
          </button>
          <button onClick={() => document.getElementById("crew")?.scrollIntoView({ behavior: "smooth" })} className="relative bg-black/60 backdrop-blur-sm text-white text-xs md:text-sm rounded-full px-8 py-4 border border-accent/40 font-bold uppercase tracking-widest transition-all hover:scale-105 hover:bg-white/10 hover:border-accent hover:shadow-[0_0_15px_rgba(255,230,0,0.2)] w-full sm:w-auto">
            Meet the Squad
          </button>
        </motion.div>
      </div>

      <div className="mt-auto z-10 flex flex-col items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[9px] md:text-[10px] text-accent uppercase tracking-[0.3em] font-bold">Scroll Down</span>
        <div className="w-px h-10 md:h-14 bg-white/20 relative overflow-hidden">
          <div className="w-full h-full bg-accent animate-scroll-dot rounded-full absolute top-0 shadow-[0_0_10px_rgba(255,230,0,1)]" />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. SQUAD SECTION & OPTIMIZED VIDEO CARDS
// ==========================================

interface SquadCardProps {
  member: SquadMember;
  isActive: boolean;
  onInteract: () => void;
  onLeave: () => void;
}

const SquadCard = memo(({ member, isActive, onInteract, onLeave }: SquadCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/Pause Video based strictly on isActive prop.
  // Using native HTML video controls eliminates React re-mounting lag.
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  // Robust Native Pointer Events
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") onInteract();
  };
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") onLeave();
  };
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") onInteract(); // Mobile tap
  };

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className={`relative bg-[#111214] rounded-[2rem] overflow-hidden border transition-all duration-300 group flex flex-col cursor-pointer ${
        isActive ? 'border-accent shadow-xl md:shadow-[0_15px_40px_rgba(255,230,0,0.15)] -translate-y-2' : 'border-white/10 shadow-lg md:shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:-translate-y-2 hover:border-accent/40 md:hover:shadow-[0_15px_40px_rgba(255,230,0,0.1)]'
      }`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent transition-opacity duration-500 z-20 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

      {/* TOP HALF: Player Image Container */}
      <div className="relative w-full h-[320px] md:h-[380px] overflow-hidden bg-[#111214] z-0 border-b border-white/5">
        <div className="w-full h-full relative transition-transform duration-1000 group-hover:scale-105 bg-black">
          
          {/* Base Static Image - ALWAYS MOUNTED. `loading="lazy"` makes page instant. */}
          <Image
            src={member.image}
            alt={member.name}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover ${member.imageClass || "object-top"}`}
          />

          {/* Optimized MP4 Video - Fades IN smoothly over the static image only when active */}
          {member.videoFile && (
            <video
              ref={videoRef}
              src={member.videoFile}
              preload="none"
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300 ${member.imageClass || "object-top"} ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-[#111214]/40 to-transparent pointer-events-none" />
        <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-md border border-accent/30 text-[9px] md:text-[10px] uppercase tracking-widest text-white/90 font-bold px-4 py-2 rounded-full pointer-events-none shadow-[0_0_10px_rgba(255,230,0,0.1)]">
          {member.location}
        </div>
      </div>
      
      {/* BOTTOM HALF: Info */}
      <div className="relative z-10 flex flex-col flex-1 p-8 pt-0 -mt-12 text-center items-center pointer-events-none">
        <h3 className="text-3xl md:text-4xl font-display italic font-black text-white drop-shadow-md mb-2">{member.name}</h3>
        <div className="w-12 h-[3px] bg-accent mb-3 rounded-full shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
        <p className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-[0.2em] mb-6">{member.role}</p>

        {/* FLAG BADGES */}
        {member.flags && member.flags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {member.flags.map((flag, idx) => (
              <div key={idx} className="w-14 h-9 rounded-md border border-white/20 bg-[#0a0a0a] shadow-[0_5px_15px_rgba(0,0,0,0.6)] flex items-center justify-center text-3xl leading-none transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-[0_5px_15px_rgba(255,230,0,0.3)]">
                {flag}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 border-b border-white/10 px-2 pb-1">
            {member.heritage}
          </span>
        </div>
        
        <div className="text-white/70 text-xs md:text-sm leading-relaxed mb-8 font-light flex-1 pointer-events-auto px-2">
          {member.story}
        </div>

        {/* Social Links Row (Stops propagation so clicks don't toggle the video on mobile) */}
        <div className="mt-auto flex flex-wrap items-center justify-center gap-4 pt-6 w-full border-t border-white/10 pointer-events-auto">
          {member.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={(e) => e.stopPropagation()} 
              onClick={(e) => e.stopPropagation()} 
              className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/60 hover:text-black hover:bg-accent hover:border-accent transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(255,230,0,0.4)]"
              title={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
SquadCard.displayName = "SquadCard";


function SquadSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleInteraction = useCallback((index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  }, []);

  const handleLeave = useCallback(() => setActiveIndex(null), []);

  return (
    <section id="crew" className="relative w-full py-16 md:py-32 px-4 md:px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display italic font-black text-white mb-3 drop-shadow-[0_0_25px_rgba(255,230,0,0.2)]">The Tekkrew</h2>
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-[2px] bg-accent/80 shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
              <p className="text-white/80 text-xs md:text-sm uppercase tracking-[0.3em] font-bold">Elite Roster</p>
              <div className="w-8 h-[2px] bg-accent/80 shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
            </div>
          </div>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" 
          onPointerLeave={(e) => { if (e.pointerType === "mouse") handleLeave(); }}
        >
          {squadData.map((member, index) => (
            <SquadCard 
              key={index} 
              member={member} 
              isActive={activeIndex === index} 
              onInteract={() => handleInteraction(index)} 
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. MEDIA SECTION & COMPONENTS
// ==========================================
function MediaCard({ feature }: { feature: MediaFeature }) {
  return (
    <div className={`group relative w-full flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center p-8 md:p-12 rounded-[2.5rem] bg-[#111214] border border-white/5 shadow-xl md:shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:border-accent/40 md:hover:shadow-[0_15px_50px_rgba(255,230,0,0.1)]`}>
       
       {/* Decorative Viewfinder Corners */}
       <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent/60 rounded-tl-[2.3rem] opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none md:shadow-[inset_2px_2px_10px_rgba(255,230,0,0.2)]" />
       <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent/60 rounded-br-[2.3rem] opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none md:shadow-[inset_-2px_-2px_10px_rgba(255,230,0,0.2)]" />
       
       {/* Text Content */}
       <div className="flex-1 z-10 w-full lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-[0_0_15px_rgba(255,230,0,0.1)]">
             <span className={`w-2 h-2 rounded-full ${feature.tagIconClass || "bg-accent"}`} />
             {feature.tag}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-tight italic drop-shadow-sm">{feature.title}</h2>
          
          <div className="border-l-4 border-accent/80 pl-5 mb-4 py-1">
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 font-light">
              {feature.desc1}
            </p>
            <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light">
              {feature.desc2}
            </p>
          </div>
       </div>
       
       {/* Media Content (Handles 1 or 2 videos with Masonry Stagger) */}
       <div className="w-full lg:w-1/2 flex flex-row items-center justify-center gap-4 sm:gap-6 relative z-10">
          {feature.videos.map((vid, i) => (
            <div 
              key={i} 
              className={`relative ${feature.videos.length > 1 ? 'w-1/2' : 'w-full'} ${vid.maxWidth} ${vid.aspect} z-10 shadow-lg md:shadow-[0_15px_30px_rgba(0,0,0,0.9)] border border-white/10 rounded-[1.5rem] bg-black p-1 transition-colors duration-500 group-hover:border-accent/60 ${vid.offset ? 'translate-y-6 sm:translate-y-12' : ''}`}
            >
              <video controls playsInline preload="none" poster={vid.poster} className={`${vid.aspect} h-full w-full rounded-[1.3rem] bg-black object-contain`} src={vid.src} />
            </div>
          ))}
       </div>
    </div>
  );
}

function MediaSection() {
  return (
    <section id="events" className="relative w-full py-16 md:py-32 px-4 md:px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 md:space-y-24 relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display italic font-black text-white mb-4 drop-shadow-[0_0_25px_rgba(255,230,0,0.2)]">Media Showcase</h2>
          <div className="inline-flex items-center gap-3">
             <div className="w-8 h-[2px] bg-accent/80 shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
             <p className="text-white/80 text-xs md:text-sm uppercase tracking-[0.3em] font-bold">Press & Features</p>
             <div className="w-8 h-[2px] bg-accent/80 shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
          </div>
        </div>

        {mediaData.map((feature, idx) => (
          <MediaCard key={idx} feature={feature} />
        ))}
      </div>
    </section>
  );
}

// ==========================================
// 9. GALLERY SECTION 
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
    <section id="gallery" className="relative w-full py-20 md:py-32 px-4 md:px-6 border-t border-accent/20 bg-[#08090a]">
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
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-accent hover:bg-white text-black rounded-full flex items-center justify-center transition-all z-50 cursor-pointer shadow-[0_0_15px_rgba(255,230,0,0.4)]"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div
              className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImage} alt="Enlarged Freestyle Image" fill sizes="100vw" className="object-contain drop-shadow-2xl" priority />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 md:mb-20 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display italic font-black text-white mb-4 drop-shadow-md">Freestylers</h2>
          <div className="inline-flex items-center gap-3">
             <div className="w-6 h-[2px] bg-accent/80 shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
             <p className="text-white/80 text-xs md:text-sm uppercase tracking-[0.3em] font-bold">HOU — 4.24.26</p>
             <div className="w-6 h-[2px] bg-accent/80 shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(src)}
              className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#111214] border border-white/10 group cursor-pointer block text-left shadow-lg hover:border-accent/40 md:hover:shadow-[0_10px_30px_rgba(255,230,0,0.2)] transition-all duration-300"
              aria-label={`View photo ${index + 1}`}
            >
              <Image
                src={src}
                alt={`Freestyle event moment ${index + 1}`}
                fill
                loading="lazy"
                quality={85}
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
              className="inline-flex items-center gap-3 bg-white text-black text-xs md:text-sm rounded-full px-8 py-4 font-bold uppercase tracking-wider transition-all hover:bg-accent hover:shadow-[0_0_20px_rgba(255,230,0,0.4)] shadow-xl"
            >
              See More on Instagram <ArrowUpRightIcon />
            </a>
        </div>
      </div>
    </section>
  );
}