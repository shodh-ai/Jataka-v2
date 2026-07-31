"use client";

import { RefreshCw, Eye, Zap, Clock } from "lucide-react";
import { ProductPageTemplate } from "../../components/marketing";

export default function SelfHealingUiTestsUseCase() {
  return (
    <ProductPageTemplate
      title="Self-healing UI"
      italicWord="tests"
      subtitle="Salesforce releases a UI update and 200 test scripts break. Jataka's AI automatically heals UI tests without human intervention. Tests stay green through every release."
      problemBody="Salesforce updates components regularly. Buttons change identifiers. Colors shift. Layouts reorganize. Your test scripts, built on brittle selectors, fail en masse. The QA team becomes a maintenance team, not a testing team. Every quarterly release means two weeks of maintenance hell."
      features={[
        {
          title: "Self-Healing Playwright Tests",
          body: "When Salesforce changes a UI element, our AI identifies it visually and updates the test element automatically. Tests stay green without human intervention.",
          icon: RefreshCw,
        },
        {
          title: "Visual Element Recognition",
          body: "We recognize UI elements the way a human does — by visual appearance, position, and context. No brittle selectors that break on every release.",
          icon: Eye,
        },
        {
          title: "Automatic Test Updates",
          body: "When an element changes, we update the test element in real-time. The test passes, and you get a notification about the change. Zero manual maintenance.",
          icon: Zap,
        },
        {
          title: "Zero Maintenance for UI Changes",
          body: "Salesforce releases 3 major updates per year. With Jataka, your UI tests stay green through all of them. No more sprint-killing maintenance cycles.",
          icon: Clock,
        },
      ]}
      resultBody="QA team focuses on testing new features. UI tests stay green through Salesforce releases. Zero maintenance overhead. The team becomes a value driver, not a cost center."
      related={[
        { label: "Self-Healing Demo", href: "/demos/self-healing-ui-tests" },
        { label: "Synthetic Monitoring", href: "/synthetic-production-monitoring" },
        { label: "All Use Cases", href: "/use-cases" },
      ]}
    />
  );
}
