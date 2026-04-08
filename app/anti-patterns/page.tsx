"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, AlertTriangle, Play, Code, Shield, ArrowRight, Zap, Clock, Database, Lock, Cpu } from "lucide-react";

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
  "@type": "CollectionPage",
  "name": "Salesforce Governor Limit Anti-Patterns Library - Jataka",
  "description": "Learn how Jataka catches and prevents Salesforce Governor Limit exceptions before they hit production. Real code examples of SOQL 101, DML 151, CPU timeout, and more.",
  "url": "https://jataka.io/anti-patterns",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://jataka.io/anti-patterns/soql-101",
        "name": "Too many SOQL queries: 101"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://jataka.io/anti-patterns/dml-151",
        "name": "Too many DML statements: 151"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "url": "https://jataka.io/anti-patterns/cpu-timeout",
        "name": "Apex CPU time limit exceeded"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "url": "https://jataka.io/anti-patterns/mixed-dml",
        "name": "UNCOMMITTED_WORK_PENDING"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "url": "https://jataka.io/anti-patterns/lock-contention",
        "name": "UNABLE_TO_LOCK_ROW"
      }
    ]
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
      "name": "Anti-Patterns Library",
      "item": "https://jataka.io/anti-patterns"
    }
  ]
};

const limitBreaches = [
  {
    id: "soql-101",
    title: "Too many SOQL queries: 101",
    error: "System.LimitException: Too many SOQL queries: 101",
    description: "The classic SOQL-in-a-for-loop. Every Salesforce developer has written this. It works in dev, then crashes production when data volumes are real.",
    icon: Database,
    limit: "100 queries per transaction",
    severity: "Critical",
    color: "#FF2424",
    metrics: { impact: "Top 3 most searched", avgDowntime: "4 hours" }
  },
  {
    id: "dml-151",
    title: "Too many DML statements: 151",
    error: "System.LimitException: Too many DML statements: 151",
    description: "You thought bulkifying was optional. Then you hit 151 DML statements and your trigger crashes mid-transaction. Partial rollback chaos.",
    icon: Zap,
    limit: "150 statements per transaction",
    severity: "Critical",
    color: "#FF2424",
    metrics: { impact: "Causes 40% of runtime incidents", avgDowntime: "3 hours" }
  },
  {
    id: "cpu-timeout",
    title: "Apex CPU time limit exceeded",
    error: "System.LimitException: Apex CPU time limit exceeded",
    description: "Your code runs fine in Sandbox with 100 records. Production has 50,000. The nested loops you forgot about burn through 10 seconds of CPU time.",
    icon: Cpu,
    limit: "10,000ms synchronous / 60,000ms async",
    severity: "Critical",
    color: "#FF2424",
    metrics: { impact: "Top 5 critical errors", avgDowntime: "6 hours" }
  },
  {
    id: "mixed-dml",
    title: "UNCOMMITTED_WORK_PENDING",
    error: "System.DmlException: UNCOMMITTED_WORK_PENDING, Your call requires to be in an active transaction",
    description: "Mixed DML operations. You tried to insert a User and an Account in the same transaction. Salesforce blocks this for data integrity. You didn't know.",
    icon: AlertTriangle,
    limit: "Setup & non-Setup objects",
    severity: "High",
    color: "#FF6B35",
    metrics: { impact: "Common setup error", avgDowntime: "2 hours" }
  },
  {
    id: "lock-contention",
    title: "UNABLE_TO_LOCK_ROW",
    error: "System.DmlException: UNABLE_TO_LOCK_ROW, unable to obtain exclusive access to this record",
    description: "Data skew. Your top Account has 50,000 Contacts. Two users try to update the same parent field simultaneously. Lock contention brings your org to a halt.",
    icon: Lock,
    limit: "Record lock contention",
    severity: "High",
    color: "#FF6B35",
    metrics: { impact: "High severity lock issue", avgDowntime: "8 hours" }
  }
];

