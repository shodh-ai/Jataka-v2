"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Check, Users, Zap, Shield, Building, Clock, Cpu, Database } from "lucide-react";

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
  "name": "Jataka Pricing - Team & Enterprise Plans",
  "description": "Transparent pricing for Salesforce runtime security. Team plan at $1,000/month, Enterprise at $3,000/month. No hidden fees.",
  "url": "https://jataka.io/pricing"
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
      "name": "Pricing",
      "item": "https://jataka.io/pricing"
    }
  ]
};

const plans = [
  {
    name: "Team / Agency",
    price: "$1,000",
    period: "/month",
    description: "For growing Salesforce teams and consulting agencies.",
    features: [
      { text: "Up to 10 Developer Seats", included: true },
      { text: "Slack Bot & VS Code MCP access", included: true },
      { text: "1,000 PR limit analyses/month", included: true },
      { text: "500 Kamikaze UI Tests/month", included: true },
      { text: "1 K8s Pod (sequential tests)", included: true },
      { text: "$0.10 per additional PR check", included: true },
      { text: "Day 0 Retroactive Audit", included: false },
      { text: "Knowledge Blast Radius Graph", included: false },
    ],
    cta: "Start Pilot",
    highlight: false
  },
  {
    name: "Enterprise Velocity",
    price: "$3,000",
    period: "/month",
    description: "For large Salesforce orgs with complex deployments.",
    features: [
      { text: "Up to 30 Developer Seats", included: true },
      { text: "Up to 3 Connected Salesforce Environments (e.g., Dev, Staging, UAT)", included: true },
      { text: "Slack Bot & VS Code MCP access", included: true },
      { text: "4,000 PR limit analyses/month", included: true },
      { text: "2,000 Kamikaze UI Tests/month", included: true },
      { text: "3 K8s Pods (parallel tests)", included: true },
      { text: "Day 0 Retroactive Risk Audit", included: true },
      { text: "Knowledge Blast Radius Graph", included: true },
      { text: "Priority support & SLA", included: true },
    ],
    cta: "Start Pilot",
    highlight: true
  },
  {
    name: "Custom",
    price: "Let's Talk",
    period: "",
    description: "For enterprises with unique requirements.",
    features: [
      { text: "Unlimited Developer Seats", included: true },
      { text: "Custom PR analysis volume", included: true },
      { text: "Dedicated K8s cluster", included: true },
      { text: "Private Azure OpenAI / AWS Bedrock endpoint routing for Zero Data Exfiltration", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated success manager", included: true },
      { text: "24/7 support", included: true },
      { text: "Custom SLA", included: true },
    ],
    cta: "Contact Sales",
    highlight: false
  }
];

const faqs = [
  {
    question: "What happens if I exceed my PR analysis limit?",
    answer: "You're charged $0.10 per additional PR check. This ensures you never lose money, you only pay for what you use. We'll notify you at 80% capacity so there are no surprises."
  },
  {
    question: "Can I switch plans mid-contract?",
    answer: "Yes. You can upgrade anytime. Downgrades take effect at the next billing cycle. No penalties either way."
  },
  {
    question: "What's the difference between 1 Pod and 3 Pods?",
    answer: "With 1 Pod, tests run sequentially (one at a time). With 3 Pods, tests run in parallel, meaning your CI/CD pipeline is faster. Enterprise teams typically need parallel execution to maintain velocity."
  },
  {
    question: "Do you offer annual discounts?",
    answer: "Yes. Annual contracts get 2 months free (pay for 10 months, get 12). That brings Enterprise to $30,000/year instead of $36,000."
  },
  {
    question: "What's the pilot commitment?",
    answer: "14 days. Zero cost. No credit card required. We run in Shadow Mode and prove our value before you pay anything."
  }
];

export default function PricingPage() {
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
        <section className="pt-[120px] pb-[40px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                <span className="text-[#FF2424]">Pricing</span>
              </h1>
            </Reveal>

            <Reveal delay={100}>
              <div></div>
            </Reveal>

            <Reveal delay={200}>
              <div className="inline-flex items-center gap-[8px] bg-[#22c55e]/10 border border-[#22c55e]/20 px-[16px] py-[6px] rounded-[4px]">
                <Check className="w-[14px] h-[14px] text-[#22c55e]" />
                <span className="text-[13px] font-medium text-[#22c55e]">Annual plans save 2 months</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="py-[40px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-stretch">
              {plans.map((plan) => (
                <Reveal key={plan.name} delay={100} className="h-full min-h-0">
                  <div className={`rounded-[12px] p-[32px] h-full min-h-0 flex flex-col ${
                    plan.highlight 
                      ? 'bg-[#1a1a1a] text-white border-2 border-[#FF2424]' 
                      : 'bg-white border border-[#1a1a1a]/10'
                  }`}>
                    {plan.highlight && (
                      <div className="inline-flex items-center gap-[6px] bg-[#FF2424] px-[12px] py-[4px] rounded-[4px] mb-[16px] self-start">
                        <Zap className="w-[12px] h-[12px] text-white" />
                        <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-white">Most Popular</span>
                      </div>
                    )}
                    
                    <h3 className={`font-archivo text-[18px] tracking-[-0.5px] uppercase mb-[8px] ${plan.highlight ? 'text-white' : 'text-[#1a1a1a]'}`}>
                      {plan.name}
                    </h3>
                    
                    <div className="mb-[16px]">
                      <span className={`text-[42px] font-archivo ${plan.highlight ? 'text-white' : 'text-[#1a1a1a]'}`}>
                        {plan.price}
                      </span>
                      <span className={`text-[16px] ${plan.highlight ? 'text-white/60' : 'text-[#666]'}`}>
                        {plan.period}
                      </span>
                    </div>
                    
                    <p className={`text-[14px] mb-[24px] ${plan.highlight ? 'text-white/70' : 'text-[#666]'}`}>
                      {plan.description}
                    </p>
                    
                    <div className="flex-1 min-h-0">
                      <ul className="space-y-[12px]">
                        {plan.features.map((feature) => (
                          <li key={feature.text} className="flex items-start gap-[10px]">
                            {feature.included ? (
                              <Check className={`w-[16px] h-[16px] flex-shrink-0 mt-[2px] ${plan.highlight ? 'text-[#22c55e]' : 'text-[#22c55e]'}`} />
                            ) : (
                              <X className={`w-[16px] h-[16px] flex-shrink-0 mt-[2px] ${plan.highlight ? 'text-white/30' : 'text-[#ccc]'}`} />
                            )}
                            <span className={`text-[14px] ${feature.included ? (plan.highlight ? 'text-white' : 'text-[#444]') : (plan.highlight ? 'text-white/40' : 'text-[#999]')}`}>
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button 
                      onClick={() => router.push("/book-pilot")} 
                      className={`mt-auto pt-[24px] w-full py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] transition-all duration-300 ${
                        plan.highlight 
                          ? 'bg-[#FF2424] text-white hover:bg-[#d91f1f]' 
                          : 'bg-[#1a1a1a] text-white hover:bg-[#333]'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ANNUAL DISCOUNT */}
        <section className="py-[40px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[800px] mx-auto relative z-10">
            <Reveal>
              <div className="bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[12px] p-[28px] text-center">
                <p className="text-[13px] text-[#666] leading-[1.6]">
                  Save 2 months with annual billing. Pay for 10 months, get 12. Team plan drops to <strong>$10,000/year</strong>. 
                  Enterprise drops to <strong>$30,000/year</strong>. No commitment required during the 14-day pilot.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[800px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[40px] text-center">
                Frequently Asked
              </h2>
            </Reveal>

            <div className="space-y-[24px]">
              {faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={100 + index * 50}>
                  <div className="border-b border-[#1a1a1a]/10 pb-[24px]">
                    <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[12px]">
                      {faq.question}
                    </h3>
                    <p className="text-[15px] text-[#555] leading-[1.7]">
                      {faq.answer}
                    </p>
                  </div>
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
                Still have questions?
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Start a pilot.<br />
                <span className="text-[#FF2424]">See the value first.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                14 days. Zero cost. Zero risk. We prove our value before you pay a cent.
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
                <a 
                  href="/book-pilot"
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Talk to Sales
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
