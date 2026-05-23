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
const LetterboxdIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="6" cy="12" r="3" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="18" cy="12" r="3" />
  </svg>
);

// --- Squad Data (Alphabetical Order) ---
const squadData = [
  {
    name: "Chaymae Qaddouri",
    role: "Football Freestyler",
    heritage: "Moroccan",
    location: "Houston, Texas",
    image: "/Chaymae Qaddouri.jpeg",
    story: "Fusing Moroccan football heritage with absolute technical precision. Chaymae's flow is unmatched, redefining what ball control looks like on the concrete.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/c.qaddouri", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@chaymaeqaddouri?_r=1&_t=ZP-96YGPralUgJ", icon: <TikTokIcon /> },
      { name: "Collabs", url: "mailto:chaimaequa@gmail.com", icon: <EmailIcon /> },
    ]
  },
  {
    name: "Chuy",
    role: "Football Freestyler",
    heritage: "Mexican American",
    location: "Houston, Texas",
    image: "/Chuy.jpeg",
    story: "Mexican-American street legend in the making. Chuy brings aggressive, high-energy tricks that hype the crowd and leave defenders lost.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/streetchuy", icon: <InstagramIcon /> },
    ]
  },
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
      { name: "Letterboxd", url: "https://letterboxd.com/freestyle_jrd/", icon: <LetterboxdIcon /> },
      { name: "Email", url: "mailto:joecr768@gmail.com", icon: <EmailIcon /> },
      { name: "Linktree", url: "https://linktr.ee/freestyle_jrd", icon: <LinkIcon /> },
    ]
  },
  {
    name: "Yami",
    role: "Football Freestyler",
    heritage: "Street Talent",
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
    heritage: "Global Talent",
    location: "Houston, Texas",
    image: "/Zein.jpg",
    story: "A master of flow and creative transitions. Zein brings an international freestyle flavor to the streets, pushing the boundaries of what's possible with a football.",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/zeinkhitamy?igsh=MmRlY3UzYWdtejFz", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@zein.khitamy?_r=1&_t=ZP-96YG9S8jBGx", icon: <TikTokIcon /> },
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

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  // Force scroll to top on page refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-[100svh] bg-[#050505] text-text overflow-hidden selection:bg-accent selection:text-black">
      
      {/* GLOBAL LIGHTWEIGHT "WORLD CUP ENERGY" BACKGROUND (No Lag/Animations) */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
        {/* Subtle Static Radial Gradients for Life & Energy without GPU strain */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(255,230,0,0.06),transparent_40%),radial-gradient(circle_at_85%_70%,rgba(16,185,129,0.04),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.04),transparent_50%)]" />

        {/* Clean, lightweight pitch grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* LIGHTWEIGHT, BUTTERY SMOOTH REVEAL TRANSITION */}
      <div 
        className={`relative z-10 transition-all duration-1000 ease-out ${
          isLoading ? "opacity-0 translate-y-4 blur-sm" : "opacity-100 translate-y-0 blur-0"
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
// 1. DELIBERATE, PROFESSIONAL LOADING SCREEN (Exactly 2.2s)
// ==========================================
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const words = ["Skill", "Street", "Passion"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // 733ms per word to perfectly fit a 2.2s duration
    const interval = setInterval(() => setWordIndex((prev) => (prev + 1) % words.length), 733);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2200; // 2.2 seconds
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) requestAnimationFrame(step);
      else setTimeout(onComplete, 150); // Minimal buffer before triggering reveal
    };
    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    // Smoother "zoom out and blur" exit transition for the loader
    <motion.div 
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }} 
      transition={{ duration: 0.7, ease: "easeInOut" }} 
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-between"
    >
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
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.2, ease: "linear" }} className="w-full h-full bg-accent-gradient origin-left" style={{ boxShadow: "0 0 15px rgba(255, 230, 0, 0.4)" }} />
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
                if (link === "Events") document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
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
            className="btn-gradient-ring relative text-[11px] sm:text-xs md:text-sm text-text bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center transition-transform hover:scale-105 whitespace-nowrap"
          >
            Contact Us <ArrowUpRightIcon />
          </a>
        </div>
      </nav>
    </div>
  );
}

// ==========================================
// 3. HERO (Lightweight, No Video)
// ==========================================
function Hero() {
  const roles = ["Freestylers", "Creators", "Ballers", "Champions"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((prev) => (prev + 1) % roles.length), 2000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center w-full">
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
          <button onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })} className="btn-gradient-ring relative bg-text text-bg text-xs md:text-sm rounded-full px-6 md:px-7 py-3 md:py-3.5 font-bold transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,230,0,0.2)] w-full sm:w-auto">
            Latest Events
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
    <section id="crew" className="relative w-full py-16 md:py-24 px-4 md:px-6 border-t border-stroke/50">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display italic font-black text-white mb-1 md:mb-2">The Tekkrew</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {squadData.map((member, index) => (
            <div 
              key={index}
              className="bg-surface/80 backdrop-blur-sm border border-stroke rounded-2xl p-5 md:p-6 flex flex-col relative overflow-hidden transition-all duration-300 hover:border-accent/30 hover:bg-surface"
            >
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-accent/5 rounded-bl-full -z-0" />

              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] bg-stroke mb-4 md:mb-6 relative z-10 mx-auto md:mx-0">
                <div className="w-full h-full rounded-full bg-bg border-4 border-surface overflow-hidden relative">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top" 
                  />
                </div>
              </div>
              
              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-display italic text-text mb-1">{member.name}</h3>
                <p className="text-[10px] md:text-xs font-bold text-transparent bg-clip-text bg-accent-gradient mb-3 md:mb-4 uppercase tracking-widest">{member.role}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 md:mb-6">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 bg-white/5 px-2 py-1 rounded-md border border-white/5">{member.heritage}</span>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 bg-white/5 px-2 py-1 rounded-md border border-white/5">{member.location}</span>
                </div>
                
                <p className="text-muted text-xs md:text-sm leading-relaxed mb-6 md:mb-8 italic">
                  &ldquo;{member.story}&rdquo;
                </p>
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-center md:justify-start gap-3 relative z-10 pt-4 md:pt-6 border-t border-stroke/50">
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

// ==========================================
// 5. EVENTS & FEATURES SECTION
// ==========================================
function EventsSection() {
  return (
    <section id="events" className="relative w-full py-16 md:py-24 px-4 md:px-6 border-t border-stroke/50">
      <div className="max-w-5xl mx-auto space-y-12 md:space-y-20">
        
        {/* Telemundo Event */}
        <div className="bg-surface/60 backdrop-blur-sm border border-stroke rounded-2xl p-6 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-accent/30">
           <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-0" />
           <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display italic font-black text-white mb-6">Telemundo 30 Day Countdown to the World Cup '26</h2>
              <p className="text-muted text-sm md:text-base leading-relaxed mb-8 border-l-2 border-accent pl-4">
                From the streets of Alief to Cypress, Katy, and across the city, we are incredibly proud to represent the hustle and heart of the 713. Freestyle and streetstyle are the art forms we love to express, and we couldn't be more hyped to showcase our craft throughout the World Cup in the best city in Texas. <br/><br/>
                A massive thank you to <a href="https://www.instagram.com/sergguerrero?igsh=MTdoN3o4cjd5ZThpag==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-semibold transition-colors">@sergguerrero</a> and <a href="https://www.instagram.com/ubmartinez?igsh=NDhmYmVibTVyYW9m" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-semibold transition-colors">@ubmartinez</a> for this incredible opportunity and for allowing us to share our passion with the Latin community on <a href="https://www.instagram.com/telemundohou?igsh=b2xsd2ZiemU0c2dk" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-semibold transition-colors">@telemundohou</a>. We have so much planned and are beyond excited for what's to come. ¡Listos para el Mundial!
              </p>
           </div>
        </div>

        {/* Stella Artois Event */}
        <div className="bg-surface/60 backdrop-blur-sm border border-stroke rounded-2xl p-6 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-accent/30">
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-0" />
           <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display italic font-black text-white mb-6">FIFA x Stella Artois Event</h2>
              <p className="text-muted text-sm md:text-base leading-relaxed mb-8 border-l-2 border-accent pl-4">
                This event was truly unforgettable. A huge thank you to everyone who showed such kindness and support—it gives me so much extra motivation to keep elevating my game. I love seeing freestyle appreciated by everyone, and it's amazing to know that the craft is admired regardless of the style. I will cherish moments like this and can't wait for what's next. <br/><br/>
                A massive shoutout to <a href="https://www.instagram.com/elgrandynamo" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-semibold transition-colors">@elgrandynamo</a> for tagging along—I had an absolute blast, man. Y también muchísimas gracias a <a href="https://www.instagram.com/allthingsmarlon" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent font-semibold transition-colors">@allthingsmarlon</a> por estar atento de mí. I'm telling y'all, this year is about to go crazy.
              </p>
           </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 6. GALLERY SECTION (Clickable Lightbox)
// ==========================================
function GallerySection() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const shuffled = [...initialGalleryImages].sort(() => 0.5 - Math.random());
    setImages(shuffled);
  }, []);

  return (
    <section id="gallery" className="relative w-full py-16 md:py-24 px-4 md:px-6 border-t border-stroke/50">
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 hover:bg-accent hover:text-black text-white rounded-full flex items-center justify-center transition-colors z-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[85vh] h-full flex items-center justify-center pointer-events-none"
            >
              <Image 
                src={selectedImage} 
                alt="Enlarged Freestyle Image" 
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display italic font-black text-white mb-1">Freestylers - HOU - 4.24.26</h2>
          <p className="text-accent text-xs md:text-sm uppercase tracking-widest font-bold mt-2">Houston, Texas</p>
          <div className="w-16 h-1 bg-accent rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {images.map((src, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedImage(src)}
              className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface border border-stroke group cursor-pointer"
            >
              <Image 
                src={src} 
                alt={`Freestyle event moment ${index + 1}`} 
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white">
                  <ArrowUpRightIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
           <a 
              href="https://www.instagram.com/tekkrew_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors flex items-center gap-2"
            >
              See More on Instagram <ArrowUpRightIcon />
            </a>
        </div>
      </div>
    </section>
  );
}