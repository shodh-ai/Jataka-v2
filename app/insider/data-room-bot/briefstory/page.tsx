"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  ArrowRight,
  Shield,
  Swords,
  Briefcase,
  Network,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Lock,
  TrendingUp,
  Zap,
  Database,
  GitBranch,
  Eye,
} from "lucide-react";

// ------------------------------------------------------------------
// Scroll Reveal Hook
// ------------------------------------------------------------------
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
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
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ------------------------------------------------------------------
// Executive-Friendly Mermaid Diagrams
// ------------------------------------------------------------------

// Chart 1: The Problem (Jenga Effect)
const CHART_PROBLEM = `flowchart TD
    A[Developer or AI Agent\nChanges Lead Status Dropdown] --> B{Builds in Vacuum\nNo Enterprise Context}
    B -->|Silent Breakage| C[SAP Billing Integration Fails]
    B -->|Silent Breakage| D[Marketing Flow Breaks]
    B -->|Silent Breakage| E[VP Dashboard Corrupts]
    B -->|Business Stops| F[Revenue Impact]
    
    style A fill:#1a1a1a,stroke:#1a1a1a,stroke-width:2px,color:#ffffff
    style B fill:#FF2424,stroke:#FF2424,stroke-width:2px,color:#ffffff
    style C fill:#fff,stroke:#FF2424,stroke-width:2px,color:#1a1a1a
    style D fill:#fff,stroke:#FF2424,stroke-width:2px,color:#1a1a1a
    style E fill:#fff,stroke:#FF2424,stroke-width:2px,color:#1a1a1a
    style F fill:#FF2424,stroke:#FF2424,stroke-width:3px,color:#ffffff`;

// Chart 2: Business Context Flow
const CHART_BUSINESS = `flowchart LR
    subgraph INPUT["Business Intent"]
        JT[Jira Ticket:\n"Discount > 20% Requires VP Approval"]
    end
    
    subgraph CODE["Developer Code"]
        DC[Code Bypasses\nVP Approval Step]
    end
    
    subgraph JATAKA["Jataka Business Context"]
        JC(("CONTEXT ENGINE\nDetects Violation"))
    end
    
    subgraph RESULT["Outcome"]
        BLK[❌ Deployment BLOCKED]
        RSL[✅ Code Fixed & Approved]
    end
    
    JT --> JC
    DC --> JC
    JC --> BLK
    JC --> RSL
    
    style JC fill:#FF2424,stroke:#FF2424,stroke-width:4px,color:#ffffff
    style JT fill:#fff,stroke:#1a1a1a,color:#1a1a1a
    style DC fill:#fff,stroke:#FF2424,color:#1a1a1a
    style BLK fill:#FF2424,stroke:#FF2424,color:#ffffff
    style RSL fill:#4ADE80,stroke:#4ADE80,color:#ffffff`;

// Chart 3: Architecture Context (Blast Radius)
const CHART_ARCHITECTURE = `flowchart TD
    subgraph CENTER["Developer Change"]
        CF[Custom Field Modified]
    end
    
    subgraph IMPACT["Blast Radius"]
        F1[❌ Internal Flow 1]
        F2[❌ Internal Flow 2]
        F3[❌ Internal Flow 3]
        AC[❌ Apex Class]
        MS[❌ MuleSoft Integration]
        WD[❌ Workday HR System]
    end
    
    CF --> F1
    CF --> F2
    CF --> F3
    CF --> AC
    CF --> MS
    CF --> WD
    
    style CF fill:#FF2424,stroke:#FF2424,stroke-width:3px,color:#ffffff
    style F1 fill:#fff,stroke:#FF2424,color:#1a1a1a
    style F2 fill:#fff,stroke:#FF2424,color:#1a1a1a
    style F3 fill:#fff,stroke:#FF2424,color:#1a1a1a
    style AC fill:#fff,stroke:#FF2424,color:#1a1a1a
    style MS fill:#fff,stroke:#FF2424,color:#1a1a1a
    style WD fill:#fff,stroke:#FF2424,color:#1a1a1a`;

