"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../home/FadeIn";

const stats = [
  { label: "Sev-1 incidents prevented", value: "200+" },
  { label: "Engineering hours saved", value: "5,000+" },
  { label: "Tests healed automatically", value: "1,200+" },
  { label: "Avg ROI for customers", value: "847%" },
];

export default function CustomersStats() {
  return (
    <section className="relative overflow-hidden bg-[#F3F3F4] px-6 pb-10 md:px-10 md:pb-14">
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden />
      <div className="relative z-10 mx-auto grid max-w-[1100px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="rounded-[18px] border border-[#111]/08 bg-white px-5 py-6 text-center shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:py-7"
            >
              <p className="text-[clamp(1.75rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-[#111]">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-medium tracking-[0.12em] text-[#8A93A3] uppercase">
                {stat.label}
              </p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
