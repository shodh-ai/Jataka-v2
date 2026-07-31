"use client";

import { Copy, AlertCircle, GitMerge, Zap } from "lucide-react";
import { ProductPageTemplate } from "../components/marketing";

export default function MaOrgMergeAnalysisPage() {
  return (
    <ProductPageTemplate
      title="M&A org merge"
      italicWord="analysis"
      subtitle="For Enterprise System Integrators. Compare two separate Salesforce orgs. Jataka maps the 100% metadata overlap, identifying duplicate custom fields and conflicting Triggers to accelerate Post-Merger integrations."
      problemBody="Post-merger Salesforce integrations are brutal. Two orgs with overlapping custom fields, conflicting Triggers, and incompatible automation. Manual mapping takes months. System Integrators burn billable hours tracing metadata by hand while the business waits for a single source of truth."
      features={[
        {
          title: "Duplicate Detection",
          body: "Instantly identify duplicate custom fields across two orgs. See when Org A's Invoice_Total__c maps to Org B's Amount__c with semantic understanding.",
          icon: Copy,
        },
        {
          title: "Conflict Resolution",
          body: "Detect conflicting Apex Triggers, validation rules, and workflow logic before merge. Know which automations will collide and how to resolve them.",
          icon: AlertCircle,
        },
        {
          title: "Merge Path Mapping",
          body: "Generate the exact sequence of steps to merge two orgs safely. Jataka creates the deployment plan with dependencies mapped in the correct order.",
          icon: GitMerge,
        },
        {
          title: "Accelerated Integration",
          body: "Turn a 6-month manual org merge into a 6-week automated process. System Integrators deliver faster with mathematical certainty.",
          icon: Zap,
        },
      ]}
      resultBody="Faster post-merger integrations with duplicate fields mapped, conflicts surfaced early, and a clear merge path — so System Integrators deliver with confidence."
      related={[
        { label: "Architecture Agent", href: "/architecture-agent" },
        { label: "Knowledge Graph", href: "/knowledge-graph" },
        { label: "Limit Firewall", href: "/use-cases/limit-firewall" },
      ]}
    />
  );
}