// Chart 4: Runtime Context (Simulation)
const CHART_RUNTIME = `flowchart LR
    subgraph INPUT["Developer Code"]
        DC[New Code with\nQuery in Loop]
    end
    
    subgraph ENGINE["Jataka Simulation Engine"]
        SE(("STRESS TEST\n50,000 Synthetic Records"))
    end
    
    subgraph OUTCOMES["Results"]
        CRASH[❌ Governor Limit Crash]
        SURVIVE[✅ Survives Stress Test]
    end
    
    DC --> SE
    SE --> CRASH
    SE --> SURVIVE
    
    style SE fill:#FF2424,stroke:#FF2424,stroke-width:4px,color:#ffffff
    style DC fill:#fff,stroke:#1a1a1a,color:#1a1a1a
    style CRASH fill:#FF2424,stroke:#FF2424,color:#ffffff
    style SURVIVE fill:#4ADE80,stroke:#4ADE80,color:#ffffff`;

function MermaidBlock({ chart }: { chart: string }) {
  return (
    <div className="bg-white border border-[#1a1a1a]/10 rounded-[12px] p-[20px] md:p-[32px] my-[24px] overflow-x-auto shadow-sm">
      <pre className="mermaid flex justify-center text-[13.5px] font-sans">{chart}</pre>
    </div>
  );
}

