"use client";

import { motion } from "framer-motion";
import { GitMerge, Gauge, ShieldAlert, Trash2 } from "lucide-react";

const cards = [
  {
    icon: Gauge,
    title: "The Limit Firewall",
    eyebrow: "Runtime Governance",
    body: "Predicts CPU timeouts and SOQL saturation before merge. Kamikaze pods execute PRs against production-like volumes—blocking deployments that would breach at 15k records.",
    detail: {
      label: "Projected at 15,000 records",
      rows: [
        ["CPU time", "11,840 ms", "warn"],
        ["SOQL", "96 / 100", "critical"],
        ["DML", "42 / 150", "ok"],
      ],
    },
  },
  {
    icon: ShieldAlert,
    title: "Experience Cloud DLP",
    eyebrow: "Data Protection",
    body: "Blocks Guest Profile data leaks across Experience Cloud surfaces. Continuously diffs FLS, sharing rules, and Apex exposure so PII never ships to unauthenticated paths.",
    detail: {
      label: "Guest Profile scan",
      rows: [
        ["Contact.Email", "Exposed", "critical"],
        ["Account.SSN__c", "Blocked", "ok"],
        ["Case.Subject", "Masked", "ok"],
      ],
    },
  },
  {
    icon: GitMerge,
    title: "Surgical Org Merges",
    eyebrow: "M&A Intelligence",
    body: "Diffs two AST graphs for acquisition cutovers. Surfaces conflicting automations, duplicate custom fields, and unsafe destructive changes before you unify orgs.",
    detail: {
      label: "Org A ↔ Org B delta",
      rows: [
        ["Shared objects", "214", "ok"],
        ["Conflicting triggers", "17", "warn"],
        ["Safe delete candidates", "83", "ok"],
      ],
    },
  },
  {
    icon: Trash2,
    title: "Tech Debt Cleanup",
    eyebrow: "Org Hygiene",
    body: "Auto-identifies orphaned nodes—unused fields, dead flows, unreachable Apex—and generates the exact destructiveChanges.xml to delete a decade of bloat safely.",
    detail: {
      label: "Orphan remediation",
      rows: [
        ["Orphaned fields", "1,204", "warn"],
        ["Dead flows", "96", "warn"],
        ["destructiveChanges.xml", "Ready", "ok"],
      ],
    },
  },
];

function statusColor(status: string) {
  if (status === "critical") return "text-red-600 bg-red-50";
  if (status === "warn") return "text-amber-700 bg-amber-50";
  return "text-emerald-700 bg-emerald-50";
}

export default function EnterpriseSuperpowers() {
  return (
    <section id="superpowers" className="relative bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
            Enterprise Superpowers
          </p>
          <h2 className="text-[clamp(1.85rem,3.8vw,2.75rem)] font-semibold tracking-[-0.035em] text-slate-900">
            Depth where Salesforce breaks.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Not another chatbot. Purpose-built instrumentation for the failure modes Fortune 500
            orgs actually hit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <div className="p-6 md:p-7">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-[#f8fafc]">
                      <Icon className="h-5 w-5 text-[#2563eb]" strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {card.eyebrow}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-[15px]">{card.body}</p>
                </div>

                <div className="border-t border-slate-200 bg-[#f8fafc] px-6 py-4 md:px-7">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {card.detail.label}
                  </p>
                  <div className="space-y-2">
                    {card.detail.rows.map(([label, value, status]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2"
                      >
                        <span className="text-[12px] text-slate-500">{label}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-medium ${statusColor(
                            status
                          )}`}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
