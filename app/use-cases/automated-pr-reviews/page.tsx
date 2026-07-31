"use client";

import { Zap, Code, GitBranch, Clock } from "lucide-react";
import { ProductPageTemplate } from "../../components/marketing";

export default function AutomatedPrReviewsUseCase() {
  return (
    <ProductPageTemplate
      title="Automate PR"
      italicWord="reviews"
      subtitle="Senior architects spend 20 hours a week manually reviewing junior developers' PRs and reading debug logs. They're drowning in code reviews instead of building architecture."
      problemBody="Your best architects — the ones who should be designing scalable systems — are stuck reading SOQL queries in for loops. Every PR needs manual limit checking. Every deployment requires a senior engineer to approve. The agency can't scale because senior talent is wasted on junior work. The bottleneck is real, and it's killing velocity."
      features={[
        {
          title: "Automated Limit Profiling",
          body: "Every PR is automatically profiled for Governor Limits. No manual code review needed for limit checking. Jataka catches what humans miss.",
          icon: Zap,
        },
        {
          title: "AI-Generated Test Cases",
          body: "Jataka analyzes your Apex code and generates test cases for uncovered paths. Increase code coverage without manual test writing.",
          icon: Code,
        },
        {
          title: "Blast Radius Prediction",
          body: "Before merging, know exactly which components will be affected. Our Knowledge graph analysis maps all dependencies and predicts impact.",
          icon: GitBranch,
        },
        {
          title: "Instant Junior Feedback",
          body: "Junior developers get actionable feedback within seconds of pushing code. No waiting for senior architects to review. Learning accelerates.",
          icon: Clock,
        },
      ]}
      resultBody="Senior architects focus on high-value architecture. Junior developers get instant feedback and learn faster. Code quality improves automatically. The team scales without adding senior headcount."
      related={[
        { label: "Runtime Limit Protection", href: "/use-cases/limit-firewall" },
        { label: "Autonomous SDLC", href: "/use-cases/autonomous-sdlc" },
        { label: "Blast Radius Demo", href: "/demos/blast-radius-prediction" },
      ]}
    />
  );
}
