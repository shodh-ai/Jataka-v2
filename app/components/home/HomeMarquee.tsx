"use client";

import { motion } from "framer-motion";

const LINE =
  "The Autonomous IT Brain   ·   · 60-second proof ·   ·   Investigate. Patch. Sign.   ·   · built for CIOs & CISOs ·   ·   Jataka Engine v2.0   ·   · SOC2 · TEE · WORM ·   ·   ";

export default function HomeMarquee() {
  return (
    <section
      id="proof-strip"
      className="relative overflow-hidden border-y border-[#111]/06 bg-[#F3F3F4] py-4 md:py-5"
      aria-hidden
    >
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.2]" />

      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 95, ease: "linear", repeat: Infinity }}
      >
        <div className="font-instrument shrink-0 pr-16 text-[16vw] leading-[0.95] text-slate-900 italic lg:text-[10vw]">
          {LINE}
        </div>
        <div className="font-instrument shrink-0 pr-16 text-[16vw] leading-[0.95] text-slate-900 italic lg:text-[10vw]">
          {LINE}
        </div>
      </motion.div>
    </section>
  );
}
