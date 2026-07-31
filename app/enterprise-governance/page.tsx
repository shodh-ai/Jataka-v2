"use client";

import { ShieldAlert, EyeOff, Link2 } from "lucide-react";
import { FadeIn } from "../components/home";
import { ProductPageTemplate } from "../components/marketing";

function GovernanceVisual() {
  return (
    <FadeIn>
      <div className="overflow-hidden rounded-[22px] border border-[#111]/08 bg-white shadow-[0_18px_50px_rgba(17,17,17,0.05)]">
        <div className="border-b border-[#111]/08 px-5 py-3">
          <p className="font-mono text-[10px] tracking-[0.18em] text-[#8A93A3] uppercase">
            CI/CD · PR guardrails
          </p>
        </div>
        <div className="grid md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3 border-b border-[#111]/08 p-5 md:border-r md:border-b-0 md:p-6">
            {["lint", "unit tests", "Jataka Limit Firewall"].map((step, i) => (
              <div
                key={step}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                  i === 2 ? "border border-rose-500/30 bg-rose-50" : "bg-[#F3F3F4]"
                }`}
              >
                <span className="text-[13px] font-medium text-[#111]">{step}</span>
                <span
                  className={`text-[11px] font-semibold tracking-[0.1em] uppercase ${
                    i === 2 ? "text-rose-600" : "text-emerald-600"
                  }`}
                >
                  {i === 2 ? "Blocked" : "Pass"}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-[#0C1320] p-5 text-white md:p-6">
            <p className="text-[12px] font-semibold text-rose-300">Hard block</p>
            <p className="mt-2 text-[14px] leading-[1.6] text-white/85">
              Hidden O(n²) SOQL loop projects CPU breach at 15,000 records.
            </p>
            <p className="mt-4 font-mono text-[11px] text-white/45">
              Guest Profile → Apex → PII Field · leak path also flagged
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function EnterpriseGovernancePage() {
  return (
    <ProductPageTemplate
      eyebrow="Enterprise Governance"
      title="Proactive Guardrails for Mission-Critical"
      italicWord="Workflows"
      subtitle="Stop production outages before they are deployed. Jataka runs silently in the background, blocking limit-breaches and data leaks at the Pull Request stage."
      visual={<GovernanceVisual />}
      problemTitle="Static analyzers miss"
      problemItalic="runtime physics"
      problemBody="Static code analyzers (like SonarQube) only catch lazy formatting. They cannot predict dynamic runtime limits or multi-hop data exposure."
      featuresTitle="The Jataka"
      featuresItalic="Guardrails"
      features={[
        {
          title: "The Limit Firewall",
          body: "Jataka dynamically simulates PR load. It detects hidden O(n²) SOQL loops and projects CPU limit breaches at 15,000 records. If it fails, the PR is hard-blocked.",
          icon: ShieldAlert,
        },
        {
          title: "Experience Cloud Data Leak Prevention",
          body: "Jataka traces multi-hop vulnerabilities (e.g., Guest Profile → Apex → PII Field) and blocks deployments that accidentally expose private CRM data to the public internet.",
          icon: EyeOff,
        },
        {
          title: "API Contract Guardian",
          body: "Autonomously blocks any Salesforce field changes that would silently break external ERP (SAP/Oracle) integrations.",
          icon: Link2,
        },
      ]}
      resultTitle="Outages die at the"
      resultItalic="PR"
      resultBody="Limit breaches, Experience Cloud leaks, and ERP contract breaks never reach production—because the pipeline refuses to merge them."
      primaryCtaLabel="Secure Your CI/CD Pipeline →"
      primaryCtaHref="/book-pilot"
      secondaryCtaLabel="Anti-Patterns Library"
      secondaryCtaHref="/anti-patterns"
      related={[
        { label: "Bitemporal Knowledge Graph", href: "/knowledge-graph" },
        { label: "Anti-Patterns Library", href: "/anti-patterns" },
        { label: "Sovereign Audit & Approvals", href: "/sovereign-audit" },
      ]}
      bottomCtaTitle="Put the firewall in front of"
      bottomCtaItalic="every merge"
      bottomCtaSubtitle="See a real PR get hard-blocked with CPU projection and leak-path evidence."
    />
  );
}
