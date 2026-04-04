"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Check, X as XIcon, Shield, Zap, Code, Search, Play, Database } from "lucide-react";

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
  "headline": "Jataka vs Clayton: Runtime Execution vs Static Text Scanning",
  "description": "Compare Jataka and Clayton for Salesforce code quality. Clayton reads text. Jataka executes transactions. Why static analysis can't catch runtime Governor Limit errors.",
  "author": {
    "@type": "Organization",
    "name": "Jataka"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Jataka",
    "logo": {
      "@type": "ImageObject",
      "url": "https://jataka.io/logo.png"
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
      "item": "https://jataka.io"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Compare",
      "item": "https://jataka.io/compare"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Jataka vs Clayton",
      "item": "https://jataka.io/compare/clayton"
    }
  ]
};

const comparisonData = [
  {
    category: "Analysis Method",
    jataka: "Runtime execution profiling",
    clayton: "Static text scanning",
    jatakaHas: true,
    claytonHas: true
  },
  {
    category: "SOQL 101 Detection",
    jataka: "Catches actual limit breach",
    clayton: "Flags SOQL in loops (maybe)",
    jatakaHas: true,
    claytonHas: false
  },
  {
    category: "DML 151 Detection",
    jataka: "Catches actual limit breach",
    clayton: "Flags DML in loops (maybe)",
    jatakaHas: true,
    claytonHas: false
  },
  {
    category: "CPU Timeout Detection",
    jataka: "Measures actual CPU time",
    clayton: "No CPU profiling",
    jatakaHas: true,
    claytonHas: false
  },
  {
    category: "Data Skew Detection",
    jataka: "Analyzes parent-child ratios",
    clayton: "No data model analysis",
    jatakaHas: true,
    claytonHas: false
  },
  {
    category: "Mixed DML Detection",
    jataka: "Detects Setup/non-Setup conflict",
    clayton: "No transaction analysis",
    jatakaHas: true,
    claytonHas: false
  },
  {
    category: "Production Data Volumes",
    jataka: "Tests with realistic data",
    clayton: "No execution context",
    jatakaHas: true,
    claytonHas: false
  },
  {
    category: "Trigger Collision Detection",
    jataka: "Simulates multiple triggers",
    clayton: "No runtime simulation",
    jatakaHas: true,
    claytonHas: false
  },
  {
    category: "Code Style Rules",
    jataka: "No (use Clayton/PMD)",
    clayton: "Extensive rule library",
    jatakaHas: false,
    claytonHas: true
  },
  {
    category: "Security Scanning",
    jataka: "No (use Clayton)",
    clayton: "Apex security analysis",
    jatakaHas: false,
    claytonHas: true
  },
  {
    category: "Naming Conventions",
    jataka: "No",
    clayton: "Yes",
    jatakaHas: false,
    claytonHas: true
  }
];

const staticVsRuntime = [
  {
    scenario: "SOQL in for loop",
    staticAnalysis: "Flags as potential issue",
    runtimeProfiling: "Measures 127 queries vs 100 limit",
    winner: "runtime"
  },
  {
    scenario: "Nested loops",
    staticAnalysis: "Flags complexity",
    runtimeProfiling: "Measures 12,847ms vs 10,000ms limit",
    winner: "runtime"
  },
  {
    scenario: "DML on Setup + non-Setup",
    staticAnalysis: "No detection",
    runtimeProfiling: "Catches UNCOMMITTED_WORK_PENDING",
    winner: "runtime"
  },
  {
    scenario: "Missing test coverage",
    staticAnalysis: "Reports coverage %",
    runtimeProfiling: "No coverage analysis",
    winner: "static"
  },
  {
    scenario: "SOQL injection risk",
    staticAnalysis: "Flags dynamic SOQL",
    runtimeProfiling: "No security analysis",
    winner: "static"
  }
];

