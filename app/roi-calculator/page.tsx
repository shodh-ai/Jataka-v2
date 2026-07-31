"use client";

import { useEffect, useState } from "react";
import { Users, Clock, AlertTriangle, DollarSign, TrendingUp, CheckCircle } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home";

const industryBenchmarks = [
  { metric: "Avg Salesforce developer hourly rate", value: "$175" },
  { metric: "Avg Sev-1 incident cost", value: "$150,000" },
  { metric: "Avg downtime per Sev-1", value: "4 hours" },
  { metric: "Avg test maintenance hours/week", value: "15 hours" },
];

const assumptions = [
  {
    title: "40% reduction in PR review time",
    body: "Jataka catches Governor Limit breaches before the PR reaches the reviewer, eliminating the most time-consuming reviews.",
  },
  {
    title: "90% reduction in test maintenance",
    body: "Self-healing tests automatically adapt to Salesforce UI changes, eliminating manual test fixes.",
  },
  {
    title: "80% of Sev-1 incidents prevented",
    body: "Jataka catches the majority of limit breaches and data corruption issues before they reach production.",
  },
  {
    title: "Your Sev-1 cost estimate",
    body: "You provided this value above. Industry average is $150,000, but your actual cost may vary based on company size and customer impact.",
  },
];

function SliderField({
  icon: Icon,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  hint,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <label className="mb-3 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[14px] font-medium text-[#111]">
          <Icon className="h-4 w-4 text-[#2563EB]" />
          {label}
        </span>
        <span className="font-mono text-[14px] font-semibold text-[#111]">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E8E8EC] accent-[#111]"
      />
      {hint ? <p className="mt-2 text-[12px] text-[#8A93A3]">{hint}</p> : null}
    </div>
  );
}