// ------------------------------------------------------------------
// Page Component
// ------------------------------------------------------------------
export default function BriefStoryPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).mermaid) {
      (window as any).mermaid.initialize({
        startOnLoad: true,
        theme: "base",
        themeVariables: {
          primaryColor: "#FFFFFF",
          primaryTextColor: "#1a1a1a",
          primaryBorderColor: "#FF2424",
          lineColor: "#1a1a1a",
          secondaryColor: "#FAF8F3",
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "14px",
        },
        flowchart: { htmlLabels: true, curve: "basis", padding: 20 },
      });
      (window as any).mermaid.run();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a] font-sans">
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="beforeInteractive"
      />

      {/* ================= HERO SECTION ================= */}
      <section className="pt-[80px] pb-[60px] px-[24px] md:px-[48px] border-b border-[#1a1a1a]/8">
        <div className="max-w-[900px] mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-[8px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[16px] py-[6px] mb-[24px] text-[11px] font-bold uppercase tracking-[2px] text-[#FF2424] rounded-[4px]">
              <Lock className="w-[12px] h-[12px]" />
              Private Executive Data Room
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-archivo text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-1.5px] uppercase mb-[24px]">
              The Multi-Million Dollar Problem <br />
              <span className="text-[#FF2424]">And The Solution</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[18px] leading-[1.6] text-[#444] max-w-[700px] mx-auto">
              Enterprise systems are like a massive game of Jenga. One wrong move and the entire structure collapses. 
              Jataka is the Context Box that gives developers and AI agents the enterprise brain they need to build safely.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= PART 1: THE PROBLEM ================= */}
      <section className="py-[70px] px-[24px] md:px-[48px] max-w-[1000px] mx-auto">
        <Reveal>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#FF2424] mb-[12px]">
            Part 1 / The Multi-Million Dollar Problem
          </p>
          <h2 className="font-archivo text-[32px] md:text-[40px] leading-[1.1] tracking-[-1px] uppercase mb-[24px]">
            Building Blind in a Vacuum
          </h2>
          <div className="text-[16px] leading-[1.8] text-[#444] space-y-[20px] max-w-[800px]">
            <p>
              "Right now, your developers and AI coding agents are building blind. They look at a single piece of code in a vacuum. 
              But enterprise systems are like a massive game of Jenga."
            </p>
            <p>
              "If a developer changes a simple 'Lead Status' dropdown menu, they don't realize that field is secretly wired to an SAP billing integration, 
              a marketing flow, and a VP's dashboard. They push the code, the integration breaks silently, and business stops."
            </p>
            <p className="font-semibold text-[#1a1a1a]">
              "The problem isn't how fast we write code; the problem is that we lack the context of how the enterprise is wired."
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <MermaidBlock chart={CHART_PROBLEM} />
        </Reveal>
      </section>

      {/* ================= PART 2: THE SOLUTION ================= */}
      <section className="py-[70px] px-[24px] md:px-[48px] bg-white border-y border-[#1a1a1a]/8">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#FF2424] mb-[12px]">
              Part 2 / The Solution
            </p>
            <h2 className="font-archivo text-[32px] md:text-[40px] leading-[1.1] tracking-[-1px] uppercase mb-[24px]">
              The Jataka Context Box
            </h2>
            <div className="text-[16px] leading-[1.8] text-[#444] space-y-[20px] max-w-[800px] mb-[40px]">
              <p>
                "To solve this, we don't need another testing tool. We need a 'Brain.'"
              </p>
              <p>
                "Jataka connects to Jira, GitHub, and Salesforce to build a complete, real-time map of your enterprise. 
                We divide this brain into three distinct pillars of context: Business Context, Architecture Context, and Runtime Context."
              </p>
              <p className="font-semibold text-[#1a1a1a]">
                "Before any code is allowed to go live, Jataka runs it through all three."
              </p>
            </div>
          </Reveal>

          {/* The 3 Contexts Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[60px]">
            <Reveal delay={100}>
              <div className="bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[12px] p-[28px] h-full">
                <div className="inline-flex w-[48px] h-[48px] bg-blue-100 text-blue-600 rounded-[10px] items-center justify-center mb-[16px]">
                  <Briefcase className="w-[24px] h-[24px]" />
                </div>
                <h3 className="font-archivo text-[20px] font-semibold uppercase mb-[8px]">Business Context</h3>
                <p className="text-[12px] font-mono text-[#666] uppercase tracking-[1px] mb-[12px]">The "Why" and The Rules</p>
                <p className="text-[14.5px] leading-[1.6] text-[#444]">
                  Reads Jira tickets to know your company's actual business rules.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[12px] p-[28px] h-full">
                <div className="inline-flex w-[48px] h-[48px] bg-purple-100 text-purple-600 rounded-[10px] items-center justify-center mb-[16px]">
                  <Network className="w-[24px] h-[24px]" />
                </div>
                <h3 className="font-archivo text-[20px] font-semibold uppercase mb-[8px]">Architecture Context</h3>
                <p className="text-[12px] font-mono text-[#666] uppercase tracking-[1px] mb-[12px]">The "Blast Radius"</p>
                <p className="text-[14.5px] leading-[1.6] text-[#444]">
                  Maps every wire, dependency, and external system in your enterprise.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[12px] p-[28px] h-full">
                <div className="inline-flex w-[48px] h-[48px] bg-green-100 text-green-600 rounded-[10px] items-center justify-center mb-[16px]">
                  <Activity className="w-[24px] h-[24px]" />
                </div>
                <h3 className="font-archivo text-[20px] font-semibold uppercase mb-[8px]">Runtime Context</h3>
                <p className="text-[12px] font-mono text-[#666] uppercase tracking-[1px] mb-[12px]">The "Physics of Scale"</p>
                <p className="text-[14.5px] leading-[1.6] text-[#444]">
                  Simulates live Production data volumes to understand scale physics.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= DEEP DIVE 1: BUSINESS CONTEXT ================= */}
      <section className="py-[70px] px-[24px] md:px-[48px] max-w-[1000px] mx-auto">
        <Reveal>
          <div className="inline-flex items-center gap-[8px] bg-blue-100 text-blue-700 px-[12px] py-[4px] rounded-[4px] text-[11px] font-bold uppercase tracking-[1px] mb-[16px]">
            <Briefcase className="w-[14px] h-[14px]" />
            Deep Dive 1
          </div>
          <h2 className="font-archivo text-[32px] md:text-[40px] leading-[1.1] tracking-[-1px] uppercase mb-[24px]">
            Business Context
          </h2>
          <p className="text-[12px] font-mono text-[#666] uppercase tracking-[1px] mb-[16px]">The "Why" and The Rules</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-white border border-[#1a1a1a]/10 rounded-[12px] p-[32px] mb-[32px]">
            <p className="text-[16px] leading-[1.8] text-[#444] italic mb-[16px]">
              "A line of code can be technically perfect, but completely wrong for the business. Business Context reads your Jira tickets 
              and knows the actual rules of your company—for example, 'Any discount over 20% requires VP approval.'"
            </p>
            <p className="text-[15px] leading-[1.7] text-[#444]">
              <strong>What the Diagram shows:</strong> A flowchart showing a Jira ticket feeding "Business Intent" into Jataka. 
              On the other side, Jataka catches a piece of code that accidentally bypasses the VP approval step and blocks it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <MermaidBlock chart={CHART_BUSINESS} />
        </Reveal>

        <Reveal delay={200}>
          <h3 className="font-archivo text-[24px] uppercase mb-[20px]">The Use Cases</h3>
          <div className="space-y-[24px]">
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[12px] p-[28px]">
              <h4 className="font-archivo text-[20px] uppercase mb-[12px] text-[#1a1a1a]">Business Logic Enforcement</h4>
              <p className="text-[15px] leading-[1.7] text-[#444]">
                Jataka mathematically proves that the code actually does what the Jira ticket asked for, stopping rogue logic before it deploys.
              </p>
            </div>
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[12px] p-[28px]">
              <h4 className="font-archivo text-[20px] uppercase mb-[12px] text-[#1a1a1a]">Self-Healing QA</h4>
              <p className="text-[15px] leading-[1.7] text-[#444]">
                Because Jataka knows the intent of a test (e.g., "Click the checkout button"), when Salesforce updates their UI and changes 
                the button's color or location, Jataka's Vision AI uses business context to visually find the new button and fix the test automatically.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= DEEP DIVE 2: ARCHITECTURE CONTEXT ================= */}
      <section className="py-[70px] px-[24px] md:px-[48px] bg-white border-y border-[#1a1a1a]/8">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-[8px] bg-purple-100 text-purple-700 px-[12px] py-[4px] rounded-[4px] text-[11px] font-bold uppercase tracking-[1px] mb-[16px]">
              <Network className="w-[14px] h-[14px]" />
              Deep Dive 2
            </div>
            <h2 className="font-archivo text-[32px] md:text-[40px] leading-[1.1] tracking-[-1px] uppercase mb-[24px]">
              Architecture Context
            </h2>
            <p className="text-[12px] font-mono text-[#666] uppercase tracking-[1px] mb-[16px]">The "Blast Radius"</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[12px] p-[32px] mb-[32px]">
              <p className="text-[16px] leading-[1.8] text-[#444] italic mb-[16px]">
                "You can't safely demolish a wall in a skyscraper unless you know if it's load-bearing. Architecture Context maps every single wire, 
                dependency, and external system in your enterprise."
              </p>
              <p className="text-[15px] leading-[1.7] text-[#444]">
                <strong>What the Diagram shows:</strong> A visual web. In the center is one custom field being changed by a developer. 
                Red lines shoot out from it, showing exactly what it will break: 3 internal Flows, 1 Apex Class, and the external MuleSoft/Workday integration.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <MermaidBlock chart={CHART_ARCHITECTURE} />
          </Reveal>

          <Reveal delay={200}>
            <h3 className="font-archivo text-[24px] uppercase mb-[20px]">The Use Cases</h3>
            <div className="space-y-[24px]">
              <div className="bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[12px] p-[28px]">
                <h4 className="font-archivo text-[20px] uppercase mb-[12px] text-[#1a1a1a]">API Contract Guardian</h4>
                <p className="text-[15px] leading-[1.7] text-[#444]">
                  If a developer tries to delete or rename a field that an external system (like SAP) relies on, Jataka instantly blocks it and alerts 
                  the integration team. Zero broken APIs.
                </p>
              </div>
              <div className="bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[12px] p-[28px]">
                <h4 className="font-archivo text-[20px] uppercase mb-[12px] text-[#1a1a1a]">M&A Org Mergers</h4>
                <p className="text-[15px] leading-[1.7] text-[#444]">
                  When you acquire a company, comparing their Salesforce system to yours takes consultants a year. Architecture Context mathematically 
                  compares both systems and prints a conflict-and-overlap map in days.
                </p>
              </div>
              <div className="bg-[#FAF8F3] border border-[#1a1a1a]/10 rounded-[12px] p-[28px]">
                <h4 className="font-archivo text-[20px] uppercase mb-[12px] text-[#1a1a1a]">Tech Debt Prevention</h4>
                <p className="text-[15px] leading-[1.7] text-[#444]">
                  It stops developers from creating duplicate fields by instantly cross-referencing the entire org to see if a similar field already exists.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= DEEP DIVE 3: RUNTIME CONTEXT ================= */}
      <section className="py-[70px] px-[24px] md:px-[48px] max-w-[1000px] mx-auto">
        <Reveal>
          <div className="inline-flex items-center gap-[8px] bg-green-100 text-green-700 px-[12px] py-[4px] rounded-[4px] text-[11px] font-bold uppercase tracking-[1px] mb-[16px]">
            <Activity className="w-[14px] h-[14px]" />
            Deep Dive 3
          </div>
          <h2 className="font-archivo text-[32px] md:text-[40px] leading-[1.1] tracking-[-1px] uppercase mb-[24px]">
            Runtime Context
          </h2>
          <p className="text-[12px] font-mono text-[#666] uppercase tracking-[1px] mb-[16px]">The "Physics of Scale"</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-white border border-[#1a1a1a]/10 rounded-[12px] p-[32px] mb-[32px]">
            <p className="text-[16px] leading-[1.8] text-[#444] italic mb-[16px]">
              "Code that works perfectly for 10 customers will often crash and burn when 100,000 customers log in on Black Friday. 
              Runtime Context looks at your actual, live Production data volumes to understand the 'physics' of your business."
            </p>
            <p className="text-[15px] leading-[1.7] text-[#444]">
              <strong>What the Diagram shows:</strong> A simulation engine. It shows a developer's code entering the engine, being injected with 
              50,000 synthetic records based on live production shapes, and either surviving the stress test or hitting a "Governor Limit Crash."
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <MermaidBlock chart={CHART_RUNTIME} />
        </Reveal>

        <Reveal delay={200}>
          <h3 className="font-archivo text-[24px] uppercase mb-[20px]">The Use Cases</h3>
          <div className="space-y-[24px]">
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[12px] p-[28px]">
              <h4 className="font-archivo text-[20px] uppercase mb-[12px] text-[#1a1a1a]">The Limit Firewall</h4>
              <p className="text-[15px] leading-[1.7] text-[#444]">
                Salesforce has hard limits (Governor Limits). Jataka simulates the data load on every piece of code. If a developer accidentally 
                puts a database query inside a loop that will crash the system at scale, Jataka blocks it.
              </p>
            </div>
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[12px] p-[28px]">
              <h4 className="font-archivo text-[20px] uppercase mb-[12px] text-[#1a1a1a]">Data Skew Detection</h4>
              <p className="text-[15px] leading-[1.7] text-[#444]">
                It identifies if new code will cause database traffic jams (row locks) based on how your company's data is actually distributed.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= PART 3: THE GRAND FINALE ================= */}
      <section className="py-[70px] px-[24px] md:px-[48px] bg-[#0B0B0B] text-white">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#FF2424] mb-[12px]">
              Part 3 / The Grand Finale
            </p>
            <h2 className="font-archivo text-[32px] md:text-[40px] leading-[1.1] tracking-[-1px] uppercase mb-[24px]">
              The Impact of Jataka
            </h2>
            <div className="text-[16px] leading-[1.8] text-[#aaa] space-y-[20px] max-w-[800px] mb-[40px]">
              <p className="italic">
                "When you govern your enterprise with these three Contexts, you transform your IT department. 
                Jataka delivers impact in two ways: The Shield (Protection) and The Sword (Velocity)."
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
            {/* THE SHIELD */}
            <Reveal delay={100}>
              <div className="bg-[#151515] border border-white/10 rounded-[16px] p-[36px] h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Shield size={120} />
                </div>
                <div className="inline-flex w-[56px] h-[56px] bg-red-500/10 text-[#FF2424] rounded-[12px] items-center justify-center mb-[20px]">
                  <Shield className="w-[28px] h-[28px]" />
                </div>
                <h3 className="font-archivo text-[28px] uppercase tracking-[-0.5px] mb-[12px]">
                  🛡️ The Shield
                </h3>
                <p className="text-[15px] text-[#aaa] mb-[32px]">Risk Mitigation & Cost Reduction.</p>
                
                <div className="space-y-[20px]">
                  <div className="flex items-start gap-[12px]">
                    <CheckCircle2 className="w-[20px] h-[20px] text-[#FF2424] mt-[2px] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-[4px]">Zero Production Crashes</p>
                      <p className="text-[13px] text-[#888]">Because of the Runtime Context, governor limit outages are eliminated.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <CheckCircle2 className="w-[20px] h-[20px] text-[#FF2424] mt-[2px] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-[4px]">Zero Broken Integrations</p>
                      <p className="text-[13px] text-[#888]">Because of the Architecture Context, accidental ERP/API breakages drop to zero.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <CheckCircle2 className="w-[20px] h-[20px] text-[#FF2424] mt-[2px] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-[4px]">80% Drop in QA Costs</p>
                      <p className="text-[13px] text-[#888]">Because of the Business Context, your UI tests heal themselves, meaning you can stop paying armies of manual testers to fix broken test scripts every month.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* THE SWORD */}
            <Reveal delay={200}>
              <div className="bg-[#151515] border border-white/10 rounded-[16px] p-[36px] h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Swords size={120} />
                </div>
                <div className="inline-flex w-[56px] h-[56px] bg-green-500/10 text-[#4ADE80] rounded-[12px] items-center justify-center mb-[20px]">
                  <TrendingUp className="w-[28px] h-[28px]" />
                </div>
                <h3 className="font-archivo text-[28px] uppercase tracking-[-0.5px] mb-[12px]">
                  ⚔️ The Sword
                </h3>
                <p className="text-[15px] text-[#aaa] mb-[32px]">Velocity & Growth.</p>
                
                <div className="space-y-[20px]">
                  <div className="flex items-start gap-[12px]">
                    <Zap className="w-[20px] h-[20px] text-[#4ADE80] mt-[2px] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-[4px]">Superhuman Speed</p>
                      <p className="text-[13px] text-[#888]">Developers no longer wait days for manual code reviews. The Context Engine gives them their blast radius in 3 seconds.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <Zap className="w-[20px] h-[20px] text-[#4ADE80] mt-[2px] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-[4px]">Consulting Cost Slashed</p>
                      <p className="text-[13px] text-[#888]">M&A due diligence and security audits go from taking 6 months to taking 3 days.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <Zap className="w-[20px] h-[20px] text-[#4ADE80] mt-[2px] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-[4px]">10x Architect Scalability</p>
                      <p className="text-[13px] text-[#888]">One Senior Architect can now safely oversee 50 junior developers or AI agents, because Jataka is automatically enforcing the rules 24/7.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="py-[80px] px-[24px] md:px-[48px] bg-white border-t border-[#1a1a1a]/10 text-center">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <Zap className="w-[32px] h-[32px] text-[#FF2424] mx-auto mb-[20px]" />
            <h2 className="font-archivo text-[32px] md:text-[44px] leading-[1.1] tracking-[-1px] uppercase mb-[24px]">
              Ready to govern your enterprise?
            </h2>
            <p className="text-[18px] leading-[1.6] text-[#444] mb-[40px]">
              "Every single line of code we deploy is governed by a Context Engine that mathematically guarantees your business operations will never break."
              <br/><br/>
              <span className="text-[14px] font-mono uppercase tracking-[1px] text-[#888]">— Your pitch to the Board of Directors.</span>
            </p>
            
            <button className="bg-[#FF2424] text-white px-[32px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[6px] hover:bg-[#d91f1f] transition-all flex items-center justify-center gap-[10px] mx-auto shadow-lg hover:shadow-xl hover:-translate-y-1">
              Start the Executive Pilot
              <ArrowRight className="w-[16px] h-[16px]" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-[30px] border-t border-[#1a1a1a]/10 text-center text-[12px] text-[#888] bg-[#FAF8F3]">
        <p>Jataka Context Engine &copy; 2026. Confidential VIP Briefing.</p>
      </footer>
    </div>
  );
}
