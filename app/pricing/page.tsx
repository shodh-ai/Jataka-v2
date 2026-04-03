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

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Jataka Pricing - Team & Enterprise Plans",
  "description": "Transparent pricing for Salesforce runtime security. Team plan at $1,000/month, Enterprise at $3,000/month. No hidden fees.",
  "url": "https://jataka.ai/pricing"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://jataka.ai"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Pricing",
      "item": "https://jataka.ai/pricing"
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
      { text: "Neo4j Blast Radius Graph", included: false },
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
      { text: "Slack Bot & VS Code MCP access", included: true },
      { text: "4,000 PR limit analyses/month", included: true },
      { text: "2,000 Kamikaze UI Tests/month", included: true },
      { text: "3 K8s Pods (parallel tests)", included: true },
      { text: "Day 0 Retroactive Risk Audit", included: true },
      { text: "Neo4j Blast Radius Graph", included: true },
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
    answer: "You're charged $0.10 per additional PR check. This ensures you never lose money—you only pay for what you use. We'll notify you at 80% capacity so there are no surprises."
  },
  {
    question: "Can I switch plans mid-contract?",
    answer: "Yes. You can upgrade anytime. Downgrades take effect at the next billing cycle. No penalties either way."
  },
  {
    question: "What's the difference between 1 Pod and 3 Pods?",
    answer: "With 1 Pod, tests run sequentially (one at a time). With 3 Pods, tests run in parallel—meaning your CI/CD pipeline is faster. Enterprise teams typically need parallel execution to maintain velocity."
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
        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-[200] h-[64px] bg-[#FAF8F3]/90 backdrop-blur-[14px] border-b border-[#1a1a1a]/10 px-[24px] md:px-[48px] flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
            <svg className="h-[22px] w-auto block" viewBox="489.5 574 2305.4 484.92" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M877.432 574C930.994 574 974.419 617.425 974.419 670.987C974.418 697.813 963.525 722.093 945.923 739.648C924.44 761.073 901.681 786.114 901.681 816.454C901.681 846.795 924.441 871.837 945.923 893.264C963.526 910.822 974.418 935.105 974.419 961.932C974.419 1015.49 930.994 1058.92 877.432 1058.92C850.604 1058.92 826.319 1048.02 808.76 1030.42C787.337 1008.94 762.298 986.181 731.959 986.181C701.621 986.181 676.582 1008.94 655.159 1030.42C637.6 1048.02 613.315 1058.92 586.487 1058.92C532.925 1058.92 489.5 1015.49 489.5 961.932C489.502 908.371 532.926 864.953 586.487 864.953C613.316 864.954 637.601 875.848 655.159 893.453C676.582 914.934 701.622 937.691 731.959 937.691C762.297 937.691 787.402 914.81 808.854 893.357C830.307 871.902 853.191 846.795 853.191 816.454C853.191 786.114 830.432 761.074 808.949 739.649C791.346 722.093 780.454 697.813 780.453 670.987C780.453 617.426 823.871 574.002 877.432 574Z" fill="#1a1a1a"/>
              <path d="M877.508 908.275C878.976 937.203 902.175 960.398 931.103 961.862L934.013 961.933C902.769 961.933 877.44 987.265 877.437 1018.51C877.435 987.266 852.105 961.933 820.862 961.933C852.106 961.931 877.437 936.601 877.437 905.358L877.508 908.275Z" fill="#FF2424"/>
              <path d="M1292.08 685.6V907.648C1292.08 932.992 1285.03 952.72 1270.92 966.832C1257.09 980.944 1237.36 988 1211.73 988H1156V931.84H1191.86C1204.53 931.84 1213.6 928.96 1219.08 923.2C1224.55 917.152 1227.28 907.792 1227.28 895.12V685.6H1292.08Z" fill="#1a1a1a"/>
              <path d="M1332.31 988L1442.9 685.6H1520.66L1630.39 988H1560.83L1537.51 921.904H1422.59L1399.27 988H1332.31ZM1439.87 869.632H1519.79L1479.62 754.72L1439.87 869.632Z" fill="#1a1a1a"/>
              <path d="M1621.19 685.6H1860.52V741.328H1773.26V988H1708.46V741.328H1621.19V685.6Z" fill="#1a1a1a"/>
              <path d="M1851.07 988L1961.66 685.6H2039.42L2149.15 988H2079.6L2056.27 921.904H1941.36L1918.03 988H1851.07ZM1958.64 869.632H2038.56L1998.38 754.72L1958.64 869.632Z" fill="#1a1a1a"/>
              <path d="M2199.4 686.032H2264.2V821.68L2385.16 686.032H2463.79L2352.76 810.448L2471.13 988H2393.37L2306.97 860.56L2264.2 908.512V988H2199.4V686.032Z" fill="#1a1a1a"/>
              <path d="M2496.82 988L2607.41 685.6H2685.17L2794.9 988H2725.35L2702.02 921.904H2587.11L2563.78 988H2496.82ZM2604.39 869.632H2684.31L2644.13 754.72L2604.39 869.632Z" fill="#1a1a1a"/>
            </svg>
          </div>

          <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
            <li><button onClick={() => router.push("/")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Home</button></li>
            <li><button onClick={() => router.push("/blog")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Demos</button></li>
            <li><button onClick={() => router.push("/use-cases")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</button></li>
            <li><button onClick={() => router.push("/anti-patterns")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Anti-Patterns</button></li>
            <li><button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book Demo</button></li>
          </ul>

          <button 
            className="md:hidden p-[8px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
          </button>
        </nav>

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
        <section className="py-[40px] px-[24px] md:px-[48px]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
              {plans.map((plan, index) => (
                <Reveal key={plan.name} delay={100 + index * 100}>
                  <div className={`rounded-[12px] p-[32px] h-full flex flex-col ${
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
                    
                    <div className="flex-grow">
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
                      onClick={() => router.push("/pilot")} 
                      className={`mt-[24px] w-full py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] transition-all duration-300 ${
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
        <section className="py-[40px] px-[24px] md:px-[48px]">
          <div className="max-w-[800px] mx-auto">
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
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[800px] mx-auto">
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
        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a]">
          <div className="max-w-[1000px] mx-auto text-center">
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
                  href="/pilot"
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
