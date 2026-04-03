"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, CheckCircle, Zap, GitBranch, Ticket, Bot, Database, Play, FileCheck, Clock, Users, Cpu } from "lucide-react";

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
  "name": "Autonomous SDLC - Jataka's Closed Loop Automation",
  "description": "Jataka automates the entire Software Development Life Cycle: Jira to Cursor to GitHub to Jataka and back. Developers stay in their IDE while Jataka handles orchestration, testing, and ticket management.",
  "url": "https://jataka.ai/use-cases/autonomous-sdlc"
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
      "name": "Use Cases",
      "item": "https://jataka.ai/use-cases"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Autonomous SDLC",
      "item": "https://jataka.ai/use-cases/autonomous-sdlc"
    }
  ]
};

const steps = [
  {
    number: "01",
    title: "Intent",
    subtitle: "Jira Integration",
    icon: Ticket,
    color: "#FF2424",
    description: "Jataka reads the Jira ticket and updates the Neo4j graph with the business intent.",
    details: [
      "Parse Jira ticket description and acceptance criteria",
      "Map requirements to existing Salesforce metadata",
      "Update Neo4j graph with feature context",
      "Identify affected objects, classes, and flows"
    ],
    outcome: "Your feature requirements become structured context that every tool in your pipeline can access."
  },
  {
    number: "02",
    title: "Code",
    subtitle: "Cursor IDE + MCP",
    icon: Cpu,
    color: "#FF6B35",
    description: "Through our MCP, your developer asks Cursor how to build the feature. Jataka feeds Cursor the exact blast radius and safe code patterns.",
    details: [
      "Developer asks Cursor: 'How do I implement this Jira ticket?'",
      "Jataka's MCP server provides org-specific context",
      "Cursor receives blast radius analysis before coding",
      "Safe code patterns auto-suggested based on your org"
    ],
    outcome: "Your developers write correct code the first time. No guessing. No trial-and-error."
  },
  {
    number: "03",
    title: "Verify",
    subtitle: "GitHub PR Analysis",
    icon: GitBranch,
    color: "#FFB800",
    description: "The developer opens a PR. Jataka's API Firewall and Kamikaze Pods test the limits and the UI automatically.",
    details: [
      "PR triggers Kamikaze Pod in isolated Sandbox",
      "Runtime profiling of SOQL, DML, CPU, Heap",
      "Vision AI tests the UI in real browser",
      "Hybrid SOQL assertions verify database state"
    ],
    outcome: "Every PR is tested against real Salesforce limits—not just static analysis guesses."
  },
  {
    number: "04",
    title: "Resolve",
    subtitle: "Jira + Cursor Feedback",
    icon: CheckCircle,
    color: "#22c55e",
    description: "If limits breach, Jataka sends feedback back to Cursor. If it passes, Jataka updates the Jira ticket to 'Ready for Deployment' with attached video proof.",
    details: [
      "Limit breach → AI fix sent to Cursor for developer",
      "Pass → Jira ticket auto-updated to 'Ready for Deployment'",
      "Video proof of successful test attached to ticket",
      "Deployment approval triggered automatically"
    ],
    outcome: "Your developers stay in their IDE. Jataka handles the orchestration, testing, and ticket management."
  }
];

const benefits = [
  {
    metric: "80%",
    label: "Reduction in context switching",
    description: "Developers stay in Cursor. No more jumping between Jira, GitHub, and Slack."
  },
  {
    metric: "60%",
    label: "Faster time to production",
    description: "Automated testing and ticket management eliminates manual handoffs."
  },
  {
    metric: "0",
    label: "Manual QA bottlenecks",
    description: "Jataka's Kamikaze Pods and Vision AI test every PR automatically."
  },
  {
    metric: "100%",
    label: "Traceability from ticket to deploy",
    description: "Every line of code traced back to its Jira ticket requirement."
  }
];

