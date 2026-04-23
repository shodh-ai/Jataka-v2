"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Shield,
  Swords,
  Zap,
  Link2,
  Sparkles,
  GitMerge,
  Network,
  ChevronRight,
} from "lucide-react";

// ------------------------------------------------------------------
// Scroll reveal
// ------------------------------------------------------------------
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div ref={ref} className={className} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.55s ease-out, transform 0.55s ease-out",
      transitionDelay: `${delay}ms`,
    }}>{children}</div>
  );
}

// ------------------------------------------------------------------
// Mermaid type
// ------------------------------------------------------------------
interface MermaidGlobal {
  initialize: (config: Record<string, unknown>) => void;
  run: () => void;
}
declare global {
  interface Window { mermaid?: MermaidGlobal; }
}

function MermaidBlock({ chart }: { chart: string }) {
  return (
    <div className="my-[20px] overflow-x-auto rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[20px] md:p-[28px]">
      <pre className="mermaid flex justify-center text-[13px]">{chart}</pre>
    </div>
  );
}

// ------------------------------------------------------------------
// Flowcharts (pulled from platform-audit)
// ------------------------------------------------------------------
const CHART_LIMIT_FIREWALL = `flowchart TD
    PR["PR Submitted\\nDeveloper pushes Apex/Flow changes"]
    PARSE["STEP 1: AST PARSING\\nParse Apex into Abstract Syntax Tree\\nMap every method, loop, DML, SOQL"]
    LOOP["STEP 2: LOOP DETECTION\\nFind SOQL/DML inside loops\\nIncluding indirect method calls"]
    CPU["STEP 3: CPU PROFILING\\nEstimate CPU time for complex paths\\nSync: 10,000ms / Async: 60,000ms"]
    SKEW["STEP 4: DATA SKEW\\nAnalyze DML against org data\\nFlag row-locking patterns"]
    API["STEP 5: API LIMITS\\nCount callouts per transaction\\nLimit: 100 sync / 200 async"]
    REPORT["VIOLATION REPORT\\nFile + line number\\nSeverity + fix suggestion"]
    DECIDE{"CRITICAL\\nVIOLATIONS?"}
    BLOCK["PR BLOCKED"]
    APPROVE["PR APPROVED"]
    CTX{{"JATAKA CONTEXT GRAPH\\nLive Production Data Map\\ne.g., 80,000 Contacts\\n+ Runtime physics"}}

    PR --> PARSE --> LOOP --> CPU --> SKEW --> API --> REPORT --> DECIDE
    DECIDE -->|Yes| BLOCK
    DECIDE -->|No| APPROVE
    CTX -. "Production volumes\\ndrive the simulation" .-> CPU
    CTX -. "Org data distribution\\npowers skew detection" .-> SKEW

    style CTX fill:#FF2424,stroke:#FF2424,stroke-width:2px,color:#ffffff`;

const CHART_QA = `flowchart TD
    TRIGGER["TEST TRIGGERED\\nPR merge, schedule, or on-demand"]
    CTX{{"JATAKA CONTEXT GRAPH\\nJira Acceptance Criteria\\n+ Business intent\\n+ Org schema"}}
    SEED["SMART DATA SEEDING\\nGenerate minimal test records\\nrespecting all field constraints"]
    EXEC["UI TEST EXECUTION\\nHeadless browser runs E2E tests\\nagainst Salesforce UI"]
    HEAL{"SELECTOR\\nBROKEN?"}
    VISION["VISION AI HEALING\\nScreenshot page, find element\\nvisually, update selector"]
    RECORD["VIDEO RECORDING\\nRecord every step for\\naudit evidence"]
    VERIFY["LOGIC VERIFICATION\\nMathematically prove\\nrefactored code equivalence"]
    REPORT["QA REPORT\\nPass/fail, videos,\\ncoverage, proof status"]

    TRIGGER --> CTX
    CTX --> SEED --> EXEC --> HEAL
    HEAL -->|Yes| VISION --> EXEC
    HEAL -->|No| RECORD --> VERIFY --> REPORT
    CTX -. "Business intent\\npowers visual healing" .-> VISION

    style CTX fill:#FF2424,stroke:#FF2424,stroke-width:2px,color:#ffffff`;

