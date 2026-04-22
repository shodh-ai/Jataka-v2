"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Shield, Lock, Eye, FileSearch } from "lucide-react";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Compliance & Security Audit - Salesforce SOX/GDPR Audit Tool",
  "description": "Instantly trace exact User, Profile, and Permission Set access to sensitive PII fields across your Salesforce org. Turn a 3-week manual audit into a 3-second query.",
  "url": "https://jataka.io/compliance-security-xray"
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
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Compliance & Security Audit",
      "item": "https://jataka.io/compliance-security-xray"
    }
  ]
};

const features = [
  {
    icon: Eye,
    title: "PII Field Discovery",
    description: "Jataka automatically scans your entire Org schema to identify sensitive fields containing PII data like SSN, credit card numbers, and personal health information.",
    color: "#FF2424"
  },
  {
    icon: Lock,
    title: "Access Path Tracing",
    description: "Trace exactly which Users, Profiles, and Permission Sets have read or write access to each sensitive field. See the complete permission chain in seconds.",
    color: "#FF6B35"
  },
  {
    icon: FileSearch,
    title: "Compliance Reporting",
    description: "Generate audit-ready reports for SOX, GDPR, and HIPAA compliance. Document field-level security for auditors with a single query.",
    color: "#FFB800"
  },
  {
    icon: Shield,
    title: "Violation Detection",
    description: "Automatically flag overprivileged access. Detect when non-admin users have access to sensitive PII they shouldn't see.",
    color: "#22c55e"
  }
];

export default function ComplianceSecurityAuditPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
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
              <Link href="/architecture-agent" className="text-[#666] text-[14px] font-medium">Architecture Agent</Link>
              <Link href="/use-cases" className="text-[#666] text-[14px] font-medium">Use Cases</Link>
              <Link href="/book-pilot" className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px] text-center">Book Demo</Link>
            </div>
          </div>
        )}

        <section className="pt-[120px] pb-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <Shield className="w-[14px] h-[14px]" />
                Add-On Module
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                Compliance &<br />
                <span className="text-[#FF2424]">Security Audit</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[18px] leading-[1.7] text-[#444] max-w-[800px] mx-auto mb-[30px]">
                For CISOs and SOX/GDPR Auditors. Instantly trace exact 
                User, Profile, and Permission Set access to sensitive PII fields across your Salesforce org. Turn a 3-week manual audit into a 3-second query.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1100px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px] text-center">
                Four Pillars of<br />
                <span className="text-[#FF2424]">Security Intelligence</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mt-[60px]">
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={100 + index * 100}>
                  <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] border-l-[4px] h-full" style={{ borderLeftColor: feature.color }}>
                    <div className="flex items-center gap-[16px] mb-[20px]">
                      <div 
                        className="w-[60px] h-[60px] rounded-[12px] flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${feature.color}10` }}
                      >
                        <feature.icon className="w-[28px] h-[28px]" style={{ color: feature.color }} />
                      </div>
                      <h3 className="font-archivo text-[20px] tracking-[-0.5px] uppercase">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-[14px] text-[#555] leading-[1.6]">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[900px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px]">
                The Audit That Takes<br />
                <span className="text-[#FF2424]">3 Seconds</span>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-[#1a1a1a] rounded-[12px] p-[32px] text-left mb-[30px]">
                <p className="text-white/60 text-[13px] uppercase tracking-[2px] mb-[16px]">How It Works</p>
                <p className="text-white/40 text-[13px] mt-[16px]">
                  Jataka maps every User, Profile, and Permission Set relationship in your Salesforce org. 
                  Query any field to see exactly who has access. Complete access audit in 3 seconds. No manual tracing required.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
                <div className="bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[8px] p-[20px]">
                  <p className="font-archivo text-[32px] text-[#FF2424] mb-[8px]">3 weeks</p>
                  <p className="text-[13px] text-[#666]">Manual audit time</p>
                </div>
                <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[8px] p-[20px]">
                  <p className="font-archivo text-[32px] text-[#22c55e] mb-[8px]">3 seconds</p>
                  <p className="text-[13px] text-[#666]">With Jataka Audit</p>
                </div>
                <div className="bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-[8px] p-[20px]">
                  <p className="font-archivo text-[32px] text-[#FFB800] mb-[8px]">99.97%</p>
                  <p className="text-[13px] text-[#666]">Time reduction</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                For CISOs and Compliance Teams
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Pass Your Next Audit<br />
                <span className="text-[#FF2424]">In 3 Seconds.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo to see how Jataka traces PII access across your entire Salesforce org instantly.
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
                  href="/architecture-agent"
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Back to Architecture Agent
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
