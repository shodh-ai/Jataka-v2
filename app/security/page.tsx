"use client";

import {
  Cpu,
  Lock,
  EyeOff,
  Building2,
  FileCheck,
  Shield,
} from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
  FeatureGrid,
} from "../components/marketing";
import { FadeIn } from "../components/home";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Jataka Trust & Security Center",
  description:
    "Hardware TEEs, WORM cryptographic ledgers, PII redaction, and single-tenant residency. Engineered for Big Four auditors.",
  url: "https://jataka.io/security",
};

const stack = [
  {
    title: "Hardware Attestation",
    body: "High-risk L3 patch generation happens inside GCP Confidential Space. We provide cryptographic proof that your prompt and our AI model were completely isolated and never tampered with.",
    icon: Cpu,
    meta: "GCP Confidential Space",
  },
  {
    title: "Sovereign WORM Ledgers",
    body: "Every human approval and AI patch is hashed (SHA-256) and locked in Object-Lock storage. It is physically impossible to delete or edit the audit trail. SOC2 and SOX compliance is guaranteed by design.",
    icon: Lock,
    meta: "S3 Object Lock",
  },
  {
    title: "Zero Data Laundering",
    body: "Strict real-time PII redaction. Your sensitive CRM data is masked before it ever hits a reasoning model.",
    icon: EyeOff,
    meta: "PII redaction",
  },
  {
    title: "Tenant Isolation & Residency",
    body: "100% single-tenant architecture with guaranteed data residency (US/EU/AUS).",
    icon: Building2,
    meta: "US · EU · AUS",
  },
];

const compliance = [
  { name: "SOC 2 Type II", status: "In Progress", icon: FileCheck },
  { name: "WORM Ledger", status: "By Design", icon: Lock },
  { name: "TEE Architecture", status: "Documented", icon: Shield },
  { name: "Data Processing Agreement", status: "Available", icon: FileCheck },
];

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarketingShell>
        <PageHero
          eyebrow="Trust & Security Center · The CISO Shield"
          title="Engineered for the Big Four"
          italicWord="Auditors"
          subtitle="Standard SaaS databases can be secretly edited. Jataka is the only Enterprise AI built on hardware-level Trusted Execution Environments (TEEs) and Cryptographic Immutable Ledgers."
          ctas={[
            {
              label: "Download the SOC2 Architecture Whitepaper →",
              href: "mailto:sachin@jataka.io?subject=SOC2%20Architecture%20Whitepaper",
              primary: true,
              external: true,
            },
            { label: "Read the DPA", href: "/dpa" },
          ]}
        />

        <section className="relative overflow-hidden bg-[#F3F3F4] px-5 pb-4 sm:px-6 md:px-10">
          <div className="relative z-10 mx-auto max-w-[1100px]">
            <FadeIn>
              <div className="overflow-hidden rounded-[22px] border border-[#111]/08 bg-[#0C1320] p-6 text-white shadow-[0_18px_50px_rgba(17,17,17,0.08)] md:p-8">
                <p className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
                  Security stack diagram
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    { title: "GCP Confidential Space", body: "vTPM · attested L3 inference" },
                    { title: "PII Redaction Layer", body: "Mask before the model" },
                    { title: "AWS S3 WORM", body: "SHA-256 · Object Lock" },
                  ].map((node) => (
                    <div
                      key={node.title}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-5"
                    >
                      <p className="text-[14px] font-semibold">{node.title}</p>
                      <p className="mt-2 text-[13px] text-white/55">{node.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <ContentSection
          title="What's inside"
          italicWord="the security stack"
          subtitle="Hardware attestation, immutable ledgers, and residency controls designed for CISO review."
        >
          <FeatureGrid features={stack} columns={2} />
        </ContentSection>

        <ContentSection title="Compliance &" italicWord="certifications" align="center">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {compliance.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.name} delay={i * 0.05}>
                  <div className="flex h-full flex-col items-center justify-center rounded-[20px] border border-[#111]/08 bg-white px-4 py-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#111]/08 bg-[#F8FAFC] text-[#2563EB]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <p className="text-[14px] font-semibold tracking-[-0.02em] text-[#111]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[12px] text-[#8A93A3]">{item.status}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </ContentSection>

        <PageCta
          title="Download the architecture"
          italicWord="whitepaper"
          subtitle="TEE diagrams, WORM ledger design, and residency controls—packaged for your Big Four review."
          primaryLabel="Request whitepaper →"
          primaryHref="mailto:sachin@jataka.io?subject=SOC2%20Architecture%20Whitepaper"
          secondaryLabel="Shadow Mode Pilot"
          secondaryHref="/shadow-mode"
        />
      </MarketingShell>
    </>
  );
}
