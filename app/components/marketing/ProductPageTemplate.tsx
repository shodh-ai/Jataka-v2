"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
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
  subtitle: string;
  problemTitle?: string;
  problemBody?: string;
  featuresTitle?: string;
  featuresItalic?: string;
  features: FeatureCard[];
  resultTitle?: string;
  resultBody?: string;
  related?: { label: string; href: string }[];
};

export default function ProductPageTemplate({
  eyebrow,
  title,
  italicWord,
  subtitle,
  problemTitle = "The problem",
  problemBody,
  featuresTitle = "What you",
  featuresItalic = "get",
  features,
  resultTitle = "The",
  resultBody,
  related,
}: ProductPageProps) {
  return (
    <MarketingShell>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        italicWord={italicWord}
        subtitle={subtitle}
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "See pricing", href: "/pricing" },
        ]}
      />

      {problemBody ? (
        <ContentSection title={problemTitle} italicWord="we solve">
          <FadeIn>
            <p className="max-w-[640px] text-[16px] leading-[1.75] text-[#5F5F66]">{problemBody}</p>
          </FadeIn>
        </ContentSection>
      ) : null}

      <ContentSection title={featuresTitle} italicWord={featuresItalic} align="left">
        <FeatureGrid features={features} columns={2} />
      </ContentSection>

      {resultBody ? (
        <ContentSection title={resultTitle} italicWord="result">
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
        title="See it on your"
        italicWord="org"
        subtitle="14-day Shadow Mode. Zero risk. We prove value before you pay."
      />
    </MarketingShell>
  );
}

export type { LucideIcon };