export default function ROICalculatorPage() {
  const [developers, setDevelopers] = useState(20);
  const [reviewHours, setReviewHours] = useState(10);
  const [sev1Incidents, setSev1Incidents] = useState(3);
  const [sev1Cost, setSev1Cost] = useState(150000);
  const [testMaintenanceHours, setTestMaintenanceHours] = useState(15);
  const [seniorDeveloperRate, setSeniorDeveloperRate] = useState(175);

  const [savings, setSavings] = useState({
    reviewTime: 0,
    testMaintenance: 0,
    preventedIncidents: 0,
    totalAnnual: 0,
  });

  useEffect(() => {
    // PR review time saved: 40% reduction in review time * hours * weeks * rate
    const reviewTimeSaved = reviewHours * 0.4 * 52 * seniorDeveloperRate;

    // Test maintenance saved: 90% reduction in test maintenance
    const testMaintenanceSaved = testMaintenanceHours * 0.9 * 52 * seniorDeveloperRate;

    // Prevented incidents: 80% of Sev-1s prevented * user-defined cost
    const preventedIncidentsCost = sev1Incidents * 0.8 * sev1Cost;

    const total = reviewTimeSaved + testMaintenanceSaved + preventedIncidentsCost;

    setSavings({
      reviewTime: Math.round(reviewTimeSaved),
      testMaintenance: Math.round(testMaintenanceSaved),
      preventedIncidents: Math.round(preventedIncidentsCost),
      totalAnnual: Math.round(total),
    });
  }, [developers, reviewHours, sev1Incidents, sev1Cost, testMaintenanceHours, seniorDeveloperRate]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <MarketingShell>
      <PageHero
        title="Calculate your annual"
        italicWord="savings"
        subtitle="Recovered engineering hours and prevented downtime. CFOs and VPs of Engineering use this to justify the investment."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "See pricing", href: "/pricing" },
        ]}
      />

      <ContentSection>
        <div className="grid gap-4 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-8">
              <h2 className="mb-6 text-[1.15rem] font-semibold tracking-[-0.02em] text-[#111]">
                Your inputs
              </h2>

              <SliderField
                icon={Users}
                label="Salesforce developers"
                value={developers}
                onChange={setDevelopers}
                min={1}
                max={200}
              />
              <SliderField
                icon={Clock}
                label="Senior PR review hours / week"
                value={reviewHours}
                onChange={setReviewHours}
                min={0}
                max={80}
              />
              <SliderField
                icon={Clock}
                label="Test maintenance hours / week"
                value={testMaintenanceHours}
                onChange={setTestMaintenanceHours}
                min={0}
                max={80}
              />
              <SliderField
                icon={AlertTriangle}
                label="Sev-1 incidents last year"
                value={sev1Incidents}
                onChange={setSev1Incidents}
                min={0}
                max={20}
              />
              <SliderField
                icon={DollarSign}
                label="Avg cost per Sev-1 outage"
                value={sev1Cost}
                onChange={setSev1Cost}
                min={10000}
                max={500000}
                step={5000}
                prefix="$"
                hint="Includes downtime, emergency engineering, customer impact"
              />
              <SliderField
                icon={DollarSign}
                label="Senior developer hourly rate"
                value={seniorDeveloperRate}
                onChange={setSeniorDeveloperRate}
                min={50}
                max={400}
                step={5}
                prefix="$"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="flex h-full flex-col rounded-[20px] border border-[#111]/08 bg-[#111] p-6 text-white shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-8">
              <h2 className="mb-6 text-[1.15rem] font-semibold tracking-[-0.02em]">Your savings</h2>

              <div className="mb-6 rounded-[16px] bg-white px-6 py-7 text-center text-[#111]">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-[#8A93A3] uppercase">
                  Total annual savings
                </p>
                <p className="mt-2 text-[clamp(2.2rem,4vw,3rem)] font-semibold tracking-[-0.04em]">
                  {formatCurrency(savings.totalAnnual)}
                </p>
              </div>

              <div className="flex-1 space-y-3">
                {[
                  { label: "PR Review Time Saved", value: savings.reviewTime },
                  { label: "Test Maintenance Saved", value: savings.testMaintenance },
                  { label: "Prevented Sev-1 Incidents", value: savings.preventedIncidents },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-[14px] text-white/85">{row.label}</span>
                    </div>
                    <span className="text-[15px] font-semibold">
                      {formatCurrency(row.value)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-white/55">Typical Jataka investment</span>
                  <span className="font-medium">$30,000 – $50,000/year</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[14px] font-medium">Your ROI</span>
                  <span className="text-[1.25rem] font-semibold text-emerald-400">
                    {Math.round((savings.totalAnnual / 40000) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </ContentSection>

      <ContentSection title="Industry" italicWord="benchmarks" align="center">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industryBenchmarks.map((benchmark, i) => (
            <FadeIn key={benchmark.metric} delay={i * 0.05}>
              <div className="rounded-[20px] border border-[#111]/08 bg-white p-5 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                <p className="text-[11px] tracking-[0.12em] text-[#8A93A3] uppercase">
                  {benchmark.metric}
                </p>
                <p className="mt-3 text-[1.5rem] font-semibold tracking-[-0.03em] text-[#111]">
                  {benchmark.value}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Calculation" italicWord="assumptions" align="center">
        <div className="mx-auto max-w-[720px] space-y-3">
          {assumptions.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.04}>
              <div className="flex items-start gap-3 rounded-[16px] border border-[#111]/08 bg-white p-5 text-left shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
                <p className="text-[14px] leading-[1.65] text-[#5F5F66]">
                  <strong className="text-[#111]">{item.title}</strong> — {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <PageCta
        title={`Ready to save ${formatCurrency(savings.totalAnnual)}?`}
        subtitle="See Jataka catch Governor Limit breaches and heal broken tests in real time."
        secondaryLabel="See pricing"
        secondaryHref="/pricing"
      />
    </MarketingShell>
  );
}
