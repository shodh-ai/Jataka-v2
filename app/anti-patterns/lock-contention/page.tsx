"use client";

import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../../components/marketing";
import { FadeIn } from "../../components/home";

const badCodeExample = `// ❌ BAD: Updating parent record when children have data skew
// Top Account has 50,000+ Contacts (data skew)

public void updateAccountIndustry(List<Contact> contacts) {
    Set<Id> accountIds = new Set<Id>();
    for (Contact c : contacts) {
        accountIds.add(c.AccountId);
    }
    
    // Lock contention on Account with 50,000 children
    List<Account> accounts = [
        SELECT Id, Industry 
        FROM Account 
        WHERE Id IN :accountIds
        FOR UPDATE  // ❌ Lock wait timeout!
    ];
    
    for (Account acc : accounts) {
        acc.Industry = 'Technology';
    }
    update accounts;
}`;

const goodCodeExample = `// ✅ GOOD: Avoid locking skewed parent records
// Use selective updates without parent locking

public void updateAccountIndustry(List<Contact> contacts) {
    Set<Id> accountIds = new Set<Id>();
    for (Contact c : contacts) {
        accountIds.add(c.AccountId);
    }
    
    // Update without explicit lock
    List<Account> accounts = [
        SELECT Id, Industry 
        FROM Account 
        WHERE Id IN :accountIds
        // No FOR UPDATE - let Salesforce handle locking
    ];
    
    // Batch updates to reduce contention
    Database.update(accounts, false); // Partial success allowed
    
    // Or: Use async processing for high-volume updates
    // System.enqueueJob(new AccountUpdateJob(accounts));
}`;

export default function AntiPatternPage() {
  return (
    <MarketingShell>
      <PageHero
        title="UNABLE_TO"
        italicWord="LOCK_ROW"
        subtitle="Data skew on a hot parent. Concurrent updates stall waiting for a lock that never releases."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "All anti-patterns", href: "/anti-patterns" },
        ]}
      />

      <ContentSection title="The" italicWord="problem" subtitle="System.DmlException: UNABLE_TO_LOCK_ROW">
        <FadeIn>
          <p className="mb-8 max-w-[640px] text-[16px] leading-[1.75] text-[#5F5F66]">
            When one parent has tens of thousands of children, updates that touch the parent row serialize. Concurrent users hit UNABLE_TO_LOCK_ROW.
          </p>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-3">
              <FadeIn delay={0.0}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">50k+</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">Child records on a skewed parent</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">Lock</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">Exclusive row access required</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">8 hrs</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">Average downtime from contention</p>
                </div>
              </FadeIn>
        </div>
      </ContentSection>

      <ContentSection title="Bad vs" italicWord="good">
        <div className="grid gap-4 lg:grid-cols-2">
          <FadeIn>
            <div className="overflow-hidden rounded-[20px] border border-[#111]/08 bg-[#111] shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="font-mono text-[12px] text-[#8A93A3]">ContactTriggerHandler.cls</span>
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
                <span className="font-mono text-[12px] text-[#8A93A3]">ContactTriggerHandler.cls</span>
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
              Avoid updating skewed parent fields from child triggers. Use asynchronous aggregation or denormalized counters carefully. Jataka analyzes parent-child ratios before merge.
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
