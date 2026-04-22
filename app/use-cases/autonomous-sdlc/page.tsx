"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, CheckCircle, Zap, GitBranch, Ticket, Bot, Database, Play, FileCheck, Clock, Users, Cpu } from "lucide-react";

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
  "name": "Autonomous SDLC - Jataka's Closed Loop Automation",
  "description": "Jataka automates the entire Software Development Life Cycle: Jira to Cursor to GitHub to Jataka and back. Developers stay in their IDE while Jataka handles orchestration, testing, and ticket management.",
  "url": "https://jataka.io/use-cases/autonomous-sdlc"
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
      "name": "Use Cases",
      "item": "https://jataka.io/use-cases"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Autonomous SDLC",
      "item": "https://jataka.io/use-cases/autonomous-sdlc"
    }
  ]
};

const steps = [
  {
    number: "01",
    title: "Intent",
    subtitle: "Jira Integration",
    icon: Ticket,
    color: "#FF2424",
    description: "Jataka reads the Jira ticket and updates the Knowledge graph with the business intent.",
    details: [
      "Parse Jira ticket description and acceptance criteria",
      "Map requirements to existing Salesforce metadata",
      "Update Knowledge graph with feature context",
      "Identify affected objects, classes, and flows"
    ],
    outcome: "Your feature requirements become structured context that every tool in your pipeline can access."
  },
  {
    number: "02",
    title: "Code",
    subtitle: "Cursor IDE + MCP",
    icon: Cpu,
    color: "#FF6B35",
    description: "Through our MCP, your developer asks Cursor how to build the feature. Jataka feeds Cursor the exact blast radius and safe code patterns.",
    details: [
      "Developer asks Cursor: 'How do I implement this Jira ticket?'",
      "Jataka's MCP server provides org-specific context",
      "Cursor receives blast radius analysis before coding",
      "Safe code patterns auto-suggested based on your org"
    ],
    outcome: "Your developers write correct code the first time. No guessing. No trial-and-error."
  },
  {
    number: "03",
    title: "Verify",
    subtitle: "GitHub PR Analysis",
    icon: GitBranch,
    color: "#FFB800",
    description: "The developer opens a PR. Jataka's API Firewall and Kamikaze Pods test the limits and the UI automatically.",
    details: [
      "PR triggers Kamikaze Pod in isolated Sandbox",
      "Runtime profiling of SOQL, DML, CPU, Heap",
      "Vision AI tests the UI in real browser",
      "Hybrid SOQL assertions verify database state"
    ],
    outcome: "Every PR is tested against real Salesforce limits, not just static analysis guesses."
  },
  {
    number: "04",
    title: "Resolve",
    subtitle: "Jira + Cursor Feedback",
    icon: CheckCircle,
    color: "#22c55e",
    description: "If limits breach, Jataka sends feedback back to Cursor. If it passes, Jataka updates the Jira ticket to 'Ready for Deployment' with attached video proof.",
    details: [
      "Limit breach → AI fix sent to Cursor for developer",
      "Pass → Jira ticket auto-updated to 'Ready for Deployment'",
      "Video proof of successful test attached to ticket",
      "Deployment approval triggered automatically"
    ],
    outcome: "Your developers stay in their IDE. Jataka handles the orchestration, testing, and ticket management."
  }
];

const benefits = [
  {
    metric: "80%",
    label: "Reduction in context switching",
    description: "Developers stay in Cursor. No more jumping between Jira, GitHub, and Slack."
  },
  {
    metric: "60%",
    label: "Faster time to production",
    description: "Automated testing and ticket management eliminates manual handoffs."
  },
  {
    metric: "0",
    label: "Manual QA bottlenecks",
    description: "Jataka's Kamikaze Pods and Vision AI test every PR automatically."
  },
  {
    metric: "100%",
    label: "Traceability from ticket to deploy",
    description: "Every line of code traced back to its Jira ticket requirement."
  }
];

