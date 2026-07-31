"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { MarketingShell } from "../../components/marketing";
import {
  ArrowRight,
  FileText,
  Lock,
  Calendar,
  Shield,
  Swords,
  Brain,
  Network,
  Cloud,
  Ticket,
  Github,
  Zap,
  Link2,
  Sparkles,
  GitMerge,
  Cpu,
  Eye,
} from "lucide-react";

// ------------------------------------------------------------------
// Scroll reveal
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
// Shared UI helpers (matching /platform-audit)
// ------------------------------------------------------------------
const SECTION_LABEL_CLS =
  "inline-block font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] bg-[#2563EB]/10 text-[#2563EB] px-[12px] py-[6px] rounded-[4px] mb-[16px]";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className={SECTION_LABEL_CLS}>{children}</span>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-semibold tracking-tight text-[clamp(28px,4vw,44px)] leading-[1.05] tracking-[-1px] uppercase mb-[16px]">
      {children}
    </h2>
  );
}

function H3({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className="font-semibold tracking-tight text-[clamp(20px,2.4vw,26px)] tracking-[-0.5px] uppercase mt-[40px] mb-[14px]"
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-[1.75] text-[#444] mb-[14px]">{children}</p>
  );
}

function MermaidBlock({ chart }: { chart: string }) {
  return (
    <div className="bg-white border border-[#1a1a1a]/10 rounded-[12px] p-[20px] md:p-[28px] my-[24px] overflow-x-auto">
      <pre className="mermaid flex justify-center text-[13px]">{chart}</pre>
    </div>
  );
}

// ------------------------------------------------------------------
// JSON-LD
// ------------------------------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Jataka - Enterprise Data Room",
  description:
    "The world's first Context Engine for Enterprise Architecture. Platform + Apps pitch for GCC operators and Fortune 500 CIOs.",
  url: "https://jataka.io/insider/data-room-bot",
};

// ------------------------------------------------------------------
// Sub-nav definition
// ------------------------------------------------------------------
const SUB_NAV: { href: string; label: string }[] = [
  { href: "#core", label: "The Context Engine" },
  { href: "#apps", label: "The Applications" },
  { href: "#impact", label: "GCC Advantage" },
  { href: "#close", label: "Partnership" },
];

// ------------------------------------------------------------------
// Mermaid chart - triangulation of context (Section 1)
// ------------------------------------------------------------------
const CHART_CONTEXT = `flowchart LR
    subgraph SOURCES["Enterprise Signals"]
        J["Jira Boards\\nBusiness Intent\\n& Process Logic"]
        G["GitHub\\nArchitectural\\nBlast Radius"]
        S["Salesforce\\nRuntime Physics\\n& Data Shape"]
    end

    subgraph BRAIN["Jataka Context Engine"]
        K["Real-time\\nKnowledge Graph\\n(The Omniscient\\nChief Architect)"]
    end

    subgraph GOV["Governance Output"]
        O1["Mathematically\\nVerified Deploys"]
        O2["Cross-System\\nProcess Continuity"]
        O3["Live\\nBlast Radius"]
    end

    J --> K
    G --> K
    S --> K
    K --> O1
    K --> O2
    K --> O3`;

// ------------------------------------------------------------------
// Context source cards (Section 1)
// ------------------------------------------------------------------
const CONTEXT_CARDS: {
  icon: React.ComponentType<{ className?: string }>;
  kicker: string;
  title: string;
  body: string;
  accent: string;
}[] = [
  {
    icon: Ticket,
    kicker: "Business Context",
    title: "Business Intent & Process Logic",
    body:
      "Jataka <strong>reads your Jira Acceptance Criteria</strong> — not just the code. If a developer's code compiles but bypasses the 'VP Discount Approval' rule, Jataka catches the <strong>Process Logic violation</strong> before it deploys.",
    accent: "#1E6FEB",
  },
  {
    icon: Github,
    kicker: "Architectural Context",
    title: "The Blast Radius Map",
    body:
      "Jataka <strong>maps every dependency</strong> across your codebase. Modify a picklist or delete a field — we instantly flag which <strong>MuleSoft, Workday, or SAP</strong> system relies on it, preventing catastrophic integration failures.",
    accent: "#1a1a1a",
  },
  {
    icon: Cloud,
    kicker: "Runtime Context",
    title: "The Physics of Scale",
    body:
      "We capture the exact 'Data Shape' of your live Production environment and <strong>simulate Black Friday volumes</strong> before merge. Jataka mathematically guarantees the architecture won't buckle at peak hours.",
    accent: "#00A1E0",
  },
];

