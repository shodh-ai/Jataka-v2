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
    category: "Core Function",
    jataka: "Runtime limit profiling & breach prevention",
    competitor: "CI/CD pipeline & release management",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "Governor Limit Detection",
    jataka: "Real-time execution profiling",
    competitor: "Static code analysis only",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "SOQL 101 Prevention",
    jataka: "Catches before merge",
    competitor: "Relies entirely on developer-written Apex tests",
    jatakaHas: true,
    competitorHas: false,
  },
  {
    category: "DML 151 Prevention",
    jataka: "Catches before merge",
    competitor: "Relies entirely on developer-written Apex tests",
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
    category: "Self-Healing UI Tests",
    jataka: "AI-powered test healing",
    competitor: "No test healing",
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
    category: "Release Pipelines",
    jataka: "No (use Copado)",
    competitor: "Full CI/CD automation",
    jatakaHas: false,
    competitorHas: true,
  },
  {
    category: "Version Control",
    jataka: "GitHub integration",
    competitor: "Full Git management",
    jatakaHas: false,
    competitorHas: true,
  },
  {
    category: "Environment Management",
    jataka: "No",
    competitor: "Full sandbox orchestration",
    jatakaHas: false,
    competitorHas: true,
  },
];

const useCases = [
  {
    title: "You need Copado if",
    items: [
      "Managing complex release pipelines across multiple sandboxes",
      "Coordinating deployments with multiple developers",
      "Tracking metadata changes across environments",
      "Automating regression testing in pipelines",
    ],
  },
  {
    title: "You need Jataka if",
    items: [
      "Preventing Governor Limit exceptions before production",
      "Catching SOQL/DML anti-patterns at runtime",
      "Profiling CPU time with realistic data volumes",
      "Healing UI tests that break on Salesforce releases",
    ],
  },
];

export default function CompareCopadoPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Jataka vs"
        italicWord="Copado"
        subtitle="Copado manages your releases. Jataka secures your runtime. Enterprises use both for complete Salesforce DevSecOps."
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
                  Copado
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
        title="Use Copado for releases. Use Jataka for"
        italicWord="runtime"
        subtitle="Book a demo to see how Jataka catches the Governor Limit breaches that static analysis misses."
        secondaryLabel="See what Jataka catches"
        secondaryHref="/anti-patterns"
      />
    </MarketingShell>
  );
}
