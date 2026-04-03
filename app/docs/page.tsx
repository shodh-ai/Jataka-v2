"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Shield, GitBranch, Database, Lock, Code, Zap, ArrowRight, CheckCircle } from "lucide-react";
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

// WebPage JSON-LD Schema
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Jataka Documentation - Technical Architecture & Getting Started",
  "description": "Complete technical documentation for Jataka's Backend Firewall and Developer Experience platform. Learn about Kamikaze Pods, Vision AI, Neo4j dependency graphs, and MCP protocol integration.",
  "url": "https://jataka.ai/docs",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Jataka",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web-based",
    "featureList": [
      "Governor Limit Profiling",
      "Self-Healing UI Tests",
      "Blast Radius Prediction",
      "Kamikaze Pods",
      "Vision AI",
      "Neo4j Dependency Graph"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Jataka",
    "url": "https://jataka.ai"
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
      "name": "Documentation",
      "item": "https://jataka.ai/docs"
    }
  ]
};

export default function DocsPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const architectureSteps = [
    { 
      label: "GitHub", 
      description: "Webhook triggers on PR",
      detail: "When a PR is opened or updated, GitHub fires a webhook to our One-Backend orchestration layer. The entire codebase is fetched and queued for analysis."
    },
    { 
      label: "One-Backend", 
      description: "Orchestrates the pipeline",
      detail: "The central brain that coordinates all Jataka services. It manages job queues, handles OAuth authentication, and routes tasks to the appropriate engines."
    },
    { 
      label: "Brum (LLM)", 
      description: "Analyzes code & generates tests",
      detail: "Our proprietary LLM layer that understands Salesforce patterns. It analyzes Apex code, identifies potential limit breaches, and generates test cases for uncovered paths."
    },
    { 
      label: "Kamikaze", 
      description: "Executes API/UI testing",
      detail: "The execution engine that spins up isolated Sandbox pods, runs actual transactions, parses Debug Logs, and returns real Governor Limit metrics."
    },
  ];

  const securityFeatures = [
    {
      title: "Zero-Retention APIs",
      description: "We use Enterprise Zero-Retention APIs. Your code is processed but never stored or used for training. Once the analysis completes, all code artifacts are immediately purged from memory.",
      detailedDescription: "Unlike other AI tools that may cache your code for model improvement, Jataka's enterprise agreements with our LLM providers guarantee that your proprietary Salesforce code is processed in-memory only. No disk writes. No persistent storage. No training on your IP.",
      icon: Database,
    },
    {
      title: "AES-256 Encryption",
      description: "All OAuth tokens are AES-256 encrypted at rest. Your Salesforce credentials are never exposed in logs, dashboards, or debug output.",
      detailedDescription: "Every OAuth refresh token is encrypted with a unique key derived from your organization's master key. Even if our database were compromised, attackers would see only encrypted blobs. We rotate encryption keys quarterly.",
      icon: Lock,
    },
    {
      title: "No Model Training",
      description: "Jataka does not train AI models on your proprietary Salesforce code. Your IP stays yours. We don't learn from your codebase to improve our models.",
      detailedDescription: "This is a contractual guarantee, not just a technical implementation. Our enterprise agreements explicitly prohibit using customer code for any model training or improvement. Your competitive advantage remains yours alone.",
      icon: Shield,
    },
    {
      title: "SOC 2 Compliant",
      description: "Our infrastructure meets SOC 2 Type II standards for security, availability, and confidentiality. Annual audits verify our controls.",
      detailedDescription: "We undergo annual SOC 2 Type II audits by an independent CPA firm. The audit covers access controls, encryption practices, incident response, and change management. Reports available under NDA for enterprise prospects.",
      icon: CheckCircle,
    },
  ];

  const limitParsingFeatures = [
    {
      title: "Tooling API Integration",
      description: "We query Salesforce Tooling API to inspect Apex classes, triggers, and dependencies in real-time. This gives us the symbol tables and metadata needed for static analysis.",
      detailedDescription: "The Tooling API provides access to the SymbolTable of every Apex class, revealing method signatures, variable types, and cross-references. We build a complete dependency graph before executing a single line of code.",
      code: `GET /services/data/v58.0/tooling/query/?q=
SELECT Id, Name, SymbolTable, Body 
FROM ApexClass 
WHERE NamespacePrefix = NULL`,
    },
    {
      title: "Sforce-Limit-Info Headers",
      description: "Every API call returns limit consumption headers. We parse these to build your real-time limit profile during Sandbox execution.",
      detailedDescription: "Salesforce includes limit information in every API response header. We intercept these headers during Sandbox execution to track exactly how many SOQL queries, DML statements, and CPU milliseconds each transaction consumes.",
      code: `Sforce-Limit-Info: api-usage=95/500
Sforce-Limit-Info: api-max=500
Sforce-Limit-Info: per-app-api-usage=42/100`,
    },
    {
      title: "Debug Log Analysis",
      description: "We execute your code in Sandbox and parse Debug Logs to extract actual runtime metrics. This is where we catch the real limit breaches.",
      detailedDescription: "After executing the transaction in an isolated Sandbox, we analyze the execution trace to extract exact runtime metrics. This gives us precise measurements: 97 SOQL queries, 48,000 query rows, 8,500 DML rows. Not estimates—measured facts.",
      code: `> Parsing execution trace...
> SOQL queries detected: 97/100
> Query rows: 48,000/50,000
> DML statements: 45/150
> CPU time: 8,500ms/10,000ms`,
    },
    {
      title: "Blast Radius Calculation",
      description: "Using Neo4j graph analysis, we map dependencies and predict impact of code changes before they're deployed.",
      detailedDescription: "Every Salesforce component is mapped in our dependency graph. When you change a trigger, we analyze the relationships to identify every downstream component that could be affected.",
      code: `> Initiating Blast Radius Traversal...
> Finding 12 downstream dependencies
> Mapping impact across 3 layers
> Risk assessment: CRITICAL`,
    },
  ];

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
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
          <li><button onClick={() => router.push("/use-cases")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</button></li>
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
            <button onClick={() => router.push("/book-pilot")} className="w-full py-4 mt-2 rounded-md bg-[#FF2424] text-white font-archivo uppercase tracking-widest text-sm flex items-center justify-center">
              Book a Demo
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] pt-[120px] pb-[80px] overflow-hidden">
        <LightGridBg />
        <FloatingBlob className="top-[20%] right-[10%]" />
        <FloatingBlob className="bottom-[30%] left-[5%]" />
        
        <div className="relative z-10 max-w-[1000px]">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#666] mb-[40px]">
              01 — Technical Documentation
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-archivo text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] uppercase mb-[40px]">
              How Jataka
              <br />
              <span className="text-[#FF2424]">Actually Works</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[30px]">
              Deep dive into the architecture, security model, and the <strong className="text-[#1a1a1a] font-semibold">secret sauce</strong> behind our limit parsing engine. Transparency builds trust.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── ARCHITECTURE SECTION ── */}
      <section id="architecture" className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
        <LightGridBg />
        
        {/* Large watermark */}
        <div className="absolute top-[50%] left-[-5%] transform -translate-y-1/2 font-archivo text-[180px] md:text-[250px] text-[#1a1a1a]/[0.02] uppercase tracking-[-10px] pointer-events-none select-none">
          PIPELINE
        </div>
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#666] mb-[30px]">
              02 — Architecture
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px]">
              The Pipeline
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[700px] mb-[60px]">
              A clean, modular architecture that processes your PRs in seconds. Here's how the data flows from your GitHub webhook to a deployment decision.
            </p>
          </Reveal>

          {/* Architecture Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[60px]">
            {architectureSteps.map((step, index) => {
              return (
                <Reveal key={step.label} delay={300 + index * 100}>
                  <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 cursor-default h-full">
                    <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center mb-[20px] group-hover:bg-[#FF2424]/20 transition-colors">
                      {index === 0 && <GitBranch className="w-[24px] h-[24px] text-[#FF2424]" />}
                      {index === 1 && <Zap className="w-[24px] h-[24px] text-[#FF2424]" />}
                      {index === 2 && <Code className="w-[24px] h-[24px] text-[#FF2424]" />}
                      {index === 3 && <Shield className="w-[24px] h-[24px] text-[#FF2424]" />}
                    </div>
                    <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888] mb-[12px]">Step {index + 1}</p>
                    <h3 className="font-archivo text-[18px] uppercase tracking-[0.5px] mb-[8px]">{step.label}</h3>
                    <p className="text-[14px] leading-[1.6] text-[#555] mb-[16px]">{step.description}</p>
                    <p className="text-[13px] leading-[1.6] text-[#777]">{step.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Flow Description */}
          <Reveal delay={700}>
            <div className="bg-[#F5F0E8] rounded-[12px] p-[32px] md:p-[40px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#888] mb-[16px]">
                    Input
                  </p>
                  <p className="text-[15px] leading-[1.7] text-[#444]">
                    GitHub webhook fires on PR creation/update. Jataka receives the payload, authenticates with your Salesforce org via OAuth, and queues the analysis job in our distributed task queue.
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#888] mb-[16px]">
                    Output
                  </p>
                  <p className="text-[15px] leading-[1.7] text-[#444]">
                    Pass/Fail status posted to GitHub PR checks. Detailed limit report attached as PR comment with line-by-line attribution. Deployment blocked if thresholds exceeded.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECURITY SECTION ── */}
      <section id="security" className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
        <LightGridBg />
        
        {/* Large watermark */}
        <div className="absolute top-[50%] right-[-10%] transform -translate-y-1/2 font-archivo text-[180px] md:text-[250px] text-[#1a1a1a]/[0.02] uppercase tracking-[-10px] pointer-events-none select-none">
          SECURITY
        </div>
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#666] mb-[30px]">
              03 — Security & Data Privacy
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px]">
              Enterprise-Grade
              <br />
              <span className="text-[#FF2424]">Protection</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[700px] mb-[60px]">
              Built for US Enterprise sales. Your code is your IP. Here's <strong className="text-[#1a1a1a] font-semibold">exactly</strong> how we protect it—no vague promises, just specifics.
            </p>
          </Reveal>

          {/* Security Grid */}
          <div className="space-y-[24px]">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Reveal key={feature.title} delay={300 + index * 100}>
                  <div className="group bg-white rounded-[12px] p-[32px] md:p-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-[24px]">
                      <div className="flex-shrink-0">
                        <div className="w-[56px] h-[56px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center group-hover:bg-[#FF2424]/20 transition-colors">
                          <IconComponent className="w-[26px] h-[26px] text-[#FF2424]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-archivo text-[20px] uppercase tracking-[0.5px] mb-[12px]">
                          {feature.title}
                        </h3>
                        <p className="text-[15px] leading-[1.7] text-[#444] mb-[16px]">
                          {feature.description}
                        </p>
                        <p className="text-[14px] leading-[1.7] text-[#666]">
                          {feature.detailedDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Compliance Badges */}
          <Reveal delay={700}>
            <div className="mt-[60px] flex flex-wrap items-center gap-[16px] justify-center">
              {["SOC 2 Type II", "GDPR Compliant", "HIPAA Ready", "AES-256 Encryption"].map((badge) => (
                <div key={badge} className="px-[24px] py-[12px] border border-[#1a1a1a]/10 rounded-[6px] text-[11px] font-bold uppercase tracking-[1.5px] text-[#666] hover:border-[#FF2424]/30 hover:text-[#FF2424] transition-colors cursor-default">
                  {badge}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── LIMIT PARSING SECTION ── */}
      <section id="limits" className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
        <LightGridBg />
        
        {/* Large watermark */}
        <div className="absolute top-[50%] left-[-5%] transform -translate-y-1/2 font-archivo text-[180px] md:text-[250px] text-[#1a1a1a]/[0.02] uppercase tracking-[-10px] pointer-events-none select-none">
          LIMITS
        </div>
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#666] mb-[30px]">
              04 — How We Parse Limits
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px]">
              The
              <br />
              <span className="text-[#FF2424]">Secret Sauce</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#444] max-w-[700px] mb-[60px]">
              Transparency builds trust. Here's <strong className="text-[#1a1a1a] font-semibold">exactly</strong> how Jataka detects Governor Limit breaches with precision. No black boxes.
            </p>
          </Reveal>

          {/* Limit Parsing Features */}
          <div className="space-y-[32px]">
            {limitParsingFeatures.map((feature, index) => (
              <Reveal key={feature.title} delay={300 + index * 100}>
                <div className="group bg-white rounded-[12px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-[32px] md:p-[40px]">
                      <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888] mb-[16px]">
                        0{index + 1}
                      </p>
                      <h3 className="font-archivo text-[20px] uppercase tracking-[0.5px] mb-[16px]">
                        {feature.title}
                      </h3>
                      <p className="text-[15px] leading-[1.7] text-[#444] mb-[16px]">
                        {feature.description}
                      </p>
                      <p className="text-[14px] leading-[1.7] text-[#666]">
                        {feature.detailedDescription}
                      </p>
                    </div>
                    <div className="bg-[#1a1a1a] p-[24px] md:p-[32px] font-mono text-[12px] md:text-[13px] text-[#8B949E] overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-all">{feature.code}</pre>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Accuracy Guarantee */}
          <Reveal delay={700}>
            <div className="mt-[60px] bg-[#FF2424]/5 border-l-[3px] border-[#FF2424] p-[32px] md:p-[40px] rounded-[4px]">
              <div className="flex items-start gap-[20px]">
                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-[24px] h-[24px] text-[#FF2424]" />
                </div>
                <div>
                  <h4 className="font-archivo text-[18px] uppercase tracking-[0.5px] mb-[12px]">
                    Accuracy Guarantee
                  </h4>
                  <p className="text-[15px] leading-[1.7] text-[#444]">
                    We don't guess. We execute your code in a Sandbox and measure real metrics. If we say you're at 97/100 SOQL queries, 
                    that's not an estimate—it's a <strong className="text-[#1a1a1a] font-semibold">measured fact</strong> from the actual execution. Zero false positives.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative bg-[#1a1a1a] overflow-hidden">
        <LightGridBg />
        <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[100px] text-center">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
              Ready to Ship?
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
              Deploy with
              <br />
              <span className="text-[#FF2424]">absolute certainty.</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
              See the architecture in action. Book a demo and watch Jataka catch real issues in your Salesforce codebase.
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
