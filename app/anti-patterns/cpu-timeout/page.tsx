"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Cpu, Play, Code, AlertTriangle, CheckCircle, ArrowRight, Clock, Shield } from "lucide-react";

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
  "@type": "TechArticle",
  "headline": "How to Fix System.LimitException: Apex CPU time limit exceeded",
  "description": "Learn why nested loops and inefficient algorithms cause CPU timeout exceptions and how Jataka catches this anti-pattern before it hits production. Includes video demonstration and code examples.",
  "author": {
    "@type": "Organization",
    "name": "Jataka"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Jataka",
    "logo": {
      "@type": "ImageObject",
      "url": "https://jataka.ai/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://jataka.ai/anti-patterns/cpu-timeout"
  }
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
      "name": "Anti-Patterns",
      "item": "https://jataka.ai/anti-patterns"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Apex CPU time limit exceeded",
      "item": "https://jataka.ai/anti-patterns/cpu-timeout"
    }
  ]
};

const badCodeExample = `// ❌ BAD: Nested loops with O(n²) complexity
// Works fine with 100 records in Sandbox
// Burns through CPU time with 10,000+ records in Production

public void calculateCommission(List<Opportunity> opps) {
    for (Opportunity opp1 : opps) {
        for (Opportunity opp2 : opps) {
            // O(n²) comparison - exponential CPU growth
            if (opp1.AccountId == opp2.AccountId) {
                Decimal commission = calculateComplexFormula(opp1, opp2);
                opp1.Commission__c = commission;
            }
        }
    }
    update opps;
}
// With 10,000 opportunities = 100,000,000 iterations
// CPU timeout at 10 seconds`;

const goodCodeExample = `// ✅ GOOD: Use Maps for O(n) complexity
// Linear time regardless of record count

public void calculateCommission(List<Opportunity> opps) {
    // Group by AccountId using a Map
    Map<Id, List<Opportunity>> oppsByAccount = new Map<Id, List<Opportunity>>();
    
    for (Opportunity opp : opps) {
        if (!oppsByAccount.containsKey(opp.AccountId)) {
            oppsByAccount.put(opp.AccountId, new List<Opportunity>());
        }
        oppsByAccount.get(opp.AccountId).add(opp);
    }
    
    // Process each account's opportunities
    for (List<Opportunity> accountOpps : oppsByAccount.values()) {
        for (Integer i = 0; i < accountOpps.size(); i++) {
            Decimal commission = calculateFormula(accountOpps[i]);
            accountOpps[i].Commission__c = commission;
        }
    }
    update opps;
}`;

const relatedAntiPatterns = [
  { id: "soql-101", title: "Too many SOQL queries: 101", severity: "Critical" },
  { id: "dml-151", title: "Too many DML statements: 151", severity: "Critical" },
  { id: "lock-contention", title: "UNABLE_TO_LOCK_ROW", severity: "High" }
];

