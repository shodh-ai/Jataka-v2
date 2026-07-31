"use client";

import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home/FadeIn";

const cloudInfrastructure = [
  {
    name: "Google Cloud Platform (GCP)",
    role: "Cloud Hosting, Kubernetes Execution (Kamikaze Pods), Secrets Management",
    location: "United States / Configurable",
  },
  {
    name: "Neo4j (Aura)",
    role: "Knowledge Graph Database processing and persistence for Salesforce schema mapping",
    location: "United States",
  },
];

const enterpriseAI = [
  {
    name: "Google (Gemini)",
    role: "Enterprise LLM API for Code Analysis (Strict ZDR Mode)",
    location: "United States",
  },
  {
    name: "OpenAI",
    role: "Enterprise LLM API for Code Analysis (Strict ZDR Mode)",
    location: "United States",
  },
  {
    name: "Anthropic",
    role: "Enterprise LLM API for Code Analysis (Strict ZDR Mode)",
    location: "United States",
  },
];

const integrations = [
  "GitHub (Version Control API, Pull Request orchestration)",
  "Bitbucket (Version Control API, Pull Request orchestration)",
  "GitLab (Version Control API, Pull Request orchestration)",
  "Salesforce (CRM & Metadata APIs)",
];

function ProcessorCard({
  name,
  role,
  location,
}: {
  name: string;
  role: string;
  location: string;
}) {
  return (
    <div className="h-full rounded-[18px] border border-[#111]/08 bg-white p-5 shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
      <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#111]">{name}</h3>
      <p className="mt-2 text-[14px] leading-[1.65] text-[#5F5F66]">{role}</p>
      <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-[#8A93A3] uppercase">
        {location}
      </p>
    </div>
  );
}

export default function SubProcessorRegistryPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Trust center"
        title="Sub-processor"
        italicWord="Registry"
        subtitle="Third-party processors Jataka engages to deliver the Service — including cloud hosts, graph storage, and enterprise LLMs under Zero Data Retention."
        ctas={[
          { label: "Read the DPA →", href: "/dpa", primary: true },
          { label: "Security overview", href: "/security" },
        ]}
      />

      <ContentSection title="Cloud" italicWord="infrastructure">
        <div className="grid gap-3 md:grid-cols-2">
          {cloudInfrastructure.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.05}>
              <ProcessorCard {...p} />
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Enterprise" italicWord="AI">
        <div className="grid gap-3 md:grid-cols-3">
          {enterpriseAI.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.05}>
              <ProcessorCard {...p} />
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Customer-directed" italicWord="integrations">
        <FadeIn>
          <ul className="space-y-3 rounded-[22px] border border-[#111]/08 bg-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.04)] md:p-8">
            {integrations.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-[1.65] text-[#3A3A42]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </ContentSection>

      <PageCta
        title="Questions about"
        italicWord="processors"
        subtitle="We'll walk your security team through ZDR agreements, regions, and retention under NDA."
        primaryLabel="Book a briefing →"
        primaryHref="/book-pilot"
        secondaryLabel="View DPA"
        secondaryHref="/dpa"
      />
    </MarketingShell>
  );
}
