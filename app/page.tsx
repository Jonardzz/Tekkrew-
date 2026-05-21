"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

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
      { name: "Instagram", url: "https://www.instagram.com/freestyle_jrd?igsh=MTFqaThucWVyNjdybA==", icon: <InstagramIcon /> },
      { name: "TikTok", url: "https://www.tiktok.com/@freestyle_jrd?lang=en&is_from_webapp=1&sender_device=mobile&sender_web_id=7642235223417980447", icon: <TikTokIcon /> },
      { name: "Email", url: "mailto:joecr768@gmail.com", icon: <EmailIcon /> },
      { name: "Linktree", url: "https://linktr.ee/freestyle_jrd?utm_source=linktree_profile_share&ltsid=80816e68-4e22-4b29-9b14-547daafbbe97", icon: <LinkIcon /> },
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
      { name: "Instagram", url: "https://www.instagram.com/c.qaddouri?igsh=MW9zenlqZHdiZWV1cA==", icon: <InstagramIcon /> },
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
      { name: "Instagram", url: "https://www.instagram.com/streetchuy?igsh=MWR3dzUwdjFvY2lpbg==", icon: <InstagramIcon /> },
    ]
  }
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-bg text-text overflow-hidden selection:bg-accent selection:text-black">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-500 ease-out ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        <Hero isLoading={isLoading} />
        <SquadSection />
      </div>
    </main>
  );
}

// ==========================================
// 1. LOADING SCREEN
// ==========================================
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const words = ["Skill", "Style", "Street"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setWordIndex((prev) => (prev + 1) % words.length), 900);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2700;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) requestAnimationFrame(step);
      else setTimeout(onComplete, 400);
    };
    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-muted uppercase tracking-[0.3em]">
        Tekkrew
      </motion.div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={wordIndex} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text/80 absolute">
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-display text-text tabular-nums leading-none">
        {count.toString().padStart(3, "0")}
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-stroke/50 origin-left">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.7, ease: "linear" }} className="w-full h-full bg-accent-gradient origin-left" style={{ boxShadow: "0 0 15px rgba(255, 230, 0, 0.5)" }} />
      </div>
    </motion.div>
  );
}

