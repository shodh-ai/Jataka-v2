"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, Fingerprint, Shield } from "lucide-react";

function SlackResolutionMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex items-center justify-between border-b border-slate-200 bg-[#f8fafc] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#4A154B] text-[10px] font-bold text-white">
            #
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">sev1-checkout</p>
            <p className="text-[11px] text-slate-500">3 members · incident channel</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
          RESOLVED · 58s
        </span>
      </div>

      <div className="space-y-4 p-4 md:p-5">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-[11px] font-bold text-slate-600">
            AK
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-slate-900">Aisha Khan</span>
              <span className="text-[11px] text-slate-400">9:41 AM</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Orders failing after deploy — payment webhook timeout on checkout. Anyone seeing this?
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2563eb] text-[10px] font-bold text-white">
            J
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-slate-900">Jataka</span>
              <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-indigo-600">
                APP
              </span>
              <span className="text-[11px] text-slate-400">9:41 AM</span>
            </div>
            <div className="mt-2 rounded-lg border border-slate-200 bg-[#f8fafc] p-3">
              <p className="text-sm font-medium text-slate-900">Causal diagnosis complete</p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                Root cause: N+1 retry loop in <code className="rounded bg-white px-1 py-0.5 font-mono text-[12px] text-indigo-600">PaymentGate.retry()</code> after deploy{" "}
                <code className="rounded bg-white px-1 py-0.5 font-mono text-[12px] text-slate-700">#4821</code>.
              </p>
              <div className="mt-3 space-y-1.5 border-t border-slate-200 pt-3 font-mono text-[11px]">
                <div className="flex justify-between text-slate-500">
                  <span>trace.t0</span>
                  <span>intent.parse</span>
                  <span className="text-emerald-600">12ms</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>trace.t1</span>
                  <span>graph.blast_radius</span>
                  <span className="text-emerald-600">41ms</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>trace.t2</span>
                  <span>patch.synthesize</span>
                  <span className="text-emerald-600">96ms</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>trace.t3</span>
                  <span>sandbox.prove</span>
                  <span className="text-emerald-600">412ms</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[12px] font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Patch proven · awaiting Tier-2 approval
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HashChainMockup() {
  const blocks = [
    { idx: "00481", hash: "a7f3…c291", prev: "e01b…9942", action: "INVESTIGATE" },
    { idx: "00482", hash: "91cd…0ef4", prev: "a7f3…c291", action: "PATCH_DIFF" },
    { idx: "00483", hash: "b2e8…71aa", prev: "91cd…0ef4", action: "SANDBOX_PROOF" },
    { idx: "00484", hash: "0f44…d8c1", prev: "b2e8…71aa", action: "HUMAN_APPROVE" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">WORM Cryptographic Ledger</p>
          <p className="mt-0.5 text-[12px] text-slate-500">Append-only · hash-chained · immutable</p>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-[11px] font-semibold text-emerald-700">Verified Signature</span>
        </div>
      </div>
      <div className="space-y-2.5 p-4 md:p-5">
        {blocks.map((b, i) => (
          <div
            key={b.idx}
            className="relative rounded-lg border border-slate-200 bg-[#f8fafc] px-4 py-3"
          >
            {i < blocks.length - 1 && (
              <div className="absolute -bottom-2.5 left-8 h-2.5 w-px bg-slate-300" />
            )}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold text-slate-900">#{b.idx}</span>
                  <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-medium text-indigo-600 ring-1 ring-slate-200">
                    {b.action}
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-[10px] text-slate-500">
                  hash <span className="text-slate-700">{b.hash}</span>
                  <span className="mx-2 text-slate-300">·</span>
                  prev <span className="text-slate-700">{b.prev}</span>
                </p>
              </div>
              <Fingerprint className="h-4 w-4 shrink-0 text-slate-400" />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 bg-[#f8fafc] px-5 py-3 font-mono text-[11px] text-slate-500">
        ed25519 · kid=jataka-prod-01 · ts=2026-07-23T11:41:02Z
      </div>
    </div>
  );
}

function ApprovalFrameworkMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="border-b border-slate-200 px-5 py-4">
        <p className="text-sm font-semibold text-slate-900">Trust Dial · Change Authorization</p>
        <p className="mt-0.5 text-[12px] text-slate-500">Policy-bound autonomy with human escalation</p>
      </div>

      <div className="space-y-5 p-5">
        <div className="rounded-lg border border-slate-200 bg-[#f8fafc] p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
                Current Policy
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Tier 3: Requires VP Approval</p>
              <p className="mt-1 text-[12px] text-slate-500">
                Blast radius ≥ 12 services · production write
              </p>
            </div>
            {/* Toggle */}
            <div className="relative h-7 w-12 shrink-0 rounded-full bg-[#2563eb] shadow-inner">
              <div className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white shadow" />
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
            Authorization Timeline
          </p>
          <ol className="space-y-0">
            {[
              { t: "09:41:02", label: "Jataka proposed patch", state: "done", who: "System" },
              { t: "09:41:18", label: "SRE Lead reviewed proof", state: "done", who: "M. Chen" },
              { t: "09:42:01", label: "VP Engineering approval", state: "active", who: "Pending" },
              { t: "—", label: "Deploy to production", state: "wait", who: "Gated" },
            ].map((step, i, arr) => (
              <li key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-1 h-2.5 w-2.5 rounded-full ring-4 ${
                      step.state === "done"
                        ? "bg-emerald-500 ring-emerald-50"
                        : step.state === "active"
                          ? "bg-[#2563eb] ring-blue-50"
                          : "bg-slate-300 ring-slate-50"
                    }`}
                  />
                  {i < arr.length - 1 && <span className="my-1 w-px flex-1 bg-slate-200" />}
                </div>
                <div className="mb-4 flex-1 pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900">{step.label}</p>
                    <span className="font-mono text-[10px] text-slate-400">{step.t}</span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-slate-500">{step.who}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

const pillars = [
  {
    eyebrow: "01 — Timing",
    icon: Clock3,
    title: "Resolution at Machine Speed",
    body: "Causal AI collapses twelve days of L1–L3 ping-pong into a deterministic investigation cycle. Intent is parsed from Slack or Jira, the dependency graph computes blast radius, and a proven patch lands before the war room fills.",
    points: [
      "Sub-second intent classification from natural language",
      "Graph-backed root cause with full execution traces",
      "Median proof cycle under 60 seconds",
    ],
    mockup: <SlackResolutionMockup />,
    reverse: false,
  },
  {
    eyebrow: "02 — Auditability",
    icon: Fingerprint,
    title: "Sovereign Compliance",
    body: "Every inference, diff, and remediation decision is sealed to a WORM cryptographic ledger. CISOs get tamper-evident provenance for SOC 2, change boards, and regulated environments—without trusting a black box.",
    points: [
      "Hash-chained, append-only evidence store",
      "Ed25519 signed investigation artifacts",
      "Export-ready packages for external auditors",
    ],
    mockup: <HashChainMockup />,
    reverse: true,
  },
  {
    eyebrow: "03 — Approval Framework",
    icon: Shield,
    title: "Absolute Human Trust",
    body: "Autonomy never bypasses control. The Trust Dial encodes risk tiers, ownership, and rollback guarantees so humans approve blast-radius-aware remediations—from auto-heal in sandbox to VP sign-off in production.",
    points: [
      "Policy tiers mapped to blast radius and data class",
      "Explicit human gates for production writes",
      "Full authorization timeline on every change",
    ],
    mockup: <ApprovalFrameworkMockup />,
    reverse: false,
  },
];

export default function Pillars() {
  return (
    <section id="pillars" className="relative bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
            Operating Doctrine
          </p>
          <h2 className="text-[clamp(1.85rem,3.8vw,2.75rem)] font-semibold tracking-[-0.035em] text-slate-900">
            Three pillars. One control plane.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Built for Fortune 500 CIOs and CISOs who require machine speed without sacrificing
            mathematical proof or human authority.
          </p>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  pillar.reverse ? "" : ""
                }`}
              >
                <div className={pillar.reverse ? "lg:order-2" : ""}>
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-[#f8fafc] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <Icon className="h-5 w-5 text-[#2563eb]" strokeWidth={1.75} />
                  </div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {pillar.eyebrow}
                  </p>
                  <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.03em] text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">{pillar.body}</p>
                  <ul className="mt-6 space-y-3">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={pillar.reverse ? "lg:order-1" : ""}>{pillar.mockup}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
