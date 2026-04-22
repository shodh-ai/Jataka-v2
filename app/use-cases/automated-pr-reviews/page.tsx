"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Users, AlertTriangle, CheckCircle, ArrowRight, Code, Zap, GitBranch, Clock } from "lucide-react";

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
  "headline": "Jataka for Offshore Dev Agencies - Code Quality at Scale",
  "description": "How Jataka automates code review and limit checking for offshore development agencies, freeing senior architects from manual PR reviews and enabling instant feedback for junior developers.",
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
    "@id": "https://jataka.io/use-cases/agency"
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
      "name": "Agency",
      "item": "https://jataka.io/use-cases/agency"
    }
  ]
};

export default function AgencyUseCase() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const problemMetrics = [
    { label: "Wasted Engineering Time", value: "20+ hrs/wk", description: "Senior architects stuck reviewing PRs instead of high-value architecture work" },
    { label: "Review Bottleneck", value: "2-4 hrs", description: "Average wait time for junior devs to get PR feedback" },
    { label: "Velocity Loss", value: "40%", description: "Junior devs blocked waiting for senior engineer availability" },
  ];

  const solutionFeatures = [
    {
      title: "Automated Limit Profiling",
      description: "Every PR is automatically profiled for Governor Limits. No manual code review needed for limit checking. Jataka catches what humans miss.",
      icon: Zap,
    },
    {
      title: "AI-Generated Test Cases",
      description: "Jataka analyzes your Apex code and generates test cases for uncovered paths. Increase code coverage without manual test writing.",
      icon: Code,
    },
    {
      title: "Blast Radius Prediction",
      description: "Before merging, know exactly which components will be affected. Our Knowledge graph analysis maps all dependencies and predicts impact.",
      icon: GitBranch,
    },
    {
      title: "Instant Junior Feedback",
      description: "Junior developers get actionable feedback within seconds of pushing code. No waiting for senior architects to review. Learning accelerates.",
      icon: Clock,
    },
  ];

  const resultMetrics = [
    { label: "Review Time Saved", value: "18 hrs/wk", trend: "90% reduction" },
    { label: "Junior Dev Velocity", value: "+40%", trend: "faster delivery" },
    { label: "Architecture Time", value: "+300%", trend: "more high-value work" },
    { label: "Agency Capacity", value: "+50%", trend: "without new hires" },
  ];

  const comparisonData = [
    { aspect: "Limit Checking", before: "Manual review of every SOQL query", after: "Automated profiling on every PR" },
    { aspect: "Test Coverage", before: "Junior devs write tests manually", after: "AI generates tests for uncovered paths" },
    { aspect: "Feedback Speed", before: "2-4 hours wait for senior review", after: "Instant feedback on push" },
    { aspect: "Senior Time", before: "20 hrs/wk on code review", after: "2 hrs/wk on architecture review" },
    { aspect: "Junior Learning", before: "Delayed, inconsistent feedback", after: "Immediate, consistent guidance" },
    { aspect: "Agency Scalability", before: "Limited by senior headcount", after: "Scales with junior talent" },
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
            AUTOMATED REVIEWS
          </div>
          
          <div className="relative z-10 max-w-[1000px]">
            <Reveal>
              <div className="flex items-center gap-[16px] mb-[40px]">
                <div className="w-[64px] h-[64px] rounded-[12px] bg-[#FF2424]/10 flex items-center justify-center">
                  <Users className="w-[28px] h-[28px] text-[#FF2424]" />
                </div>
                <div>
                  <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888]">Use Case 02</p>
                  <p className="text-[14px] text-[#FF2424] font-medium">Code Quality at Scale</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] uppercase mb-[40px]">
                Automate PR Reviews
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[30px]">
                Senior architects spend 20 hours a week manually reviewing junior developers' PRs and reading debug logs. 
                <strong className="text-[#1a1a1a] font-semibold"> They're drowning in code reviews instead of building architecture.</strong>
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
                Your best architects<br />
                <span className="text-[#FF2424]">are wasted on reviews.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[20px]">
                Your best architects, the ones who should be designing scalable systems, are stuck reading SOQL queries in for loops. 
                Every PR needs manual limit checking. Every deployment requires a senior engineer to approve.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[60px]">
                The agency can't scale because senior talent is wasted on junior work. Your architects are reading debug logs 
                instead of architecting solutions. <strong className="text-[#1a1a1a] font-semibold">The bottleneck is real, and it's killing velocity.</strong>
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
                Automate the review.<br />
                <span className="text-[#FF2424]">Free the architect.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[20px]">
                Jataka automates code review, limit checking, and test generation. Senior architects get their time back 
                while Jataka catches the issues they would have spent hours finding.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[60px]">
                When a junior developer pushes a PR, Jataka immediately analyzes it. It profiles the limits, identifies potential breaches, 
                and generates test cases for uncovered paths. Within seconds, the developer gets actionable feedback: 
                <strong className="text-[#1a1a1a] font-semibold"> 'Line 47 will breach SOQL limits at Production scale. Consider batching.'</strong> 
                No waiting for a senior architect to review.
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

        {/* ── COMPARISON SECTION ── */}
        <section className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">Before & After</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[60px]">
                The transformation<br />
                <span className="text-[#FF2424]">is immediate.</span>
              </h2>
            </Reveal>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#1a1a1a]/10">
                    <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#888]">Aspect</th>
                    <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#FF2424]">Before Jataka</th>
                    <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#1a1a1a]">After Jataka</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={row.aspect} className="border-b border-[#1a1a1a]/5">
                      <td className="py-[20px] px-[16px] text-[14px] font-medium text-[#1a1a1a]">{row.aspect}</td>
                      <td className="py-[20px] px-[16px] text-[14px] text-[#888]">{row.before}</td>
                      <td className="py-[20px] px-[16px] text-[14px] text-[#1a1a1a] font-medium">{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── RESULT SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
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
                Scale without<br />
                <span className="text-[#FF2424]">adding headcount.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[60px]">
                Senior architects focus on high-value architecture. Junior developers get instant feedback and learn faster. 
                Code quality improves automatically. <strong className="text-[#1a1a1a] font-semibold">The agency can scale without adding senior headcount.</strong>
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
                Ready to Scale Your Agency?
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Free your architects.<br />
                <span className="text-[#FF2424]">Accelerate your juniors.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo and see Jataka automate code review for your Salesforce team. 
                No more bottlenecks, just scalable, high-quality delivery.
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
