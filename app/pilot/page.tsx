"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Clock, Shield, Eye, CheckCircle, Zap, Calendar, Play } from "lucide-react";

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
  "name": "14-Day Zero-Risk Pilot - Try Jataka in Shadow Mode",
  "description": "Start a 14-day pilot with zero risk. Jataka runs in Shadow Mode—observing your PRs and reporting limit breaches without blocking your developers.",
  "url": "https://jataka.io/pilot"
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
      "name": "Pilot Program",
      "item": "https://jataka.io/pilot"
    }
  ]
};

const timeline = [
  {
    day: "Day 0",
    title: "The Retroactive Audit",
    description: "You install the Jataka GitHub App. We instantly ingest your last 30 days of merged PRs, generate the backend tests, and run them in your Staging Sandbox. By end of day, you get a PDF report of every Governor Limit breach your team unknowingly pushed to production last month.",
    icon: Zap
  },
  {
    day: "Days 1-10",
    title: "Shadow Mode",
    description: "Jataka runs silently in the background. When your developers open PRs, we profile the limits and generate UI tests, but we do not block the merge. We simply collect the data.",
    icon: Eye
  },
  {
    day: "Day 11",
    title: "The Executive Review",
    description: "We review the dashboard together. We show you exactly how much CPU time and SOQL limits Jataka caught that your static scanners (PMD/Copado) missed.",
    icon: CheckCircle
  },
  {
    day: "Day 14",
    title: "Go / No-Go",
    description: "If Jataka caught Sev-1 level risks and proved its ROI, you switch us to \"Blocking Mode\" and begin the annual contract. If not, you uninstall the GitHub app in one click.",
    icon: ArrowRight
  }
];

const guarantees = [
  "Zero risk to your development velocity",
  "No production access required",
  "No code changes required",
  "Uninstall in one click",
  "No credit card required",
  "No long-term commitment"
];