export default function AutonomousSDLCPage() {
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
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <Bot className="w-[14px] h-[14px]" />
                Highest-Value IP
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                The Autonomous<br />
                <span className="text-[#FF2424]">SDLC</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[18px] leading-[1.7] text-[#444] max-w-[700px] mx-auto mb-[30px]">
                Jataka doesn't just wait for pull requests. It manages the entire lifecycle. 
                This closed loop — <strong className="text-[#1a1a1a]">Jira to Cursor to GitHub to Jataka back to Jira</strong> — 
                is your highest-value intellectual property.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[16px] text-[#666] max-w-[600px] mx-auto mb-[40px]">
                You aren't just catching limits; you are automating the entire Software Development Life Cycle.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CLOSED LOOP DIAGRAM */}
        <section className="pb-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[900px] mx-auto">
            <Reveal>
              <div className="bg-[#1a1a1a] rounded-[12px] p-[40px] text-white">
                <div className="text-center mb-[30px]">
                  <p className="text-[12px] uppercase tracking-[2px] text-[#FF2424] mb-[8px]">The Closed Loop</p>
                  <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase">Jira → Cursor → GitHub → Jataka → Jira</h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-[20px] md:gap-[16px]">
                  {[
                    { name: "Jira", icon: "📋", color: "#FF2424" },
                    { name: "Cursor", icon: "⌨️", color: "#FF6B35" },
                    { name: "GitHub", icon: "🔍", color: "#FFB800" },
                    { name: "Jataka", icon: "J", color: "#FF2424", isJataka: true },
                  ].map((item, index) => (
                    <React.Fragment key={item.name}>
                      <div className="text-center">
                        <div 
                          className={`w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-[8px] ${item.isJataka ? 'bg-[#FF2424] text-white font-bold text-[24px]' : ''}`}
                          style={!item.isJataka ? { backgroundColor: `${item.color}15` } : {}}
                        >
                          {item.isJataka ? item.icon : <span className="text-[24px]">{item.icon}</span>}
                        </div>
                        <span className="text-[11px] uppercase tracking-[1px] text-white/70">{item.name}</span>
                      </div>
                      {index < 3 && (
                        <span className="text-[#FF2424] text-[20px] hidden md:block">→</span>
                      )}
                    </React.Fragment>
                  ))}
                  <span className="text-[#22c55e] text-[20px] hidden md:block">↩</span>
                </div>

                <div className="mt-[30px] pt-[24px] border-t border-white/10 text-center">
                  <p className="text-[14px] text-white/70">
                    Your developers stay in their IDE. Jataka handles the <span className="text-[#FF2424]">orchestration</span>, 
                    the <span className="text-[#FF2424]">testing</span>, and the <span className="text-[#FF2424]">ticket management</span>.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 4 STEPS */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px] text-center">
                How It Works
              </h2>
            </Reveal>

            <Reveal delay={50}>
              <p className="text-[16px] text-[#666] text-center mb-[50px]">
                Four steps that transform your Salesforce development workflow.
              </p>
            </Reveal>

            <div className="space-y-[40px]">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={100 + index * 100}>
                  <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-[24px] lg:gap-[40px]">
                    {/* Step Number */}
                    <div className="flex lg:flex-col items-center lg:items-start gap-[16px] lg:gap-0">
                      <div 
                        className="w-[80px] h-[80px] rounded-[12px] flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${step.color}10` }}
                      >
                        <step.icon className="w-[36px] h-[36px]" style={{ color: step.color }} />
                      </div>
                      <div className="lg:mt-[12px]">
                        <span 
                          className="font-archivo text-[32px] tracking-[-1px]"
                          style={{ color: step.color }}
                        >
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] border-l-[4px]" style={{ borderLeftColor: step.color }}>
                      <div className="flex flex-col md:flex-row md:items-start gap-[16px] md:gap-[40px]">
                        <div className="flex-1">
                          <h3 className="font-archivo text-[22px] tracking-[-0.5px] uppercase mb-[4px]">
                            {step.title}
                          </h3>
                          <p className="text-[12px] uppercase tracking-[1.5px] text-[#666] mb-[16px]">
                            {step.subtitle}
                          </p>
                          <p className="text-[15px] text-[#444] leading-[1.7] mb-[20px]">
                            {step.description}
                          </p>
                          <ul className="space-y-[8px]">
                            {step.details.map((detail) => (
                              <li key={detail} className="flex items-start gap-[10px]">
                                <div 
                                  className="w-[5px] h-[5px] rounded-full flex-shrink-0 mt-[6px]"
                                  style={{ backgroundColor: step.color }}
                                />
                                <span className="text-[14px] text-[#555]">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:w-[200px] flex-shrink-0">
                          <div className="bg-white rounded-[8px] p-[16px] border border-[#1a1a1a]/5">
                            <p className="text-[10px] uppercase tracking-[1px] text-[#666] mb-[8px]">Outcome</p>
                            <p className="text-[13px] text-[#444] leading-[1.6]">{step.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-[60px] px-[24px] md:px-[48px]">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[40px] text-center">
                The Results
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px]">
              {benefits.map((benefit, index) => (
                <Reveal key={benefit.label} delay={100 + index * 50}>
                  <div className="bg-white rounded-[12px] p-[24px] text-center border border-[#1a1a1a]/5 h-full">
                    <p className="text-[42px] font-archivo text-[#FF2424] mb-[8px]">{benefit.metric}</p>
                    <p className="text-[12px] uppercase tracking-[1px] text-[#666] mb-[12px]">{benefit.label}</p>
                    <p className="text-[13px] text-[#555] leading-[1.6]">{benefit.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* NEO4J CONTEXT */}
        <section className="py-[60px] px-[24px] md:px-[48px] bg-white">
          <div className="max-w-[800px] mx-auto text-center">
            <Reveal>
              <div className="w-[60px] h-[60px] rounded-[12px] bg-[#FF2424]/10 flex items-center justify-center mx-auto mb-[24px]">
                <Database className="w-[28px] h-[28px] text-[#FF2424]" />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px]">
                Powered by Neo4j
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#444] mb-[30px]">
                Every tool in the closed loop — Jira, Cursor, GitHub — accesses the same 
                <strong className="text-[#1a1a1a]"> Neo4j Knowledge Graph</strong>. Your entire Salesforce org's 
                metadata, relationships, and blast radius live in one place. When a Jira ticket is created, 
                Jataka already knows what it affects.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-[#FAF8F3] rounded-[12px] p-[24px] border border-[#1a1a1a]/5">
                <p className="text-[14px] text-[#555] leading-[1.7]">
                  <strong className="text-[#FF2424]">Example:</strong> A Jira ticket says "Add validation to Account.Name". 
                  Jataka's Neo4j graph instantly shows: 3 triggers, 7 flows, 12 Apex classes, and 2 integrations 
                  that reference Account.Name. Cursor gets this context before your developer writes a single line.
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
                Automate your SDLC
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Stop managing tools.<br />
                <span className="text-[#FF2424]">Start managing code.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                The closed loop is your competitive advantage. Let Jataka orchestrate your 
                entire development lifecycle while your developers focus on building.
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
                  onClick={() => router.push("/docs")} 
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Read the Docs
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
