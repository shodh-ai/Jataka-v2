"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Check, X as XIcon, Shield, Zap, Eye, RefreshCw, TestTube, Database } from "lucide-react";

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

// Reveal component
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
      className={className}
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
  "@type": "Article",
  "headline": "Jataka vs Provar: Self-Healing Tests vs Traditional UI Testing",
  "description": "Compare Jataka and Provar for Salesforce testing. Provar tests the UI. Jataka heals the UI and profiles the database. Why Jataka reduces test maintenance by 90%.",
  "author": {
    "@type": "Organization",
    "name": "Jataka"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Jataka",
    "logo": {
      "@type": "ImageObject",
      "url": "https://jataka.ai/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://jataka.ai"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Compare",
      "item": "https://jataka.ai/compare"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Jataka vs Provar",
      "item": "https://jataka.ai/compare/provar"
    }
  ]
};

const comparisonData = [
  {
    category: "UI Test Creation",
    jataka: "Uses standard Playwright/Selenium",
    provar: "Proprietary test builder",
    jatakaHas: true,
    provarHas: true
  },
  {
    category: "Self-Healing Tests",
    jataka: "AI heals broken tests automatically",
    provar: "Manual test maintenance required",
    jatakaHas: true,
    provarHas: false
  },
  {
    category: "Salesforce Release Updates",
    jataka: "Tests stay green automatically",
    provar: "Tests break, manual fix needed",
    jatakaHas: true,
    provarHas: false
  },
  {
    category: "Governor Limit Profiling",
    jataka: "Real-time limit detection",
    provar: "No limit profiling",
    jatakaHas: true,
    provarHas: false
  },
  {
    category: "SOQL 101 Detection",
    jataka: "Catches before production",
    provar: "No database profiling",
    jatakaHas: true,
    provarHas: false
  },
  {
    category: "CPU Timeout Detection",
    jataka: "Production-scale testing",
    provar: "No CPU profiling",
    jatakaHas: true,
    provarHas: false
  },
  {
    category: "Blast Radius Prediction",
    jataka: "Dependency graph analysis",
    provar: "No impact analysis",
    jatakaHas: true,
    provarHas: false
  },
  {
    category: "Test Maintenance Time",
    jataka: "Near zero (self-healing)",
    provar: "High (manual updates)",
    jatakaHas: true,
    provarHas: false
  },
  {
    category: "Visual Test Builder",
    jataka: "No (code-based)",
    provar: "Yes (low-code builder)",
    jatakaHas: false,
    provarHas: true
  },
  {
    category: "Cross-Browser Testing",
    jataka: "Via Playwright",
    provar: "Built-in support",
    jatakaHas: true,
    provarHas: true
  }
];

const maintenanceComparison = [
  { metric: "Tests after Salesforce release", jataka: "95% pass rate", provar: "40-60% pass rate" },
  { metric: "Weekly maintenance hours", jataka: "0-2 hours", provar: "10-20 hours" },
  { metric: "Flaky test rate", jataka: "<5%", provar: "15-30%" },
  { metric: "Test creation speed", jataka: "Fast (standard tools)", provar: "Fast (visual builder)" }
];

