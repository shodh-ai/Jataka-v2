"use client";

import Link from "next/link";
import { BrainCircuit, Zap, Shield, ChevronRight } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home/FadeIn";

const demos = [
  {
    slug: "blast-radius-prediction",
    title: "Blast Radius Prediction",
    body: "Watch Jataka's Knowledge dependency graph calculate the blast radius of code changes before they're made — with Cursor IDE integration via MCP.",
    icon: BrainCircuit,
    meta: "2:52",
  },
  {
    slug: "catching-sev1-limits",
    title: "Catching Sev-1 Limits",
    body: "Watch Jataka catch a SOQL query inside a for loop before it causes a production incident — real-time limit profiling with automatic merge blocking.",
    icon: Zap,
    meta: "2:45",
  },
  {
    slug: "self-healing-ui-tests",
    title: "Self-Healing UI Tests",
    body: "Watch Jataka's Vision AI automatically heal UI tests when Salesforce releases break Selenium scripts. Zero maintenance for UI changes.",
    icon: Shield,
    meta: "2:18",
  },
];

export default function DemosHubPage() {
  return (
    <MarketingShell>
      <PageHero
        title="See Jataka"
        italicWord="in action"
        subtitle="Short demos of the capabilities that prevent Sev-1s, predict blast radius, and keep UI tests green."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "See use cases", href: "/use-cases" },
        ]}
      />

      <ContentSection title="Product" italicWord="demos" align="left">
        <div className="grid gap-4 md:grid-cols-3">
          {demos.map((demo, i) => {
            const Icon = demo.icon;
            return (
              <FadeIn key={demo.slug} delay={i * 0.05}>
                <Link
                  href={`/demos/${demo.slug}`}
                  className="group flex h-full flex-col rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-colors hover:border-[#111]/2 md:p-7"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#111]/08 bg-[#F8FAFC] text-[#2563EB]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-semibold tracking-[0.14em] text-[#8A93A3] uppercase">
                      {demo.meta}
                    </span>
                  </div>
                  <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[#111]">
                    {demo.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-[1.65] text-[#5F5F66]">
                    {demo.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-[#111] transition-all group-hover:gap-2">
                    Watch demo <ChevronRight className="h-4 w-4" />
                  </span>
                </Link>
              </FadeIn>
            );
          })}
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