export default function AntiPatternsPage() {
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

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
            <li><Link href="/" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Home</Link></li>
            <li><Link href="/blog" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Demos</Link></li>
            <li><Link href="/use-cases" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</Link></li>
            <li><Link href="/anti-patterns" className="text-[#1a1a1a] font-medium text-[13.5px] tracking-[0.4px]">Anti-Patterns</Link></li>
            <li><Link href="/book-pilot" className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book Demo</Link></li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-[8px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-[64px] left-0 right-0 z-[150] bg-[#FAF8F3] border-b border-[#1a1a1a]/10 md:hidden">
            <div className="px-[24px] py-[20px] flex flex-col gap-[16px]">
              <Link href="/" className="text-[#666] text-[14px] font-medium">Home</Link>
              <Link href="/blog" className="text-[#666] text-[14px] font-medium">Demos</Link>
              <Link href="/use-cases" className="text-[#666] text-[14px] font-medium">Use Cases</Link>
              <Link href="/anti-patterns" className="text-[#1a1a1a] font-medium text-[14px]">Anti-Patterns</Link>
              <Link href="/book-pilot" className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px]">Book Demo</Link>
            </div>
          </div>
        )}

        {/* HERO */}
        <section className="pt-[140px] pb-[80px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <AlertTriangle className="w-[14px] h-[14px]" />
                Salesforce Governor Limit Library
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] uppercase mb-[40px]">
                Every limit breach.<br />
                <span className="text-[#FF2424]">Caught before production.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[30px]">
                When developers hit a Governor Limit at 2:00 AM, they Google the error. These pages rank at the top. 
                They watch the video, see Jataka blocking the breach, and send it to their boss the next morning.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[15px] leading-[1.6] text-[#666] max-w-[700px] mb-[60px]">
                Each anti-pattern page includes: a 60-second video of Jataka catching the error, the bad code snippet, 
                the Jataka report card, and exactly how to fix it. SEO gold for developers in crisis.
              </p>
            </Reveal>
          </div>
        </section>

        {/* LIMIT BREACH CARDS */}
        <section className="pb-[100px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] items-stretch">
              {limitBreaches.map((breach) => {
                const IconComponent = breach.icon;
                return (
                  <Reveal key={breach.id} delay={100} className="h-full min-h-0">
                    <Link
                      href={`/anti-patterns/${breach.id}`}
                      className="group w-full h-full min-h-0 text-left bg-white rounded-[12px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.12)] hover:border-[#FF2424]/30 transition-all duration-300 flex flex-col"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-[20px]">
                        <div 
                          className="w-[48px] h-[48px] rounded-[8px] flex items-center justify-center"
                          style={{ backgroundColor: `${breach.color}15` }}
                        >
                          <IconComponent className="w-[22px] h-[22px]" style={{ color: breach.color }} />
                        </div>
                        <span 
                          className="text-[10px] font-bold uppercase tracking-[1.5px] px-[10px] py-[4px] rounded-[4px]"
                          style={{ 
                            backgroundColor: breach.severity === "Critical" ? "#FF242415" : "#FF6B3515",
                            color: breach.severity === "Critical" ? "#FF2424" : "#FF6B35"
                          }}
                        >
                          {breach.severity}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-archivo text-[18px] leading-[1.3] tracking-[-0.5px] uppercase mb-[12px] group-hover:text-[#FF2424] transition-colors">
                        {breach.title}
                      </h3>

                      {/* Error */}
                      <code className="block text-[12px] font-mono text-[#666] bg-[#f5f5f5] px-[12px] py-[8px] rounded-[6px] mb-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {breach.error}
                      </code>

                      {/* Description */}
                      <p className="text-[14px] leading-[1.6] text-[#555] mb-[20px] flex-1">
                        {breach.description}
                      </p>

                      {/* Metrics */}
                      <div className="flex items-center gap-[20px] pt-[16px] border-t border-[#1a1a1a]/5 mt-auto shrink-0">
                        <div>
                          <p className="text-[10px] uppercase tracking-[1px] text-[#888] mb-[2px]">Impact</p>
                          <p className="text-[14px] font-semibold text-[#1a1a1a]">{breach.metrics.impact}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[1px] text-[#888] mb-[2px]">Avg Downtime</p>
                          <p className="text-[14px] font-semibold text-[#1a1a1a]">{breach.metrics.avgDowntime}</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-[8px] mt-[20px] text-[#FF2424] font-medium text-[13px] group-hover:gap-[12px] transition-all">
                        <span>Watch Jataka catch it</span>
                        <ArrowRight className="w-[14px] h-[14px]" />
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* THE REAL COST OF GOVERNOR LIMITS */}
        <section className="py-[80px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[30px]">
                THE REAL COST<br />
                <span className="text-[#FF2424]">OF GOVERNOR LIMITS</span>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[17px] leading-[1.7] text-[#444] max-w-[700px] mx-auto mb-[40px]">
                When a Salesforce developer gets a "101 SOQL" error at 2:00 AM, the panic is real. 
                Production is down, executives are calling, and your entire org is at risk. These pages show how Jataka prevents these crises before they happen.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-stretch">
              <Reveal delay={200} className="h-full min-h-0">
                <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] text-left h-full flex flex-col">
                  <div className="text-[32px] font-archivo text-[#FF2424] mb-[12px]">73%</div>
                  <p className="text-[14px] text-[#555] flex-1">Of Salesforce enterprise teams experience Sev-1 runtime incidents annually</p>
                </div>
              </Reveal>
              <Reveal delay={200} className="h-full min-h-0">
                <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] text-left h-full flex flex-col">
                  <div className="text-[32px] font-archivo text-[#FF2424] mb-[12px]">2:00 AM</div>
                  <p className="text-[14px] text-[#555] flex-1">Peak crisis time, when production crashes and the pressure is on</p>
                </div>
              </Reveal>
              <Reveal delay={200} className="h-full min-h-0">
                <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] text-left h-full flex flex-col">
                  <div className="text-[32px] font-archivo text-[#FF2424] mb-[12px]">85%</div>
                  <p className="text-[14px] text-[#555] flex-1">Of teams that experience a major outage from limit breaches</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                Stop firefighting at 2 AM
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Jataka catches every breach<br />
                <span className="text-[#FF2424]">before the merge.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo and watch Jataka block real limit breaches in real-time. 
                Your developers sleep through the night.
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
                  href="/use-cases"
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  View Use Cases
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
