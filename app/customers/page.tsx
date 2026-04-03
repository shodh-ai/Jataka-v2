"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Jataka Customer Stories - Design Partner Results",
  "description": "See how Salesforce teams use Jataka to prevent Governor Limit breaches and save engineering hours. Real results from design partners.",
  "url": "https://jataka.ai/customers"
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
      "name": "Customers",
      "item": "https://jataka.ai/customers"
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
        <section className="py-[40px] px-[24px] md:px-[48px]">
          <div className="max-w-[1000px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px]">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={100 + index * 50}>
                  <div className="bg-white rounded-[12px] p-[24px] text-center border border-[#1a1a1a]/5">
                    <p className="text-[36px] font-archivo text-[#FF2424] mb-[8px]">{stat.value}</p>
                    <p className="text-[12px] uppercase tracking-[1px] text-[#666]">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[1000px] mx-auto">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[20px]">
                      <div className="bg-[#FAF8F3] rounded-[8px] p-[16px]">
                        <p className="text-[10px] uppercase tracking-[1.5px] text-[#FF6B35] mb-[8px]">Situation</p>
                        <p className="text-[14px] text-[#444]">{testimonial.situation}</p>
                      </div>
                      <div className="bg-[#FAF8F3] rounded-[8px] p-[16px]">
                        <p className="text-[10px] uppercase tracking-[1.5px] text-[#FF2424] mb-[8px]">Impact</p>
                        <p className="text-[14px] text-[#444]">{testimonial.impact}</p>
                      </div>
                      <div className="bg-[#22c55e]/5 rounded-[8px] p-[16px]">
                        <p className="text-[10px] uppercase tracking-[1.5px] text-[#22c55e] mb-[8px]">Result</p>
                        <p className="text-[14px] text-[#444]">{testimonial.result}</p>
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
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[800px] mx-auto text-center">
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
              <button 
                onClick={() => router.push("/pilot")} 
                className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 inline-flex items-center gap-[12px]"
              >
                Start Your Pilot
                <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
              </button>
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
                <button 
                  onClick={() => router.push("/pilot")} 
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Start Your Pilot
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                </button>
                <button 
                  onClick={() => router.push("/roi-calculator")} 
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Calculate Your ROI
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
