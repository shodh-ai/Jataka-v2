"use client";

import Link from "next/link";
import { useState } from "react";
import { Lock, Brain, Shield, TrendingUp, Wrench, ArrowRight, FileText, Calendar } from "lucide-react";

const ACTS = [
  { label: "Act 1", id: "Yza1VjpcmkI", desc: "The Problem" },
  { label: "Act 2", id: "U68QdUiX3o8", desc: "The Solution" },
  { label: "Act 3", id: "CAobdQJMAhQ", desc: "The Impact" },
];

const CARDS = [
  {
    id: "01",
    icon: Brain,
    tag: "The Context Engine",
    subtitle: "How the Brain Works",
    description:
      "See how Jataka ingests Jira, GitHub, and Salesforce to build a real-time, 360-degree Knowledge Graph of the enterprise.",
    cta: "Explore the Core",
    href: "/insider/data-room-bot/executive-story",
    accentColor: "#155EEF",
    accentClass: "bg-[#155EEF]/10 text-[#155EEF]",
    borderClass: "border-[#155EEF]/15",
    tagClass: "text-[#155EEF]",
    leftAccent: "border-l-[#155EEF]",
  },
  {
    id: "02",
    icon: Shield,
    tag: "Enterprise Applications",
    subtitle: "DevSecOps Powered by Context",
    description:
      "Explore the suite of superhuman apps running on the Jataka Engine: The Limit Firewall, API Contract Guardian, Autonomous QA, and M&A Org Merge.",
    cta: "Explore the Tech",
    href: "/insider/dataroom-botcon/applications",
    accentColor: "#FF2424",
    accentClass: "bg-[#FF2424]/10 text-[#FF2424]",
    borderClass: "border-[#FF2424]/15",
    tagClass: "text-[#FF2424]",
    leftAccent: "border-l-[#FF2424]",
  },
  {
    id: "03",
    icon: TrendingUp,
    tag: "GCC Business Impact",
    subtitle: "Margins, Velocity, & Site Zero",
    description:
      "See the exact financial impact for BOT Consulting. 0 P1 Outages, 80% reduction in QA costs, and +40% developer velocity. Establish Site Zero.",
    cta: "See the ROI",
    href: "/insider/dataroom-botcon/roi",
    accentColor: "#16A34A",
    accentClass: "bg-[#16A34A]/10 text-[#16A34A]",
    borderClass: "border-[#16A34A]/15",
    tagClass: "text-[#16A34A]",
    leftAccent: "border-l-[#16A34A]",
  },
  {
    id: "04",
    icon: Wrench,
    tag: "Technical Due Diligence",
    subtitle: "The Platform Audit (V1.0)",
    description:
      "Deep dive into the mechanics. AST Parsing, Big-O Mathematical Extrapolation, Vision AI Healing, and Neo4j Cypher queries.",
    cta: "View the Audit",
    href: "/platform-audit",
    accentColor: "#7C3AED",
    accentClass: "bg-[#7C3AED]/10 text-[#7C3AED]",
    borderClass: "border-[#7C3AED]/15",
    tagClass: "text-[#7C3AED]",
    leftAccent: "border-l-[#7C3AED]",
  },
];

