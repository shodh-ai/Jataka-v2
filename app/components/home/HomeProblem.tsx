"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FadeIn } from "./FadeIn";
import { RevealHeading } from "./RevealHeading";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "17,280×", label: "faster resolution vs. human triage" },
  { value: "$4.1M", label: "avg. yearly cost of L1–L3 escalations" },
  { value: "100%", label: "cryptographically-signed audit trail" },
] as const;

// Jagged "old way" path — left → right
const RED_PATH =
  "M48 168 L90 168 L120 52 L155 228 L195 60 L235 236 L280 55 L325 224 L370 64 L415 232 L460 58 L505 218 L550 72 L595 226 L640 66 L685 212 L730 88 L775 200 L820 98 L865 178 L910 118 L952 148";

// Straight glowing "Jataka way"
const CYAN_PATH = "M48 168 L952 88";

export default function HomeProblem() {
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const oldPathRef = useRef<SVGPathElement>(null);
  const newPathRef = useRef<SVGPathElement>(null);
  const endDotRef = useRef<SVGCircleElement>(null);
  const redLabelRef = useRef<HTMLSpanElement>(null);
  const cyanLabelRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const chart = chartRef.current;
      const oldPath = oldPathRef.current;
      const newPath = newPathRef.current;
      const endDot = endDotRef.current;
      if (!chart || !oldPath || !newPath || !endDot) return;

      const oldLen = oldPath.getTotalLength();
      const newLen = newPath.getTotalLength();

      gsap.set(oldPath, {
        strokeDasharray: oldLen,
        strokeDashoffset: oldLen,
        opacity: 1,
      });
      gsap.set(newPath, {
        strokeDasharray: newLen,
        strokeDashoffset: newLen,
        opacity: 1,
      });
      gsap.set(endDot, { opacity: 0, scale: 0, transformOrigin: "center" });
      gsap.set([redLabelRef.current, cyanLabelRef.current], { opacity: 0, y: 6 });

      // Scrub tied to the chart card — short, clear scroll window
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: chart,
          start: "top 80%",
          end: "top 28%",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      tl.to(redLabelRef.current, { opacity: 1, y: 0, duration: 0.15 }, 0)
        .to(oldPath, { strokeDashoffset: 0, duration: 0.7 }, 0.05)
        .to(cyanLabelRef.current, { opacity: 1, y: 0, duration: 0.12 }, 0.72)
        .to(newPath, { strokeDashoffset: 0, duration: 0.12 }, 0.75)
        .to(endDot, { opacity: 1, scale: 1, duration: 0.08 }, 0.82)
        .to(oldPath, { opacity: 0.28, duration: 0.15 }, 0.85);

      // Lenis can settle after first paint — refresh ST once
      const refresh = () => ScrollTrigger.refresh();
      const t1 = window.setTimeout(refresh, 100);
      const t2 = window.setTimeout(refresh, 400);
      window.addEventListener("load", refresh);

      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        window.removeEventListener("load", refresh);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="home-hero relative overflow-hidden bg-[#F3F3F4]"
    >
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.32]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 py-10 sm:px-6 md:px-10 md:py-16">
        <RevealHeading
          as="h2"
          className="relative z-20 max-w-[920px] text-[clamp(2rem,5.4vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[#111]"
          delay={0.05}
          stagger={0.12}
          duration={0.85}
          lines={[
            { content: "12 days of triage,", className: "text-[#111]" },
            {
              content: (
                <>
                  <span className="font-instrument text-[0.92em] font-normal italic text-[#8A93A3]">
                    or
                  </span>{" "}
                  <span className="home-hero-gradient-text">60 seconds of proof.</span>
                </>
              ),
              className: "text-[#111]",
            },
          ]}
        />

        <FadeIn delay={0.12}>
          <p className="mt-6 max-w-[560px] text-[clamp(15px,1.5vw,17px)] leading-[1.7] text-[#5F5F66]">
            The enterprise IT bottleneck isn&apos;t writing code. It&apos;s the endless loop of
            investigation, reading logs, and guessing the blast radius. Jataka replaces the human
            escalation queue with a deterministic state machine.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <FadeIn delay={0.08}>
            <div className="rounded-[18px] border border-red-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(17,17,17,0.04)] md:p-8">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#EF4444] uppercase">
                The Old Way
              </p>
              <p className="mt-3 font-mono text-[clamp(2rem,3.5vw,2.5rem)] font-semibold tracking-tight text-[#111]">
                12 Days
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#5F5F66]">
                Ticket ping-pong · tribal knowledge · unverifiable fixes
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.14}>
            <div className="rounded-[18px] border border-sky-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(17,17,17,0.04)] md:p-8">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#2563EB] uppercase">
                The Jataka Way
              </p>
              <p className="mt-3 font-mono text-[clamp(2rem,3.5vw,2.5rem)] font-semibold tracking-tight text-[#111]">
                60 Seconds
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#5F5F66]">
                Investigate · patch · mathematically prove · human approve
              </p>
            </div>
          </FadeIn>
        </div>

        <div
          ref={chartRef}
          className="relative mt-12 rounded-[22px] border border-[#111]/08 bg-white p-4 shadow-[0_18px_50px_rgba(17,17,17,0.05)] md:mt-14 md:p-8"
        >
          <div className="mb-3 flex flex-col gap-1 px-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span
              ref={redLabelRef}
              className="text-[10px] font-semibold tracking-[0.14em] text-[#EF4444] uppercase sm:text-[11px]"
            >
              12 days · human triage
            </span>
            <span
              ref={cyanLabelRef}
              className="text-[10px] font-semibold tracking-[0.14em] text-[#0891B2] uppercase sm:text-[11px]"
            >
              60 seconds · Jataka
            </span>
          </div>

          <svg
            viewBox="0 0 1000 280"
            className="h-auto w-full overflow-visible"
            role="img"
            aria-label="Slow jagged red triage path versus fast straight cyan Jataka trajectory"
          >
            {[100, 220, 340, 460, 580, 700, 820, 940].map((x) => (
              <line
                key={x}
                x1={x}
                y1={24}
                x2={x}
                y2={250}
                stroke="rgba(17,17,17,0.05)"
                strokeWidth="1"
              />
            ))}

            {/* Red jagged path */}
            <path
              ref={oldPathRef}
              d={RED_PATH}
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Cyan straight path */}
            <path
              ref={newPathRef}
              d={CYAN_PATH}
              fill="none"
              stroke="#22D3EE"
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 10px rgba(34,211,238,0.75))" }}
            />

            {/* Start / end markers */}
            <circle cx="48" cy="168" r="6" fill="#111" />
            <circle
              ref={endDotRef}
              cx="952"
              cy="88"
              r="7"
              fill="#22D3EE"
              style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.8))" }}
            />
          </svg>
        </div>

        <FadeIn delay={0.08} className="mt-10 md:mt-12">
          <div className="grid grid-cols-1 overflow-hidden rounded-[22px] border border-[#111]/08 bg-white shadow-[0_18px_50px_rgba(17,17,17,0.05)] sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <div
                key={stat.value}
                className={`px-7 py-8 md:px-9 md:py-10 ${
                  i > 0 ? "border-t border-[#111]/08 sm:border-t-0 sm:border-l" : ""
                }`}
              >
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: 0.05 + i * 0.08, ease }}
                  className="text-[clamp(2rem,3.6vw,2.75rem)] font-semibold tracking-[-0.04em] text-[#111]"
                >
                  {stat.value}
                </motion.div>
                <p className="mt-2 max-w-[220px] text-[13.5px] leading-[1.45] text-[#5F5F66]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
