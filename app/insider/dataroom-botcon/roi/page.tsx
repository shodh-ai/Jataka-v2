"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Lock,
  TrendingUp,
  ChevronRight,
  Zap,
  Brain,
  Handshake,
  Building2,
} from "lucide-react";

// ------------------------------------------------------------------
// Scroll reveal
// ------------------------------------------------------------------
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div ref={ref} className={className} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.55s ease-out, transform 0.55s ease-out",
      transitionDelay: `${delay}ms`,
    }}>{children}</div>
  );
}

// ------------------------------------------------------------------
// Shared UI
// ------------------------------------------------------------------
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-[16px] inline-block rounded-[4px] bg-[#FF2424]/10 px-[12px] py-[6px] font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
      {children}
    </span>
  );
}

// ------------------------------------------------------------------
// Metric cards data
// ------------------------------------------------------------------
const INTERNAL_METRICS = [
  {
    icon: Zap,
    stat: "80%",
    label: "Drop in QA & Debugging Overhead",
    body: "Eliminates the need for large manual QA teams. Autonomous, self-healing visual tests drastically reduce delivery costs, increasing your profit margin on every contract.",
    accent: "#FF2424",
    accentBg: "bg-[#FF2424]/8",
    accentText: "text-[#FF2424]",
    accentBorder: "border-l-[#FF2424]",
  },
  {
    icon: TrendingUp,
    stat: "+40%",
    label: "Feature Delivery Velocity",
    body: "Removes the 'fear of deployment'. Developers get instant blast-radius context in their IDE, allowing your team to ship complex features without weeks of manual discovery.",
    accent: "#155EEF",
    accentBg: "bg-[#155EEF]/8",
    accentText: "text-[#155EEF]",
    accentBorder: "border-l-[#155EEF]",
  },
  {
    icon: Brain,
    stat: "10×",
    label: "Architect Leverage",
    body: "Senior Architects are expensive bottlenecks. Jataka automates contextual PR reviews, allowing one architect to safely manage a swarm of 50 junior developers or AI agents without dropping quality.",
    accent: "#7C3AED",
    accentBg: "bg-[#7C3AED]/8",
    accentText: "text-[#7C3AED]",
    accentBorder: "border-l-[#7C3AED]",
  },
];


// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
export default function ROIPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="border-b border-[#1a1a1a]/8 px-6 pb-[56px] pt-[70px] md:px-12">
        <div className="mx-auto max-w-[1100px]">

          {/* Breadcrumb */}
          <div className="mb-[20px] flex items-center gap-2 font-mono text-[11px] text-[#888]">
            <Link href="/insider/dataroom-botcon" className="hover:text-[#FF2424] transition">Data Room</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#1a1a1a]">GCC Business Impact</span>
          </div>

          <div className="inline-flex items-center gap-[9px] rounded-[4px] border border-[#16A34A]/25 bg-[#16A34A]/10 px-[14px] py-[6px] font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#16A34A]">
            <Lock className="h-[11px] w-[11px]" />
            Card 03 · GCC Business Impact
          </div>

          <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[2.8px] text-[#888]">
            Transforming the GCC Business Model
          </p>

          <h1 className="mt-3 font-archivo text-[clamp(28px,5vw,56px)] leading-[1.02] tracking-[-1.8px] uppercase text-[#1a1a1a]">
            From Selling Developer Hours<br />
            to Selling <span className="text-[#16A34A]">Zero-Risk Delivery.</span>
          </h1>

          <p className="mt-6 max-w-[760px] text-[16px] leading-[1.78] text-[#444]">
            The AI coding revolution is destroying the traditional "billable hour" model. If AI agents can write code in
            3 seconds, Global Delivery Centers can no longer bill for time. The GCCs of the future will bill for{" "}
            <strong className="text-[#1a1a1a]">Trust, Speed, and Guaranteed Outcomes.</strong>
          </p>
          <p className="mt-4 max-w-[760px] text-[16px] leading-[1.78] text-[#444]">
            By running Jataka as your foundational OS, BOT Consulting transitions into a{" "}
            <strong className="text-[#1a1a1a]">high-margin, next-generation delivery powerhouse.</strong>
          </p>

          {/* Hero stats strip */}
          <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
            {[
              { val: "0", label: "P1 Outages" },
              { val: "80%", label: "QA Cost Reduction" },
              { val: "+40%", label: "Dev Velocity" },
            ].map((s) => (
              <div key={s.label} className="rounded-[12px] border border-[#1a1a1a]/8 bg-white px-4 py-5 text-center shadow-[0_6px_20px_rgba(26,26,26,0.05)]">
                <div className="font-archivo text-[clamp(26px,4vw,44px)] leading-[1] tracking-[-1.5px] text-[#1a1a1a]">
                  {s.val}
                </div>
                <div className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[1.8px] text-[#888]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] px-6 md:px-12">

        {/* ── INTERNAL ROI ───────────────────────────────────────── */}
        <section className="py-[56px]">
          <Reveal>
            <SectionLabel>Section 01 / Internal ROI</SectionLabel>
            <div className="flex items-center gap-4 mb-[12px]">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[#16A34A]/10 text-[#16A34A]">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h2 className="font-archivo text-[clamp(22px,3.5vw,38px)] uppercase leading-[1.05] tracking-[-1px] text-[#1a1a1a]">
                Expanding BOT Consulting&apos;s Profit Margins
              </h2>
            </div>
            <p className="mb-[40px] max-w-[680px] text-[15px] leading-[1.72] text-[#555]">
              How the Context Engine structurally changes your unit economics.
            </p>
          </Reveal>

          <div className="space-y-6">
            {INTERNAL_METRICS.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.label} delay={i * 80}>
                  <div className={`rounded-[16px] border border-[#1a1a1a]/8 border-l-4 ${m.accentBorder} bg-white shadow-[0_8px_28px_rgba(26,26,26,0.05)]`}>
                    <div className="flex items-start gap-5 border-b border-[#1a1a1a]/8 p-6">
                      <div className={`inline-flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[12px] ${m.accentBg}`}>
                        <Icon className="h-6 w-6" style={{ color: m.accent }} />
                      </div>
                      <div>
                        <div className={`mb-1 font-archivo text-[clamp(36px,5vw,56px)] leading-[1] tracking-[-2px] ${m.accentText}`}>
                          {m.stat}
                        </div>
                        <h3 className="font-archivo text-[clamp(16px,2vw,22px)] uppercase leading-[1.1] tracking-[-0.5px] text-[#1a1a1a]">
                          {m.label}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[15px] leading-[1.7] text-[#444]">{m.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── EXTERNAL ROI ───────────────────────────────────────── */}
        <section className="border-t border-[#1a1a1a]/8 py-[56px]">
          <Reveal>
            <SectionLabel>Section 02 / External ROI</SectionLabel>
            <div className="flex items-center gap-4 mb-[12px]">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[#155EEF]/10 text-[#155EEF]">
                <Handshake className="h-6 w-6" />
              </div>
              <h2 className="font-archivo text-[clamp(22px,3.5vw,38px)] uppercase leading-[1.05] tracking-[-1px] text-[#1a1a1a]">
                The Enterprise Unfair Advantage
              </h2>
            </div>
            <p className="mb-[32px] max-w-[680px] text-[15px] leading-[1.72] text-[#555]">
              When bidding against legacy firms like Accenture or TCS, BOT Consulting no longer has to compete on hourly
              developer rates. You compete on{" "}
              <strong className="text-[#1a1a1a]">Mathematically Verified Delivery.</strong>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-[16px] border border-[#155EEF]/15 border-l-4 border-l-[#155EEF] bg-white p-7 shadow-[0_8px_28px_rgba(21,94,239,0.06)]">
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[2.2px] text-[#155EEF]">The Differentiator</p>
              <p className="text-[15.5px] leading-[1.75] text-[#333]">
                Enterprise CIOs want offshore leverage without the risk. By running Jataka, BOT Consulting is the
                only GCC that can{" "}
                <strong className="text-[#1a1a1a]">mathematically guarantee zero P1 outages, zero broken API
                contracts, and zero revenue leakage</strong> from bad deployments.
              </p>
            </div>
          </Reveal>

          {/* New revenue streams */}
          <Reveal delay={160}>
            <div className="mt-6 rounded-[16px] border border-[#1a1a1a]/8 bg-white p-6 shadow-[0_8px_28px_rgba(26,26,26,0.05)]">
              <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[2.2px] text-[#FF2424]">
                New Revenue Streams Unlocked
              </p>
              <p className="text-[15px] leading-[1.75] text-[#444]">
                Because Jataka maps overlap automatically, BOT Consulting can now bid on massive{" "}
                <strong className="text-[#1a1a1a]">M&amp;A Org Merges</strong> and{" "}
                <strong className="text-[#1a1a1a]">Legacy Digital Transformations</strong> at a speed and price point
                that traditional consultancies literally cannot match.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { icon: Building2, label: "M&A Org Merge Mapping", desc: "Compress months of enterprise due diligence into days" },
                  { icon: Zap, label: "Legacy Digital Transformation", desc: "Auto-migrate Workflow Rules to Flows at a price legacy firms can't touch" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3 rounded-[10px] bg-[#FAF8F3] p-4">
                      <div className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-[8px] bg-[#FF2424]/10">
                        <Icon className="h-4 w-4 text-[#FF2424]" />
                      </div>
                      <div>
                        <div className="font-archivo text-[14px] uppercase tracking-[-0.2px] text-[#1a1a1a]">{item.label}</div>
                        <div className="mt-1 text-[12.5px] text-[#666]">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a]/8 px-6 py-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-[#999]">
          Jataka · Confidential · Prepared for BOT Consulting
        </p>
      </footer>
    </div>
  );
}
