"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Zap, Play, Code, AlertTriangle, CheckCircle, ArrowRight, Clock, Database, Shield } from "lucide-react";

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
  "@type": "TechArticle",
  "headline": "How to Fix System.LimitException: Too many DML statements: 151",
  "description": "Learn why DML statements in loops cause the 151 limit exception and how Jataka catches this anti-pattern before it hits production. Includes video demonstration and code examples.",
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
  "dateModified": "2024-01-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://jataka.io/anti-patterns/dml-151"
  }
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
      "name": "Anti-Patterns",
      "item": "https://jataka.io/anti-patterns"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Too many DML statements: 151",
      "item": "https://jataka.io/anti-patterns/dml-151"
    }
  ]
};

const badCodeExample = `// ❌ BAD: DML inside a for loop
// Each iteration runs a separate DML operation

public void updateOpportunities(List<Opportunity> opps) {
    for (Opportunity opp : opps) {
        // DML operation inside the loop!
        opp.StageName = 'Closed Won';
        opp.CloseDate = Date.today();
        update opp; // 1 DML per iteration
    }
    // With 200 opportunities = 200 DML statements
    // Limit is 150. Crash at 151.
}`;

const goodCodeExample = `// ✅ GOOD: Bulkified DML operations
// Single DML statement for all records

public void updateOpportunities(List<Opportunity> opps) {
    // Update all records in memory
    for (Opportunity opp : opps) {
        opp.StageName = 'Closed Won';
        opp.CloseDate = Date.today();
    }
    
    // Single DML operation
    update opps;
    // 1 DML total, regardless of record count
}`;

const relatedAntiPatterns = [
  { id: "soql-101", title: "Too many SOQL queries: 101", severity: "Critical" },
  { id: "cpu-timeout", title: "Apex CPU time limit exceeded", severity: "Critical" },
  { id: "lock-contention", title: "UNABLE_TO_LOCK_ROW", severity: "High" }
];

