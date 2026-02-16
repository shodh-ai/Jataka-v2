"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

// --- VIDEO CONFIG (YouTube instead of /public demo.mp4) ---
// Replace ONLY the VIDEO_ID below with your YouTube video ID.
// Example watch URL: https://www.youtube.com/watch?v=abcd1234
// Then set VIDEO_ID = "abcd1234"
const YOUTUBE_VIDEO_ID = "SdXRbVhZMzg";
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`;

// --- COMPONENTS (Keeping your exact original design) ---

const GradientBorder = ({ children, className = "", rounded = "rounded-[20px]" }: { children: React.ReactNode; className?: string; rounded?: string }) => (
  <div className={`relative ${className} bg-[#ffffff0a] ${rounded}`}>
    {/* Exact original border technique */}
    <div className={`absolute inset-0 pointer-events-none z-[1] p-px ${rounded} bg-[#FFFFFF0A/10]`} />
    <div className="relative z-10 h-full">
      {children}
    </div>
  </div>
);

const SectionHeader = ({ subtitle, title, align = "center" }: { subtitle: string; title: React.ReactNode; align?: "center" | "left" }) => (
  <div className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center" : "items-center text-center md:items-start md:text-left"}`}>
    <div className="font-bold text-[#566fe9] text-sm tracking-[2.80px] uppercase">
      {subtitle}
    </div>
    <h2 className={`bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent font-semibold text-3xl md:text-[64px] leading-snug md:leading-[1.15] pb-1`}>
      {title}
    </h2>
  </div>
);

// --- CONTENT DATA (Updated to Jataka Messaging) ---

const featureCards = [
  {
    title: "1. THE AI OBEYS",
    subtitle: "Context-Aware Coding",
    desc: "We inject architectural rules directly into Cursor and Windsurf. Jataka warns developers of dangerous dependencies  before they even commit code.",
    img: "https://c.animaapp.com/mik17n6qd0VDsr/img/text-container.png" 
  },
  {
    title: "2. THE KILL SWITCH",
    subtitle: "Automated Governance",
    desc: "The Governor Limit Profiler analyzes your logs in real-time. If a Pull Request contains a SOQL loop or hits a limit, Jataka blocks the merge instantly. No compromise.",
    img: "https://c.animaapp.com/mik17n6qd0VDsr/img/text-container-1.png"
  }
];

