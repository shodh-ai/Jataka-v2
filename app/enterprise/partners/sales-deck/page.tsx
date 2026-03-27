"use client";

import React, { useEffect, useState, useRef } from "react";
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

// Animated counter
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal(0.5);

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <span ref={ref} className="font-archivo text-[#FF2424]">
      {count}{suffix}
    </span>
  );
}

// Scroll progress indicator
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[300] bg-transparent">
      <div 
        className="h-full bg-[#FF2424] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
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

export default function SalesDeckPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">
      <ScrollProgress />
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
        <button 
          onClick={() => router.push("/book-pilot")} 
          className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors"
        >
          Book a Pilot
        </button>
      </nav>

      {/* ── SECTION 1: THE BIG CHANGE ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] pt-[120px] pb-[80px] overflow-hidden">
        <LightGridBg />
        <FloatingBlob className="top-[20%] right-[10%]" />
        <FloatingBlob className="bottom-[30%] left-[5%]" />
        
        {/* Diagonal decorative line */}
        <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#FF2424]/20 to-transparent transform rotate-12" />
        
        <div className="relative z-10 max-w-[1000px]">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#666] mb-[40px]">
              01 — The Big Change
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-archivo text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] uppercase mb-[40px]">
              We have entered the
              <br />
              <span className="text-[#FF2424]">Era of AI-Generated Code.</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[60px]">
              Developers are using tools like <strong className="text-[#1a1a1a] font-semibold">Cursor</strong> and <strong className="text-[#1a1a1a] font-semibold">Agentforce</strong> to write and deploy code 10x faster than humans ever could.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-wrap gap-[32px] items-center mb-[50px]">
              <div className="flex items-center gap-[12px]">
                <svg className="w-[24px] h-[24px] text-[#00A1E0]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                <span className="text-[14px] text-[#666]">Salesforce</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <svg className="w-[24px] h-[24px] text-[#181717]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-[14px] text-[#666]">GitHub</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <svg className="w-[24px] h-[24px] text-[#000000]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 12.838 1.5 10.5 1.5c-4.678 0-8.5 3.832-8.5 8.5 0 1.016.18 1.99.516 2.89-.266.07-.516.197-.756.376C1.132 13.978 0 15.195 0 16.5c0 1.933 1.567 3.5 3.5 3.5.547 0 1.06-.126 1.516-.35.866.585 1.923.925 3.064.925h7.84c1.14 0 2.198-.34 3.064-.925.456.224.97.35 1.516.35 1.933 0 3.5-1.567 3.5-3.5 0-1.305-1.132-2.522-2.76-2.734-.24-.18-.49-.306-.756-.376.336-.9.516-1.874.516-2.89z"/>
                </svg>
                <span className="text-[14px] text-[#666]">Cursor</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <svg className="w-[24px] h-[24px] text-[#018BFF]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-[14px] text-[#666]">Neo4j</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] border-l-[3px] border-[#FF2424] pl-[24px]">
              But there is a massive problem: <strong className="text-[#1a1a1a] font-semibold">The speed of development has officially outpaced the safety of enterprise infrastructure.</strong>
            </p>
          </Reveal>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-[40px] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-[8px] animate-bounce">
          <span className="text-[10px] uppercase tracking-[2px] text-[#999]">Scroll</span>
          <svg className="w-[20px] h-[20px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ── SECTION 2: THE UNADDRESSED RISK ── */}
      <section className="relative px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] py-[100px] border-t border-[#1a1a1a]/10 overflow-hidden">
        <LightGridBg />
        
        {/* Large background text */}
        <div className="absolute top-[50%] right-[-10%] transform -translate-y-1/2 font-archivo text-[200px] md:text-[300px] text-[#1a1a1a]/[0.02] uppercase tracking-[-10px] pointer-events-none select-none">
          RISK
        </div>
        
        <div className="relative z-10 max-w-[1000px]">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#666] mb-[40px]">
              02 — The Unaddressed Risk
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[30px]">
              Syntax is perfect.
              <br />
              <span className="text-[#FF2424]">Runtime is fatal.</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[700px] mb-[60px]">
              In modern Salesforce environments, code rarely fails in isolation. A single deployment interacts with years of legacy Triggers, complex Flows, and heavy Managed Packages.
            </p>
          </Reveal>

          <div className="space-y-[40px]">
            <Reveal delay={300}>
              <div className="group flex gap-[30px] items-start p-[24px] rounded-[8px] hover:bg-[#1a1a1a]/[0.02] transition-all duration-300 cursor-default">
                <span className="text-[#FF2424] text-[24px] mt-[2px] group-hover:translate-x-[8px] transition-transform">→</span>
                <div>
                  <h3 className="font-archivo text-[18px] uppercase tracking-[0.5px] mb-[8px]">The Test Passes</h3>
                  <p className="text-[16px] leading-[1.6] text-[#555]">When tested in a vacuum, the code passes. Unit tests green. Static analysis clean.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="group flex gap-[30px] items-start p-[24px] rounded-[8px] hover:bg-[#1a1a1a]/[0.02] transition-all duration-300 cursor-default">
                <span className="text-[#FF2424] text-[24px] mt-[2px] group-hover:translate-x-[8px] transition-transform">→</span>
                <div>
                  <h3 className="font-archivo text-[18px] uppercase tracking-[0.5px] mb-[8px]">Reality Hits</h3>
                  <p className="text-[16px] leading-[1.6] text-[#555]">When subjected to real-world data volumes, it triggers cascading loops and breaches governor limits.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="group flex gap-[30px] items-start p-[24px] rounded-[8px] bg-[#FF2424]/5 border border-[#FF2424]/10 hover:bg-[#FF2424]/10 transition-all duration-300 cursor-default">
                <span className="text-[#FF2424] text-[24px] mt-[2px] group-hover:translate-x-[8px] transition-transform">→</span>
                <div>
                  <h3 className="font-archivo text-[18px] uppercase tracking-[0.5px] mb-[8px] text-[#FF2424]">Production Crashes</h3>
                  <p className="text-[16px] leading-[1.6] text-[#555]">The cost of catching these failures in Production is measured in <strong className="text-[#1a1a1a]">destroyed profit margins</strong> and <strong className="text-[#1a1a1a]">lost client trust</strong>.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE PROMISED LAND ── */}
      <section className="relative px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] py-[100px] border-t border-[#1a1a1a]/10 bg-[#F5F0E8] overflow-hidden">
        <LightGridBg />
        
        {/* Stats bar */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#1a1a1a]/10" />
        <div className="absolute top-0 left-0 h-[3px] bg-[#FF2424] transition-all duration-1000" style={{ width: '60%' }} />
        
        <div className="relative z-10 max-w-[1000px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-start">
            <div>
              <Reveal>
                <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#666] mb-[40px]">
                  03 — The Promised Land
                </p>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-1.5px] uppercase mb-[40px]">
                  Imagine deploying at the
                  <br />
                  speed of AI, with
                  <br />
                  <span className="text-[#FF2424]">zero fear of rollbacks.</span>
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[640px] mb-[50px]">
                  What if you could <strong className="text-[#1a1a1a] font-semibold">mathematically guarantee</strong> that a governor limit breach would never reach your Production org again?
                </p>
              </Reveal>
            </div>
            
            {/* Simple stats without animation */}
            <div className="lg:pt-[100px]">
              <Reveal delay={300}>
                <div className="bg-white rounded-[12px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5">
                  <div className="grid grid-cols-2 gap-[32px]">
                    <div className="text-center">
                      <div className="font-archivo text-[42px] text-[#FF2424] mb-[8px]">
                        0
                      </div>
                      <p className="text-[12px] uppercase tracking-[1px] text-[#666]">Weekend Rollbacks</p>
                    </div>
                    <div className="text-center">
                      <div className="font-archivo text-[42px] text-[#FF2424] mb-[8px]">
                        24/7
                      </div>
                      <p className="text-[12px] uppercase tracking-[1px] text-[#666]">Monitoring</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={400}>
            <div className="flex flex-wrap gap-[40px] mt-[60px]">
              <div className="flex items-center gap-[12px] group cursor-default">
                <span className="w-[8px] h-[8px] bg-[#FF2424] rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="text-[16px] text-[#444]">No more weekend rollbacks</span>
              </div>
              <div className="flex items-center gap-[12px] group cursor-default">
                <span className="w-[8px] h-[8px] bg-[#FF2424] rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="text-[16px] text-[#444]">No more destroyed profit margins</span>
              </div>
              <div className="flex items-center gap-[12px] group cursor-default">
                <span className="w-[8px] h-[8px] bg-[#FF2424] rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="text-[16px] text-[#444]">Pure, uncompromised velocity</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 4: INTRODUCING JATAKA ── */}
      <section className="relative px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] py-[100px] border-t border-[#1a1a1a]/10 overflow-hidden">
        <LightGridBg />
        
        {/* Large watermark */}
        <div className="absolute top-[50%] left-[-5%] transform -translate-y-1/2 font-archivo text-[180px] md:text-[250px] text-[#1a1a1a]/[0.02] uppercase tracking-[-10px] pointer-events-none select-none">
          FIREWALL
        </div>
        
        <div className="relative z-10 max-w-[1000px]">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#666] mb-[40px]">
              04 — Introducing Jataka
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[30px]">
              Meet Jataka.
              <br />
              <span className="text-[#FF2424]">The Pre-Production Runtime Firewall.</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[60px]">
              Jataka is the bridge to the Promised Land. <strong className="text-[#1a1a1a] font-semibold">We don't just read your code; we execute it.</strong>
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <Reveal delay={300}>
              <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 cursor-default">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center mb-[20px] group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888] mb-[12px]">Kamikaze Pod</p>
                <p className="text-[15px] leading-[1.7] text-[#444]">
                  When a PR is opened, Jataka spawns an isolated pod, executes the transaction, and blocks the merge if limits hit 90%.
                </p>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 cursor-default">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center mb-[20px] group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888] mb-[12px]">Tooling API</p>
                <p className="text-[15px] leading-[1.7] text-[#444]">
                  Correlates every UI click with the Salesforce Tooling API to profile async Governor Limits in real-time.
                </p>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 cursor-default">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center mb-[20px] group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888] mb-[12px]">Neo4j + MCP</p>
                <p className="text-[15px] leading-[1.7] text-[#444]">
                  Dependency Graph feeds your architecture into Cursor via MCP, stopping conflicting logic before it's saved.
                </p>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 cursor-default">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center mb-[20px] group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888] mb-[12px]">Autonomous AI Healer</p>
                <p className="text-[15px] leading-[1.7] text-[#444]">
                  Jataka doesn't just block bad code; it writes and patches failing tests automatically, healing 80% of issues without human intervention.
                </p>
              </div>
            </Reveal>

            <Reveal delay={700}>
              <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 cursor-default">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center mb-[20px] group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888] mb-[12px]">Slack Bot</p>
                <p className="text-[15px] leading-[1.7] text-[#444]">
                  Acts as the "Company Brain" for junior devs, providing instant answers about architecture patterns and preventing common mistakes.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: VIDEO DEMO ── */}
      <section className="relative px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] py-[100px] border-t border-[#1a1a1a]/10 bg-[#1a1a1a] overflow-hidden">
        <LightGridBg />
        <div className="relative z-10 max-w-[1000px]">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[40px]">
              See It In Action
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
              Watch The Demo.
            </h2>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#999] max-w-[600px] mb-[60px]">
              See how Jataka catches governor limit breaches before they reach Production.
            </p>
          </Reveal>

          <Reveal delay={300}>
            {/* Video Placeholder */}
            <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-[12px] overflow-hidden border border-[#333] group cursor-pointer">
              {/* Video Player UI */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-[100px] h-[100px] rounded-full bg-[#FF2424] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-[40px] h-[40px] text-white ml-[6px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-[20px] left-[20px] flex gap-[8px]">
                <div className="w-[12px] h-[12px] rounded-full bg-[#FF2424]/30"></div>
                <div className="w-[12px] h-[12px] rounded-full bg-[#FF2424]/20"></div>
                <div className="w-[12px] h-[12px] rounded-full bg-[#FF2424]/10"></div>
              </div>
              
              <div className="absolute bottom-[20px] left-[20px] right-[20px]">
                <div className="h-[4px] bg-[#333] rounded-full overflow-hidden">
                  <div className="h-full w-[0%] bg-[#FF2424] rounded-full"></div>
                </div>
                <div className="flex justify-between mt-[12px] text-[12px] text-[#666] font-mono">
                  <span>0:00</span>
                  <span>Jataka Runtime Firewall Demo</span>
                  <span>2:34</span>
                </div>
              </div>

              {/* Grid overlay on video */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,36,36,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,36,36,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '32px 32px'
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 6: BUSINESS OUTCOME & ASK ── */}
      <section className="relative px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] py-[100px] border-t border-[#1a1a1a]/10 bg-[#F5F0E8] overflow-hidden">
        <LightGridBg />
        
        {/* Large watermark */}
        <div className="absolute top-[50%] right-[-10%] transform -translate-y-1/2 font-archivo text-[180px] md:text-[250px] text-[#1a1a1a]/[0.02] uppercase tracking-[-10px] pointer-events-none select-none">
          RESULTS
        </div>
        
        <div className="relative z-10 max-w-[1000px]">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#666] mb-[40px]">
              05 — The Outcome
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[50px]">
              Deploy with
              <br />
              <span className="text-[#FF2424]">absolute certainty.</span>
            </h2>
          </Reveal>

          <div className="space-y-[30px] mb-[80px]">
            <Reveal delay={200}>
              <div className="group flex items-start gap-[20px] p-[24px] rounded-[8px] hover:bg-white/50 transition-all duration-300">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[18px] leading-[1.6] text-[#444]">
                    <strong className="text-[#1a1a1a] font-semibold">Eliminate Rollbacks.</strong> Stop limit-based deployment failures before they reach Production.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="group flex items-start gap-[20px] p-[24px] rounded-[8px] hover:bg-white/50 transition-all duration-300">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[18px] leading-[1.6] text-[#444]">
                    <strong className="text-[#1a1a1a] font-semibold">Protect Margins.</strong> Guarantee uptime and protect US/EU client revenue from Sev-1 outages.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="group flex items-start gap-[20px] p-[24px] rounded-[8px] hover:bg-white/50 transition-all duration-300">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[18px] leading-[1.6] text-[#444]">
                    <strong className="text-[#1a1a1a] font-semibold">Shift-Left Guardrails.</strong> Increase offshore developer velocity with our free IDE plugin.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* CTA */}
          <Reveal delay={500}>
            <div className="pt-[40px] border-t border-[#1a1a1a]/20">
              <div className="bg-white rounded-[16px] p-[40px] md:p-[60px] shadow-[0_8px_40px_rgba(0,0,0,0.05)] border border-[#1a1a1a]/5">
                <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[20px]">
                  Limited Availability
                </p>
                <h3 className="font-archivo text-[clamp(28px,3.5vw,42px)] leading-[1] tracking-[-1px] uppercase mb-[20px]">
                  Book a 14 Day Pilot
                </h3>
                <p className="text-[17px] leading-[1.6] text-[#555] max-w-[500px] mb-[30px]">
                  Join the enterprise teams who have eliminated production rollbacks. Experience the Runtime Firewall firsthand.
                </p>
                <button 
                  onClick={() => router.push("/book-pilot")}
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center gap-[12px]"
                >
                  Book a 14 Day Pilot
                  <svg className="w-[16px] h-[16px] group-hover:translate-x-[4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1a1a1a]/10 px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] py-[40px] flex flex-col md:flex-row items-center justify-between gap-[20px]">
        <div className="flex items-center gap-[14px]">
          <svg className="h-[18px] w-auto" viewBox="489.5 574 2305.4 484.92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M877.432 574C930.994 574 974.419 617.425 974.419 670.987C974.418 697.813 963.525 722.093 945.923 739.648C924.44 761.073 901.681 786.114 901.681 816.454C901.681 846.795 924.441 871.837 945.923 893.264C963.526 910.822 974.418 935.105 974.419 961.932C974.419 1015.49 930.994 1058.92 877.432 1058.92C850.604 1058.92 826.319 1048.02 808.76 1030.42C787.337 1008.94 762.298 986.181 731.959 986.181C701.621 986.181 676.582 1008.94 655.159 1030.42C637.6 1048.02 613.315 1058.92 586.487 1058.92C532.925 1058.92 489.5 1015.49 489.5 961.932C489.502 908.371 532.926 864.953 586.487 864.953C613.316 864.954 637.601 875.848 655.159 893.453C676.582 914.934 701.622 937.691 731.959 937.691C762.297 937.691 787.402 914.81 808.854 893.357C830.307 871.902 853.191 846.795 853.191 816.454C853.191 786.114 830.432 761.074 808.949 739.649C791.346 722.093 780.454 697.813 780.453 670.987C780.453 617.426 823.871 574.002 877.432 574Z" fill="#1a1a1a"/>
            <path d="M877.508 908.275C878.976 937.203 902.175 960.398 931.103 961.862L934.013 961.933C902.769 961.933 877.44 987.265 877.437 1018.51C877.435 987.266 852.105 961.933 820.862 961.933C852.106 961.931 877.437 936.601 877.437 905.358L877.508 908.275Z" fill="#FF2424"/>
            <path d="M1292.08 685.6V907.648C1292.08 932.992 1285.03 952.72 1270.92 966.832C1257.09 980.944 1237.36 988 1211.73 988H1156V931.84H1191.86C1204.53 931.84 1213.6 928.96 1219.08 923.2C1224.55 917.152 1227.28 907.792 1227.28 895.12V685.6H1292.08Z" fill="#1a1a1a"/>
            <path d="M1332.31 988L1442.9 685.6H1520.66L1630.39 988H1560.83L1537.51 921.904H1422.59L1399.27 988H1332.31ZM1439.87 869.632H1519.79L1479.62 754.72L1439.87 869.632Z" fill="#1a1a1a"/>
            <path d="M1621.19 685.6H1860.52V741.328H1773.26V988H1708.46V741.328H1621.19V685.6Z" fill="#1a1a1a"/>
            <path d="M1851.07 988L1961.66 685.6H2039.42L2149.15 988H2079.6L2056.27 921.904H1941.36L1918.03 988H1851.07ZM1958.64 869.632H2038.56L1998.38 754.72L1958.64 869.632Z" fill="#1a1a1a"/>
            <path d="M2199.4 686.032H2264.2V821.68L2385.16 686.032H2463.79L2352.76 810.448L2471.13 988H2393.37L2306.97 860.56L2264.2 908.512V988H2199.4V686.032Z" fill="#1a1a1a"/>
            <path d="M2496.82 988L2607.41 685.6H2685.17L2794.9 988H2725.35L2702.02 921.904H2587.11L2563.78 988H2496.82ZM2604.39 869.632H2684.31L2644.13 754.72L2604.39 869.632Z" fill="#1a1a1a"/>
          </svg>
          <span className="text-[11px] font-medium uppercase tracking-[2px] text-[#888]">Runtime Governance Engine</span>
        </div>
        <div className="text-[12px] text-[#888]">
          © 2025 Jataka
        </div>
      </footer>
    </div>
  );
}
