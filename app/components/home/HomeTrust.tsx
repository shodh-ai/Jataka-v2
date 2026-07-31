"use client";

import { motion } from "framer-motion";
import { RevealHeading } from "./RevealHeading";

const cards = [
  {
    label: "SOC 2 TYPE II",
    title: "In progress. Available under NDA.",
    body: "SOC 2 Type II attestation is underway. Full report will be available under NDA to enterprise customers, with continuous monitoring across CC1–CC9 for autonomous actions.",
  },
  {
    label: "GCP CONFIDENTIAL SPACE",
    title: "Model inference inside a TEE.",
    body: "Your prompts, traces, and code never leave a hardware-attested Trusted Execution Environment. Even Jataka operators cannot see your data — mathematically.",
  },
  {
    label: "S3 OBJECT LOCK (WORM)",
    title: "Immutable ledger. Regulator-grade.",
    body: "Every decision, patch, and approval is written once, never modified, and cryptographically chained. SEC 17a-4, FINRA 4511, and MiFID II retention out of the box.",
  },
];

export default function HomeTrust() {
  return (
    <section id="trust" className="relative overflow-hidden bg-[#F3F3F4] px-6 py-14 md:px-10 md:py-16">
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.28]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <RevealHeading
          as="h2"
          className="max-w-[820px] text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#111]"
          lines={[
            {
              content: (
                <>
                  Autonomy without{" "}
                  <span className="font-instrument font-normal italic text-[#8A93A3]">
                    consequences
                  </span>{" "}
                  is a liability.
                </>
              ),
            },
          ]}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-[640px] text-[15px] leading-[1.75] text-[#5F5F66] md:text-[16px]"
        >
          Jataka is built for CISOs who have to answer to auditors, boards, and regulators the
          morning after. Every layer is designed so the answer is: yes, here is the proof.
        </motion.p>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          {cards.map((card, i) => (
            <motion.article
              key={card.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[#111]/08 bg-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.04)] md:p-7"
            >
              <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-[#2563EB] uppercase">
                <span className="h-1.5 w-1.5 rounded-sm bg-[#2563EB]" />
                {card.label}
              </p>
              <h3 className="text-[clamp(1.15rem,2vw,1.35rem)] font-semibold tracking-tight text-[#111]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5F5F66]">{card.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