export default function CPUTimeoutPage() {
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
            <li><button onClick={() => router.push("/anti-patterns")} className="text-[#1a1a1a] font-medium text-[13.5px] tracking-[0.4px]">Anti-Patterns</button></li>
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
              <button onClick={() => router.push("/anti-patterns")} className="text-[#1a1a1a] font-medium text-[14px]">Anti-Patterns</button>
              <button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px]">Book Demo</button>
            </div>
          </div>
        )}

        {/* BREADCRUMB */}
        <div className="pt-[80px] px-[24px] md:px-[48px]">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-[8px] text-[13px] text-[#666]">
              <button onClick={() => router.push("/")} className="hover:text-[#1a1a1a]">Home</button>
              <span>/</span>
              <button onClick={() => router.push("/anti-patterns")} className="hover:text-[#1a1a1a]">Anti-Patterns</button>
              <span>/</span>
              <span className="text-[#1a1a1a]">CPU Timeout</span>
            </div>
          </div>
        </div>

        {/* HERO */}
        <section className="pt-[40px] pb-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[1200px] mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <Cpu className="w-[14px] h-[14px]" />
                Critical Limit Breach
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                System.LimitException:<br />
                <span className="text-[#FF2424]">Apex CPU time limit exceeded</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <code className="inline-block text-[14px] font-mono text-[#666] bg-[#f5f5f5] px-[16px] py-[10px] rounded-[6px] mb-[30px]">
                System.LimitException: Apex CPU time limit exceeded
              </code>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[17px] leading-[1.7] text-[#444] max-w-[800px] mb-[20px]">
                Your code runs perfectly in Sandbox with 100 test records. Production has 50,000. 
                Those nested loops you wrote? They're O(n²). With 50,000 records, that's 2.5 billion iterations. 
                The CPU timeout hits at 10 seconds, and your transaction dies.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p className="text-[15px] leading-[1.6] text-[#666] max-w-[700px]">
                <strong className="text-[#1a1a1a]">6,200 developers</strong> search for this error every month. 
                The worst part? It only manifests under real data volumes, making it nearly impossible to catch in dev.
              </p>
            </Reveal>
          </div>
        </section>

        {/* VIDEO DEMO */}
        <section className="pb-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[900px] mx-auto">
            <Reveal>
              <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden">
                <div className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#333]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#FF2424]"></div>
                    <span className="text-[12px] font-mono text-[#888]">Jataka catches CPU timeout in real-time</span>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Clock className="w-[14px] h-[14px] text-[#666]" />
                    <span className="text-[12px] text-[#666]">1:15</span>
                  </div>
                </div>

                <div className="aspect-video bg-[#0a0a0a] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF2424]/10 to-transparent"></div>
                  <button className="relative z-10 w-[80px] h-[80px] rounded-full bg-[#FF2424] flex items-center justify-center hover:scale-105 transition-transform">
                    <Play className="w-[32px] h-[32px] text-white ml-[4px]" fill="white" />
                  </button>
                  <div className="absolute bottom-[20px] left-[20px] right-[20px] flex items-center justify-between">
                    <span className="text-[11px] text-[#666]">Watch: Nested loops burn CPU → Jataka blocks PR</span>
                    <span className="text-[11px] text-[#888]">Loom Recording</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* THE LIMIT */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px]">
                The Limit: <span className="text-[#FF2424]">10 seconds</span> synchronous / 60 seconds async
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-[40px]">
              <Reveal delay={100}>
                <div className="bg-[#FAF8F3] rounded-[12px] p-[24px]">
                  <div className="text-[36px] font-archivo text-[#FF2424] mb-[8px]">10s</div>
                  <p className="text-[14px] text-[#555]">Maximum CPU time for synchronous Apex (triggers, controllers)</p>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="bg-[#FAF8F3] rounded-[12px] p-[24px]">
                  <div className="text-[36px] font-archivo text-[#FF2424] mb-[8px]">60s</div>
                  <p className="text-[14px] text-[#555]">Maximum CPU time for async Apex (Batch, Future, Queueable)</p>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <div className="bg-[#FAF8F3] rounded-[12px] p-[24px]">
                  <div className="text-[36px] font-archivo text-[#FF2424] mb-[8px]">6 hrs</div>
                  <p className="text-[14px] text-[#555]">Average downtime from CPU timeout in production</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={400}>
              <p className="text-[16px] leading-[1.7] text-[#444] max-w-[800px]">
                CPU time includes: Apex execution, formula evaluation, workflow execution, validation rules, 
                and trigger recursion. Your 5-second trigger might actually consume 8 seconds when you factor 
                in all the automation that fires after your code runs.
              </p>
            </Reveal>
          </div>
        </section>

        {/* BAD CODE */}
        <section className="py-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <div className="flex items-center gap-[12px] mb-[24px]">
                <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
                  <AlertTriangle className="w-[20px] h-[20px] text-[#FF2424]" />
                </div>
                <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase">
                  The Bad Code
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[15px] text-[#666] mb-[20px]">
                Nested loops. The silent killer. O(n²) complexity grows exponentially with data volume.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden">
                <div className="flex items-center justify-between px-[20px] py-[12px] border-b border-[#333]">
                  <span className="text-[12px] font-mono text-[#888]">CommissionCalculator.cls</span>
                  <span className="text-[10px] uppercase tracking-[1px] text-[#FF2424] font-bold">❌ Anti-Pattern</span>
                </div>
                <pre className="p-[20px] text-[13px] font-mono text-[#e0e0e0] overflow-x-auto leading-[1.6]">
                  {badCodeExample}
                </pre>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-[24px] p-[20px] bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[8px]">
                <p className="text-[14px] text-[#444]">
                  <strong className="text-[#FF2424]">Why this is dangerous:</strong> Static analysis can't predict 
                  CPU time because it depends on data volume. Your Sandbox has 100 records. Production has 50,000. 
                  Only runtime profiling reveals the truth.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* JATAKA REPORT CARD */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <div className="flex items-center gap-[12px] mb-[24px]">
                <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center">
                  <Shield className="w-[20px] h-[20px] text-[#22c55e]" />
                </div>
                <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase">
                  Jataka Report Card
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[15px] text-[#666] mb-[30px]">
                Jataka executes this code with production-scale data in Sandbox. We measure actual CPU consumption.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#FAF8F3] rounded-[12px] border border-[#1a1a1a]/5 overflow-hidden">
                <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#1a1a1a]/5">
                  <div className="flex items-center gap-[12px]">
                    <CheckCircle className="w-[18px] h-[18px] text-[#22c55e]" />
                    <span className="font-medium text-[14px]">PR #428 Blocked</span>
                  </div>
                  <span className="text-[12px] text-[#666]">8 minutes ago</span>
                </div>

                <div className="p-[24px]">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] mb-[24px]">
                    <div>
                      <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[4px]">CPU Time</p>
                      <p className="text-[24px] font-archivo text-[#FF2424]">12,847ms<span className="text-[14px] text-[#888]">/10,000ms</span></p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[4px]">SOQL Queries</p>
                      <p className="text-[24px] font-archivo text-[#1a1a1a]">3<span className="text-[14px] text-[#888]">/100</span></p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[4px]">DML Statements</p>
                      <p className="text-[24px] font-archivo text-[#1a1a1a]">1<span className="text-[14px] text-[#888]">/150</span></p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[4px]">Records Tested</p>
                      <p className="text-[24px] font-archivo text-[#1a1a1a]">10,000</p>
                    </div>
                  </div>

                  <div className="bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[8px] p-[16px]">
                    <div className="flex items-start gap-[12px]">
                      <AlertTriangle className="w-[18px] h-[18px] text-[#FF2424] flex-shrink-0 mt-[2px]" />
                      <div>
                        <p className="text-[14px] font-semibold text-[#FF2424] mb-[4px]">CPU Timeout Detected</p>
                        <p className="text-[13px] text-[#555]">
                          Transaction consumed 12,847ms CPU time. Limit is 10,000ms. 
                          <strong className="text-[#1a1a1a]"> Found nested loops with O(n²) complexity at line 5.</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* THE FIX */}
        <section className="py-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <div className="flex items-center gap-[12px] mb-[24px]">
                <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center">
                  <CheckCircle className="w-[20px] h-[20px] text-[#22c55e]" />
                </div>
                <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase">
                  The Fix
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[15px] text-[#666] mb-[20px]">
                Use Maps to achieve O(n) complexity. Linear time regardless of data volume.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden">
                <div className="flex items-center justify-between px-[20px] py-[12px] border-b border-[#333]">
                  <span className="text-[12px] font-mono text-[#888]">CommissionCalculator.cls</span>
                  <span className="text-[10px] uppercase tracking-[1px] text-[#22c55e] font-bold">✓ Optimized</span>
                </div>
                <pre className="p-[20px] text-[13px] font-mono text-[#e0e0e0] overflow-x-auto leading-[1.6]">
                  {goodCodeExample}
                </pre>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-[24px] p-[20px] bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[8px]">
                <p className="text-[14px] text-[#444]">
                  <strong className="text-[#22c55e]">Result:</strong> O(n) complexity. 10,000 records process in 847ms. 
                  CPU consumption reduced by 94%. Production stays online.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* RELATED */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px]">
                Related Anti-Patterns
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
              {relatedAntiPatterns.map((pattern, index) => (
                <Reveal key={pattern.id} delay={100 + index * 50}>
                  <button
                    onClick={() => router.push(`/anti-patterns/${pattern.id}`)}
                    className="w-full text-left bg-[#FAF8F3] rounded-[12px] p-[24px] border border-[#1a1a1a]/5 hover:border-[#FF2424]/30 transition-all group"
                  >
                    <span 
                      className="text-[10px] font-bold uppercase tracking-[1.5px] px-[10px] py-[4px] rounded-[4px] mb-[12px] inline-block"
                      style={{ 
                        backgroundColor: pattern.severity === "Critical" ? "#FF242415" : "#FF6B3515",
                        color: pattern.severity === "Critical" ? "#FF2424" : "#FF6B35"
                      }}
                    >
                      {pattern.severity}
                    </span>
                    <p className="text-[15px] font-medium group-hover:text-[#FF2424] transition-colors">
                      {pattern.title}
                    </p>
                  </button>
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
                Stop production timeouts
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Jataka catches CPU timeout<br />
                <span className="text-[#FF2424]">before the merge.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo and watch Jataka profile CPU time with production-scale data. 
                Your transactions stay fast.
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
                  onClick={() => router.push("/anti-patterns")} 
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  All Anti-Patterns
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
