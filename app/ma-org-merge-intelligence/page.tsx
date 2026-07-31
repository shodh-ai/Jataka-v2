"use client";

import { GitMerge, Trash2, PackageSearch } from "lucide-react";
import { FadeIn } from "../components/home";
import { ProductPageTemplate } from "../components/marketing";

function MergeVisual() {
  return (
    <FadeIn>
      <div className="overflow-hidden rounded-[22px] border border-[#111]/08 bg-[#0C1320] p-6 shadow-[0_18px_50px_rgba(17,17,17,0.08)] md:p-8">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="font-mono text-[10px] text-white/40 uppercase">Org A</p>
            <p className="mt-2 text-[13px] text-white/80">4,812 nodes · messy overlap</p>
            <div className="mt-3 h-16 rounded-lg bg-[radial-gradient(circle_at_30%_40%,rgba(37,99,235,0.35),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(244,63,94,0.25),transparent_50%)]" />
          </div>
          <p className="hidden text-center text-white/30 md:block">→</p>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="font-mono text-[10px] text-white/40 uppercase">Org B</p>
            <p className="mt-2 text-[13px] text-white/80">3,940 nodes · conflicts</p>
            <div className="mt-3 h-16 rounded-lg bg-[radial-gradient(circle_at_40%_50%,rgba(16,185,129,0.3),transparent_55%),radial-gradient(circle_at_75%_35%,rgba(37,99,235,0.3),transparent_50%)]" />
          </div>
          <p className="hidden text-center text-white/30 md:block">→</p>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
            <p className="font-mono text-[10px] text-emerald-300/70 uppercase">Merged</p>
            <p className="mt-2 text-[13px] text-emerald-100">Clean · clustered · XML ready</p>
            <div className="mt-3 h-16 rounded-lg bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.45),transparent_60%)]" />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function MaOrgMergeAnalysisPage() {
  return (
    <ProductPageTemplate
      eyebrow="M&A Org Merge & Tech Debt"
      title="Turn Years of Technical Debt into Weeks of"
      italicWord="Clean Code"
      subtitle="The ultimate tool for Global Systems Integrators (GSIs) and Enterprise Architects. Automate Salesforce org merges, AppExchange optimization, and legacy code deletion."
      visual={<MergeVisual />}
      problemTitle="Human untangling doesn't"
      problemItalic="scale"
      problemBody="Merging two Fortune 500 Salesforce orgs takes 2 years and millions of dollars because humans cannot safely untangle a decade of undocumented spaghetti code."
      featuresTitle="Strategic"
      featuresItalic="transformation"
      features={[
        {
          title: "Surgical Org Merges",
          body: "Ingest two separate Salesforce repos. Jataka's GraphSAGE embeddings mathematically cluster overlapping logic and auto-generate the XML to merge them safely.",
          icon: GitMerge,
        },
        {
          title: "Autonomous Orphan Cleanup",
          body: "Jataka continuously scans for 100% dead metadata (0 dependencies) and generates destructive-change PRs to keep your org lean.",
          icon: Trash2,
        },
        {
          title: "AppExchange Optimization",
          body: "Reverse-engineer heavy managed packages (like nCino) to predict upgrade breakages before they take down your revenue operations.",
          icon: PackageSearch,
        },
      ]}
      resultTitle="Debt becomes a"
      resultItalic="delivery plan"
      resultBody="Org merges, orphan deletion, and package risk move from multi-year archaeology to weeks of mathematically grounded execution."
      primaryCtaLabel="Calculate Your Tech Debt ROI →"
      primaryCtaHref="/roi-calculator"
      secondaryCtaLabel="Book a briefing"
      secondaryCtaHref="/book-pilot"
      related={[
        { label: "Bitemporal Knowledge Graph", href: "/knowledge-graph" },
        { label: "Enterprise Governance", href: "/enterprise-governance" },
        { label: "ROI Calculator", href: "/roi-calculator" },
      ]}
      bottomCtaTitle="Quantify the debt. Then"
      bottomCtaItalic="cut it"
      bottomCtaSubtitle="Run the margin calculator, then book a merge briefing on your two orgs."
    />
  );
}
