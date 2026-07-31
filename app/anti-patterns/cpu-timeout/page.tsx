"use client";

import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../../components/marketing";
import { FadeIn } from "../../components/home";

const badCodeExample = `// ❌ BAD: Nested loops with O(n²) complexity
// Works fine with 100 records in Sandbox
// Burns through CPU time with 10,000+ records in Production

public void calculateCommission(List<Opportunity> opps) {
    for (Opportunity opp1 : opps) {
        for (Opportunity opp2 : opps) {
            // O(n²) comparison - exponential CPU growth
            if (opp1.AccountId == opp2.AccountId) {
                Decimal commission = calculateComplexFormula(opp1, opp2);
                opp1.Commission__c = commission;
            }
        }
    }
    update opps;
}
// With 10,000 opportunities = 100,000,000 iterations
// CPU timeout at 10 seconds`;

const goodCodeExample = `// ✅ GOOD: Use Maps for O(n) complexity
// Linear time regardless of record count

public void calculateCommission(List<Opportunity> opps) {
    // Group by AccountId using a Map
    Map<Id, List<Opportunity>> oppsByAccount = new Map<Id, List<Opportunity>>();
    
    for (Opportunity opp : opps) {
        if (!oppsByAccount.containsKey(opp.AccountId)) {
            oppsByAccount.put(opp.AccountId, new List<Opportunity>());
        }
        oppsByAccount.get(opp.AccountId).add(opp);
    }
    
    // Process each account's opportunities
    for (List<Opportunity> accountOpps : oppsByAccount.values()) {
        for (Integer i = 0; i < accountOpps.size(); i++) {
            Decimal commission = calculateFormula(accountOpps[i]);
            accountOpps[i].Commission__c = commission;
        }
    }
    update opps;
}`;

export default function AntiPatternPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Apex CPU time limit"
        italicWord="exceeded"
        subtitle="Nested loops that pass in Sandbox burn through 10 seconds of CPU with production volumes."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "All anti-patterns", href: "/anti-patterns" },
        ]}
      />

      <ContentSection title="The" italicWord="limit" subtitle="System.LimitException: Apex CPU time limit exceeded">
        <FadeIn>
          <p className="mb-8 max-w-[640px] text-[16px] leading-[1.75] text-[#5F5F66]">
            Synchronous Apex gets 10,000ms of CPU. Async gets 60,000ms. O(n²) nested loops that look fine with 100 records explode at 50,000.
          </p>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-3">
              <FadeIn delay={0.0}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">10s</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">Synchronous CPU limit</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">60s</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">Async CPU limit</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">6 hrs</p>
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
                <span className="font-mono text-[12px] text-[#8A93A3]">AccountProcessor.cls</span>
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
                <span className="font-mono text-[12px] text-[#8A93A3]">AccountProcessor.cls</span>
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
              Replace nested loops with Maps for O(n) lookups. Jataka profiles real CPU milliseconds in a Kamikaze Sandbox pod before the PR merges.
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
