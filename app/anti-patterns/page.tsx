"use client";

import Link from "next/link";
import { Database, Zap, Cpu, AlertTriangle, Lock } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home";

const limitBreaches = [
  {
    id: "soql-101",
    title: "Too many SOQL queries: 101",
    error: "System.LimitException: Too many SOQL queries: 101",
    description:
      "The classic SOQL-in-a-for-loop. Works in dev, then crashes production when data volumes are real.",
    icon: Database,
    limit: "100 queries per transaction",
    severity: "Critical",
  },
  {
    id: "dml-151",
    title: "Too many DML statements: 151",
    error: "System.LimitException: Too many DML statements: 151",
    description:
      "DML inside a loop hits 151 statements. Trigger crashes mid-transaction — partial rollback chaos.",
    icon: Zap,
    limit: "150 statements per transaction",
    severity: "Critical",
  },
  {
    id: "cpu-timeout",
    title: "Apex CPU time limit exceeded",
    error: "System.LimitException: Apex CPU time limit exceeded",
    description:
      "Nested loops that pass in Sandbox burn through 10 seconds of CPU with production volumes.",
    icon: Cpu,
    limit: "10,000ms sync / 60,000ms async",
    severity: "Critical",
  },
  {
    id: "mixed-dml",
    title: "UNCOMMITTED_WORK_PENDING",
    error: "System.DmlException: UNCOMMITTED_WORK_PENDING",
    description:
      "Setup and non-Setup DML in the same transaction. Salesforce blocks it — many teams find out in prod.",
    icon: AlertTriangle,
    limit: "Setup & non-Setup objects",
    severity: "High",
  },
  {
    id: "lock-contention",
    title: "UNABLE_TO_LOCK_ROW",
    error: "System.DmlException: UNABLE_TO_LOCK_ROW",
    description:
      "Data skew on a hot parent record. Concurrent updates stall the org waiting for a lock.",
    icon: Lock,
    limit: "Record lock contention",
    severity: "High",
  },
];

export default function AntiPatternsPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Caught before"
        italicWord="production"
        subtitle="When developers hit a Governor Limit at 2:00 AM, they Google the error. These pages show exactly how Jataka blocks the breach before merge."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "How it works", href: "/docs" },
        ]}
      />

      <ContentSection title="The" italicWord="library">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {limitBreaches.map((breach, i) => {
            const Icon = breach.icon;
            return (
              <FadeIn key={breach.id} delay={i * 0.05}>
                <Link
                  href={`/anti-patterns/${breach.id}`}
                  className="group flex h-full flex-col rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-colors hover:border-[#111]/2 md:p-7"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#111]/08 bg-[#F8FAFC] text-[#2563EB]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-semibold tracking-[0.14em] text-[#8A93A3] uppercase">
                      {breach.severity}
                    </span>
                  </div>
                  <h3 className="text-[1.1rem] font-semibold tracking-[-0.02em] text-[#111]">
                    {breach.title}
                  </h3>
                  <code className="mt-3 block truncate rounded-lg bg-[#F3F3F4] px-3 py-2 font-mono text-[11px] text-[#5F5F66]">
                    {breach.error}
                  </code>
                  <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-[#5F5F66]">
                    {breach.description}
                  </p>
                  <p className="mt-4 text-[12px] text-[#8A93A3]">Limit: {breach.limit}</p>
                  <span className="mt-4 text-[13px] font-medium text-[#111] transition-transform group-hover:translate-x-0.5">
                    Read the fix →
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </ContentSection>

      <PageCta
        title="Jataka catches every breach before the"
        italicWord="merge"
        subtitle="Book a demo and watch real limit breaches get blocked in real time."
        secondaryLabel="View use cases"
        secondaryHref="/use-cases"
      />
    </MarketingShell>
  );
}
