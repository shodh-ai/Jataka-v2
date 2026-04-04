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
      summary: "Watch a developer make a critical mistake—placing a SOQL query inside a for loop. Jataka catches it before the merge, preventing a production incident.",
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
      subtitle: "The Cursor/Neo4j Magic",
      engine: "Developer Experience",
      duration: "2:52",
      summary: "Watch a developer using Cursor IDE contemplate changing a critical Apex Trigger. Jataka calculates the blast radius before they even save the file.",
      keyResult: "3 classes, 12 flows, 2 integrations, 1 critical bug identified before coding.",
      icon: BrainCircuit,
      tags: ["Neo4j", "MCP", "Cursor IDE", "Dependency Graph"],
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
        <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
          <svg className="h-[22px] w-auto block" viewBox="489.5 574 2305.4 484.92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M877.432 574C930.994 574 974.419 617.425 974.419 670.987C974.418 697.813 963.525 722.093 945.923 739.648C924.44 761.073 901.681 786.114 901.681 816.454C901.681 846.795 924.441 871.837 945.923 893.264C963.526 910.822 974.418 935.105 974.419 961.932C974.419 1015.49 930.994 1058.92 877.432 1058.92C850.604 1058.92 826.319 1048.02 808.76 1030.42C787.337 1008.94 762.298 986.181 731.959 986.181C701.621 986.181 676.582 1008.94 655.159 1030.42C637.6 1048.02 613.315 1058.92 586.487 1058.92C532.925 1058.92 489.5 1015.49 489.5 961.932C489.502 908.371 532.926 864.953 586.487 864.953C613.316 864.954 637.601 875.848 655.159 893.453C676.582 914.934 701.622 937.691 731.959 937.691C762.297 937.691 787.402 914.81 808.854 893.357C830.307 871.902 853.191 846.795 853.191 816.454C853.191 786.114 830.432 761.074 808.949 739.649C791.346 722.093 780.454 697.813 780.453 670.987C780.453 617.426 823.871 574.002 877.432 574Z" fill="#1a1a1a"/>
            <path d="M877.508 908.275C878.976 937.203 902.175 960.398 931.103 961.862L934.013 961.933C902.769 961.933 877.44 987.265 877.437 1018.51C877.435 987.266 852.105 961.933 820.862 961.933C852.106 961.931 877.437 936.601 877.437 905.358L877.508 908.275Z" fill="#FF2424"/>
            <path d="M1292.08 685.6V907.648C1292.08 932.992 1285.03 952.72 1270.92 966.832C1257.09 980.944 1237.36 988 1211.73 988H1156V931.84H1191.86C1204.53 931.84 1213.6 928.96 1219.08 923.2C1224.55 917.152 1227.28 907.792 1227.28 895.12V685.6H1292.08Z" fill="#1a1a1a"/>
            <path d="M1332.31 988L1442.9 685.6H1520.66L1630.39 988H1560.83L1537.51 921.904H1422.59L1399.27 988H1332.31ZM1439.87 869.632H1519.79L1479.62 754.72L1439.87 869.632Z" fill="#1a1a1a"/>
            <path d="M1621.19 685.6H1860.52V741.328H1773.26V988H1708.46V741.328H1621.19V685.6Z" fill="#1a1a1a"/>
            <path d="M1851.07 988L1961.66 685.6H2039.42L2149.15 988H2079.6L2056.27 921.904H1941.36L1918.03 988H1851.07ZM1958.64 869.632H2038.56L1998.38 754.72L1958.64 869.632Z" fill="#1a1a1a"/>
            <path d="M2199.4 686.032H2264.2V821.68L2385.16 686.032H2463.79L2352.76 810.448L2471.13 988H2393.37L2306.97 860.56L2264.2 908.512V988H2199.4V686.032Z" fill="#1a1a1a"/>
            <path d="M2496.82 988L2607.41 685.6H2685.17L2794.9 988H2725.35L2702.02 921.904H2587.11L2563.78 988H2496.82ZM2604.39 869.632H2684.31L2644.13 754.72L2604.39 869.632Z" fill="#1a1a1a"/>
          </svg>
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
              01 — Product Demos
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
              We don't do walkthroughs. Each demo shows a <strong className="text-[#1a1a1a] font-semibold">specific, painful scenario</strong>—and exactly how Jataka solves it in real-time.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {videoDemos.map((demo, index) => {
              const IconComponent = demo.icon;
              
              return (
                <Reveal key={demo.id} delay={index * 100}>
                  <button
                    onClick={() => router.push(`/demos/${demo.slug}`)}
                    className="group w-full text-left bg-white rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_12px_40px_rgba(255,36,36,0.1)] hover:border-[#FF2424]/20 transition-all duration-300"
                  >
                    {/* Video Preview Area */}
                    <div className="relative aspect-video bg-[#1a1a1a]">
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
                    <div className="p-[24px]">
                      {/* Icon & Number */}
                      <div className="flex items-center justify-between mb-[16px]">
                        <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center group-hover:bg-[#FF2424]/20 transition-colors">
                          <IconComponent className="w-[18px] h-[18px] text-[#FF2424]" />
                        </div>
                        <span className="font-archivo text-[32px] leading-[1] text-[#1a1a1a]/[0.05] group-hover:text-[#FF2424]/[0.1] transition-colors">
                          0{demo.id}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-archivo text-[18px] leading-[1.15] tracking-[-0.3px] uppercase mb-[6px] group-hover:text-[#FF2424] transition-colors">
                        {demo.title}
                      </h2>
                      
                      {/* Subtitle */}
                      <p className="text-[13px] text-[#FF2424] font-medium mb-[12px]">
                        {demo.subtitle}
                      </p>

                      {/* Summary */}
                      <p className="text-[14px] leading-[1.6] text-[#555] mb-[16px]">
                        {demo.summary}
                      </p>

                      {/* Key Result */}
                      <div className="bg-[#FF2424]/5 rounded-[6px] p-[12px] mb-[16px]">
                        <p className="text-[12px] leading-[1.5] text-[#444]">
                          <strong className="text-[#FF2424]">Result:</strong> {demo.keyResult}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-[6px] mb-[16px]">
                        {demo.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[9px] font-medium uppercase tracking-[0.5px] text-[#666] px-[8px] py-[4px] border border-[#1a1a1a]/10 rounded-[3px]">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-[8px] text-[#FF2424] font-medium text-[13px] group-hover:gap-[12px] transition-all">
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