export default function DML151Page() {
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
            <li><Link href="/anti-patterns" className="text-[#1a1a1a] font-medium text-[13.5px] tracking-[0.4px]">Anti-Patterns</Link></li>
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
              <Link href="/anti-patterns" className="text-[#1a1a1a] font-medium text-[14px]">Anti-Patterns</Link>
              <Link href="/book-pilot" className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px]">Book Demo</Link>
            </div>
          </div>
        )}

        {/* BREADCRUMB */}
        <div className="pt-[80px] px-[24px] md:px-[48px] relative">
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="flex items-center gap-[8px] text-[13px] text-[#666]">
              <Link href="/" className="hover:text-[#1a1a1a]">Home</Link>
              <span>/</span>
              <Link href="/anti-patterns" className="hover:text-[#1a1a1a]">Anti-Patterns</Link>
              <span>/</span>
              <span className="text-[#1a1a1a]">DML 151</span>
            </div>
          </div>
        </div>

        {/* HERO */}
        <section className="pt-[40px] pb-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <Zap className="w-[14px] h-[14px]" />
                Critical Limit Breach
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                System.LimitException:<br />
                <span className="text-[#FF2424]">Too many DML statements: 151</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <code className="inline-block text-[14px] font-mono text-[#666] bg-[#f5f5f5] px-[16px] py-[10px] rounded-[6px] mb-[30px]">
                System.LimitException: Too many DML statements: 151
              </code>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[17px] leading-[1.7] text-[#444] max-w-[800px] mb-[20px]">
                You thought bulkifying was optional. Then you hit 151 DML statements and your trigger 
                crashes mid-transaction. Partial rollback chaos. Records in an inconsistent state. 
                Users screaming because their data is corrupted.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p className="text-[15px] leading-[1.6] text-[#666] max-w-[700px]">
                <strong className="text-[#1a1a1a]">8,500 developers</strong> search for this error every month. 
                The fix is simple, bulkify your DML, but the consequences of not doing it are catastrophic.
              </p>
            </Reveal>
          </div>
        </section>

        {/* VIDEO DEMO */}
        <section className="pb-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[900px] mx-auto relative z-10">
            <Reveal>
              <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden">
                <div className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#333]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#FF2424]"></div>
                    <span className="text-[12px] font-mono text-[#888]">Jataka catches DML 151 in real-time</span>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Clock className="w-[14px] h-[14px] text-[#666]" />
                    <span className="text-[12px] text-[#666]">0:58</span>
                  </div>
                </div>

                <div className="aspect-video bg-[#0a0a0a] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF2424]/10 to-transparent"></div>
                  <button className="relative z-10 w-[80px] h-[80px] rounded-full bg-[#FF2424] flex items-center justify-center hover:scale-105 transition-transform">
                    <Play className="w-[32px] h-[32px] text-white ml-[4px]" fill="white" />
                  </button>
                  <div className="absolute bottom-[20px] left-[20px] right-[20px] flex items-center justify-between">
                    <span className="text-[11px] text-[#666]">Watch: Developer writes DML in loop → Jataka blocks PR</span>
                    <span className="text-[11px] text-[#888]">Loom Recording</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* THE LIMIT */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px]">
                The Limit: <span className="text-[#FF2424]">150 DML statements</span> per transaction
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-[40px] items-stretch">
              <Reveal delay={100} className="h-full min-h-0">
                <div className="bg-[#FAF8F3] rounded-[12px] p-[24px] h-full flex flex-col">
                  <div className="text-[36px] font-archivo text-[#FF2424] mb-[8px]">150</div>
                  <p className="text-[14px] text-[#555] flex-1">Maximum DML operations (insert/update/delete) per transaction</p>
                </div>
              </Reveal>
              <Reveal delay={100} className="h-full min-h-0">
                <div className="bg-[#FAF8F3] rounded-[12px] p-[24px] h-full flex flex-col">
                  <div className="text-[36px] font-archivo text-[#FF2424] mb-[8px]">151</div>
                  <p className="text-[14px] text-[#555] flex-1">The statement that corrupts your data with partial rollback</p>
                </div>
              </Reveal>
              <Reveal delay={100} className="h-full min-h-0">
                <div className="bg-[#FAF8F3] rounded-[12px] p-[24px] h-full flex flex-col">
                  <div className="text-[36px] font-archivo text-[#FF2424] mb-[8px]">3 hrs</div>
                  <p className="text-[14px] text-[#555] flex-1">Average time to recover from partial data corruption</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={400}>
              <p className="text-[16px] leading-[1.7] text-[#444] max-w-[800px]">
                Unlike SOQL queries, DML statements modify data. When you hit the limit mid-transaction, 
                Salesforce rolls back everything. But if you have mixed DML or external system integrations, 
                you might end up with orphaned records, inconsistent state, or data that can't be recovered.
              </p>
            </Reveal>
          </div>
        </section>

        {/* BAD CODE */}
        <section className="py-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <Reveal>
              <div className="flex items-center gap-[12px] mb-[24px]">
                <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
                  <AlertTriangle className="w-[20px] h-[20px] text-[#FF2424]" />
                </div>
                <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase">
                  The Bad Code
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[15px] text-[#666] mb-[20px]">
                This code looks harmless. Update each opportunity as you process it. What could go wrong?
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden">
                <div className="flex items-center justify-between px-[20px] py-[12px] border-b border-[#333]">
                  <span className="text-[12px] font-mono text-[#888]">OpportunityTriggerHandler.cls</span>
                  <span className="text-[10px] uppercase tracking-[1px] text-[#FF2424] font-bold">❌ Anti-Pattern</span>
                </div>
                <pre className="p-[20px] text-[13px] font-mono text-[#e0e0e0] overflow-x-auto leading-[1.6]">
                  {badCodeExample}
                </pre>
              </div>
            </Reveal>
          </div>
        </section>

        {/* JATAKA REPORT CARD */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <Reveal>
              <div className="flex items-center gap-[12px] mb-[24px]">
                <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center">
                  <Shield className="w-[20px] h-[20px] text-[#22c55e]" />
                </div>
                <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase">
                  Jataka Report Card
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[15px] text-[#666] mb-[30px]">
                Jataka executes this code in an isolated Sandbox and catches the DML breach before it touches Production.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#FAF8F3] rounded-[12px] border border-[#1a1a1a]/5 overflow-hidden">
                <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#1a1a1a]/5">
                  <div className="flex items-center gap-[12px]">
                    <CheckCircle className="w-[18px] h-[18px] text-[#22c55e]" />
                    <span className="font-medium text-[14px]">PR #312 Blocked</span>
                  </div>
                  <span className="text-[12px] text-[#666]">5 minutes ago</span>
                </div>

                <div className="p-[24px]">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] mb-[24px] items-stretch">
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[4px]">DML Statements</p>
                      <p className="text-[24px] font-archivo text-[#FF2424] flex-1">187<span className="text-[14px] text-[#888]">/150</span></p>
                    </div>
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[4px]">DML Rows</p>
                      <p className="text-[24px] font-archivo text-[#1a1a1a] flex-1">187<span className="text-[14px] text-[#888]">/10,000</span></p>
                    </div>
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[4px]">SOQL Queries</p>
                      <p className="text-[24px] font-archivo text-[#1a1a1a] flex-1">12<span className="text-[14px] text-[#888]">/100</span></p>
                    </div>
                    <div className="h-full flex flex-col">
                      <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[4px]">CPU Time</p>
                      <p className="text-[24px] font-archivo text-[#1a1a1a] flex-1">1,247ms<span className="text-[14px] text-[#888]">/10,000ms</span></p>
                    </div>
                  </div>

                  <div className="bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[8px] p-[16px]">
                    <div className="flex items-start gap-[12px]">
                      <AlertTriangle className="w-[18px] h-[18px] text-[#FF2424] flex-shrink-0 mt-[2px]" />
                      <div>
                        <p className="text-[14px] font-semibold text-[#FF2424] mb-[4px]">DML Limit Breach Detected</p>
                        <p className="text-[13px] text-[#555]">
                          Transaction executed 187 DML statements. Limit is 150. 
                          <strong className="text-[#1a1a1a]"> Found DML inside for loop at line 11.</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* THE FIX */}
        <section className="py-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <Reveal>
              <div className="flex items-center gap-[12px] mb-[24px]">
                <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center">
                  <CheckCircle className="w-[20px] h-[20px] text-[#22c55e]" />
                </div>
                <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase">
                  The Fix
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[15px] text-[#666] mb-[20px]">
                Collect all changes in memory. Execute one DML statement at the end.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden">
                <div className="flex items-center justify-between px-[20px] py-[12px] border-b border-[#333]">
                  <span className="text-[12px] font-mono text-[#888]">OpportunityTriggerHandler.cls</span>
                  <span className="text-[10px] uppercase tracking-[1px] text-[#22c55e] font-bold">✓ Bulkified</span>
                </div>
                <pre className="p-[20px] text-[13px] font-mono text-[#e0e0e0] overflow-x-auto leading-[1.6]">
                  {goodCodeExample}
                </pre>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-[24px] p-[20px] bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[8px]">
                <p className="text-[14px] text-[#444]">
                  <strong className="text-[#22c55e]">Result:</strong> 1 DML statement instead of 187. 
                  All records update atomically. No partial rollback. No data corruption.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* RELATED */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px]">
                Related Anti-Patterns
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] items-stretch">
              {relatedAntiPatterns.map((pattern) => (
                <Reveal key={pattern.id} delay={100} className="h-full min-h-0">
                  <Link
                    href={`/anti-patterns/${pattern.id}`}
                    className="w-full h-full min-h-0 text-left bg-[#FAF8F3] rounded-[12px] p-[24px] border border-[#1a1a1a]/5 hover:border-[#FF2424]/30 transition-all group flex flex-col"
                  >
                    <span 
                      className="text-[10px] font-bold uppercase tracking-[1.5px] px-[10px] py-[4px] rounded-[4px] mb-[12px] inline-block shrink-0"
                      style={{ 
                        backgroundColor: pattern.severity === "Critical" ? "#FF242415" : "#FF6B3515",
                        color: pattern.severity === "Critical" ? "#FF2424" : "#FF6B35"
                      }}
                    >
                      {pattern.severity}
                    </span>
                    <p className="text-[15px] font-medium group-hover:text-[#FF2424] transition-colors flex-1">
                      {pattern.title}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                Prevent data corruption
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Jataka catches DML 151<br />
                <span className="text-[#FF2424]">before the merge.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo and watch Jataka block this exact error in real-time. 
                Your data stays consistent.
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
                  All Anti-Patterns
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
