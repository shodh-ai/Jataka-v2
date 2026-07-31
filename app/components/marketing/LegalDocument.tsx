"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import MarketingShell from "./MarketingShell";
import PageHero from "./PageHero";
import PageCta from "./PageCta";
import ContentSection from "./ContentSection";
import { FadeIn } from "../home/FadeIn";

/** Shared shell for long-form legal / policy documents in the new design system */
export default function LegalDocument({
  title,
  italicWord,
  subtitle,
  eyebrow = "Legal",
  updated,
  children,
}: {
  title: string;
  italicWord?: string;
  subtitle?: string;
  eyebrow?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <MarketingShell>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        italicWord={italicWord}
        subtitle={subtitle}
        ctas={[
          { label: "Book a briefing →", href: "/book-pilot", primary: true },
          { label: "Back to security", href: "/security" },
        ]}
      />

      <ContentSection>
        {updated ? (
          <FadeIn>
            <p className="mb-6 font-mono text-[11px] tracking-[0.14em] text-[#8A93A3] uppercase">
              Last updated · {updated}
            </p>
          </FadeIn>
        ) : null}
        <FadeIn>
          <article className="rounded-[22px] border border-[#111]/08 bg-white p-6 shadow-[0_16px_48px_rgba(17,17,17,0.04)] md:p-10">
            <div className="legal-prose space-y-3 text-[15px] leading-[1.8] text-[#3A3A42]">
              {children}
            </div>
          </article>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="mt-8 text-center text-[14px] text-[#5F5F66]">
            Questions about this document?{" "}
            <Link href="/book-pilot" className="font-medium text-[#111] underline-offset-2 hover:underline">
              Contact us
            </Link>
            .
          </p>
        </FadeIn>
      </ContentSection>

      <PageCta
        title="Ready for a"
        italicWord="security review"
        subtitle="We'll walk your team through architecture, retention, and controls under NDA."
        primaryLabel="Book a briefing →"
        primaryHref="/book-pilot"
        secondaryLabel="View security"
        secondaryHref="/security"
      />
    </MarketingShell>
  );
}

export function LegalHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="pt-4 text-[clamp(1.15rem,2.2vw,1.35rem)] font-semibold tracking-[-0.03em] text-[#111]">
      {children}
    </h2>
  );
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-[1.8] text-[#3A3A42]">{children}</p>;
}

export function LegalQuote({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-[#111]/12 pl-3 text-[15px] leading-[1.8] text-[#5F5F66]">
      {children}
    </p>
  );
}
