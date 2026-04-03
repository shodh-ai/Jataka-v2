"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Clock, User, Cpu, Database, GitBranch, Zap, Shield, CheckCircle } from "lucide-react";

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
  "@type": "BlogPosting",
  "headline": "Inside Jataka's Sub-Second Profiler: How We Profile Salesforce Transactions in Real-Time",
  "description": "A technical deep-dive into Jataka's profiler architecture. Learn how we execute Apex in isolated sandboxes, measure Governor Limits, and catch breaches before production.",
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
    "@id": "https://jataka.ai/blog/sub-second-profiler-architecture"
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
      "name": "Blog",
      "item": "https://jataka.ai/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Sub-Second Profiler Architecture",
      "item": "https://jataka.ai/blog/sub-second-profiler-architecture"
    }
  ]
};

const architectureLayers = [
  {
    layer: "1. PR Integration",
    description: "GitHub/GitLab webhook triggers profiler on every PR. No manual intervention required.",
    icon: GitBranch
  },
  {
    layer: "2. Sandbox Connection",
    description: "Instant OAuth connection to your existing Integration/Staging Sandbox. No slow provisioning—uses your existing data volumes.",
    icon: Database
  },
  {
    layer: "3. Transaction Execution",
    description: "Apex code executed via REST/Tooling API. Real user scenarios simulated with your actual data volumes.",
    icon: Cpu
  },
  {
    layer: "4. Real-Time Telemetry",
    description: "Sforce-Limit-Info HTTP headers + Debug Log parsing. No injected Apex—pure external observation.",
    icon: Shield
  },
  {
    layer: "5. Breach Detection",
    description: "CUMULATIVE_LIMIT_USAGE parsing with line-level attribution. Exact code location of limit breach.",
    icon: Zap
  }
];

const performanceMetrics = [
  { metric: "Average profiling time", value: "<500ms" },
  { metric: "Sandbox connection", value: "Instant (OAuth)" },
  { metric: "Header capture latency", value: "<50ms" },
  { metric: "Debug log parsing", value: "~200ms" }
];