// ------------------------------------------------------------------
// Application cards (Section 2)
// ------------------------------------------------------------------
const APP_CARDS: {
  icon: React.ComponentType<{ className?: string }>;
  appTag: string;
  title: string;
  superpower: string;
  context: string;
  auditAnchor: string;
  auditLabel: string;
}[] = [
  {
    icon: Shield,
    appTag: "App 01",
    title: "The Limit Firewall",
    superpower: "Zero production crashes from Salesforce System Limits (which cause hard crashes).",
    context:
      "Traditional scanners just read code syntax. Jataka's Limit Firewall queries the Context Engine for your exact Production Data Map, then injects targeted synthetic data into a sandbox to run an automated stress-test simulating Black Friday traffic levels. It mathematically proves whether your code will survive Black Friday volumes before it ever merges.",
    auditAnchor: "/platform-audit#m1",
    auditLabel: "See flowchart in Module 01",
  },
  {
    icon: Link2,
    appTag: "App 02",
    title: "API Contract Guardian",
    superpower: "Guaranteed cross-system process continuity.",
    context:
      "When a developer deletes a custom field, they don't know who uses it. Jataka does. Because the Context Engine has mapped every inbound and outbound dependency, it instantly blocks PRs that would break external ERPs (SAP, Workday, MuleSoft), notifying the integration owner in milliseconds.",
    auditAnchor: "/platform-audit#m5",
    auditLabel: "See flowchart in Module 05",
  },
  {
    icon: Sparkles,
    appTag: "App 03",
    title: "Autonomous Tech Debt & Self-Healing QA",
    superpower: "Clean 10 years of legacy bloat. Eliminate manual QA.",
    context:
      "Traditional Selenium/Cypress scripts break the moment UI changes. Jataka's Vision AI doesn't rely on brittle code selectors. It queries the Jira Business Context to understand the intent of the test. When the UI changes, it uses 'eyes' to visually locate the new button, clicks it, and heals the test automatically.",
    auditAnchor: "/platform-audit#m2",
    auditLabel: "See flowcharts in Modules 02 & 03",
  },
  {
    icon: GitMerge,
    appTag: "App 04",
    title: "M&A Org Merge",
    superpower: "Compress months of enterprise due diligence into days.",
    context:
      "When two Fortune 500 companies merge, mapping the overlap of two massive Salesforce orgs takes consultancies years. Jataka ingests Org A and Org B into two separate Knowledge Graphs, mathematically compares them, and instantly outputs a complete overlap report showing identical components, architectural conflicts, and estimated merge effort.",
    auditAnchor: "/platform-audit#m5",
    auditLabel: "See flowchart in Module 05",
  },
];

// ------------------------------------------------------------------
// Mermaid type
// ------------------------------------------------------------------
interface MermaidGlobal {
  initialize: (config: Record<string, unknown>) => void;
  run: () => void;
}
declare global {
  interface Window {
    mermaid?: MermaidGlobal;
  }
}

