"use client";

import { Shield, Search, Trash2, RefreshCw } from "lucide-react";
import { ProductPageTemplate } from "../components/marketing";

export default function ArchitectureAgentPage() {
  return (
    <ProductPageTemplate
      title="Clean your"
      italicWord="org"
      subtitle="Jataka doesn't just predict the blast radius of new code — it actively hunts down 10 years of legacy technical debt, enforces architectural best practices, and safely refactors spaghetti code before you hit Salesforce limits."
      problemBody="Developers are terrified to reuse old fields, so they create new ones until the org hits custom-field limits. System Integrators spend thousands of billable hours manually tracing what is safe to delete. Other tools suggest deleting tech debt, but nobody actually deletes it because they fear breaking Production."
      features={[
        {
          title: "Org-Bloat Prevention",
          body: "When a developer opens a PR creating a new field, Jataka queries the graph, finds identical existing fields, and blocks the PR. It also enforces architectural standards — blocking risky Flows that would cause CPU timeouts at scale.",
          icon: Shield,
        },
        {
          title: "Orphan Discovery",
          body: "Because Jataka maps every dependency directionally, it instantly identifies Orphan Nodes — custom fields, old workflow rules, and Apex classes with zero connections to active UI or database logic. A 3-month manual audit becomes a 3-second query.",
          icon: Search,
        },
        {
          title: "Autonomous Refactoring",
          body: "Jataka takes Orphan Nodes and autonomously generates destructiveChanges.xml files to permanently delete dead weight. It then uses the LLM to rewrite and condense legacy spaghetti Apex into clean, modern code.",
          icon: Trash2,
        },
        {
          title: "Run-Clean-Run",
          body: "Before deleting a field or refactoring a legacy Trigger, Jataka captures a baseline via the API Limit Firewall. After cleanup, it runs the same test again — proving the org performs the same business logic with less code and zero governor limit breaches.",
          icon: RefreshCw,
        },
      ]}
      resultBody="10 years of legacy code, cleaned with mathematical proof that nothing breaks. Orphan nodes, dead code, and architectural violations surface automatically — and get fixed safely."
      related={[
        { label: "Knowledge Graph", href: "/knowledge-graph" },
        { label: "Compliance & Security Audit", href: "/compliance-security-xray" },
        { label: "M&A Org Merge Analysis", href: "/ma-org-merge-intelligence" },
      ]}
    />
  );
}