export default function PilotPage() {
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

          <ul className="hidden md:flex gap-[24px] list-none items-center m-0 p-0">
            <li><button onClick={() => router.push("/pricing")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Pricing</button></li>
            <li><button onClick={() => router.push("/security")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Security</button></li>
            <li><button onClick={() => router.push("/customers")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Customers</button></li>
            <li><button onClick={() => router.push("/pilot")} className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Start Pilot</button></li>
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
            <div className="absolute top-[64px] left-0 w-full bg-[#FAF8F3] border-b border-[#1a1a1a]/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl z-[190]">
              <button onClick={() => router.push("/pricing")} className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Pricing</button>
              <button onClick={() => router.push("/security")} className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Security</button>
              <button onClick={() => router.push("/customers")} className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Customers</button>
              <button onClick={() => router.push("/pilot")} className="w-full py-3 mt-2 rounded-[4px] bg-[#FF2424] text-white font-archivo uppercase tracking-[1.5px] text-[12px] flex items-center justify-center">
                Start Pilot
              </button>
            </div>
          </div>
        )}

        {/* HERO */}
        <section className="pt-[120px] pb-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#22c55e]/10 border border-[#22c55e]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#22c55e]">
                <Shield className="w-[14px] h-[14px]" />
                Zero Risk
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                The 14-Day<br />
                <span className="text-[#FF2424]">Zero-Risk Pilot</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[18px] leading-[1.7] text-[#444] max-w-[700px] mx-auto mb-[30px]">
                We don't guess if Jataka will work for you. We analyze your <strong className="text-[#1a1a1a]">last 30 days of code on Day 1</strong> to prove it. 
                Zero disruption to your developers. Zero deployment blocking during the pilot.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row gap-[16px] justify-center">
                <button 
                  onClick={() => router.push("/book-pilot")} 
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Start Your Pilot
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                </button>
                <button 
                  onClick={() => router.push("/security")} 
                  className="group bg-transparent text-[#1a1a1a] px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#1a1a1a]/20 hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  <Shield className="w-[14px] h-[14px]" />
                  Security Overview
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* GUARANTEES */}
        <section className="pb-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[800px] mx-auto">
            <Reveal>
              <div className="bg-white rounded-[12px] p-[32px] border border-[#1a1a1a]/5">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px]">
                  {guarantees.map((guarantee, index) => (
                    <Reveal key={guarantee} delay={100 + index * 50}>
                      <div className="flex items-center gap-[10px]">
                        <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0" />
                        <span className="text-[14px] text-[#444]">{guarantee}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px] text-center">
                The Mutual Action Plan
              </h2>
            </Reveal>

            <Reveal delay={50}>
              <p className="text-[16px] text-[#666] text-center mb-[50px]">
                How the 14-day pilot works, step by step.
              </p>
            </Reveal>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[24px] md:left-[50%] top-0 bottom-0 w-[2px] bg-[#1a1a1a]/10 transform md:-translate-x-1/2" />

              {timeline.map((step, index) => (
                <Reveal key={step.day} delay={100 + index * 100}>
                  <div className={`relative flex items-start gap-[24px] mb-[40px] ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-[24px] md:left-[50%] w-[12px] h-[12px] bg-[#FF2424] rounded-full transform -translate-x-1/2 mt-[6px]" />
                    
                    {/* Content */}
                    <div className={`ml-[60px] md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? 'md:pr-[40px] md:text-right' : 'md:pl-[40px] md:text-left'}`}>
                      <div className={`inline-flex items-center gap-[8px] bg-[#FF2424]/10 px-[12px] py-[4px] rounded-[4px] mb-[12px] ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                        <step.icon className="w-[14px] h-[14px] text-[#FF2424]" />
                        <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#FF2424]">{step.day}</span>
                      </div>
                      <h3 className="font-archivo text-[18px] tracking-[-0.5px] uppercase mb-[8px]">
                        {step.title}
                      </h3>
                      <p className="text-[15px] text-[#555] leading-[1.6]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SHADOW MODE EXPLAINED */}
        <section className="py-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[900px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px] text-center">
                What is Shadow Mode?
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <div className="bg-[#1a1a1a]/5 rounded-[12px] p-[28px]">
                  <div className="flex items-center gap-[12px] mb-[20px]">
                    <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF6B35]/10 flex items-center justify-center">
                      <Eye className="w-[20px] h-[20px] text-[#FF6B35]" />
                    </div>
                    <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase">Shadow Mode</h3>
                  </div>
                  <p className="text-[15px] text-[#444] leading-[1.7]">
                    Jataka watches every PR but <strong>never blocks</strong>. Your developers merge freely. 
                    We generate private reports showing what would have crashed in production. You see the 
                    risks without any disruption to velocity.
                  </p>
                </div>

                <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[12px] p-[28px]">
                  <div className="flex items-center gap-[12px] mb-[20px]">
                    <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center">
                      <Shield className="w-[20px] h-[20px] text-[#22c55e]" />
                    </div>
                    <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase">Blocking Mode</h3>
                  </div>
                  <p className="text-[15px] text-[#444] leading-[1.7]">
                    After Day 14, if you've seen the value, switch to Blocking Mode. Jataka will 
                    <strong> prevent</strong> limit-breaching code from merging. Your production stays safe. 
                    Your on-call engineers sleep through the night.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* WHAT WE NEED */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[800px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px] text-center">
                What We Need From You
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-[16px]">
                <div className="flex items-start gap-[16px] p-[20px] bg-[#FAF8F3] rounded-[10px]">
                  <div className="w-[32px] h-[32px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-[16px] h-[16px] text-[#FF2424]" />
                  </div>
                  <div>
                    <h3 className="font-archivo text-[15px] tracking-[-0.3px] uppercase mb-[4px]">
                      OAuth Access to Staging/Integration Sandbox
                    </h3>
                    <p className="text-[14px] text-[#666]">We never touch Production. Only your lower-level sandboxes for profiling.</p>
                  </div>
                </div>

                <div className="flex items-start gap-[16px] p-[20px] bg-[#FAF8F3] rounded-[10px]">
                  <div className="w-[32px] h-[32px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0">
                    <Play className="w-[16px] h-[16px] text-[#FF2424]" />
                  </div>
                  <div>
                    <h3 className="font-archivo text-[15px] tracking-[-0.3px] uppercase mb-[4px]">
                      GitHub App Installation Approval
                    </h3>
                    <p className="text-[14px] text-[#666]">One-click install from GitHub Marketplace. Uninstall anytime.</p>
                  </div>
                </div>

                <div className="flex items-start gap-[16px] p-[20px] bg-[#FAF8F3] rounded-[10px]">
                  <div className="w-[32px] h-[32px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-[16px] h-[16px] text-[#FF2424]" />
                  </div>
                  <div>
                    <h3 className="font-archivo text-[15px] tracking-[-0.3px] uppercase mb-[4px]">
                      1 Hour of Your Lead Architect's Time
                    </h3>
                    <p className="text-[14px] text-[#666]">For the Day 11 Executive Review. That's it.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* THE GUARANTEE */}
        <section className="py-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[800px] mx-auto text-center">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px]">
                The Guarantee
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[18px] leading-[1.7] text-[#444] mb-[30px]">
                During the 14-day pilot, Jataka operates <strong className="text-[#1a1a1a]">completely outside of your critical path</strong>. 
                If our Kubernetes pods fail, or our AI takes too long to generate a test, your developers' CI/CD pipeline is unaffected. 
                You get all the insights with zero deployment risk.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[12px] p-[24px] text-left">
                <p className="text-[15px] text-[#444] leading-[1.7]">
                  <strong className="text-[#22c55e]">Our promise:</strong> By Day 11, we'll show you at least 
                  one Governor Limit breach that would have crashed your production. If we can't, 
                  we don't deserve your business. Uninstall in one click, zero questions asked.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                Ready to see what you're missing?
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Start your pilot.<br />
                <span className="text-[#FF2424]">Zero risk. Zero excuses.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                15 minutes to install. 14 days to prove value. One click to uninstall if we don't.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row gap-[16px] justify-center">
                <button 
                  onClick={() => router.push("/book-pilot")} 
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Start Your Pilot
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                </button>
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
