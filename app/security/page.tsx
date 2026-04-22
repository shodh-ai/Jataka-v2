"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Shield, Lock, Database, Zap, Key, Eye, Server, FileCheck, AlertTriangle, Download } from "lucide-react";

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

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Jataka Security - Enterprise Data Protection",
  "description": "Jataka's security architecture: Zero Data Retention for AI, No Production Access, AES-256 encryption, and ephemeral execution. Built for enterprise CISO requirements.",
  "url": "https://jataka.io/security"
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
      "name": "Security",
      "item": "https://jataka.io/security"
    }
  ]
};

const pillars = [
  {
    title: "Zero Data Retention for AI",
    icon: Eye,
    description: "We use enterprise-grade LLM APIs (OpenAI / Anthropic) with strict Zero Data Retention agreements. Your proprietary Apex code is never used to train public models.",
    details: [
      "Enterprise agreements with OpenAI and Anthropic",
      "Zero Data Retention (ZDR) mode enabled for all API calls",
      "Your code is processed, not stored or learned from",
      "No model training on customer data, ever"
    ]
  },
  {
    title: "No Production Access Required",
    icon: Server,
    description: "Jataka only needs OAuth access to your lower-level Sandboxes (Staging/Integration) to run its Kamikaze pods. We never touch your Production data.",
    details: [
      "OAuth scoped to Staging/Integration sandboxes only",
      "Production org access never requested",
      "Your customer data stays in your production org",
      "Sandbox data is test data, not real customer records"
    ]
  },
  {
    title: "Encrypted Credentials",
    icon: Key,
    description: "All Salesforce OAuth tokens and GitHub access keys are AES-256 encrypted at rest and rotated automatically.",
    details: [
      "AES-256 encryption for all stored credentials",
      "Automatic key rotation every 90 days",
      "Secrets stored in AWS Secrets Manager",
      "No plaintext credentials in logs or databases"
    ]
  },
  {
    title: "Ephemeral Execution",
    icon: Zap,
    description: "Kamikaze Pods are ephemeral. Once a PR is tested and the limit report is generated, the Kubernetes pod and all associated memory are instantly destroyed.",
    details: [
      "Kubernetes pods spin up per PR, then terminate",
      "No persistent storage of execution data",
      "Memory cleared after each test run",
      "Container isolation per customer"
    ]
  }
];

const compliance = [
  { name: "SOC 2 Type II", status: "In Progress", icon: FileCheck },
  { name: "Data Processing Agreement", status: "Available", icon: FileCheck },
  { name: "Penetration Testing", status: "Annual", icon: AlertTriangle }
];

