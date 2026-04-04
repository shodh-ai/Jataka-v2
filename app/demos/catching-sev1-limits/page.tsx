"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Zap, Clock, ArrowLeft, ChevronRight } from "lucide-react";
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

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Catching Sev-1 Limits Before the Merge - Jataka Demo",
  "description": "Watch Jataka catch a SOQL query inside a for loop before it causes a production incident. Real-time limit profiling during PR review with automatic merge blocking.",
  "thumbnailUrl": "https://jataka.io/thumbnails/catching-sev1-limits.png",
  "uploadDate": "2024-01-15",
  "duration": "PT2M45S",
  "contentUrl": "https://www.youtube.com/watch?v=SdXRbVhZMzg",
  "embedUrl": "https://www.youtube.com/embed/SdXRbVhZMzg",
  "publisher": {
    "@type": "Organization",
    "name": "Jataka",
    "logo": {
      "@type": "ImageObject",
      "url": "https://jataka.io/logo.png"
    }
  },
  "about": {
    "@type": "SoftwareApplication",
    "name": "Jataka",
    "applicationCategory": "DeveloperApplication"
  }
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://jataka.io"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Demos",
      "item": "https://jataka.io/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Catching Sev-1 Limits",
      "item": "https://jataka.io/demos/catching-sev1-limits"
    }
  ]
};

