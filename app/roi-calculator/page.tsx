"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Calculator, DollarSign, Clock, Users, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";

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
  "name": "Jataka ROI Calculator - Calculate Your Savings",
  "description": "Calculate how much your enterprise will save with Jataka's Governor Limit prevention and self-healing tests. Recover engineering hours and prevent costly downtime.",
  "url": "https://jataka.io/roi-calculator"
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
      "name": "ROI Calculator",
      "item": "https://jataka.io/roi-calculator"
    }
  ]
};

const industryBenchmarks = [
  { metric: "Avg Salesforce developer hourly rate", value: "$175" },
  { metric: "Avg Sev-1 incident cost", value: "$150,000" },
  { metric: "Avg downtime per Sev-1", value: "4 hours" },
  { metric: "Avg test maintenance hours/week", value: "15 hours" }
];

export default function ROICalculatorPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Calculator inputs
  const [developers, setDevelopers] = useState(20);
  const [reviewHours, setReviewHours] = useState(10);
  const [sev1Incidents, setSev1Incidents] = useState(3);
  const [sev1Cost, setSev1Cost] = useState(150000);
  const [testMaintenanceHours, setTestMaintenanceHours] = useState(15);
  const [seniorDeveloperRate, setSeniorDeveloperRate] = useState(175);

  // Calculated values
  const [savings, setSavings] = useState({
    reviewTime: 0,
    testMaintenance: 0,
    preventedIncidents: 0,
    totalAnnual: 0
  });

  // Calculate savings
  useEffect(() => {
    // PR review time saved: 40% reduction in review time * hours * weeks * rate
    const reviewTimeSaved = reviewHours * 0.4 * 52 * seniorDeveloperRate;
    
    // Test maintenance saved: 90% reduction in test maintenance
    const testMaintenanceSaved = testMaintenanceHours * 0.9 * 52 * seniorDeveloperRate;
    
    // Prevented incidents: 80% of Sev-1s prevented * user-defined cost
    const preventedIncidentsCost = sev1Incidents * 0.8 * sev1Cost;
    
    const total = reviewTimeSaved + testMaintenanceSaved + preventedIncidentsCost;
    
    setSavings({
      reviewTime: Math.round(reviewTimeSaved),
      testMaintenance: Math.round(testMaintenanceSaved),
      preventedIncidents: Math.round(preventedIncidentsCost),
      totalAnnual: Math.round(total)
    });
  }, [developers, reviewHours, sev1Incidents, sev1Cost, testMaintenanceHours, seniorDeveloperRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

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
          <div className="max-w-[1200px] mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <Calculator className="w-[14px] h-[14px]" />
                ROI Calculator
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                Calculate Your<br />
                <span className="text-[#FF2424]">Annual Savings</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#444] max-w-[700px] mx-auto">
                See how much Jataka will save your enterprise in recovered engineering hours 
                and prevented downtime. CFOs and VPs of Engineering use this to justify the investment.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="pb-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px]">
              {/* INPUTS */}
              <Reveal>
                <div className="bg-white rounded-[12px] p-[32px] border border-[#1a1a1a]/5">
                  <h2 className="font-archivo text-[20px] tracking-[-0.5px] uppercase mb-[30px]">
                    Your Inputs
                  </h2>

                  {/* Developers */}
                  <div className="mb-[24px]">
                    <label className="flex items-center gap-[8px] text-[14px] font-medium mb-[8px]">
                      <Users className="w-[16px] h-[16px] text-[#FF2424]" />
                      How many Salesforce developers do you have?
                    </label>
                    <input
                      type="number"
                      value={developers}
                      onChange={(e) => setDevelopers(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[8px] px-[16px] py-[12px] text-[16px] focus:outline-none focus:border-[#FF2424]/30"
                    />
                  </div>

                  {/* Review Hours */}
                  <div className="mb-[24px]">
                    <label className="flex items-center gap-[8px] text-[14px] font-medium mb-[8px]">
                      <Clock className="w-[16px] h-[16px] text-[#FF2424]" />
                      How many hours/week do seniors spend on PR review?
                    </label>
                    <input
                      type="number"
                      value={reviewHours}
                      onChange={(e) => setReviewHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[8px] px-[16px] py-[12px] text-[16px] focus:outline-none focus:border-[#FF2424]/30"
                    />
                  </div>

                  {/* Test Maintenance */}
                  <div className="mb-[24px]">
                    <label className="flex items-center gap-[8px] text-[14px] font-medium mb-[8px]">
                      <Clock className="w-[16px] h-[16px] text-[#FF2424]" />
                      How many hours/week on test maintenance?
                    </label>
                    <input
                      type="number"
                      value={testMaintenanceHours}
                      onChange={(e) => setTestMaintenanceHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[8px] px-[16px] py-[12px] text-[16px] focus:outline-none focus:border-[#FF2424]/30"
                    />
                  </div>

                  {/* Sev-1 Incidents */}
                  <div className="mb-[24px]">
                    <label className="flex items-center gap-[8px] text-[14px] font-medium mb-[8px]">
                      <AlertTriangle className="w-[16px] h-[16px] text-[#FF2424]" />
                      How many Sev-1 rollback incidents last year?
                    </label>
                    <input
                      type="number"
                      value={sev1Incidents}
                      onChange={(e) => setSev1Incidents(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[8px] px-[16px] py-[12px] text-[16px] focus:outline-none focus:border-[#FF2424]/30"
                    />
                  </div>

                  {/* Sev-1 Cost */}
                  <div className="mb-[24px]">
                    <label className="flex items-center gap-[8px] text-[14px] font-medium mb-[8px]">
                      <DollarSign className="w-[16px] h-[16px] text-[#FF2424]" />
                      Average cost per Sev-1 outage ($)
                    </label>
                    <input
                      type="number"
                      value={sev1Cost}
                      onChange={(e) => setSev1Cost(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[8px] px-[16px] py-[12px] text-[16px] focus:outline-none focus:border-[#FF2424]/30"
                    />
                    <p className="text-[12px] text-[#888] mt-[6px]">Includes downtime, emergency engineering, customer impact</p>
                  </div>

                  {/* Developer Rate */}
                  <div className="mb-[8px]">
                    <label className="flex items-center gap-[8px] text-[14px] font-medium mb-[8px]">
                      <DollarSign className="w-[16px] h-[16px] text-[#FF2424]" />
                      Senior developer hourly rate ($)
                    </label>
                    <input
                      type="number"
                      value={seniorDeveloperRate}
                      onChange={(e) => setSeniorDeveloperRate(Math.max(50, parseInt(e.target.value) || 50))}
                      className="w-full bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[8px] px-[16px] py-[12px] text-[16px] focus:outline-none focus:border-[#FF2424]/30"
                    />
                  </div>
                </div>
              </Reveal>

              {/* RESULTS */}
              <Reveal delay={100}>
                <div className="bg-[#1a1a1a] rounded-[12px] p-[32px] text-white h-full flex flex-col">
                  <h2 className="font-archivo text-[20px] tracking-[-0.5px] uppercase mb-[30px]">
                    Your Savings
                  </h2>

                  {/* Total */}
                  <div className="bg-[#FF2424] rounded-[12px] p-[24px] mb-[24px] text-center">
                    <p className="text-[12px] uppercase tracking-[2px] text-white/80 mb-[8px]">Total Annual Savings</p>
                    <p className="text-[48px] font-archivo text-white leading-[1]">
                      {formatCurrency(savings.totalAnnual)}
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-[16px] flex-grow">
                    <div className="flex items-center justify-between p-[16px] bg-white/5 rounded-[8px]">
                      <div className="flex items-center gap-[12px]">
                        <CheckCircle className="w-[16px] h-[16px] text-[#22c55e]" />
                        <span className="text-[14px]">PR Review Time Saved</span>
                      </div>
                      <span className="text-[16px] font-archivo">{formatCurrency(savings.reviewTime)}</span>
                    </div>

                    <div className="flex items-center justify-between p-[16px] bg-white/5 rounded-[8px]">
                      <div className="flex items-center gap-[12px]">
                        <CheckCircle className="w-[16px] h-[16px] text-[#22c55e]" />
                        <span className="text-[14px]">Test Maintenance Saved</span>
                      </div>
                      <span className="text-[16px] font-archivo">{formatCurrency(savings.testMaintenance)}</span>
                    </div>

                    <div className="flex items-center justify-between p-[16px] bg-white/5 rounded-[8px]">
                      <div className="flex items-center gap-[12px]">
                        <CheckCircle className="w-[16px] h-[16px] text-[#22c55e]" />
                        <span className="text-[14px]">Prevented Sev-1 Incidents</span>
                      </div>
                      <span className="text-[16px] font-archivo">{formatCurrency(savings.preventedIncidents)}</span>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="mt-[24px] pt-[24px] border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] text-white/60">Typical Jataka Investment</span>
                      <span className="text-[16px] font-archivo">$30,000 - $50,000/year</span>
                    </div>
                    <div className="flex items-center justify-between mt-[12px]">
                      <span className="text-[14px] font-medium">Your ROI</span>
                      <span className="text-[20px] font-archivo text-[#22c55e]">
                        {Math.round((savings.totalAnnual / 40000) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* BENCHMARKS */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px] text-center">
                Industry Benchmarks Used
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px]">
              {industryBenchmarks.map((benchmark, index) => (
                <Reveal key={benchmark.metric} delay={100 + index * 50}>
                  <div className="bg-[#FAF8F3] rounded-[12px] p-[20px] text-center">
                    <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[8px]">{benchmark.metric}</p>
                    <p className="text-[24px] font-archivo text-[#FF2424]">{benchmark.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ASSUMPTIONS */}
        <section className="py-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[800px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px] text-center">
                Calculation Assumptions
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] space-y-[16px]">
                <div className="flex items-start gap-[12px]">
                  <TrendingUp className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[2px]" />
                  <p className="text-[14px] text-[#444]">
                    <strong className="text-[#1a1a1a]">40% reduction in PR review time</strong> — Jataka catches 
                    Governor Limit breaches before the PR reaches the reviewer, eliminating the most time-consuming reviews.
                  </p>
                </div>

                <div className="flex items-start gap-[12px]">
                  <TrendingUp className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[2px]" />
                  <p className="text-[14px] text-[#444]">
                    <strong className="text-[#1a1a1a]">90% reduction in test maintenance</strong> — Self-healing tests 
                    automatically adapt to Salesforce UI changes, eliminating manual test fixes.
                  </p>
                </div>

                <div className="flex items-start gap-[12px]">
                  <TrendingUp className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[2px]" />
                  <p className="text-[14px] text-[#444]">
                    <strong className="text-[#1a1a1a]">80% of Sev-1 incidents prevented</strong> — Jataka catches 
                    the majority of limit breaches and data corruption issues before they reach production.
                  </p>
                </div>

                <div className="flex items-start gap-[12px]">
                  <TrendingUp className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[2px]" />
                  <p className="text-[14px] text-[#444]">
                    <strong className="text-[#1a1a1a]">Your Sev-1 cost estimate</strong> — You provided this value above. 
                    Industry average is $150,000, but your actual cost may vary based on company size and customer impact.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                Ready to save {formatCurrency(savings.totalAnnual)}?
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Book a demo and<br />
                <span className="text-[#FF2424]">start saving.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                See Jataka in action. Watch it catch Governor Limit breaches and heal broken tests in real-time. 
                Your ROI calculation will become reality.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row gap-[16px] justify-center">
                <button 
                  onClick={() => router.push("/book-pilot")} 
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Book a Demo
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                </button>
                <button 
                  onClick={() => router.push("/use-cases/enterprise")} 
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Enterprise Use Case
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
