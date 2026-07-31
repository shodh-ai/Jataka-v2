"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home/FadeIn";

const orderRows = [
  { label: "Product", value: "Jataka Enterprise Tier" },
  { label: "Price", value: "$30,000 / year" },
  { label: "Billing", value: "Net 30 Days" },
  { label: "Commitment", value: "1-Year Minimum" },
  { label: "Renewal", value: "Auto-Renew (30-day notice)" },
  { label: "Support", value: "Enterprise Support Included" },
];

const includes = [
  "Up to 3 Connected Salesforce Environments (e.g., Dev, Staging, UAT)",
  "Real-time Governor Limit monitoring",
  "AI-powered technical debt remediation",
  "Automated PR testing in Kamikaze Pods",
  "Knowledge Graph schema mapping",
  "Self-healing UI test automation",
  "SSO & advanced security features",
  "Priority enterprise support (SLA)",
];

const legalDocs = [
  { label: "Master Subscription Agreement (MSA)", href: "/msa" },
  { label: "Data Processing Agreement (DPA)", href: "/dpa" },
  { label: "Sub-processor Registry", href: "/sub-processor-registry" },
  { label: "Service Level Agreement (SLA)", href: "/sla" },
];

export default function OrderFormPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Sales"
        title="Order"
        italicWord="Form"
        subtitle="Jataka Enterprise License purchase — $30,000/year with Net 30 billing and a 99.9% uptime SLA."
        ctas={[
          { label: "Contact sales →", href: "/book-pilot", primary: true },
          { label: "View pricing", href: "/pricing" },
        ]}
      />

      <ContentSection title="Order" italicWord="details">
        <FadeIn>
          <div className="overflow-hidden rounded-[22px] border border-[#111]/08 bg-white shadow-[0_14px_40px_rgba(17,17,17,0.04)]">
            {orderRows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 border-b border-[#111]/06 px-6 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:px-8"
              >
                <span className="text-[14px] text-[#5F5F66]">{row.label}</span>
                <span className="text-[15px] font-semibold text-[#111]">{row.value}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </ContentSection>

      <ContentSection title="Enterprise tier" italicWord="includes">
        <div className="grid gap-3 sm:grid-cols-2">
          {includes.map((item, i) => (
            <FadeIn key={item} delay={i * 0.03}>
              <div className="flex items-start gap-3 rounded-[16px] border border-[#111]/08 bg-white p-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" strokeWidth={2.5} />
                <span className="text-[14px] leading-[1.6] text-[#3A3A42]">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Legal" italicWord="agreement">
        <FadeIn>
          <div className="rounded-[22px] border border-[#111]/08 bg-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.04)] md:p-8">
            <p className="text-[15px] leading-[1.75] text-[#5F5F66]">
              By signing this Order Form, Customer agrees to be bound by the{" "}
              <Link href="/msa" className="font-medium text-[#111] underline-offset-2 hover:underline">
                Master Subscription Agreement
              </Link>{" "}
              and the{" "}
              <Link href="/dpa" className="font-medium text-[#111] underline-offset-2 hover:underline">
                Data Processing Agreement
              </Link>
              .
            </p>
            <div className="mt-6 space-y-3">
              {legalDocs.map((doc) => (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="block text-[14px] font-medium text-[#3A3A42] transition-colors hover:text-[#111]"
                >
                  → {doc.label}
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </ContentSection>

      <PageCta
        title="Ready to"
        italicWord="sign"
        subtitle="We'll walk your team through the Order Form, MSA, and DPA on a briefing call."
        primaryLabel="Contact sales →"
        primaryHref="/book-pilot"
        secondaryLabel="View pricing"
        secondaryHref="/pricing"
      />
    </MarketingShell>
  );
}
