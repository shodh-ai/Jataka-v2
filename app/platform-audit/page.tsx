"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Download,
  FileText,
  Lock,
  Calendar,
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
// JSON-LD
// ------------------------------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Jataka - Complete Platform Audit",
  description:
    "The autonomous Salesforce governance engine. From code review to compliance, Jataka guards your org at every stage of the development lifecycle.",
  url: "https://jataka.io/platform-audit",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jataka.io" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Platform Audit",
      item: "https://jataka.io/platform-audit",
    },
  ],
};

// ------------------------------------------------------------------
// Shared UI helpers
// ------------------------------------------------------------------
const SECTION_LABEL_CLS =
  "inline-block font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] bg-[#FF2424]/10 text-[#FF2424] px-[12px] py-[6px] rounded-[4px] mb-[16px]";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className={SECTION_LABEL_CLS}>{children}</span>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-archivo text-[clamp(28px,4vw,44px)] leading-[1.05] tracking-[-1px] uppercase mb-[16px]">
      {children}
    </h2>
  );
}

function H3({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className="font-archivo text-[clamp(20px,2.4vw,26px)] tracking-[-0.5px] uppercase mt-[40px] mb-[14px]"
    >
      {children}
    </h3>
  );
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-archivo text-[clamp(16px,1.8vw,18px)] tracking-[-0.3px] uppercase mt-[28px] mb-[10px] text-[#1a1a1a]">
      {children}
    </h4>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-[1.75] text-[#444] mb-[14px]">{children}</p>;
}

function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-[#1a1a1a]/8 border-l-4 border-l-[#FF2424] rounded-[8px] p-[20px] my-[24px]">
      <p className="font-archivo text-[13px] uppercase tracking-[1px] text-[#1a1a1a] mb-[6px]">
        {title}
      </p>
      <div className="text-[14.5px] leading-[1.65] text-[#444]">{children}</div>
    </div>
  );
}

function PRComment({
  tag,
  tone,
  children,
}: {
  tag: string;
  tone: "critical" | "warning" | "info";
  children: React.ReactNode;
}) {
  const toneCls =
    tone === "critical"
      ? "bg-[#fecaca] text-[#991b1b]"
      : tone === "warning"
      ? "bg-[#fef3c7] text-[#92400e]"
      : "bg-[#dbeafe] text-[#1e40af]";
  return (
    <div className="pr-mockup my-[20px]">
      <div className="pr-bar">
        <span className="dot dot-r"></span>
        <span className="dot dot-y"></span>
        <span className="dot dot-g"></span>
        <span className="ml-[8px]">PR review - Jataka</span>
      </div>
      <div className="p-[18px_20px] text-[13.5px] leading-[1.7] text-[#c9d1d9]">
        <span
          className={`inline-block ${toneCls} text-[11px] font-bold uppercase tracking-[0.5px] px-[8px] py-[3px] rounded-[4px] mb-[10px]`}
        >
          {tag}
        </span>
        <div className="space-y-[6px]">{children}</div>
      </div>
    </div>
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
// Table helpers
// ------------------------------------------------------------------
function Table({
  head,
  children,
}: {
  head: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto my-[20px] rounded-[10px] border border-[#1a1a1a]/8">
      <table className="w-full text-[13.5px] bg-white">
        <thead>
          <tr className="bg-[#FAF8F3]">{head}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left font-archivo font-normal uppercase tracking-[1px] text-[11px] text-[#1a1a1a]/70 px-[14px] py-[12px] border-b border-[#1a1a1a]/10">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-[14px] py-[12px] border-b border-[#1a1a1a]/6 align-top text-[#444] leading-[1.6]">
      {children}
    </td>
  );
}

// ------------------------------------------------------------------
// Sub-nav definition
// ------------------------------------------------------------------
const SUB_NAV: { href: string; label: string }[] = [
  { href: "#exec", label: "Executive Summary" },
  { href: "#arch", label: "Architecture" },
  { href: "#m1", label: "Limit Firewall" },
  { href: "#m2", label: "Tech Debt" },
  { href: "#m3", label: "QA" },
  { href: "#m4", label: "Dev XP" },
  { href: "#m5", label: "Enterprise" },
  { href: "#matrix", label: "Matrix" },
  { href: "#roi", label: "ROI" },
];

// ------------------------------------------------------------------
// Mermaid chart strings (verbatim from source)
// ------------------------------------------------------------------
const CHART_INTEGRATION = `flowchart LR
    subgraph CONNECT["Jataka Connects To"]
        G["GitHub\\nRepositories"]
        S["Salesforce\\nOrgs"]
        J["Jira\\nBoards"]
        SL["Slack\\nWorkspace"]
        IDE["IDE\\nCursor / VS Code"]
    end

    subgraph ENGINE["Jataka Engine"]
        E["Metadata Graph\\n+ AI Analysis\\n+ Governance Rules"]
    end

    subgraph ACTION["Automated Actions"]
        A1["PR Review Comments"]
        A2["PR Approve / Block"]
        A3["Auto-Fix Commits"]
        A4["Slack Responses"]
        A5["IDE Previews"]
        A6["Audit Reports"]
    end

    G --> E
    S --> E
    J --> E
    SL --> E
    IDE --> E
    E --> A1
    E --> A2
    E --> A3
    E --> A4
    E --> A5
    E --> A6`;

const CHART_LIFECYCLE = `flowchart TD
    A["DEVELOPER WRITES CODE\\nApex, LWC, Flows, Metadata\\nin IDE"]
    B["IDE ANALYSIS\\nBlast radius preview\\nField dependency map\\nLimit estimation"]
    C["PR CREATED ON GITHUB\\nCode pushed, PR opened"]
    D["Jataka PR REVIEW\\nFull automated analysis\\nacross all 5 modules"]
    E{"VIOLATIONS\\nFOUND?"}
    F["PR AUTO-APPROVED\\nAll checks pass"]
    G["PR BLOCKED\\nLine-level violation report\\nwith remediation steps"]
    H["AUTO-FIX GENERATED\\nAI creates fix commit"]
    I["DEPLOYED TO PRODUCTION"]
    J["SYNTHETIC MONITORING\\n24/7 production health checks"]

    A --> B --> C --> D --> E
    E -->|No| F --> I
    E -->|"Yes, auto-fixable"| H --> D
    E -->|"Yes, needs human"| G
    G -->|Developer fixes| C
    I --> J
    J -->|Issue detected| G`;

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

const CHART_LIMIT_FIREWALL = `flowchart TD
    PR["PR Submitted\nDeveloper pushes Apex/Flow changes"]
    PARSE["STEP 1: AST PARSING\nParse Apex into Abstract Syntax Tree\nMap every method, loop, DML, SOQL"]
    LOOP["STEP 2: LOOP DETECTION\nFind SOQL/DML inside loops\nIncluding indirect method calls"]
    CPU["STEP 3: CPU PROFILING\nEstimate CPU time for complex paths\nSync: 10,000ms / Async: 60,000ms"]
    SKEW["STEP 4: DATA SKEW\nAnalyze DML against org data\nFlag row-locking patterns"]
    API["STEP 5: API LIMITS\nCount callouts per transaction\nLimit: 100 sync / 200 async"]
    REPORT["VIOLATION REPORT\nFile + line number\nSeverity + fix suggestion"]
    DECIDE{"CRITICAL\nVIOLATIONS?"}
    BLOCK["PR BLOCKED"]
    APPROVE["PR APPROVED"]
    CTX{{"JATAKA CONTEXT GRAPH\nLive Production Data Map\ne.g., 80,000 Contacts\n+ Runtime physics"}}

    PR --> PARSE --> LOOP --> CPU --> SKEW --> API --> REPORT --> DECIDE
    DECIDE -->|Yes| BLOCK
    DECIDE -->|No| APPROVE
    CTX -. "Production volumes\ndrive the simulation" .-> CPU
    CTX -. "Org data distribution\npowers skew detection" .-> SKEW

    style CTX fill:#FF2424,stroke:#FF2424,stroke-width:2px,color:#ffffff`;

const CHART_TECH_DEBT = `flowchart TD
    CHANGE["CHANGE DETECTED\nNew PR with metadata changes"]
    CTX{{"JATAKA CONTEXT GRAPH\nEntire org history\n+ 360-degree\ndependency map"}}
    DUP["DUPLICATE SCAN\nCompare new fields vs all\nexisting org fields"]
    ORPHAN["ORPHAN DISCOVERY\nDependency graph analysis\nFind zero-reference metadata"]
    ARCH["ARCHITECTURE CHECK\\nEnforce Flows over Triggers\\nHandler patterns, naming"]
    LOGIC["BUSINESS LOGIC\\nVerify org-specific rules"]
    BEST["BEST PRACTICES\\nCRUD/FLS, sharing,\\ncoverage, patterns"]
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
    CHANGE --> LOGIC
    CHANGE --> BEST
    CHANGE --> BULK
    DUP --> SCORE
    ORPHAN --> CLEAN --> SCORE
    ARCH --> SCORE
    LOGIC --> SCORE
    BEST --> SCORE
    BULK --> AUTOFIX
    SCORE --> DECIDE
    DECIDE -->|Auto-fixable| AUTOFIX
    DECIDE -->|Policy violation| BLOCK
    DECIDE -->|Clean| PASS`;

const CHART_QA = `flowchart TD
    TRIGGER["TEST TRIGGERED\nPR merge, schedule, or on-demand"]
    CTX{{"JATAKA CONTEXT GRAPH\nJira Acceptance Criteria\n+ Business intent\n+ Org schema"}}
    SEED["SMART DATA SEEDING\nGenerate minimal test records\nrespecting all field constraints"]
    EXEC["UI TEST EXECUTION\nHeadless browser runs E2E tests\nagainst Salesforce UI"]
    HEAL{"SELECTOR\nBROKEN?"}
    VISION["VISION AI HEALING\nScreenshot page, find element\nvisually, update selector"]
    RECORD["VIDEO RECORDING\nRecord every step for\naudit evidence"]
    VERIFY["LOGIC VERIFICATION\nMathematically prove\nrefactored code equivalence"]
    REPORT["QA REPORT\nPass/fail, videos,\ncoverage, proof status"]

    TRIGGER --> CTX
    CTX --> SEED --> EXEC --> HEAL
    HEAL -->|Yes| VISION --> EXEC
    HEAL -->|No| RECORD --> VERIFY --> REPORT
    CTX -. "Business intent\npowers visual healing" .-> VISION

    style CTX fill:#FF2424,stroke:#FF2424,stroke-width:2px,color:#ffffff`;

const CHART_DEVXP = `flowchart TD
    subgraph IDE_FLOW["IDE INTEGRATION"]
        DEV["Developer edits\\na field in Cursor"]
        BLAST["Jataka shows blast radius:\\n3 Flows, 2 Apex classes,\\n5 Reports, 1 Validation Rule"]
        WARN["Changing this field\\nbreaks Flow 'Lead Assignment'"]
        DEV --> BLAST --> WARN
    end

    subgraph SLACK_FLOW["SLACK BOT"]
        Q["'What happens when\\nan Opp stage changes\\nto Closed Won?'"]
        ANS["1. Trigger OppTrigger fires\\n2. Flow sends notification\\n3. Revenue Schedule created\\n4. Account field updated\\n5. Outbound msg to ERP"]
        Q --> ANS
    end

    subgraph JIRA_FLOW["JIRA ALIGNMENT"]
        JIRA["Jira says: Add Status__c\\nand create update Flow"]
        CHECK["Status__c field found\\nFlow found\\nFlow doesn't fire on Case close\\nMissing test coverage"]
        JIRA --> CHECK
    end`;

const CHART_ENTERPRISE = `flowchart TD
    subgraph MA["M&A ORG MERGE"]
        MA1A{{"ORG A\nCONTEXT GRAPH"}} --> MA3
        MA1B{{"ORG B\nCONTEXT GRAPH"}} --> MA3
        MA3["MASTER JATAKA\nOVERLAP GRAPH\nmathematical comparison"] --> MA4["Generate Merge Report\nwith migration plan"]
    end

    subgraph SEC["SECURITY AUDIT"]
        S1["Select sensitive field"] --> S2["Trace access:\\nProfiles, PermSets,\\nSharing Rules, OWD"] --> S3["Generate compliance report\\nUser-Field access matrix"]
    end

    subgraph API["API CONTRACT"]
        APCTX{{"JATAKA CONTEXT GRAPH\nAuto-discovered\ninbound + outbound\ndependencies"}} --> AP2["PR modifies contracted field"] --> AP3["Auto-block PR\nNotify integration owner\n(SAP / MuleSoft / Workday)"]
    end

    subgraph MON["SYNTHETIC MONITORING"]
        MO1["Define critical paths\\nLead, Opp, Case flows"] --> MO2["Run against PROD\\nevery 15 minutes"] --> MO3["Alert on failure\\nSlack + Jira incident"]
    end

    subgraph MIG["LEGACY MIGRATION"]
        MI1["Scan for Workflow Rules"] --> MI2["Parse conditions + actions"] --> MI3["Generate equivalent Flow"] --> MI4["Create PR with\nFlow + tests + proof"]
    end

    style APCTX fill:#FF2424,stroke:#FF2424,stroke-width:2px,color:#ffffff
    style MA1A fill:#FF2424,stroke:#FF2424,stroke-width:2px,color:#ffffff
    style MA1B fill:#FF2424,stroke:#FF2424,stroke-width:2px,color:#ffffff
    style MA3 fill:#1a1a1a,stroke:#FF2424,stroke-width:2px,color:#ffffff`;

// ------------------------------------------------------------------
// Capability matrix rows
// ------------------------------------------------------------------
const MATRIX_ROWS: {
  n: number;
  module: string;
  cap: string;
  what: string;
  benefit: string;
}[] = [
  { n: 1, module: "Limit Firewall", cap: "SOQL/DML Loop Prevention", what: "Blocks database queries inside loops at PR level", benefit: "Eliminates #1 limit breach cause" },
  { n: 2, module: "Limit Firewall", cap: "CPU Timeout Detection", what: "Profiles Apex/Flows for CPU time estimation", benefit: "Prevents timeout errors" },
  { n: 3, module: "Limit Firewall", cap: "Data Skew Detection", what: "Flags row-locking patterns before deployment", benefit: "Prevents lock errors at scale" },
  { n: 4, module: "Limit Firewall", cap: "API Limit Enforcement", what: "Validates outbound callout counts", benefit: "Prevents integration failures" },
  { n: 5, module: "Tech Debt", cap: "Duplicate Field Prevention", what: "Blocks redundant custom field creation", benefit: "30-40% less metadata bloat" },
  { n: 6, module: "Tech Debt", cap: "Orphan Node Discovery", what: "Finds dead metadata safe for deletion", benefit: "Clean, performant org" },
  { n: 7, module: "Tech Debt", cap: "Architecture Enforcement", what: "Auto-reject non-compliant patterns", benefit: "Consistent architecture" },
  { n: 8, module: "Tech Debt", cap: "Autonomous Cleanup", what: "Auto-generate deletion XML packages", benefit: "Zero manual cleanup" },
  { n: 9, module: "Tech Debt", cap: "Apex Bulkification", what: "Auto-refactor to bulk-safe code", benefit: "Scalable, limit-safe code" },
  { n: 10, module: "Tech Debt", cap: "Business Logic Enforcement", what: "Check PRs against business rules", benefit: "Domain policy compliance" },
  { n: 11, module: "Tech Debt", cap: "Best Practice Maintenance", what: "Every push checked for best practices", benefit: "Consistent code quality" },
  { n: 12, module: "QA", cap: "Self-Healing UI Tests", what: "Vision AI fixes broken selectors", benefit: "90% less test maintenance" },
  { n: 13, module: "QA", cap: "Video Logs", what: "Auto-record every test execution", benefit: "Audit-ready evidence" },
  { n: 14, module: "QA", cap: "Smart Data Seeding", what: "Generate minimal test records", benefit: "50% fewer sandbox refreshes" },
  { n: 15, module: "QA", cap: "Verification Protocol", what: "Mathematically prove code equivalence", benefit: "Zero regressions" },
  { n: 16, module: "Dev XP", cap: "IDE Blast Radius", what: "Show all dependencies in real-time", benefit: "80% fewer side effects" },
  { n: 17, module: "Dev XP", cap: "Slack Bot", what: "Natural language org queries", benefit: "Hours saved weekly" },
  { n: 18, module: "Dev XP", cap: "Jira Alignment", what: "Verify PR meets acceptance criteria", benefit: "Requirement traceability" },
  { n: 19, module: "Enterprise", cap: "M&A Org Merge Mapping", what: "Compare orgs, map overlap", benefit: "Months to days" },
  { n: 20, module: "Enterprise", cap: "Security Audits", what: "Trace user access across profiles", benefit: "SOX/HIPAA/GDPR compliant" },
  { n: 21, module: "Enterprise", cap: "API Contract Guardian", what: "Block integration-breaking changes", benefit: "Zero breaking deploys" },
  { n: 22, module: "Enterprise", cap: "Synthetic Monitoring", what: "24/7 production health tests", benefit: "Detect outages in minutes" },
  { n: 23, module: "Enterprise", cap: "Legacy Migration", what: "Auto-convert Workflows to Flows", benefit: "Automated modernization" },
];

// ------------------------------------------------------------------
// Impact card
// ------------------------------------------------------------------
function ImpactCard({
  label,
  value,
  desc,
}: {
  label: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="bg-white border border-[#1a1a1a]/8 rounded-[12px] p-[20px]">
      <p className="font-mono text-[10.5px] font-bold uppercase tracking-[2px] text-[#FF2424] mb-[10px]">
        {label}
      </p>
      <p className="font-archivo text-[36px] leading-[1] tracking-[-1.5px] text-[#1a1a1a] mb-[8px]">
        {value}
      </p>
      <p className="text-[12.5px] text-[#666] leading-[1.5]">{desc}</p>
    </div>
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
  interface Window {
    mermaid?: MermaidGlobal;
  }
}

// ------------------------------------------------------------------
// Main page
// ------------------------------------------------------------------
export default function PlatformAuditPage() {
  const router = useRouter();

  const initMermaid = () => {
    if (typeof window === "undefined" || !window.mermaid) return;
    window.mermaid.initialize({
      startOnLoad: true,
      theme: "base",
      themeVariables: {
        primaryColor: "#FFFFFF",
        primaryTextColor: "#1a1a1a",
        primaryBorderColor: "#FF2424",
        lineColor: "#1a1a1a",
        secondaryColor: "#FAF8F3",
        tertiaryColor: "#F5F3ED",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "13px",
      },
      flowchart: { htmlLabels: true, curve: "basis", padding: 15 },
    });
    window.mermaid.run();
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="afterInteractive"
        onLoad={initMermaid}
      />

      {/* Print styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          header,
          .pa-subnav,
          .pa-print-hide {
            display: none !important;
          }
          body {
            background: #fff !important;
          }
          .pa-shell {
            background: #fff !important;
          }
          section {
            page-break-inside: avoid;
          }
        }
      `,
        }}
      />

      <div className="pa-shell min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">
        {/* STICKY SUB-NAV */}
        <nav className="pa-subnav sticky top-[64px] z-40 bg-[#FAF8F3]/90 backdrop-blur-md border-b border-[#1a1a1a]/8">
          <div className="max-w-[1100px] mx-auto px-[16px] md:px-[32px] py-[10px] flex items-center justify-between gap-[16px]">
            <div className="flex items-center gap-[8px] overflow-x-auto scrollbar-hide">
              {SUB_NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex-shrink-0 text-[11.5px] font-mono font-semibold uppercase tracking-[1.2px] text-[#444] hover:text-[#FF2424] px-[10px] py-[6px] rounded-[4px] hover:bg-[#FF2424]/8 transition"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => typeof window !== "undefined" && window.print()}
              className="pa-print-hide flex-shrink-0 bg-[#FF2424] text-white px-[14px] py-[7px] font-archivo text-[10.5px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition inline-flex items-center gap-[6px]"
            >
              <Download className="w-[12px] h-[12px]" />
              Export PDF
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="pt-[70px] pb-[40px] px-[24px] md:px-[48px] border-b border-[#1a1a1a]/8">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[20px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424] rounded-[4px]">
                <FileText className="w-[14px] h-[14px]" />
                Complete Platform Audit
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5.6vw,64px)] leading-[1.02] tracking-[-2px] uppercase mb-[20px]">
                Jataka - <br />
                <span className="text-[#FF2424]">Complete Platform Audit</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex flex-wrap justify-center gap-x-[22px] gap-y-[8px] text-[12.5px] text-[#666] mb-[22px] font-mono uppercase tracking-[1px]">
                <span className="inline-flex items-center gap-[6px]">
                  <FileText className="w-[12px] h-[12px]" /> Product Architecture & Capability Audit
                </span>
                <span className="inline-flex items-center gap-[6px]">
                  <Lock className="w-[12px] h-[12px]" /> Internal / Client-Facing
                </span>
                <span className="inline-flex items-center gap-[6px]">
                  <Calendar className="w-[12px] h-[12px]" /> April 2026 - v1.0
                </span>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <p className="text-[17px] leading-[1.7] text-[#444] max-w-[720px] mx-auto">
                The autonomous Salesforce governance engine. From code review to compliance,
                Jataka guards your org at every stage of the development lifecycle.
              </p>
            </Reveal>
          </div>
        </section>

        {/* BODY CONTAINER */}
        <div className="max-w-[1000px] mx-auto px-[24px] md:px-[48px]">
          {/* TOC */}
          <section className="py-[40px]">
            <Reveal>
              <div className="bg-white border border-[#1a1a1a]/8 rounded-[12px] p-[28px] md:p-[36px]">
                <H3>Table of Contents</H3>
                <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[10px] mt-[16px] list-none p-0">
                  {[
                    ["#exec", "01 - Executive Summary"],
                    ["#arch", "02 - Platform Architecture"],
                    ["#m1", "03 - Module 1 - The Limit Firewall"],
                    ["#m2", "04 - Module 2 - Tech Debt & Architecture"],
                    ["#m3", "05 - Module 3 - Autonomous QA"],
                    ["#m4", "06 - Module 4 - Developer Experience"],
                    ["#m5", "07 - Module 5 - Enterprise Use Cases"],
                    ["#matrix", "08 - Complete Capability Matrix"],
                    ["#roi", "09 - Business Impact & ROI"],
                  ].map(([href, label]) => (
                    <li key={href} className="flex items-start gap-[10px]">
                      <span className="w-[6px] h-[6px] rounded-full bg-[#FF2424] mt-[8px] flex-shrink-0" />
                      <a
                        href={href}
                        className="text-[14.5px] font-medium text-[#1a1a1a] hover:text-[#FF2424] transition"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </section>

          {/* 01 EXECUTIVE SUMMARY */}
          <section id="exec" className="py-[48px] border-t border-[#1a1a1a]/8">
            <Reveal>
              <SectionLabel>Section 01</SectionLabel>
              <H2>Executive Summary</H2>
              <P>
                Jataka is an <strong>autonomous Salesforce governance platform</strong> that
                acts as an intelligent layer across the entire Salesforce development lifecycle.
                It connects to your GitHub repositories, Salesforce orgs, Jira boards, and
                developer tools - analyzing every code change, metadata modification, and
                configuration update before it reaches production.
              </P>

              <H3>The Problem</H3>
              <P>
                Salesforce orgs grow uncontrollably. Every team adds fields, writes triggers,
                builds flows, and creates automation - without visibility into what already
                exists or what might break.
              </P>

              <Table
                head={
                  <>
                    <Th>Problem</Th>
                    <Th>Jataka Solution</Th>
                    <Th>Impact</Th>
                  </>
                }
              >
                <tr>
                  <Td>SOQL queries inside loops cause production outages</Td>
                  <Td>Limit Firewall blocks them at PR level before merge</Td>
                  <Td><strong>Zero</strong> governor limit incidents</Td>
                </tr>
                <tr>
                  <Td>Developers create duplicate fields</Td>
                  <Td>Duplicate Field Prevention cross-references entire org</Td>
                  <Td><strong>30-40%</strong> reduction in metadata bloat</Td>
                </tr>
                <tr>
                  <Td>UI tests break when Salesforce updates DOM</Td>
                  <Td>Vision AI self-heals broken selectors automatically</Td>
                  <Td><strong>90%</strong> reduction in test maintenance</Td>
                </tr>
                <tr>
                  <Td>No one knows blast radius of changing a field</Td>
                  <Td>IDE integration shows every dependency in real-time</Td>
                  <Td><strong>80%</strong> fewer unintended side effects</Td>
                </tr>
                <tr>
                  <Td>M&A requires manual metadata comparison</Td>
                  <Td>Automated org merge mapping with overlap report</Td>
                  <Td>Due diligence: <strong>months to days</strong></Td>
                </tr>
                <tr>
                  <Td>Compliance audits require manual access tracing</Td>
                  <Td>Automated security access reports across all profiles</Td>
                  <Td>Audit reports in <strong>minutes</strong></Td>
                </tr>
              </Table>

              <H3>How It Integrates</H3>
              <MermaidBlock chart={CHART_INTEGRATION} />
            </Reveal>
          </section>

          {/* 02 ARCHITECTURE */}
          <section id="arch" className="py-[48px] border-t border-[#1a1a1a]/8">
            <Reveal>
              <SectionLabel>Section 02</SectionLabel>
              <H2>Platform Architecture - How Jataka Works</H2>

              <H3>2.1 End-to-End Lifecycle Flow</H3>
              <P>
                Jataka operates across the <strong>entire development lifecycle</strong> -
                from the moment a developer opens their IDE to production monitoring after
                deployment.
              </P>
              <MermaidBlock chart={CHART_LIFECYCLE} />

              <H3>2.2 What Happens During PR Review - Detailed Breakdown</H3>
              <P>
                When a PR is created, Jataka performs a comprehensive analysis. Here is
                exactly what gets analyzed, in what order, and what outputs are produced.
              </P>
              <MermaidBlock chart={CHART_PR_REVIEW} />
            </Reveal>
          </section>

          {/* M1 LIMIT FIREWALL */}
          <section id="m1" className="py-[48px] border-t border-[#1a1a1a]/8">
            <Reveal>
              <SectionLabel>Module 01</SectionLabel>
              <H2>The Limit Firewall</H2>
              <P>
                Prevents Salesforce governor limit violations before they reach production.
                Governor limits are hard caps enforced per transaction - exceeding them crashes
                the entire transaction. This is the <strong>#1 cause of production outages</strong>
                {" "}in Salesforce.
              </P>

              <H3>How It Works</H3>
              <MermaidBlock chart={CHART_LIMIT_FIREWALL} />

              <H3>Capabilities</H3>

              <H4>3.3.1 - Prevent SOQL & DML Loops</H4>
              <P>
                <strong>What it detects:</strong> Any SOQL query or DML operation that executes
                inside a loop. Also detects <em>indirect</em> calls - method A calls method B
                inside a loop, and method B has SOQL.
              </P>
              <P>
                <strong>Why it matters:</strong> Salesforce enforces 100 SOQL queries and 150 DML
                statements per transaction. A loop over 200 records with one query per iteration
                crashes at iteration 101.
              </P>

              <PRComment tag="Critical - SOQL Query Inside Loop" tone="critical">
                <p>
                  <strong>AccountService.cls:47</strong>
                </p>
                <p>
                  A SOQL query{" "}
                  <code className="bg-[#30363D] text-[#79c0ff] px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                    [SELECT Id, Name FROM Contact WHERE AccountId = :acc.Id]
                  </code>{" "}
                  is executed inside a{" "}
                  <code className="bg-[#30363D] text-[#79c0ff] px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                    for
                  </code>{" "}
                  loop iterating over{" "}
                  <code className="bg-[#30363D] text-[#79c0ff] px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                    accounts
                  </code>
                  . If there are more than 100 records, this throws{" "}
                  <code className="bg-[#30363D] text-[#79c0ff] px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                    System.LimitException
                  </code>
                  .
                </p>
                <p>
                  <strong>Fix:</strong> Move the query before the loop and use a Map to access
                  results.
                </p>
              </PRComment>

              <H4>3.3.2 - Catch CPU Timeouts</H4>
              <P>
                <strong>What it detects:</strong> Code paths where estimated CPU execution time
                approaches Salesforce&apos;s limit (10s sync, 60s async).
              </P>
              <P>
                <strong>How:</strong> Analyzes algorithmic complexity - loop nesting depth,
                collection operations, string manipulation. Flags paths estimated to consume
                &gt;70% of CPU limit.
              </P>

              <H4>3.3.3 - Detect Data Skew</H4>
              <P>
                <strong>What it detects:</strong> DML patterns that cause row-locking errors -
                parent records with 10K+ children, lookup skew on shared objects, ownership
                concentration.
              </P>
              <P>
                <strong>How:</strong> Cross-references DML operations against the org&apos;s
                actual data distribution.
              </P>

              <H4>3.3.4 - Enforce API Limits</H4>
              <P>
                <strong>What it detects:</strong> Outbound HTTP callouts exceeding 100/transaction.
                Also checks for missing async patterns in batch callout scenarios.
              </P>

              <Table
                head={
                  <>
                    <Th>Check</Th>
                    <Th>SF Limit</Th>
                    <Th>Detection Method</Th>
                    <Th>Severity</Th>
                  </>
                }
              >
                <tr>
                  <Td>SOQL in loops</Td>
                  <Td>100 queries/txn</Td>
                  <Td>AST + indirect call tracing</Td>
                  <Td><strong className="text-[#FF2424]">Critical</strong></Td>
                </tr>
                <tr>
                  <Td>DML in loops</Td>
                  <Td>150 statements/txn</Td>
                  <Td>AST + indirect call tracing</Td>
                  <Td><strong className="text-[#FF2424]">Critical</strong></Td>
                </tr>
                <tr>
                  <Td>CPU time</Td>
                  <Td>10,000ms / 60,000ms</Td>
                  <Td>Complexity estimation</Td>
                  <Td><strong className="text-[#FF2424]">Critical</strong></Td>
                </tr>
                <tr>
                  <Td>Data skew</Td>
                  <Td>Row lock contention</Td>
                  <Td>Org data distribution analysis</Td>
                  <Td><strong className="text-[#d97706]">Warning</strong></Td>
                </tr>
                <tr>
                  <Td>API callouts</Td>
                  <Td>100 sync / 200 async</Td>
                  <Td>Callout path tracing</Td>
                  <Td><strong className="text-[#FF2424]">Critical</strong></Td>
                </tr>
              </Table>

              <Callout title="Why This Matters">
                Governor limit violations are the most common cause of Salesforce production
                outages. Traditional code reviews catch ~30%. Jataka provides{" "}
                <strong>100% automated coverage</strong> across every PR - eliminating 95%+
                governor limit incidents.
              </Callout>
            </Reveal>
          </section>

          {/* M2 TECH DEBT */}
          <section id="m2" className="py-[48px] border-t border-[#1a1a1a]/8">
            <Reveal>
              <SectionLabel>Module 02</SectionLabel>
              <H2>Tech Debt & Architecture Governance</H2>
              <P>
                Prevents new technical debt from entering the org and autonomously remediates
                existing debt. Enforces architecture standards, blocks redundant metadata,
                discovers dead code, and auto-refactors patterns.
              </P>

              <H3>How It Works</H3>
              <MermaidBlock chart={CHART_TECH_DEBT} />

              <H3>Capabilities</H3>

              <H4>4.3.1 - Duplicate Field Prevention</H4>
              <P>
                When a developer creates a new custom field, Jataka searches the{" "}
                <strong>entire org metadata</strong> for existing fields that serve the same
                purpose. Checks name similarity, data type, picklist values, and usage patterns.
                If &gt;85% match, PR blocked.
              </P>

              <PRComment tag="Critical - Potential Duplicate Field" tone="critical">
                <p>
                  <strong>Field:</strong>{" "}
                  <code className="bg-[#30363D] text-[#79c0ff] px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                    Account.Customer_Status__c
                  </code>
                </p>
                <p>
                  This appears to duplicate{" "}
                  <code className="bg-[#30363D] text-[#79c0ff] px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                    Account.Account_Status__c
                  </code>
                  :
                </p>
                <p>- Name similarity: 87% &nbsp; - Both Picklist type &nbsp; - 4/5 values identical</p>
                <p>
                  <strong>Existing field:</strong> Created 2023-04-15, used by 3 Flows, 2 Apex
                  classes, 5 reports
                </p>
              </PRComment>

              <H4>4.3.2 - Orphan Node Discovery</H4>
              <P>
                Builds a complete <strong>dependency graph</strong> of every metadata component.
                Identifies components with zero inbound references - dead fields, unused classes,
                abandoned Flows. Assigns confidence scores (80-100%).
              </P>

              <H4>4.3.3 - Architecture Enforcement</H4>
              <Table
                head={
                  <>
                    <Th>Rule</Th>
                    <Th>What It Blocks</Th>
                    <Th>Why</Th>
                  </>
                }
              >
                <tr>
                  <Td>No simple triggers</Td>
                  <Td>Inline trigger logic</Td>
                  <Td>Must use handler pattern or Flow</Td>
                </tr>
                <tr>
                  <Td>No hardcoded IDs</Td>
                  <Td>
                    <code className="bg-[#FAF8F3] border border-[#1a1a1a]/10 px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                      Id profileId = &apos;00e...&apos;
                    </code>
                  </Td>
                  <Td>Breaks across environments</Td>
                </tr>
                <tr>
                  <Td>No empty test asserts</Td>
                  <Td>Tests without assertions</Td>
                  <Td>False confidence - tests nothing</Td>
                </tr>
                <tr>
                  <Td>Separation of concerns</Td>
                  <Td>Logic in trigger body</Td>
                  <Td>Use service/handler classes</Td>
                </tr>
                <tr>
                  <Td>Error handling</Td>
                  <Td>
                    Bare{" "}
                    <code className="bg-[#FAF8F3] border border-[#1a1a1a]/10 px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                      try/catch
                    </code>{" "}
                    blocks
                  </Td>
                  <Td>Swallowed exceptions hide bugs</Td>
                </tr>
              </Table>

              <H4>4.3.4 - Autonomous Cleanup</H4>
              <P>
                Auto-generates{" "}
                <code className="bg-[#FAF8F3] border border-[#1a1a1a]/10 px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                  destructiveChanges.xml
                </code>{" "}
                deployment packages for confirmed orphan metadata. Ready to deploy - just review
                and ship.
              </P>

              <H4>4.3.5 - Apex Bulkification</H4>
              <P>
                Detects single-record patterns in Apex and{" "}
                <strong>autonomously refactors</strong> into bulk-safe logic using Maps, Sets,
                and Lists. Pushes refactored code as a fix commit, verified by the{" "}
                <a href="#m3" className="text-[#FF2424] underline">
                  Verification Protocol
                </a>
                .
              </P>

              <H4>4.3.6 - Business Logic Enforcement</H4>
              <P>
                Every PR checked against org-specific business rules: naming conventions,
                validation standards, approval process policies, state machine transitions - all
                machine-enforced.
              </P>

              <H4>4.3.7 - Best Practice Maintenance</H4>
              <P>
                Every push verified for:{" "}
                <code className="bg-[#FAF8F3] border border-[#1a1a1a]/10 px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                  with sharing
                </code>{" "}
                usage, CRUD/FLS checks, test coverage thresholds, async patterns, collection
                efficiency, SOQL pagination.
              </P>

              <Callout title="Why This Matters">
                A typical enterprise org has <strong>30-40% redundant metadata</strong>. Jataka
                prevents new debt, remediates existing debt, and saves 10+ hours per developer per
                month through automated refactoring.
              </Callout>
            </Reveal>
          </section>

          {/* M3 AUTONOMOUS QA */}
          <section id="m3" className="py-[48px] border-t border-[#1a1a1a]/8">
            <Reveal>
              <SectionLabel>Module 03</SectionLabel>
              <H2>Autonomous QA</H2>
              <P>
                Self-healing tests, automated video evidence, intelligent data seeding, and
                mathematical verification of business logic correctness.
              </P>

              <H3>How It Works</H3>
              <MermaidBlock chart={CHART_QA} />

              <H3>Capabilities</H3>

              <H4>5.3.1 - Self-Healing UI Tests</H4>
              <P>
                <strong>The problem:</strong> Salesforce releases 3 major updates/year. Each can
                change CSS class names and DOM structure. Every UI test breaks - even though the
                app works fine. QA teams spend 2-4 weeks per release fixing selectors.
              </P>
              <P>
                <strong>The solution:</strong> When a selector fails, Jataka takes a{" "}
                <strong>screenshot</strong> and uses Vision AI to locate the element visually (by
                button text, position, appearance). The selector is auto-updated and the test
                continues.
              </P>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] my-[24px]">
                <ImpactCard
                  label="Test Maintenance"
                  value="-90%"
                  desc="Reduction in test maintenance effort"
                />
                <ImpactCard
                  label="SF Release Impact"
                  value="0 days"
                  desc="Downtime from selector breakage"
                />
              </div>

              <H4>5.3.2 - Video Logs</H4>
              <P>
                Every test execution auto-recorded as video. Shows every click, keystroke, page
                navigation, and data verification. Serves as{" "}
                <strong>irrefutable audit evidence</strong> for SOX, HIPAA, SOC2 compliance.
              </P>

              <H4>5.3.3 - Smart Data Seeding</H4>
              <P>
                Generates the <strong>minimal viable dataset</strong> per test - respecting
                required fields, lookup relationships, validation rules, and picklist values.
                Records auto-cleaned after test. Zero sandbox bloat.
              </P>
              <P>
                <em>Example:</em> To test Opportunity closure, generates 1 Account + 1 Contact +
                1 Opportunity + 1 LineItem. Total: 4 records. Created in 2 seconds. Auto-cleaned.
              </P>

              <H4>5.3.4 - Verification Protocol</H4>
              <P>
                When Jataka refactors code, the protocol{" "}
                <strong>mathematically proves</strong> the refactored version produces identical
                output for all possible inputs. Zero tolerance - even one divergence rejects the
                refactoring.
              </P>

              <Callout title="Why This Matters">
                Tests fix themselves. Data seeds itself. Code correctness is{" "}
                <strong>mathematically guaranteed</strong>. Video evidence satisfies auditors
                without manual documentation.
              </Callout>
            </Reveal>
          </section>

          {/* M4 DEV XP */}
          <section id="m4" className="py-[48px] border-t border-[#1a1a1a]/8">
            <Reveal>
              <SectionLabel>Module 04</SectionLabel>
              <H2>Developer Experience</H2>
              <P>
                Embeds intelligence directly into the IDE, Slack, and Jira - no context-switching
                required.
              </P>

              <H3>How It Works</H3>
              <MermaidBlock chart={CHART_DEVXP} />

              <H3>Capabilities</H3>

              <H4>6.3.1 - IDE Integration: Blast Radius Preview</H4>
              <P>
                Inside Cursor/VSCode, see the <strong>complete impact</strong> of any change
                before saving. Modify a field? Instantly see every Flow, Apex class, Report,
                Validation Rule, Page Layout, and integration that references it.
              </P>

              <PRComment tag="Warning - Blast Radius - Account.Customer_Rating__c" tone="warning">
                <p>Renaming this field will break:</p>
                <p>
                  - <strong>Flow &quot;Lead Scoring&quot;</strong> - reads field at Decision Node
                  3
                </p>
                <p>
                  - <strong>Apex &quot;AccountService&quot;</strong> - queries field at line 47
                </p>
                <p>
                  - <strong>Report &quot;Top Accounts&quot;</strong> - filters on this field
                </p>
                <p>
                  - <strong>Page Layout &quot;Account Layout&quot;</strong> - displays this field
                </p>
                <p>
                  <strong>Total impact: 4 components will break</strong>
                </p>
              </PRComment>

              <H4>6.3.2 - Slack Bot</H4>
              <P>
                Ask plain-English questions in Slack. Jataka responds with graph-backed answers:
              </P>
              <Table
                head={
                  <>
                    <Th>Question</Th>
                    <Th>Response</Th>
                  </>
                }
              >
                <tr>
                  <Td>&quot;Which Flows reference Account.Status__c?&quot;</Td>
                  <Td>
                    Lists all 5 Flows with names, versions, and which nodes reference the field
                  </Td>
                </tr>
                <tr>
                  <Td>&quot;What happens when a Lead is converted?&quot;</Td>
                  <Td>
                    Full execution trace: triggers to flows to process builders to field updates
                  </Td>
                </tr>
                <tr>
                  <Td>&quot;Who can see Contact.SSN__c?&quot;</Td>
                  <Td>Lists profiles and permission sets with field-level read access</Td>
                </tr>
                <tr>
                  <Td>&quot;What would break if I delete OpportunityLineItem?&quot;</Td>
                  <Td>Full dependency analysis across all metadata types</Td>
                </tr>
              </Table>

              <H4>6.3.3 - Jira Alignment</H4>
              <P>
                Reads Jira acceptance criteria and verifies the PR actually implements what was
                specified. Catches requirement gaps at code review time - not UAT.
              </P>

              <Callout title="Why This Matters">
                Eliminates context-switching. Developers get org intelligence{" "}
                <strong>where they already work</strong> - IDE, Slack, Jira. New team members
                become productive in days instead of weeks.
              </Callout>
            </Reveal>
          </section>

          {/* M5 ENTERPRISE */}
          <section id="m5" className="py-[48px] border-t border-[#1a1a1a]/8">
            <Reveal>
              <SectionLabel>Module 05</SectionLabel>
              <H2>Enterprise Use Cases</H2>
              <P>
                Purpose-built capabilities for M&A, compliance, integration governance, production
                monitoring, and legacy modernization.
              </P>

              <H3>How It Works</H3>
              <MermaidBlock chart={CHART_ENTERPRISE} />

              <H3>Capabilities</H3>

              <H4>7.3.1 - M&A Org Merge Mapping</H4>
              <P>
                Connects to both Salesforce orgs, extracts full metadata, and produces a{" "}
                <strong>complete overlap report</strong>: identical components, conflicts, unique
                items, and estimated merge effort.
              </P>

              <Table
                head={
                  <>
                    <Th>Component</Th>
                    <Th>Org A</Th>
                    <Th>Org B</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </>
                }
              >
                <tr>
                  <Td>
                    <code className="bg-[#FAF8F3] border border-[#1a1a1a]/10 px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                      Account.Revenue__c
                    </code>
                  </Td>
                  <Td>Currency</Td>
                  <Td>Currency</Td>
                  <Td>Identical</Td>
                  <Td>Keep one</Td>
                </tr>
                <tr>
                  <Td>
                    <code className="bg-[#FAF8F3] border border-[#1a1a1a]/10 px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                      Account.Status__c
                    </code>
                  </Td>
                  <Td>Picklist (5)</Td>
                  <Td>Picklist (8)</Td>
                  <Td>Conflict</Td>
                  <Td>Merge values</Td>
                </tr>
                <tr>
                  <Td>
                    <code className="bg-[#FAF8F3] border border-[#1a1a1a]/10 px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                      LeadScoring
                    </code>{" "}
                    Flow
                  </Td>
                  <Td>Active</Td>
                  <Td>N/A</Td>
                  <Td>Unique to A</Td>
                  <Td>Migrate</Td>
                </tr>
                <tr>
                  <Td>
                    <code className="bg-[#FAF8F3] border border-[#1a1a1a]/10 px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                      AccountTrigger
                    </code>
                  </Td>
                  <Td>Handler pattern</Td>
                  <Td>Inline</Td>
                  <Td>Conflict</Td>
                  <Td>Use Org A</Td>
                </tr>
              </Table>
              <P>
                <strong>Impact:</strong> M&A due-diligence reduced from{" "}
                <strong>months to days</strong>.
              </P>

              <H4>7.3.2 - Security Audits</H4>
              <P>
                Traces every access path from any user to any field: Profiles to Permission Sets
                to Permission Set Groups to Sharing Rules to OWD. Generates{" "}
                <strong>compliance-ready reports</strong> for SOX, HIPAA, GDPR, SOC2.
              </P>

              <H4>7.3.3 - API Contract Guardian</H4>
              <P>
                Maintains a registry of fields consumed by external systems. Any PR that modifies
                or deletes a contracted field is <strong>auto-blocked</strong> with the
                integration owner notified.
              </P>

              <PRComment tag="Critical - API Contract Violation" tone="critical">
                <p>
                  <code className="bg-[#30363D] text-[#79c0ff] px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                    Account.Revenue__c
                  </code>{" "}
                  is consumed by <strong>SAP ERP Integration</strong>.
                </p>
                <p>
                  Contact:{" "}
                  <code className="bg-[#30363D] text-[#79c0ff] px-[6px] py-[2px] rounded-[3px] font-mono text-[12px]">
                    integration-team@company.com
                  </code>
                </p>
                <p>This field cannot be modified without integration owner approval.</p>
              </PRComment>

              <H4>7.3.4 - Synthetic Monitoring</H4>
              <P>
                Runs lightweight, non-destructive test scenarios against{" "}
                <strong>Production</strong> every 15 minutes. Verifies critical business
                processes work. Alerts via Slack + auto-creates Jira incident on failure.
              </P>

              <H4>7.3.5 - Legacy Migration (Workflow Rules to Flows)</H4>
              <P>
                Autonomously translates retiring Workflow Rules into modern Flow equivalents -
                preserving all conditions, field updates, email alerts, and outbound messages.
                Behavioral equivalence verified by the Verification Protocol.
              </P>

              <Callout title="Why This Matters">
                M&A due-diligence: months to days. Security audits: weeks to minutes. Integration
                breakages: eliminated. Legacy migration: automated. No consultants required.
              </Callout>
            </Reveal>
          </section>

          {/* MATRIX */}
          <section id="matrix" className="py-[48px] border-t border-[#1a1a1a]/8">
            <Reveal>
              <SectionLabel>Reference</SectionLabel>
              <H2>Complete Capability Matrix</H2>

              <Table
                head={
                  <>
                    <Th>#</Th>
                    <Th>Module</Th>
                    <Th>Capability</Th>
                    <Th>What It Does</Th>
                    <Th>Primary Benefit</Th>
                  </>
                }
              >
                {MATRIX_ROWS.map((r) => (
                  <tr key={r.n}>
                    <Td>
                      <span className="font-mono text-[12px] text-[#666]">{r.n}</span>
                    </Td>
                    <Td>{r.module}</Td>
                    <Td>
                      <strong>{r.cap}</strong>
                    </Td>
                    <Td>{r.what}</Td>
                    <Td>{r.benefit}</Td>
                  </tr>
                ))}
              </Table>
            </Reveal>
          </section>

          {/* ROI */}
          <section id="roi" className="py-[48px] border-t border-[#1a1a1a]/8">
            <Reveal>
              <SectionLabel>Business Case</SectionLabel>
              <H2>Business Impact & ROI</H2>

              <H3>Time Savings</H3>
              <Table
                head={
                  <>
                    <Th>Activity</Th>
                    <Th>Without Jataka</Th>
                    <Th>With Jataka</Th>
                    <Th>Savings</Th>
                  </>
                }
              >
                <tr>
                  <Td>Code review (limit checks)</Td>
                  <Td>2-4 hours/PR</Td>
                  <Td>Automated (0 min)</Td>
                  <Td>~3 hrs/PR</Td>
                </tr>
                <tr>
                  <Td>Finding field dependencies</Td>
                  <Td>30-60 min/field</Td>
                  <Td>Instant (IDE preview)</Td>
                  <Td>~45 min/field</Td>
                </tr>
                <tr>
                  <Td>Fixing broken UI tests post-release</Td>
                  <Td>2-4 weeks/year</Td>
                  <Td>Self-healed (0 days)</Td>
                  <Td>~3 weeks/yr</Td>
                </tr>
                <tr>
                  <Td>Creating test data</Td>
                  <Td>1-2 hrs/suite</Td>
                  <Td>Auto-generated (sec)</Td>
                  <Td>~1.5 hrs/suite</Td>
                </tr>
                <tr>
                  <Td>Security audit preparation</Td>
                  <Td>2-4 weeks/audit</Td>
                  <Td>Minutes (auto report)</Td>
                  <Td>~3 weeks/audit</Td>
                </tr>
                <tr>
                  <Td>M&A org comparison</Td>
                  <Td>2-6 months</Td>
                  <Td>Days (auto mapping)</Td>
                  <Td>Months</Td>
                </tr>
                <tr>
                  <Td>Workflow to Flow migration</Td>
                  <Td>2-4 hrs/rule</Td>
                  <Td>Automated (minutes)</Td>
                  <Td>~3 hrs/rule</Td>
                </tr>
                <tr>
                  <Td>Org architecture questions</Td>
                  <Td>15-60 min (manual)</Td>
                  <Td>Seconds (Slack bot)</Td>
                  <Td>~30 min/question</Td>
                </tr>
              </Table>

              <H3>Risk Reduction</H3>
              <Table
                head={
                  <>
                    <Th>Risk</Th>
                    <Th>Without Jataka</Th>
                    <Th>With Jataka</Th>
                  </>
                }
              >
                <tr>
                  <Td>Governor limit outages</Td>
                  <Td>5-15 per year</Td>
                  <Td>
                    <strong className="text-[#FF2424]">Near zero</strong>
                  </Td>
                </tr>
                <tr>
                  <Td>Integration breakages</Td>
                  <Td>2-5 per quarter</Td>
                  <Td>
                    <strong className="text-[#FF2424]">Zero</strong>
                  </Td>
                </tr>
                <tr>
                  <Td>Refactoring regressions</Td>
                  <Td>Unknown (silent)</Td>
                  <Td>
                    <strong className="text-[#FF2424]">Zero (verified)</strong>
                  </Td>
                </tr>
                <tr>
                  <Td>Compliance audit failures</Td>
                  <Td>Possible</Td>
                  <Td>
                    <strong className="text-[#FF2424]">Eliminated</strong>
                  </Td>
                </tr>
                <tr>
                  <Td>Undetected production outages</Td>
                  <Td>Hours</Td>
                  <Td>
                    <strong className="text-[#FF2424]">&lt;15 minutes</strong>
                  </Td>
                </tr>
              </Table>

              <H3>Key Metrics</H3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px] my-[24px]">
                <ImpactCard
                  label="Production Incidents"
                  value="-95%"
                  desc="Governor limit related incidents"
                />
                <ImpactCard
                  label="PR Review Speed"
                  value="Inf."
                  desc="Unlimited automated reviews per day"
                />
                <ImpactCard
                  label="Metadata Bloat"
                  value="-40%"
                  desc="Reduction in redundant metadata"
                />
                <ImpactCard
                  label="Test Maintenance"
                  value="-90%"
                  desc="Self-healing test maintenance"
                />
                <ImpactCard
                  label="M&A Due Diligence"
                  value="10x"
                  desc="Faster org merge analysis"
                />
                <ImpactCard
                  label="Onboarding Time"
                  value="-70%"
                  desc="New developer ramp-up time"
                />
              </div>
            </Reveal>
          </section>

          {/* INLINE FOOTER */}
          <div className="py-[40px] border-t border-[#1a1a1a]/8 text-center text-[13px] text-[#666]">
            <p>
              <strong className="text-[#1a1a1a]">Jataka</strong> - The Autonomous Salesforce
              Governance Platform
            </p>
            <p className="mt-[6px]">
              Confidential - For Internal & Client Presentation Use &nbsp;|&nbsp; (c) 2026 Jataka
            </p>
          </div>
        </div>

        {/* CTA BAND */}
        <section className="pa-print-hide py-[90px] px-[24px] md:px-[48px] bg-[#1a1a1a]">
          <div className="max-w-[1000px] mx-auto text-center">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[24px]">
                Ready to Govern Your Salesforce Org?
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(32px,5vw,56px)] leading-[1.02] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Start the pilot.
                <br />
                <span className="text-[#FF2424]">See Jataka in action.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[16px] leading-[1.7] text-[#999] max-w-[620px] mx-auto mb-[36px]">
                14-day zero-risk pilot. No production access. No data retention. Automated
                governance across your entire Salesforce development lifecycle.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row gap-[14px] justify-center">
                <button
                  onClick={() => router.push("/book-pilot")}
                  className="group bg-[#FF2424] text-white px-[36px] py-[15px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition flex items-center justify-center gap-[10px]"
                >
                  Book Pilot
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                </button>
                <button
                  onClick={() => router.push("/pricing")}
                  className="group bg-transparent text-white px-[36px] py-[15px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition flex items-center justify-center gap-[10px]"
                >
                  View Pricing
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
