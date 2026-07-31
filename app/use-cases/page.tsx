"use client";

import Link from "next/link";
import { Building2, Users, TestTube, ChevronRight } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home/FadeIn";

const useCases = [
  {
    slug: "limit-firewall",
    title: "Prevent Governor Limits",
    subtitle: "Protecting margins",
    icon: Building2,
    body: "A bad deployment causes an Apex CPU timeout, crashing the sales portal during end-of-month closing. Jataka's Backend Firewall guarantees zero runtime crashes from Governor Limit breaches.",
    result: "Zero Sev-1 incidents from limit breaches. $2M+/yr in protected revenue.",
  },
  {
    slug: "automated-pr-reviews",
    title: "Automate PR Reviews",
    subtitle: "Code quality at scale",
    icon: Users,
    body: "Senior architects spend 20 hours a week manually reviewing junior developers' PRs. Jataka automates code review, limit checking, and test generation.",
    result: "18 hrs/wk saved. +40% junior dev velocity. +300% architecture time.",
  },
  {
    slug: "self-healing-ui-tests",
    title: "Self-Healing UI Tests",
    subtitle: "Killing test maintenance",
    icon: TestTube,
    body: "Salesforce releases a UI update and 200 Selenium scripts break. Jataka's Vision AI automatically heals UI tests without human intervention.",
    result: "-90% test maintenance. 99.5% tests passing. +60% QA velocity.",
  },
];

export default function UseCasesPage() {
  return (
    <MarketingShell>
      <PageHero
        title="How teams use"
        italicWord="Jataka"
        subtitle="Three specific scenarios. Three painful problems. Three reasons Jataka exists. Which one is your story?"
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "See pricing", href: "/pricing" },
        ]}
      />

      <ContentSection title="Core" italicWord="use cases" align="left">
        <div className="grid gap-4 md:grid-cols-3">
          {useCases.map((useCase, i) => {
            const Icon = useCase.icon;
            return (
              <FadeIn key={useCase.slug} delay={i * 0.05}>
                <Link
                  href={`/use-cases/${useCase.slug}`}
                  className="group flex h-full flex-col rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-colors hover:border-[#111]/2 md:p-7"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#111]/08 bg-[#F8FAFC] text-[#2563EB]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[12px] text-[#C4C4CC]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[#111]">
                    {useCase.title}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-[#8A93A3]">{useCase.subtitle}</p>
                  <p className="mt-2.5 flex-1 text-[14px] leading-[1.65] text-[#5F5F66]">
                    {useCase.body}
                  </p>
                  <p className="mt-4 text-[13px] leading-[1.55] text-[#3A3A42]">
                    {useCase.result}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-[#111] transition-all group-hover:gap-2">
                    Read full story <ChevronRight className="h-4 w-4" />
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
        subtitle="Book a demo and see Jataka catch real issues in your Salesforce codebase."
        secondaryLabel="See pricing"
        secondaryHref="/pricing"
      />
    </MarketingShell>
  );
}
