"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Activity, Video, Clock, Bell } from "lucide-react";

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
  "name": "Synthetic Production Monitoring - Salesforce SRE Tool",
  "description": "Jataka runs synthetic monitoring against your Production environment every 15 minutes. We autonomously verify critical UI flows and page your team with video evidence the second the UI breaks.",
  "url": "https://jataka.io/synthetic-production-monitoring"
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
      "name": "Synthetic Production Monitoring",
      "item": "https://jataka.io/synthetic-production-monitoring"
    }
  ]
};

const features = [
  {
    icon: Clock,
    title: "15-Minute Cadence",
    description: "Automated monitoring executes synthetic transactions against Production every 15 minutes, 24/7. Never wait for a user to report a broken UI.",
    color: "#FF2424"
  },
  {
    icon: Activity,
    title: "Critical Flow Monitoring",
    description: "Define your most critical user journeys, CPQ quoting, Opportunity creation, Case resolution. Jataka verifies they work end-to-end in your actual Production org.",
    color: "#FF6B35"
  },
  {
    icon: Video,
    title: "Video Evidence Capture",
    description: "When a flow breaks, Jataka captures video evidence of exactly what failed, where the UI broke, and what error appeared. No more 'works on my machine' debugging.",
    color: "#FFB800"
  },
  {
    icon: Bell,
    title: "Instant Paging",
    description: "Integrates with PagerDuty, Slack, and ServiceNow. Your SRE team knows about Production issues within minutes, not hours or days.",
    color: "#22c55e"
  }
];

export default function SyntheticProductionMonitoringPage() {
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
                <Activity className="w-[14px] h-[14px]" />
                Add-On Module
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                Synthetic Production<br />
                <span className="text-[#FF2424]">Monitoring</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[18px] leading-[1.7] text-[#444] max-w-[800px] mx-auto mb-[30px]">
                For Site Reliability Engineers (SRE). Jataka runs synthetic monitoring against your 
                Production environment every 15 minutes. We autonomously verify critical UI flows and page 
                your team with video evidence the second the UI breaks.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1100px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px] text-center">
                Production-Grade<br />
                <span className="text-[#FF2424]">Reliability</span>
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
          <div className="max-w-[900px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px] text-center">
                How The <span className="text-[#FF2424]">Monitoring</span> Works
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-[#1a1a1a] rounded-[12px] p-[32px] mb-[30px]">
                <div className="space-y-[24px]">
                  <div className="flex items-start gap-[20px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#FF2424]/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-archivo text-[14px] text-[#FF2424] font-bold">01</span>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-[6px]">Define Critical Flows</p>
                      <p className="text-white/60 text-[14px] leading-[1.6]">You define the user journeys that matter most: creating an Opportunity, generating a CPQ Quote, closing a Case. Jataka records the expected happy path.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-[20px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#FF6B35]/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-archivo text-[14px] text-[#FF6B35] font-bold">02</span>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-[6px]">Monitoring Executes</p>
                      <p className="text-white/60 text-[14px] leading-[1.6]">Every 15 minutes, automated monitoring executes the full user journey in your Production org using real UI automation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-[20px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#FFB800]/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-archivo text-[14px] text-[#FFB800] font-bold">03</span>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-[6px]">Capture Evidence</p>
                      <p className="text-white/60 text-[14px] leading-[1.6]">If any step fails, Jataka captures video of the exact failure point, console logs, and network traces. Your team sees exactly what broke.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-[20px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#22c55e]/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-archivo text-[14px] text-[#22c55e] font-bold">04</span>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-[6px]">Instant Alerting</p>
                      <p className="text-white/60 text-[14px] leading-[1.6]">PagerDuty, Slack, ServiceNow integrations trigger immediately. SREs get the video evidence and can respond before users even notice the issue.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[12px] p-[24px]">
                <p className="text-[14px] text-[#444] leading-[1.6] text-center">
                  <strong className="text-[#FF2424]">Synthetic vs Real User Monitoring:</strong> While APM tools wait for real users to hit errors, 
                  Jataka finds them first. Catch the broken CPQ flow at 2:47 AM, not when your sales team tries to quote at 9 AM.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                For Site Reliability Engineers
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Know About Failures<br />
                <span className="text-[#FF2424]">Before Users Do.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo to see how Jataka's synthetic monitoring catches Production issues with video evidence.
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
