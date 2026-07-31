"use client";

import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
  FeatureGrid,
} from "../components/marketing";
import { FadeIn } from "../components/home/FadeIn";

const defenseLayers = [
  {
    title: "The Context Engine",
    body: "Jataka connects to your Salesforce Org via OAuth and ingests metadata, Flow dependencies, and Apex Triggers through the Tooling API into a Knowledge graph. Your team gets a live map of how a decade of architecture is actually wired.",
    meta: "Mapping the blast radius",
  },
  {
    title: "Shift-Left Guardrails",
    body: "We stream architecture context directly into AI copilots using MCP. Before code is written, the copilot is warned about dangerous patterns — making enterprise AI coding safer by default.",
    meta: "Cursor MCP integration",
  },
  {
    title: "The Production Firewall",
    body: "On every pull request, Jataka launches an isolated Kamikaze pod, executes the workflow in Sandbox, profiles Apex Debug Logs, and blocks merges when usage breaches 90% of SOQL, CPU, or Flow limits.",
    meta: "CI/CD PR blocker",
  },
];

const differentiators = [
  "Runtime simulation instead of syntax-only analysis.",
  "Backend validation: UI action + DB verification + async limit monitoring.",
  "Built-in outbound ERP mocking for safe integration tests.",
  "Autonomous self-healing when layouts/UI change in Salesforce.",
];

export default function JatakaInfoPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Runtime confidence for Salesforce CI/CD"
        title="75% code coverage"
        italicWord="is an illusion"
        subtitle="Static scanners read text. They cannot predict runtime behavior under real data volume. Jataka executes your actual business process in Sandbox and rejects risky PRs before Production sees them."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "See pricing", href: "/pricing" },
        ]}
      />

      <ContentSection title="Three layers of" italicWord="defense">
        <FeatureGrid features={defenseLayers} columns={3} />
      </ContentSection>

      <ContentSection title="Why Jataka" italicWord="wins">
        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <FadeIn>
            <div className="h-full rounded-[22px] border border-[#111]/08 bg-white p-7 shadow-[0_14px_40px_rgba(17,17,17,0.04)] md:p-9">
              <h3 className="text-[clamp(1.4rem,2.5vw,1.85rem)] font-semibold tracking-[-0.03em] text-[#111]">
                We test runtime, not just syntax.
              </h3>
              <ul className="mt-5 space-y-3">
                {differentiators.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-[1.7] text-[#5F5F66]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="flex h-full flex-col justify-center rounded-[22px] border border-[#2563EB]/20 bg-[#EFF6FF] p-7 md:p-9">
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563EB] uppercase">
                The result
              </p>
              <p className="mt-4 text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-[#111]">
                Zero 101 SOQL errors.
                <br />
                Zero weekend rollbacks.
                <br />
                Full architectural confidence.
              </p>
              <p className="mt-5 text-[14px] leading-[1.7] text-[#5F5F66]">
                Jataka turns PR review into a production-grade runtime gate for the Agentic Era.
              </p>
            </div>
          </FadeIn>
        </div>
      </ContentSection>

      <PageCta
        title="Ready to prove it"
        italicWord="on your org"
        subtitle="14-day Shadow Mode pilot. Sandbox only. Zero production access."
        primaryLabel="Book a pilot →"
        primaryHref="/book-pilot"
        secondaryLabel="Read security"
        secondaryHref="/security"
      />
    </MarketingShell>
  );
}