export default function AutonomousSDLCPage() {
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
            <div className="absolute top-[64px] left-0 w-full bg-[#FAF8F3] border-b border-[#1a1a1a]/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl z-[190]">
              <Link href="/pricing" className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Pricing</Link>
              <Link href="/security" className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Security</Link>
              <Link href="/customers" className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Customers</Link>
              <Link href="/book-pilot" className="w-full py-3 mt-2 rounded-[4px] bg-[#FF2424] text-white font-archivo uppercase tracking-[1.5px] text-[12px] flex items-center justify-center">
                Start Pilot
              </Link>
            </div>
          </div>
        )}

        {/* HERO */}
        <section className="pt-[120px] pb-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <Bot className="w-[14px] h-[14px]" />
                Highest-Value IP
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                The Autonomous<br />
                <span className="text-[#FF2424]">SDLC</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[18px] leading-[1.7] text-[#444] max-w-[700px] mx-auto mb-[30px]">
                Jataka doesn't just wait for pull requests. It manages the entire lifecycle. 
                This closed loop ,  <strong className="text-[#1a1a1a]">Jira to Cursor to GitHub to Jataka back to Jira</strong> ,  
                is your highest-value intellectual property.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[16px] text-[#666] max-w-[600px] mx-auto mb-[40px]">
                You aren't just catching limits; you are automating the entire Software Development Life Cycle.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CLOSED LOOP DIAGRAM */}
        <section className="pb-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[900px] mx-auto relative z-10">
            <Reveal>
              <div className="bg-[#1a1a1a] rounded-[12px] p-[40px] text-white">
                <div className="text-center mb-[30px]">
                  <p className="text-[12px] uppercase tracking-[2px] text-[#FF2424] mb-[8px]">The Closed Loop</p>
                  <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase">Jira → Cursor → GitHub → Jataka → Jira</h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-[20px] md:gap-[16px]">
                  {[
                    { name: "Jira", number: "01", color: "#FF2424" },
                    { name: "Cursor", number: "02", color: "#FF6B35" },
                    { name: "GitHub", number: "03", color: "#FFB800" },
                    { name: "Jataka", icon: "J", color: "#FF2424", isJataka: true },
                  ].map((item, index) => (
                    <React.Fragment key={item.name}>
                      <div className="text-center">
                        <div 
                          className={`w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-[8px] ${item.isJataka ? 'bg-[#FF2424] text-white font-bold text-[24px]' : ''}`}
                          style={!item.isJataka ? { backgroundColor: `${item.color}15` } : {}}
                        >
                          {item.isJataka ? item.icon : <span className="font-archivo text-[16px] font-bold" style={{ color: item.color }}>{item.number}</span>}
                        </div>
                        <span className="text-[11px] uppercase tracking-[1px] text-white/70">{item.name}</span>
                      </div>
                      {index < 3 && (
                        <span className="text-[#FF2424] text-[20px] hidden md:block">→</span>
                      )}
                    </React.Fragment>
                  ))}
                  <span className="text-[#22c55e] text-[20px] hidden md:block">↩</span>
                </div>

                <div className="mt-[30px] pt-[24px] border-t border-white/10 text-center">
                  <p className="text-[14px] text-white/70">
                    Your developers stay in their IDE. Jataka handles the <span className="text-[#FF2424]">orchestration</span>, 
                    the <span className="text-[#FF2424]">testing</span>, and the <span className="text-[#FF2424]">ticket management</span>.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 4 STEPS */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1100px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px] text-center">
                How It Works
              </h2>
            </Reveal>

            <Reveal delay={50}>
              <p className="text-[16px] text-[#666] text-center mb-[50px]">
                Four steps that transform your Salesforce development workflow.
              </p>
            </Reveal>

            <div className="space-y-[40px]">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={100 + index * 100}>
                  <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-[24px] lg:gap-[40px]">
                    {/* Step Number */}
                    <div className="flex lg:flex-col items-center lg:items-start gap-[16px] lg:gap-0">
                      <div 
                        className="w-[80px] h-[80px] rounded-[12px] flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${step.color}10` }}
                      >
                        <step.icon className="w-[36px] h-[36px]" style={{ color: step.color }} />
                      </div>
                      <div className="lg:mt-[12px]">
                        <span 
                          className="font-archivo text-[32px] tracking-[-1px]"
                          style={{ color: step.color }}
                        >
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] border-l-[4px]" style={{ borderLeftColor: step.color }}>
                      <div className="flex flex-col md:flex-row md:items-start gap-[16px] md:gap-[40px]">
                        <div className="flex-1">
                          <h3 className="font-archivo text-[22px] tracking-[-0.5px] uppercase mb-[4px]">
                            {step.title}
                          </h3>
                          <p className="text-[12px] uppercase tracking-[1.5px] text-[#666] mb-[16px]">
                            {step.subtitle}
                          </p>
                          <p className="text-[15px] text-[#444] leading-[1.7] mb-[20px]">
                            {step.description}
                          </p>
                          <ul className="space-y-[8px]">
                            {step.details.map((detail) => (
                              <li key={detail} className="flex items-start gap-[10px]">
                                <div 
                                  className="w-[5px] h-[5px] rounded-full flex-shrink-0 mt-[6px]"
                                  style={{ backgroundColor: step.color }}
                                />
                                <span className="text-[14px] text-[#555]">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:w-[200px] flex-shrink-0">
                          <div className="bg-white rounded-[8px] p-[16px] border border-[#1a1a1a]/5">
                            <p className="text-[10px] uppercase tracking-[1px] text-[#666] mb-[8px]">Outcome</p>
                            <p className="text-[13px] text-[#444] leading-[1.6]">{step.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[40px] text-center">
                The Results
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] items-stretch">
              {benefits.map((benefit) => (
                <Reveal key={benefit.label} delay={100} className="h-full min-h-0">
                  <div className="bg-white rounded-[12px] p-[24px] text-center border border-[#1a1a1a]/5 h-full flex flex-col">
                    <p className="text-[42px] font-archivo text-[#FF2424] mb-[8px]">{benefit.metric}</p>
                    <p className="text-[12px] uppercase tracking-[1px] text-[#666] mb-[12px]">{benefit.label}</p>
                    <p className="text-[13px] text-[#555] leading-[1.6] flex-1">{benefit.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Knowledge CONTEXT */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[800px] mx-auto text-center relative z-10">
            <Reveal>
              <div className="w-[60px] h-[60px] rounded-[12px] bg-[#FF2424]/10 flex items-center justify-center mx-auto mb-[24px]">
                <Database className="w-[28px] h-[28px] text-[#FF2424]" />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px]">
                Powered by Knowledge
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#444] mb-[30px]">
                Every tool in the closed loop ,  Jira, Cursor, GitHub ,  accesses the same 
                <strong className="text-[#1a1a1a]"> Knowledge Knowledge Graph</strong>. Your entire Salesforce org's 
                metadata, relationships, and blast radius live in one place. When a Jira ticket is created, 
                Jataka already knows what it affects.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-[#FAF8F3] rounded-[12px] p-[24px] border border-[#1a1a1a]/5">
                <p className="text-[14px] text-[#555] leading-[1.7]">
                  <strong className="text-[#FF2424]">Example:</strong> A Jira ticket says "Add validation to Account.Name". 
                  Jataka's Knowledge graph instantly shows: 3 triggers, 7 flows, 12 Apex classes, and 2 integrations 
                  that reference Account.Name. Cursor gets this context before your developer writes a single line.
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
                Automate your SDLC
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Stop managing tools.<br />
                <span className="text-[#FF2424]">Start managing code.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                The closed loop is your competitive advantage. Let Jataka orchestrate your 
                entire development lifecycle while your developers focus on building.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row gap-[16px] justify-center">
                <Link 
                  href="/book-pilot"
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Start Your Pilot
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
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
    </>
  );
}
