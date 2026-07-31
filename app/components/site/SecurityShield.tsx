"use client";

import { motion } from "framer-motion";
import { Lock, ScrollText, Server } from "lucide-react";

const cards = [
  {
    icon: Lock,
    title: "SOC 2 Type II Ready",
    body: "Control mappings for change management, access review, and incident response—designed so every autonomous action is audit-ready by construction.",
    tag: "COMPLIANCE",
  },
  {
    icon: ScrollText,
    title: "WORM Cryptographic Ledgers",
    body: "Append-only evidence of investigations, proofs, and approvals. Hash-chained records that CISOs can produce under subpoena without trusting a black box.",
    tag: "EVIDENCE",
  },
  {
    icon: Server,
    title: "GCP Confidential Space",
    body: "Sensitive workloads execute inside attested confidential compute enclaves. Your source, telemetry, and patches stay sealed from the operator plane.",
    tag: "ENCLAVE",
  },
];

export default function TrustFirewall() {
  return (
    <section id="trust" className="relative overflow-hidden bg-[#030712] px-6 py-24 md:px-10 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(139,92,246,0.14),transparent_50%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Sticky left copy */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-violet-400">
              Trust Firewall
            </p>
            <h2 className="text-[clamp(1.85rem,3.8vw,2.85rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
              Built for CISOs who refuse to trust vibes.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
              Autonomy without sovereignty is just a new attack surface. Jataka isolates
              compute, attests every decision, and keeps humans in the approval path.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-200 shadow-[0_0_30px_-8px_rgba(139,92,246,0.55)]">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              Zero Trust · Provenance First
            </div>
          </motion.div>
        </div>

        {/* Scrolling feature cards */}
        <div className="flex flex-col gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-violet-400/20 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(139,92,246,0.05)] backdrop-blur-md transition-all duration-500 hover:border-violet-400/45 hover:shadow-[0_0_48px_-16px_rgba(139,92,246,0.55)] md:p-8"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10">
                      <Icon className="h-5 w-5 text-violet-300" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-violet-300/70">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-[15px]">{card.body}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
