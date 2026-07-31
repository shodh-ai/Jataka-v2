"use client";

import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
  FeatureGrid,
} from "../components/marketing";
import { FadeIn } from "../components/home";
import { Database, Lock, Shield, CheckCircle } from "lucide-react";

const architectureSteps = [
  {
    title: "GitHub",
    body: "When a PR is opened or updated, GitHub fires a webhook to our One-Backend orchestration layer. The codebase is fetched and queued for analysis.",
    meta: "Step 01",
  },
  {
    title: "One-Backend",
    body: "The central brain that coordinates all Jataka services. It manages job queues, handles OAuth authentication, and routes tasks to the right engines.",
    meta: "Step 02",
  },
  {
    title: "Static Analysis Engine",
    body: "Our LLM layer understands Salesforce Apex natively. It analyzes the AST, flags potential limit risks, and generates deterministic tests for uncovered paths.",
    meta: "Step 03",
  },
  {
    title: "Kamikaze",
    body: "Isolated Sandbox pods execute real transactions, parse Debug Logs, and return measured Governor Limit metrics — not estimates.",
    meta: "Step 04",
  },
];

const securityFeatures = [
  {
    title: "Zero-Retention APIs",
    body: "Enterprise Zero-Retention APIs process your code in-memory only. Once analysis completes, artifacts are purged. No training on your IP.",
    icon: Database,
  },
  {
    title: "AES-256 Encryption",
    body: "All OAuth tokens are AES-256 encrypted at rest. Salesforce credentials never appear in logs, dashboards, or debug output.",
    icon: Lock,
  },
  {
    title: "No Model Training",
    body: "Contractual guarantee: we do not train models on your proprietary Salesforce code. Your competitive advantage stays yours.",
    icon: Shield,
  },
  {
    title: "SOC 2 Compliant",
    body: "Infrastructure meets SOC 2 Type II standards for security, availability, and confidentiality. Annual audits verify controls.",
    icon: CheckCircle,
  },
];

const limitParsingFeatures = [
  {
    title: "Tooling API Integration",
    body: "We query the Salesforce Tooling API for Apex classes, triggers, and SymbolTables — building a dependency graph before a single line executes.",
    code: `GET /services/data/v58.0/tooling/query/?q=
SELECT Id, Name, SymbolTable, Body 
FROM ApexClass 
WHERE NamespacePrefix = NULL`,
  },
  {
    title: "Sforce-Limit-Info Headers",
    body: "Every API call returns limit consumption headers. We parse them during Sandbox execution to build a real-time limit profile.",
    code: `Sforce-Limit-Info: api-usage=95/500
Sforce-Limit-Info: api-max=500
Sforce-Limit-Info: per-app-api-usage=42/100`,
  },
  {
    title: "Debug Log Analysis",
    body: "We execute your code in Sandbox and parse Debug Logs for measured facts — SOQL, DML, CPU, heap — not static guesses.",
    code: `> Parsing execution trace...
> SOQL queries detected: 97/100
> Query rows: 48,000/50,000
> DML statements: 45/150
> CPU time: 8,500ms/10,000ms`,
  },
  {
    title: "Blast Radius Calculation",
    body: "Graph analysis maps dependencies and predicts the impact of a change before it ships.",
    code: `> Initiating Blast Radius Traversal...
> Finding 12 downstream dependencies
> Mapping impact across 3 layers
> Risk assessment: CRITICAL`,
  },
];

export default function DocsPage() {
  return (
    <MarketingShell>
      <PageHero
        title="How Jataka actually"
        italicWord="works"
        subtitle="Architecture, security model, and the limit parsing engine — transparency that builds trust with engineering and security teams."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "Security overview", href: "/security" },
        ]}
      />

      <ContentSection
        id="architecture"
        title="The"
        italicWord="architecture"
        subtitle="A modular pipeline from GitHub webhook to deployment decision."
      >
        <FeatureGrid features={architectureSteps} columns={2} />
      </ContentSection>

      <ContentSection
        id="security"
        title="Security &"
        italicWord="privacy"
        subtitle="Designed to pass CISO review without friction."
      >
        <FeatureGrid features={securityFeatures} columns={2} />
      </ContentSection>

      <ContentSection
        id="limit-parsing"
        title="Limit"
        italicWord="parsing"
        subtitle="The secret sauce behind measured Governor Limit profiling."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {limitParsingFeatures.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.05}>
              <article className="h-full rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-7">
                <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[#111]">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-[#5F5F66]">{feature.body}</p>
                <pre className="mt-5 overflow-x-auto rounded-xl bg-[#111] p-4 font-mono text-[12px] leading-[1.6] text-[#E8E8EC]">
                  {feature.code}
                </pre>
              </article>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <PageCta
        title="See the architecture in"
        italicWord="action"
        subtitle="Book a demo and watch Jataka catch real issues in your Salesforce codebase."
      />
    </MarketingShell>
  );
}
