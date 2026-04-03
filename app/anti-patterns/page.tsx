"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, AlertTriangle, Play, Code, Shield, ArrowRight, Zap, Clock, Database, Lock, Cpu } from "lucide-react";

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
  "@type": "CollectionPage",
  "name": "Salesforce Governor Limit Anti-Patterns Library - Jataka",
  "description": "Learn how Jataka catches and prevents Salesforce Governor Limit exceptions before they hit production. Real code examples of SOQL 101, DML 151, CPU timeout, and more.",
  "url": "https://jataka.ai/anti-patterns",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://jataka.ai/anti-patterns/soql-101",
        "name": "Too many SOQL queries: 101"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://jataka.ai/anti-patterns/dml-151",
        "name": "Too many DML statements: 151"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "url": "https://jataka.ai/anti-patterns/cpu-timeout",
        "name": "Apex CPU time limit exceeded"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "url": "https://jataka.ai/anti-patterns/mixed-dml",
        "name": "UNCOMMITTED_WORK_PENDING"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "url": "https://jataka.ai/anti-patterns/lock-contention",
        "name": "UNABLE_TO_LOCK_ROW"
      }
    ]
  }
};

// Breadcrumb Schema
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
      "name": "Anti-Patterns Library",
      "item": "https://jataka.ai/anti-patterns"
    }
  ]
};

const limitBreaches = [
  {
    id: "soql-101",
    title: "Too many SOQL queries: 101",
    error: "System.LimitException: Too many SOQL queries: 101",
    description: "The classic SOQL-in-a-for-loop. Every Salesforce developer has written this. It works in dev, then crashes production when data volumes are real.",
    icon: Database,
    limit: "100 queries per transaction",
    severity: "Critical",
    color: "#FF2424",
    metrics: { searches: "12,000/month", avgDowntime: "4 hours" }
  },
  {
    id: "dml-151",
    title: "Too many DML statements: 151",
    error: "System.LimitException: Too many DML statements: 151",
    description: "You thought bulkifying was optional. Then you hit 151 DML statements and your trigger crashes mid-transaction. Partial rollback chaos.",
    icon: Zap,
    limit: "150 statements per transaction",
    severity: "Critical",
    color: "#FF2424",
    metrics: { searches: "8,500/month", avgDowntime: "3 hours" }
  },
  {
    id: "cpu-timeout",
    title: "Apex CPU time limit exceeded",
    error: "System.LimitException: Apex CPU time limit exceeded",
    description: "Your code runs fine in Sandbox with 100 records. Production has 50,000. The nested loops you forgot about burn through 10 seconds of CPU time.",
    icon: Cpu,
    limit: "10,000ms synchronous / 60,000ms async",
    severity: "Critical",
    color: "#FF2424",
    metrics: { searches: "6,200/month", avgDowntime: "6 hours" }
  },
  {
    id: "mixed-dml",
    title: "UNCOMMITTED_WORK_PENDING",
    error: "System.DmlException: UNCOMMITTED_WORK_PENDING, Your call requires to be in an active transaction",
    description: "Mixed DML operations. You tried to insert a User and an Account in the same transaction. Salesforce blocks this for data integrity. You didn't know.",
    icon: AlertTriangle,
    limit: "Setup & non-Setup objects",
    severity: "High",
    color: "#FF6B35",
    metrics: { searches: "3,100/month", avgDowntime: "2 hours" }
  },
  {
    id: "lock-contention",
    title: "UNABLE_TO_LOCK_ROW",
    error: "System.DmlException: UNABLE_TO_LOCK_ROW, unable to obtain exclusive access to this record",
    description: "Data skew. Your top Account has 50,000 Contacts. Two users try to update the same parent field simultaneously. Lock contention brings your org to a halt.",
    icon: Lock,
    limit: "Record lock contention",
    severity: "High",
    color: "#FF6B35",
    metrics: { searches: "2,400/month", avgDowntime: "8 hours" }
  }
];