export default function DataRoomBotConPage() {
  const [activeAct, setActiveAct] = useState(0);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="border-b border-[#1a1a1a]/8 px-6 pb-[56px] pt-[70px] md:px-12">
        <div className="mx-auto max-w-[1100px]">

          {/* Confidential badge */}
          <div className="mb-[20px] flex justify-center">
            <div className="inline-flex items-center gap-[9px] rounded-[4px] border border-[#FF2424]/25 bg-[#FF2424]/10 px-[18px] py-[7px] font-mono text-[11px] font-bold uppercase tracking-[3px] text-[#FF2424]">
              <Lock className="h-[13px] w-[13px]" />
              Confidential: Executive Briefing for BOT Consulting
            </div>
          </div>

          <div className="mb-[6px] text-center font-mono text-[11.5px] font-bold uppercase tracking-[3px] text-[#666]">
            The era of generating code is over. The era of governing it is here.
          </div>

          <h1 className="mb-[10px] text-center font-archivo text-[clamp(32px,5.2vw,62px)] leading-[1.02] tracking-[-2px] uppercase text-[#1a1a1a]">
            The World&apos;s First <br />
            <span className="text-[#FF2424]">Context Engine</span> for <br />
            Enterprise Architecture.
          </h1>

          <div className="mb-[28px] flex flex-wrap justify-center gap-x-[22px] gap-y-[8px] font-mono text-[12px] uppercase tracking-[1px] text-[#666]">
            <span className="inline-flex items-center gap-[6px]">
              <FileText className="h-[12px] w-[12px]" /> Platform + Apps Brief
            </span>
            <span className="inline-flex items-center gap-[6px]">
              <Lock className="h-[12px] w-[12px]" /> For BOT Consulting Leadership
            </span>
            <span className="inline-flex items-center gap-[6px]">
              <Calendar className="h-[12px] w-[12px]" /> April 2026 — v1.0
            </span>
          </div>

          {/* Video + Hook two-col */}
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-center">

            {/* Multi-act video player */}
            <div className="overflow-hidden rounded-[16px] border border-[#1a1a1a]/10 bg-white shadow-[0_20px_60px_rgba(26,26,26,0.07)]">
              {/* Act tabs */}
              <div className="flex border-b border-[#1a1a1a]/8">
                {ACTS.map((act, i) => (
                  <button
                    key={act.id}
                    onClick={() => setActiveAct(i)}
                    className={`flex flex-1 items-center justify-center px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[2px] transition ${
                      activeAct === i
                        ? "border-b-2 border-[#FF2424] bg-white text-[#1a1a1a]"
                        : "border-b-2 border-transparent bg-[#FAF8F3] text-[#888] hover:text-[#1a1a1a]"
                    }`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
              {/* Embed */}
              <div className="aspect-video">
                <iframe
                  key={ACTS[activeAct].id}
                  src={`https://www.youtube.com/embed/${ACTS[activeAct].id}?autoplay=0&rel=0&modestbranding=1`}
                  title={`Jataka — ${ACTS[activeAct].label}: ${ACTS[activeAct].desc}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>

            {/* Hook copy */}
            <div className="rounded-[16px] border border-[#1a1a1a]/8 border-l-4 border-l-[#FF2424] bg-white p-7 shadow-[0_12px_36px_rgba(26,26,26,0.05)]">
              <p className="mb-3 font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                The Hook
              </p>
              <p className="text-[16px] leading-[1.75] text-[#333]">
                AI and offshore teams are generating code faster than ever, but they are{" "}
                <strong className="text-[#1a1a1a]">building blindfolded.</strong>
              </p>
              <p className="mt-4 text-[16px] leading-[1.75] text-[#333]">
                Jataka is the world&apos;s first Context Engine—a master blueprint that{" "}
                <strong className="text-[#1a1a1a]">prevents blind code</strong> from destroying enterprise
                process logic, API integrations, and revenue.
              </p>
              <a
                href="#rooms"
                className="mt-6 inline-flex items-center gap-[8px] rounded-[4px] bg-[#1a1a1a] px-[20px] py-[10px] font-archivo text-[11.5px] uppercase tracking-[1.5px] text-white transition hover:bg-[#000]"
              >
                Tour the Data Room
                <ArrowRight className="h-[14px] w-[14px]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── NAVIGATION PORTAL ──────────────────────────────────── */}
      <section id="rooms" className="px-6 py-[64px] md:px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-[10px]">
            <span className="inline-block rounded-[4px] bg-[#FF2424]/10 px-[12px] py-[6px] font-mono text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
              Navigate the Briefing
            </span>
          </div>
          <p className="mb-[32px] max-w-[640px] text-[15px] leading-[1.7] text-[#555]">
            Choose where you&apos;d like to start. Each room tells a different part of the story.
          </p>

          <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
            {CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.id}
                  href={card.href}
                  className={`group flex flex-col rounded-[14px] border border-[#1a1a1a]/8 bg-white p-[22px] shadow-[0_8px_28px_rgba(26,26,26,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(26,26,26,0.10)] border-l-4 ${card.leftAccent}`}
                >
                  <div className="mb-[16px] flex items-start justify-between">
                    <div className={`inline-flex h-[44px] w-[44px] items-center justify-center rounded-[10px] ${card.accentClass}`}>
                      <Icon className="h-[22px] w-[22px]" />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-[#1a1a1a]/20">
                      {card.id}
                    </span>
                  </div>

                  <p className={`mb-[5px] font-mono text-[10px] font-bold uppercase tracking-[2.2px] ${card.tagClass}`}>
                    {card.subtitle}
                  </p>
                  <h3 className="mb-[10px] font-archivo text-[20px] uppercase leading-[1.08] tracking-[-0.4px] text-[#1a1a1a]">
                    {card.tag}
                  </h3>
                  <p className="flex-1 text-[13.5px] leading-[1.68] text-[#555]">
                    {card.description}
                  </p>

                  <div className={`mt-[20px] inline-flex items-center gap-[6px] font-mono text-[11px] font-bold uppercase tracking-[1.6px] transition ${card.tagClass}`}>
                    {card.cta}
                    <ArrowRight className="h-[12px] w-[12px] transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-[#1a1a1a]/8 px-6 py-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-[#999]">
          Jataka · Confidential · Prepared for BOT Consulting · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
