"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
      "name": "Jataka vs Provar",
      "item": "https://jataka.io/compare/provar"
    }
  ]
};

const comparisonData = [
  {
    category: "UI Test Creation",
    jataka: "Uses modern Playwright executing in isolated Kubernetes pods",
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
  { metric: "Tests after Salesforce release", jataka: "Self-healing (adapts to DOM changes)", provar: "High failure rate during DOM changes" },
  { metric: "Weekly maintenance hours", jataka: "0-2 hours", provar: "10-20 hours" },
  { metric: "Flaky test rate", jataka: "<5%", provar: "15-30%" },
  { metric: "Test creation speed", jataka: "Fast (standard tools)", provar: "Fast (visual builder)" }
];

export default function CompareProvarPage() {
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
          <Link href="/" className="flex items-center">
            <img src="/Final-1 (6).svg" alt="Jataka" className="h-[22px] w-auto block" />
          </Link>

          <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
            <li><Link href="/" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Home</Link></li>
            <li><Link href="/blog" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Demos</Link></li>
            <li><Link href="/use-cases" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</Link></li>
            <li><Link href="/anti-patterns" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Anti-Patterns</Link></li>
            <li><Link href="/book-pilot" className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book Demo</Link></li>
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
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[40px] text-center">
                The Maintenance Gap
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-stretch">
              {maintenanceComparison.map((row) => (
                <Reveal key={row.metric} delay={100} className="h-full min-h-0">
                  <div className="bg-[#FAF8F3] rounded-[12px] p-[24px] h-full flex flex-col">
                    <p className="text-[14px] text-[#666] mb-[16px] shrink-0">{row.metric}</p>
                    <div className="flex items-center justify-between mt-auto">
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
        <section className="py-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[900px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px] text-center">
                The Key Differentiator
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-stretch">
              <Reveal delay={100} className="h-full min-h-0">
                <div className="bg-white rounded-[12px] p-[28px] border border-[#1a1a1a]/5 h-full flex flex-col">
                  <div className="flex items-center gap-[12px] mb-[20px]">
                    <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF6B35]/10 flex items-center justify-center">
                      <TestTube className="w-[20px] h-[20px] text-[#FF6B35]" />
                    </div>
                    <h3 className="font-archivo text-[18px] tracking-[-0.5px] uppercase">Provar</h3>
                  </div>
                  <p className="text-[15px] text-[#444] leading-[1.7] flex-1">
                    Provar is a <strong>UI testing tool</strong>. It clicks buttons, fills forms, and validates 
                    that the UI works. But when Salesforce changes a button's attributes, the test breaks. 
                    Your QA team spends the next sprint fixing tests instead of testing new features.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100} className="h-full min-h-0">
                <div className="bg-white rounded-[12px] p-[28px] border border-[#22c55e]/30 h-full flex flex-col">
                  <div className="flex items-center gap-[12px] mb-[20px]">
                    <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center">
                      <RefreshCw className="w-[20px] h-[20px] text-[#22c55e]" />
                    </div>
                    <h3 className="font-archivo text-[18px] tracking-[-0.5px] uppercase">Jataka</h3>
                  </div>
                  <p className="text-[15px] text-[#444] leading-[1.7] flex-1">
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
        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
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
                <Link 
                  href="/book-pilot"
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Book a Demo
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                </Link>
                <Link 
                  href="/use-cases/qa-team"
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  See QA Team Use Case
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
