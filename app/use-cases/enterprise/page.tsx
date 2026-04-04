"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Building2, AlertTriangle, CheckCircle, ArrowRight, Shield, Zap, Database, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

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

// Floating accent blob
function FloatingBlob({ className }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <div className="w-[300px] h-[300px] rounded-full bg-[#FF2424]/5 blur-[100px] animate-pulse" />
    </div>
  );
}

// Reveal wrapper component
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
      className={`transition-all duration-700 ${className}`}
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
  "@type": "Article",
  "headline": "Jataka for US Enterprise - Protecting Margins from Salesforce Governor Limit Breaches",
  "description": "How Jataka's Backend Firewall prevents runtime crashes from Governor Limit breaches, protecting revenue and ensuring sales portal uptime during peak hours.",
  "author": {
    "@type": "Organization",
    "name": "Jataka"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Jataka",
    "logo": {
      "@type": "ImageObject",
      "url": "https://jataka.io/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://jataka.io/use-cases/enterprise"
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
      "item": "https://jataka.io"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Use Cases",
      "item": "https://jataka.io/use-cases"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Enterprise",
      "item": "https://jataka.io/use-cases/enterprise"
    }
  ]
};

export default function EnterpriseUseCase() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const problemMetrics = [
    { label: "Revenue Loss", value: "$50K+/hr", description: "Direct revenue impact when sales portal is down" },
    { label: "Recovery Time", value: "4-8 hrs", description: "Average time to identify, rollback, and restore service" },
    { label: "Customer Impact", value: "Severe", description: "Customers cannot access accounts, support cases, or place orders" },
    { label: "Trust Erosion", value: "High", description: "Each incident erodes customer and stakeholder confidence" },
  ];

  const solutionFeatures = [
    {
      title: "Pre-Merge Limit Profiling",
      description: "Every PR is executed in an isolated Sandbox with Production-like data volumes before merge. We measure actual SOQL queries, DML statements, CPU milliseconds, and heap size—not estimates.",
      icon: Database,
    },
    {
      title: "Automatic PR Blocking",
      description: "If any Governor Limit threshold is breached during Sandbox execution, the PR is automatically blocked with a detailed report. No manual intervention required.",
      icon: Shield,
    },
    {
      title: "Line-by-Line Attribution",
      description: "When we catch a limit breach, we tell you exactly which line of code caused it. No more hunting through debug logs trying to find the culprit.",
      icon: Zap,
    },
    {
      title: "Zero False Positives",
      description: "We don't guess. We execute. If we say you're at 97/100 SOQL queries, that's a measured fact from actual execution, not a static analysis estimate.",
      icon: Lock,
    },
  ];

  const resultMetrics = [
    { label: "Sev-1 Incidents", value: "0", trend: "from 2-3/year" },
    { label: "Uptime During Peak", value: "100%", trend: "from 94%" },
    { label: "Revenue Protected", value: "$2M+/yr", trend: "direct savings" },
    { label: "Engineer Sleep", value: "Better", trend: "much better" },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "GitHub Webhook Trigger",
      description: "When a PR is opened or updated, GitHub fires a webhook to Jataka's One-Backend orchestration layer. The code is fetched and queued for analysis.",
    },
    {
      step: 2,
      title: "Sandbox Pod Spin-Up",
      description: "Jataka spins up an isolated Kamikaze Pod—a fresh Sandbox environment with your Production data volumes. No contamination, no shared state.",
    },
    {
      step: 3,
      title: "Real Transaction Execution",
      description: "We execute the actual Apex code from your PR against real-ish data. Triggers fire. Flows run. Integration calls happen. This is not a simulation.",
    },
    {
      step: 4,
      title: "Debug Log Parsing",
      description: "After execution, we retrieve and parse the Debug Logs. We extract exact metrics: SOQL queries, query rows, DML statements, CPU time, heap size.",
    },
    {
      step: 5,
      title: "Threshold Comparison",
      description: "We compare measured metrics against Salesforce Governor Limits. If any threshold is breached, the PR fails. If all clear, the PR passes.",
    },
    {
      step: 6,
      title: "PR Status & Report",
      description: "Pass/Fail status is posted to GitHub PR checks. A detailed limit report is attached as a PR comment with line-by-line attribution for any breaches.",
    },
  ];

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
        {/* ── NAV ── */}
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
          
          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
            <li><button onClick={() => router.push("/")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Home</button></li>
            <li><button onClick={() => router.push("/blog")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Demos</button></li>
            <li><button onClick={() => router.push("/use-cases")} className="text-[#1a1a1a] font-medium text-[13.5px] tracking-[0.4px]">Use Cases</button></li>
            <li><button onClick={() => router.push("/docs")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Docs</button></li>
            <li><button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book Demo</button></li>
          </ul>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-[#1a1a1a] p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="absolute top-[64px] left-0 w-full bg-[#FAF8F3] border-b border-[#1a1a1a]/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl z-[190]">
              <button onClick={() => router.push("/")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Home</button>
              <button onClick={() => router.push("/blog")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Demos</button>
              <button onClick={() => router.push("/use-cases")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Use Cases</button>
              <button onClick={() => router.push("/docs")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Docs</button>
              <button onClick={() => router.push("/book-pilot")} className="w-full py-4 mt-2 rounded-md bg-[#FF2424] text-white font-archivo uppercase tracking-widest text-sm flex items-center justify-center">
                Book a Demo
              </button>
            </div>
          )}
        </nav>

        {/* ── HERO SECTION ── */}
        <section className="relative min-h-[70vh] flex flex-col justify-center px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] pt-[120px] pb-[80px] overflow-hidden">
          <LightGridBg />
          <FloatingBlob className="top-[20%] right-[10%]" />
          <FloatingBlob className="bottom-[30%] left-[5%]" />
          
          {/* Large watermark */}
          <div className="absolute top-[50%] right-[-10%] transform -translate-y-1/2 font-archivo text-[200px] md:text-[300px] text-[#1a1a1a]/[0.02] uppercase tracking-[-12px] pointer-events-none select-none">
            ENTERPRISE
          </div>
          
          <div className="relative z-10 max-w-[1000px]">
            <Reveal>
              <div className="flex items-center gap-[16px] mb-[40px]">
                <div className="w-[64px] h-[64px] rounded-[12px] bg-[#FF2424]/10 flex items-center justify-center">
                  <Building2 className="w-[28px] h-[28px] text-[#FF2424]" />
                </div>
                <div>
                  <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888]">Use Case 01</p>
                  <p className="text-[14px] text-[#FF2424] font-medium">Protecting Margins</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] uppercase mb-[40px]">
                Enterprise
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[30px]">
                A bad deployment causes an Apex CPU timeout, crashing the sales portal during end-of-month closing. 
                <strong className="text-[#1a1a1a] font-semibold"> Revenue stops. Executives panic. The rollback takes hours.</strong>
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap gap-[12px]">
                <button onClick={() => router.push("/book-pilot")} className="group bg-[#FF2424] text-white px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center gap-[10px]">
                  Book a Demo
                  <svg className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button onClick={() => router.push("/docs")} className="bg-transparent text-[#1a1a1a] px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] border border-[#1a1a1a]/20 hover:border-[#FF2424]/50 transition-all duration-300">
                  Read the Docs
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PROBLEM SECTION ── */}
        <section className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <div className="flex items-center gap-[10px] mb-[30px]">
                <AlertTriangle className="w-[18px] h-[18px] text-[#FF2424]" />
                <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#FF2424]">The Problem</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[30px]">
                When deployment<br />
                <span className="text-[#FF2424]">means disaster.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[20px]">
                A developer pushes code that worked perfectly in Dev. But Dev has 1,000 records. Production has 10 million. 
                The code hits a Governor Limit at scale, and the sales portal crashes during end-of-month closing.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[60px]">
                The sales team can't close deals. Customer support can't access cases. The VP of Sales is on the phone with the CEO. 
                Meanwhile, your engineering team is frantically rolling back the deployment, but the damage is done. 
                <strong className="text-[#1a1a1a] font-semibold">Trust is broken. Revenue is lost.</strong>
              </p>
            </Reveal>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
              {problemMetrics.map((metric, index) => (
                <Reveal key={metric.label} delay={400 + index * 50}>
                  <div className="bg-white rounded-[12px] p-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5">
                    <div className="font-archivo text-[28px] md:text-[32px] leading-[1] tracking-[-0.5px] text-[#FF2424] mb-[12px]">
                      {metric.value}
                    </div>
                    <div className="text-[12px] font-medium uppercase tracking-[1px] text-[#888] mb-[8px]">
                      {metric.label}
                    </div>
                    <div className="text-[13px] leading-[1.5] text-[#666]">
                      {metric.description}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUTION SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <div className="flex items-center gap-[10px] mb-[30px]">
                <CheckCircle className="w-[18px] h-[18px] text-[#1a1a1a]" />
                <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#1a1a1a]">The Solution</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[30px]">
                Backend Firewall<br />
                <span className="text-[#FF2424]">for Salesforce.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[20px]">
                Jataka's Backend Firewall guarantees zero runtime crashes from Governor Limit breaches. 
                We execute your PRs in an isolated Sandbox with Production-like data volumes, profile the Apex Debug Logs, 
                and automatically block deployments that would breach limits.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[60px]">
                Before any code reaches Production, Jataka spins up a <strong className="text-[#1a1a1a] font-semibold">Kamikaze Pod</strong>—an isolated 
                Sandbox environment that mirrors your Production data volumes. It executes the actual transaction, parses the Debug Logs, 
                and measures real SOQL queries, DML statements, and CPU milliseconds. If any threshold is breached, the PR is blocked 
                with a detailed limit report showing exactly which line caused the problem.
              </p>
            </Reveal>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {solutionFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Reveal key={feature.title} delay={400 + index * 50}>
                    <div className="group bg-white rounded-[12px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300">
                      <div className="flex items-start gap-[20px]">
                        <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF2424]/20 transition-colors">
                          <IconComponent className="w-[22px] h-[22px] text-[#FF2424]" />
                        </div>
                        <div>
                          <h3 className="font-archivo text-[18px] uppercase tracking-[0.5px] mb-[12px]">
                            {feature.title}
                          </h3>
                          <p className="text-[15px] leading-[1.7] text-[#555]">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS SECTION ── */}
        <section className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">How It Works</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[60px]">
                Six steps to<br />
                <span className="text-[#FF2424]">zero incidents.</span>
              </h2>
            </Reveal>

            <div className="space-y-[32px]">
              {howItWorks.map((step, index) => (
                <Reveal key={step.step} delay={200 + index * 50}>
                  <div className="flex gap-[24px] items-start">
                    <div className="flex-shrink-0 w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
                      <span className="font-archivo text-[18px] text-[#FF2424]">{step.step}</span>
                    </div>
                    <div className="flex-1 pt-[8px]">
                      <h3 className="font-archivo text-[18px] uppercase tracking-[0.5px] mb-[8px]">
                        {step.title}
                      </h3>
                      <p className="text-[15px] leading-[1.7] text-[#555]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULT SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <div className="flex items-center gap-[10px] mb-[30px]">
                <ArrowRight className="w-[18px] h-[18px] text-[#FF2424]" />
                <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#FF2424]">The Result</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[30px]">
                Zero Sev-1s.<br />
                <span className="text-[#FF2424]">Revenue protected.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[800px] mb-[60px]">
                Zero Sev-1 incidents from limit breaches. Sales portal stays up during peak hours. Revenue protected. 
                Trust maintained. Engineering team sleeps better. Your VP of Sales stops calling you at 2 AM.
              </p>
            </Reveal>

            {/* Result Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
              {resultMetrics.map((metric, index) => (
                <Reveal key={metric.label} delay={300 + index * 50}>
                  <div className="bg-white rounded-[12px] p-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5">
                    <div className="font-archivo text-[28px] md:text-[32px] leading-[1] tracking-[-0.5px] text-[#1a1a1a] mb-[8px]">
                      {metric.value}
                    </div>
                    <div className="text-[12px] font-medium uppercase tracking-[1px] text-[#888] mb-[4px]">
                      {metric.label}
                    </div>
                    <div className="text-[12px] text-[#FF2424]">
                      {metric.trend}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="relative bg-[#1a1a1a] overflow-hidden">
          <LightGridBg />
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[100px] text-center">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                Ready to Protect Your Margins?
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                See Jataka catch<br />
                <span className="text-[#FF2424]">real issues in your codebase.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo and watch Jataka identify actual Governor Limit risks in your Salesforce code. 
                No generic pitches—just your code, your limits, your protection.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row gap-[16px] justify-center">
                <button 
                  onClick={() => router.push("/book-pilot")} 
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Book a Demo
                  <svg className="w-[16px] h-[16px] group-hover:translate-x-[4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button 
                  onClick={() => router.push("/use-cases")} 
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  View All Use Cases
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
