"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Lock, Play, Code, AlertTriangle, CheckCircle, ArrowRight, Clock, Shield, Database } from "lucide-react";

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
  "headline": "How to Fix UNABLE_TO_LOCK_ROW: Data Skew & Lock Contention in Salesforce",
  "description": "Learn why data skew causes record lock contention and UNABLE_TO_LOCK_ROW errors, and how Jataka detects this anti-pattern before it hits production.",
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
    "@id": "https://jataka.io/anti-patterns/lock-contention"
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
      "name": "UNABLE_TO_LOCK_ROW",
      "item": "https://jataka.io/anti-patterns/lock-contention"
    }
  ]
};

const badCodeExample = `// ❌ BAD: Updating parent record when children have data skew
// Top Account has 50,000+ Contacts (data skew)

public void updateAccountIndustry(List<Contact> contacts) {
    Set<Id> accountIds = new Set<Id>();
    for (Contact c : contacts) {
        accountIds.add(c.AccountId);
    }
    
    // Lock contention on Account with 50,000 children
    List<Account> accounts = [
        SELECT Id, Industry 
        FROM Account 
        WHERE Id IN :accountIds
        FOR UPDATE  // ❌ Lock wait timeout!
    ];
    
    for (Account acc : accounts) {
        acc.Industry = 'Technology';
    }
    update accounts;
}`;

const goodCodeExample = `// ✅ GOOD: Avoid locking skewed parent records
// Use selective updates without parent locking

public void updateAccountIndustry(List<Contact> contacts) {
    Set<Id> accountIds = new Set<Id>();
    for (Contact c : contacts) {
        accountIds.add(c.AccountId);
    }
    
    // Update without explicit lock
    List<Account> accounts = [
        SELECT Id, Industry 
        FROM Account 
        WHERE Id IN :accountIds
        // No FOR UPDATE - let Salesforce handle locking
    ];
    
    // Batch updates to reduce contention
    Database.update(accounts, false); // Partial success allowed
    
    // Or: Use async processing for high-volume updates
    // System.enqueueJob(new AccountUpdateJob(accounts));
}`;

const dataSkewThresholds = [
  { type: "Account-Contact", threshold: "10,000+", impact: "Parent record lock contention" },
  { type: "Account-Opportunity", threshold: "10,000+", impact: "Sharing recalculation timeout" },
  { type: "Custom Object-Parent", threshold: "10,000+", impact: "Query performance degradation" }
];

const relatedAntiPatterns = [
  { id: "soql-101", title: "Too many SOQL queries: 101", severity: "Critical" },
  { id: "cpu-timeout", title: "Apex CPU time limit exceeded", severity: "Critical" },
  { id: "mixed-dml", title: "UNCOMMITTED_WORK_PENDING", severity: "High" }
];

