"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
        

        {isMobileMenuOpen && (
          <div className="fixed top-[64px] left-0 right-0 z-[150] bg-[#FAF8F3] border-b border-[#1a1a1a]/10 md:hidden">
            <div className="px-[24px] py-[20px] flex flex-col gap-[16px]">
              <Link href="/" className="text-[#666] text-[14px] font-medium">Home</Link>
              <Link href="/blog" className="text-[#666] text-[14px] font-medium">Demos</Link>
              <Link href="/use-cases" className="text-[#666] text-[14px] font-medium">Use Cases</Link>
              <Link href="/anti-patterns" className="text-[#666] text-[14px] font-medium">Anti-Patterns</Link>
              <Link href="/book-pilot" className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px] text-center">Book Demo</Link>
            </div>
          </div>
        )}

        {/* HERO */}
        <section className="pt-[120px] pb-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1200px] mx-auto relative z-10">
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
        <section className="pb-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
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
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
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
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[900px] mx-auto relative z-10">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-stretch">
              <Reveal delay={200} className="h-full min-h-0">
                <div className="bg-white rounded-[12px] p-[24px] border border-[#1a1a1a]/5 h-full flex flex-col">
                  <p className="text-[14px] text-[#666] mb-[12px] shrink-0">Clayton sees:</p>
                  <code className="block text-[13px] font-mono bg-[#f5f5f5] p-[12px] rounded-[6px] text-[#1a1a1a] shrink-0">
                    for (Id accId : accountIds) {"{"}<br />
                    &nbsp;&nbsp;List&gt;Contact&lt; contacts = [SELECT...];<br />
                    {"}"}
                  </code>
                  <p className="text-[14px] text-[#666] mt-[12px] flex-1">
                    And thinks: "SOQL in a loop. Might be bad."
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200} className="h-full min-h-0">
                <div className="bg-white rounded-[12px] p-[24px] border border-[#22c55e]/30 h-full flex flex-col">
                  <p className="text-[14px] text-[#666] mb-[12px] shrink-0">Jataka executes:</p>
                  <code className="block text-[13px] font-mono bg-[#f5f5f5] p-[12px] rounded-[6px] text-[#1a1a1a] shrink-0">
                    &gt; Executing with 1,247 accounts...<br />
                    &gt; SOQL queries: 127/100<br />
                    &gt; LIMIT BREACH DETECTED
                  </code>
                  <p className="text-[14px] text-[#666] mt-[12px] flex-1">
                    And knows: "This will crash in production."
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* POSITIONING */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[900px] mx-auto text-center relative z-10">
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
        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
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
                <Link 
                  href="/book-pilot"
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Book a Demo
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                </Link>
                <Link 
                  href="/anti-patterns"
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  See What Jataka Catches
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
