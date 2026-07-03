"use client";

import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TextType from "../components/TextType";
import Grainient from "../components/Grainient";
import Masonry, { MasonryItem } from "../components/Masonry";
import Navbar from "../components/Navbar";

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
const LetterboxdIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="6" cy="12" r="3" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="18" cy="12" r="3" />
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
  /** hardcoded intrinsic pixel dimensions — the frame strictly respects this ratio */
  width: number;
  height: number;
}

interface MediaFeature {
  id: string;
  tag: string;
  dotClass: string;
  title: string;
  paragraphs: React.ReactNode[];
  videos: MediaVideo[];
  /** which side the media column sits on at desktop widths */
  mediaSide: "left" | "right";
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

// --- Media Features Data ---
// Event copy is locked verbatim. Video width/height are hardcoded intrinsic pixels.
const mediaData: MediaFeature[] = [
  {
    id: "khou",
    tag: "Live Coverage",
    dotClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    title: "KHOU 11 Network",
    paragraphs: [
      "Houston’s TekKrew was featured by KHOU 11 discussing the excitement around the World Cup festivities and how freestyle soccer brings people together in Houston.",
      <>
        Thank you <a href="https://www.instagram.com/troyklesstv" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@troyklesstv</a> on Instagram for interviewing us and giving TekKrew the opportunity to share our passion for freestyle soccer and the World Cup festivities in Houston.
      </>,
    ],
    videos: [
      { src: "/Houston Interview.mp4", poster: "/houston-interview-thumbnail.jpg", width: 720, height: 1280 },
      { src: "/Houston Interview 2.mp4", poster: "/houston-interview-2-thumbnail.jpg", width: 720, height: 1280 },
    ],
    mediaSide: "right",
  },
  {
    id: "telemundo",
    tag: "Live Coverage",
    dotClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    title: "Telemundo Countdown",
    paragraphs: [
      "From the streets of Alief to Cypress, Katy, and across the city, we are incredibly proud to represent the hustle and heart of the 713. Freestyle and streetstyle are the art forms we love to express, and we couldn't be more hyped to showcase our craft throughout the World Cup in the best city in Texas.",
      <>
        A massive thank you to <a href="https://www.instagram.com/sergguerrero?igsh=MTdoN3o4cjd5ZThpag==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@sergguerrero</a> and <a href="https://www.instagram.com/ubmartinez?igsh=NDhmYmVibTVyYW9m" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@ubmartinez</a> for sharing our passion with the Latin community on <a href="https://www.instagram.com/telemundohou?igsh=b2xsd2ZiemU0c2dk" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@telemundohou</a>. ¡Listos para el Mundial!
      </>,
    ],
    videos: [
      { src: "/Telemundo Interview.mp4", poster: "/telemundo-thumbnail.jpg", width: 1276, height: 718 },
    ],
    mediaSide: "left",
  },
  {
    id: "stella",
    tag: "VIP Event",
    dotClass: "bg-accent shadow-[0_0_10px_rgba(255,230,0,0.8)]",
    title: "FIFA x Stella Artois",
    paragraphs: [
      "This event was truly unforgettable. A huge thank you to everyone who showed such kindness and support—it gives me so much extra motivation to keep elevating my game. I love seeing freestyle appreciated by everyone, and it's amazing to know that the craft is admired regardless of the style.",
      <>
        Shoutout to <a href="https://www.instagram.com/elgrandynamo" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@elgrandynamo</a> for tagging along. Y también muchísimas gracias a <a href="https://www.instagram.com/allthingsmarlon" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-bold transition-colors underline decoration-white/20 hover:decoration-accent underline-offset-4">@allthingsmarlon</a> por estar atento de mí. I'm telling y'all, this year is about to go crazy.
      </>,
    ],
    videos: [
      { src: "/FIFA x Stella Artois Event.mp4", poster: "/fifa-stella-thumbnail.jpg", width: 720, height: 1280 },
    ],
    mediaSide: "right",
  },
];

// aspectRatio = height / width, taken from each photo's real pixel dimensions
// so Masonry tiles crop consistently instead of stretching at different column widths.
const initialGalleryImages: MasonryItem[] = [
  { id: "14871", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14871.jpg", aspectRatio: 0.705 },
  { id: "14863", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14863.jpg", aspectRatio: 1.396 },
  { id: "14853", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14853.jpg", aspectRatio: 1.327 },
  { id: "14822", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14822.jpg", aspectRatio: 1.500 },
  { id: "14761", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14761.jpg", aspectRatio: 1.443 },
  { id: "14501", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14501.jpg", aspectRatio: 0.674 },
  { id: "14544", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14544.jpg", aspectRatio: 1.495 },
  { id: "14562", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14562.jpg", aspectRatio: 0.657 },
  { id: "14623", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14623.jpg", aspectRatio: 1.332 },
  { id: "14664", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14664.jpg", aspectRatio: 0.667 },
  { id: "14716", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14716.jpg", aspectRatio: 1.417 },
  { id: "14705", img: "/Freestylers - HOU - 4.24.26/20260424_freestylers_RN_14705.jpg", aspectRatio: 1.417 },
];

// ==========================================
// 3. MAIN PAGE LAYOUT
// ==========================================
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const preloadRosterImages = () => {
      squadData.forEach((member) => {
        const img = new window.Image();
        img.src = member.image;
      });
    };
    preloadRosterImages();
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isLoading]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Add a slight delay before triggering the hero animation
    // so it starts exactly when the loading screen is fully out of view.
    window.setTimeout(() => {
      setHeroReady(true);
    }, 300);
  }, []);

  return (
    <main className="relative min-h-[100svh] bg-[#08090a] text-text overflow-x-hidden selection:bg-accent selection:text-black font-body">
      <BackgroundElements />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <div className="relative z-10 opacity-100">
        <Navbar />
        <Hero heroReady={heroReady} />
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
      {/* 🌟 The Main Grainient Background 🌟 */}
      <div className="absolute inset-0">
        <Grainient
          color1="#FFE600"
          color2="#1a1600"
          color3="#08090a"
          timeSpeed={0.22}
          colorBalance={-0.1}
          warpStrength={2.0}
          warpFrequency={4.0}
          warpSpeed={1.2}
          warpAmplitude={45.0}
          blendSoftness={0.16}
          rotationAmount={350.0}
          noiseScale={2.0}
          grainAmount={0.08}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.7}
          gamma={1.0}
          saturation={1.25}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
        />
      </div>
      
      {/* Subtle overlays to ensure readability of text and cards */}
      <div className="absolute inset-0 bg-[#08090a]/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090a]/10 via-[#08090a]/40 to-[#08090a]/90" />
    </div>
  );
}

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
      className="fixed inset-0 z-[9999] bg-[#08090a] flex flex-col justify-between"
    >
      <div className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-accent uppercase tracking-[0.3em] font-bold">
        Tekkrew
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={wordIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="text-4xl md:text-6xl lg:text-7xl font-display italic text-white absolute drop-shadow-[0_0_20px_rgba(255,230,0,0.4)]">
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-display text-white tabular-nums leading-none opacity-90 drop-shadow-md">
        {count.toString().padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/5 origin-left">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.2, ease: "linear" }} className="w-full h-full bg-accent origin-left shadow-[0_0_20px_rgba(255,230,0,0.8)]" />
      </div>
    </motion.div>
  );
}

// ==========================================
// 6. HERO SECTION
// ==========================================
function Hero({ heroReady }: { heroReady: boolean }) {
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

        {heroReady ? (
          <TextType
            as="h1"
            text="Tekkrew"
            typingSpeed={100}
            showCursor
            cursorCharacter="_"
            cursorClassName="text-accent"
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-display italic font-black leading-[0.85] tracking-tight text-white mb-6 drop-shadow-[0_0_35px_rgba(255,230,0,0.15)] block"
            startOnVisible={false}
            loop={false}
          />
        ) : (
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-display italic font-black leading-[0.85] tracking-tight text-white mb-6 opacity-0 select-none pointer-events-none" aria-hidden="true">
            Tekkrew
          </h1>
        )}

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
  onInteract: (name: string, pointerType: string) => void;
  onLeave: (pointerType: string) => void;
  isTouchDevice: boolean;
  priorityLoad?: boolean;
}

const SquadCard = memo(({ member, isActive, onInteract, onLeave, isTouchDevice, priorityLoad = false }: SquadCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.defaultMuted = true;
    vid.muted = true;
    vid.playsInline = true;

    if (isActive) {
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked by browser policy:", err);
        });
      }
    } else {
      vid.pause();
      vid.currentTime = 0; 
    }
  }, [isActive]);

  const handleMouseEnter = () => { if (!isTouchDevice) onInteract(member.name, "mouse"); };
  const handleMouseLeave = () => { if (!isTouchDevice) onLeave("mouse"); };
  const handleClick = () => { if (isTouchDevice) onInteract(member.name, "touch"); };

  return (
    <div
      data-name={member.name}
      className={`squad-card relative bg-[#111214] rounded-[2rem] overflow-hidden border transition-all duration-300 group flex flex-col cursor-pointer ${
        isActive ? 'border-accent shadow-xl md:shadow-[0_15px_40px_rgba(255,230,0,0.15)] -translate-y-2' : 'border-white/10 shadow-lg md:shadow-[0_10px_30px_rgba(0,0,0,0.8)] md:hover:-translate-y-2 md:hover:border-accent/40 md:hover:shadow-[0_15px_40px_rgba(255,230,0,0.1)]'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent transition-opacity duration-500 z-20 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

      {/* TOP HALF: Fixed Aspect Container */}
      <div className="relative w-full h-[320px] md:h-[380px] overflow-hidden bg-[#111214] z-0 border-b border-white/5">
        <div className="w-full h-full relative transition-transform duration-1000 md:group-hover:scale-105 bg-black">
          
          <Image
            src={member.image}
            alt={member.name}
            fill
            priority={priorityLoad}
            loading={priorityLoad ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
            className={`object-cover ${member.imageClass || "object-top"}`}
          />

          {member.videoFile && (
            <video
              ref={videoRef}
              src={member.videoFile}
              preload="metadata"
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300 transform-gpu ${member.imageClass || "object-top"} ${
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
      <div className="relative z-10 flex flex-col flex-1 p-8 pt-0 -mt-12 text-center items-center pointer-events-none bg-[#111214]">
        <h3 className="text-3xl md:text-4xl font-display italic font-black text-white drop-shadow-md mb-2">{member.name}</h3>
        <div className="w-12 h-[3px] bg-accent mb-3 rounded-full shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
        <p className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-[0.2em] mb-6">{member.role}</p>

        {member.flags && member.flags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {member.flags.map((flag, idx) => (
              <div 
                key={idx} 
                className={`w-14 h-9 rounded-md border bg-[#0a0a0a] flex items-center justify-center text-3xl leading-none transition-all duration-300 ${
                  isActive 
                    ? 'border-accent shadow-[0_5px_15px_rgba(255,230,0,0.3)] -translate-y-1' 
                    : 'border-white/20 shadow-lg md:shadow-[0_5px_15px_rgba(0,0,0,0.6)] md:group-hover:-translate-y-1 md:group-hover:border-accent md:group-hover:shadow-[0_5px_15px_rgba(255,230,0,0.3)]'
                }`}
              >
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

        <div className="mt-auto flex flex-wrap items-center justify-center gap-4 pt-6 w-full border-t border-white/10 pointer-events-auto">
          {member.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} 
              onPointerDown={(e) => e.stopPropagation()} 
              className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/60 hover:text-black hover:bg-accent hover:border-accent transition-all duration-300 shadow-sm md:hover:shadow-[0_0_15px_rgba(255,230,0,0.4)]"
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
  const [activeMemberName, setActiveMemberName] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (!isTouchDevice) return; 

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const name = entry.target.getAttribute('data-name');
          if (entry.isIntersecting && name) {
             setActiveMemberName(name);
          } else {
             setActiveMemberName(prev => (prev === name ? null : prev));
          }
        });
      },
      { threshold: 0.35 } 
    );

    const cards = document.querySelectorAll('.squad-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [isTouchDevice]);

  const handleInteract = useCallback((name: string, interactionType: string) => {
    if (interactionType === "mouse") {
      setActiveMemberName(name);
    } else {
      setActiveMemberName((prev) => (prev === name ? null : name));
    }
  }, []);

  const handleLeave = useCallback((interactionType: string) => {
    if (interactionType === "mouse") {
      setActiveMemberName(null);
    }
  }, []);

  return (
    <section id="crew" className="relative w-full py-16 md:py-32 px-4 md:px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-4 text-center md:text-left">
          <div className="w-full text-center md:text-left">
            <TextType 
              as="h2"
              text="Tekkrew"
              typingSpeed={75}
              showCursor
              cursorCharacter="_"
              cursorClassName="text-accent"
              className="text-5xl sm:text-6xl md:text-7xl font-display italic font-black text-white drop-shadow-[0_0_25px_rgba(255,230,0,0.2)] block"
              startOnVisible={true}
              loop={false}
            />
          </div>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" 
          onMouseLeave={() => { if (!isTouchDevice) setActiveMemberName(null); }}
        >
          {squadData.map((member, index) => (
            <SquadCard 
              key={member.name} 
              member={member} 
              isActive={activeMemberName === member.name} 
              onInteract={handleInteract} 
              onLeave={handleLeave}
              isTouchDevice={isTouchDevice}
              priorityLoad={index < 2} 
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
function VideoFrame({ video }: { video: MediaVideo }) {
  const portrait = video.height >= video.width;
  const ratioLabel = portrait ? "9:16" : "16:9";
  return (
    <figure className={`relative w-full min-w-0 ${portrait ? "max-w-[250px] sm:max-w-[270px]" : "max-w-2xl"}`}>
      {/* viewfinder corner brackets */}
      <span className="pointer-events-none absolute -left-1.5 -top-1.5 z-20 h-5 w-5 border-l-2 border-t-2 border-accent/60 transition-colors duration-500 md:group-hover/card:border-accent" />
      <span className="pointer-events-none absolute -right-1.5 -top-1.5 z-20 h-5 w-5 border-r-2 border-t-2 border-accent/60 transition-colors duration-500 md:group-hover/card:border-accent" />
      <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 z-20 h-5 w-5 border-b-2 border-l-2 border-accent/60 transition-colors duration-500 md:group-hover/card:border-accent" />
      <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 z-20 h-5 w-5 border-b-2 border-r-2 border-accent/60 transition-colors duration-500 md:group-hover/card:border-accent" />

      {/* the frame is sized purely by the hardcoded intrinsic ratio — never stretches or crops */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-lg transition-colors duration-500 md:rounded-2xl md:shadow-[0_20px_50px_rgba(0,0,0,0.8)] md:group-hover/card:border-accent/50"
        style={{ aspectRatio: `${video.width} / ${video.height}` }}
      >
        <video
          controls
          playsInline
          preload="none"
          poster={video.poster}
          width={video.width}
          height={video.height}
          src={video.src}
          className="h-full w-full object-contain"
        />
      </div>

      <figcaption className="mt-2.5 flex flex-wrap items-center justify-between gap-1 px-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-white/35 sm:text-[9px]">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          REC
        </span>
        <span className="tabular-nums">{video.width} × {video.height} — {ratioLabel}</span>
      </figcaption>
    </figure>
  );
}

function MediaFeatureCard({ feature, index }: { feature: MediaFeature; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const mediaRight = feature.mediaSide === "right";
  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group/card relative"
    >
      {/* oversized ghost index bleeding off the card corner */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-12 md:-top-20 ${mediaRight ? "left-1 md:-left-7" : "right-1 md:-right-7"} z-0 select-none font-display text-[6.5rem] font-black italic leading-none text-transparent md:text-[11rem]`}
        style={{ WebkitTextStroke: "1.5px rgba(255,230,0,0.16)" }}
      >
        {num}
      </span>

      <div className="relative z-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.05] via-[#0c0d0f] to-[#0a0b0c] transition-colors duration-500 md:rounded-[2.25rem] md:hover:border-accent/30">
        {/* broadcast meta strip */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 md:px-8">
          <div className="flex items-center gap-2.5">
            <span className={`h-1.5 w-1.5 rounded-full ${feature.dotClass}`} />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 md:text-[10px]">{feature.tag}</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] tabular-nums text-accent/80 md:text-[10px]">{num} / 03</span>
        </div>

        <div className={`flex flex-col gap-10 p-6 sm:p-8 md:p-12 lg:items-center lg:gap-16 ${mediaRight ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
          {/* text column */}
          <div className="min-w-0 flex-1 lg:w-[46%] lg:flex-none">
            <h3 className="mb-5 font-display text-4xl font-black italic leading-[0.95] text-white drop-shadow-sm sm:text-5xl md:mb-6 md:text-6xl">
              {feature.title}
            </h3>
            <div className="mb-5 flex items-center gap-2 md:mb-6">
              <span className="h-[2px] w-10 bg-accent shadow-[0_0_10px_rgba(255,230,0,0.6)]" />
              <span className="h-[2px] w-2 bg-accent/40" />
            </div>
            <div className="space-y-4 border-l-2 border-accent/60 pl-4 md:pl-5">
              {feature.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-sm font-light leading-relaxed text-white/80 md:text-base"
                      : "text-xs font-light leading-relaxed text-white/50 md:text-sm"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* media column over a technical dotted backdrop */}
          <div className="relative flex min-w-0 flex-1 items-start justify-center">
            <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px] opacity-70 md:-inset-6" />
            {feature.videos.length > 1 ? (
              <div className="relative grid w-full max-w-[560px] grid-cols-2 items-start gap-3 sm:gap-5">
                {feature.videos.map((video, i) => (
                  <div key={video.src} className={`flex justify-center ${i === 1 ? "mt-8 sm:mt-12" : ""}`}>
                    <VideoFrame video={video} />
                  </div>
                ))}
              </div>
            ) : (
              <VideoFrame video={feature.videos[0]} />
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function MediaSection() {
  return (
    <section id="events" className="relative w-full px-4 py-16 md:px-6 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center gap-3 text-center md:mb-28">
          <TextType
            as="h2"
            text="Media Showcase"
            typingSpeed={60}
            showCursor
            cursorCharacter="_"
            cursorClassName="text-accent"
            className="block font-display text-5xl font-black italic text-white drop-shadow-[0_0_25px_rgba(255,230,0,0.2)] sm:text-6xl md:text-7xl"
            startOnVisible={true}
            loop={false}
          />
          <div className="inline-flex items-center gap-3">
            <span className="h-[2px] w-8 bg-accent/80 shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
            <TextType
              as="p"
              text="Press & Features"
              typingSpeed={50}
              initialDelay={900}
              showCursor={false}
              className="text-xs font-bold uppercase tracking-[0.3em] text-white/80 md:text-sm"
              startOnVisible={true}
              loop={false}
            />
            <span className="h-[2px] w-8 bg-accent/80 shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
          </div>
        </div>

        <div className="space-y-24 md:space-y-36">
          {mediaData.map((feature, idx) => (
            <MediaFeatureCard key={feature.id} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 9. GALLERY SECTION 
// ==========================================
function GallerySection() {
  const [images, setImages] = useState<MasonryItem[]>([]);
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
          <TextType
            as="h2"
            text="GALLERY"
            typingSpeed={50}
            showCursor={false}
            className="text-2xl md:text-3xl font-display font-bold text-accent mb-2 block tracking-widest"
            startOnVisible={true}
            loop={false}
          />
          <TextType
            as="h3"
            text="Freestylers"
            typingSpeed={60}
            initialDelay={800}
            showCursor
            cursorCharacter="_"
            cursorClassName="text-accent"
            className="text-4xl sm:text-5xl md:text-7xl font-display italic font-black text-white mb-4 drop-shadow-md block"
            startOnVisible={true}
            loop={false}
          />
          <div className="inline-flex items-center gap-3">
             <div className="w-6 h-[2px] bg-accent/80 shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
             <TextType
               as="p"
               text="HOU — 4.24.26"
               typingSpeed={50}
               initialDelay={1800}
               showCursor={false}
               className="text-white/80 text-xs md:text-sm uppercase tracking-[0.3em] font-bold"
               startOnVisible={true}
               loop={false}
             />
             <div className="w-6 h-[2px] bg-accent/80 shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
          </div>
        </div>

        <Masonry
          items={images}
          onItemClick={(item) => setSelectedImage(item.img)}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.97}
          blurToFocus
        />
        
        <div className="mt-14 flex justify-center md:mt-20">
          <a
            href="https://www.instagram.com/tekkrew_/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent/40 bg-[#0c0d0f]/80 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:border-accent hover:shadow-[0_0_30px_rgba(255,230,0,0.25)] md:text-sm"
          >
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">See More on Instagram</span>
            <span className="relative z-10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black">
              <ArrowUpRightIcon />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}