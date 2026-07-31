"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const oldPathRef = useRef<SVGPathElement>(null);
  const newPathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const oldPath = oldPathRef.current;
      const newPath = newPathRef.current;
      if (!oldPath || !newPath || !sectionRef.current) return;

      const oldLen = oldPath.getTotalLength();
      const newLen = newPath.getTotalLength();

      gsap.set(oldPath, { strokeDasharray: oldLen, strokeDashoffset: oldLen });
      gsap.set(newPath, { strokeDasharray: newLen, strokeDashoffset: newLen });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 55%",
          scrub: 1.1,
        },
      });

      tl.to(oldPath, { strokeDashoffset: 0, duration: 2.4, ease: "none" }, 0)
        .to(newPath, { strokeDashoffset: 0, duration: 0.55, ease: "power2.out" }, 1.85)
        .to(oldPath, { opacity: 0.25, duration: 0.4 }, 2.0);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative overflow-hidden bg-[#030712] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.06),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 grid gap-8 md:grid-cols-2 md:items-end"
        >
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-red-400/90">
              The Cost of Latency
            </p>
            <h2 className="text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
              12 days of human triage.
              <br />
              <span className="text-slate-400">Or 60 seconds of proof.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-slate-400 md:justify-self-end md:text-right">
            Scroll to watch the old L1–L3 path collapse under a deterministic Jataka trajectory.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6 backdrop-blur-md md:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-red-400">The Old Way</p>
            <p className="mt-3 font-mono text-4xl font-medium tracking-tight text-white">12 Days</p>
            <p className="mt-2 text-sm text-slate-400">Ticket ping-pong · tribal knowledge · unverifiable fixes</p>
          </div>
          <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/[0.05] p-6 backdrop-blur-md md:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">The Jataka Way</p>
            <p className="mt-3 font-mono text-4xl font-medium tracking-tight text-white">60 Seconds</p>
            <p className="mt-2 text-sm text-slate-400">Investigate · patch · mathematically prove · human approve</p>
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md md:p-8">
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            <span>Incident Trajectory</span>
            <span>t₀ → resolution</span>
          </div>
          <svg viewBox="0 0 1000 280" className="h-auto w-full" fill="none" aria-hidden>
            {/* Grid */}
            {[40, 100, 160, 220].map((y) => (
              <line key={y} x1="40" y1={y} x2="960" y2={y} stroke="rgba(148,163,184,0.08)" strokeWidth="1" />
            ))}
            {/* Old jagged red path */}
            <path
              ref={oldPathRef}
              d="M40 60 C 120 55, 160 140, 220 120 S 320 220, 400 180 S 520 90, 600 150 S 720 240, 820 200 S 900 110, 960 170"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(239,68,68,0.55))" }}
            />
            {/* Fast straight electric blue path */}
            <path
              ref={newPathRef}
              d="M40 200 L 960 70"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 10px rgba(59,130,246,0.75))" }}
            />
            <circle cx="40" cy="200" r="4" fill="#06b6d4" />
            <circle cx="960" cy="70" r="5" fill="#3b82f6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