export default function CatchingSev1LimitsDemo() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const keyTakeaways = [
    {
      title: "Real-time Limit Profiling",
      description: "Jataka profiles Governor Limits during PR review, not after deployment. Every SOQL query, DML statement, and CPU millisecond is measured in a real execution environment."
    },
    {
      title: "Automatic Merge Blocking",
      description: "When a threshold is breached, the PR is automatically blocked. No manual intervention required. The developer gets immediate feedback with a detailed limit report."
    },
    {
      title: "Line-by-Line Attribution",
      description: "Jataka tells you exactly which line caused the breach. No more hunting through debug logs trying to find the culprit."
    },
    {
      title: "Zero False Positives",
      description: "We don't estimate. We execute. If we say you're at 147/100 SOQL queries, that's a measured fact from actual execution, not a static analysis guess."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Developer Pushes Code",
      description: "A developer pushes a PR containing a SOQL query inside a for loop. The code compiles. Tests pass. Everything looks fine."
    },
    {
      step: 2,
      title: "Kamikaze Pod Spins Up",
      description: "Jataka receives the webhook and spins up an isolated Sandbox environment with Production-like data volumes."
    },
    {
      step: 3,
      title: "Real Transaction Execution",
      description: "The Apex code is executed against actual Sandbox data volumes. Triggers fire. Flows run. The SOQL query inside the for loop is physically executed 147 times."
    },
    {
      step: 4,
      title: "Limit Headers Parsed",
      description: "Jataka parses the Sforce-Limit-Info headers from the debug logs. The result: 147 SOQL queries against a limit of 100."
    },
    {
      step: 5,
      title: "PR Blocked Automatically",
      description: "The PR status is set to failed. A detailed limit report is posted as a PR comment showing exactly which line caused the breach."
    },
    {
      step: 6,
      title: "Developer Fixes & Repushes",
      description: "The developer sees the report, moves the SOQL outside the loop, and repushes. This time, the PR passes."
    }
  ];

  const relatedDemos = [
    { slug: "self-healing-ui-tests", title: "Self-Healing UI Tests", duration: "2:18" },
    { slug: "blast-radius-prediction", title: "Blast Radius Prediction", duration: "2:52" },
  ];

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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
            <li><button onClick={() => router.push("/blog")} className="text-[#1a1a1a] font-medium text-[13.5px] tracking-[0.4px]">Demos</button></li>
            <li><button onClick={() => router.push("/use-cases")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</button></li>
            <li><button onClick={() => router.push("/docs")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Docs</button></li>
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
              <button onClick={() => router.push("/blog")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Demos</button>
              <button onClick={() => router.push("/use-cases")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Use Cases</button>
              <button onClick={() => router.push("/docs")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Docs</button>
              <button onClick={() => router.push("/book-pilot")} className="w-full py-4 mt-2 rounded-md bg-[#FF2424] text-white font-archivo uppercase tracking-widest text-sm flex items-center justify-center">
                Book a Demo
              </button>
            </div>
          )}
        </nav>

        {/* ── HERO SECTION ── */}
        <section className="relative min-h-[60vh] flex flex-col justify-center px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] pt-[120px] pb-[60px] overflow-hidden">
          <LightGridBg />
          <FloatingBlob className="top-[20%] right-[10%]" />
          <FloatingBlob className="bottom-[30%] left-[5%]" />
          
          <div className="relative z-10 max-w-[1000px]">
            {/* Back Link */}
            <Reveal>
              <button 
                onClick={() => router.push("/blog")} 
                className="flex items-center gap-[8px] text-[#666] hover:text-[#FF2424] transition-colors mb-[40px] text-[14px]"
              >
                <ArrowLeft className="w-[14px] h-[14px]" />
                Back to All Demos
              </button>
            </Reveal>

            <Reveal delay={50}>
              <div className="flex items-center gap-[16px] mb-[30px]">
                <div className="w-[56px] h-[56px] rounded-[12px] bg-[#FF2424]/10 flex items-center justify-center">
                  <Zap className="w-[24px] h-[24px] text-[#FF2424]" />
                </div>
                <div>
                  <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888]">Demo 01</p>
                  <p className="text-[14px] text-[#FF2424] font-medium">API Engine</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px]">
                Catching Sev-1 Limits<br />
                <span className="text-[#FF2424]">Before the Merge</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[20px]">
                Watch a developer make a critical mistake—placing a SOQL query inside a for loop. 
                <strong className="text-[#1a1a1a] font-semibold"> Jataka catches it before the merge, preventing a production incident.</strong>
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex items-center gap-[16px] text-[14px] text-[#666]">
                <div className="flex items-center gap-[6px]">
                  <Clock className="w-[14px] h-[14px]" />
                  <span>2:45</span>
                </div>
                <span className="text-[#1a1a1a]/20">|</span>
                <span>Governor Limits • PR Blocking • SOQL Analysis</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── VIDEO SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden bg-[#F5F0E8]">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px]">
            <Reveal>
              <div className="relative aspect-video bg-[#1a1a1a] rounded-[12px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/SdXRbVhZMzg"
                  title="Catching Sev-1 Limits Before the Merge"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── THE SCENARIO SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">The Scenario</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(32px,4.5vw,48px)] leading-[1] tracking-[-1.5px] uppercase mb-[40px]">
                What you'll see<br />
                <span className="text-[#FF2424]">in this demo.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-white rounded-[12px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 mb-[40px]">
                <p className="text-[17px] leading-[1.7] text-[#444] mb-[24px]">
                  The developer pushes the code to GitHub. Within 5 seconds, Jataka's Kamikaze Pod spins up, 
                  executes the transaction in an isolated Sandbox, and parses the Sforce-Limit-Info headers.
                </p>
                <p className="text-[17px] leading-[1.7] text-[#444] mb-[24px]">
                  <strong className="text-[#FF2424]">The result:</strong> 147 SOQL queries against a limit of 100. 
                </p>
                <p className="text-[17px] leading-[1.7] text-[#444]">
                  The PR is automatically blocked with a detailed limit report showing exactly which line caused the breach.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <div className="bg-[#FF2424]/5 border-l-[3px] border-[#FF2424] p-[24px] rounded-[4px]">
                  <p className="text-[14px] font-medium uppercase tracking-[1px] text-[#FF2424] mb-[12px]">Without Jataka</p>
                  <p className="text-[15px] leading-[1.7] text-[#444]">
                    Code deploys to production. During peak hours, the sales portal crashes. Sev-1 incident. 
                    4-8 hours to rollback and restore. $50K+/hr in lost revenue.
                  </p>
                </div>
                <div className="bg-[#1a1a1a]/5 border-l-[3px] border-[#1a1a1a] p-[24px] rounded-[4px]">
                  <p className="text-[14px] font-medium uppercase tracking-[1px] text-[#1a1a1a] mb-[12px]">With Jataka</p>
                  <p className="text-[15px] leading-[1.7] text-[#444]">
                    PR is blocked before merge. Developer gets instant feedback. Fixes the issue in 5 minutes. 
                    Zero production impact. Zero revenue lost.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── HOW IT WORKS SECTION ── */}
        <section className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">How It Works</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(32px,4.5vw,48px)] leading-[1] tracking-[-1.5px] uppercase mb-[60px]">
                Six steps to<br />
                <span className="text-[#FF2424]">zero Sev-1s.</span>
              </h2>
            </Reveal>

            <div className="space-y-[24px]">
              {howItWorks.map((step, index) => (
                <Reveal key={step.step} delay={200 + index * 50}>
                  <div className="flex gap-[20px] items-start">
                    <div className="flex-shrink-0 w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
                      <span className="font-archivo text-[16px] text-[#FF2424]">{step.step}</span>
                    </div>
                    <div className="flex-1 pt-[6px]">
                      <h3 className="font-archivo text-[16px] uppercase tracking-[0.5px] mb-[6px]">
                        {step.title}
                      </h3>
                      <p className="text-[15px] leading-[1.7] text-[#555]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── KEY TAKEAWAYS SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">Key Takeaways</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(32px,4.5vw,48px)] leading-[1] tracking-[-1.5px] uppercase mb-[60px]">
                What makes this<br />
                <span className="text-[#FF2424]">different.</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {keyTakeaways.map((takeaway, index) => (
                <Reveal key={takeaway.title} delay={200 + index * 50}>
                  <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300">
                    <h3 className="font-archivo text-[16px] uppercase tracking-[0.5px] mb-[12px]">
                      {takeaway.title}
                    </h3>
                    <p className="text-[15px] leading-[1.7] text-[#555]">
                      {takeaway.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED DEMOS SECTION ── */}
        <section className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">Related Demos</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1] tracking-[-1px] uppercase mb-[40px]">
                Watch more demos.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              {relatedDemos.map((demo) => (
                <Reveal key={demo.slug} delay={200}>
                  <button
                    onClick={() => router.push(`/demos/${demo.slug}`)}
                    className="group w-full text-left bg-white rounded-[12px] p-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-archivo text-[18px] uppercase tracking-[0.5px] mb-[8px] group-hover:text-[#FF2424] transition-colors">
                          {demo.title}
                        </h3>
                        <p className="text-[13px] text-[#666] flex items-center gap-[6px]">
                          <Clock className="w-[12px] h-[12px]" />
                          {demo.duration}
                        </p>
                      </div>
                      <ChevronRight className="w-[20px] h-[20px] text-[#666] group-hover:text-[#FF2424] group-hover:translate-x-[4px] transition-all" />
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="relative bg-[#1a1a1a] overflow-hidden">
          <LightGridBg />
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[100px] text-center">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                See It In Your Org
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Book a demo and see<br />
                <span className="text-[#FF2424]">Jataka catch your limits.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                We'll run Jataka on your actual Salesforce codebase and show you exactly what Governor Limit risks we find.
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
    </>
  );
}