const CHART_TECH_DEBT = `flowchart TD
    CHANGE["CHANGE DETECTED\\nNew PR with metadata changes"]
    CTX{{"JATAKA CONTEXT GRAPH\\nEntire org history\\n+ 360-degree\\ndependency map"}}
    DUP["DUPLICATE SCAN\\nCompare new fields vs all\\nexisting org fields"]
    ORPHAN["ORPHAN DISCOVERY\\nDependency graph analysis\\nFind zero-reference metadata"]
    ARCH["ARCHITECTURE CHECK\\nEnforce Flows over Triggers\\nHandler patterns, naming"]
    BULK["BULKIFICATION\\nDetect single-record code\\nAuto-refactor to bulk-safe"]
    CLEAN["CLEANUP GENERATOR\\nGenerate destructiveChanges.xml"]
    SCORE["DEBT SCORE"]
    DECIDE{"ISSUES?"}
    AUTOFIX["AUTO-FIX PR"]
    BLOCK["BLOCKED"]
    PASS["APPROVED"]

    CHANGE --> CTX
    CTX --> DUP
    CTX --> ORPHAN
    CHANGE --> ARCH
    CHANGE --> BULK
    DUP --> SCORE
    ORPHAN --> CLEAN --> SCORE
    ARCH --> SCORE
    BULK --> AUTOFIX
    SCORE --> DECIDE
    DECIDE -->|Auto-fixable| AUTOFIX
    DECIDE -->|Policy violation| BLOCK
    DECIDE -->|Clean| PASS`;

const CHART_PR_REVIEW = `flowchart TD
    subgraph INPUTS["STEP 1 - GATHER CONTEXT"]
        I1["PR Diff\\nChanged Apex, Flows,\\nmetadata XML"]
        I2["Full Org Metadata\\nEvery object, field,\\nflow, class, profile"]
        I3["Linked Jira Ticket\\nAcceptance criteria"]
        I4["Business Rules\\nOrg-specific policies"]
    end

    subgraph ANALYSIS["STEP 2 - ANALYZE"]
        A1["LIMIT FIREWALL\\nSOQL loops, CPU,\\nData skew, API limits"]
        A2["ARCHITECTURE\\nDuplicates, orphans,\\npatterns, best practices"]
        A3["QA ENGINE\\nSelf-healing tests,\\nvideo, verification"]
        A4["INTEGRATION\\nAPI contracts,\\nERP validation"]
    end

    subgraph OUTPUTS["STEP 3 - ACT"]
        O1["APPROVE"]
        O2["BLOCK\\nLine-level report"]
        O3["AUTO-FIX\\nAI commits"]
        O4["AUDIT LOG\\nCompliance record"]
    end

    I1 --> A1
    I1 --> A2
    I2 --> A1
    I2 --> A2
    I3 --> A3
    I4 --> A2
    I2 --> A3
    I2 --> A4
    A1 --> O1
    A1 --> O2
    A2 --> O2
    A2 --> O3
    A3 --> O4
    A4 --> O2`;

