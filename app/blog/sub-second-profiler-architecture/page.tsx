"use client";

import { CheckCircle, GitBranch, Database, Cpu, Shield, Zap } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../../components/marketing";
import { FadeIn } from "../../components/home";

const architectureLayers = [
  {
    layer: "1. PR Integration",
    description:
      "GitHub/GitLab webhook triggers profiler on every PR. No manual intervention required.",
    icon: GitBranch,
  },
  {
    layer: "2. Sandbox Connection",
    description:
      "Instant OAuth connection to your existing Integration/Staging Sandbox. No slow provisioning — uses your existing data volumes.",
    icon: Database,
  },
  {
    layer: "3. Transaction Execution",
    description:
      "Apex code executed via REST/Tooling API. Real user scenarios simulated with your actual data volumes.",
    icon: Cpu,
  },
  {
    layer: "4. Real-Time Telemetry",
    description:
      "Sforce-Limit-Info HTTP headers + Debug Log parsing. No injected Apex — pure external observation.",
    icon: Shield,
  },
  {
    layer: "5. Breach Detection",
    description:
      "CUMULATIVE_LIMIT_USAGE parsing with line-level attribution. Exact code location of the limit breach.",
    icon: Zap,
  },
];

const performanceMetrics = [
  { metric: "Average profiling time", value: "<500ms" },
  { metric: "Sandbox connection", value: "Instant (OAuth)" },
  { metric: "Header capture latency", value: "<50ms" },
  { metric: "Debug log parsing", value: "~200ms" },
];

const challengeItems = [
  "Data volumes (how many records trigger your code)",
  "Execution context (trigger recursion, flow chaining)",
  "Concurrent operations (lock contention, sharing recalculation)",
  "User behavior (batch sizes, UI interactions)",
];

const isolationItems = [
  { title: "Real data volumes", body: "Profile against actual record counts in your sandbox" },
  { title: "No data copying", body: "We never read or store your actual records" },
  { title: "Instant setup", body: "OAuth connection in milliseconds, not minutes" },
  { title: "Existing metadata", body: "No redeployment needed — your sandbox is ready" },
];

export default function SubSecondProfilerPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Sub-second"
        italicWord="profiler"
        subtitle="How Jataka profiles Salesforce transactions without access to production data — designed for security, isolation, and speed."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "All posts", href: "/blog" },
        ]}
      />

      <ContentSection title="The" italicWord="challenge">
        <FadeIn>
          <div className="mx-auto max-w-[720px] space-y-5 text-[16px] leading-[1.8] text-[#5F5F66]">
            <p>
              Salesforce Governor Limits are enforced at runtime. You can&apos;t predict them
              from static code because they depend on:
            </p>
            <ul className="space-y-3">
              {challengeItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              To catch breaches before production, we execute code in an environment that
              mimics production volumes — without ever touching actual production data.
            </p>
          </div>
        </FadeIn>
      </ContentSection>

      <ContentSection title="The" italicWord="architecture">
        <div className="space-y-4">
          {architectureLayers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <FadeIn key={layer.layer} delay={i * 0.05}>
                <article className="flex items-start gap-4 rounded-[20px] border border-[#111]/08 bg-white p-5 shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#111]/08 bg-[#F8FAFC] text-[#2563EB]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-[#111]">
                      {layer.layer}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-[1.65] text-[#5F5F66]">
                      {layer.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </ContentSection>

      <ContentSection title="Isolation &" italicWord="security">
        <FadeIn>
          <div className="mx-auto max-w-[720px] space-y-5 text-[16px] leading-[1.8] text-[#5F5F66]">
            <p>
              Instead of slow scratch org provisioning, Jataka connects instantly to your
              existing Integration or Staging Sandbox via OAuth.
            </p>
            <ul className="space-y-3">
              {isolationItems.map((item) => (
                <li key={item.title} className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>
                    <strong className="text-[#111]">{item.title}</strong> — {item.body}
                  </span>
                </li>
              ))}
            </ul>
            <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
              <p className="text-[14px] leading-[1.7] text-[#5F5F66]">
                <strong className="text-[#111]">Security guarantee:</strong> Jataka only
                reads limit headers and debug logs. We never query your actual records. Your
                data stays in your Salesforce org — we only observe telemetry Salesforce
                already exposes.
              </p>
            </div>
          </div>
        </FadeIn>
      </ContentSection>

      <ContentSection title="Performance" italicWord="characteristics">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {performanceMetrics.map((item, i) => (
            <FadeIn key={item.metric} delay={i * 0.05}>
              <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                <p className="text-[1.5rem] font-semibold tracking-[-0.03em] text-[#111]">
                  {item.value}
                </p>
                <p className="mt-2 text-[13px] text-[#5F5F66]">{item.metric}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-8 max-w-[640px] text-center text-[15px] leading-[1.7] text-[#5F5F66]">
            The entire profiling pipeline — from PR webhook to breach report — completes in
            under 2 minutes for most transactions. Developers get feedback before they
            context-switch.
          </p>
        </FadeIn>
      </ContentSection>

      <PageCta
        title="Profile your next PR in"
        italicWord="milliseconds"
        subtitle="Book a pilot and see sub-second Governor Limit feedback on your own org."
        secondaryLabel="All posts"
        secondaryHref="/blog"
      />
    </MarketingShell>
  );
}