export default function CompareProvarPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        {/* NAV */}
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

          <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
            <li><button onClick={() => router.push("/")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Home</button></li>
            <li><button onClick={() => router.push("/blog")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Demos</button></li>
            <li><button onClick={() => router.push("/use-cases")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</button></li>
            <li><button onClick={() => router.push("/anti-patterns")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Anti-Patterns</button></li>
            <li><button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book Demo</button></li>
          </ul>

          <button 
            className="md:hidden p-[8px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="fixed top-[64px] left-0 right-0 z-[150] bg-[#FAF8F3] border-b border-[#1a1a1a]/10 md:hidden">
            <div className="px-[24px] py-[20px] flex flex-col gap-[16px]">
              <button onClick={() => router.push("/")} className="text-[#666] text-[14px] font-medium">Home</button>
              <button onClick={() => router.push("/blog")} className="text-[#666] text-[14px] font-medium">Demos</button>
              <button onClick={() => router.push("/use-cases")} className="text-[#666] text-[14px] font-medium">Use Cases</button>
              <button onClick={() => router.push("/anti-patterns")} className="text-[#666] text-[14px] font-medium">Anti-Patterns</button>
              <button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px]">Book Demo</button>
            </div>
          </div>
        )}

        {/* HERO */}
        <section className="pt-[120px] pb-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[1200px] mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <TestTube className="w-[14px] h-[14px]" />
                Competitive Comparison
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                Jataka vs Provar<br />
                <span className="text-[#FF2424]">Self-Healing Tests vs Traditional UI Testing</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#444] max-w-[800px] mb-[30px]">
                Provar tests the UI. Jataka heals the UI and profiles the database. When Salesforce releases 
                3 major updates per year, Provar tests break. Jataka tests stay green.
              </p>
            </Reveal>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="pb-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <div className="bg-white rounded-[12px] border border-[#1a1a1a]/5 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-3 bg-[#1a1a1a]">
                  <div className="p-[20px]">
                    <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#888]">Feature</span>
                  </div>
                  <div className="p-[20px] border-l border-[#333]">
                    <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-white">Jataka</span>
                  </div>
                  <div className="p-[20px] border-l border-[#333]">
                    <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-white">Provar</span>
                  </div>
                </div>

                {/* Rows */}
                {comparisonData.map((row, index) => (
                  <div 
                    key={row.category}
                    className={`grid grid-cols-3 ${index !== comparisonData.length - 1 ? 'border-b border-[#1a1a1a]/5' : ''}`}
                  >
                    <div className="p-[16px] md:p-[20px] bg-[#FAF8F3]">
                      <span className="text-[14px] font-medium">{row.category}</span>
                    </div>
                    <div className={`p-[16px] md:p-[20px] border-l border-[#1a1a1a]/5 ${row.jatakaHas ? 'bg-[#22c55e]/5' : ''}`}>
                      <div className="flex items-center gap-[8px]">
                        {row.jatakaHas ? (
                          <Check className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0" />
                        ) : (
                          <XIcon className="w-[16px] h-[16px] text-[#ccc] flex-shrink-0" />
                        )}
                        <span className="text-[13px] text-[#444]">{row.jataka}</span>
                      </div>
                    </div>
                    <div className={`p-[16px] md:p-[20px] border-l border-[#1a1a1a]/5 ${row.provarHas ? 'bg-[#22c55e]/5' : ''}`}>
                      <div className="flex items-center gap-[8px]">
                        {row.provarHas ? (
                          <Check className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0" />
                        ) : (
                          <XIcon className="w-[16px] h-[16px] text-[#ccc] flex-shrink-0" />
                        )}
                        <span className="text-[13px] text-[#444]">{row.provar}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* MAINTENANCE METRICS */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[40px] text-center">
                The Maintenance Gap
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {maintenanceComparison.map((row, index) => (
                <Reveal key={row.metric} delay={100 + index * 50}>
                  <div className="bg-[#FAF8F3] rounded-[12px] p-[24px]">
                    <p className="text-[14px] text-[#666] mb-[16px]">{row.metric}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[4px]">Jataka</p>
                        <p className="text-[20px] font-archivo text-[#22c55e]">{row.jataka}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[4px]">Provar</p>
                        <p className="text-[20px] font-archivo text-[#FF6B35]">{row.provar}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* KEY DIFFERENTIATOR */}
        <section className="py-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[900px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px] text-center">
                The Key Differentiator
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              <Reveal delay={100}>
                <div className="bg-white rounded-[12px] p-[28px] border border-[#1a1a1a]/5">
                  <div className="flex items-center gap-[12px] mb-[20px]">
                    <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF6B35]/10 flex items-center justify-center">
                      <TestTube className="w-[20px] h-[20px] text-[#FF6B35]" />
                    </div>
                    <h3 className="font-archivo text-[18px] tracking-[-0.5px] uppercase">Provar</h3>
                  </div>
                  <p className="text-[15px] text-[#444] leading-[1.7]">
                    Provar is a <strong>UI testing tool</strong>. It clicks buttons, fills forms, and validates 
                    that the UI works. But when Salesforce changes a button's attributes, the test breaks. 
                    Your QA team spends the next sprint fixing tests instead of testing new features.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="bg-white rounded-[12px] p-[28px] border border-[#22c55e]/30">
                  <div className="flex items-center gap-[12px] mb-[20px]">
                    <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center">
                      <RefreshCw className="w-[20px] h-[20px] text-[#22c55e]" />
                    </div>
                    <h3 className="font-archivo text-[18px] tracking-[-0.5px] uppercase">Jataka</h3>
                  </div>
                  <p className="text-[15px] text-[#444] leading-[1.7]">
                    Jataka is a <strong>self-healing test platform</strong>. When Salesforce changes a button, 
                    our AI recognizes it visually and updates the test element automatically. Tests stay green. 
                    Your QA team focuses on testing, not maintenance.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={300}>
              <div className="mt-[30px] bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[12px] p-[24px]">
                <p className="text-[15px] text-[#444]">
                  <strong className="text-[#FF2424]">Plus:</strong> Jataka also profiles Governor Limits. Provar 
                  tests the UI but doesn't know if your code will hit SOQL 101 or CPU timeout. Jataka catches 
                  both UI breaks and database breaches.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                Stop maintaining tests
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Provar tests the UI.<br />
                <span className="text-[#FF2424]">Jataka heals it.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo to see Jataka heal broken tests in real-time and catch Governor Limits that Provar misses.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row gap-[16px] justify-center">
                <button 
                  onClick={() => router.push("/book-pilot")} 
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Book a Demo
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                </button>
                <button 
                  onClick={() => router.push("/use-cases/qa-team")} 
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  See QA Team Use Case
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
