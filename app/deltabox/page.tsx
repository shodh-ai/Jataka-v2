"use client";

import { Code2, Box, Video } from "lucide-react";
import { FadeIn } from "../components/home";
import { ProductPageTemplate } from "../components/marketing";

function DeltaBoxVisual() {
  return (
    <FadeIn>
      <div className="overflow-hidden rounded-[22px] border border-[#111]/08 bg-gradient-to-b from-[#0C1320] to-[#111827] p-6 shadow-[0_18px_50px_rgba(17,17,17,0.08)] md:p-8">
        <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
            DeltaBox · Ephemeral sandbox
          </p>
          <div className="relative mt-6 w-full rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-6">
            <div className="absolute -inset-px rounded-2xl border border-white/10" aria-hidden />
            <p className="font-mono text-[12px] text-cyan-200">patch.apply(ast_rules)</p>
            <p className="mt-3 text-[13px] text-white/70">Isolated zero-copy Salesforce scratch org</p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-[11px]">
              <div className="rounded-lg bg-white/5 py-2 text-white/60">Spin up</div>
              <div className="rounded-lg bg-emerald-500/15 py-2 text-emerald-300">UI test · MP4</div>
              <div className="rounded-lg bg-rose-500/15 py-2 text-rose-300">Kill-switch</div>
            </div>
          </div>
          <p className="mt-5 text-[13px] text-white/50">
            Glass box → proof recorded → sandbox destroyed
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

export default function DeltaBoxPage() {
  return (
    <ProductPageTemplate
      eyebrow="DeltaBox Sandboxing"
      title="Absolute AI Execution Safety. Zero Risk to"
      italicWord="Production"
      subtitle="Don't let AI test in your staging org. Jataka executes all L3 patches in DeltaBox—an ephemeral, OS-level micro-sandbox that self-destructs after every test."
      visual={<DeltaBoxVisual />}
      problemTitle="Shared environments create"
      problemItalic="security decay"
      problemBody="Testing AI-generated code in shared environments leaves zombie test data, corrupts configurations, and creates security decay loops."
      featuresTitle="How DeltaBox"
      featuresItalic="protects you"
      features={[
        {
          title: "Neuro-Symbolic Compilers",
          body: "Jataka's AI doesn't write raw, error-prone text. It outputs deterministic AST rules. Syntax errors are impossible by construction.",
          icon: Code2,
        },
        {
          title: "Ephemeral Scratch Orgs",
          body: "For every fix, Kamikaze spins up an isolated, zero-copy Salesforce environment.",
          icon: Box,
        },
        {
          title: "Visual Proof, Then Destruction",
          body: "Kamikaze runs the UI test, records an MP4 video of the success, and instantly triggers an inescapable kill-switch to destroy the sandbox.",
          icon: Video,
        },
      ]}
      resultTitle="Execute freely."
      resultItalic="Leave nothing behind"
      resultBody="Every L3 patch is proven in a disposable glass box—with video evidence—then the environment is gone. Staging stays clean. Production stays untouched."
      primaryCtaLabel="Explore Kamikaze Execution →"
      primaryCtaHref="/book-pilot"
      secondaryCtaLabel="Trust & Security"
      secondaryCtaHref="/security"
      related={[
        { label: "Autonomous Support", href: "/autonomous-support" },
        { label: "Sovereign Audit & Approvals", href: "/sovereign-audit" },
        { label: "Enterprise Governance", href: "/enterprise-governance" },
      ]}
      bottomCtaTitle="See DeltaBox"
      bottomCtaItalic="destroy itself"
      bottomCtaSubtitle="Watch a patch spin up, prove out on video, and vanish—without touching staging."
    />
  );
}