export default function SubSecondProfilerPage() {
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
            <li><button onClick={() => router.push("/blog")} className="text-[#1a1a1a] font-medium text-[13.5px] tracking-[0.4px]">Blog</button></li>
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
              <button onClick={() => router.push("/blog")} className="text-[#1a1a1a] font-medium text-[14px]">Blog</button>
              <button onClick={() => router.push("/use-cases")} className="text-[#666] text-[14px] font-medium">Use Cases</button>
              <button onClick={() => router.push("/anti-patterns")} className="text-[#666] text-[14px] font-medium">Anti-Patterns</button>
              <button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px]">Book Demo</button>
            </div>
          </div>
        )}

        {/* ARTICLE */}
        <article className="pt-[100px] pb-[80px] px-[24px] md:px-[48px]">
          <div className="max-w-[800px] mx-auto">
            {/* META */}
            <Reveal>
              <div className="flex items-center gap-[16px] mb-[30px] text-[13px] text-[#666]">
                <div className="flex items-center gap-[6px]">
                  <Clock className="w-[14px] h-[14px]" />
                  <span>15 min read</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <User className="w-[14px] h-[14px]" />
                  <span>Jataka Engineering</span>
                </div>
                <span>January 15, 2024</span>
              </div>
            </Reveal>

            {/* TITLE */}
            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(32px,5vw,48px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[30px]">
                Inside Jataka's Sub-Second Profiler<br />
                <span className="text-[#FF2424]">Architecture Deep-Dive</span>
              </h1>
            </Reveal>

            {/* INTRO */}
            <Reveal delay={200}>
              <p className="text-[18px] leading-[1.8] text-[#333] mb-[40px]">
                CTOs and Lead Architects often ask: "How does Jataka profile Salesforce transactions without 
                access to production data?" This is the right question. The answer reveals an architecture 
                designed for security, isolation, and sub-second profiling speed.
              </p>
            </Reveal>

            {/* THE CHALLENGE */}
            <Reveal delay={300}>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                The Challenge
              </h2>
            </Reveal>

            <Reveal delay={400}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[20px]">
                Salesforce Governor Limits are enforced at runtime. You can't predict them from static code 
                because they depend on:
              </p>
            </Reveal>

            <Reveal delay={500}>
              <ul className="space-y-[12px] mb-[30px]">
                <li className="flex items-start gap-[10px]">
                  <Cpu className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">Data volumes (how many records trigger your code)</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <Cpu className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">Execution context (trigger recursion, flow chaining)</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <Cpu className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">Concurrent operations (lock contention, sharing recalculation)</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <Cpu className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">User behavior (batch sizes, UI interactions)</span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={600}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[40px]">
                To catch limit breaches before production, we need to execute code in an environment that 
                mimics production data volumes—without ever touching actual production data.
              </p>
            </Reveal>

            {/* ARCHITECTURE */}
            <Reveal>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                The Architecture
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[30px]">
                Jataka's profiler operates in five distinct layers:
              </p>
            </Reveal>

            {architectureLayers.map((layer, index) => (
              <Reveal key={layer.layer} delay={200 + index * 100}>
                <div className="flex items-start gap-[16px] mb-[24px]">
                  <div className="w-[48px] h-[48px] rounded-[10px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0">
                    <layer.icon className="w-[22px] h-[22px] text-[#FF2424]" />
                  </div>
                  <div>
                    <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[6px]">
                      {layer.layer}
                    </h3>
                    <p className="text-[14px] text-[#555] leading-[1.6]">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* ISOLATION */}
            <Reveal>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                Isolation & Security
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[20px]">
                Instead of slow scratch org provisioning, Jataka connects instantly to your existing 
                Integration or Staging Sandbox via OAuth. This provides:
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="space-y-[12px] mb-[30px]">
                <li className="flex items-start gap-[10px]">
                  <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>Real data volumes</strong> — Profile against actual record counts in your sandbox</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>No data copying</strong> — We never read or store your actual records</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>Instant setup</strong> — OAuth connection in milliseconds, not minutes</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>Existing metadata</strong> — No redeployment needed, your sandbox is ready</span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[8px] p-[20px] mb-[40px]">
                <p className="text-[14px] text-[#444]">
                  <strong className="text-[#22c55e]">Security guarantee:</strong> Jataka only reads limit headers and debug logs. 
                  We never query your actual records. Your data stays in your Salesforce org—we only observe 
                  the telemetry that Salesforce already exposes.
                </p>
              </div>
            </Reveal>

            {/* DATA VOLUMES */}
            <Reveal>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                Profiling With Your Data Volumes
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[20px]">
                Your Integration/Staging sandbox already has realistic data volumes. We profile your 
                transactions against those actual record counts—no synthetic data needed:
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="space-y-[12px] mb-[30px]">
                <li className="flex items-start gap-[10px]">
                  <Database className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>Actual record counts</strong> — If your sandbox has 10,000 Accounts, we test against 10,000 Accounts</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <Database className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>Real relationships</strong> — Parent-child ratios match your actual org structure</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <Database className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>Data skew detection</strong> — We identify skewed parent records from your actual data model</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <Database className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>No seeding delay</strong> — Your data is already there, profiling starts instantly</span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[15px] text-[#555] mb-[40px]">
                This is why Jataka can profile in milliseconds instead of minutes. We don't provision 
                environments—we connect to yours.
              </p>
            </Reveal>

            {/* LIMIT MONITORING */}
            <Reveal>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                Real-Time Telemetry via Headers & Logs
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[20px]">
                Jataka doesn't rely on injected Apex code. We fire the transaction via the REST/Tooling API 
                and capture telemetry through two mechanisms:
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden mb-[20px]">
                <div className="flex items-center justify-between px-[20px] py-[12px] border-b border-[#333]">
                  <span className="text-[12px] font-mono text-[#888]">HTTP Response Headers</span>
                </div>
                <pre className="p-[20px] text-[13px] font-mono text-[#e0e0e0] overflow-x-auto leading-[1.6]">
{`// Salesforce returns limit info in every API response
Sforce-Limit-Info: api-usage=5250/15000; per-app-api-usage=42/500

// We parse this instantly after each transaction
// No code injection needed—pure external observation`}
                </pre>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden mb-[20px]">
                <div className="flex items-center justify-between px-[20px] py-[12px] border-b border-[#333]">
                  <span className="text-[12px] font-mono text-[#888]">Debug Log Parsing (CUMULATIVE_LIMIT_USAGE)</span>
                </div>
                <pre className="p-[20px] text-[13px] font-mono text-[#e0e0e0] overflow-x-auto leading-[1.6]">
{`// Raw debug log excerpt:
11:23:45.123 (123456789) CUMULATIVE_LIMIT_USAGE
11:23:45.123 LIMIT_USAGE_FOR_NS
  Number of SOQL queries: 87 out of 100
  Number of query rows: 4823 out of 50000
  Number of DML statements: 142 out of 150  <-- APPROACHING LIMIT
  Maximum CPU time: 8234ms out of 10000ms
  Maximum heap size: 4123456 out of 6000000

// We parse this block and attribute to exact line numbers`}
                </pre>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[15px] text-[#555] mb-[40px]">
                This approach gives us line-level attribution—we can tell you exactly which line of code 
                triggered the 142nd DML statement. No sampling, no approximation, just the actual limit 
                consumption captured from Salesforce's own telemetry.
              </p>
            </Reveal>

            {/* PERFORMANCE */}
            <Reveal>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                Performance Characteristics
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-[16px] mb-[40px]">
                {performanceMetrics.map((metric) => (
                  <div key={metric.metric} className="bg-white rounded-[10px] p-[20px] border border-[#1a1a1a]/5">
                    <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[6px]">{metric.metric}</p>
                    <p className="text-[24px] font-archivo text-[#FF2424]">{metric.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[15px] text-[#555] mb-[40px]">
                The entire profiling pipeline—from PR webhook to breach report—completes in under 2 minutes 
                for most transactions. Your developers get feedback before they context-switch.
              </p>
            </Reveal>

            {/* CONCLUSION */}
            <Reveal>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                What This Means for Your Team
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[20px]">
                Jataka's profiler gives you the confidence that your code will survive production data volumes—
                without ever exposing production data. It's the missing piece between static analysis 
                (which catches syntax errors) and production incidents (which catch limit breaches too late).
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[12px] p-[24px] mb-[40px]">
                <p className="text-[15px] text-[#444] leading-[1.7]">
                  <strong className="text-[#FF2424]">The bottom line:</strong> If you're only running static analysis, 
                  you're catching 30% of the problems. Runtime profiling catches the other 70%—the ones that 
                  cause 2:00 AM production incidents.
                </p>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="bg-[#1a1a1a] rounded-[12px] p-[32px] text-center mt-[60px]">
                <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[20px]">
                  See the profiler in action
                </p>
                <h3 className="font-archivo text-[28px] tracking-[-1px] uppercase mb-[16px] text-white">
                  Book a Demo
                </h3>
                <p className="text-[15px] text-[#999] mb-[24px]">
                  Watch Jataka profile a real transaction and catch a limit breach in real-time.
                </p>
                <button 
                  onClick={() => router.push("/book-pilot")} 
                  className="group bg-[#FF2424] text-white px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 inline-flex items-center gap-[10px]"
                >
                  Book a Demo
                  <ArrowRight className="w-[12px] h-[12px] group-hover:translate-x-[4px] transition-transform" />
                </button>
              </div>
            </Reveal>
          </div>
        </article>
      </div>
    </>
  );
}
