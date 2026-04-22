"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, TestTube, AlertTriangle, CheckCircle, ArrowRight, Eye, RefreshCw, Zap, Clock } from "lucide-react";

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
  "@type": "Article",
  "headline": "Jataka for Testing & QA Infrastructure - Self-Healing UI Tests for Salesforce",
  "description": "How Jataka's AI automatically heals UI tests when Salesforce releases break test scripts, eliminating test maintenance overhead and keeping QA teams focused on testing new features.",
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
    "@id": "https://jataka.io/use-cases/qa-team"
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
      "name": "Use Cases",
      "item": "https://jataka.io/use-cases"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "QA Team",
      "item": "https://jataka.io/use-cases/qa-team"
    }
  ]
};

export default function QATeamUseCase() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const problemMetrics = [
    { label: "Broken Tests", value: "200+", description: "Test scripts fail after each Salesforce release" },
    { label: "Fix Time", value: "2 sprints", description: "QA team spends fixing test elements instead of testing" },
    { label: "Opportunity Cost", value: "High", description: "New features go untested while old tests get fixed" },
    { label: "QA Morale", value: "Low", description: "Talented QA engineers become maintenance workers" },
  ];

  const solutionFeatures = [
    {
      title: "Self-Healing Playwright Tests",
      description: "When Salesforce changes a UI element, our AI identifies it visually and updates the test element automatically. Tests stay green without human intervention.",
      icon: RefreshCw,
    },
    {
      title: "Visual Element Recognition",
      description: "We recognize UI elements the way a human does, by visual appearance, position, and context. No brittle test elements that break on every release.",
      icon: Eye,
    },
    {
      title: "Automatic Test Updates",
      description: "When an element changes, we update the test element in real-time. The test passes, and you get a notification about the change. Zero manual maintenance.",
      icon: Zap,
    },
    {
      title: "Zero Maintenance for UI Changes",
      description: "Salesforce releases 3 major updates per year. With Jataka, your UI tests stay green through all of them. No more sprint-killing maintenance cycles.",
      icon: Clock,
    },
  ];

  const resultMetrics = [
    { label: "Test Maintenance", value: "-90%", trend: "near zero" },
    { label: "Tests Passing", value: "99.5%", trend: "through releases" },
    { label: "QA Velocity", value: "+60%", trend: "more testing" },
    { label: "QA Satisfaction", value: "High", trend: "real work" },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "AI Scans UI",
      description: "When a test runs, our AI captures the current state of the Salesforce UI and identifies elements by their visual characteristics.",
    },
    {
      step: 2,
      title: "Element Matching",
      description: "We compare the current UI against our visual model. If Salesforce changed a button identifier or color, we recognize the button visually and map it to the expected element.",
    },
    {
      step: 3,
      title: "Automatic Healing",
      description: "If an element has changed, we automatically update the test element in real-time. The test continues as if nothing happened. You get a notification about the change.",
    },
    {
      step: 4,
      title: "Test Passes",
      description: "The test completes successfully. No maintenance required. No sprint lost to fixing test elements. QA team focuses on testing new features.",
    },
  ];

  const salesforceReleases = [
    { release: "Spring '24", changes: "Component updates, new button identifiers", testsBroken: "150+", jatakaResult: "0 broken" },
    { release: "Summer '24", changes: "Page layout changes", testsBroken: "200+", jatakaResult: "0 broken" },
    { release: "Winter '25", changes: "Color scheme updates, layout restructuring", testsBroken: "180+", jatakaResult: "0 broken" },
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
        

        {/* ── HERO SECTION ── */}
        <section className="relative min-h-[70vh] flex flex-col justify-center px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] pt-[120px] pb-[80px] overflow-hidden">
          <LightGridBg />
          <FloatingBlob className="top-[20%] right-[10%]" />
          <FloatingBlob className="bottom-[30%] left-[5%]" />
          
          {/* Large watermark */}
          <div className="absolute top-[50%] right-[-10%] transform -translate-y-1/2 font-archivo text-[200px] md:text-[300px] text-[#1a1a1a]/[0.02] uppercase tracking-[-12px] pointer-events-none select-none">
            QA
          </div>
          
          <div className="relative z-10 max-w-[1000px]">
            <Reveal>
              <div className="flex items-center gap-[16px] mb-[40px]">
                <div className="w-[64px] h-[64px] rounded-[12px] bg-[#FF2424]/10 flex items-center justify-center">
                  <TestTube className="w-[28px] h-[28px] text-[#FF2424]" />
                </div>
                <div>
                  <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888]">Use Case 03</p>
                  <p className="text-[14px] text-[#FF2424] font-medium">Killing Test Maintenance</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] uppercase mb-[40px]">
                Self-Healing UI Tests
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[30px]">
                Salesforce releases a UI update and 200 test scripts break. Jataka's AI automatically heals UI tests without human intervention. Tests stay green through every release.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap gap-[12px]">
                <Link href="/book-pilot" className="group bg-[#FF2424] text-white px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center gap-[10px]">
                  Book a Demo
                  <svg className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/docs" className="bg-transparent text-[#1a1a1a] px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] border border-[#1a1a1a]/20 hover:border-[#FF2424]/50 transition-all duration-300">
                  Read the Docs
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PROBLEM SECTION ── */}
        <section className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <div className="flex items-center gap-[10px] mb-[30px]">
                <AlertTriangle className="w-[18px] h-[18px] text-[#FF2424]" />
                <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#FF2424]">The Problem</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[30px]">
                Every release breaks<br />
                <span className="text-[#FF2424]">your tests.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[20px]">
                Salesforce updates components regularly. Buttons change identifiers. Colors shift. Layouts reorganize. 
                Your test scripts, built on brittle selectors, fail en masse.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[60px]">
                The QA team becomes a maintenance team, not a testing team. New features go untested while old tests get fixed. 
                <strong className="text-[#1a1a1a] font-semibold"> Every quarterly release means two weeks of maintenance hell.</strong>
              </p>
            </Reveal>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] items-stretch">
              {problemMetrics.map((metric) => (
                <Reveal key={metric.label} delay={400} className="h-full min-h-0">
                  <div className="bg-white rounded-[12px] p-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 h-full flex flex-col">
                    <div className="font-archivo text-[28px] md:text-[32px] leading-[1] tracking-[-0.5px] text-[#FF2424] mb-[12px]">
                      {metric.value}
                    </div>
                    <div className="text-[12px] font-medium uppercase tracking-[1px] text-[#888] mb-[8px]">
                      {metric.label}
                    </div>
                    <div className="text-[13px] leading-[1.5] text-[#666] flex-1">
                      {metric.description}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUTION SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <div className="flex items-center gap-[10px] mb-[30px]">
                <CheckCircle className="w-[18px] h-[18px] text-[#1a1a1a]" />
                <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#1a1a1a]">The Solution</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[30px]">
                AI that<br />
                <span className="text-[#FF2424]">heals your tests.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[20px]">
                Jataka's AI automatically heals UI tests without human intervention. When Salesforce changes a button identifier or color, 
                the AI figures it out and keeps the test passing.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[60px]">
                Our AI doesn't rely on brittle test elements. It recognizes UI elements the way a human does, by visual appearance, 
                position, and context. When Salesforce changes a button's attribute from 
                <code className="bg-[#1a1a1a]/5 px-[6px] py-[2px] rounded-[4px] text-[14px]">'submit-btn'</code> to 
                <code className="bg-[#1a1a1a]/5 px-[6px] py-[2px] rounded-[4px] text-[14px]">'submit-order-btn'</code>, the AI identifies the button visually, 
                updates the test element in real-time, and the test passes without human intervention.
              </p>
            </Reveal>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-stretch">
              {solutionFeatures.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <Reveal key={feature.title} delay={400} className="h-full min-h-0">
                    <div className="group bg-white rounded-[12px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 h-full flex flex-col">
                      <div className="flex items-start gap-[20px] flex-1">
                        <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF2424]/20 transition-colors">
                          <IconComponent className="w-[22px] h-[22px] text-[#FF2424]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-archivo text-[18px] uppercase tracking-[0.5px] mb-[12px]">
                            {feature.title}
                          </h3>
                          <p className="text-[15px] leading-[1.7] text-[#555]">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS SECTION ── */}
        <section className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">How It Works</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[60px]">
                Four steps to<br />
                <span className="text-[#FF2424]">zero maintenance.</span>
              </h2>
            </Reveal>

            <div className="space-y-[32px]">
              {howItWorks.map((step, index) => (
                <Reveal key={step.step} delay={200 + index * 50}>
                  <div className="flex gap-[24px] items-start">
                    <div className="flex-shrink-0 w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
                      <span className="font-archivo text-[18px] text-[#FF2424]">{step.step}</span>
                    </div>
                    <div className="flex-1 pt-[8px]">
                      <h3 className="font-archivo text-[18px] uppercase tracking-[0.5px] mb-[8px]">
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

        {/* ── SALESFORCE RELEASES SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">Real Results</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[60px]">
                Tests stay green<br />
                <span className="text-[#FF2424]">through every release.</span>
              </h2>
            </Reveal>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#1a1a1a]/10">
                    <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#888]">Release</th>
                    <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#888]">Changes</th>
                    <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#FF2424]">Without Jataka</th>
                    <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#1a1a1a]">With Jataka</th>
                  </tr>
                </thead>
                <tbody>
                  {salesforceReleases.map((row) => (
                    <tr key={row.release} className="border-b border-[#1a1a1a]/5">
                      <td className="py-[20px] px-[16px] text-[14px] font-medium text-[#1a1a1a]">{row.release}</td>
                      <td className="py-[20px] px-[16px] text-[14px] text-[#666]">{row.changes}</td>
                      <td className="py-[20px] px-[16px] text-[14px] text-[#FF2424]">{row.testsBroken}</td>
                      <td className="py-[20px] px-[16px] text-[14px] text-[#1a1a1a] font-medium">{row.jatakaResult}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── RESULT SECTION ── */}
        <section className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <div className="flex items-center gap-[10px] mb-[30px]">
                <ArrowRight className="w-[18px] h-[18px] text-[#FF2424]" />
                <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#FF2424]">The Result</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[30px]">
                QA becomes a<br />
                <span className="text-[#FF2424]">value driver.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[60px]">
                QA team focuses on testing new features. UI tests stay green through Salesforce releases. Zero maintenance overhead. 
                <strong className="text-[#1a1a1a] font-semibold">The team becomes a value driver, not a cost center.</strong>
              </p>
            </Reveal>

            {/* Result Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] items-stretch">
              {resultMetrics.map((metric) => (
                <Reveal key={metric.label} delay={300} className="h-full min-h-0">
                  <div className="bg-white rounded-[12px] p-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 h-full flex flex-col">
                    <div className="font-archivo text-[28px] md:text-[32px] leading-[1] tracking-[-0.5px] text-[#1a1a1a] mb-[8px]">
                      {metric.value}
                    </div>
                    <div className="text-[12px] font-medium uppercase tracking-[1px] text-[#888] mb-[4px]">
                      {metric.label}
                    </div>
                    <div className="text-[12px] text-[#FF2424] mt-auto pt-[4px]">
                      {metric.trend}
                    </div>
                  </div>
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
                Ready to Kill Test Maintenance?
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                See AI<br />
                <span className="text-[#FF2424]">heal your tests.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo and watch Jataka's AI automatically fix broken UI tests in real-time. 
                No more maintenance sprints, just continuous testing.
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
                  href="/use-cases"
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  View All Use Cases
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
