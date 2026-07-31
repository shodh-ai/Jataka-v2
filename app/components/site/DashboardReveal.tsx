"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0a1220]/90 ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">{title}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
      </div>
      <div className="min-h-0 flex-1 p-3">{children}</div>
    </div>
  );
}

function AirTrafficDashboard() {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-2 p-2 md:gap-2.5 md:p-3">
      <Panel title="Slack Intent">
        <div className="space-y-2">
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-2">
            <p className="text-[10px] text-slate-500">#sev1-checkout</p>
            <p className="mt-1 text-[11px] leading-snug text-slate-200">
              “Orders failing after deploy — payment webhook timeout?”
            </p>
          </div>
          <div className="font-mono text-[10px] text-cyan-300/90">INTENT → PAYMENT_PATH · PRIORITY P1</div>
        </div>
      </Panel>

      <Panel title="Graph Blast Radius">
        <svg viewBox="0 0 160 90" className="h-full w-full" fill="none">
          <circle cx="80" cy="45" r="8" fill="#06b6d4" />
          <circle cx="40" cy="25" r="5" fill="#3b82f6" />
          <circle cx="120" cy="28" r="5" fill="#3b82f6" />
          <circle cx="35" cy="70" r="4" fill="#10b981" />
          <circle cx="125" cy="68" r="4" fill="#ef4444" />
          <line x1="80" y1="45" x2="40" y2="25" stroke="rgba(6,182,212,0.5)" />
          <line x1="80" y1="45" x2="120" y2="28" stroke="rgba(6,182,212,0.5)" />
          <line x1="80" y1="45" x2="35" y2="70" stroke="rgba(16,185,129,0.45)" />
          <line x1="80" y1="45" x2="125" y2="68" stroke="rgba(239,68,68,0.55)" />
        </svg>
      </Panel>

      <Panel title="Code Diff">
        <pre className="overflow-hidden font-mono text-[9px] leading-relaxed text-slate-300 md:text-[10px]">
          <span className="text-red-400/90">- await charge.retry(3)</span>
          {"\n"}
          <span className="text-emerald-400/90">+ await charge.retry(idempotent)</span>
          {"\n"}
          <span className="text-slate-500">  // proof: invariant holds</span>
        </pre>
      </Panel>

      <Panel title="Video Player">
        <div className="relative flex h-full min-h-[72px] items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-slate-900 to-slate-950">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: "linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }} />
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/20">
            <div className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-cyan-300" />
          </div>
          <span className="absolute bottom-2 left-2 font-mono text-[8px] tracking-wider text-slate-500">
            REPLAY · 00:42
          </span>
        </div>
      </Panel>
    </div>
  );
}

export default function DashboardReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !laptopRef.current) return;

      gsap.fromTo(
        laptopRef.current,
        { y: 180, rotateX: 28, scale: 0.88, opacity: 0.35 },
        {
          y: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="dashboard" className="relative h-[200vh] bg-[#030712]">
      <div className="sticky top-16 flex h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_55%)]" />

        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-blue-400/90">
              Air-Traffic Control
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.035em] text-white">
              One incident. Full situational awareness.
            </h2>
          </motion.div>

          <div style={{ perspective: "1400px" }}>
            <div
              ref={laptopRef}
              className="mx-auto w-full max-w-4xl will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Laptop chrome */}
              <div className="rounded-t-xl border border-white/15 bg-gradient-to-b from-slate-800 to-slate-900 p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] md:p-3">
                <div className="mb-2 flex items-center justify-center">
                  <div className="h-1 w-16 rounded-full bg-slate-700 md:w-20" />
                </div>
                <div className="aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-[#050b14]">
                  <AirTrafficDashboard />
                </div>
              </div>
              <div className="relative mx-auto h-3 w-[102%] -translate-x-[1%] rounded-b-xl bg-gradient-to-b from-slate-700 to-slate-800 shadow-lg">
                <div className="absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 rounded-b-md bg-slate-600/80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
