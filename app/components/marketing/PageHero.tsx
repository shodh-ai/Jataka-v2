"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { RevealHeading } from "../home/RevealHeading";

const ease = [0.16, 1, 0.3, 1] as const;

type Cta = {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

export default function PageHero({
  title,
  italicWord,
  titleSuffix = ".",
  subtitle,
  ctas,
  eyebrow,
}: {
  /** Full title before italic word, e.g. "Transparent" */
  title: ReactNode;
  /** Word rendered in Instrument italic, e.g. "pricing" */
  italicWord?: string;
  titleSuffix?: string;
  subtitle?: ReactNode;
  ctas?: Cta[];
  eyebrow?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#F3F3F4] px-5 pt-24 pb-12 sm:px-6 md:px-10 md:pt-32 md:pb-16">
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.3]" aria-hidden />
      <div className="pointer-events-none absolute top-[38%] left-1/2 h-[min(380px,70vw)] w-[min(380px,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[860px] text-center">
        {eyebrow ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-5 font-mono text-[10px] tracking-[0.2em] text-[#8A93A3] uppercase"
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <RevealHeading
          as="h1"
          mode="mount"
          align="center"
          delay={0.1}
          stagger={0.1}
          duration={0.85}
          className="text-[clamp(1.85rem,6.5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#111]"
          lines={[
            {
              content: italicWord ? (
                <>
                  {title}{" "}
                  <span className="font-instrument font-normal italic text-[#8A93A3]">
                    {italicWord}
                  </span>
                  {titleSuffix}
                </>
              ) : (
                <>
                  {title}
                  {titleSuffix}
                </>
              ),
            },
          ]}
        />

        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45, ease }}
            className="mx-auto mt-6 max-w-[560px] text-[clamp(15px,1.6vw,17px)] leading-[1.65] text-[#5F5F66]"
          >
            {subtitle}
          </motion.p>
        ) : null}

        {ctas?.length ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6, ease }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            {ctas.map((cta) => {
              const className = cta.primary
                ? "btn-primary-bloom inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111] px-7 py-3.5 text-[14px] font-medium text-white sm:w-auto"
                : "inline-flex w-full items-center justify-center rounded-full border border-[#111]/15 bg-white px-7 py-3.5 text-[14px] font-medium text-[#111] transition-colors hover:border-[#111]/3 sm:w-auto";

              if (cta.external) {
                return (
                  <a
                    key={cta.href + cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {cta.label}
                  </a>
                );
              }

              return (
                <Link key={cta.href + cta.label} href={cta.href} className={className}>
                  {cta.label}
                </Link>
              );
            })}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