const CHART_ENTERPRISE = `flowchart TD
    subgraph MA["M&A ORG MERGE"]
        MA1A{{"ORG A\\nCONTEXT GRAPH"}} --> MA3
        MA1B{{"ORG B\\nCONTEXT GRAPH"}} --> MA3
        MA3["MASTER JATAKA\\nOVERLAP GRAPH\\nmathematical comparison"] --> MA4["Generate Merge Report\\nwith migration plan"]
    end

    subgraph API["API CONTRACT"]
        APCTX{{"JATAKA CONTEXT GRAPH\\nAuto-discovered\\ninbound + outbound\\ndependencies"}} --> AP2["PR modifies contracted field"] --> AP3["Auto-block PR\\nNotify integration owner\\n(SAP / MuleSoft / Workday)"]
    end

    subgraph MON["SYNTHETIC MONITORING"]
        MO1["Define critical paths\\nLead, Opp, Case flows"] --> MO2["Run against PROD\\nevery 15 minutes"] --> MO3["Alert on failure\\nSlack + Jira incident"]
    end

    subgraph MIG["LEGACY MIGRATION"]
        MI1["Scan for Workflow Rules"] --> MI2["Parse conditions + actions"] --> MI3["Generate equivalent Flow"] --> MI4["Create PR with\\nFlow + tests + proof"]
    end

    style APCTX fill:#FF2424,stroke:#FF2424,stroke-width:2px,color:#ffffff
    style MA1A fill:#FF2424,stroke:#FF2424,stroke-width:2px,color:#ffffff
    style MA1B fill:#FF2424,stroke:#FF2424,stroke-width:2px,color:#ffffff
    style MA3 fill:#1a1a1a,stroke:#FF2424,stroke-width:2px,color:#ffffff`;

// ------------------------------------------------------------------
// OS Platform visual data
// ------------------------------------------------------------------
const MODULES = [
  { label: "Limit Firewall", icon: Shield, color: "#FF2424", bg: "bg-[#FF2424]/10", text: "text-[#FF2424]" },
  { label: "API Guardian", icon: Link2, color: "#155EEF", bg: "bg-[#155EEF]/10", text: "text-[#155EEF]" },
  { label: "Autonomous QA", icon: Sparkles, color: "#7C3AED", bg: "bg-[#7C3AED]/10", text: "text-[#7C3AED]" },
  { label: "Shadow Merge", icon: Zap, color: "#D97706", bg: "bg-[#D97706]/10", text: "text-[#D97706]" },
  { label: "M&A Mapper", icon: GitMerge, color: "#16A34A", bg: "bg-[#16A34A]/10", text: "text-[#16A34A]" },
];

