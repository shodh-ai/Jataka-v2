"use client";

import Link from "next/link";
import { Cpu, EyeOff, GitBranch, Database, Zap, Lock, AlertTriangle } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home";

const featured = [
  {
    title: "The O(n²) CPU Timeout",
    body: "How hiding a SOQL query three helper-methods deep bypasses regex linters, but gets caught by Jataka's dynamic limit simulation.",
    icon: Cpu,
    href: "/anti-patterns/cpu-timeout",
  },
  {
    title: "The Guest User Data Leak",
    body: "Exploring the multi-hop vulnerability where a public Experience Cloud profile interacts with without-sharing Apex to expose private PII.",
    icon: EyeOff,
    href: "/enterprise-governance",
  },
  {
    title: "The Configuration Drift",
    body: 'Case studies of "Silent Admin Hotfixes" in production that break CI/CD pipelines, and how Bitemporal streaming catches them.',
    icon: GitBranch,
    href: "/knowledge-graph",
  },
];

const limitBreaches = [
  {
    id: "soql-101",
    title: "Too many SOQL queries: 101",
    error: "System.LimitException: Too many SOQL queries: 101",
    description:
      "The classic SOQL-in-a-for-loop. Works in dev, then crashes production when data volumes are real.",
    icon: Database,
    severity: "Critical",
  },
  {
    id: "dml-151",
    title: "Too many DML statements: 151",
    error: "System.LimitException: Too many DML statements: 151",
    description:
      "DML inside a loop hits 151 statements. Trigger crashes mid-transaction — partial rollback chaos.",
    icon: Zap,
    severity: "Critical",
  },
  {
    id: "cpu-timeout",
    title: "Apex CPU time limit exceeded",
    error: "System.LimitException: Apex CPU time limit exceeded",
    description:
      "Nested loops that pass in Sandbox burn through 10 seconds of CPU with production volumes.",
    icon: Cpu,
    severity: "Critical",
  },
  {
    id: "mixed-dml",
    title: "UNCOMMITTED_WORK_PENDING",
    error: "System.DmlException: UNCOMMITTED_WORK_PENDING",
    description:
      "Setup and non-Setup DML in the same transaction. Salesforce blocks it — many teams find out in prod.",
    icon: AlertTriangle,
    severity: "High",
  },
  {
    id: "lock-contention",
    title: "UNABLE_TO_LOCK_ROW",
    error: "System.DmlException: UNABLE_TO_LOCK_ROW",
    description:
      "Data skew on a hot parent record. Concurrent updates stall the org waiting for a lock.",
    icon: Lock,
    severity: "High",
  },
];

export default function AntiPatternsPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Anti-Patterns Library"
        title="The Encyclopedia of Enterprise System"
        italicWord="Failures"
        subtitle="Dive into the exact architectural flaws, infinite loops, and multi-hop data leaks that traditional static linters (like SonarQube) miss, but Jataka's AST Graph catches instantly."
        ctas={[
          { label: "Scan Your Org for Anti-Patterns →", href: "/book-pilot", primary: true },
          { label: "Enterprise Governance", href: "/enterprise-governance" },
        ]}
      />

      <section className="relative overflow-hidden bg-[#F3F3F4] px-5 pb-4 sm:px-6 md:px-10">
        <div className="relative z-10 mx-auto max-w-[1100px]">
          <FadeIn>
            <div className="grid overflow-hidden rounded-[22px] border border-[#111]/08 shadow-[0_18px_50px_rgba(17,17,17,0.05)] md:grid-cols-2">
              <div className="bg-[#FEF2F2] p-6 md:p-7">
                <p className="font-mono text-[10px] tracking-[0.16em] text-rose-500 uppercase">
                  The human mistake
                </p>
                <pre className="mt-4 overflow-x-auto font-mono text-[12px] leading-[1.7] text-rose-800">
{`for (Account a : accounts) {
  // buried 3 helpers deep
  List<Contact> c =
    [SELECT Id FROM Contact
     WHERE AccountId = :a.Id];
}`}
                </pre>
              </div>
              <div className="bg-[#ECFDF5] p-6 md:p-7">
                <p className="font-mono text-[10px] tracking-[0.16em] text-emerald-600 uppercase">
                  Jataka AST patch
                </p>
                <pre className="mt-4 overflow-x-auto font-mono text-[12px] leading-[1.7] text-emerald-800">
{`Map<Id, List<Contact>> byAcct =
  groupByAccount(
    [SELECT Id, AccountId
     FROM Contact
     WHERE AccountId IN :acctIds]
  );`}
                </pre>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <ContentSection title="What's" italicWord="inside">
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 0.05}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-colors hover:border-[#111]/2 md:p-7"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#111]/08 bg-[#F8FAFC] text-[#2563EB]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[1.1rem] font-semibold tracking-[-0.02em] text-[#111]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-[1.65] text-[#5F5F66]">
                    {item.body}
                  </p>
                  <span className="mt-4 text-[13px] font-medium text-[#111]">Explore →</span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </ContentSection>

      <ContentSection title="Governor limit" italicWord="breaches">
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
                  <span className="mt-4 text-[13px] font-medium text-[#111]">Read the fix →</span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </ContentSection>

      <PageCta
        title="Scan your org for"
        italicWord="anti-patterns"
        subtitle="Jataka's AST Graph catches the failures static linters never see."
        primaryLabel="Scan Your Org for Anti-Patterns →"
        primaryHref="/book-pilot"
        secondaryLabel="Engineering Blog"
        secondaryHref="/blog"
      />
    </MarketingShell>
  );
}
