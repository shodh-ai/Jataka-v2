"use client";

import { CheckCircle, AlertTriangle } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../../components/marketing";
import { FadeIn } from "../../components/home";

const staticLimitations = [
  {
    limit: "SOQL 101",
    staticResult: "Flags SOQL in loop (maybe)",
    runtimeResult: "Measures 127 queries vs 100 limit",
  },
  {
    limit: "DML 151",
    staticResult: "Flags DML in loop (maybe)",
    runtimeResult: "Measures 187 DML vs 150 limit",
  },
  {
    limit: "CPU Timeout",
    staticResult: "No detection possible",
    runtimeResult: "Measures 12,847ms vs 10,000ms",
  },
  {
    limit: "Data Skew",
    staticResult: "No detection possible",
    runtimeResult: "Analyzes 52,847 child records",
  },
  {
    limit: "Mixed DML",
    staticResult: "No detection possible",
    runtimeResult: "Detects Setup/non-Setup conflict",
  },
];

const codeExample = `// This code passes static analysis
// It crashes in production

public void processAccounts(List<Id> accountIds) {
    for (Id accId : accountIds) {
        // Static analysis: "SOQL in loop - potential issue"
        // Runtime profiling: "127 queries executed, limit is 100"
        List<Contact> contacts = [
            SELECT Id, Name, Email
            FROM Contact
            WHERE AccountId = :accId
        ];
        
        for (Contact c : contacts) {
            c.Email = c.Email.toLowerCase();
        }
        update contacts;
    }
}`;

const catches = [
  "Unused variables and dead code paths",
  "Security vulnerabilities like SOQL injection",
  "Naming convention violations",
  "Cyclomatic complexity thresholds",
];

const misses = [
  "How many records are in your production org",
  "What other triggers fire when you update a record",
  "How long your nested loops will actually take",
  "Whether your DML operations conflict with Setup objects",
];

export default function StaticAnalysisIsDeadPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Static analysis is"
        italicWord="dead"
        subtitle="Your CI runs PMD, SonarQube, or Clayton. You feel safe. Then a SOQL-in-a-loop ships — and Production hits 127 queries against a limit of 100."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "All posts", href: "/blog" },
        ]}
      />

      <ContentSection title="The fundamental" italicWord="problem">
        <FadeIn>
          <div className="mx-auto max-w-[720px] space-y-5 text-[16px] leading-[1.8] text-[#5F5F66]">
            <p>
              Static analysis tools scan your source code as text. They parse the AST, apply
              pattern-matching rules, and flag violations. Excellent for catching style and
              security issues — incomplete for runtime safety.
            </p>
            <ul className="space-y-3">
              {catches.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              But static analysis <strong className="text-[#111]">cannot</strong> predict
              runtime behavior because it doesn&apos;t execute your code. It doesn&apos;t know:
            </p>
            <ul className="space-y-3">
              {misses.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </ContentSection>

      <ContentSection title="A concrete" italicWord="example">
        <FadeIn>
          <div className="overflow-hidden rounded-[20px] border border-[#111]/08 bg-[#111] shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <span className="font-mono text-[12px] text-[#8A93A3]">AccountTriggerHandler.cls</span>
              <span className="text-[10px] font-semibold tracking-[0.14em] text-[#FBBF24] uppercase">
                Passes static analysis
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.65] text-[#E8E8EC]">
              {codeExample}
            </pre>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="mt-4 rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
            <p className="text-[14px] leading-[1.7] text-[#5F5F66]">
              <strong className="text-[#111]">Static analysis says:</strong> &quot;SOQL
              inside for loop — potential issue.&quot;
              <br />
              <br />
              <strong className="text-[#111]">Runtime profiling says:</strong> &quot;127 SOQL
              queries executed against a limit of 100. Transaction will fail in
              production.&quot;
            </p>
          </div>
        </FadeIn>
      </ContentSection>

      <ContentSection title="Static vs" italicWord="runtime">
        <FadeIn>
          <div className="overflow-hidden rounded-[20px] border border-[#111]/08 bg-white shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
            <div className="grid grid-cols-3 bg-[#111] p-4 md:p-5">
              <span className="text-[11px] font-semibold tracking-[0.14em] text-[#8A93A3] uppercase">
                Limit
              </span>
              <span className="text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
                Static
              </span>
              <span className="text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
                Runtime
              </span>
            </div>
            {staticLimitations.map((row, i) => (
              <div
                key={row.limit}
                className={`grid grid-cols-3 p-4 md:p-5 ${
                  i !== staticLimitations.length - 1 ? "border-b border-[#111]/06" : ""
                }`}
              >
                <span className="text-[13px] font-medium text-[#111]">{row.limit}</span>
                <span className="text-[13px] text-[#5F5F66]">{row.staticResult}</span>
                <span className="text-[13px] text-[#5F5F66]">{row.runtimeResult}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </ContentSection>

      <ContentSection title="The" italicWord="solution">
        <FadeIn>
          <div className="mx-auto max-w-[720px] space-y-5 text-[16px] leading-[1.8] text-[#5F5F66]">
            <p>
              Runtime profiling executes your code in an isolated environment with
              production-scale data. It measures what actually happens — SOQL, DML, CPU,
              heap — then blocks the PR when thresholds are breached.
            </p>
            <p>
              Static analysis isn&apos;t dead — it&apos;s incomplete. Keep PMD, Clayton, and
              SonarQube for code quality. Add Jataka for Governor Limit safety. Use both.
            </p>
          </div>
        </FadeIn>
      </ContentSection>

      <PageCta
        title="Catch what static analysis"
        italicWord="misses"
        subtitle="Book a demo and watch Jataka block real runtime breaches before merge."
        secondaryLabel="All posts"
        secondaryHref="/blog"
      />
    </MarketingShell>
  );
}
