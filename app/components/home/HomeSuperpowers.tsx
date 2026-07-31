"use client";

import Link from "next/link";
import { Zap, EyeOff, Scissors, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { RevealHeading } from "./RevealHeading";

const cards = [
  {
    n: "01",
    icon: Zap,
    title: "The Limit Firewall",
    body: "Guard rate-limits, budgets, and model spend across every autonomous action. Jataka refuses to burn your Kubernetes quota to prove it can.",
    meta: "0 RUNAWAY LOOPS · 41 ORGS",
    href: "/use-cases/limit-firewall",
  },
  {
    n: "02",
    icon: EyeOff,
    title: "Data Leak Prevention",
    body: "PII, secrets, and IP never leave the TEE. Prompts, traces, and patches are redacted at ingress — with cryptographic proof for your DPO.",
    meta: "REGEX + ENTITY + LLM REDACTION",
    href: "/security",
  },
  {
    n: "03",
    icon: Scissors,
    title: "Surgical Org Merges",
    body: "Merging two SaaS estates? Jataka reconciles IAM, tenant graphs, and codebase forks in hours — not the four-quarter M&A slog.",
    meta: "AVG. ESTATE MERGE: 11 DAYS",
    href: "/use-cases/automated-pr-reviews",
  },
  {
    n: "04",
    icon: Trash2,
    title: "Tech Debt Cleanup",
    body: "Runs continuously against your monorepo. Removes dead branches, refactors ghost services, retires unused feature flags — with signed diffs.",
    meta: "MEDIAN: 4,281 LOC / WEEK",
    href: "/knowledge-graph",
  },
];

export default function HomeSuperpowers() {
  return (
    <section id="superpowers" className="relative overflow-hidden bg-[#F3F3F4]">
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.28]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-14 md:px-10 md:py-16">
        <RevealHeading
          as="h2"
          className="max-w-[820px] text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[#111]"
          lines={[
            {
              content: (
                <>
                  What your CIO actually gets to{" "}
                  <span className="font-instrument font-normal italic text-[#8A93A3]">brag</span>{" "}
                  about.
                </>
              ),
            },
          ]}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 md:gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col rounded-[22px] border border-[#111]/08 bg-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.04)] md:p-7"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#111]/08 bg-[#F8FAFC] text-[#2563EB]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[12px] text-[#C4C4CC]">{card.n}</span>
                </div>
                <h3 className="text-[clamp(1.2rem,2vw,1.4rem)] font-semibold tracking-[-0.02em] text-[#111]">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-[1.65] text-[#5F5F66]">{card.body}</p>
                <div className="mt-6 flex flex-col gap-3 border-t border-[#111]/06 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-[10px] tracking-[0.12em] text-[#9A9AA3] uppercase">
                    {card.meta}
                  </p>
                  <Link
                    href={card.href}
                    className="shrink-0 text-[13px] font-medium text-[#4B4B53] transition-colors hover:text-[#111]"
                  >
                    Learn more →
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
