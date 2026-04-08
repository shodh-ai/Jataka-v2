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
      "url": "https://jataka.io/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://jataka.io/blog/sub-second-profiler-architecture"
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
      "item": "https://jataka.io"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://jataka.io/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Sub-Second Profiler Architecture",
      "item": "https://jataka.io/blog/sub-second-profiler-architecture"
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
    description: "Instant OAuth connection to your existing Integration/Staging Sandbox. No slow provisioning, uses your existing data volumes.",
    icon: Database
  },
  {
    layer: "3. Transaction Execution",
    description: "Apex code executed via REST/Tooling API. Real user scenarios simulated with your actual data volumes.",
    icon: Cpu
  },
  {
    layer: "4. Real-Time Telemetry",
    description: "Sforce-Limit-Info HTTP headers + Debug Log parsing. No injected Apex, pure external observation.",
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
          <Link href="/" className="flex items-center">
            <img src="/Final-1 (6).svg" alt="Jataka" className="h-[22px] w-auto block" />
          </Link>

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
          <div className="absolute top-[64px] left-0 w-full bg-[#FAF8F3] border-b border-[#1a1a1a]/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl z-[190]">
            <button onClick={() => router.push("/pricing")} className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Pricing</button>
            <button onClick={() => router.push("/security")} className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Security</button>
            <button onClick={() => router.push("/customers")} className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Customers</button>
            <button onClick={() => router.push("/pilot")} className="w-full py-3 mt-2 rounded-[4px] bg-[#FF2424] text-white font-archivo uppercase tracking-[1.5px] text-[12px] flex items-center justify-center">
              Start Pilot
            </button>
          </div>
        )}

        {/* ARTICLE */}
        <article className="pt-[100px] pb-[80px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[800px] mx-auto relative z-10">
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
                mimics production data volumes, without ever touching actual production data.
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
                  <span className="text-[15px] text-[#444]"><strong>Real data volumes</strong> ,  Profile against actual record counts in your sandbox</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>No data copying</strong> ,  We never read or store your actual records</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>Instant setup</strong> ,  OAuth connection in milliseconds, not minutes</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>Existing metadata</strong> ,  No redeployment needed, your sandbox is ready</span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[8px] p-[20px] mb-[40px]">
                <p className="text-[14px] text-[#444]">
                  <strong className="text-[#22c55e]">Security guarantee:</strong> Jataka only reads limit headers and debug logs. 
                  We never query your actual records. Your data stays in your Salesforce org, we only observe 
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
                transactions against those actual record counts, no synthetic data needed:
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="space-y-[12px] mb-[30px]">
                <li className="flex items-start gap-[10px]">
                  <Database className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>Actual record counts</strong> ,  If your sandbox has 10,000 Accounts, we test against 10,000 Accounts</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <Database className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>Real relationships</strong> ,  Parent-child ratios match your actual org structure</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <Database className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>Data skew detection</strong> ,  We identify skewed parent records from your actual data model</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <Database className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]"><strong>No seeding delay</strong> ,  Your data is already there, profiling starts instantly</span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[15px] text-[#555] mb-[40px]">
                This is why Jataka can profile in milliseconds instead of minutes. We don't provision 
                environments, we connect to yours.
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
// No code injection needed, pure external observation`}
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
                This approach gives us line-level attribution, we can tell you exactly which line of code 
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
              <div className="grid grid-cols-2 gap-[16px] mb-[40px] items-stretch">
                {performanceMetrics.map((metric) => (
                  <div key={metric.metric} className="bg-white rounded-[10px] p-[20px] border border-[#1a1a1a]/5 h-full flex flex-col justify-center">
                    <p className="text-[11px] uppercase tracking-[1px] text-[#888] mb-[6px]">{metric.metric}</p>
                    <p className="text-[24px] font-archivo text-[#FF2424]">{metric.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[15px] text-[#555] mb-[40px]">
                The entire profiling pipeline, from PR webhook to breach report, completes in under 2 minutes 
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
                Jataka's profiler gives you the confidence that your code will survive production data volumes, 
                without ever exposing production data. It's the missing piece between static analysis 
                (which catches syntax errors) and production incidents (which catch limit breaches too late).
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[12px] p-[24px] mb-[40px]">
                <p className="text-[15px] text-[#444] leading-[1.7]">
                  <strong className="text-[#FF2424]">The bottom line:</strong> If you're only running static analysis, 
                  you're catching 30% of the problems. Runtime profiling catches the other 70%, the ones that 
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