export default function CompareClaytonPage() {
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
                <Code className="w-[14px] h-[14px]" />
                Competitive Comparison
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                Jataka vs Clayton<br />
                <span className="text-[#FF2424]">Runtime Execution vs Static Text Scanning</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#444] max-w-[800px] mb-[30px]">
                Clayton reads text. Jataka executes transactions. Static analysis can't predict runtime 
                behavior because it doesn't know your data volumes, trigger interactions, or user patterns.
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
                    <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-white">Clayton</span>
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
                    <div className={`p-[16px] md:p-[20px] border-l border-[#1a1a1a]/5 ${row.claytonHas ? 'bg-[#22c55e]/5' : ''}`}>
                      <div className="flex items-center gap-[8px]">
                        {row.claytonHas ? (
                          <Check className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0" />
                        ) : (
                          <XIcon className="w-[16px] h-[16px] text-[#ccc] flex-shrink-0" />
                        )}
                        <span className="text-[13px] text-[#444]">{row.clayton}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* STATIC VS RUNTIME */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[40px] text-center">
                Static vs Runtime: What Each Catches
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-[#FAF8F3] rounded-[12px] border border-[#1a1a1a]/5 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-4 bg-[#1a1a1a]/5 p-[16px]">
                  <div className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#666]">Scenario</div>
                  <div className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#666]">Static Analysis</div>
                  <div className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#666]">Runtime Profiling</div>
                  <div className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#666]">Winner</div>
                </div>

                {/* Rows */}
                {staticVsRuntime.map((row, index) => (
                  <div 
                    key={row.scenario}
                    className={`grid grid-cols-4 p-[16px] ${index !== staticVsRuntime.length - 1 ? 'border-b border-[#1a1a1a]/5' : ''}`}
                  >
                    <div className="text-[14px] font-medium">{row.scenario}</div>
                    <div className="text-[13px] text-[#666]">{row.staticAnalysis}</div>
                    <div className="text-[13px] text-[#666]">{row.runtimeProfiling}</div>
                    <div>
                      <span 
                        className={`text-[11px] font-bold uppercase tracking-[1px] px-[10px] py-[4px] rounded-[4px] ${
                          row.winner === 'runtime' 
                            ? 'bg-[#FF2424]/10 text-[#FF2424]' 
                            : 'bg-[#1a1a1a]/5 text-[#1a1a1a]'
                        }`}
                      >
                        {row.winner === 'runtime' ? 'Jataka' : 'Clayton'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="py-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[900px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px] text-center">
                The Problem with Static Analysis
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[12px] p-[28px] mb-[30px]">
                <p className="text-[16px] text-[#444] leading-[1.7]">
                  Static analysis tools like Clayton and PMD scan your code as text. They can find syntax errors, 
                  security vulnerabilities, and code style violations. But they <strong className="text-[#FF2424]">cannot</strong> predict 
                  runtime behavior because they don't execute your code.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              <Reveal delay={200}>
                <div className="bg-white rounded-[12px] p-[24px] border border-[#1a1a1a]/5">
                  <p className="text-[14px] text-[#666] mb-[12px]">Clayton sees:</p>
                  <code className="block text-[13px] font-mono bg-[#f5f5f5] p-[12px] rounded-[6px] text-[#1a1a1a]">
                    for (Id accId : accountIds) {"{"}<br />
                    &nbsp;&nbsp;List&gt;Contact&lt; contacts = [SELECT...];<br />
                    {"}"}
                  </code>
                  <p className="text-[14px] text-[#666] mt-[12px]">
                    And thinks: "SOQL in a loop. Might be bad."
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="bg-white rounded-[12px] p-[24px] border border-[#22c55e]/30">
                  <p className="text-[14px] text-[#666] mb-[12px]">Jataka executes:</p>
                  <code className="block text-[13px] font-mono bg-[#f5f5f5] p-[12px] rounded-[6px] text-[#1a1a1a]">
                    &gt; Executing with 1,247 accounts...<br />
                    &gt; SOQL queries: 127/100<br />
                    &gt; LIMIT BREACH DETECTED
                  </code>
                  <p className="text-[14px] text-[#666] mt-[12px]">
                    And knows: "This will crash in production."
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* POSITIONING */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[900px] mx-auto text-center">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px]">
                The Positioning
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[17px] leading-[1.7] text-[#444] mb-[30px]">
                <strong className="text-[#1a1a1a]">Clayton</strong> is excellent for code quality: naming conventions, 
                security scanning, test coverage, and style enforcement. Use it to keep your codebase clean.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#444] mb-[30px]">
                <strong className="text-[#1a1a1a]">Jataka</strong> is essential for runtime safety: Governor Limit profiling, 
                data skew detection, and self-healing tests. Use it to keep your production online.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[12px] p-[24px]">
                <p className="text-[15px] text-[#444]">
                  <strong className="text-[#22c55e]">Best practice:</strong> Run Clayton in your CI pipeline for code quality. 
                  Run Jataka before every merge for runtime safety. They solve different problems. Use both.
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
                Complete your safety stack
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Clayton reads text.<br />
                <span className="text-[#FF2424]">Jataka executes it.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo to see Jataka catch the runtime errors that Clayton's static analysis can't predict.
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
                  onClick={() => router.push("/anti-patterns")} 
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  See What Jataka Catches
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
