"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Shield, Search, Trash2, RefreshCw, CheckCircle } from "lucide-react";

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
  "@type": "WebPage",
  "name": "The Autonomous Architecture Agent - Clean Your Salesforce Org",
  "description": "Jataka hunts down legacy technical debt, enforces architectural best practices, and safely refactors spaghetti code before you hit Salesforce limits.",
  "url": "https://jataka.io/architecture-agent"
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
      "name": "Architecture Agent",
      "item": "https://jataka.io/architecture-agent"
    }
  ]
};

const features = [
  {
    number: "01",
    title: "Active Org-Bloat Prevention",
    subtitle: "The PR Guardrail",
    icon: Shield,
    color: "#FF2424",
    problem: "Developers are terrified to reuse old fields, so they just create new ones until the org hits the 500 custom-field limit and paralyzes the business.",
    solution: "When a developer opens a PR trying to create a new field (e.g., Invoice_Sum__c), Jataka queries the graph, finds an identical existing field (Total_Amount__c), and instantly blocks the PR.",
    enforcement: "Jataka reads the Jira intent. If a developer tries to build a complex Record-Triggered Flow that will cause a CPU timeout at scale, Jataka blocks the PR and enforces the architectural standard: 'This logic requires an asynchronous Apex Trigger. Refactor required.' We enforce your architecture automatically."
  },
  {
    number: "02",
    title: "Orphan Node Discovery",
    subtitle: "Dead Code Detection",
    icon: Search,
    color: "#FF6B35",
    problem: "System Integrators spend thousands of billable hours manually tracing fields and Apex classes to see what is safe to delete during an Org Cleanup or M&A Merge.",
    solution: "Because Jataka maps every dependency directionally, we can instantly identify Orphan Nodes, custom fields, old workflow rules, and Apex classes that have zero connections to the active UI or database logic. We turn a 3-month manual audit into a 3-second query."
  },
  {
    number: "03",
    title: "Autonomous Refactoring & Safe Deletion",
    subtitle: "AI That Actually Cleans Up",
    icon: Trash2,
    color: "#FFB800",
    problem: "Other tools suggest deleting tech debt, but nobody actually deletes it because they fear breaking Production.",
    solution: "Jataka takes the Orphan Nodes and autonomously generates the destructiveChanges.xml files to permanently delete the dead weight. It then uses the LLM to rewrite and condense legacy spaghetti Apex into clean, modern code."
  },
  {
    number: "04",
    title: "The Run-Clean-Run Verification Protocol",
    subtitle: "Mathematically Guaranteed Safe Refactoring",
    icon: RefreshCw,
    color: "#22c55e",
    problem: "How do you prove that cleanup didn't break anything?",
    solution: "Before Jataka deletes a field or refactors a legacy Trigger, it runs our API Limit Firewall to capture a baseline of the org's business logic. After the cleanup, Jataka runs the exact same API test again.",
    result: "We prove mathematically that the org performs the exact same business logic, but with 50% less code and zero governor limit breaches."
  }
];