export default function JatakaLandingPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#0b132b] min-h-screen w-full relative overflow-x-hidden text-white selection:bg-[#566fe9]/30">
      
      {/* --- Background Ambient Glows (Original) --- */}
      <div className="fixed top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white opacity-5 rounded-full blur-[80px] md:blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#566fe9] opacity-10 rounded-full blur-[80px] md:blur-[150px] pointer-events-none" />

      {/* --- Header (Restored) --- */}
      <header className="fixed top-0 md:top-6 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-[100px] py-4 md:py-0 max-w-[1920px] mx-auto w-full relative bg-[#0b132b]/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-white/10 md:border-none">
        <img
          className="h-7 md:h-9 w-auto cursor-pointer"
          alt="Logo"
          src="jatakalogo.svg"
          onClick={() => router.push("/")}
        />

        {/* Desktop Nav */}
        <nav className="hidden md:inline-flex items-center gap-8 px-8 py-[6px] bg-[#ffffff0a] rounded-xl border border-white/5 backdrop-blur-md absolute left-1/2 -translate-x-1/2">
          {[
            { label: "Home", target: "home" },
            { label: "Demo", target: "demo" },
            { label: "What we do", target: "features" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(item.target)}
              className="text-sm font-medium transition-opacity opacity-60 hover:opacity-100"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => router.push("/book-pilot")}
            className="w-[131px] h-[42px] px-[6px] py-[6px] rounded-md border border-[#ffffff66] bg-transparent hover:bg-[#ffffff0a] transition-colors text-sm font-medium flex items-center justify-center"
          >
            Book a Pilot
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-[100%] left-0 w-full bg-[#0b132b] border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-in slide-in-from-top-5">
            <button
              onClick={() => scrollToSection("home")}
              className="text-left text-lg font-medium opacity-80 py-2 border-b border-white/5"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("demo")}
              className="text-left text-lg font-medium opacity-80 py-2 border-b border-white/5"
            >
              Demo
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-left text-lg font-medium opacity-80 py-2 border-b border-white/5"
            >
              What we do
            </button>
            <button
              onClick={() => router.push("/book-pilot")}
              className="w-full py-4 mt-2 rounded-md border border-white/20 bg-white/5 font-medium flex items-center justify-center"
            >
              Book a Pilot
            </button>
          </div>
        )}
      </header>

      {/* --- Main Content Wrapper --- */}
      <main id="home" className="flex flex-col items-center w-full pt-28 md:pt-48 pb-20 gap-24 md:gap-40">

        {/* --- Hero Section --- */}
        <section className="flex flex-col items-center gap-12 px-4 max-w-4xl mx-auto text-center relative z-10 w-full">
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <div className="font-bold text-[#566fe9] text-xs md:text-sm tracking-[2.80px] px-4 py-1 ">
              GOVERNANCE FOR THE AGENTIC AGE
            </div>

            <h1 className="w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent font-semibold text-4xl md:text-[60px] leading-snug md:leading-[1.15] tracking-[1%] text-center whitespace-normal md:whitespace-nowrap pb-1">
              <span className="block">They write faster than</span>
              <span className="block">you can read.</span>
            </h1>
            
            <p className="max-w-[643px] opacity-60 font-medium text-sm md:text-[16px] leading-[1.6]">
              AI Copilots are generating code at lightning speed. Jataka is the Integrity Layer that forces them to obey architectural rules, blocking bugs before they reach production.
            </p>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 w-full md:w-auto">
            <div className="relative group cursor-pointer w-full md:w-auto">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity" />
              <button
                onClick={() => router.push("/book-pilot")}
                className="relative w-full md:w-[148px] h-[54px] px-6 py-4 bg-[#ffffff1a] rounded-md backdrop-blur-md border border-white/20 hover:bg-[#ffffff26] transition-all flex items-center justify-center"
              >
                <span className="font-medium text-sm">Book a Pilot</span>
              </button>
            </div>
          </div>

          {/* --- VIDEO SECTION (YouTube embed instead of local file) --- */}
          <div id="demo" className="w-full max-w-[1240px] aspect-video md:h-[589px] mt-6 md:mt-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative bg-black">
            <iframe
              className="w-full h-full"
              src={YOUTUBE_EMBED_URL}
              title="Jataka Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>

        {/* --- Features (Bento Grid) --- */}
        <section id="features" className="w-full max-w-[1240px] px-4 mx-auto flex flex-col gap-[20px]">
          <SectionHeader subtitle="THE PLATFORM" title="Absolute Control Over AI Code" align="left" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
            {featureCards.map((card, i) => (
              <GradientBorder key={i} className="h-auto md:h-[378px] overflow-hidden">
                <div className="relative h-full p-6 md:p-9 flex flex-col justify-end">
                  <div className="relative z-10 flex flex-col gap-4 md:gap-6 mt-[180px]">
                    <div className="font-bold text-[#566fe9] tracking-widest text-xs uppercase">{card.title}</div>
                    <h3 className="text-xl md:text-2xl font-semibold bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent">
                      {card.subtitle}
                    </h3>
                    <p className="opacity-60 text-sm md:text-base leading-relaxed max-w-[500px]">{card.desc}</p>
                  </div>
                  <img src={card.img} alt={card.title} className="absolute top-6 left-6 w-auto h-[120px] md:h-[150px] opacity-80" />
                </div>
              </GradientBorder>
            ))}
          </div>

          {/* Full width card for 3rd Scene */}
          <GradientBorder className="h-auto lg:h-[380px] w-full overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center h-full p-6 md:p-9 gap-8 md:gap-12">
              <div className="flex flex-col gap-4 md:gap-6 lg:max-w-[50%]">
                <div className="font-bold text-[#566fe9] tracking-widest text-xs uppercase">3. SURVIVES THE ARENA</div>
                <h3 className="text-xl md:text-2xl font-semibold bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent">
                  Visual Verification
                </h3>
                <p className="opacity-60 text-sm md:text-base leading-relaxed">
                  Most testing tools look for code. Jataka looks at the screen. <br /><br />
                  Our autonomous pods execute full regression journeys like a real user. If a button changes color or ID, we auto-heal. If a business rule breaks, we kill the deployment.
                </p>
              </div>
              <div className="flex-grow flex justify-center lg:justify-end w-full">
                <img className="w-full max-w-[300px] md:max-w-[480px]" alt="Guardrail" src="https://c.animaapp.com/mik17n6qd0VDsr/img/image-container.png" />
              </div>
            </div>
          </GradientBorder>
        </section>

        {/* --- Footer (Restored Original) --- */}
        <footer id="manifesto" className="w-full flex flex-col items-center gap-16 px-4">
          <div className="flex flex-col items-center text-center gap-8 md:gap-10">
            <div className="font-bold text-[#566fe9] text-sm tracking-[2.80px]">THE JATAKA PROMISE</div>
            <h2 className="max-w-[900px] text-2xl md:text-[48px] font-semibold leading-tight bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent">
              <span className="block">We do not watch the agents.</span>
              <span className="block">We command them.</span>
            </h2>
            
            <div className="relative group mt-4 md:mt-8">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity" />
              <button
                onClick={() => router.push("/book-pilot")}
                className="relative w-[148px] h-[54px] bg-[#ffffff1a] rounded-md backdrop-blur-md border border-white/20 hover:bg-[#ffffff26] transition-all"
              >
                <span className="font-medium text-sm">Book a Pilot</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 pt-10 border-t border-white/5 w-full max-w-[400px]">
            <div className="flex flex-col items-center gap-2">
              <img className="h-12 w-auto" alt="Logo" src="jatakalogo.svg" />
              <span className="opacity-50 text-sm">by</span>
              <img className="h-8 w-auto" alt="Logo" src="shodhlogo.svg" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {["Privacy Policy", "Terms and conditions", "Contact"].map((link, i) => (
                <a key={i} href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};