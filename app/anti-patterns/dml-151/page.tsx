"use client";

import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../../components/marketing";
import { FadeIn } from "../../components/home";

const badCodeExample = `// ❌ BAD: DML inside a for loop
// Each iteration runs a separate DML operation

public void updateOpportunities(List<Opportunity> opps) {
    for (Opportunity opp : opps) {
        // DML operation inside the loop!
        opp.StageName = 'Closed Won';
        opp.CloseDate = Date.today();
        update opp; // 1 DML per iteration
    }
    // With 200 opportunities = 200 DML statements
    // Limit is 150. Crash at 151.
}`;

const goodCodeExample = `// ✅ GOOD: Bulkified DML operations
// Single DML statement for all records

public void updateOpportunities(List<Opportunity> opps) {
    // Update all records in memory
    for (Opportunity opp : opps) {
        opp.StageName = 'Closed Won';
        opp.CloseDate = Date.today();
    }
    
    // Single DML operation
    update opps;
    // 1 DML total, regardless of record count
}`;

export default function AntiPatternPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Too many DML statements"
        italicWord="151"
        subtitle="DML inside a loop hits 151 statements. The trigger crashes mid-transaction — partial rollback chaos."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "All anti-patterns", href: "/anti-patterns" },
        ]}
      />

      <ContentSection title="The" italicWord="limit" subtitle="System.LimitException: Too many DML statements: 151">
        <FadeIn>
          <p className="mb-8 max-w-[640px] text-[16px] leading-[1.75] text-[#5F5F66]">
            Salesforce allows 150 DML statements per transaction. Exceed it and the transaction dies mid-flight, leaving data in an inconsistent state.
          </p>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-3">
              <FadeIn delay={0.0}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">150</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">Max DML statements per transaction</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">151</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">The statement that crashes the batch</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">3 hrs</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">Average downtime from this error</p>
                </div>
              </FadeIn>
        </div>
      </ContentSection>

      <ContentSection title="Bad vs" italicWord="good">
        <div className="grid gap-4 lg:grid-cols-2">
          <FadeIn>
            <div className="overflow-hidden rounded-[20px] border border-[#111]/08 bg-[#111] shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="font-mono text-[12px] text-[#8A93A3]">OpportunityTriggerHandler.cls</span>
                <span className="text-[10px] font-semibold tracking-[0.14em] text-[#F87171] uppercase">Anti-pattern</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.65] text-[#E8E8EC]">
                {badCodeExample}
              </pre>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="overflow-hidden rounded-[20px] border border-[#111]/08 bg-[#111] shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="font-mono text-[12px] text-[#8A93A3]">OpportunityTriggerHandler.cls</span>
                <span className="text-[10px] font-semibold tracking-[0.14em] text-emerald-400 uppercase">Fixed</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.65] text-[#E8E8EC]">
                {goodCodeExample}
              </pre>
            </div>
          </FadeIn>
        </div>
      </ContentSection>

      <ContentSection title="The" italicWord="fix">
        <FadeIn>
          <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-8">
            <p className="max-w-[680px] text-[16px] leading-[1.75] text-[#3A3A42]">
              Collect records into lists and perform DML once outside the loop. Jataka measures actual DML counts against production-scale data before merge.
            </p>
          </div>
        </FadeIn>
      </ContentSection>

      <PageCta
        title="Catch this before"
        italicWord="production"
        subtitle="Book a pilot and watch Jataka block this exact anti-pattern on your next PR."
        secondaryLabel="All anti-patterns"
        secondaryHref="/anti-patterns"
      />
    </MarketingShell>
  );
}
