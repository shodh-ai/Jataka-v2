"use client";

import { Clock, Activity, Video, Bell } from "lucide-react";
import { ProductPageTemplate } from "../components/marketing";

export default function SyntheticProductionMonitoringPage() {
  return (
    <ProductPageTemplate
      title="Synthetic production"
      italicWord="monitoring"
      subtitle="For Site Reliability Engineers. Jataka runs synthetic monitoring against your Production environment every 15 minutes. We autonomously verify critical UI flows and page your team with video evidence the second the UI breaks."
      problemBody="You find out Production is broken when a user opens a ticket — or worse, when revenue stops. Critical journeys like CPQ quoting and Opportunity creation fail silently between releases. SRE teams lack continuous, Salesforce-aware synthetic checks with proof of what broke."
      features={[
        {
          title: "15-Minute Cadence",
          body: "Automated monitoring executes synthetic transactions against Production every 15 minutes, 24/7. Never wait for a user to report a broken UI.",
          icon: Clock,
        },
        {
          title: "Critical Flow Monitoring",
          body: "Define your most critical user journeys — CPQ quoting, Opportunity creation, Case resolution. Jataka verifies they work end-to-end in your actual Production org.",
          icon: Activity,
        },
        {
          title: "Video Evidence Capture",
          body: "When a flow breaks, Jataka captures video evidence of exactly what failed, where the UI broke, and what error appeared. No more 'works on my machine' debugging.",
          icon: Video,
        },
        {
          title: "Instant Paging",
          body: "Integrates with PagerDuty, Slack, and ServiceNow. Your SRE team knows about Production issues within minutes, not hours or days.",
          icon: Bell,
        },
      ]}
      resultBody="Know about Production UI failures within minutes — with video proof attached. Critical journeys stay verified continuously, not just at release time."
      related={[
        { label: "Self-Healing UI Tests", href: "/use-cases/self-healing-ui-tests" },
        { label: "Architecture Agent", href: "/architecture-agent" },
        { label: "Knowledge Graph", href: "/knowledge-graph" },
      ]}
    />
  );
}
