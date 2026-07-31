"use client";

import { Ticket, Cpu, GitBranch, CheckCircle } from "lucide-react";
import { ProductPageTemplate } from "../../components/marketing";

export default function AutonomousSdlcPage() {
  return (
    <ProductPageTemplate
      title="The autonomous"
      italicWord="SDLC"
      subtitle="Jataka doesn't just wait for pull requests. It manages the entire lifecycle — Jira to Cursor to GitHub to Jataka and back. You aren't just catching limits; you are automating the entire Software Development Life Cycle."
      problemBody="Developers constantly context-switch between Jira, their IDE, GitHub, Slack, and QA tools. Manual handoffs create bottlenecks. Ticket status drifts from reality. Testing happens late. Traceability from requirement to deploy is tribal knowledge, not a system."
      featuresTitle="How it"
      featuresItalic="works"
      features={[
        {
          title: "Intent — Jira Integration",
          body: "Jataka reads the Jira ticket and updates the Knowledge graph with business intent. Requirements map to existing Salesforce metadata, and affected objects, classes, and flows are identified automatically.",
          icon: Ticket,
        },
        {
          title: "Code — Cursor IDE + MCP",
          body: "Through our MCP, your developer asks Cursor how to build the feature. Jataka feeds Cursor the exact blast radius and safe code patterns based on your org.",
          icon: Cpu,
        },
        {
          title: "Verify — GitHub PR Analysis",
          body: "The developer opens a PR. Jataka's API Firewall and Kamikaze Pods test the limits and the UI automatically — runtime profiling plus Vision AI in a real browser.",
          icon: GitBranch,
        },
        {
          title: "Resolve — Jira + Cursor Feedback",
          body: "If limits breach, Jataka sends feedback back to Cursor. If it passes, Jataka updates the Jira ticket to Ready for Deployment with attached video proof.",
          icon: CheckCircle,
        },
      ]}
      resultBody="Developers stay in their IDE. Jataka handles orchestration, testing, and ticket management. 80% less context switching, faster time to production, and 100% traceability from ticket to deploy."
      related={[
        { label: "Knowledge Graph", href: "/knowledge-graph" },
        { label: "Automate PR Reviews", href: "/use-cases/automated-pr-reviews" },
        { label: "Architecture Agent", href: "/architecture-agent" },
      ]}
    />
  );
}
