"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RevealHeading } from "./RevealHeading";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HomeHero() {
  return (
    <section
      id="hero"
      className="home-hero relative flex min-h-[min(88svh-64px,720px)] flex-col overflow-hidden bg-[#F3F3F4] sm:min-h-[min(100svh-64px,860px)]"
    >
      <div className="home-hero-grain pointer-events-none absolute inset-0 z-[1] opacity-[0.35]" aria-hidden />
      <div className="pointer-events-none absolute top-[42%] left-1/2 z-[1] h-[min(520px,70vw)] w-[min(520px,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative z-[2] mx-auto flex w-full max-w-[920px] flex-1 flex-col items-center justify-center px-5 pt-8 pb-12 text-center sm:px-6 sm:pt-12 sm:pb-14 md:px-10 md:py-16">
        <RevealHeading
          as="h1"
          mode="mount"
          align="center"
          delay={0.15}
          stagger={0.14}
          duration={0.95}
          className="text-[clamp(2.85rem,11vw,5.75rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-[#111] sm:text-[clamp(3.1rem,9vw,5.75rem)]"
          lines={[
            { content: "The Autonomous", className: "text-[#111]" },
            { content: "Enterprise", className: "text-[#111]" },
            {
              content: <span className="home-hero-gradient-text">IT Brain.</span>,
            },
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease }}
          className="mt-5 max-w-[540px] text-[clamp(15px,1.7vw,18px)] leading-[1.65] text-[#5F5F66] sm:mt-7"
        >
          Eliminate the 12-day L1–L3 support trap. Investigate, patch, and
          mathematically prove software fixes in{" "}
          <strong className="font-semibold text-[#111]">60 seconds.</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease }}
          className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row"
        >
          <Link
            href="/book-pilot"
            className="btn-primary-bloom inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111] px-7 py-3.5 text-[14px] font-medium text-white sm:w-auto"
          >
            Request Shadow Mode
            <span aria-hidden>→</span>
          </Link>
          <a
            href="https://www.youtube.com/watch?v=SdXRbVhZMzg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#111]/15 bg-white/75 px-7 py-3.5 text-[14px] font-medium text-[#111] backdrop-blur-sm transition-colors hover:border-[#111]/3 hover:bg-white sm:w-auto"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#111]/25">
              <span className="ml-0.5 h-0 w-0 border-y-[3.5px] border-l-[6px] border-y-transparent border-l-[#111]" />
            </span>
            Watch a 60-second proof
          </a>
        </motion.div>
      </div>
    </section>
  );
}
