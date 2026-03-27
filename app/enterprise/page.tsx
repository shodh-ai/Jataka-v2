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

          <Reveal delay={200}>
            <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[50px]">
              Your development teams are using <strong className="text-[#1a1a1a] font-semibold">Cursor</strong> and <strong className="text-[#1a1a1a] font-semibold">Agentforce</strong> to ship features at unprecedented velocity. But every deployment carries an invisible risk.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] border-l-[3px] border-[#FF2424] pl-[24px]">
              <strong className="text-[#1a1a1a] font-semibold">The speed of AI-generated code has outpaced your governance framework.</strong> Without runtime validation, you're flying blind.
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
                  <p className="text-[16px] leading-[1.6] text-[#555]">When governor limits breach in Production, the impact is immediate: <strong className="text-[#1a1a1a]">revenue-impacting downtime</strong>, <strong className="text-[#1a1a1a]">failed compliance audits</strong>, and <strong className="text-[#1a1a1a]">C-suite visibility into platform instability</strong>.</p>
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
            
            {/* Animated stats - only showing 0 and 24/7 */}
            <div className="lg:pt-[100px]">
              <Reveal delay={300}>
                <div className="bg-white rounded-[12px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5">
                  <div className="grid grid-cols-2 gap-[32px]">
                    <div className="text-center">
                      <div className="font-archivo text-[42px] text-[#FF2424] mb-[8px]">
                        <AnimatedCounter end={0} />
                      </div>
                      <p className="text-[12px] uppercase tracking-[1px] text-[#666]">Weekend Rollbacks</p>
                    </div>
                    <div className="text-center">
                      <div className="font-archivo text-[42px] text-[#FF2424] mb-[8px]">
                        <AnimatedCounter end={24} suffix="/7" />
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
                <span className="text-[16px] text-[#444]">Zero Production Incidents</span>
              </div>
              <div className="flex items-center gap-[12px] group cursor-default">
                <span className="w-[8px] h-[8px] bg-[#FF2424] rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="text-[16px] text-[#444]">SOC 2 & Compliance Ready</span>
              </div>
              <div className="flex items-center gap-[12px] group cursor-default">
                <span className="w-[8px] h-[8px] bg-[#FF2424] rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="text-[16px] text-[#444]">Enterprise-grade governance</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TRUST LOGOS SECTION ── */}
      <section className="relative px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] py-[60px] border-t border-[#1a1a1a]/10 bg-white overflow-hidden">
        <LightGridBg />
        <div className="relative z-10 max-w-[1000px]">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[3px] text-[#888] mb-[40px] text-center">
              Seamlessly integrates with your stack
            </p>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-[60px] md:gap-[80px]">
              {/* Salesforce Logo */}
              <div className="group flex flex-col items-center gap-[12px] opacity-60 hover:opacity-100 transition-opacity">
                <svg className="w-[48px] h-[48px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.764 34.286C10.764 34.286 10.764 34.286 10.764 34.286C10.764 34.286 10.764 34.286 10.764 34.286C10.764 34.286 10.764 34.286 10.764 34.286C10.764 34.286 10.764 34.286 10.764 34.286C10.764 34.286 10.764 34.286 10.764 34.286C10.764 34.286 10.764 34.286 10.764 34.286C10.764 34.286 10.764 34.286 10.764 34.286Z" fill="#00A1E0"/>
                  <path d="M36.336 14.976C33.84 12.48 30.336 11.232 26.832 11.952C25.584 7.248 21.36 3.744 16.272 3.744C10.224 3.744 5.136 7.968 3.888 13.728C1.68 14.256 0 16.32 0 18.72C0 21.504 2.256 23.76 5.04 23.76C5.328 23.76 5.616 23.76 5.904 23.664C7.536 28.464 12.048 31.968 17.328 31.968C20.544 31.968 23.472 30.72 25.584 28.608C27.216 30.24 29.52 31.2 32.016 31.2C37.728 31.2 42.336 26.592 42.336 20.88C42.336 18.384 41.376 15.984 39.744 14.208C38.496 14.592 37.248 14.784 36.336 14.976Z" fill="#00A1E0"/>
                  <circle cx="17.5" cy="19" r="2.5" fill="white"/>
                  <circle cx="25.5" cy="19" r="2.5" fill="white"/>
                  <path d="M21 23.5C21 23.5 22.5 25.5 25 25.5C27.5 25.5 29 23.5 29 23.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="text-[10px] uppercase tracking-[1px] text-[#666]">Salesforce</span>
              </div>
              
              {/* GitHub Logo */}
              <div className="group flex flex-col items-center gap-[12px] opacity-60 hover:opacity-100 transition-opacity">
                <svg className="w-[48px] h-[48px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 33.08 10.16 40.64 18.64 43.04C19.76 43.24 20.16 42.52 20.16 41.92V38.2C14.5 39.3 13.1 35.3 13.1 35.3C12.04 32.76 10.5 32.04 10.5 32.04C8.38 30.6 10.68 30.64 10.68 30.64C13.04 30.8 14.3 33.08 14.3 33.08C16.42 36.56 19.72 35.6 21 35.04C21.2 33.68 21.78 32.74 22.4 32.2C17.56 31.66 12.52 29.72 12.52 21.84C12.52 19.48 13.42 17.56 14.86 16.02C14.62 15.48 13.82 13.18 14.98 10.08C14.98 10.08 16.94 9.46 21 12.26C22.86 11.8 24.88 11.54 26.9 11.54C28.92 11.54 30.94 11.8 32.8 12.26C36.86 9.46 38.82 10.08 38.82 10.08C39.98 13.18 39.18 15.48 38.94 16.02C40.38 17.58 41.28 19.5 41.28 21.84C41.28 29.74 36.22 31.64 31.36 32.18C32.16 32.86 32.84 34.18 32.84 36.22V41.92C32.84 42.54 33.24 43.26 34.38 43.04C42.84 40.64 49 33.08 49 24C48 12.96 39.04 4 24 4Z" fill="#1a1a1a"/>
                </svg>
                <span className="text-[10px] uppercase tracking-[1px] text-[#666]">GitHub</span>
              </div>
              
              {/* Cursor Logo */}
              <div className="group flex flex-col items-center gap-[12px] opacity-60 hover:opacity-100 transition-opacity">
                <svg className="w-[48px] h-[48px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="8" width="32" height="32" rx="6" fill="#1a1a1a"/>
                  <path d="M16 16L24 24L16 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M26 32H32" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <span className="text-[10px] uppercase tracking-[1px] text-[#666]">Cursor</span>
              </div>
              
              {/* Neo4j Logo */}
              <div className="group flex flex-col items-center gap-[12px] opacity-60 hover:opacity-100 transition-opacity">
                <svg className="w-[48px] h-[48px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="8" fill="#008CC1"/>
                  <circle cx="34" cy="30" r="8" fill="#008CC1"/>
                  <path d="M24 24L28 26" stroke="#F7941D" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="3" fill="#F7941D"/>
                  <circle cx="12" cy="36" r="5" fill="#66B245"/>
                </svg>
                <span className="text-[10px] uppercase tracking-[1px] text-[#666]">Neo4j</span>
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
              <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 cursor-default h-full">
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
              <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 cursor-default h-full">
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
              <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 cursor-default h-full">
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
              <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 cursor-default h-full">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center mb-[20px] group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888] mb-[12px]">Autonomous AI Healer</p>
                <p className="text-[15px] leading-[1.7] text-[#444]">
                  Jataka doesn't just block bad code; it writes and patches failing tests automatically. Our AI heals 80% of issues without human intervention.
                </p>
              </div>
            </Reveal>

            <Reveal delay={700}>
              <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 cursor-default h-full">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center mb-[20px] group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1 1 0 01-1-1v-6a1 1 0 011-1h10a1 1 0 011-1V8a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v.01M8 10v.01M16 10v.01" />
                  </svg>
                </div>
                <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888] mb-[12px]">Slack Company Brain</p>
                <p className="text-[15px] leading-[1.7] text-[#444]">
                  Jataka acts as your team's "Company Brain" in Slack. Junior developers get instant answers about your codebase, architecture, and best practices—no senior dev required.
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
              Protect your
              <br />
              <span className="text-[#FF2424]">revenue engine.</span>
              <br />
              <span className="text-[#1a1a1a]">Govern with confidence.</span>
            </h2>
          </Reveal>

          <div className="space-y-[30px] mb-[80px]">
            <Reveal delay={200}>
              <div className="group flex items-start gap-[20px] p-[24px] rounded-[8px] hover:bg-white/50 transition-all duration-300">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[18px] leading-[1.6] text-[#444]">
                    <strong className="text-[#1a1a1a] font-semibold">Eliminate Revenue Risk.</strong> Stop Salesforce outages before they impact your sales, CPQ, and service operations. Guaranteed uptime for business-critical workflows.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="group flex items-start gap-[20px] p-[24px] rounded-[8px] hover:bg-white/50 transition-all duration-300">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[18px] leading-[1.6] text-[#444]">
                    <strong className="text-[#1a1a1a] font-semibold">Enterprise Compliance.</strong> Pass SOC 2, HIPAA, and regulatory audits with automated runtime governance and complete deployment traceability.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="group flex items-start gap-[20px] p-[24px] rounded-[8px] hover:bg-white/50 transition-all duration-300">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF2424]/20 transition-colors">
                  <svg className="w-[24px] h-[24px] text-[#FF2424]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-[18px] leading-[1.6] text-[#444]">
                    <strong className="text-[#1a1a1a] font-semibold">Velocity Without Compromise.</strong> Enable AI-powered development across your entire organization without sacrificing security, stability, or architectural standards.
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
