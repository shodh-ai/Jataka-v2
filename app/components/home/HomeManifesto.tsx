"use client";

import { motion } from "framer-motion";
import { RevealHeading } from "./RevealHeading";

const beliefs = [
  {
    numeral: "I",
    title: "The 12-day trap is not a bug. It is the operating system.",
    body: "Every Fortune 500 IT org runs on the same broken loop: a ticket leads, waits, escalates, waits, escalates again. Twelve business days later, a human writes a fix that another human — three timezones away — will review and eventually ship. Jataka does not optimize this loop. It replaces it.",
  },
  {
    numeral: "II",
    title: "Autonomy is worthless without proof.",
    body: "Any language model can write a patch. A regulator, an auditor, a board — none of them care. What they want is a cryptographic chain of custody from incident → diagnosis → patch → sandbox verdict → approval → deploy. Jataka is that chain. The intelligence is table stakes.",
  },
  {
    numeral: "III",
    title: "The humans that matter, on the loop that matters.",
    body: "We do not remove humans. We remove the seven layers of humans that shouldn't be there — the L1 who copies logs, the L2 who reproduces the bug, the L3 who reads the runbook. Your VPs and your CISOs stay. On Tier 3 changes, they are the loop.",
  },
  {
    numeral: "IV",
    title: "Software is a legal instrument now. Ship it like one.",
    body: "When your autonomous agent pushes a patch to a system that touches PCI, HIPAA, or SEC 17a-4 data, the diff is a legal artifact. Sign it. Anchor it. Retain it. Jataka is the first engine designed from the WORM ledger outward — everything else is a demo.",
  },
];

export default function HomeManifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden bg-[#F3F3F4] px-6 py-14 md:px-10 md:py-16">
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.28]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[920px]">
        <RevealHeading
          as="h2"
          className="max-w-[760px] text-[clamp(2rem,4.8vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[#111]"
          lines={[
            {
              content: (
                <>
                  Four things we{" "}
                  <span className="font-instrument font-normal italic text-[#2563EB]">believe</span>{" "}
                  with our whole chest.
                </>
              ),
            },
          ]}
        />

        <div className="mt-12 space-y-10 md:mt-14 md:space-y-12">
          {beliefs.map((item, i) => (
            <motion.article
              key={item.numeral}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-5 md:grid-cols-[88px_1fr] md:gap-10"
            >
              <div className="font-instrument text-[clamp(2.4rem,4vw,3.25rem)] leading-none italic text-[#9AA0AA]">
                {item.numeral}
              </div>
              <div>
                <h3 className="text-[clamp(1.2rem,2.2vw,1.55rem)] font-semibold tracking-[-0.025em] text-[#111]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[640px] text-[15px] leading-[1.75] text-[#5F5F66]">
                  {item.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
