"use client";

import Link from "next/link";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home";

const posts = [
  {
    href: "/blog/static-analysis-is-dead",
    title: "Why Vector RAG is Dead for Enterprise Codebases (And Why We Built an AST Compiler Instead)",
    subtitle:
      "Text search hallucinates. Compiler-level graphs don't. Why we abandoned RAG for Salesforce metadata.",
    meta: "Architecture · Featured",
  },
  {
    href: "/blog/sub-second-profiler-architecture",
    title: "Building DeltaBox: How We Spin Up and Kill Isolated Salesforce Scratch Orgs in 60 Seconds",
    subtitle:
      "Ephemeral sandboxes, video proof, and an inescapable kill-switch—without leaving zombie data behind.",
    meta: "Systems · Featured",
  },
  {
    href: "/sovereign-audit",
    title: "Replacing Postgres with Merkle Trees: Architecting an AI Audit Ledger for SOC2",
    subtitle:
      "Why editable databases fail audits—and how WORM cryptographic ledgers prove every approval.",
    meta: "Trust · Featured",
  },
];

const why = [
  "Neuro-Symbolic Compilers",
  "Causal AI inference",
  "Hardware-secured Agentic workflows",
];

export default function BlogPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Engineering Blog · The Blueprint"
        title="Building the Enterprise"
        italicWord="Brain"
        subtitle="Deep technical dives from the Jataka engineering team on Neuro-Symbolic Compilers, Causal AI inference, and hardware-secured Agentic workflows."
        ctas={[
          {
            label: "Subscribe to the Architecture Newsletter →",
            href: "mailto:sachin@jataka.io?subject=Architecture%20Newsletter",
            primary: true,
            external: true,
          },
          { label: "Anti-Patterns Library", href: "/anti-patterns" },
        ]}
      />

      <ContentSection
        title="Featured"
        italicWord="articles"
        subtitle="We don't write marketing fluff here. This is pure system architecture for CTOs, Enterprise Architects, and SREs."
      >
        <div className="grid gap-4 md:grid-cols-1">
          {posts.map((post, i) => (
            <FadeIn key={post.href} delay={i * 0.06}>
              <Link
                href={post.href}
                className="group flex h-full flex-col rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-colors hover:border-[#111]/2 md:flex-row md:items-center md:gap-8 md:p-8"
              >
                <div className="flex-1">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-[#8A93A3] uppercase">
                    {post.meta}
                  </p>
                  <h3 className="mt-3 text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111] md:text-[1.35rem]">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-[#5F5F66]">{post.subtitle}</p>
                </div>
                <span className="mt-5 shrink-0 text-[13px] font-medium text-[#111] md:mt-0">
                  Read →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Why" italicWord="read this" align="center">
        <FadeIn>
          <div className="mx-auto flex max-w-[640px] flex-wrap items-center justify-center gap-3">
            {why.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#111]/1 bg-white px-4 py-2 text-[13px] font-medium text-[#4B4B53]"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-[560px] text-center text-[15px] leading-[1.7] text-[#5F5F66]">
            Pure system architecture for people who want to see exactly how the machine works under
            the hood.
          </p>
        </FadeIn>
      </ContentSection>

      <PageCta
        title="Subscribe to the Architecture"
        italicWord="Newsletter"
        subtitle="Deep dives on compilers, causal inference, and TEE-secured agentic workflows."
        primaryLabel="Subscribe →"
        primaryHref="mailto:sachin@jataka.io?subject=Architecture%20Newsletter"
        secondaryLabel="Book a pilot"
        secondaryHref="/book-pilot"
      />
    </MarketingShell>
  );
}
