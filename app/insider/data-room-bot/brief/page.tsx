"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { MarketingShell } from "../../../components/marketing";
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

// Chart 1: The Problem (The Butterfly Effect)
const CHART_PROBLEM = `flowchart TD
    A[Developer or AI Agent\nChanges one small field] --> B{Builds in a Vacuum\nNo Enterprise Context}
    B -->|Silent Breakage| C[Salesforce Process Fails]
    B -->|Silent Breakage| D[SAP Billing Integration Fails]
    B -->|Silent Breakage| E[System Crashes at Scale]
    
    style A fill:#1a1a1a,stroke:#1a1a1a,stroke-width:2px,color:#ffffff
    style B fill:#2563EB,stroke:#2563EB,stroke-width:2px,color:#ffffff
    style C fill:#fff,stroke:#2563EB,stroke-width:2px,color:#1a1a1a
    style D fill:#fff,stroke:#2563EB,stroke-width:2px,color:#1a1a1a
    style E fill:#fff,stroke:#2563EB,stroke-width:2px,color:#1a1a1a`;

// Chart 2: The Solution (Context Engine)
const CHART_SOLUTION = `flowchart LR
    subgraph INPUTS["The DNA of Your Business"]
        J["Jira\n(Business Rules)"]
        G["GitHub\n(Code Wiring)"]
        S["Salesforce\n(Live Data Scale)"]
    end

    subgraph BRAIN["Jataka Context Engine"]
        CE(("THE OMNISCIENT\nBRAIN"))
    end

    subgraph OUTPUTS["Mathematically Guaranteed Outcomes"]
        O1["Zero Production Crashes"]
        O2["Unbroken Integrations"]
        O3["Protected Revenue"]
    end

    J --> CE
    G --> CE
    S --> CE
    CE --> O1
    CE --> O2
    CE --> O3

    style CE fill:#2563EB,stroke:#2563EB,stroke-width:4px,color:#ffffff
    style J fill:#fff,stroke:#1a1a1a,color:#1a1a1a
    style G fill:#fff,stroke:#1a1a1a,color:#1a1a1a
    style S fill:#fff,stroke:#1a1a1a,color:#1a1a1a`;

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
export default function VIPBriefingPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).mermaid) {
      (window as any).mermaid.initialize({
        startOnLoad: true,
        theme: "base",
        themeVariables: {
          primaryColor: "#FFFFFF",
          primaryTextColor: "#1a1a1a",
          primaryBorderColor: "#2563EB",
          lineColor: "#1a1a1a",
          secondaryColor: "#F3F3F4",
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "14px",
        },
        flowchart: { htmlLabels: true, curve: "basis", padding: 20 },
      });
      (window as any).mermaid.run();
    }
  },[]);

  return (
    <MarketingShell>
    <div className="min-h-screen bg-[#F3F3F4] text-[#1a1a1a] font-sans">
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="beforeInteractive"
      />

      {/* ================= HERO SECTION ================= */}
      <section className="pt-[80px] pb-[60px] px-[24px] md:px-[48px] border-b border-[#1a1a1a]/8">
        <div className="max-w-[900px] mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-[8px] bg-[#2563EB]/10 border border-[#2563EB]/20 px-[16px] py-[6px] mb-[24px] text-[11px] font-bold uppercase tracking-[2px] text-[#2563EB] rounded-[4px]">
              <Lock className="w-[12px] h-[12px]" />
              Private Executive Data Room
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-semibold tracking-tight text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-1.5px] uppercase mb-[24px]">
              The era of generating code is over. <br />
              <span className="text-[#2563EB]">The era of governing it is here.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[18px] leading-[1.6] text-[#444] max-w-[700px] mx-auto">
              AI makes developers faster. But moving fast without business context is dangerous. 
              Jataka is the Omniscient Brain that sits over your enterprise, guaranteeing that no developer—human or AI—ever deploys code that crashes your revenue systems.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= 1. THE PROBLEM ================= */}
      <section className="py-[70px] px-[24px] md:px-[48px] max-w-[1000px] mx-auto">
        <Reveal>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#2563EB] mb-[12px]">
            01 / The Problem
          </p>
          <h2 className="font-semibold tracking-tight text-[32px] md:text-[40px] leading-[1.1] tracking-[-1px] uppercase mb-[20px]">
            The Butterfly Effect in Enterprise IT
          </h2>
          <p className="text-[16px] leading-[1.7] text-[#444] mb-[30px] max-w-[800px]">
            Salesforce is the revenue backbone of your company. It connects to billing, HR, and fulfillment. 
            Right now, developers write code looking at a single file—they build in a vacuum. 
            <br/><br/>
            When a developer modifies a simple dropdown menu, they don't know it connects to SAP. 
            They deploy the code, the integration breaks silently, and millions of dollars are stalled. 
            We call this <strong>The Butterfly Effect</strong>.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <MermaidBlock chart={CHART_PROBLEM} />
        </Reveal>
      </section>

      {/* ================= 2. THE SOLUTION (CONTEXT ENGINE) ================= */}
      <section className="py-[70px] px-[24px] md:px-[48px] bg-white border-y border-[#1a1a1a]/8">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#2563EB] mb-[12px]">
              02 / The Solution
            </p>
            <h2 className="font-semibold tracking-tight text-[32px] md:text-[40px] leading-[1.1] tracking-[-1px] uppercase mb-[20px]">
              The Omniscient Brain
            </h2>
            <p className="text-[16px] leading-[1.7] text-[#444] mb-[40px] max-w-[800px]">
              To stop system crashes, you don't need another testing tool. You need a Brain. 
              Jataka connects to your three most important platforms (Jira, GitHub, and Salesforce) 
              to learn the entire DNA of your enterprise. It triangulates three types of context:
            </p>
          </Reveal>

          {/* The 3 Contexts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[40px]">
            {/* Context 1 */}
            <Reveal delay={100}>
              <div className="bg-[#F3F3F4] border border-[#1a1a1a]/10 rounded-[12px] p-[28px] h-full">
                <div className="inline-flex w-[48px] h-[48px] bg-blue-100 text-blue-600 rounded-[10px] items-center justify-center mb-[16px]">
                  <Briefcase className="w-[24px] h-[24px]" />
                </div>
                <h3 className="font-semibold tracking-tight text-[20px] font-semibold uppercase mb-[8px]">1. Business Context</h3>
                <p className="text-[12px] font-mono text-[#666] uppercase tracking-[1px] mb-[12px]">Source: Jira Boards</p>
                <p className="text-[14.5px] leading-[1.6] text-[#444]">
                  <strong>What it knows:</strong> The actual business rules. It knows that an order over $10k requires VP approval. If a developer's code accidentally bypasses that rule, Jataka stops it.
                </p>
              </div>
            </Reveal>

            {/* Context 2 */}
            <Reveal delay={200}>
              <div className="bg-[#F3F3F4] border border-[#1a1a1a]/10 rounded-[12px] p-[28px] h-full">
                <div className="inline-flex w-[48px] h-[48px] bg-purple-100 text-purple-600 rounded-[10px] items-center justify-center mb-[16px]">
                  <Network className="w-[24px] h-[24px]" />
                </div>
                <h3 className="font-semibold tracking-tight text-[20px] font-semibold uppercase mb-[8px]">2. Architecture Context</h3>
                <p className="text-[12px] font-mono text-[#666] uppercase tracking-[1px] mb-[12px]">Source: GitHub</p>
                <p className="text-[14.5px] leading-[1.6] text-[#444]">
                  <strong>What it knows:</strong> The Blast Radius. It maps every wire in the company. It knows that deleting a specific Salesforce field will crash your external Workday HR system.
                </p>
              </div>
            </Reveal>

            {/* Context 3 */}
            <Reveal delay={300}>
              <div className="bg-[#F3F3F4] border border-[#1a1a1a]/10 rounded-[12px] p-[28px] h-full">
                <div className="inline-flex w-[48px] h-[48px] bg-green-100 text-green-600 rounded-[10px] items-center justify-center mb-[16px]">
                  <Activity className="w-[24px] h-[24px]" />
                </div>
                <h3 className="font-semibold tracking-tight text-[20px] font-semibold uppercase mb-[8px]">3. Runtime Context</h3>
                <p className="text-[12px] font-mono text-[#666] uppercase tracking-[1px] mb-[12px]">Source: Salesforce</p>
                <p className="text-[14.5px] leading-[1.6] text-[#444]">
                  <strong>What it knows:</strong> The Physics of Scale. It simulates Black Friday traffic levels on new code to mathematically prove it won't crash when millions of users log in.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={400}>
            <MermaidBlock chart={CHART_SOLUTION} />
          </Reveal>
        </div>
      </section>

      {/* ================= 3. APPLICATIONS & USE CASES ================= */}
      <section className="py-[70px] px-[24px] md:px-[48px] max-w-[1000px] mx-auto">
        <Reveal>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#2563EB] mb-[12px]">
            03 / Enterprise Applications
          </p>
          <h2 className="font-semibold tracking-tight text-[32px] md:text-[40px] leading-[1.1] tracking-[-1px] uppercase mb-[20px]">
            What Does The Brain Actually Do?
          </h2>
          <p className="text-[16px] leading-[1.7] text-[#444] mb-[40px]">
            Because Jataka understands your business entirely, it acts as an automated Chief Architect. 
            Here is how it protects your company on a daily basis:
          </p>
        </Reveal>

        <div className="space-y-[24px]">
          {/* App 1 */}
          <Reveal delay={100}>
            <div className="flex flex-col md:flex-row gap-[24px] bg-white border border-[#1a1a1a]/10 p-[32px] rounded-[16px] shadow-sm">
              <div className="md:w-1/3">
                <div className="inline-flex items-center gap-[8px] bg-green-100 text-green-700 px-[12px] py-[4px] rounded-[4px] text-[11px] font-bold uppercase tracking-[1px] mb-[12px]">
                  Powered by Runtime Context
                </div>
                <h3 className="font-semibold tracking-tight text-[24px] uppercase leading-[1.1] mb-[12px]">The Outage Firewall</h3>
              </div>
              <div className="md:w-2/3 border-l-0 md:border-l border-[#1a1a1a]/10 md:pl-[24px]">
                <p className="text-[15px] leading-[1.6] text-[#444]">
                  <strong>The Scenario:</strong> A developer writes code that works perfectly for 10 records, but fails when processing 10,000 records.
                  <br/><br/>
                  <strong>The Jataka Fix:</strong> Before the code is even allowed to merge, Jataka stress-tests it using real-world data volumes. It mathematically guarantees the code will survive peak business hours. Outages drop to zero.
                </p>
              </div>
            </div>
          </Reveal>

          {/* App 2 */}
          <Reveal delay={200}>
            <div className="flex flex-col md:flex-row gap-[24px] bg-white border border-[#1a1a1a]/10 p-[32px] rounded-[16px] shadow-sm">
              <div className="md:w-1/3">
                <div className="inline-flex items-center gap-[8px] bg-purple-100 text-purple-700 px-[12px] py-[4px] rounded-[4px] text-[11px] font-bold uppercase tracking-[1px] mb-[12px]">
                  Powered by Architecture Context
                </div>
                <h3 className="font-semibold tracking-tight text-[24px] uppercase leading-[1.1] mb-[12px]">Integration Guardian</h3>
              </div>
              <div className="md:w-2/3 border-l-0 md:border-l border-[#1a1a1a]/10 md:pl-[24px]">
                <p className="text-[15px] leading-[1.6] text-[#444]">
                  <strong>The Scenario:</strong> A team updates Salesforce, accidentally breaking the API connection to SAP. Invoices stop sending.
                  <br/><br/>
                  <strong>The Jataka Fix:</strong> Jataka monitors every external system connection. If a developer tries to alter a piece of data that SAP relies on, Jataka automatically blocks the deployment and alerts the SAP team.
                </p>
              </div>
            </div>
          </Reveal>

          {/* App 3 */}
          <Reveal delay={300}>
            <div className="flex flex-col md:flex-row gap-[24px] bg-white border border-[#1a1a1a]/10 p-[32px] rounded-[16px] shadow-sm">
              <div className="md:w-1/3">
                <div className="inline-flex items-center gap-[8px] bg-[#1a1a1a] text-white px-[12px] py-[4px] rounded-[4px] text-[11px] font-bold uppercase tracking-[1px] mb-[12px]">
                  Powered by All Contexts
                </div>
                <h3 className="font-semibold tracking-tight text-[24px] uppercase leading-[1.1] mb-[12px]">M&A System Merger</h3>
              </div>
              <div className="md:w-2/3 border-l-0 md:border-l border-[#1a1a1a]/10 md:pl-[24px]">
                <p className="text-[15px] leading-[1.6] text-[#444]">
                  <strong>The Scenario:</strong> You acquire a company. Figuring out how to merge their Salesforce with yours usually takes consultants 12 months and $5 Million.
                  <br/><br/>
                  <strong>The Jataka Fix:</strong> Jataka scans both companies' systems mathematically, compares them, and prints a complete conflict and overlap report in <strong>days, not months</strong>.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 4. THE SHIELD & THE SWORD (IMPACT) ================= */}
      <section className="py-[80px] px-[24px] md:px-[48px] bg-[#0B0B0B] text-white">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#2563EB] mb-[12px]">
              04 / Business Impact
            </p>
            <h2 className="font-semibold tracking-tight text-[32px] md:text-[48px] leading-[1.1] tracking-[-1px] uppercase mb-[20px]">
              The Shield & The Sword
            </h2>
            <p className="text-[16.5px] leading-[1.6] text-[#aaa] mb-[60px] max-w-[700px]">
              For an executive, technology is only valuable if it mitigates risk or creates wealth. 
              Jataka delivers on both fronts simultaneously.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
            {/* THE SHIELD */}
            <Reveal delay={100}>
              <div className="bg-[#151515] border border-white/10 rounded-[16px] p-[36px] h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Shield size={120} />
                </div>
                <div className="inline-flex w-[56px] h-[56px] bg-red-500/10 text-[#2563EB] rounded-[12px] items-center justify-center mb-[20px]">
                  <Shield className="w-[28px] h-[28px]" />
                </div>
                <h3 className="font-semibold tracking-tight text-[28px] uppercase tracking-[-0.5px] mb-[12px]">
                  The Shield
                </h3>
                <p className="text-[15px] text-[#aaa] mb-[32px]">Absolute Risk Mitigation & Cost Reduction.</p>
                
                <div className="space-y-[24px]">
                  <div>
                    <p className="font-semibold tracking-tight text-[40px] leading-[1] text-white mb-[4px]">0</p>
                    <p className="font-mono text-[12px] uppercase text-[#2563EB] tracking-[1px] mb-[4px]">Production Crashes</p>
                    <p className="text-[14px] text-[#888]">We mathematically prevent code from breaking your system limits.</p>
                  </div>
                  <div className="h-[1px] bg-white/10 w-full"></div>
                  <div>
                    <p className="font-semibold tracking-tight text-[40px] leading-[1] text-white mb-[4px]">-80%</p>
                    <p className="font-mono text-[12px] uppercase text-[#2563EB] tracking-[1px] mb-[4px]">QA & Testing Costs</p>
                    <p className="text-[14px] text-[#888]">Tests self-heal using AI, retiring expensive manual testing armies.</p>
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
                <h3 className="font-semibold tracking-tight text-[28px] uppercase tracking-[-0.5px] mb-[12px]">
                  The Sword
                </h3>
                <p className="text-[15px] text-[#aaa] mb-[32px]">Superhuman Velocity & Scaling.</p>
                
                <div className="space-y-[24px]">
                  <div>
                    <p className="font-semibold tracking-tight text-[40px] leading-[1] text-white mb-[4px]">+40%</p>
                    <p className="font-mono text-[12px] uppercase text-[#4ADE80] tracking-[1px] mb-[4px]">Faster Time-to-Market</p>
                    <p className="text-[14px] text-[#888]">Developers don't wait for manual reviews. Context is instant.</p>
                  </div>
                  <div className="h-[1px] bg-white/10 w-full"></div>
                  <div>
                    <p className="font-semibold tracking-tight text-[40px] leading-[1] text-white mb-[4px]">10x</p>
                    <p className="font-mono text-[12px] uppercase text-[#4ADE80] tracking-[1px] mb-[4px]">Team Scalability</p>
                    <p className="text-[14px] text-[#888]">One Senior Architect can safely oversee 50 AI agents or junior developers safely.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= 5. CLOSING / NEXT STEPS ================= */}
      <section className="py-[80px] px-[24px] md:px-[48px] bg-white border-t border-[#1a1a1a]/10 text-center">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <Zap className="w-[32px] h-[32px] text-[#2563EB] mx-auto mb-[20px]" />
            <h2 className="font-semibold tracking-tight text-[32px] md:text-[44px] leading-[1.1] tracking-[-1px] uppercase mb-[24px]">
              Ready to secure your enterprise?
            </h2>
            <p className="text-[18px] leading-[1.6] text-[#444] mb-[40px]">
              "Every single line of code we deploy is governed by a Context Engine that mathematically guarantees your business operations will never break."
              <br/><br/>
              <span className="text-[14px] font-mono uppercase tracking-[1px] text-[#888]">— Your pitch to the Board of Directors.</span>
            </p>
            
            <button className="bg-[#2563EB] text-white px-[32px] py-[16px] font-semibold tracking-tight text-[14px] uppercase tracking-[1.5px] rounded-[6px] hover:bg-[#1d4ed8] transition-all flex items-center justify-center gap-[10px] mx-auto shadow-lg hover:shadow-xl hover:-translate-y-1">
              Start the Executive Pilot
              <ArrowRight className="w-[16px] h-[16px]" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-[30px] border-t border-[#1a1a1a]/10 text-center text-[12px] text-[#888] bg-[#F3F3F4]">
        <p>Jataka Context Engine &copy; 2026. Confidential VIP Briefing.</p>
      </footer>
    </div>
  
    </MarketingShell>
  );
}