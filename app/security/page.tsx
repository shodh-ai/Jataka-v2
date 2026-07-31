"use client";

import {
  Eye,
  Server,
  Key,
  Zap,
  FileCheck,
  AlertTriangle,
  Database,
  Shield,
  Lock,
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
  name: "Jataka Security - Enterprise Data Protection",
  description:
    "Jataka's security architecture: Zero Data Retention for AI, No Production Access, AES-256 encryption, and ephemeral execution. Built for enterprise CISO requirements.",
  url: "https://jataka.io/security",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://jataka.io" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Security",
      item: "https://jataka.io/security",
    },
  ],
};

const pillars = [
  {
    title: "Zero Data Retention for AI",
    body: "Enterprise LLM APIs with strict Zero Data Retention. Your Apex is processed — never stored, never used to train public models.",
    icon: Eye,
    meta: "ZDR · OpenAI / Anthropic",
  },
  {
    title: "No Production Access",
    body: "OAuth is scoped to Staging and Integration sandboxes only. We never request — or receive — production org access.",
    icon: Server,
    meta: "Sandbox-only OAuth",
  },
  {
    title: "Encrypted Credentials",
    body: "Salesforce OAuth tokens and GitHub keys are AES-256 encrypted at rest, rotated automatically, and never written in plaintext logs.",
    icon: Key,
    meta: "AES-256 · Secrets Manager",
  },
  {
    title: "Ephemeral Execution",
    body: "Kamikaze Pods spin up per PR, run the profile, emit the report, then destroy themselves — memory and disk included.",
    icon: Zap,
    meta: "Per-PR · then gone",
  },
];

const compliance = [
  { name: "SOC 2 Type II", status: "In Progress", icon: FileCheck },
  { name: "Data Processing Agreement", status: "Available", icon: FileCheck },
  { name: "Penetration Testing", status: "Annual", icon: AlertTriangle },
  { name: "TEE Architecture", status: "Documented", icon: Shield },
];

const flow = [
  {
    title: "Your Sandbox",
    body: "Test data only. No production records. Jataka profiles limits here.",
    icon: Database,
  },
  {
    title: "Jataka K8s Pod",
    body: "Ephemeral. Spins up, runs tests, generates the report, destroys itself.",
    icon: Shield,
  },
  {
    title: "Your GitHub",
    body: "PR comment with the limit report. No customer code retained by Jataka.",
    icon: Lock,
  },
];

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <MarketingShell>
        <PageHero
          eyebrow="Enterprise-grade security"
          title="Built for"
          italicWord="CISO approval"
          subtitle="When the CTO says yes, the CISO takes over. No production access. No data retention. Architecture designed to pass vendor security reviews without friction."
          ctas={[
            { label: "Book a security briefing →", href: "/book-pilot", primary: true },
            { label: "Read the DPA", href: "/dpa" },
          ]}
        />

        <ContentSection
          title="Four pillars of"
          italicWord="data protection"
          subtitle="The controls your security review will ask for — already designed into the runtime."
        >
          <FeatureGrid features={pillars} columns={2} />
        </ContentSection>

        <ContentSection
          title="Compliance &"
          italicWord="certifications"
          align="center"
        >
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
          <FadeIn delay={0.12}>
            <p className="mt-8 text-center text-[14px] text-[#5F5F66]">
              Need a specific certification or questionnaire?{" "}
              <a href="/book-pilot" className="font-medium text-[#111] underline-offset-2 hover:underline">
                Contact our team
              </a>
              .
            </p>
          </FadeIn>
        </ContentSection>

        <ContentSection
          title="How data flows"
          italicWord="(and doesn't)"
          subtitle="Sandbox in. Ephemeral compute. Report out. Production never enters the loop."
        >
          <FadeIn>
            <div className="rounded-[22px] border border-[#111]/08 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.05)] md:p-8">
              <div className="grid gap-6 md:grid-cols-3 md:gap-5">
                {flow.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex flex-col items-start text-left md:items-center md:text-center">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#111]/08 bg-[#F8FAFC] text-[#2563EB]">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[#111]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-[1.65] text-[#5F5F66]">
                        {step.body}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-2 border-t border-[#111]/08 pt-6 text-[13px] text-[#5F5F66] sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-2 sm:text-center">
                <span>
                  <span className="font-semibold text-[#111]">✗ Production org</span>
                  {" — never accessed"}
                </span>
                <span className="hidden text-[#C4C4CC] sm:inline">|</span>
                <span>
                  <span className="font-semibold text-[#111]">✗ Customer data</span>
                  {" — never read"}
                </span>
                <span className="hidden text-[#C4C4CC] sm:inline">|</span>
                <span>
                  <span className="font-semibold text-[#111]">✗ Model training</span>
                  {" — never used"}
                </span>
              </div>
            </div>
          </FadeIn>
        </ContentSection>

        <ContentSection
          title="Need more"
          italicWord="detail"
          subtitle="Architecture diagrams, encryption details, data-flow maps, and incident response — available under NDA for your security review."
          align="center"
        >
          <FadeIn>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:security@jataka.ai?subject=Security%20whitepaper%20request"
                className="btn-primary-bloom inline-flex w-full items-center justify-center rounded-full bg-[#111] px-7 py-3.5 text-[14px] font-medium text-white sm:w-auto"
              >
                Request security pack →
              </a>
              <a
                href="/dpa"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#111]/15 bg-white px-7 py-3.5 text-[14px] font-medium text-[#111] sm:w-auto"
              >
                View DPA
              </a>
            </div>
          </FadeIn>
        </ContentSection>

        <PageCta
          title="Start the pilot."
          italicWord="Security review ready"
          subtitle="14-day zero-risk Shadow Mode. No production access. No data retention. Documentation packaged for your CISO."
          primaryLabel="Book a pilot →"
          primaryHref="/book-pilot"
          secondaryLabel="View pricing"
          secondaryHref="/pricing"
        />
      </MarketingShell>
    </>
  );
}
