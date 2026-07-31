"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "../home/FadeIn";
import { RevealHeading } from "../home/RevealHeading";

export default function CustomersCta() {
  return (
    <section className="relative overflow-hidden bg-[#F3F3F4] px-6 py-16 md:px-10 md:py-24">
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.26]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[720px] text-center">
        <RevealHeading
          as="h2"
          align="center"
          className="text-[clamp(2rem,4.5vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#111]"
          lines={[
            {
              content: (
                <>
                  Join the next{" "}
                  <span className="font-instrument font-normal italic text-[#8A93A3]">cohort</span>.
                </>
              ),
            },
          ]}
        />

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-[1.7] text-[#5F5F66] md:text-[16px]">
            We&apos;re onboarding 5 design partners per month. Get priority access to our 14-day
            zero-risk pilot and see results like these in your own org.
          </p>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#111]/1 bg-white px-4 py-2 text-[12px] font-medium text-[#5F5F66]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2563EB]" />
            3 spots remaining this month
          </div>
        </FadeIn>

        <FadeIn delay={0.22}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-pilot"
              className="btn-primary-bloom inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111] px-7 py-3.5 text-[14px] font-medium text-white sm:w-auto"
            >
              Start your pilot
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/roi-calculator"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#111]/15 bg-white px-7 py-3.5 text-[14px] font-medium text-[#111] transition-colors hover:border-[#111]/3 sm:w-auto"
            >
              Calculate your ROI
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.28}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-[13px] text-[#8A93A3]"
          >
            Your story could be next — prevent the next production disaster.
          </motion.p>
        </FadeIn>
      </div>
    </section>
  );
}
