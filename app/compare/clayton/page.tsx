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
    category: "Analysis Method",
    jataka: "Runtime execution profiling",
    competitor: "Static text scanning",
    jatakaHas: true,
    competitorHas: true,
  },
  {
    category: "SOQL 101 Detection",
    jataka: "Catches actual limit breach",
    competitor: "Flags SOQL in loops (maybe)",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "DML 151 Detection",
    jataka: "Catches actual limit breach",
    competitor: "Flags DML in loops (maybe)",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "CPU Timeout Detection",
    jataka: "Measures actual CPU time",
    competitor: "No CPU profiling",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "Data Skew Detection",
    jataka: "Analyzes parent-child ratios",
    competitor: "No data model analysis",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "Mixed DML Detection",
    jataka: "Detects Setup/non-Setup conflict",
    competitor: "No transaction analysis",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "Production Data Volumes",
    jataka: "Tests with realistic data",
    competitor: "No execution context",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "Trigger Collision Detection",
    jataka: "Simulates multiple triggers",
    competitor: "No runtime simulation",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "Code Style Rules",
    jataka: "No (use Clayton/PMD)",
    competitor: "Extensive rule library",
    jatakaHas: false,
    competitorHas: true,
  },
  {
    category: "Security Scanning",
    jataka: "No (use Clayton)",
    competitor: "Apex security analysis",
    jatakaHas: false,
    competitorHas: true,
  },
  {
    category: "Naming Conventions",
    jataka: "No",
    competitor: "Yes",
    jatakaHas: false,
    competitorHas: true,
  },
];

const useCases = [
  {
    title: "You need Clayton if",
    items: [
      "Enforcing naming conventions and code style",
      "Running Apex security scanning in CI",
      "Tracking test coverage percentages",
      "Keeping the codebase clean with static rules",
    ],
  },
  {
    title: "You need Jataka if",
    items: [
      "Catching actual SOQL/DML limit breaches before merge",
      "Measuring CPU time against real data volumes",
      "Detecting data skew and mixed DML at runtime",
      "Simulating trigger collisions in production-like sandboxes",
    ],
  },
];

export default function CompareClaytonPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Jataka vs"
        italicWord="Clayton"
        subtitle="Clayton reads text. Jataka executes transactions. Static analysis can't predict runtime behavior without your data volumes and trigger interactions."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "See anti-patterns", href: "/anti-patterns" },
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
                  Clayton
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
        title="Clayton reads text. Jataka"
        italicWord="executes"
        subtitle="Book a demo to see Jataka catch the runtime errors that static analysis can't predict."
        secondaryLabel="See what Jataka catches"
        secondaryHref="/anti-patterns"
      />
    </MarketingShell>
  );
}
