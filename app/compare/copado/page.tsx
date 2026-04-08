"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Check, X as XIcon, Shield, Zap, Clock, Users, GitBranch, RefreshCw } from "lucide-react";

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
  "headline": "Jataka vs Copado: Runtime Security vs Release Management",
  "description": "Compare Jataka and Copado for Salesforce development. Copado manages your releases. Jataka secures your runtime. Why you need both for complete Salesforce DevSecOps.",
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
      "name": "Jataka vs Copado",
      "item": "https://jataka.io/compare/copado"
    }
  ]
};

const comparisonData = [
  {
    category: "Core Function",
    jataka: "Runtime limit profiling & breach prevention",
    copado: "CI/CD pipeline & release management",
    jatakaHas: true,
    copadoHas: false
  },
  {
    category: "Governor Limit Detection",
    jataka: "Real-time execution profiling",
    copado: "Static code analysis only",
    jatakaHas: true,
    copadoHas: false
  },
  {
    category: "SOQL 101 Prevention",
    jataka: "Catches before merge",
    copado: "Relies entirely on developer-written Apex tests",
    jatakaHas: true,
    copadoHas: false
  },
  {
    category: "DML 151 Prevention",
    jataka: "Catches before merge",
    copado: "Relies entirely on developer-written Apex tests",
    jatakaHas: true,
    copadoHas: false
  },
  {
    category: "CPU Timeout Detection",
    jataka: "Production-scale testing",
    copado: "No CPU profiling",
    jatakaHas: true,
    copadoHas: false
  },
  {
    category: "Self-Healing UI Tests",
    jataka: "AI-powered test healing",
    copado: "No test healing",
    jatakaHas: true,
    copadoHas: false
  },
  {
    category: "Blast Radius Prediction",
    jataka: "Dependency graph analysis",
    copado: "No impact analysis",
    jatakaHas: true,
    copadoHas: false
  },
  {
    category: "Release Pipelines",
    jataka: "No (use Copado)",
    copado: "Full CI/CD automation",
    jatakaHas: false,
    copadoHas: true
  },
  {
    category: "Version Control",
    jataka: "GitHub integration",
    copado: "Full Git management",
    jatakaHas: false,
    copadoHas: true
  },
  {
    category: "Environment Management",
    jataka: "No",
    copado: "Full sandbox orchestration",
    jatakaHas: false,
    copadoHas: true
  }
];

const useCases = [
  {
    title: "You need Copado if:",
    items: [
      "Managing complex release pipelines across multiple sandboxes",
      "Coordinating deployments with multiple developers",
      "Tracking metadata changes across environments",
      "Automating regression testing in pipelines"
    ]
  },
  {
    title: "You need Jataka if:",
    items: [
      "Preventing Governor Limit exceptions before production",
      "Catching SOQL/DML anti-patterns at runtime",
      "Profiling CPU time with realistic data volumes",
      "Healing UI tests that break on Salesforce releases"
    ]
  }
];

export default function CompareCopadoPage() {
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

          <ul className="hidden md:flex gap-[24px] list-none items-center m-0 p-0">
            <li><Link href="/pricing" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Pricing</Link></li>
            <li><Link href="/security" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Security</Link></li>
            <li><Link href="/customers" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Customers</Link></li>
            <li><Link href="/pilot" className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Start Pilot</Link></li>
          </ul>

          <button 
            className="md:hidden p-[8px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="absolute top-[64px] left-0 w-full bg-[#FAF8F3] border-b border-[#1a1a1a]/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl z-[190]">
            <Link href="/pricing" className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Pricing</Link>
            <Link href="/security" className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Security</Link>
            <Link href="/customers" className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Customers</Link>
            <Link href="/pilot" className="w-full py-3 mt-2 rounded-[4px] bg-[#FF2424] text-white font-archivo uppercase tracking-[1.5px] text-[12px] flex items-center justify-center">
              Start Pilot
            </Link>
          </div>
        )}

        {/* HERO */}
        <section className="pt-[120px] pb-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <GitBranch className="w-[14px] h-[14px]" />
                Competitive Comparison
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                Jataka vs Copado<br />
                <span className="text-[#FF2424]">Runtime Security vs Release Management</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#444] max-w-[800px] mb-[30px]">
                Copado manages your releases. Jataka secures your runtime. They solve different problems. 
                Here's why enterprises use both for complete Salesforce DevSecOps.
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
                    <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-white">Copado</span>
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
                    <div className={`p-[16px] md:p-[20px] border-l border-[#1a1a1a]/5 ${row.copadoHas ? 'bg-[#22c55e]/5' : ''}`}>
                      <div className="flex items-center gap-[8px]">
                        {row.copadoHas ? (
                          <Check className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0" />
                        ) : (
                          <XIcon className="w-[16px] h-[16px] text-[#ccc] flex-shrink-0" />
                        )}
                        <span className="text-[13px] text-[#444]">{row.copado}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* USE CASES */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[40px] text-center">
                When to use each
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-stretch">
              {useCases.map((useCase) => (
                <Reveal key={useCase.title} delay={100} className="h-full min-h-0">
                  <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] h-full flex flex-col">
                    <h3 className="font-archivo text-[18px] tracking-[-0.5px] uppercase mb-[20px] text-[#FF2424] shrink-0">
                      {useCase.title}
                    </h3>
                    <ul className="space-y-[12px] flex-1">
                      {useCase.items.map((item) => (
                        <li key={item} className="flex items-start gap-[10px]">
                          <Check className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[2px]" />
                          <span className="text-[14px] text-[#444]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* POSITIONING */}
        <section className="py-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[900px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px]">
                The Positioning
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[17px] leading-[1.7] text-[#444] mb-[40px]">
                <strong className="text-[#1a1a1a]">Copado</strong> is a release management platform. It moves metadata between 
                environments, runs static analysis, and orchestrates deployments. It's excellent at what it does.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#444] mb-[40px]">
                <strong className="text-[#1a1a1a]">Jataka</strong> is a runtime security platform. It executes your code with 
                production-scale data, profiles Governor Limits, and catches anti-patterns that static analysis misses.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[12px] p-[24px] text-left">
                <p className="text-[15px] text-[#444]">
                  <strong className="text-[#FF2424]">The bottom line:</strong> Copado catches syntax errors and metadata 
                  conflicts. Jataka catches SOQL 101, DML 151, CPU timeouts, and data skew. They complement each other. 
                  Use both for complete protection.
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
                Complete your DevSecOps stack
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Use Copado for releases.<br />
                <span className="text-[#FF2424]">Use Jataka for runtime.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo to see how Jataka catches the Governor Limit breaches that Copado's static analysis misses.
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
