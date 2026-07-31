"use client";

import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../../components/marketing";
import { FadeIn } from "../../components/home";

const badCodeExample = `// ❌ BAD: Mixed DML operations in same transaction
// Setup objects (User, Profile) mixed with non-Setup (Account)

public void createUserAndAccount() {
    // Setup object DML
    User newUser = new User(
        FirstName = 'John',
        LastName = 'Doe',
        Email = 'john@example.com',
        Username = 'john@example.com',
        ProfileId = '00e...'
    );
    insert newUser; // Setup object
    
    // Non-Setup object DML in same transaction
    Account newAccount = new Account(
        Name = 'Acme Corp'
    );
    insert newAccount; // ❌ CRASH!
    // System.DmlException: UNCOMMITTED_WORK_PENDING
}`;

const goodCodeExample = `// ✅ GOOD: Separate transactions using async

public void createUserAndAccount() {
    // Setup object DML in current transaction
    User newUser = new User(
        FirstName = 'John',
        LastName = 'Doe',
        Email = 'john@example.com',
        Username = 'john@example.com',
        ProfileId = '00e...'
    );
    insert newUser;
    
    // Non-Setup object DML in async transaction
    Account newAccount = new Account(
        Name = 'Acme Corp'
    );
    
    // Use Future method or Queueable
    createAccountAsync(newAccount);
}

@future
public static void createAccountAsync(Account acc) {
    insert acc; // Separate transaction - no conflict
}`;

export default function AntiPatternPage() {
  return (
    <MarketingShell>
      <PageHero
        title="UNCOMMITTED_WORK"
        italicWord="PENDING"
        subtitle="Setup and non-Setup DML in the same transaction. Salesforce blocks it for data integrity — many teams discover this in prod."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "All anti-patterns", href: "/anti-patterns" },
        ]}
      />

      <ContentSection title="The" italicWord="rule" subtitle="System.DmlException: UNCOMMITTED_WORK_PENDING">
        <FadeIn>
          <p className="mb-8 max-w-[640px] text-[16px] leading-[1.75] text-[#5F5F66]">
            You cannot mix Setup objects (User, Profile, PermissionSet) with non-Setup objects (Account, Contact) in the same transaction.
          </p>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-3">
              <FadeIn delay={0.0}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">Setup</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">User, Profile, PermissionSet</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">Non-Setup</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">Account, Contact, Opportunity</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[#111]">2 hrs</p>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#5F5F66]">Average recovery time</p>
                </div>
              </FadeIn>
        </div>
      </ContentSection>

      <ContentSection title="Bad vs" italicWord="good">
        <div className="grid gap-4 lg:grid-cols-2">
          <FadeIn>
            <div className="overflow-hidden rounded-[20px] border border-[#111]/08 bg-[#111] shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="font-mono text-[12px] text-[#8A93A3]">UserProvisioningService.cls</span>
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
                <span className="font-mono text-[12px] text-[#8A93A3]">UserProvisioningService.cls</span>
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
              Split Setup DML into a separate async transaction (@future or Queueable). Jataka detects Setup/non-Setup conflicts during Sandbox execution.
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
