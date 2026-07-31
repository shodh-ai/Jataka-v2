"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import MarketingShell from "./MarketingShell";
import PageHero from "./PageHero";
import PageCta from "./PageCta";
import FeatureGrid, { type FeatureCard } from "./FeatureGrid";
import ContentSection from "./ContentSection";
import { FadeIn } from "../home/FadeIn";

export type ProductPageProps = {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  titleSuffix?: string;
  subtitle: string;
  problemTitle?: string;
  problemItalic?: string;
  problemBody?: string;
  featuresTitle?: string;
  featuresItalic?: string;
  features: FeatureCard[];
  resultTitle?: string;
  resultItalic?: string;
  resultBody?: string;
  related?: { label: string; href: string }[];
  visual?: ReactNode;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  bottomCtaTitle?: string;
  bottomCtaItalic?: string;
  bottomCtaSubtitle?: string;
};

export default function ProductPageTemplate({
  eyebrow,
  title,
  italicWord,
  titleSuffix = ".",
  subtitle,
  problemTitle = "The problem",
  problemItalic = "we solve",
  problemBody,
  featuresTitle = "What you",
  featuresItalic = "get",
  features,
  resultTitle = "The",
  resultItalic = "result",
  resultBody,
  related,
  visual,
  primaryCtaLabel = "Book a pilot →",
  primaryCtaHref = "/book-pilot",
  secondaryCtaLabel = "See pricing",
  secondaryCtaHref = "/pricing",
  bottomCtaTitle = "See it on your",
  bottomCtaItalic = "org",
  bottomCtaSubtitle = "14-day Shadow Mode. Zero risk. We prove value before you pay.",
}: ProductPageProps) {
  return (
    <MarketingShell>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        italicWord={italicWord}
        titleSuffix={titleSuffix}
        subtitle={subtitle}
        ctas={[
          { label: primaryCtaLabel, href: primaryCtaHref, primary: true },
          ...(secondaryCtaLabel && secondaryCtaHref
            ? [{ label: secondaryCtaLabel, href: secondaryCtaHref }]
            : []),
        ]}
      />

      {visual ? (
        <section className="relative overflow-hidden bg-[#F3F3F4] px-5 pb-4 sm:px-6 md:px-10">
          <div className="relative z-10 mx-auto max-w-[1100px]">{visual}</div>
        </section>
      ) : null}

      {problemBody ? (
        <ContentSection title={problemTitle} italicWord={problemItalic}>
          <FadeIn>
            <p className="max-w-[640px] text-[16px] leading-[1.75] text-[#5F5F66]">{problemBody}</p>
          </FadeIn>
        </ContentSection>
      ) : null}

      <ContentSection title={featuresTitle} italicWord={featuresItalic} align="left">
        <FeatureGrid features={features} columns={2} />
      </ContentSection>

      {resultBody ? (
        <ContentSection title={resultTitle} italicWord={resultItalic}>
          <FadeIn>
            <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-8">
              <p className="max-w-[680px] text-[16px] leading-[1.75] text-[#3A3A42]">{resultBody}</p>
            </div>
          </FadeIn>
        </ContentSection>
      ) : null}

      {related?.length ? (
        <ContentSection title="Related" italicWord="capabilities">
          <div className="flex flex-wrap gap-3">
            {related.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="rounded-full border border-[#111]/1 bg-white px-4 py-2 text-[13px] font-medium text-[#4B4B53] transition-colors hover:border-[#111]/25 hover:text-[#111]"
              >
                {item.label} →
              </Link>
            ))}
          </div>
        </ContentSection>
      ) : null}

      <PageCta
        title={bottomCtaTitle}
        italicWord={bottomCtaItalic}
        subtitle={bottomCtaSubtitle}
        primaryLabel={primaryCtaLabel}
        primaryHref={primaryCtaHref}
        secondaryLabel={secondaryCtaLabel}
        secondaryHref={secondaryCtaHref}
      />
    </MarketingShell>
  );
}

export type { LucideIcon };