export default function ArchitectureAgentPage() {
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
              <Link href="/use-cases" className="text-[#666] text-[14px] font-medium">Use Cases</Link>
              <Link href="/anti-patterns" className="text-[#666] text-[14px] font-medium">Anti-Patterns</Link>
              <Link href="/book-pilot" className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px] text-center">Book Demo</Link>
            </div>
          </div>
        )}

        {/* HERO */}
        <section className="pt-[120px] pb-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <Shield className="w-[14px] h-[14px]" />
                Technical Debt Hunter
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                Don't just test your code.<br />
                <span className="text-[#FF2424]">Clean Your Org.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[18px] leading-[1.7] text-[#444] max-w-[800px] mx-auto mb-[30px]">
                Jataka doesn't just predict the blast radius of new code, it actively hunts down 
                10 years of legacy technical debt, enforces architectural best practices, and safely refactors 
                spaghetti code before you hit Salesforce limits.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1100px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px] text-center">
                Four Pillars of<br />
                <span className="text-[#FF2424]">Autonomous Architecture</span>
              </h2>
            </Reveal>

            <Reveal delay={50}>
              <p className="text-[16px] text-[#666] text-center mb-[60px] max-w-[700px] mx-auto">
                Jataka doesn't just find your technical debt. It hunts it down, verifies it's safe to remove, 
                and autonomously cleans it up with mathematical proof that nothing breaks.
              </p>
            </Reveal>

            <div className="space-y-[40px]">
              {features.map((feature, index) => (
                <Reveal key={feature.number} delay={100 + index * 100}>
                  <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-[24px] lg:gap-[40px]">
                    {/* Feature Number */}
                    <div className="flex lg:flex-col items-center lg:items-start gap-[16px] lg:gap-0">
                      <div 
                        className="w-[80px] h-[80px] rounded-[12px] flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${feature.color}10` }}
                      >
                        <feature.icon className="w-[36px] h-[36px]" style={{ color: feature.color }} />
                      </div>
                      <div className="lg:mt-[12px]">
                        <span 
                          className="font-archivo text-[32px] tracking-[-1px]"
                          style={{ color: feature.color }}
                        >
                          {feature.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] border-l-[4px]" style={{ borderLeftColor: feature.color }}>
                      <div className="mb-[20px]">
                        <h3 className="font-archivo text-[22px] tracking-[-0.5px] uppercase mb-[4px]">
                          {feature.title}
                        </h3>
                        <p className="text-[12px] uppercase tracking-[1.5px] text-[#666]">
                          {feature.subtitle}
                        </p>
                      </div>

                      <div className="space-y-[16px]">
                        <div>
                          <p className="text-[11px] uppercase tracking-[1px] text-[#FF2424] font-bold mb-[6px]">The Problem</p>
                          <p className="text-[14px] text-[#555] leading-[1.6]">{feature.problem}</p>
                        </div>
                        
                        <div>
                          <p className="text-[11px] uppercase tracking-[1px] text-[#22c55e] font-bold mb-[6px]">The Jataka Solution</p>
                          <p className="text-[14px] text-[#555] leading-[1.6]">{feature.solution}</p>
                        </div>

                        {feature.enforcement && (
                          <div className="bg-white rounded-[8px] p-[16px] border border-[#1a1a1a]/5">
                            <p className="text-[13px] text-[#444] leading-[1.6]">
                              <strong>Architecture Enforcement:</strong> {feature.enforcement}
                            </p>
                          </div>
                        )}

                        {feature.result && (
                          <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[8px] p-[16px]">
                            <p className="text-[13px] text-[#444] leading-[1.6]">
                              <strong className="text-[#22c55e]">The Result:</strong> {feature.result}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ARCHITECTURE INTELLIGENCE */}
        <section className="py-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[900px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px]">
                Powered by<br />
                <span className="text-[#FF2424]">Architecture Intelligence</span>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[17px] leading-[1.7] text-[#444] mb-[30px]">
                Every field, every Apex class, every Flow, every validation rule, mapped with 
                directional relationships. Jataka knows what references what, what depends on what, 
                and what is truly orphaned.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[12px] p-[24px]">
                <p className="text-[14px] text-[#444] leading-[1.6]">
                  <strong className="text-[#22c55e]">3 seconds vs 3 months:</strong> What takes a human consultant 
                  3 months to trace manually, Jataka identifies instantly through automated analysis. 
                  Orphan nodes, dead code, and legacy technical debt surface automatically.
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
                Stop fearing your org's technical debt
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                10 years of legacy code.<br />
                <span className="text-[#FF2424]">Cleaned in 10 minutes.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo to see Jataka identify orphan nodes, generate deletion manifests, 
                and mathematically prove your refactoring is safe.
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
                  See All Use Cases
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
