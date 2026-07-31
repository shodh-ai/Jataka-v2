"use client";

import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
  FeatureGrid,
} from "../components/marketing";
import { FadeIn } from "../components/home/FadeIn";

const successCriteria = [
  {
    title: "Governor Limit Detection",
    body: "Jataka identifies at least one Governor Limit breach in active PRs, or within the retroactive Day-0 Audit of the last 30 days of previously merged code.",
    meta: "Sev-1 prevention",
  },
  {
    title: "Orphan Field Mapping",
    body: "Jataka maps and catalogs at least 50 orphan fields across the Salesforce org.",
    meta: "Map 50+ fields",
  },
  {
    title: "Technical Debt Identification",
    body: "Jataka identifies at least 10 actionable technical debt items with remediation suggestions.",
    meta: "10+ issues",
  },
];

const customerActions = [
  { day: "Day 1", action: "Provide Sandbox Access", detail: "Grant Jataka OAuth access to Staging/Integration sandbox" },
  { day: "Day 1–3", action: "Connect GitHub Repository", detail: "Link primary Salesforce repository for PR analysis" },
  { day: "Day 7", action: "Mid-Pilot Review", detail: "Review initial findings and adjust scope if needed" },
  { day: "Day 14", action: "Go/No-Go Decision", detail: "Evaluate success criteria and determine Enterprise License purchase" },
];

const jatakaActions = [
  { day: "Day 1", action: "Onboarding & Setup", detail: "Configure Jataka agents and establish baseline metrics" },
  { day: "Day 2–6", action: "Continuous Analysis", detail: "Scan PRs, map schema, surface limit risks and debt" },
  { day: "Day 7", action: "Findings Briefing", detail: "Walk stakeholders through evidence and remediation paths" },
  { day: "Day 14", action: "Executive Readout", detail: "Deliver pilot scorecard and commercial recommendation" },
];

export default function MutualActionPlanPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Pilot success"
        title="Mutual Action"
        italicWord="Plan"
        subtitle="A shared 14-day checklist so both teams know exactly what success looks like before an Enterprise License decision."
        ctas={[
          { label: "Start a pilot →", href: "/book-pilot", primary: true },
          { label: "View pricing", href: "/pricing" },
        ]}
      />

      <ContentSection title="Success" italicWord="criteria">
        <FeatureGrid features={successCriteria} columns={3} />
      </ContentSection>

      <ContentSection title="Customer" italicWord="actions">
        <div className="grid gap-3 md:grid-cols-2">
          {customerActions.map((item, i) => (
            <FadeIn key={item.action} delay={i * 0.04}>
              <div className="rounded-[18px] border border-[#111]/08 bg-white p-5 shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                <p className="font-mono text-[11px] tracking-[0.14em] text-[#2563EB] uppercase">{item.day}</p>
                <h3 className="mt-2 text-[16px] font-semibold text-[#111]">{item.action}</h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-[#5F5F66]">{item.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Jataka" italicWord="actions">
        <div className="grid gap-3 md:grid-cols-2">
          {jatakaActions.map((item, i) => (
            <FadeIn key={item.action} delay={i * 0.04}>
              <div className="rounded-[18px] border border-[#111]/08 bg-white p-5 shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                <p className="font-mono text-[11px] tracking-[0.14em] text-[#8A93A3] uppercase">{item.day}</p>
                <h3 className="mt-2 text-[16px] font-semibold text-[#111]">{item.action}</h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-[#5F5F66]">{item.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <PageCta
        title="Ready to run the"
        italicWord="14-day plan"
        subtitle="We'll align success criteria on the briefing call and start Shadow Mode the same week."
        primaryLabel="Book a pilot →"
        primaryHref="/book-pilot"
        secondaryLabel="Read the POC agreement"
        secondaryHref="/poc-agreement"
      />
    </MarketingShell>
  );
}
