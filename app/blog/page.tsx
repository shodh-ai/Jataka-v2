"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Play, Clock, Zap, Shield, BrainCircuit, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

// Scroll reveal hook
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Light grid background component
function LightGridBg() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(26,26,26,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(26,26,26,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px'
      }}
    />
  );
}

// Floating accent blob
function FloatingBlob({ className }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <div className="w-[300px] h-[300px] rounded-full bg-[#FF2424]/5 blur-[100px] animate-pulse" />
    </div>
  );
}

// Reveal wrapper component
function Reveal({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

export default function BlogPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const videoDemos = [
    {
      id: 1,
      slug: "catching-sev1-limits",
      title: "Catching Sev-1 Limits Before the Merge",
      subtitle: "The Governor Limit Savior",
      engine: "API Engine",
      duration: "2:45",
      summary: "Watch a developer make a critical mistake, placing a SOQL query inside a for loop. Jataka catches it before the merge, preventing a production incident.",
      keyResult: "147 SOQL queries detected. PR blocked automatically. Zero production impact.",
      icon: Zap,
      tags: ["Governor Limits", "API Engine", "PR Blocking", "SOQL Analysis"],
    },
    {
      id: 2,
      slug: "self-healing-ui-tests",
      title: "Self-Healing UI Tests",
      subtitle: "The Self-Healing UI",
      engine: "Kamikaze Engine",
      duration: "2:18",
      summary: "See what happens when Salesforce releases a UI update. Jataka's Vision AI automatically heals UI tests without human intervention.",
      keyResult: "200+ tests would break. With Jataka: 0 broken. 90% maintenance reduction.",
      icon: Shield,
      tags: ["Vision AI", "Self-Healing", "Playwright", "LWC Testing"],
    },
    {
      id: 3,
      slug: "blast-radius-prediction",
      title: "AI-Assisted Blast Radius Prediction",
      subtitle: "The Cursor/Knowledge Magic",
      engine: "Developer Experience",
      duration: "2:52",
      summary: "Watch a developer using Cursor IDE contemplate changing a critical Apex Trigger. Jataka calculates the blast radius before they even save the file.",
      keyResult: "3 classes, 12 flows, 2 integrations, 1 critical bug identified before coding.",
      icon: BrainCircuit,
      tags: ["Knowledge", "MCP", "Cursor IDE", "Dependency Graph"],
    }
  ];

  // JSON-LD Schema for hub page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Jataka Product Demos - Salesforce Development Tools",
    "description": "Watch Jataka demos: catching Governor Limits before merge, self-healing UI tests, and AI-assisted blast radius prediction for Salesforce development.",
    "url": "https://jataka.io/blog",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "url": "https://jataka.io/demos/catching-sev1-limits",
          "name": "Catching Sev-1 Limits Before the Merge"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "url": "https://jataka.io/demos/self-healing-ui-tests",
          "name": "Self-Healing UI Tests"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "url": "https://jataka.io/demos/blast-radius-prediction",
          "name": "AI-Assisted Blast Radius Prediction"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-[200] h-[64px] bg-[#FAF8F3]/90 backdrop-blur-[14px] border-b border-[#1a1a1a]/10 px-[24px] md:px-[48px] flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src="/Final-1 (6).svg" alt="Jataka" className="h-[22px] w-auto block" />
          </Link>
        </div>
        
        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
          <li><button onClick={() => router.push("/")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Home</button></li>
          <li><button onClick={() => router.push("/docs")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Docs</button></li>
          <li><button onClick={() => router.push("/use-cases")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</button></li>
          <li><button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book Demo</button></li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-[#1a1a1a] p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-[64px] left-0 w-full bg-[#FAF8F3] border-b border-[#1a1a1a]/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl z-[190]">
            <button onClick={() => router.push("/")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Home</button>
            <button onClick={() => router.push("/docs")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Docs</button>
            <button onClick={() => router.push("/use-cases")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Use Cases</button>
            <button onClick={() => router.push("/book-pilot")} className="w-full py-4 mt-2 rounded-md bg-[#FF2424] text-white font-archivo uppercase tracking-widest text-sm flex items-center justify-center">
              Book a Demo
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] pt-[120px] pb-[80px] overflow-hidden">
        <LightGridBg />
        <FloatingBlob className="top-[20%] right-[10%]" />
        <FloatingBlob className="bottom-[30%] left-[5%]" />
        
        <div className="relative z-10 max-w-[1000px]">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#666] mb-[40px]">
              01 ,  Product Demos
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-archivo text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] uppercase mb-[40px]">
              Three demos.
              <br />
              <span className="text-[#FF2424]">Zero generic tours.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[30px]">
              We don't do walkthroughs. Each demo shows a <strong className="text-[#1a1a1a] font-semibold">specific, painful scenario</strong>, and exactly how Jataka solves it in real-time.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-[clamp(16px,1.5vw,18px)] leading-[1.6] text-[#666] max-w-[600px]">
              All videos are under 3 minutes. No fluff. Just the problem, the solution, and the proof.
            </p>
          </Reveal>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── DEMO CARDS SECTION ── */}
      <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
        <LightGridBg />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-stretch">
            {videoDemos.map((demo) => {
              const IconComponent = demo.icon;
              
              return (
                <Reveal key={demo.id} delay={200} className="h-full min-h-0">
                  <button
                    onClick={() => router.push(`/demos/${demo.slug}`)}
                    className="group w-full h-full min-h-0 text-left bg-white rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_12px_40px_rgba(255,36,36,0.1)] hover:border-[#FF2424]/20 transition-all duration-300 flex flex-col"
                  >
                    {/* Video Preview Area */}
                    <div className="relative aspect-video shrink-0 bg-[#1a1a1a]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[56px] h-[56px] rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#FF2424]/80 transition-colors">
                          <Play className="w-[24px] h-[24px] text-white ml-[4px]" />
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute top-[12px] right-[12px] flex items-center gap-[6px] bg-[#1a1a1a]/80 backdrop-blur-sm text-white px-[10px] py-[5px] rounded-[4px] text-[10px] font-mono">
                        <Clock className="w-[10px] h-[10px]" />
                        <span>{demo.duration}</span>
                      </div>
                      
                      {/* Engine Badge */}
                      <div className="absolute top-[12px] left-[12px] bg-[#FF2424]/90 text-white px-[10px] py-[5px] rounded-[4px] text-[9px] font-medium uppercase tracking-[1px]">
                        {demo.engine}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-[24px] flex flex-col flex-1 min-h-0">
                      {/* Icon & Number */}
                      <div className="flex items-center justify-between mb-[16px] shrink-0">
                        <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center group-hover:bg-[#FF2424]/20 transition-colors">
                          <IconComponent className="w-[18px] h-[18px] text-[#FF2424]" />
                        </div>
                        <span className="font-archivo text-[32px] leading-[1] text-[#1a1a1a]/[0.05] group-hover:text-[#FF2424]/[0.1] transition-colors">
                          0{demo.id}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-archivo text-[18px] leading-[1.15] tracking-[-0.3px] uppercase mb-[6px] group-hover:text-[#FF2424] transition-colors shrink-0">
                        {demo.title}
                      </h2>
                      
                      {/* Subtitle */}
                      <p className="text-[13px] text-[#FF2424] font-medium mb-[12px] shrink-0">
                        {demo.subtitle}
                      </p>

                      {/* Summary */}
                      <p className="text-[14px] leading-[1.6] text-[#555] mb-[16px] shrink-0">
                        {demo.summary}
                      </p>

                      <div className="flex-1 flex flex-col min-h-0 gap-[16px]">
                        {/* Key Result */}
                        <div className="bg-[#FF2424]/5 rounded-[6px] p-[12px] flex-1 min-h-[4.5rem] flex items-start">
                          <p className="text-[12px] leading-[1.5] text-[#444]">
                            <strong className="text-[#FF2424]">Result:</strong> {demo.keyResult}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-[6px] content-start min-h-[3rem]">
                          {demo.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[9px] font-medium uppercase tracking-[0.5px] text-[#666] px-[8px] py-[4px] border border-[#1a1a1a]/10 rounded-[3px]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-[8px] text-[#FF2424] font-medium text-[13px] group-hover:gap-[12px] transition-all mt-auto pt-[16px] shrink-0">
                        Watch Demo
                        <ChevronRight className="w-[14px] h-[14px]" />
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative bg-[#1a1a1a] overflow-hidden">
        <LightGridBg />
        <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[100px] text-center">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
              Ready to See More?
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
              See it in your org.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
              Book a personalized demo. We'll run Jataka on your actual Salesforce codebase and show you exactly what it catches.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col md:flex-row gap-[16px] justify-center">
              <button 
                onClick={() => router.push("/book-pilot")} 
                className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
              >
                Book a Demo
                <svg className="w-[16px] h-[16px] group-hover:translate-x-[4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button 
                onClick={() => router.push("/docs")} 
                className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
              >
                Read the Docs
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
