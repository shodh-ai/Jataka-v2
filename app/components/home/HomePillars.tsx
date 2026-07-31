"use client";

import { motion } from "framer-motion";
import { RevealHeading } from "./RevealHeading";
import TiltCard from "./TiltCard";

function SlackMockup() {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[#111]/08 bg-white shadow-[0_22px_60px_rgba(17,17,17,0.08)]">
      <div className="flex items-center justify-between border-b border-[#111]/08 bg-[#FAFAFA] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          <span className="ml-2 text-[12px] font-medium text-[#5F5F66]"># incident-response</span>
        </div>
        <span className="text-[10px] font-semibold tracking-[0.14em] text-[#9A9AA3] uppercase">
          Slack
        </span>
      </div>

      <div className="space-y-5 p-4 md:p-5">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E5E7EB] text-[11px] font-bold text-[#4B5563]">
            PM
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-[#111]">Priya M.</span>
              <span className="text-[11px] text-[#9A9AA3]">9:41 AM</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-[#5F5F66]">
              Checkout is throwing 500s for EU customers — orders stuck in &apos;PENDING_AUTH&apos;.
              Anyone seeing this?
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#111] text-[10px] font-bold text-white">
            J
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-sm font-semibold text-[#111]">Jataka</span>
              <span className="rounded bg-[#EEF2FF] px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-[#4F46E5] uppercase">
                APP
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5F5F66]">
              Diagnostic Trace Complete. Regression introduced in{" "}
              <span className="font-mono text-[12px] text-[#111]">checkout-svc@a1f4c92</span>. AST
              patch prepared — 3 files, 11 lines, zero blast radius. Proof attached.
            </p>

            <div className="mt-3 overflow-hidden rounded-xl border border-[#111]/08 bg-[#FAFAFA]">
              <div className="flex items-center justify-between border-b border-[#111]/06 px-3 py-2">
                <span className="font-mono text-[10px] tracking-[0.08em] text-[#6B7280] uppercase">
                  AST PATCH · FIX/EU-AUTH
                </span>
                <span className="text-[10px] font-semibold text-emerald-600">verified</span>
              </div>
              <div className="overflow-x-auto bg-[#0F172A] p-3 font-mono text-[11px] leading-[1.7]">
                <div className="whitespace-nowrap text-red-300">
                  <span className="text-red-400">-</span> if (region == &quot;EU&quot; &amp;&amp;
                  !user.token) return null;
                </div>
                <div className="whitespace-nowrap text-emerald-300">
                  <span className="text-emerald-400">+</span> if (region == &quot;EU&quot; &amp;&amp;
                  !user.token) throw new AuthMissing(user.id);
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-md bg-[#111] px-3.5 py-2 text-[12px] font-medium text-white"
                  >
                    Approve &amp; deploy
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-[#111]/15 bg-white px-3.5 py-2 text-[12px] font-medium text-[#111]"
                  >
                    View sandbox proof
                  </button>
                </div>
                <span className="font-mono text-[11px] text-[#9A9AA3]">60.4s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LedgerMockup() {
  const rows = [
    "Reading diagnostic trace ................ ok",
    "Hashing AST diff (SHA-256) ............. ok",
    "Anchoring to S3 Object Lock ............ ok",
    "Attesting TEE nonce .................... ok",
  ];

  return (
    <div className="overflow-hidden rounded-[18px] border border-white/10 bg-[#0B1220] shadow-[0_22px_60px_rgba(17,17,17,0.18)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
        <span className="ml-2 font-mono text-[11px] tracking-wide text-white/45">
          JATAKA &gt; WORM-LEDGER · SIGNING
        </span>
      </div>
      <div className="space-y-2.5 p-4 font-mono text-[12px] leading-relaxed text-slate-300 md:p-5">
        <p className="text-white">$ jataka ledger sign --incident=INC-2841</p>
        {rows.map((row) => (
          <p key={row}>
            <span className="text-slate-500">&gt;</span> {row.replace(" ok", "")}{" "}
            <span className="text-emerald-400">ok</span>
          </p>
        ))}
        <p className="pt-1 text-emerald-300">✓ WORM entry sealed.</p>
        <p className="text-slate-600">------------------------------------------</p>
        <div className="space-y-1 text-[11px]">
          <p>
            block <span className="text-sky-300">#00184271</span>
          </p>
          <p>
            ts&nbsp;&nbsp;&nbsp;2026-01-14T10:42:31.084Z
          </p>
          <p>
            hash <span className="text-sky-300">7f4b9a1c2e0d3f5a</span>
          </p>
          <p className="pl-10 text-sky-300">8b6c1d2e9f4a7c30 51a2c3d4e5f60789 abcdef0123456789</p>
          <p>
            sig&nbsp;&nbsp;gcp-tee · <span className="text-emerald-400">verified</span>
          </p>
        </div>
        <p className="text-slate-600">------------------------------------------</p>
        <p className="text-white">$</p>
      </div>
    </div>
  );
}

function TiersMockup() {
  const tiers = [
    { name: "Tier 1 · Auto-apply", desc: "One-line, no user-facing surface", on: true },
    { name: "Tier 2 · On-call review", desc: "Multi-file, non-critical path", on: true },
    {
      name: "Tier 3 · VP Approval",
      desc: "Regulated system · > 500 users blast radius",
      on: true,
    },
    { name: "Tier 4 · Board notification", desc: "Financial reporting surface", on: false },
  ];

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#111]/08 bg-white shadow-[0_22px_60px_rgba(17,17,17,0.08)]">
      <div className="border-b border-[#111]/08 px-5 py-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[#9A9AA3] uppercase">
            Deployment Policies
          </p>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
            ACTIVE
          </span>
        </div>
        <p className="text-[17px] font-semibold tracking-tight text-[#111]">
          Human-in-the-loop tiers
        </p>
      </div>
      <div className="divide-y divide-[#111]/06">
        {tiers.map((tier) => (
          <div key={tier.name} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-sm font-medium text-[#111]">{tier.name}</p>
              <p className="mt-0.5 text-[12px] text-[#5F5F66]">{tier.desc}</p>
            </div>
            <div
              className={`relative h-7 w-12 shrink-0 rounded-full ${
                tier.on ? "bg-[#111]" : "bg-[#E5E7EB]"
              }`}
              aria-hidden
            >
              <div
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${
                  tier.on ? "right-1" : "left-1"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[#111]/06 px-5 py-3.5">
        <p className="text-[10px] font-semibold tracking-[0.12em] text-[#9A9AA3] uppercase">
          Enforced across 14 clusters
        </p>
        <button type="button" className="text-[12px] font-semibold text-[#111]">
          Edit policy →
        </button>
      </div>
    </div>
  );
}

const pillars = [
  {
    num: "01",
    label: "SPEED",
    title: "From incident to patch in one Slack thread.",
    body: "Jataka reads your alerts, traces the regression across services, and returns a signed AST patch — inside the conversation your engineers already live in. No context switch. No war rooms.",
    points: [
      "Median resolution: 60.4s",
      "Zero-context onboarding",
      "Reads production traces, code, logs",
    ],
    mockup: <SlackMockup />,
    reverse: false,
  },
  {
    num: "02",
    label: "AUDIT",
    title: "Every fix, cryptographically sealed.",
    body: "SHA-256 hashes of the trace, the patch, and the sandbox verdict are anchored to an S3 Object-Lock WORM ledger — signed inside a TEE. When your auditor asks, you show them the block.",
    points: [
      "WORM ledger · S3 Object Lock",
      "TEE-attested signatures",
      "SOC2 · HIPAA · ISO 27001 ready",
    ],
    mockup: <LedgerMockup />,
    reverse: true,
  },
  {
    num: "03",
    label: "APPROVAL",
    title: "You keep the humans on the loop that matter.",
    body: "Define blast-radius tiers once. Jataka decides which fixes ship autonomously and which pause for your VP, your CISO, or your board. Governance is not a stop-sign — it is a router.",
    points: [
      "4 configurable approval tiers",
      "Blast radius-aware routing",
      "Full change-of-control lineage",
    ],
    mockup: <TiersMockup />,
    reverse: false,
  },
];

export default function HomePillars() {
  return (
    <section id="pillars" className="home-hero relative overflow-hidden bg-[#F3F3F4]">
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.28]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-14 md:px-10 md:py-16">
        <RevealHeading
          as="h2"
          align="center"
          className="mx-auto max-w-[780px] text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#111]"
          lines={[
            { content: "Three pillars." },
            {
              content: (
                <>
                  <span className="font-instrument font-normal italic text-[#8A93A3]">
                    One autonomous
                  </span>{" "}
                  <span className="text-[#2563EB]">brain.</span>
                </>
              ),
            },
          ]}
        />

        <div className="mt-12 space-y-16 md:mt-14 md:space-y-20">
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14"
            >
              <motion.div
                className={pillar.reverse ? "lg:order-2" : ""}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-5 flex items-baseline gap-3">
                  <span className="font-instrument text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-normal italic text-[#C8CCD4]">
                    {pillar.num}
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.22em] text-[#111] uppercase">
                    {pillar.label}
                  </span>
                </div>
                <h3 className="text-[clamp(1.45rem,2.6vw,2rem)] font-semibold tracking-[-0.03em] text-[#111]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#5F5F66]">{pillar.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[14px] text-[#3A3A42]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className={`[perspective:1200px] ${pillar.reverse ? "lg:order-1" : ""}`}
                initial={{ opacity: 0, x: pillar.reverse ? -56 : 56 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard>{pillar.mockup}</TiltCard>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
