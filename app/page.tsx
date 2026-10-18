"use client";

import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TextType from "../components/TextType";
import Grainient from "../components/Grainient";
import Masonry, { MasonryItem } from "../components/Masonry";
import Navbar from "../components/Navbar";
import TekkrewLogoAnimated from "../components/TekkrewLogoAnimated";

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
const LinkIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
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
    role: "Freestyle",
    heritage: "Moroccan",
    flags: ["🇲🇦"],
    location: "Houston, Texas",
    image: "/Chaymae Qaddouri.jpeg",
    videoFile: "/Chaymae Qaddouri.mp4",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/c.qaddouri", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@chaymaeqaddouri?_r=1&_t=ZP-96YGPralUgJ", icon: <TikTokIcon /> },
    ],
  },
  {
    name: "Chuy Navarro",
    role: "Street Panna",
    heritage: "Mexican • American",
    flags: ["🇲🇽", "🇺🇸"],
    location: "Houston, Texas",
    image: "/Chuy.jpeg",
    videoFile: "/Chuy.mp4",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/streetchuy", icon: <InstagramIcon /> },
    ],
  },
  {
    name: "Joseph Diaz",
    role: "Freestyle",
    heritage: "Colombian • American",
    flags: ["🇨🇴", "🇺🇸"],
    imageClass: "scale-[1.15] sm:scale-[1.25] md:scale-[1.35] origin-[50%_20%] object-[50%_20%]",
    location: "Houston, Texas",
    image: "/Joseph.jpg",
    videoFile: "/Joseph.mp4",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/freestyle_jrd", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@freestyle_jrd", icon: <TikTokIcon /> },
      { name: "Letterboxd", url: "https://letterboxd.com/freestyle_jrd/", icon: <LetterboxdIcon /> },
      { name: "Linktree", url: "https://linktr.ee/freestyle_jrd", icon: <LinkIcon /> },
    ],
  },
  {
    name: "Yami",
    role: "Freestyle",
    heritage: "Honduran",
    flags: ["🇭🇳"],
    location: "Houston, Texas",
    image: "/Yami.jpg",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/groovyami?igsh=MXg2emphOHlzbjdxdQ==", icon: <InstagramIcon /> },
    ], 
  },
  {
    name: "Zein Khitamy",
    role: "Freestyle",
    heritage: "Kenyan",
    flags: ["🇰🇪"],
    location: "Houston, Texas",
    image: "/Zein.jpg",
    videoFile: "/Zein.mp4",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/zeinkhitamy?igsh=MmRlY3UzYWdtejFz", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@zein.khitamy?_r=1&_t=ZP-96YG9S8jBGx", icon: <TikTokIcon /> },
    ],
  },
  {
    name: "Zohair Ali",
    role: "Street Panna",
    heritage: "Qatari • Pakistani",
    flags: ["🇶🇦", "🇵🇰"],
    location: "Houston, Texas",
    image: "/Zo.jpg",
    videoFile: "/Zo.mp4",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/zostyler", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@zostyler?_r=1&_t=ZP-972sk7kVEkw", icon: <TikTokIcon /> },
    ],
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
      "Houston’s TekKREW was featured by KHOU 11 discussing how freestyle soccer brings people together in Houston.",
      <>
        Thank you <span className="font-bold text-white">@troyklesstv</span> on Instagram for interviewing us and giving TekKREW the opportunity to share our passion for freestyle soccer in Houston.
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
      "From the streets of Alief to Cypress, Katy, and across the city, we are incredibly proud to represent the hustle and heart of the 713. Freestyle and streetstyle are the art forms we love to express, and we couldn't be more hyped to showcase our craft in the best city in Texas.",
      <>
        A massive thank you to <span className="font-bold text-white">@sergguerrero</span> and <span className="font-bold text-white">@ubmartinez</span> for sharing our passion with the Latin community on <span className="font-bold text-white">@telemundohou</span>.
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
    dotClass: "bg-accent",
    title: "FIFA x Stella Artois",
    paragraphs: [
      "This event was truly unforgettable. A huge thank you to everyone who showed such kindness and support—it gives me so much extra motivation to keep elevating my game. I love seeing freestyle appreciated by everyone, and it's amazing to know that the craft is admired regardless of the style.",
      <>
        Shoutout to <span className="font-bold text-white">@elgrandynamo</span> for tagging along. Y también muchísimas gracias a <span className="font-bold text-white">@allthingsmarlon</span> por estar atento de mí. I'm telling y'all, this year is about to go crazy.
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
interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  images: MasonryItem[];
}