// ------------------------------------------------------------------
// App card component
// ------------------------------------------------------------------
function AppCard({
  appNum,
  tag,
  title,
  superpower,
  impact,
  context,
  chart,
  accent,
  accentBg,
  Icon,
}: {
  appNum: string;
  tag: string;
  title: string;
  superpower: string;
  impact: string;
  context: string;
  chart?: string;
  accent: string;
  accentBg: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <Reveal>
      <div className="rounded-[16px] border border-[#1a1a1a]/8 bg-white shadow-[0_8px_28px_rgba(26,26,26,0.05)]">
        {/* Card header */}
        <div className="flex items-start gap-4 border-b border-[#1a1a1a]/8 p-6">
          <div className={`inline-flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-[12px] ${accentBg}`}>
            <Icon className="h-6 w-6" style={{ color: accent }} />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-[4px] bg-[#1a1a1a]/6 px-[8px] py-[3px] font-mono text-[9px] font-bold uppercase tracking-[2px] text-[#666]">
                {appNum}
              </span>
              <span className="rounded-[4px] px-[8px] py-[3px] font-mono text-[9px] font-bold uppercase tracking-[2px]"
                style={{ background: `${accent}15`, color: accent }}>
                Native App · Powered by Jataka Graph
              </span>
            </div>
            <h3 className="font-archivo text-[clamp(18px,2vw,22px)] uppercase leading-[1.1] tracking-[-0.5px] text-[#1a1a1a]">
              {title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-0 md:grid-cols-3">
          <div className="border-b border-[#1a1a1a]/8 p-5 md:border-b-0 md:border-r">
            <p className="mb-2 font-mono text-[9.5px] font-bold uppercase tracking-[2px] text-[#999]">The Superpower</p>
            <p className="text-[14px] font-semibold leading-[1.55] text-[#1a1a1a]">{superpower}</p>
          </div>
          <div className="border-b border-[#1a1a1a]/8 p-5 md:border-b-0 md:border-r">
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-[4px] bg-[#1a1a1a] px-2 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[2px] text-white">
              💰 Financial Impact
            </p>
            <p className="text-[14px] leading-[1.55] text-[#1a1a1a]"
              dangerouslySetInnerHTML={{ __html: impact }} />
          </div>
          <div className="p-5">
            <p className="mb-2 font-mono text-[9.5px] font-bold uppercase tracking-[2px]" style={{ color: accent }}>
              How Context Powers It
            </p>
            <p className="text-[13.5px] leading-[1.62] text-[#444]">{context}</p>
          </div>
        </div>

        {/* Flowchart */}
        {chart && (
          <div className="border-t border-[#1a1a1a]/8 px-6 pb-6 pt-5">
            <p className="mb-3 font-mono text-[9.5px] font-bold uppercase tracking-[2px] text-[#999]">
              Technical Flowchart · from Platform Audit
            </p>
            <MermaidBlock chart={chart} />
          </div>
        )}
      </div>
    </Reveal>
  );
}

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
export default function ApplicationsPage() {
  const initMermaid = () => {
    if (typeof window === "undefined" || !window.mermaid) return;
    window.mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: {
        primaryColor: "#FFFFFF",
        primaryTextColor: "#1a1a1a",
        primaryBorderColor: "#FF2424",
        lineColor: "#1a1a1a",
        secondaryColor: "#FAF8F3",
        tertiaryColor: "#F5F3ED",
        fontFamily: "sans-serif",
        fontSize: "13px",
      },
      flowchart: { htmlLabels: true, curve: "basis", padding: 15 },
    });
    window.mermaid.run();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.mermaid) {
      initMermaid();
    } else {
      const id = setInterval(() => {
        if (window.mermaid) { clearInterval(id); initMermaid(); }
      }, 100);
      return () => clearInterval(id);
    }
  }, []);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="afterInteractive"
        onLoad={initMermaid}
      />

      <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">

        {/* ── HERO ───────────────────────────────────────────────────── */}
        <section className="border-b border-[#1a1a1a]/8 px-6 pb-[56px] pt-[70px] md:px-12">
          <div className="mx-auto max-w-[1100px]">

            {/* Breadcrumb */}
            <div className="mb-[20px] flex items-center gap-2 font-mono text-[11px] text-[#888]">
              <Link href="/insider/dataroom-botcon" className="hover:text-[#FF2424] transition">Data Room</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-[#1a1a1a]">Enterprise Applications</span>
            </div>

            <div className="inline-flex items-center gap-[9px] rounded-[4px] border border-[#FF2424]/25 bg-[#FF2424]/10 px-[14px] py-[6px] font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
              <Lock className="h-[11px] w-[11px]" />
              The Enterprise Operating System
            </div>

            <h1 className="mt-5 font-archivo text-[clamp(30px,5vw,58px)] leading-[1.02] tracking-[-2px] uppercase text-[#1a1a1a]">
              One Engine.<br /><span className="text-[#FF2424]">New Revenue Streams.</span>
            </h1>
            <p className="mt-5 max-w-[740px] text-[16px] leading-[1.75] text-[#444]">
              Jataka is not a fragmented suite of tools; it is an{" "}
              <strong className="text-[#1a1a1a]">Enterprise Operating System.</strong> Because we built the
              foundational Context Engine, we can deploy native applications directly on top of it. For a GCC,
              every one of these applications unlocks a{" "}
              <strong className="text-[#1a1a1a]">new, highly-lucrative service offering</strong>—allowing you
              to <strong className="text-[#1a1a1a]">protect your clients&apos; revenue</strong> while radically
              expanding <strong className="text-[#1a1a1a]">your own profit margins.</strong>
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#FF2424]/20 bg-[#FF2424]/8 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#FF2424]">
                <Shield className="h-[13px] w-[13px]" /> The Shield — Protecting Revenue
              </div>
              <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#16A34A]/20 bg-[#16A34A]/8 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#16A34A]">
                <Swords className="h-[13px] w-[13px]" /> The Sword — Accelerating Revenue
              </div>
            </div>
          </div>
        </section>

        {/* ── OS PLATFORM GRAPHIC ────────────────────────────────────── */}
        <section className="border-b border-[#1a1a1a]/8 bg-[#F2EFE8] px-6 py-[48px] md:px-12">
          <div className="mx-auto max-w-[1100px]">
            <Reveal>
              <p className="mb-[8px] font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                The OS Metaphor
              </p>
              <h2 className="mb-[32px] font-archivo text-[clamp(22px,3vw,32px)] uppercase leading-[1.05] tracking-[-0.8px] text-[#1a1a1a]">
                Apps Powered by the Brain Below
              </h2>
            </Reveal>

            {/* App icons row */}
            <Reveal delay={80}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
                {MODULES.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.label}
                      className={`flex flex-col items-center gap-3 rounded-[14px] border border-[#1a1a1a]/10 bg-white px-4 py-5 shadow-[0_6px_20px_rgba(26,26,26,0.06)]`}
                    >
                      <div className={`flex h-[48px] w-[48px] items-center justify-center rounded-[12px] ${m.bg}`}>
                        <Icon className={`h-6 w-6 ${m.text}`} />
                      </div>
                      <span className="text-center font-mono text-[10px] font-bold uppercase leading-[1.3] tracking-[1.2px] text-[#444]">
                        {m.label}
                      </span>
                      <div className="h-[24px] w-px border-l-2 border-dashed" style={{ borderColor: m.color + "60" }} />
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Base engine bar */}
            <Reveal delay={160}>
              <div className="mt-0 flex items-center justify-center rounded-[14px] bg-[#1a1a1a] px-6 py-5 shadow-[0_12px_40px_rgba(26,26,26,0.18)]">
                <div className="text-center">
                  <div className="mb-1 font-mono text-[9.5px] font-bold uppercase tracking-[3px] text-[#FF2424]">
                    The Foundational Layer
                  </div>
                  <div className="font-archivo text-[clamp(16px,2vw,22px)] uppercase tracking-[-0.5px] text-white">
                    The Jataka Context Engine (OS)
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-white/50">
                    Jira · GitHub · Salesforce · Real-time Knowledge Graph
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── MAIN HEADLINE ──────────────────────────────────────────── */}
        <section className="border-b border-[#1a1a1a]/8 px-6 py-[48px] md:px-12">
          <div className="mx-auto max-w-[1100px] text-center">
            <Reveal>
              <h2 className="font-archivo text-[clamp(26px,4vw,46px)] uppercase leading-[1.04] tracking-[-1.5px] text-[#1a1a1a]">
                The Shield and The Sword.
              </h2>
              <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-[1.75] text-[#444]">
                Because the Jataka Engine has perfectly mapped your enterprise context, we don&apos;t rely on brittle
                test scripts. We built a suite of superhuman applications on top of the Brain. Half are designed to
                fiercely <strong className="text-[#1a1a1a]">protect your revenue</strong>. The other half are designed
                to radically <strong className="text-[#1a1a1a]">accelerate it</strong>.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] px-6 md:px-12">

          {/* ── SHIELD SECTION ─────────────────────────────────────── */}
          <section className="py-[56px]">
            <Reveal>
              <div className="mb-[32px] flex items-center gap-4">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-[#FF2424]/10 text-[#FF2424]">
                  <Shield className="h-7 w-7" />
                </div>
                <div>
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">Section 01</div>
                  <h2 className="font-archivo text-[clamp(24px,3.5vw,38px)] uppercase leading-[1.05] tracking-[-1px] text-[#1a1a1a]">
                    The Shield: Protecting the Bottom Line
                  </h2>
                </div>
              </div>
              <p className="mb-[36px] max-w-[680px] text-[15px] leading-[1.72] text-[#555]">
                These applications act as an impenetrable digital immune system, eliminating revenue-leaking outages
                and slashing manual QA costs.
              </p>
            </Reveal>

            <div className="space-y-8">
              <AppCard
                appNum="App 01"
                tag="Shield"
                title="The Limit Firewall (Runtime Scale Protection)"
                superpower="Zero Production Crashes on Black Friday."
                impact="<strong>Prevents Millions in SLA Penalties.</strong> An SAP integration crash on the last day of the quarter costs enterprises millions in unrecognized revenue. By simulating peak data volumes <em>before</em> code merges, we guarantee the org will never buckle."
                context="The engine uses your Live Production Data Map to run mathematical physics simulations on PRs, catching CPU timeouts that traditional testing misses."
                chart={CHART_LIMIT_FIREWALL}
                accent="#FF2424"
                accentBg="bg-[#FF2424]/10"
                Icon={Shield}
              />

              <AppCard
                appNum="App 02"
                tag="Shield"
                title="API Contract Guardian (The Integration Shield)"
                superpower="Unbreakable Cross-System Business Processes."
                impact="<strong>Zero Revenue Pipeline Disruptions.</strong> Deleting a single field can silently break downstream systems like Workday, MuleSoft, or SAP. We protect the enterprise supply chain by stopping these &quot;silent breakers&quot; before they deploy."
                context="The engine maps every inbound and outbound API dependency across the company, instantly blocking code that violates an external contract."
                accent="#155EEF"
                accentBg="bg-[#155EEF]/10"
                Icon={Link2}
              />

              <AppCard
                appNum="App 03"
                tag="Shield"
                title="Autonomous QA & Tech Debt Cleaner"
                superpower="Self-Healing UI Tests & Automated Org Cleanup."
                impact="<strong>80% Cost Reduction in QA Headcount.</strong> Stop paying offshore armies to write and maintain brittle Selenium scripts. Jataka's Vision AI heals its own tests, drastically increasing your profit margins."
                context="Instead of relying on CSS selectors, the Vision AI reads your Jira Acceptance Criteria to understand the business intent of the test, allowing it to visually navigate the screen like a human."
                chart={CHART_QA}
                accent="#7C3AED"
                accentBg="bg-[#7C3AED]/10"
                Icon={Sparkles}
              />

              {/* Tech Debt sub-chart */}
              <Reveal>
                <div className="rounded-[14px] border border-[#7C3AED]/12 bg-white p-6">
                  <p className="mb-1 font-mono text-[9.5px] font-bold uppercase tracking-[2px] text-[#7C3AED]">
                    Also Part of App 03
                  </p>
                  <h4 className="mb-4 font-archivo text-[18px] uppercase tracking-[-0.4px] text-[#1a1a1a]">
                    Tech Debt Cleanup Flow
                  </h4>
                  <MermaidBlock chart={CHART_TECH_DEBT} />
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── SWORD SECTION ──────────────────────────────────────── */}
          <section className="border-t border-[#1a1a1a]/8 py-[56px]">
            <Reveal>
              <div className="mb-[32px] flex items-center gap-4">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-[#16A34A]/10 text-[#16A34A]">
                  <Swords className="h-7 w-7" />
                </div>
                <div>
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#16A34A]">Section 02</div>
                  <h2 className="font-archivo text-[clamp(24px,3.5vw,38px)] uppercase leading-[1.05] tracking-[-1px] text-[#1a1a1a]">
                    The Sword: Accelerating Revenue & Margins
                  </h2>
                </div>
              </div>
              <p className="mb-[36px] max-w-[680px] text-[15px] leading-[1.72] text-[#555]">
                These applications remove the fear of deployment, allowing your teams to deliver features at the
                speed of a startup and win massive enterprise contracts.
              </p>
            </Reveal>

            <div className="space-y-8">
              <AppCard
                appNum="App 04"
                tag="Sword"
                title="Shadow Merge & 1-Click Remediation"
                superpower="Catching Collisions & AI Auto-Fixing."
                impact="<strong>+40% Faster Time-to-Revenue.</strong> Developers no longer spend weeks doing &quot;Discovery&quot; in fear of breaking the org. When Jataka catches a limit breach, it doesn't just block the PR—it writes the refactored code and provides a 1-click commit button to fix it."
                context="The engine compiles PRs against the future state of the main branch, predicting collisions between different developers before they happen."
                chart={CHART_PR_REVIEW}
                accent="#D97706"
                accentBg="bg-[#D97706]/10"
                Icon={Zap}
              />

              <AppCard
                appNum="App 05"
                tag="Sword"
                title="M&A Org Merge Mapper (Digital Transformation)"
                superpower="Automated M&A Due Diligence."
                impact="<strong>Win $10M+ Enterprise Contracts.</strong> When two Fortune 500 companies merge, mapping the overlap of their Salesforce orgs takes consultancies years. Your GCC can now offer automated digital transformation at a speed and price point that legacy firms cannot match."
                context="Jataka ingests Org A and Org B into two separate Context Graphs, mathematically comparing them to instantly output a complete overlap and conflict report."
                accent="#16A34A"
                accentBg="bg-[#16A34A]/10"
                Icon={GitMerge}
              />
            </div>
          </section>

          {/* ── ENTERPRISE FLOWCHART SECTION ───────────────────────── */}
          <section className="border-t border-[#1a1a1a]/8 py-[56px]">
            <Reveal>
              <span className="mb-[16px] inline-block rounded-[4px] bg-[#FF2424]/10 px-[12px] py-[6px] font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                Enterprise Applications · Technical Overview
              </span>
              <h2 className="mb-[12px] font-archivo text-[clamp(22px,3vw,34px)] uppercase leading-[1.05] tracking-[-0.8px] text-[#1a1a1a]">
                Full Enterprise Applications Flowchart
              </h2>
              <p className="mb-[8px] max-w-[640px] text-[15px] leading-[1.7] text-[#555]">
                M&A Org Merge, API Contract Guardian, Synthetic Monitoring, and Legacy Migration — all running on
                the shared Jataka Context Graph.
              </p>
              <MermaidBlock chart={CHART_ENTERPRISE} />
            </Reveal>
          </section>

        </div>

        {/* ── BOTTOM CTA ─────────────────────────────────────────────── */}
        <section className="border-t border-[#1a1a1a]/8 bg-[#1a1a1a] px-6 py-[72px] md:px-12">
          <div className="mx-auto max-w-[1100px] text-center">
            <Reveal>
              <Network className="mx-auto mb-6 h-10 w-10 text-[#FF2424]" />
              <p className="font-archivo text-[clamp(22px,3.5vw,38px)] uppercase leading-[1.08] tracking-[-1px] text-white">
                This is how a Global Delivery Center transitions from selling &quot;developer hours&quot; to selling{" "}
                <span className="text-[#FF2424]">Mathematically Verified Delivery.</span>
              </p>
              <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.7] text-white/55">
                See the exact financial impact these applications generate for BOT Consulting.
              </p>
              <Link
                href="/insider/dataroom-botcon/roi"
                className="mt-8 inline-flex items-center gap-[10px] rounded-[6px] bg-[#FF2424] px-[28px] py-[13px] font-archivo text-[12px] uppercase tracking-[1.5px] text-white transition hover:bg-[#d91f1f]"
              >
                See the GCC Financial Impact
                <ArrowRight className="h-[14px] w-[14px]" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/8 bg-[#1a1a1a] px-6 py-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-white/25">
            Jataka · Confidential · Prepared for BOT Consulting
          </p>
        </footer>
      </div>
    </>
  );
}