// ------------------------------------------------------------------
// Main page
// ------------------------------------------------------------------
export default function DataRoomBotPage() {
  const router = useRouter();

  const initMermaid = () => {
    if (typeof window === "undefined" || !window.mermaid) return;
    window.mermaid.initialize({
      startOnLoad: true,
      theme: "base",
      themeVariables: {
        primaryColor: "#FFFFFF",
        primaryTextColor: "#1a1a1a",
        primaryBorderColor: "#2563EB",
        lineColor: "#1a1a1a",
        secondaryColor: "#F3F3F4",
        tertiaryColor: "#F5F3ED",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "13px",
      },
      flowchart: { htmlLabels: true, curve: "basis", padding: 15 },
    });
    window.mermaid.run();
  };

  return (
    <MarketingShell>
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="afterInteractive"
        onLoad={initMermaid}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          header, .pa-subnav, .pa-print-hide { display: none !important; }
          body { background: #fff !important; }
          .pa-shell { background: #fff !important; }
          section { page-break-inside: avoid; }
        }
      `,
        }}
      />

      <div className="pa-shell min-h-screen bg-[#F3F3F4] text-[#1a1a1a]">
        {/* STICKY SUB-NAV */}
        <nav className="pa-subnav sticky top-[64px] z-40 bg-[#F3F3F4]/90 backdrop-blur-md border-b border-[#1a1a1a]/8">
          <div className="max-w-[1100px] mx-auto px-[16px] md:px-[32px] py-[10px] flex items-center justify-between gap-[16px]">
            <div className="flex items-center gap-[8px] overflow-x-auto scrollbar-hide">
              {SUB_NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex-shrink-0 text-[11.5px] font-mono font-semibold uppercase tracking-[1.2px] text-[#444] hover:text-[#2563EB] px-[10px] py-[6px] rounded-[4px] hover:bg-[#2563EB]/8 transition"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => router.push("/platform-audit")}
              className="pa-print-hide flex-shrink-0 bg-[#2563EB] text-white px-[14px] py-[7px] font-semibold tracking-tight text-[10.5px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#1d4ed8] transition inline-flex items-center gap-[6px]"
            >
              <FileText className="w-[12px] h-[12px]" />
              Full Platform Audit
            </button>
          </div>
        </nav>

        {/* ================= HERO ================= */}
        <section className="pt-[70px] pb-[40px] px-[24px] md:px-[48px] border-b border-[#1a1a1a]/8">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#2563EB]/10 border border-[#2563EB]/25 px-[18px] py-[7px] mb-[20px] text-[11px] font-bold uppercase tracking-[3px] text-[#2563EB] rounded-[4px]">
                <Lock className="w-[13px] h-[13px]" />
                Confidential: Executive Briefing Prepared for BOT Consulting
              </div>
            </Reveal>

            <Reveal delay={80}>
              <p className="font-mono text-[11.5px] font-bold uppercase tracking-[3px] text-[#666] mb-[14px]">
                The era of generating code is over. The era of governing it is here.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <h1 className="font-semibold tracking-tight text-[clamp(34px,5.6vw,64px)] leading-[1.02] tracking-[-2px] uppercase mb-[20px]">
                The World&apos;s First <br />
                <span className="text-[#2563EB]">Context Engine</span> for <br />
                Enterprise Architecture.
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <div className="flex flex-wrap justify-center gap-x-[22px] gap-y-[8px] text-[12.5px] text-[#666] mb-[22px] font-mono uppercase tracking-[1px]">
                <span className="inline-flex items-center gap-[6px]">
                  <FileText className="w-[12px] h-[12px]" /> Platform + Apps Brief
                </span>
                <span className="inline-flex items-center gap-[6px]">
                  <Lock className="w-[12px] h-[12px]" /> For BOT Consulting Leadership
                </span>
                <span className="inline-flex items-center gap-[6px]">
                  <Calendar className="w-[12px] h-[12px]" /> April 2026 - v1.0
                </span>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[17px] leading-[1.7] text-[#444] max-w-[760px] mx-auto">
                AI agents and offshore developers are incredibly fast, but they share
                a fatal flaw:{" "}
                <strong className="text-[#1a1a1a]">
                  they are contextually blind.
                </strong>{" "}
                Jataka builds a real-time Knowledge Graph of your entire enterprise,
                ensuring no line of code ever breaks your Process Logic, APIs, or
                Salesforce System Limits (which cause hard crashes).
              </p>
            </Reveal>

            <Reveal delay={380}>
              <div className="mt-[32px] flex flex-col md:flex-row gap-[12px] justify-center">
                <a
                  href="#core"
                  className="bg-[#1a1a1a] text-white px-[28px] py-[13px] font-semibold tracking-tight text-[12px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#000] transition inline-flex items-center justify-center gap-[8px]"
                >
                  Tour the Data Room
                  <ArrowRight className="w-[14px] h-[14px]" />
                </a>
                <a
                  href="#close"
                  className="bg-transparent text-[#1a1a1a] px-[28px] py-[13px] font-semibold tracking-tight text-[12px] uppercase tracking-[1.5px] rounded-[4px] border border-[#1a1a1a]/20 hover:border-[#2563EB]/60 transition inline-flex items-center justify-center gap-[8px]"
                >
                  Partnership Terms
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= BODY CONTAINER ================= */}
        <div className="max-w-[1000px] mx-auto px-[24px] md:px-[48px]">
          {/* ============================================================
              SECTION 1 - THE CORE (Jataka Context Engine)
             ============================================================ */}
          <section id="core" className="py-[56px] border-t border-[#1a1a1a]/8">
            <Reveal>
              <SectionLabel>Section 01 / The Core</SectionLabel>
              <H2>The Jataka Context Engine</H2>
              <P>
                We realized that to safely scale enterprise engineering, you cannot
                just build a testing tool. You have to build a{" "}
                <strong>Brain</strong>. Jataka ingests the entire DNA of your
                enterprise into a live, mathematical Knowledge Graph. We act as an
                omniscient Chief Architect that sits between your developers and
                your production environment, mathematically proving that every
                deployment is safe.
              </P>
            </Reveal>

            {/* Two-column: Problem vs Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[36px]">
              <Reveal>
                <div className="bg-white border border-[#1a1a1a]/8 rounded-[12px] p-[28px] h-full border-l-4 border-l-[#1a1a1a]">
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#1a1a1a]/70 mb-[10px]">
                    The Problem / The Blind Developer
                  </p>
                  <h3 className="font-semibold tracking-tight text-[22px] leading-[1.15] tracking-[-0.5px] uppercase mb-[16px]">
                    The Danger of Building in a Vacuum
                  </h3>
                  <ul className="space-y-[10px] text-[14.5px] leading-[1.55] text-[#444]">
                    <li className="flex gap-[10px]">
                      <span className="text-[#1a1a1a] mt-[8px] w-[5px] h-[5px] rounded-full bg-[#1a1a1a] flex-shrink-0" />
                      <span>Developers and AI agents write code looking at <strong className="text-[#1a1a1a]">a single file</strong>.</span>
                    </li>
                    <li className="flex gap-[10px]">
                      <span className="text-[#1a1a1a] mt-[8px] w-[5px] h-[5px] rounded-full bg-[#1a1a1a] flex-shrink-0" />
                      <span>Deleting one custom field silently <strong className="text-[#1a1a1a]">crashes SAP billing</strong>.</span>
                    </li>
                    <li className="flex gap-[10px]">
                      <span className="text-[#1a1a1a] mt-[8px] w-[5px] h-[5px] rounded-full bg-[#1a1a1a] flex-shrink-0" />
                      <span>Code times out the moment <strong className="text-[#1a1a1a]">Black Friday hits 150K records</strong>.</span>
                    </li>
                  </ul>
                  <p className="mt-[16px] text-[14px] leading-[1.5] text-[#1a1a1a] font-semibold">
                    A perfect line of code without enterprise context is a production outage waiting to happen.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="bg-white border border-[#1a1a1a]/8 rounded-[12px] p-[28px] h-full border-l-4 border-l-[#2563EB]">
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#2563EB] mb-[10px]">
                    The Solution / The Omniscient Brain
                  </p>
                  <h3 className="font-semibold tracking-tight text-[22px] leading-[1.15] tracking-[-0.5px] uppercase mb-[16px]">
                    The Jataka Context Engine
                  </h3>
                  <ul className="space-y-[10px] text-[14.5px] leading-[1.55] text-[#444]">
                    <li className="flex gap-[10px]">
                      <span className="mt-[8px] w-[5px] h-[5px] rounded-full bg-[#2563EB] flex-shrink-0" />
                      <span>A live <strong className="text-[#1a1a1a]">Knowledge Graph</strong> of your full enterprise DNA.</span>
                    </li>
                    <li className="flex gap-[10px]">
                      <span className="mt-[8px] w-[5px] h-[5px] rounded-full bg-[#2563EB] flex-shrink-0" />
                      <span>An <strong className="text-[#1a1a1a]">omniscient Chief Architect</strong> sitting between dev and prod.</span>
                    </li>
                    <li className="flex gap-[10px]">
                      <span className="mt-[8px] w-[5px] h-[5px] rounded-full bg-[#2563EB] flex-shrink-0" />
                      <span>Every deploy is <strong className="text-[#1a1a1a]">mathematically proven safe</strong>.</span>
                    </li>
                  </ul>
                  <p className="mt-[16px] text-[14px] leading-[1.5] text-[#1a1a1a] font-semibold">
                    Not a testing tool. A Brain.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Triangulation diagram */}
            <Reveal>
              <H3>How the Brain Learns: Triangulation of Context</H3>
              <P>
                Jataka continuously ingests data from your three most critical
                systems to build a 360-degree understanding of your enterprise.
              </P>
              <MermaidBlock chart={CHART_CONTEXT} />
            </Reveal>

            {/* 3 context cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mt-[20px]">
              {CONTEXT_CARDS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.title} delay={i * 90}>
                    <div className="bg-white border border-[#1a1a1a]/8 rounded-[12px] p-[22px] h-full flex flex-col">
                      <div
                        className="inline-flex w-[40px] h-[40px] rounded-[8px] items-center justify-center mb-[14px]"
                        style={{
                          background: `${c.accent}15`,
                          color: c.accent,
                        }}
                      >
                        <Icon className="w-[20px] h-[20px]" />
                      </div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#2563EB] mb-[6px]">
                        {c.kicker}
                      </p>
                      <h4 className="font-semibold tracking-tight text-[16px] leading-[1.25] tracking-[-0.3px] uppercase mb-[10px] text-[#1a1a1a]">
                        {c.title}
                      </h4>
                      <p
                        className="text-[13.5px] leading-[1.65] text-[#444] [&_strong]:text-[#1a1a1a] [&_strong]:font-semibold"
                        dangerouslySetInnerHTML={{ __html: c.body }}
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Transition to Section 2 */}
            <Reveal>
              <div className="mt-[48px] text-center bg-white border border-[#1a1a1a]/8 rounded-[12px] p-[32px]">
                <p className="font-semibold tracking-tight text-[clamp(18px,2.2vw,24px)] leading-[1.3] tracking-[-0.5px] uppercase text-[#1a1a1a]">
                  Because we have solved the Context Problem at the foundational
                  level, <br className="hidden md:block" /> we have unlocked{" "}
                  <span className="text-[#2563EB]">
                    superhuman capabilities
                  </span>{" "}
                  for the enterprise.
                </p>
                <p className="mt-[14px] text-[13px] font-mono uppercase tracking-[2px] text-[#666]">
                  See the Applications Powered by the Context Engine
                </p>
                <a
                  href="#apps"
                  className="mt-[20px] inline-flex items-center gap-[8px] bg-[#1a1a1a] text-white px-[22px] py-[11px] font-semibold tracking-tight text-[11.5px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#000] transition"
                >
                  Continue <ArrowRight className="w-[14px] h-[14px]" />
                </a>
              </div>
            </Reveal>
          </section>

          {/* ============================================================
              SECTION 2 - THE APPLICATIONS
             ============================================================ */}
          <section id="apps" className="py-[56px] border-t border-[#1a1a1a]/8">
            <Reveal>
              <SectionLabel>Section 02 / The Applications</SectionLabel>
              <H2>Enterprise Applications Powered by Jataka</H2>
              <P>
                Because we have solved the Context problem at the foundational
                level, we don&apos;t need to rely on brittle test scripts or
                static rule engines. We built a suite of superhuman applications
                directly on top of the Jataka Knowledge Graph to automate
                DevSecOps.
              </P>
            </Reveal>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[32px]">
              {APP_CARDS.map((app, i) => {
                const Icon = app.icon;
                return (
                  <Reveal key={app.title} delay={i * 80}>
                    <div className="bg-white border border-[#1a1a1a]/8 rounded-[12px] p-[26px] h-full flex flex-col">
                      <div className="flex items-start gap-[14px] mb-[14px]">
                        <div className="inline-flex w-[44px] h-[44px] rounded-[10px] items-center justify-center bg-[#2563EB]/10 text-[#2563EB] flex-shrink-0">
                          <Icon className="w-[22px] h-[22px]" />
                        </div>
                        <div>
                          <p className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#2563EB] mb-[4px]">
                            {app.appTag}
                          </p>
                          <h3 className="font-semibold tracking-tight text-[18px] leading-[1.2] tracking-[-0.3px] uppercase text-[#1a1a1a]">
                            {app.title}
                          </h3>
                        </div>
                      </div>

                      <div className="border-t border-[#1a1a1a]/8 pt-[14px] mb-[12px]">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#666] mb-[4px]">
                          The Superpower
                        </p>
                        <p className="text-[14px] leading-[1.6] text-[#1a1a1a] font-medium">
                          {app.superpower}
                        </p>
                      </div>

                      <div className="mb-[14px]">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#666] mb-[4px]">
                          How Context Powers It
                        </p>
                        <p className="text-[13.5px] leading-[1.65] text-[#444]">
                          {app.context}
                        </p>
                      </div>

                      <a
                        href={app.auditAnchor}
                        className="mt-auto inline-flex items-center justify-between gap-[8px] bg-[#F3F3F4] border border-[#1a1a1a]/8 hover:border-[#2563EB]/40 rounded-[8px] px-[14px] py-[12px] transition group"
                      >
                        <span className="font-mono text-[10.5px] font-bold uppercase tracking-[1.8px] text-[#1a1a1a] group-hover:text-[#2563EB] transition">
                          {app.auditLabel}
                        </span>
                        <ArrowRight className="w-[12px] h-[12px] text-[#2563EB] group-hover:translate-x-[3px] transition-transform" />
                      </a>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Why-this-wins bar */}
            <Reveal>
              <div className="mt-[36px] bg-[#1a1a1a] text-white rounded-[12px] p-[28px]">
                <p className="font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#2563EB] mb-[12px]">
                  Why this layout wins the deal
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
                  <div>
                    <div className="inline-flex w-[32px] h-[32px] rounded-[6px] items-center justify-center bg-[#2563EB]/15 text-[#2563EB] mb-[10px]">
                      <Brain className="w-[16px] h-[16px]" />
                    </div>
                    <h4 className="font-semibold tracking-tight text-[14px] uppercase tracking-[-0.2px] mb-[6px]">
                      Answers &quot;How?&quot;
                    </h4>
                    <p className="text-[13px] leading-[1.6] text-[#aaa]">
                      Every AI startup claims they can stop crashes. We explain
                      exactly how - because we have a Context Engine feeding
                      every app.
                    </p>
                  </div>
                  <div>
                    <div className="inline-flex w-[32px] h-[32px] rounded-[6px] items-center justify-center bg-[#2563EB]/15 text-[#2563EB] mb-[10px]">
                      <Network className="w-[16px] h-[16px]" />
                    </div>
                    <h4 className="font-semibold tracking-tight text-[14px] uppercase tracking-[-0.2px] mb-[6px]">
                      Connects Audit to Vision
                    </h4>
                    <p className="text-[13px] leading-[1.6] text-[#aaa]">
                      When architects open the Platform Audit and see the Jataka
                      Context Graph anchored to every flowchart, the business
                      pitch matches the technical reality.
                    </p>
                  </div>
                  <div>
                    <div className="inline-flex w-[32px] h-[32px] rounded-[6px] items-center justify-center bg-[#2563EB]/15 text-[#2563EB] mb-[10px]">
                      <Zap className="w-[16px] h-[16px]" />
                    </div>
                    <h4 className="font-semibold tracking-tight text-[14px] uppercase tracking-[-0.2px] mb-[6px]">
                      Sets Up the Close
                    </h4>
                    <p className="text-[13px] leading-[1.6] text-[#aaa]">
                      Engine (Section 1) + Apps (Section 2) primes the reader
                      for Section 3: How much money does this make/save my GCC?
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ============================================================
              SECTION 3 - THE BUSINESS IMPACT (GCC Advantage)
             ============================================================ */}
        </div>

        <section
          id="impact"
          className="py-[72px] px-[24px] md:px-[48px] bg-[#0B0B0B] text-white border-t border-[#1a1a1a]/8"
        >
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <span className="inline-block font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] bg-[#2563EB]/15 text-[#2563EB] px-[12px] py-[6px] rounded-[4px] mb-[16px]">
                Section 03 / The Business Impact
              </span>
              <h2 className="font-semibold tracking-tight text-[clamp(30px,4.4vw,48px)] leading-[1.02] tracking-[-1.5px] uppercase mb-[18px]">
                The GCC Advantage: <br />
                <span className="text-[#2563EB]">
                  Delivering Zero-Risk Engineering
                </span>
              </h2>
              <p className="text-[16.5px] leading-[1.7] text-[#bbb] max-w-[780px] mb-[10px]">
                Stop selling developer hours. Start selling mathematically
                verified business outcomes. By deploying Jataka as your
                foundational Context Engine, your Global Capability Center
                transforms from a traditional cost center into an untouchable
                competitive weapon.
              </p>
              <p className="text-[15px] leading-[1.7] text-[#888] max-w-[780px]">
                Here is the exact financial impact of Context-Aware Engineering.
              </p>
            </Reveal>

            {/* SHIELD */}
            <Reveal>
              <div className="mt-[48px] grid grid-cols-1 md:grid-cols-[auto_1fr] gap-[18px] items-start mb-[14px]">
                <div className="inline-flex w-[52px] h-[52px] rounded-[10px] items-center justify-center bg-[#1A2E1F] text-[#4ADE80]">
                  <Shield className="w-[26px] h-[26px]" />
                </div>
                <div>
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#4ADE80] mb-[6px]">
                    The Shield
                  </p>
                  <h3 className="font-semibold tracking-tight text-[clamp(22px,3vw,30px)] leading-[1.05] tracking-[-0.8px] uppercase mb-[6px]">
                    Absolute Risk Mitigation &amp; Cost Reduction
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] text-[#999]">
                    Protecting the client&apos;s Process Logic while ruthlessly
                    cutting your internal delivery costs.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              <Reveal>
                <div className="bg-[#111] border border-white/8 rounded-[12px] p-[24px] h-full">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#4ADE80] mb-[10px]">
                    Impact Metric 01
                  </p>
                  <p className="font-semibold tracking-tight text-[36px] leading-[1] tracking-[-1.5px] mb-[10px]">
                    0 P1 Outages
                  </p>
                  <h4 className="font-semibold tracking-tight text-[15px] uppercase tracking-[-0.2px] mb-[8px] text-white">
                    &amp; Deployment Rollbacks
                  </h4>
                  <p className="text-[13.5px] leading-[1.65] text-[#aaa]">
                    Eliminate SLA penalties and revenue leakage. We mathematically guarantee your team will never break API contracts or hit Salesforce System Limits (which cause hard crashes).
                  </p>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="bg-[#111] border border-white/8 rounded-[12px] p-[24px] h-full">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#4ADE80] mb-[10px]">
                    Impact Metric 02
                  </p>
                  <p className="font-semibold tracking-tight text-[36px] leading-[1] tracking-[-1.5px] mb-[10px]">
                    -80%
                  </p>
                  <h4 className="font-semibold tracking-tight text-[15px] uppercase tracking-[-0.2px] mb-[8px] text-white">
                    QA &amp; Maintenance Overhead
                  </h4>
                  <p className="text-[13.5px] leading-[1.65] text-[#aaa]">
                    Retire your armies of manual software testers. Vision AI heals itself, cutting delivery cost while raising coverage.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* SWORD */}
            <Reveal>
              <div className="mt-[48px] grid grid-cols-1 md:grid-cols-[auto_1fr] gap-[18px] items-start mb-[14px]">
                <div className="inline-flex w-[52px] h-[52px] rounded-[10px] items-center justify-center bg-[#2E1A1A] text-[#2563EB]">
                  <Swords className="w-[26px] h-[26px]" />
                </div>
                <div>
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#2563EB] mb-[6px]">
                    The Sword
                  </p>
                  <h3 className="font-semibold tracking-tight text-[clamp(22px,3vw,30px)] leading-[1.05] tracking-[-0.8px] uppercase mb-[6px]">
                    Superhuman Velocity &amp; Margin Expansion
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] text-[#999]">
                    Moving at the speed of thought and scaling your output
                    without scaling your headcount.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              <Reveal>
                <div className="bg-[#111] border border-white/8 rounded-[12px] p-[24px] h-full">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#2563EB] mb-[10px]">
                    Impact Metric 03
                  </p>
                  <p className="font-semibold tracking-tight text-[36px] leading-[1] tracking-[-1.5px] mb-[10px]">
                    +40%
                  </p>
                  <h4 className="font-semibold tracking-tight text-[15px] uppercase tracking-[-0.2px] mb-[8px] text-white">
                    Faster &quot;Time-to-Revenue&quot;
                  </h4>
                  <p className="text-[13.5px] leading-[1.65] text-[#aaa]">
                    Kill the 3-week Discovery phase — blast radius arrives in Slack in 3 seconds. Clients capture market value a full quarter earlier.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="bg-[#111] border border-white/8 rounded-[12px] p-[24px] h-full">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#2563EB] mb-[10px]">
                    Impact Metric 04
                  </p>
                  <p className="font-semibold tracking-tight text-[36px] leading-[1] tracking-[-1.5px] mb-[10px]">
                    10x
                  </p>
                  <h4 className="font-semibold tracking-tight text-[15px] uppercase tracking-[-0.2px] mb-[8px] text-white">
                    Architect Scalability (AI Swarms)
                  </h4>
                  <p className="text-[13.5px] leading-[1.65] text-[#aaa]">
                    One Senior Architect can now safely govern 50 AI agents or junior devs. Your margins scale without your headcount.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Partnership close */}
            <div id="close">
              <Reveal>
                <div className="mt-[56px] bg-gradient-to-br from-[#121212] to-[#0B0B0B] border border-[#2563EB]/30 rounded-[14px] p-[32px] md:p-[40px] relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at top right, #2563EB, transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <p className="font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#2563EB] mb-[10px]">
                      Private Deal Room
                    </p>
                    <h3 className="font-semibold tracking-tight text-[clamp(24px,3.4vw,36px)] leading-[1.05] tracking-[-1px] uppercase mb-[20px] text-white">
                      Proposed Next Steps for <br />
                      <span className="text-[#2563EB]">BOT Consulting</span>
                    </h3>
                    <p className="text-[15px] leading-[1.7] text-[#bbb] mb-[28px] max-w-[720px]">
                      We want BOT Consulting to be <strong className="text-white">Site Zero</strong>. Let&apos;s get on a call this week to discuss Phase 1 (Internal Pilot) and Phase 2 (Enterprise Rollout).
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[28px]">
                      <div className="bg-black/30 border border-white/10 rounded-[10px] p-[20px]">
                        <div className="flex items-center gap-[10px] mb-[10px]">
                          <div className="inline-flex w-[30px] h-[30px] rounded-[6px] items-center justify-center bg-[#2563EB]/15 text-[#2563EB]">
                            <Cpu className="w-[15px] h-[15px]" />
                          </div>
                          <p className="font-semibold tracking-tight text-[13px] uppercase tracking-[-0.2px]">
                            Phase 1 / Internal Deployment
                          </p>
                        </div>
                        <p className="text-[13.5px] leading-[1.65] text-[#aaa]">
                          We deploy Jataka into your internal development
                          pipelines. We map your toughest client environments.
                          We prove the velocity increase and drop your
                          QA/deployment failures to zero.
                        </p>
                      </div>
                      <div className="bg-black/30 border border-white/10 rounded-[10px] p-[20px]">
                        <div className="flex items-center gap-[10px] mb-[10px]">
                          <div className="inline-flex w-[30px] h-[30px] rounded-[6px] items-center justify-center bg-[#2563EB]/15 text-[#2563EB]">
                            <Eye className="w-[15px] h-[15px]" />
                          </div>
                          <p className="font-semibold tracking-tight text-[13px] uppercase tracking-[-0.2px]">
                            Phase 2 / Enterprise Differentiator
                          </p>
                        </div>
                        <p className="text-[13.5px] leading-[1.65] text-[#aaa]">
                          Once proven, package Jataka as part of your premium
                          GCC offering. Walk into any Fortune 500 CIO meeting
                          with an untouchable moat.
                        </p>
                      </div>
                    </div>

                    <blockquote className="border-l-2 border-[#2563EB] pl-[20px] py-[6px] mb-[28px]">
                      <p className="font-semibold tracking-tight text-[clamp(16px,1.9vw,20px)] leading-[1.35] text-white italic">
                        &quot;Every single line of code delivered by our GCC is
                        governed by an AI Context Engine that mathematically
                        guarantees your business process logic will never
                        break.&quot;
                      </p>
                      <p className="mt-[8px] font-mono text-[10.5px] uppercase tracking-[2px] text-[#777]">
                        - Your pitch to the next Fortune 500 CIO
                      </p>
                    </blockquote>

                    <div className="flex flex-col md:flex-row gap-[12px]">
                      <button
                        onClick={() => router.push("/book-pilot")}
                        className="group bg-[#2563EB] text-white px-[30px] py-[14px] font-semibold tracking-tight text-[12px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#1d4ed8] transition flex items-center justify-center gap-[10px]"
                      >
                        Book Technical Deep Dive
                        <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                      </button>
                      <button
                        onClick={() => router.push("/platform-audit")}
                        className="group bg-transparent text-white px-[30px] py-[14px] font-semibold tracking-tight text-[12px] uppercase tracking-[1.5px] rounded-[4px] border border-white/20 hover:border-[#2563EB]/60 transition flex items-center justify-center gap-[10px]"
                      >
                        <FileText className="w-[14px] h-[14px]" />
                        Open Full Platform Audit
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* INLINE FOOTER */}
        <div className="max-w-[1000px] mx-auto px-[24px] md:px-[48px]">
          <div className="py-[40px] border-t border-[#1a1a1a]/8 text-center text-[13px] text-[#666]">
            <p>
              <strong className="text-[#1a1a1a]">Jataka</strong> - The Enterprise
              Context Engine
            </p>
            <p className="mt-[6px]">
              Confidential Data Room - For GCC &amp; Fortune 500 Distribution
              &nbsp;|&nbsp; (c) 2026 Jataka
            </p>
          </div>
        </div>
      </div>
    </>
  
    </MarketingShell>
  );
}
