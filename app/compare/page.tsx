"use client";

import Link from "next/link";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home";

const comparisons = [
  {
    href: "/compare/copado",
    name: "Copado",
    subtitle: "Runtime security vs release management",
    body: "Copado moves metadata and orchestrates deployments. Jataka profiles Governor Limits before merge. Use both.",
  },
  {
    href: "/compare/clayton",
    name: "Clayton",
    subtitle: "Runtime execution vs static text scanning",
    body: "Clayton keeps code clean. Jataka executes transactions against real data volumes and catches what static rules miss.",
  },
  {
    href: "/compare/provar",
    name: "Provar",
    subtitle: "Self-healing tests vs traditional UI testing",
    body: "Provar tests the UI. Jataka heals tests automatically and profiles the database in the same pipeline.",
  },
];

export default function CompareHubPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Jataka"
        italicWord="compared"
        subtitle="See how Jataka complements the tools you already use — and where runtime profiling changes the game."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "See pricing", href: "/pricing" },
        ]}
      />

      <ContentSection title="Pick a" italicWord="comparison">
        <div className="grid gap-4 md:grid-cols-3">
          {comparisons.map((item, i) => (
            <FadeIn key={item.href} delay={i * 0.06}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-colors hover:border-[#111]/2 md:p-7"
              >
                <p className="font-mono text-[11px] tracking-[0.16em] text-[#8A93A3] uppercase">
                  vs {item.name}
                </p>
                <h3 className="mt-3 text-[1.25rem] font-semibold tracking-[-0.02em] text-[#111]">
                  Jataka vs {item.name}
                </h3>
                <p className="mt-2 text-[13px] font-medium text-[#2563EB]">{item.subtitle}</p>
                <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-[#5F5F66]">{item.body}</p>
                <span className="mt-5 text-[13px] font-medium text-[#111] transition-transform group-hover:translate-x-0.5">
                  Read comparison →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <PageCta
        title="See it on your"
        italicWord="org"
        subtitle="14-day Shadow Mode. Zero risk. We prove value before you pay."
      />
    </MarketingShell>
  );
}
