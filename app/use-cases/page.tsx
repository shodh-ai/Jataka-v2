"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Building2, Users, TestTube, ArrowRight, ChevronRight } from "lucide-react";

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

// JSON-LD Schema for hub page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Jataka Use Cases - Salesforce Development Solutions",
  "description": "Explore how Jataka helps enterprises, agencies, and QA teams eliminate Salesforce rollbacks, reduce code review time, and kill test maintenance overhead.",
  "url": "https://jataka.io/use-cases",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://jataka.io/use-cases/limit-firewall",
        "name": "Prevent Governor Limits - Runtime Protection for Salesforce"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://jataka.io/use-cases/automated-pr-reviews",
        "name": "Automate PR Reviews - Code Quality at Scale"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "url": "https://jataka.io/use-cases/self-healing-ui-tests",
        "name": "Self-Healing UI Tests - Killing Test Maintenance"
      }
    ]
  }
};

// Breadcrumb schema
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
      "name": "Use Cases",
      "item": "https://jataka.io/use-cases"
    }
  ]
};

export default function UseCasesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const useCases = [
    {
      id: 1,
      slug: "limit-firewall",
      title: "Prevent Governor Limits",
      subtitle: "Protecting Margins",
      icon: Building2,
      summary: "A bad deployment causes an Apex CPU timeout, crashing the sales portal during end-of-month closing. Jataka's Backend Firewall guarantees zero runtime crashes from Governor Limit breaches.",
      keyResult: "Zero Sev-1 incidents from limit breaches. $2M+/yr in protected revenue.",
      metrics: [
        { label: "Revenue Loss", value: "$50K+/hr" },
        { label: "Recovery Time", value: "4-8 hrs" },
        { label: "Result", value: "0 Sev-1s" },
      ],
    },
    {
      id: 2,
      slug: "automated-pr-reviews",
      title: "Automate PR Reviews",
      subtitle: "Code Quality at Scale",
      icon: Users,
      summary: "Senior architects spend 20 hours a week manually reviewing junior developers' PRs. Jataka automates code review, limit checking, and test generation, freeing architects for high-value work.",
      keyResult: "18 hrs/wk saved. +40% junior dev velocity. +300% architecture time.",
      metrics: [
        { label: "Review Time", value: "20 hrs/wk" },
        { label: "Wasted Spend", value: "$3K/wk" },
        { label: "Result", value: "+40% velocity" },
      ],
    },
    {
      id: 3,
      slug: "self-healing-ui-tests",
      title: "Self-Healing UI Tests",
      subtitle: "Killing Test Maintenance",
      icon: TestTube,
      summary: "Salesforce releases a UI update and 200 Selenium scripts break. Jataka's Vision AI automatically heals UI tests without human intervention. Tests stay green through every release.",
      keyResult: "-90% test maintenance. 99.5% tests passing. +60% QA velocity.",
      metrics: [
        { label: "Broken Tests", value: "200+" },
        { label: "Fix Time", value: "2 sprints" },
        { label: "Result", value: "-90% maint" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">
      

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] pt-[120px] pb-[80px] overflow-hidden">
        <LightGridBg />
        <FloatingBlob className="top-[20%] right-[10%]" />
        <FloatingBlob className="bottom-[30%] left-[5%]" />
        
        <div className="relative z-10 max-w-[1000px]">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#666] mb-[40px]">
              01 ,  Core Use Cases
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-archivo text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] uppercase mb-[40px]">
              HOW ENGINEERING TEAMS
              <br />
              <span className="text-[#FF2424]">USE JATAKA.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[30px]">
              Three specific scenarios. Three painful problems. Three reasons Jataka exists. <strong className="text-[#1a1a1a] font-semibold">Which one is your story?</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── USE CASES CARDS SECTION ── */}
      <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
        <LightGridBg />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-stretch">
            {useCases.map((useCase) => {
              const IconComponent = useCase.icon;
              
              return (
                <Reveal key={useCase.id} delay={200} className="h-full min-h-0">
                  <Link
                    href={`/use-cases/${useCase.slug}`}
                    className="group w-full h-full min-h-0 text-left bg-white rounded-[16px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_12px_40px_rgba(255,36,36,0.1)] hover:border-[#FF2424]/20 transition-all duration-300 flex flex-col"
                  >
                    {/* Icon & Number */}
                    <div className="flex items-center justify-between mb-[24px] shrink-0">
                      <div className="w-[56px] h-[56px] rounded-[12px] bg-[#FF2424]/10 flex items-center justify-center group-hover:bg-[#FF2424]/20 transition-colors">
                        <IconComponent className="w-[24px] h-[24px] text-[#FF2424]" />
                      </div>
                      <span className="font-archivo text-[48px] leading-[1] text-[#1a1a1a]/[0.05] group-hover:text-[#FF2424]/[0.1] transition-colors">
                        0{useCase.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-archivo text-[24px] leading-[1.1] tracking-[-0.5px] uppercase mb-[8px] group-hover:text-[#FF2424] transition-colors shrink-0">
                      {useCase.title}
                    </h2>
                    
                    {/* Subtitle */}
                    <p className="text-[14px] text-[#FF2424] font-medium mb-[16px] shrink-0">
                      {useCase.subtitle}
                    </p>

                    {/* Summary */}
                    <p className="text-[15px] leading-[1.7] text-[#555] mb-[24px] flex-1 min-h-0">
                      {useCase.summary}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-[8px] mb-[24px] shrink-0 items-stretch">
                      {useCase.metrics.map((metric) => (
                        <div key={metric.label} className="bg-[#FAF8F3] rounded-[8px] p-[12px] text-center flex flex-col justify-center min-h-[64px]">
                          <div className="font-archivo text-[16px] leading-[1] tracking-[-0.3px] text-[#1a1a1a] mb-[4px]">
                            {metric.value}
                          </div>
                          <div className="text-[9px] font-medium uppercase tracking-[0.5px] text-[#888]">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Result */}
                    <div className="bg-[#FF2424]/5 rounded-[8px] p-[16px] mb-[20px] shrink-0 min-h-[5rem] flex items-start">
                      <p className="text-[13px] leading-[1.5] text-[#444]">
                        <strong className="text-[#FF2424]">Result:</strong> {useCase.keyResult}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-[8px] text-[#FF2424] font-medium text-[14px] group-hover:gap-[12px] transition-all mt-auto shrink-0">
                      Read Full Story
                      <ChevronRight className="w-[16px] h-[16px]" />
                    </div>
                  </Link>
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
              Which One Is Your Story?
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
              See Jataka solve
              <br />
              <span className="text-[#FF2424]">your specific problem.</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
              Book a demo and see Jataka catch real issues in your Salesforce codebase. No generic pitches, just your code, your limits, your results.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col md:flex-row gap-[16px] justify-center">
              <Link 
                href="/book-pilot"
                className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
              >
                Book a Demo
                <svg className="w-[16px] h-[16px] group-hover:translate-x-[4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/docs"
                className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
              >
                Read the Docs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
