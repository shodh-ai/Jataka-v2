"use client";

import { Check, X as XIcon } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../../components/marketing";
import { FadeIn } from "../../components/home";

const comparisonData = [
  {
    category: "UI Test Creation",
    jataka: "Uses modern Playwright executing in isolated Kubernetes pods",
    competitor: "Proprietary test builder",
    jatakaHas: true,
    competitorHas: true,
  },
  {
    category: "Self-Healing Tests",
    jataka: "AI heals broken tests automatically",
    competitor: "Manual test maintenance required",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "Salesforce Release Updates",
    jataka: "Tests stay green automatically",
    competitor: "Tests break, manual fix needed",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "Governor Limit Profiling",
    jataka: "Real-time limit detection",
    competitor: "No limit profiling",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "SOQL 101 Detection",
    jataka: "Catches before production",
    competitor: "No database profiling",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "CPU Timeout Detection",
    jataka: "Production-scale testing",
    competitor: "No CPU profiling",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "Blast Radius Prediction",
    jataka: "Dependency graph analysis",
    competitor: "No impact analysis",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "Test Maintenance Time",
    jataka: "Near zero (self-healing)",
    competitor: "High (manual updates)",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "Visual Test Builder",
    jataka: "No (code-based)",
    competitor: "Yes (low-code builder)",
    jatakaHas: false,
    competitorHas: true,
  },
  {
    category: "Cross-Browser Testing",
    jataka: "Via Playwright",
    competitor: "Built-in support",
    jatakaHas: true,
    competitorHas: true,
  },
];

const useCases = [
  {
    title: "You need Provar if",
    items: [
      "Building UI tests with a visual low-code builder",
      "Preferring a proprietary Salesforce-focused test IDE",
      "Need built-in cross-browser suites out of the box",
      "Your team is already trained on Provar workflows",
    ],
  },
  {
    title: "You need Jataka if",
    items: [
      "Reducing test maintenance after every Salesforce release",
      "Self-healing Playwright tests that stay green",
      "Profiling Governor Limits alongside UI coverage",
      "Predicting blast radius before risky changes ship",
    ],
  },
];

export default function CompareProvarPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Jataka vs"
        italicWord="Provar"
        subtitle="Provar tests the UI. Jataka heals the UI and profiles the database. When Salesforce ships three major releases a year, Provar tests break — Jataka tests stay green."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "Self-healing UI tests", href: "/use-cases/self-healing-ui-tests" },
        ]}
      />

      <ContentSection title="Feature" italicWord="comparison">
        <FadeIn>
          <div className="overflow-hidden rounded-[20px] border border-[#111]/08 bg-white shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
            <div className="grid grid-cols-3 bg-[#111]">
              <div className="p-4 md:p-5">
                <span className="text-[11px] font-semibold tracking-[0.14em] text-[#8A93A3] uppercase">
                  Feature
                </span>
              </div>
              <div className="border-l border-white/10 p-4 md:p-5">
                <span className="text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
                  Jataka
                </span>
              </div>
              <div className="border-l border-white/10 p-4 md:p-5">
                <span className="text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
                  Provar
                </span>
              </div>
            </div>
            {comparisonData.map((row, index) => (
              <div
                key={row.category}
                className={`grid grid-cols-3 ${
                  index !== comparisonData.length - 1 ? "border-b border-[#111]/06" : ""
                }`}
              >
                <div className="bg-[#F8F8F9] p-3.5 md:p-5">
                  <span className="text-[13px] font-medium text-[#111] md:text-[14px]">
                    {row.category}
                  </span>
                </div>
                <div
                  className={`border-l border-[#111]/06 p-3.5 md:p-5 ${
                    row.jatakaHas ? "bg-emerald-50/50" : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {row.jatakaHas ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    ) : (
                      <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#C4C4CC]" />
                    )}
                    <span className="text-[12px] leading-[1.5] text-[#5F5F66] md:text-[13px]">
                      {row.jataka}
                    </span>
                  </div>
                </div>
                <div
                  className={`border-l border-[#111]/06 p-3.5 md:p-5 ${
                    row.competitorHas ? "bg-emerald-50/50" : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {row.competitorHas ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    ) : (
                      <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#C4C4CC]" />
                    )}
                    <span className="text-[12px] leading-[1.5] text-[#5F5F66] md:text-[13px]">
                      {row.competitor}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </ContentSection>

      <ContentSection title="When to use" italicWord="each" align="center">
        <div className="grid gap-4 md:grid-cols-2">
          {useCases.map((useCase, i) => (
            <FadeIn key={useCase.title} delay={i * 0.06}>
              <article className="h-full rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-7">
                <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[#111]">
                  {useCase.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {useCase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span className="text-[14px] leading-[1.55] text-[#5F5F66]">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <PageCta
        title="Provar tests the UI. Jataka"
        italicWord="heals"
        subtitle="Book a demo to see Jataka heal broken tests and catch Governor Limits that UI-only tools miss."
        secondaryLabel="Self-healing UI tests"
        secondaryHref="/use-cases/self-healing-ui-tests"
      />
    </MarketingShell>
  );
}