export default function SecurityPage() {
  const router = useRouter();
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
              <button onClick={() => router.push("/")} className="text-[#666] text-[14px] font-medium">Home</button>
              <button onClick={() => router.push("/blog")} className="text-[#666] text-[14px] font-medium">Demos</button>
              <button onClick={() => router.push("/use-cases")} className="text-[#666] text-[14px] font-medium">Use Cases</button>
              <button onClick={() => router.push("/anti-patterns")} className="text-[#666] text-[14px] font-medium">Anti-Patterns</button>
              <button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px]">Book Demo</button>
            </div>
          </div>
        )}

        {/* HERO */}
        <section className="pt-[120px] pb-[40px] px-[24px] md:px-[48px]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#22c55e]/10 border border-[#22c55e]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#22c55e]">
                <Lock className="w-[14px] h-[14px]" />
                Enterprise-Grade Security
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                Built for<br />
                <span className="text-[#FF2424]">CISO Approval</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[18px] leading-[1.7] text-[#444] max-w-[700px] mx-auto">
                When the CTO says yes, the CISO takes over. Our security architecture is designed 
                to pass vendor security reviews without friction. No production access. No data retention. 
                No compromises.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 4 PILLARS */}
        <section className="py-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[50px] text-center">
                The 4 Pillars of Data Protection
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-stretch">
              {pillars.map((pillar) => (
                <Reveal key={pillar.title} delay={100} className="h-full min-h-0">
                  <div className="bg-white rounded-[12px] p-[28px] border border-[#1a1a1a]/5 h-full flex flex-col">
                    <div className="flex items-center gap-[16px] mb-[20px]">
                      <div className="w-[48px] h-[48px] rounded-[10px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0">
                        <pillar.icon className="w-[22px] h-[22px] text-[#FF2424]" />
                      </div>
                      <h3 className="font-archivo text-[18px] tracking-[-0.5px] uppercase">
                        {pillar.title}
                      </h3>
                    </div>
                    
                    <p className="text-[15px] text-[#444] leading-[1.7] mb-[20px] flex-1">
                      {pillar.description}
                    </p>

                    <ul className="space-y-[10px] shrink-0">
                      {pillar.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-[10px]">
                          <div className="w-[6px] h-[6px] rounded-full bg-[#22c55e] flex-shrink-0 mt-[6px]" />
                          <span className="text-[14px] text-[#555]">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* COMPLIANCE */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[800px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px] text-center">
                Compliance & Certifications
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] items-stretch">
                {compliance.map((item) => (
                  <div key={item.name} className="bg-[#FAF8F3] rounded-[10px] p-[20px] text-center h-full flex flex-col justify-center">
                    <item.icon className="w-[20px] h-[20px] text-[#FF2424] mx-auto mb-[12px]" />
                    <p className="font-archivo text-[14px] tracking-[-0.3px] mb-[4px]">{item.name}</p>
                    <p className="text-[12px] text-[#666]">{item.status}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[14px] text-[#666] text-center mt-[24px]">
                Need a specific certification or compliance document? <button onClick={() => router.push("/book-pilot")} className="text-[#FF2424] underline">Contact our team</button>.
              </p>
            </Reveal>
          </div>
        </section>

        {/* DATA FLOW DIAGRAM */}
        <section className="py-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[900px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px] text-center">
                How Data Flows (And Doesn't)
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-[#1a1a1a] rounded-[12px] p-[32px] text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] text-center items-stretch">
                  <div className="h-full flex flex-col items-center">
                    <div className="w-[48px] h-[48px] rounded-[10px] bg-[#FF2424]/20 flex items-center justify-center mx-auto mb-[16px]">
                      <Database className="w-[22px] h-[22px] text-[#FF2424]" />
                    </div>
                    <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[8px]">Your Sandbox</h3>
                    <p className="text-[13px] text-white/60 flex-1">Test data only. No production records. Jataka profiles limits here.</p>
                  </div>
                  
                  <div className="h-full flex flex-col items-center">
                    <div className="w-[48px] h-[48px] rounded-[10px] bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-[16px]">
                      <Shield className="w-[22px] h-[22px] text-[#22c55e]" />
                    </div>
                    <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[8px]">Jataka K8s Pod</h3>
                    <p className="text-[13px] text-white/60 flex-1">Ephemeral. Spins up, runs tests, generates report, destroys itself.</p>
                  </div>
                  
                  <div className="h-full flex flex-col items-center">
                    <div className="w-[48px] h-[48px] rounded-[10px] bg-white/10 flex items-center justify-center mx-auto mb-[16px]">
                      <Lock className="w-[22px] h-[22px] text-white" />
                    </div>
                    <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[8px]">Your GitHub</h3>
                    <p className="text-[13px] text-white/60 flex-1">PR comment with limit report. No code stored by Jataka.</p>
                  </div>
                </div>

                <div className="mt-[32px] pt-[24px] border-t border-white/10 text-center">
                  <p className="text-[14px] text-white/70">
                    <span className="text-[#FF2424]">✗</span> Production Org ,  <span className="text-white/50">Never accessed</span>
                    <span className="mx-[16px]">|</span>
                    <span className="text-[#FF2424]">✗</span> Customer Data ,  <span className="text-white/50">Never read</span>
                    <span className="mx-[16px]">|</span>
                    <span className="text-[#FF2424]">✗</span> Model Training ,  <span className="text-white/50">Never used</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECURITY WHITEPAPER */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[800px] mx-auto text-center">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px]">
                Need More Details?
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[18px] leading-[1.7] text-[#444] mb-[30px]">
                Our security whitepaper includes architecture diagrams, data flow maps, 
                encryption details, and incident response procedures.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-col md:flex-row gap-[16px] justify-center">
                <a 
                  href="/book-pilot"
                  className="group bg-[#1a1a1a] text-white px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#333] transition-all duration-300 inline-flex items-center justify-center gap-[10px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-[14px] h-[14px]" />
                  Download Whitepaper
                </a>
                <a 
                  href="/book-pilot"
                  className="group bg-transparent text-[#1a1a1a] px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] border border-[#1a1a1a]/20 hover:border-[#FF2424]/50 transition-all duration-300 inline-flex items-center justify-center gap-[10px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileCheck className="w-[14px] h-[14px]" />
                  Request Security Whitepaper
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                Ready for your security review?
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Start the pilot.<br />
                <span className="text-[#FF2424]">Security Review Ready.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                14-day zero-risk pilot. No production access. No data retention. 
                Complete security documentation for your review.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row gap-[16px] justify-center">
                <a 
                  href="/book-pilot"
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Your Pilot
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                </a>
                <button 
                  onClick={() => router.push("/pricing")} 
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  View Pricing
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
