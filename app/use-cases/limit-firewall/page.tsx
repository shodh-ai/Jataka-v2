"use client";

import { Database, Shield, Zap, Lock } from "lucide-react";
import { ProductPageTemplate } from "../../components/marketing";

export default function RuntimeLimitProtectionUseCase() {
  return (
    <ProductPageTemplate
      title="Runtime limit"
      italicWord="protection"
      subtitle="A bad deployment causes an Apex CPU timeout, crashing the sales portal during end-of-month closing. Revenue stops. Executives panic. The rollback takes hours."
      problemBody="A developer pushes code that worked perfectly in Dev. But Dev has 1,000 records. Production has 10 million. The code hits a Governor Limit at scale, and the sales portal crashes during end-of-month closing. The sales team can't close deals. Customer support can't access cases. Trust is broken. Revenue is lost."
      features={[
        {
          title: "Pre-Merge Limit Profiling",
          body: "Every PR is executed in an isolated Kamikaze Pod with Production-like data volumes before merge. We measure actual SOQL queries, DML statements, CPU milliseconds, and heap size — not estimates.",
          icon: Database,
        },
        {
          title: "Automatic PR Blocking",
          body: "If any Governor Limit threshold is breached during Sandbox execution, the PR is automatically blocked with a detailed report. No manual intervention required.",
          icon: Shield,
        },
        {
          title: "Line-by-Line Attribution",
          body: "When we catch a limit breach, we tell you exactly which line of code caused it. No more hunting through debug logs trying to find the culprit.",
          icon: Zap,
        },
        {
          title: "Zero False Positives",
          body: "We don't guess. We execute. If we say you're at 97/100 SOQL queries, that's a measured fact from actual execution, not a static analysis estimate.",
          icon: Lock,
        },
      ]}
      resultBody="Zero Sev-1 incidents from limit breaches. Sales portal stays up during peak hours. Revenue protected. Trust maintained. Engineering team sleeps better."
      related={[
        { label: "Automate PR Reviews", href: "/use-cases/automated-pr-reviews" },
        { label: "Knowledge Graph", href: "/knowledge-graph" },
        { label: "Catching Sev-1 Limits Demo", href: "/demos/catching-sev1-limits" },
      ]}
    />
  );
}