const galleryEvents: GalleryEvent[] = [
  {
    id: "vanta",
    title: "VANTA Fashion Show",
    date: "09. 26. 2026",
    images: [
      { id: "vanta-L1002486", img: "/VANTA Fashion Show - 9.26.26/vanta_L1002486.jpg", aspectRatio: 1.5 },
      { id: "vanta-L1002815", img: "/VANTA Fashion Show - 9.26.26/vanta_L1002815.jpg", aspectRatio: 0.666 },
      { id: "vanta-L1002487", img: "/VANTA Fashion Show - 9.26.26/vanta_L1002487.jpg", aspectRatio: 1.5 },
      { id: "vanta-L1002488", img: "/VANTA Fashion Show - 9.26.26/vanta_L1002488.jpg", aspectRatio: 1.25 },
      { id: "vanta-L1002851", img: "/VANTA Fashion Show - 9.26.26/vanta_L1002851.jpg", aspectRatio: 0.666 },
      { id: "vanta-L1002500", img: "/VANTA Fashion Show - 9.26.26/vanta_L1002500.jpg", aspectRatio: 1.5 },
      { id: "vanta-L1002506", img: "/VANTA Fashion Show - 9.26.26/vanta_L1002506.jpg", aspectRatio: 1.5 },
      { id: "vanta-L1002944", img: "/VANTA Fashion Show - 9.26.26/vanta_L1002944.jpg", aspectRatio: 0.666 },
      { id: "vanta-L1002695", img: "/VANTA Fashion Show - 9.26.26/vanta_L1002695.jpg", aspectRatio: 1.5 },
      { id: "vanta-L1002887", img: "/VANTA Fashion Show - 9.26.26/vanta_L1002887.jpg", aspectRatio: 1.5 },
    ],
  },
  {
    id: "buffalo-bayou",
    title: "Buffalo Bayou",
    date: "HOU — 4.24.26",
    images: [
    ] = [
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
    ],
  },
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
        <Footer />
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
          colors={["#120f17", "#ffffff", "#000000", "#ffffff", "#000000"]}
          angle={55}
          flow={2}
          silk={0.35}
          grainAmount={0.08}
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
      <div className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-white/60 tracking-[0.3em] font-bold">
        TekKREW
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={wordIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="text-4xl md:text-6xl lg:text-7xl font-display uppercase text-white absolute">
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-display uppercase text-white tabular-nums leading-none opacity-90 drop-shadow-md">
        {count.toString().padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/5 origin-left">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.2, ease: "linear" }} className="w-full h-full bg-accent origin-left" />
      </div>
    </motion.div>
  );
}

// ==========================================
// 6. HERO SECTION
// ==========================================

function CrewFaces() {
  return (
    <div className="inline-flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={() => document.getElementById("tekkrew")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Meet TekKREW"
        className="group flex items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <span className="flex -space-x-3 transition-all duration-500 ease-out group-hover:-space-x-1">
          {squadData.map((member, i) => (
            <span
              key={member.name}
              className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-black ring-1 ring-white/20 md:h-12 md:w-12"
              style={{ zIndex: squadData.length - i }}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="48px"
                className={`object-cover object-top ${member.imageClass ? "scale-[1.9] origin-[50%_14%]" : ""}`}
              />
            </span>
          ))}
        </span>
      </button>
      <p className="text-sm leading-snug text-white/70">
        Six players.<br />Est. 2026, HTX • DTX
      </p>
    </div>
  );
}

function Hero({ heroReady }: { heroReady: boolean }) {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
      <h1 className="sr-only">TekKREW, a freestyle and panna crew from Houston, Texas</h1>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 pt-24">
        <TekkrewLogoAnimated play={heroReady} className="w-[min(88vw,780px)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.65)]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={heroReady ? { opacity: 1 } : undefined}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 md:flex-row md:items-end md:justify-between md:px-8 md:pb-14"
      >
        <CrewFaces />
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => document.getElementById("tekkrew")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-accent hover:text-white"
          >
            Meet TekKREW
          </button>
          <button
            onClick={() => document.getElementById("media")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full border border-white/30 bg-black/30 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            Press & Features
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 7. CREW SECTION — grouped by discipline
// ==========================================


interface PlayerTileProps {
  member: SquadMember;
  isActive: boolean;
  onInteract: (name: string, pointerType: string) => void;
  onLeave: (pointerType: string) => void;
  isTouchDevice: boolean;
  priorityLoad?: boolean;
}

const PlayerTile = memo(({ member, isActive, onInteract, onLeave, isTouchDevice, priorityLoad = false }: PlayerTileProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.defaultMuted = true;
    vid.muted = true;
    vid.playsInline = true;
    if (isActive) {
      vid.play()?.catch(() => undefined);
    } else {
      vid.pause();
      vid.currentTime = 0;
    }
  }, [isActive]);

  return (
    <article
      data-name={member.name}
      className="squad-card group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl bg-[#111214]"
      onMouseEnter={() => { if (!isTouchDevice) onInteract(member.name, "mouse"); }}
      onMouseLeave={() => { if (!isTouchDevice) onLeave("mouse"); }}
      onClick={() => { if (isTouchDevice) onInteract(member.name, "touch"); }}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out md:group-hover:scale-[1.04]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          priority={priorityLoad}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${member.imageClass || "object-top"} ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

      <div className="absolute left-3 top-3 flex gap-1.5">
        {member.flags.map((flag) => (
          <span key={flag} className="rounded-md bg-black/55 px-1.5 py-0.5 text-lg leading-none backdrop-blur-sm" aria-hidden="true">
            {flag}
          </span>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
        <div className="min-w-0">
          <h4 className="font-display text-4xl font-black uppercase leading-[0.85] text-white md:text-[2.75rem]">{member.name}</h4>
          <p className="mt-2 text-xs text-white/60"><span className="text-white/85">{member.role}</span> / {member.heritage}</p>
        </div>
        <div className="flex shrink-0 gap-1.5">
          {member.links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label={`${member.name} on ${link.name}`}
              title={link.name}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/75 backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent [&_svg]:h-4 [&_svg]:w-4"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-accent transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0"}`}
      />
    </article>
  );
});
PlayerTile.displayName = "PlayerTile";

function SquadSection() {
  const [activeMemberName, setActiveMemberName] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    if (!isTouchDevice) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const name = entry.target.getAttribute("data-name");
          if (entry.isIntersecting && name) setActiveMemberName(name);
          else setActiveMemberName((prev) => (prev === name ? null : prev));
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll(".squad-card").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [isTouchDevice]);

  const handleInteract = useCallback((name: string, interactionType: string) => {
    if (interactionType === "mouse") setActiveMemberName(name);
    else setActiveMemberName((prev) => (prev === name ? null : name));
  }, []);

  const handleLeave = useCallback((interactionType: string) => {
    if (interactionType === "mouse") setActiveMemberName(null);
  }, []);

  return (
    <section id="tekkrew" className="scroll-mt-20 md:scroll-mt-24 relative z-10 w-full px-4 py-16 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 md:mb-12">
          <h2 className="font-display text-6xl font-black leading-[0.85] text-white md:text-8xl">TekKREW</h2>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5"
          onMouseLeave={() => { if (!isTouchDevice) setActiveMemberName(null); }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {squadData.map((member, i) => (
              <motion.div
                key={member.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <PlayerTile
                  member={member}
                  isActive={activeMemberName === member.name}
                  onInteract={handleInteract}
                  onLeave={handleLeave}
                  isTouchDevice={isTouchDevice}
                  priorityLoad={i < 3}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// 8. MEDIA SECTION & COMPONENTS
// ==========================================
function MediaTicker() {
  const items = ["AS SEEN ON", "KHOU 11", "TELEMUNDO", "FIFA × STELLA ARTOIS", "HOUSTON, TX"];
  const strip = (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 text-[11px] font-bold uppercase tracking-[0.35em] text-white/40 md:text-xs">
            {item}
          </span>
          <span className="h-1 w-1 rounded-full bg-accent/60" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative mb-8 overflow-hidden border-y border-white/[0.06] py-4 md:mb-10 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {strip}
        {strip}
      </motion.div>
    </div>
  );
}

// Tiles keep each video's native shape (16:9 Telemundo, 9:16 KHOU and FIFA).
// On desktop they share one row: flex-grow = aspect ratio gives every tile the same height.
const bentoOrder = ["telemundo", "khou", "stella"];
// 720x1280 cover cut from the KHOU video itself, with the burned-in World Cup caption blurred out.
const bentoCover: Record<string, string> = { khou: "/khou-thumbnail-916.jpg" };

function PressModal({ feature, onClose }: { feature: MediaFeature; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={feature.title}
      className="fixed inset-0 z-[100000] flex items-center justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-md sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-[#0d0e10] p-5 md:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-accent hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <div className="flex flex-wrap justify-center gap-4 md:w-3/5">
            {feature.videos.map((video, i) => (
              <div
                key={video.src}
                className={`relative w-full overflow-hidden rounded-2xl bg-black ${video.height >= video.width ? "max-w-[260px]" : ""}`}
                style={{ aspectRatio: `${video.width} / ${video.height}` }}
              >
                <video
                  src={video.src}
                  poster={video.poster}
                  controls
                  playsInline
                  autoPlay={i === 0}
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
          <div className="md:w-2/5 md:pr-10">
            <p className="flex items-center gap-2 text-xs text-white/60">
              <span className={`h-1.5 w-1.5 rounded-full ${feature.dotClass}`} />
              {feature.tag}
            </p>
            <h3 className="mt-3 font-display text-4xl font-black uppercase leading-[0.9] text-white md:text-5xl">{feature.title}</h3>
            <div className="mt-5 space-y-4">
              {feature.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-white/65 md:text-[15px]">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MediaSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const features = bentoOrder
    .map((id) => mediaData.find((f) => f.id === id))
    .filter((f): f is MediaFeature => Boolean(f));
  const open = features.find((f) => f.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);

  return (
    <section id="media" className="scroll-mt-20 md:scroll-mt-24 relative w-full px-4 py-16 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-12">
          <h2 className="font-display text-6xl font-black uppercase leading-[0.85] text-white md:text-8xl">Press &amp; Features</h2>
          <p className="hidden pb-2 text-sm text-white/50 sm:block">Tap a story to watch</p>
        </div>

        <MediaTicker />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:flex md:gap-5">
          {features.map((f) => {
            const { width, height } = f.videos[0];
            const landscape = width > height;
            return (
              <button
                key={f.id}
                onClick={() => setOpenId(f.id)}
                style={{ aspectRatio: `${width} / ${height}`, flex: `${width / height} 1 0%` }}
                className={`group relative overflow-hidden rounded-2xl bg-[#111214] text-left transition-transform duration-150 ease-out active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                  landscape ? "col-span-2" : ""
                }`}
              >
                <Image
                  src={bentoCover[f.id] ?? f.videos[0].poster}
                  alt=""
                  fill
                  sizes={landscape ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 50vw, 20vw"}
                  quality={85}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black transition-colors duration-200 group-hover:bg-accent group-hover:text-white md:right-4 md:top-4 md:h-11 md:w-11">
                  <svg className="ml-0.5 h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/70 md:text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${f.dotClass}`} />
                      {f.tag}
                    </span>
                    {f.videos.length > 1 && (
                      <span className="rounded-full border border-white/20 px-2 py-0.5">{f.videos.length} videos</span>
                    )}
                  </div>
                  <h3 className={`mt-1.5 font-display font-black uppercase leading-[0.9] text-white ${landscape ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                    {f.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>{open && <PressModal key={open.id} feature={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}

// ==========================================
// 9. GALLERY SECTION 
// ==========================================
function GallerySection() {
  const [activeId, setActiveId] = useState(galleryEvents[0].id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const active = galleryEvents.find((e) => e.id === activeId) ?? galleryEvents[0];

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
    <section id="gallery" className="scroll-mt-20 md:scroll-mt-24 relative w-full px-4 py-16 md:px-8 md:py-28">
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
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-accent text-black rounded-full flex items-center justify-center transition-all z-50 cursor-pointer"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div
              className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImage} alt={`${active.title} photo`} fill sizes="100vw" className="object-contain drop-shadow-2xl" priority />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12 md:mb-14 text-center">
          <TextType
            as="h2"
            text="GALLERY"
            typingSpeed={50}
            showCursor={false}
            className="text-2xl md:text-3xl font-display uppercase font-bold text-white/60 mb-2 block tracking-widest"
            startOnVisible={true}
            loop={false}
          />
          <TextType
            key={`title-${active.id}`}
            as="h3"
            text={active.title}
            typingSpeed={60}
            initialDelay={800}
            showCursor
            cursorCharacter="_"
            cursorClassName="text-accent"
            className="text-4xl sm:text-5xl md:text-7xl font-display uppercase font-black text-white mb-4 drop-shadow-md block"
            startOnVisible={true}
            loop={false}
          />
          <div className="inline-flex items-center gap-3">
             <div className="w-6 h-[2px] bg-accent/80" />
             <TextType
               key={`date-${active.id}`}
               as="p"
               text={active.date}
               typingSpeed={50}
               initialDelay={1800}
               showCursor={false}
               className="text-white/80 text-xs md:text-sm uppercase tracking-[0.3em] font-bold"
               startOnVisible={true}
               loop={false}
             />
             <div className="w-6 h-[2px] bg-accent/80" />
          </div>
        </div>

        {/* Event tabs */}
        <div role="tablist" aria-label="Gallery events" className="mb-10 flex flex-wrap justify-center gap-2 md:mb-14">
          {galleryEvents.map((event) => {
            const isActive = event.id === active.id;
            return (
              <button
                key={event.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(event.id)}
                className={`relative rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 md:text-xs ${
                  isActive ? "border-white/25 bg-white/10 text-white" : "border-white/10 text-white/50 hover:border-white/25 hover:text-accent"
                }`}
              >
                {event.title}
                <span className="ml-2 hidden font-normal tracking-[0.15em] text-white/40 sm:inline">{event.date}</span>
                {isActive && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />}
              </button>
            );
          })}
        </div>

        <Masonry
          key={active.id}
          items={active.images}
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
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#FF4328]/50 bg-[#0c0d0f]/80 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:border-[#FF4328] hover:shadow-[0_0_30px_rgba(255,67,40,0.25)] md:text-sm"
          >
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">See More on Instagram</span>
            <span className="relative z-10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black">
              <svg className="ml-0.5 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
            </span>
          </a>
        </div>
        
      </div>
    </section>
  );
}

// ==========================================
// 10. FOOTER
// ==========================================
function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-10 pt-6 md:px-8 md:pb-12">
      <p className="text-center text-sm text-white/45">© 2026 TekKREW. Houston, Texas.</p>
    </footer>
  );
}
