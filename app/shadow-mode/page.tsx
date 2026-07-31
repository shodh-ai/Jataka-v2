"use client";

import { Database, Eye, BarChart3, ToggleLeft } from "lucide-react";
import { FadeIn } from "../components/home";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
  FeatureGrid,
} from "../components/marketing";

const phases = [
  {
    title: "Phase 1 · The Ingestion (Day 1)",
    body: "We plug into your GitHub and Salesforce Event Logs (Read-Only). Jataka silently builds the Bitemporal AST Graph of your entire architecture.",
    icon: Database,
    meta: "Day 1",
  },
  {
    title: "Phase 2 · The Silent Diagnostician (Day 2–29)",
    body: "As your human L3 engineers solve tickets, Jataka solves them in the background. We log our Causal AI diagnostics and AST patches without deploying anything.",
    icon: Eye,
    meta: "Day 2–29",
  },
  {
    title: "Phase 3 · The Reveal (Day 30)",
    body: 'We hand you a dashboard comparing Jataka\'s background resolutions against your human team. ("Jataka correctly diagnosed 94% of incidents, 12 days faster than the human queue.")',
    icon: BarChart3,
    meta: "Day 30",
  },
  {
    title: "Phase 4 · The Trust Dial (Day 31)",
    body: "You turn on Write-Access via the Approval Framework only for the specific workflows you now completely trust.",
    icon: ToggleLeft,
    meta: "Day 31",
  },
];

export default function ShadowModePage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Shadow Mode Pilot · Onboarding"
        title="Prove the AI Before You Trust the"
        italicWord="AI"
        subtitle="We don't ask for write-access to your production environment on Day 1. Deploy Jataka in a 30-Day Read-Only Shadow Mode to map your org and prove our diagnostic accuracy with zero risk."
        ctas={[
          { label: "Request a Shadow Mode Pilot →", href: "/book-pilot", primary: true },
          { label: "Trust & Security", href: "/security" },
        ]}
      />

      <section className="relative overflow-hidden bg-[#F3F3F4] px-5 pb-4 sm:px-6 md:px-10">
        <div className="relative z-10 mx-auto max-w-[1100px]">
          <FadeIn>
            <div className="overflow-hidden rounded-[22px] border border-[#111]/08 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.05)] md:p-8">
              <p className="mb-6 font-mono text-[10px] tracking-[0.18em] text-[#8A93A3] uppercase">
                30-day trust timeline
              </p>
              <div className="grid gap-3 md:grid-cols-4">
                {[
                  { day: "Day 1", label: "Read-Only Ingestion" },
                  { day: "Day 2–29", label: "Silent Diagnostics" },
                  { day: "Day 30", label: "Dashboard Reveal" },
                  { day: "Day 31", label: "Autonomous Execution" },
                ].map((step, i) => (
                  <div
                    key={step.day}
                    className={`rounded-xl border px-4 py-4 ${
                      i === 3
                        ? "border-[#111] bg-[#111] text-white"
                        : "border-[#111]/08 bg-[#F8FAFC]"
                    }`}
                  >
                    <p
                      className={`font-mono text-[10px] tracking-[0.14em] uppercase ${
                        i === 3 ? "text-white/50" : "text-[#8A93A3]"
                      }`}
                    >
                      {step.day}
                    </p>
                    <p className={`mt-2 text-[14px] font-semibold ${i === 3 ? "text-white" : "text-[#111]"}`}>
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <ContentSection title="The Garbage In, Garbage Out" italicWord="fear">
        <FadeIn>
          <p className="max-w-[640px] text-[16px] leading-[1.75] text-[#5F5F66]">
            Enterprises know their data is messy and don&apos;t trust autonomous AI to make changes
            immediately. Shadow Mode proves accuracy before you ever grant write access.
          </p>
        </FadeIn>
      </ContentSection>

      <ContentSection title="How Shadow Mode" italicWord="works">
        <FeatureGrid features={phases} columns={2} />
      </ContentSection>

      <PageCta
        title="Request a Shadow Mode"
        italicWord="Pilot"
        subtitle="30 days read-only. Prove diagnostic accuracy. Turn on write access only when you trust the machine."
        primaryLabel="Request a Shadow Mode Pilot →"
        primaryHref="/book-pilot"
        secondaryLabel="View Security Center"
        secondaryHref="/security"
      />
    </MarketingShell>
  );
}