export default function AntiPatternsPage() {
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

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
            <li><button onClick={() => router.push("/")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Home</button></li>
            <li><button onClick={() => router.push("/blog")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Demos</button></li>
            <li><button onClick={() => router.push("/use-cases")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</button></li>
            <li><button onClick={() => router.push("/anti-patterns")} className="text-[#1a1a1a] font-medium text-[13.5px] tracking-[0.4px]">Anti-Patterns</button></li>
            <li><button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book Demo</button></li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-[8px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
          </button>
        </nav>

        {/* Mobile Menu */}
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

        {/* HERO */}
        <section className="pt-[140px] pb-[80px] px-[24px] md:px-[48px]">
          <div className="max-w-[1200px] mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <AlertTriangle className="w-[14px] h-[14px]" />
                Salesforce Governor Limit Library
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] uppercase mb-[40px]">
                Every limit breach.<br />
                <span className="text-[#FF2424]">Caught before production.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[30px]">
                When developers hit a Governor Limit at 2:00 AM, they Google the error. These pages rank at the top. 
                They watch the video, see Jataka blocking the breach, and send it to their boss the next morning.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[15px] leading-[1.6] text-[#666] max-w-[700px] mb-[60px]">
                Each anti-pattern page includes: a 60-second video of Jataka catching the error, the bad code snippet, 
                the Jataka report card, and exactly how to fix it. SEO gold for developers in crisis.
              </p>
            </Reveal>
          </div>
        </section>

        {/* LIMIT BREACH CARDS */}
        <section className="pb-[100px] px-[24px] md:px-[48px]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              {limitBreaches.map((breach, index) => {
                const IconComponent = breach.icon;
                return (
                  <Reveal key={breach.id} delay={100 + index * 50}>
                    <button
                      onClick={() => router.push(`/anti-patterns/${breach.id}`)}
                      className="group w-full text-left bg-white rounded-[12px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.12)] hover:border-[#FF2424]/30 transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-[20px]">
                        <div 
                          className="w-[48px] h-[48px] rounded-[8px] flex items-center justify-center"
                          style={{ backgroundColor: `${breach.color}15` }}
                        >
                          <IconComponent className="w-[22px] h-[22px]" style={{ color: breach.color }} />
                        </div>
                        <span 
                          className="text-[10px] font-bold uppercase tracking-[1.5px] px-[10px] py-[4px] rounded-[4px]"
                          style={{ 
                            backgroundColor: breach.severity === "Critical" ? "#FF242415" : "#FF6B3515",
                            color: breach.severity === "Critical" ? "#FF2424" : "#FF6B35"
                          }}
                        >
                          {breach.severity}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-archivo text-[18px] leading-[1.3] tracking-[-0.5px] uppercase mb-[12px] group-hover:text-[#FF2424] transition-colors">
                        {breach.title}
                      </h3>

                      {/* Error */}
                      <code className="block text-[12px] font-mono text-[#666] bg-[#f5f5f5] px-[12px] py-[8px] rounded-[6px] mb-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {breach.error}
                      </code>

                      {/* Description */}
                      <p className="text-[14px] leading-[1.6] text-[#555] mb-[20px]">
                        {breach.description}
                      </p>

                      {/* Metrics */}
                      <div className="flex items-center gap-[20px] pt-[16px] border-t border-[#1a1a1a]/5">
                        <div>
                          <p className="text-[10px] uppercase tracking-[1px] text-[#888] mb-[2px]">Google Searches</p>
                          <p className="text-[14px] font-semibold text-[#1a1a1a]">{breach.metrics.searches}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[1px] text-[#888] mb-[2px]">Avg Downtime</p>
                          <p className="text-[14px] font-semibold text-[#1a1a1a]">{breach.metrics.avgDowntime}</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-[8px] mt-[20px] text-[#FF2424] font-medium text-[13px] group-hover:gap-[12px] transition-all">
                        <span>Watch Jataka catch it</span>
                        <ArrowRight className="w-[14px] h-[14px]" />
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* SEO VALUE */}
        <section className="py-[80px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <h2 className="font-archivo text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[30px]">
                Why this works<br />
                <span className="text-[#FF2424]">for SEO</span>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[17px] leading-[1.7] text-[#444] max-w-[700px] mx-auto mb-[40px]">
                When a Salesforce developer gets a "101 SOQL" error at 2:00 AM, they search for the exact error message. 
                These pages are optimized to rank at the top of Google for every Governor Limit exception.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
              <Reveal delay={200}>
                <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] text-left">
                  <div className="text-[32px] font-archivo text-[#FF2424] mb-[12px]">32,200+</div>
                  <p className="text-[14px] text-[#555]">Monthly searches for Salesforce limit errors that these pages target</p>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] text-left">
                  <div className="text-[32px] font-archivo text-[#FF2424] mb-[12px]">2:00 AM</div>
                  <p className="text-[14px] text-[#555]">Peak search time—when developers are in crisis and looking for solutions</p>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] text-left">
                  <div className="text-[32px] font-archivo text-[#FF2424] mb-[12px]">85%</div>
                  <p className="text-[14px] text-[#555]">Click-through rate for pages with video demonstrations of the solution</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                Stop firefighting at 2 AM
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Jataka catches every breach<br />
                <span className="text-[#FF2424]">before the merge.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo and watch Jataka block real limit breaches in real-time. 
                Your developers sleep through the night.
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
                  onClick={() => router.push("/use-cases")} 
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  View Use Cases
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
