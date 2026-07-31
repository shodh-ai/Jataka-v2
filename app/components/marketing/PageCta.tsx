"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FadeIn } from "../home/FadeIn";
import { RevealHeading } from "../home/RevealHeading";

function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const external = href.startsWith("mailto:") || href.startsWith("http");
  if (external) {
    return (
      <a href={href} className={className} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function PageCta({
  title,
  italicWord,
  subtitle,
  primaryLabel = "Book a pilot →",
  primaryHref = "/book-pilot",
  secondaryLabel,
  secondaryHref,
}: {
  title: ReactNode;
  italicWord?: string;
  subtitle?: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#F3F3F4] px-6 py-16 md:px-10 md:py-24">
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.24]" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[720px] text-center">
        <RevealHeading
          as="h2"
          align="center"
          className="text-[clamp(1.9rem,4vw,2.85rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#111]"
          lines={[
            {
              content: italicWord ? (
                <>
                  {title}{" "}
                  <span className="font-instrument font-normal italic text-[#8A93A3]">
                    {italicWord}
                  </span>
                  .
                </>
              ) : (
                <>{title}</>
              ),
            },
          ]}
        />
        {subtitle ? (
          <FadeIn delay={0.08}>
            <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.7] text-[#5F5F66]">
              {subtitle}
            </p>
          </FadeIn>
        ) : null}
        <FadeIn delay={0.14}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaLink
              href={primaryHref}
              className="btn-primary-bloom inline-flex w-full items-center justify-center rounded-full bg-[#111] px-7 py-3.5 text-[14px] font-medium text-white sm:w-auto"
            >
              {primaryLabel}
            </CtaLink>
            {secondaryLabel && secondaryHref ? (
              <CtaLink
                href={secondaryHref}
                className="inline-flex w-full items-center justify-center rounded-full border border-[#111]/15 bg-white px-7 py-3.5 text-[14px] font-medium text-[#111] sm:w-auto"
              >
                {secondaryLabel}
              </CtaLink>
            ) : null}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
