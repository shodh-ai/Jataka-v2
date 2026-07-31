"use client";

import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../../components/marketing";
import { FadeIn } from "../../components/home";

const badCodeExample = `// ❌ BAD: SOQL inside a for loop
// This works in Sandbox with 10 records
// Crashes in Production with 1,000+ records

public void processAccounts(List<Id> accountIds) {
    for (Id accId : accountIds) {
        // Each iteration runs a query!
        List<Contact> contacts = [
            SELECT Id, Name, Email
            FROM Contact
            WHERE AccountId = :accId
        ];
        
        // Process contacts...
        for (Contact c : contacts) {
            c.Email = c.Email.toLowerCase();
        }
        update contacts;
    }
}`;

const goodCodeExample = `// ✅ GOOD: Bulkified query
// One query for all accounts

public void processAccounts(List<Id> accountIds) {
    // Single query outside the loop
    List<Contact> allContacts = [
        SELECT Id, Name, Email, AccountId
        FROM Contact
        WHERE AccountId IN :accountIds
    ];
    
    // Process in memory
    for (Contact c : allContacts) {
        c.Email = c.Email.toLowerCase();
    }
    
    // Single update
    update allContacts;
}`;

export default function AntiPatternPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Too many SOQL queries"
        italicWord="101"
        subtitle="The classic SOQL-in-a-for-loop. Works in Sandbox with 10 records — crashes Production at 1,000+."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "All anti-patterns", href: "/anti-patterns" },
        ]}
      />

      <ContentSection title="The" italicWord="limit" subtitle="System.LimitException: Too many SOQL queries: 101">
        <FadeIn>
          <p className="mb-8 max-w-[640px] text-[16px] leading-[1.75] text-[#5F5F66]">
            Salesforce allows 100 SOQL queries per transaction. Hit 101 and the entire transaction rolls back. In a trigger, every record in the batch fails.
          </p>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-3">
              <FadeIn delay={0.0}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">100</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">Max SOQL queries per transaction</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">101</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">The query that crashes Production</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">4 hrs</p>
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
                <span className="font-mono text-[12px] text-[#8A93A3]">AccountTriggerHandler.cls</span>
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
                <span className="font-mono text-[12px] text-[#8A93A3]">AccountTriggerHandler.cls</span>
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
              Bulkify: query once with IN :accountIds, process in memory, then a single DML update. Jataka executes the PR against production-like volumes and blocks the merge when measured SOQL exceeds the limit.
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
