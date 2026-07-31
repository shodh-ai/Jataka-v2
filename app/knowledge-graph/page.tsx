"use client";

import { Shield, Trash2, Bot, Code, Users } from "lucide-react";
import { ProductPageTemplate } from "../components/marketing";

export default function KnowledgeGraphPage() {
  return (
    <ProductPageTemplate
      title="The Jataka knowledge"
      italicWord="graph"
      subtitle="We map the entire enterprise architecture into a real-time context engine — Salesforce metadata, GitHub PRs, and Jira intent — so every tool in your pipeline shares the same blast radius."
      problemBody="Salesforce orgs are chaos: overlapping metadata, tribal knowledge about what depends on what, and tools that don't share context. Developers guess. Auditors chase permissions. Integrations break silently. Without a living map of the org, every release is a roll of the dice."
      featuresTitle="What the graph"
      featuresItalic="powers"
      features={[
        {
          title: "The Limit Firewall",
          body: "Stops Production crashes by blocking SOQL & DML loops, catching CPU timeouts, detecting data skew, and enforcing API limits at the PR level.",
          icon: Shield,
        },
        {
          title: "Tech Debt & Architecture",
          body: "Prevents duplicate fields, discovers orphan nodes safe for deletion, enforces architecture standards, and autonomously cleans up legacy bloat.",
          icon: Trash2,
        },
        {
          title: "Autonomous QA",
          body: "Self-healing UI tests with Vision AI, video logs for audits, smart data seeding, and verification that refactored code maintains original business logic.",
          icon: Bot,
        },
        {
          title: "Developer Experience",
          body: "Query blast radius inside Cursor before saving. Ask plain-English questions via Slack. Verify PR code fulfills original Jira acceptance criteria.",
          icon: Code,
        },
        {
          title: "Enterprise Use Cases",
          body: "M&A org merge mapping, security audits for PII access, API contract guardian for ERP integrations, synthetic monitoring, and legacy Workflow-to-Flow migration.",
          icon: Users,
        },
      ]}
      resultBody="One real-time context engine for the whole enterprise architecture. Every PR, ticket, and IDE question shares the same dependency map — so teams ship with certainty instead of tribal knowledge."
      related={[
        { label: "Architecture Agent", href: "/architecture-agent" },
        { label: "Autonomous SDLC", href: "/use-cases/autonomous-sdlc" },
        { label: "Blast Radius Demo", href: "/demos/blast-radius-prediction" },
      ]}
    />
  );
}
