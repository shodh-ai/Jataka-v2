"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Quote, AlertTriangle, Clock, Users, TrendingUp, CheckCircle } from "lucide-react";

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
  "name": "Jataka Customer Stories - Design Partner Results",
  "description": "See how Salesforce teams use Jataka to prevent Governor Limit breaches and save engineering hours. Real results from design partners.",
  "url": "https://jataka.io/customers"
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
      "name": "Customers",
      "item": "https://jataka.io/customers"
    }
  ]
};

const testimonials = [
  {
    quote: "We had a 101 SOQL limit breach take down our CPQ quoting engine on the last day of the quarter. Since installing Jataka's runtime firewall, we haven't had a single limit-related rollback. It caught 14 potential Sev-1s in our first month.",
    author: "Lead Salesforce Architect",
    company: "Fortune 500 Manufacturing Company",
    situation: "CPQ quoting engine crashed on quarter-end due to SOQL 101",
    impact: "$150K+ in lost deals and 4 hours of downtime",
    result: "Zero limit-related rollbacks since Jataka installation",
    metric: "14 Sev-1s prevented",
    icon: AlertTriangle
  },
  {
    quote: "Our QA team was spending 20 hours a week fixing broken Selenium scripts every time Salesforce updated a Lightning component. Jataka's Vision AI healed 45 broken tests automatically last sprint. It's magic.",
    author: "QA Automation Director",
    company: "Enterprise SaaS Company",
    situation: "20 hours/week on test maintenance after Lightning updates",
    impact: "QA bottleneck slowing release velocity",
    result: "45 broken tests healed automatically",
    metric: "20 hrs/week saved",
    icon: Clock
  },
  {
    quote: "We deployed a trigger that worked fine in dev but hit CPU timeout in production because of data skew. Jataka caught it in the PR review before it ever touched staging. The blast radius graph showed us exactly which accounts would have been affected.",
    author: "Senior Technical Architect",
    company: "Global Financial Services Firm",
    situation: "CPU timeout risk from data skew in trigger deployment",
    impact: "Would have caused production outage for 50K+ accounts",
    result: "Caught in PR before staging deployment",
    metric: "50K+ accounts protected",
    icon: TrendingUp
  },
  {
    quote: "Our offshore team was pushing code that passed PMD but crashed in production. Jataka's runtime profiler caught a DML 151 that static analysis completely missed. We've now made Jataka a required check before any merge.",
    author: "VP of Engineering",
    company: "Mid-Market Healthcare Technology",
    situation: "Static analysis passing code that crashed in production",
    impact: "Repeated rollbacks and production incidents",
    result: "Jataka now required before merge",
    metric: "Zero rollbacks in 3 months",
    icon: CheckCircle
  }
];

const stats = [
  { label: "Sev-1 incidents prevented", value: "200+" },
  { label: "Engineering hours saved", value: "5,000+" },
  { label: "Tests healed automatically", value: "1,200+" },
  { label: "Avg ROI for customers", value: "847%" }
];

export default function CustomersPage() {
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
              <Link href="/anti-patterns" className="text-[#666] text-[14px] font-medium">Anti-Patterns</Link>
              <Link href="/book-pilot" className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px]">Book Demo</Link>
            </div>
          </div>
        )}

        {/* HERO */}
        <section className="pt-[120px] pb-[40px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                Design Partner<br />
                <span className="text-[#FF2424]">Results</span>
              </h1>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[18px] leading-[1.7] text-[#444] max-w-[700px] mx-auto">
                Real teams. Real problems. Real results. See how Salesforce organizations 
                prevented production disasters and saved thousands of engineering hours.
              </p>
            </Reveal>
          </div>
        </section>

        {/* STATS */}
        <section className="py-[40px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] items-stretch">
              {stats.map((stat) => (
                <Reveal key={stat.label} delay={100} className="h-full min-h-0">
                  <div className="bg-white rounded-[12px] p-[24px] text-center border border-[#1a1a1a]/5 h-full flex flex-col justify-center">
                    <p className="text-[36px] font-archivo text-[#FF2424] mb-[8px]">{stat.value}</p>
                    <p className="text-[12px] uppercase tracking-[1px] text-[#666]">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase mb-[50px] text-center">
                Customer Stories
              </h2>
            </Reveal>

            <div className="space-y-[40px]">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.author} delay={100 + index * 100}>
                  <div className="bg-white rounded-[12px] p-[32px] border border-[#1a1a1a]/5">
                    {/* Quote */}
                    <div className="flex items-start gap-[16px] mb-[30px]">
                      <Quote className="w-[24px] h-[24px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                      <p className="text-[17px] leading-[1.8] text-[#333] italic">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-[12px] mb-[30px]">
                      <div className="w-[48px] h-[48px] rounded-full bg-[#1a1a1a]/10 flex items-center justify-center">
                        <Users className="w-[20px] h-[20px] text-[#666]" />
                      </div>
                      <div>
                        <p className="font-archivo text-[15px] tracking-[-0.3px]">{testimonial.author}</p>
                        <p className="text-[13px] text-[#666]">{testimonial.company}</p>
                      </div>
                    </div>

                    {/* Situation → Impact → Result */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[20px] items-stretch">
                      <div className="bg-[#FAF8F3] rounded-[8px] p-[16px] h-full flex flex-col">
                        <p className="text-[10px] uppercase tracking-[1.5px] text-[#FF6B35] mb-[8px]">Situation</p>
                        <p className="text-[14px] text-[#444] flex-1">{testimonial.situation}</p>
                      </div>
                      <div className="bg-[#FAF8F3] rounded-[8px] p-[16px] h-full flex flex-col">
                        <p className="text-[10px] uppercase tracking-[1.5px] text-[#FF2424] mb-[8px]">Impact</p>
                        <p className="text-[14px] text-[#444] flex-1">{testimonial.impact}</p>
                      </div>
                      <div className="bg-[#22c55e]/5 rounded-[8px] p-[16px] h-full flex flex-col">
                        <p className="text-[10px] uppercase tracking-[1.5px] text-[#22c55e] mb-[8px]">Result</p>
                        <p className="text-[14px] text-[#444] flex-1">{testimonial.result}</p>
                      </div>
                    </div>

                    {/* Metric */}
                    <div className="flex items-center gap-[10px]">
                      <div className="w-[32px] h-[32px] rounded-[6px] bg-[#FF2424]/10 flex items-center justify-center">
                        <testimonial.icon className="w-[16px] h-[16px] text-[#FF2424]" />
                      </div>
                      <span className="font-archivo text-[18px] text-[#FF2424]">{testimonial.metric}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* JOIN PILOT */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[800px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px]">
                Join the Next Cohort
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[18px] leading-[1.7] text-[#444] mb-[30px]">
                We're onboarding 5 design partners per month. Get priority access to our 
                14-day zero-risk pilot and see results like these in your own org.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="inline-flex items-center gap-[8px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[20px] py-[8px] rounded-[4px] mb-[30px]">
                <Clock className="w-[14px] h-[14px] text-[#FF2424]" />
                <span className="text-[13px] font-medium text-[#FF2424]">3 spots remaining for this month</span>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <Link 
                href="/book-pilot"
                className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 inline-flex items-center gap-[12px]"
              >
                Start Your Pilot
                <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                Your story could be next
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Prevent the next<br />
                <span className="text-[#FF2424]">production disaster.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Join the Salesforce teams who sleep better knowing Jataka is watching their PRs.
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
                  href="/roi-calculator"
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Calculate Your ROI
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
