"use client";

import { Binary, Radio, AlertTriangle } from "lucide-react";
import { FadeIn } from "../components/home";
import { ProductPageTemplate } from "../components/marketing";

function GraphVisual() {
  return (
    <FadeIn>
      <div className="overflow-hidden rounded-[22px] border border-[#111]/08 bg-[#0C1320] shadow-[0_18px_50px_rgba(17,17,17,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
            Bitemporal AST Graph
          </p>
          <div className="flex gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/70">
              GitHub View
            </span>
            <span className="rounded-full bg-[#2563EB] px-3 py-1 text-[11px] text-white">
              Live Production View
            </span>
          </div>
        </div>
        <div className="relative grid min-h-[220px] place-items-center p-8">
          <div className="absolute inset-0 opacity-40" aria-hidden>
            <div className="absolute top-1/2 left-[18%] h-px w-[64%] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent" />
            <div className="absolute top-[32%] left-1/2 h-[36%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent" />
          </div>
          {[
            { label: "Trigger", x: "12%", y: "28%", t: "git 14:02 · prod 14:02" },
            { label: "Flow", x: "42%", y: "18%", t: "git 11:40 · prod 16:22" },
            { label: "Rule", x: "72%", y: "34%", t: "git — · prod 16:22" },
            { label: "Apex", x: "38%", y: "68%", t: "git 09:11 · prod 09:11" },
          ].map((node) => (
            <div
              key={node.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm"
              style={{ left: node.x, top: node.y }}
            >
              <p className="text-[12px] font-semibold text-white">{node.label}</p>
              <p className="mt-0.5 font-mono text-[9px] text-white/45">{node.t}</p>
            </div>
          ))}
          <p className="relative z-10 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 font-mono text-[10px] text-amber-200">
            Drift detected · Rule orphaned from GitHub
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

export default function KnowledgeGraphPage() {
  return (
    <ProductPageTemplate
      eyebrow="Bitemporal Knowledge Graph"
      title="The First Enterprise Brain That Can"
      italicWord="Time-Travel"
      subtitle="Generic AI uses text search and hallucinates. Jataka compiles your literal codebase into an Abstract Syntax Tree (AST) graph that tracks both code commits and live production events."
      visual={<GraphVisual />}
      problemTitle="Configuration"
      problemItalic="Drift"
      problemBody="When a rogue admin manually changes a profile in production, your GitHub goes blind, and your CI/CD pipelines break. Standard AI cannot see what isn't documented."
      featuresTitle="The Bitemporal"
      featuresItalic="advantage"
      features={[
        {
          title: "Compiler-Level Precision",
          body: "We don't read text. We parse exact Salesforce dependencies (Trigger → Flow → Rule) with 100% mathematical accuracy.",
          icon: Binary,
        },
        {
          title: "Live Event Streaming",
          body: "Jataka ingests live Salesforce Event Logs (via Kafka/Temporal) so the graph always reflects what production is doing now.",
          icon: Radio,
        },
        {
          title: "Catch the Rogue Admin",
          body: "Every node tracks when GitHub updated it vs. when it actually changed in production. We instantly flag orphaned states and drift.",
          icon: AlertTriangle,
        },
      ]}
      resultTitle="One graph. Two"
      resultItalic="timelines"
      resultBody="See code history and production reality on the same map—so drift, orphans, and undocumented hotfixes surface before they break your pipelines."
      primaryCtaLabel="Map Your Org Architecture →"
      primaryCtaHref="/book-pilot"
      secondaryCtaLabel="Shadow Mode Pilot"
      secondaryCtaHref="/shadow-mode"
      related={[
        { label: "Enterprise Governance", href: "/enterprise-governance" },
        { label: "M&A Org Merge & Tech Debt", href: "/ma-org-merge-intelligence" },
        { label: "Autonomous Support", href: "/autonomous-support" },
      ]}
      bottomCtaTitle="Map your org"
      bottomCtaItalic="architecture"
      bottomCtaSubtitle="Deploy in Shadow Mode and watch the bitemporal graph build itself—read-only, zero risk."
    />
  );
}
