"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="final-cta" className="relative overflow-hidden bg-[#030712] px-6 py-28 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <h2 className="text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
          Stop guessing.
          <br />
          Start proving.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
          Deploy Jataka in 30-Day Read-Only Shadow Mode. If we don&apos;t catch your bugs,
          you don&apos;t pay.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/book-pilot"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-[#030712] transition-transform duration-300 hover:scale-[1.02]"
          >
            Request Shadow Mode
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-transparent px-7 py-3.5 text-sm font-medium text-slate-300 transition-colors hover:border-white/30 hover:text-white"
          >
            View Enterprise Pricing
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