export default function LockContentionPage() {
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
              <span className="text-[#1a1a1a]">Lock Contention</span>
            </div>
          </div>
        </div>

        {/* HERO */}
        <section className="pt-[40px] pb-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF6B35]/10 border border-[#FF6B35]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF6B35]">
                <Lock className="w-[14px] h-[14px]" />
                High Severity Limit Breach
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                System.DmlException:<br />
                <span className="text-[#FF6B35]">UNABLE_TO_LOCK_ROW</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <code className="inline-block text-[14px] font-mono text-[#666] bg-[#f5f5f5] px-[16px] py-[10px] rounded-[6px] mb-[30px]">
                System.DmlException: UNABLE_TO_LOCK_ROW, unable to obtain exclusive access to this record
              </code>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[17px] leading-[1.7] text-[#444] max-w-[800px] mb-[20px]">
                Data skew. Your top Account has 50,000 Contacts. Two users try to update the same parent field 
                simultaneously. Lock contention brings your org to a halt. The whole system freezes waiting for 
                a lock that never releases.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p className="text-[15px] leading-[1.6] text-[#666] max-w-[700px]">
                <strong className="text-[#1a1a1a]">2,400 developers</strong> search for this error every month. 
                It's the silent killer of enterprise Salesforce orgs, data skew accumulates over years until 
                one day, everything locks up.
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
                    <div className="w-[10px] h-[10px] rounded-full bg-[#FF6B35]"></div>
                    <span className="text-[12px] font-mono text-[#888]">Jataka detects data skew in real-time</span>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Clock className="w-[14px] h-[14px] text-[#666]" />
                    <span className="text-[12px] text-[#666]">1:08</span>
                  </div>
                </div>

                <div className="aspect-video bg-[#0a0a0a] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/10 to-transparent"></div>
                  <button className="relative z-10 w-[80px] h-[80px] rounded-full bg-[#FF6B35] flex items-center justify-center hover:scale-105 transition-transform">
                    <Play className="w-[32px] h-[32px] text-white ml-[4px]" fill="white" />
                  </button>
                  <div className="absolute bottom-[20px] left-[20px] right-[20px] flex items-center justify-between">
                    <span className="text-[11px] text-[#666]">Watch: Data skew detected → Jataka warns before lock</span>
                    <span className="text-[11px] text-[#888]">Loom Recording</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* DATA SKEW */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px]">
                The Problem: <span className="text-[#FF6B35]">Data Skew</span>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[16px] leading-[1.7] text-[#444] max-w-[800px] mb-[40px]">
                Data skew occurs when a single parent record has more than 10,000 child records. 
                Salesforce's locking mechanism can't handle concurrent updates to the same parent 
                when thousands of children are involved. The result: lock timeouts, failed updates, 
                and angry users.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-[40px] items-stretch">
              {dataSkewThresholds.map((threshold) => (
                <Reveal key={threshold.type} delay={200} className="h-full min-h-0">
                  <div className="bg-[#FAF8F3] rounded-[12px] p-[24px] border-l-4 border-[#FF6B35] h-full flex flex-col">
                    <p className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#FF6B35] mb-[8px]">
                      {threshold.type}
                    </p>
                    <p className="text-[28px] font-archivo text-[#1a1a1a] mb-[8px]">{threshold.threshold}</p>
                    <p className="text-[14px] text-[#555] flex-1">{threshold.impact}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-stretch">
              <Reveal delay={200} className="h-full min-h-0">
                <div className="bg-[#FAF8F3] rounded-[12px] p-[24px] h-full flex flex-col">
                  <div className="text-[36px] font-archivo text-[#FF6B35] mb-[8px]">8 hrs</div>
                  <p className="text-[14px] text-[#555] flex-1">Average downtime from lock contention incidents</p>
                </div>
              </Reveal>
              <Reveal delay={200} className="h-full min-h-0">
                <div className="bg-[#FAF8F3] rounded-[12px] p-[24px] h-full flex flex-col">
                  <div className="text-[36px] font-archivo text-[#FF6B35] mb-[8px]">5-10s</div>
                  <p className="text-[14px] text-[#555] flex-1">Lock wait timeout before the error is thrown</p>
                </div>
              </Reveal>
              <Reveal delay={200} className="h-full min-h-0">
                <div className="bg-[#FAF8F3] rounded-[12px] p-[24px] h-full flex flex-col">
                  <div className="text-[36px] font-archivo text-[#FF6B35] mb-[8px]">0</div>
                  <p className="text-[14px] text-[#555] flex-1">Tools that detect data skew before deployment</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* BAD CODE */}
        <section className="py-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <Reveal>
              <div className="flex items-center gap-[12px] mb-[24px]">
                <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF6B35]/10 flex items-center justify-center">
                  <AlertTriangle className="w-[20px] h-[20px] text-[#FF6B35]" />
                </div>
                <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase">
                  The Bad Code
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[15px] text-[#666] mb-[20px]">
                Explicit locking on a parent record with 50,000 children. A recipe for lock contention disaster.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden">
                <div className="flex items-center justify-between px-[20px] py-[12px] border-b border-[#333]">
                  <span className="text-[12px] font-mono text-[#888]">AccountUpdateTriggerHandler.cls</span>
                  <span className="text-[10px] uppercase tracking-[1px] text-[#FF6B35] font-bold">❌ Anti-Pattern</span>
                </div>
                <pre className="p-[20px] text-[13px] font-mono text-[#e0e0e0] overflow-x-auto leading-[1.6]">
                  {badCodeExample}
                </pre>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-[24px] p-[20px] bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-[8px]">
                <p className="text-[14px] text-[#444]">
                  <strong className="text-[#FF6B35]">Why this is dangerous:</strong> When multiple users or processes 
                  try to lock the same skewed parent record, Salesforce can't acquire the lock within the 5-10 second 
                  timeout. The transaction fails, and if this is in a trigger, every record in the batch fails.
                </p>
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
                Jataka's data skew analyzer detects parent records with excessive child counts and warns before lock contention occurs.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#FAF8F3] rounded-[12px] border border-[#1a1a1a]/5 overflow-hidden">
                <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#1a1a1a]/5">
                  <div className="flex items-center gap-[12px]">
                    <CheckCircle className="w-[18px] h-[18px] text-[#22c55e]" />
                    <span className="font-medium text-[14px]">PR #589 Warning</span>
                  </div>
                  <span className="text-[12px] text-[#666]">15 minutes ago</span>
                </div>

                <div className="p-[24px]">
                  <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-[8px] p-[16px] mb-[20px]">
                    <div className="flex items-start gap-[12px]">
                      <Database className="w-[18px] h-[18px] text-[#FF6B35] flex-shrink-0 mt-[2px]" />
                      <div>
                        <p className="text-[14px] font-semibold text-[#FF6B35] mb-[4px]">Data Skew Detected</p>
                        <p className="text-[13px] text-[#555] mb-[12px]">
                          Parent record has excessive child records. Lock contention risk high.
                        </p>
                        <div className="bg-white rounded-[6px] p-[12px]">
                          <div className="flex items-center justify-between text-[12px] mb-[8px]">
                            <span className="text-[#666]">Account: Acme Corp</span>
                            <span className="text-[#FF6B35] font-mono">52,847 Contacts</span>
                          </div>
                          <div className="flex items-center justify-between text-[12px]">
                            <span className="text-[#666]">Lock Wait Risk</span>
                            <span className="text-[#FF6B35] font-bold">HIGH</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#555]">
                    <strong className="text-[#1a1a1a]">Recommendation:</strong> Remove FOR UPDATE clause or use async processing 
                    to avoid concurrent lock attempts on this skewed parent record.
                  </p>
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
                Avoid explicit locking on skewed parent records. Use selective updates or async processing.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden">
                <div className="flex items-center justify-between px-[20px] py-[12px] border-b border-[#333]">
                  <span className="text-[12px] font-mono text-[#888]">AccountUpdateTriggerHandler.cls</span>
                  <span className="text-[10px] uppercase tracking-[1px] text-[#22c55e] font-bold">✓ Fixed</span>
                </div>
                <pre className="p-[20px] text-[13px] font-mono text-[#e0e0e0] overflow-x-auto leading-[1.6]">
                  {goodCodeExample}
                </pre>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-[24px] p-[20px] bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[8px]">
                <p className="text-[14px] text-[#444]">
                  <strong className="text-[#22c55e]">Result:</strong> No explicit lock on parent. Updates proceed without 
                  contention. Partial success mode allows individual record failures without blocking the entire batch.
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
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF6B35] mb-[30px]">
                Detect data skew before it locks
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Jataka detects lock contention risk<br />
                <span className="text-[#FF6B35]">before the merge.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo and watch Jataka analyze your data model for skew. 
                Your org stays fast under load.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row gap-[16px] justify-center">
                <Link 
                  href="/book-pilot"
                  className="group bg-[#FF6B35] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#e55a2b] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Book a Demo
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                </Link>
                <Link 
                  href="/anti-patterns"
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF6B35]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
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