// ==========================================
// 2. NAVBAR (With Official IG Link)
// ==========================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <nav className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-2 transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-black/80" : ""}`}>
        
        {/* LOGO CONTAINER */}
        <div className="group relative w-9 h-9 rounded-full p-[2px] bg-accent-gradient cursor-pointer flex-shrink-0">
          <div className="w-full h-full bg-bg rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <img 
              src="/Tekkrew.jpg" 
              alt="Tekkrew Logo" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-[13px] font-display italic tracking-tighter text-text">TK</span>';
              }}
            />
          </div>
        </div>

        <div className="hidden sm:block w-px h-5 bg-stroke mx-3" />

        <div className="flex items-center gap-1 sm:gap-2 px-2">
          {["Home", "Crew", "Events"].map((link, i) => (
            <button
              key={link}
              onClick={() => {
                if (link === "Crew") document.getElementById("crew")?.scrollIntoView({ behavior: "smooth" });
                if (link === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${i === 0 ? "text-text bg-stroke/50" : "text-muted hover:text-text hover:bg-stroke/50"}`}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-stroke mx-3" />

        <div className="flex items-center gap-2">
          {/* Official Tekkrew IG Link */}
          <a 
            href="https://www.instagram.com/tekkrew_/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted hover:text-accent p-1.5 transition-colors"
          >
            <InstagramIcon />
          </a>
          <button className="btn-gradient-ring relative text-xs sm:text-sm text-text bg-surface rounded-full px-4 py-1.5 sm:py-2 flex items-center gap-1 transition-transform hover:scale-105">
            Book Us ↗
          </button>
        </div>
      </nav>
    </div>
  );
}

// ==========================================
// 3. HERO (Lively Background & Glow)
// ==========================================
function Hero({ isLoading }: { isLoading: boolean }) {
  const roles = ["Freestylers", "Creators", "Ballers", "Champions"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((prev) => (prev + 1) % roles.length), 2000);
    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    if (!isLoading) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".name-reveal", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 }, 0.1)
        .fromTo(".blur-in", { opacity: 0, filter: "blur(10px)", y: 20 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 }, 0.3);
    }
  }, [isLoading]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center w-full">
      
      {/* Dynamic Stadium Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-accent/15 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Brighter Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden mix-blend-screen">
        <video
          autoPlay muted loop playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-60 grayscale contrast-125"
          src="https://stream.mux.com/Gs3wZfrtz6ZfqZqQ02c02Z7lugV00FGZvRpcqFTel66r3g.m3u8"
        />
        {/* Softened the overlay from black/60 to a gradient so the center is brighter */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <span className="blur-in text-xs text-white/80 uppercase tracking-[0.3em] mb-8 font-bold">
          Road to World Cup '26
        </span>

        <h1 className="name-reveal text-7xl md:text-8xl lg:text-[10rem] font-display italic leading-[0.9] tracking-tight text-white mb-6 drop-shadow-2xl">
          Tekkrew
        </h1>

        <p className="blur-in text-lg md:text-xl lg:text-2xl text-white/90 mb-8 font-medium">
          A squad of{" "}
          <span key={roleIndex} className="font-display italic text-transparent bg-clip-text bg-accent-gradient inline-block animate-fade-in font-bold px-1 drop-shadow-md">
            {roles[roleIndex]}
          </span>{" "}
          taking over the pitch.
        </p>

        <p className="blur-in text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mb-12 border-l-2 border-accent pl-4 text-left mx-auto">
          Born on the concrete, headed for the global stage. We built Tekkrew to elevate the beautiful game with raw street style. As the world turns its eyes to North America for World Cup '26, we are bringing gravity-defying freestyle to the masses—and we are just getting started.
        </p>

        <div className="blur-in flex items-center gap-4">
          <button className="btn-gradient-ring relative bg-text text-bg text-sm rounded-full px-7 py-3.5 font-bold transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,230,0,0.3)]">
            Watch Tape
          </button>
          <button onClick={() => document.getElementById("crew")?.scrollIntoView({ behavior: "smooth" })} className="btn-gradient-ring relative bg-black/50 backdrop-blur-sm text-text text-sm rounded-full px-7 py-3.5 border border-stroke font-bold transition-transform hover:scale-105 hover:bg-surface">
            Meet the Squad
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-white/50 uppercase tracking-[0.2em]">PITCH DOWN</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-full bg-accent animate-scroll-dot rounded-full absolute top-0" />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. SQUAD SECTION (Freestyle Vibe Layout)
// ==========================================
function SquadSection() {
  return (
    <section id="crew" className="relative w-full bg-bg py-24 px-6 border-t border-stroke/50">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-display italic font-black text-white mb-2">The Roster</h2>
            <p className="text-accent text-sm md:text-base uppercase tracking-widest font-bold">Houston, Texas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {squadData.map((member, index) => (
            <div 
              key={index}
              className="bg-surface/80 backdrop-blur-sm border border-stroke rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_10px_30px_rgba(255,230,0,0.1)] group relative overflow-hidden"
            >
              {/* Dynamic Freestyle Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-0 transition-transform duration-500 group-hover:scale-150" />

              {/* Profile Avatar */}
              <div className="w-24 h-24 rounded-full p-[2px] bg-stroke group-hover:bg-accent-gradient transition-all duration-500 mb-6 relative z-10">
                <div className="w-full h-full rounded-full bg-bg border-4 border-surface overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="font-display italic text-2xl text-muted w-full h-full flex items-center justify-center">' + member.name.charAt(0) + '</span>';
                    }}
                  />
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-display italic text-text mb-1">{member.name}</h3>
                <p className="text-xs font-bold text-transparent bg-clip-text bg-accent-gradient mb-4 uppercase tracking-widest">{member.role}</p>
                
                <div className="flex gap-2 mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 bg-white/5 px-2 py-1 rounded-md border border-white/5">{member.heritage}</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/50 bg-white/5 px-2 py-1 rounded-md border border-white/5">{member.location}</span>
                </div>
                
                <p className="text-muted text-sm leading-relaxed mb-8 italic">
                  "{member.story}"
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-auto flex items-center gap-3 relative z-10 pt-6 border-t border-stroke/50">
                {member.links.map((link, i) => (
                  <a 
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-black hover:bg-accent hover:border-accent transition-all duration-300"
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