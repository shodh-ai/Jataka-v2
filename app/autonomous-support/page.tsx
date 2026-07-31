"use client";

import { MessageSquare, Search, Wrench } from "lucide-react";
import { FadeIn } from "../components/home";
import { ProductPageTemplate } from "../components/marketing";

function SupportVisual() {
  return (
    <FadeIn>
      <div className="overflow-hidden rounded-[22px] border border-[#111]/08 bg-white shadow-[0_18px_50px_rgba(17,17,17,0.05)]">
        <div className="grid md:grid-cols-2">
          <div className="border-b border-[#111]/08 p-5 md:border-r md:border-b-0 md:p-6">
            <p className="mb-4 font-mono text-[10px] tracking-[0.18em] text-[#8A93A3] uppercase">
              Slack · Live triage
            </p>
            <div className="space-y-3">
              <div className="rounded-2xl rounded-tl-sm bg-[#F3F3F4] px-4 py-3">
                <p className="text-[12px] font-semibold text-[#111]">@sales-ops</p>
                <p className="mt-1 text-[13px] leading-[1.55] text-[#5F5F66]">
                  Opportunity save is failing for EMEA reps — Status won&apos;t stick.
                </p>
              </div>
              <div className="rounded-2xl rounded-tr-sm bg-[#111] px-4 py-3 text-white">
                <p className="text-[12px] font-semibold text-white/70">Jataka</p>
                <p className="mt-1 text-[13px] leading-[1.55] text-white/90">
                  Intent captured. Diagnosing validation rule + Flow path… patch ready for
                  approval.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#0C1320] p-5 text-white md:p-6">
            <p className="mb-4 font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
              Fix · Real-time
            </p>
            <div className="space-y-2 font-mono text-[11px] leading-[1.7]">
              <p className="text-emerald-400">+ ValidationRule.Opportunity_EMEA_Status</p>
              <p className="text-white/45">  formula: ISPICKVAL(StageName, &quot;Closed Won&quot;)</p>
              <p className="text-emerald-400">+ Flow.Opportunity_AfterSave · entry criteria fixed</p>
              <p className="mt-4 text-white/55">Sandbox test · PASSED · video attached</p>
              <p className="text-[#60A5FA]">Awaiting 1-click manager approval</p>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function AutonomousSupportPage() {
  return (
    <ProductPageTemplate
      eyebrow="Autonomous Support · L1–L3"
      title="Resolve Enterprise Incidents in 60 Seconds, Not"
      italicWord="12 Days"
      subtitle="Eliminate the IT support queue. Jataka acts as your autonomous L1 triage, L2 diagnostician, and L3 engineer—delivering tested, ready-to-deploy patches directly to your IT managers."
      visual={<SupportVisual />}
      problemTitle="The traditional escalation funnel"
      problemItalic="is broken"
      problemBody="90% of Mean Time to Resolution (MTTR) is wasted in queues, log reading, and guessing the blast radius of a fix."
      featuresTitle="How Jataka"
      featuresItalic="fixes it"
      features={[
        {
          title: "L1 · Semantic Triage",
          body: "Intercepts user issues directly in Slack/Teams and understands business intent instantly.",
          icon: MessageSquare,
          meta: "L1",
        },
        {
          title: "L2 · Causal Diagnostics",
          body: "Runs live read-only queries against your staging org to mathematically prove the root cause. No guessing.",
          icon: Search,
          meta: "L2",
        },
        {
          title: "L3 · Autonomous Engineering",
          body: "Generates an AST-perfect code patch, tests it in an isolated sandbox, and routes it for 1-click human approval.",
          icon: Wrench,
          meta: "L3",
        },
      ]}
      resultTitle="From ticket to"
      resultItalic="tested patch"
      resultBody="Jataka collapses the escalation funnel into one autonomous loop—triage, prove, patch, and approve—so IT managers ship fixes in minutes instead of days."
      primaryCtaLabel="See it in action →"
      primaryCtaHref="/book-pilot"
      secondaryCtaLabel="Shadow Mode Pilot"
      secondaryCtaHref="/shadow-mode"
      related={[
        { label: "DeltaBox Sandboxing", href: "/deltabox" },
        { label: "Sovereign Audit & Approvals", href: "/sovereign-audit" },
        { label: "Bitemporal Knowledge Graph", href: "/knowledge-graph" },
      ]}
      bottomCtaTitle="See autonomous support on your"
      bottomCtaItalic="org"
      bottomCtaSubtitle="Watch Jataka triage, diagnose, and patch a real incident under NDA."
    />
  );
}
