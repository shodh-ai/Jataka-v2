"use client";

import { motion } from "framer-motion";
import { RevealHeading } from "../home/RevealHeading";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CustomersHero() {
  return (
    <section className="relative overflow-hidden bg-[#F3F3F4] px-6 pt-28 pb-16 md:px-10 md:pt-36 md:pb-20">
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.32]" aria-hidden />
      <div className="pointer-events-none absolute top-[35%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[820px] text-center">
        <RevealHeading
          as="h1"
          mode="mount"
          align="center"
          delay={0.12}
          stagger={0.12}
          duration={0.9}
          className="text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#111]"
          lines={[
            {
              content: (
                <>
                  Design partner{" "}
                  <span className="font-instrument font-normal italic text-[#8A93A3]">results</span>.
                </>
              ),
            },
          ]}
        />
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          className="mx-auto mt-7 max-w-[560px] text-[clamp(15px,1.7vw,18px)] leading-[1.65] text-[#5F5F66]"
        >
          Real teams. Real incidents. Real proof. See how Salesforce organizations prevented
          production disasters and saved thousands of engineering hours.
        </motion.p>
      </div>
    </section>
  );
}
