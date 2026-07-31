"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { RevealHeading } from "./RevealHeading";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  risk: number;
};

const NODES: Node[] = [
  { id: "checkout", label: "CheckoutCtrl", x: 50, y: 48, risk: 98 },
  { id: "auth", label: "AuthService", x: 22, y: 28, risk: 72 },
  { id: "order", label: "Order__c", x: 78, y: 26, risk: 81 },
  { id: "payment", label: "PaymentGate", x: 18, y: 68, risk: 64 },
  { id: "guest", label: "Guest Profile", x: 82, y: 70, risk: 91 },
  { id: "pii", label: "Contact PII", x: 50, y: 82, risk: 88 },
  { id: "flow", label: "Retry Flow", x: 50, y: 18, risk: 45 },
];

const EDGES: [string, string][] = [
  ["checkout", "auth"],
  ["checkout", "order"],
  ["checkout", "payment"],
  ["checkout", "guest"],
  ["checkout", "flow"],
  ["guest", "pii"],
  ["order", "pii"],
  ["auth", "flow"],
  ["payment", "order"],
];

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function neighborsOf(id: string) {
  const set = new Set<string>([id]);
  EDGES.forEach(([a, b]) => {
    if (a === id) set.add(b);
    if (b === id) set.add(a);
  });
  return set;
}

export default function HomeBlastPlayground() {
  const [active, setActive] = useState<string | null>("checkout");
  const [contained, setContained] = useState(false);

  const hot = useMemo(() => {
    if (!active) return new Set<string>();
    return neighborsOf(active);
  }, [active]);

  const hotEdges = useMemo(() => {
    if (!active) return new Set<string>();
    const set = new Set<string>();
    EDGES.forEach(([a, b]) => {
      if (hot.has(a) && hot.has(b)) set.add(`${a}-${b}`);
    });
    return set;
  }, [active, hot]);

  const blastScore = useMemo(() => {
    if (!active) return 0;
    if (contained) return Math.max(8, Math.round(nodeById(active).risk * 0.12));
    const vals = [...hot].map((id) => nodeById(id).risk);
    return Math.min(99, Math.round(vals.reduce((a, b) => a + b, 0) / vals.length));
  }, [active, contained, hot]);

  const impactCount = contained ? 1 : Math.max(1, hot.size);

  return (
    <section id="blast" className="relative overflow-hidden bg-[#0B1220] px-6 py-20 md:px-10 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(37,99,235,0.18),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <RevealHeading
              as="h2"
              className="max-w-[640px] text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white"
              lines={[
                { content: "Touch a node." },
                { content: "Feel the blast radius." },
              ]}
            />
            <FadeIn delay={0.12}>
              <p className="mt-5 max-w-[520px] text-[15px] leading-[1.7] text-slate-400">
                Hover any dependency. Watch the infection path light up. Then contain it the way
                Jataka does — surgically, with proof.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-md">
              <p className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                Live risk score
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${blastScore}-${contained}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`text-[clamp(2.5rem,5vw,3.25rem)] font-semibold tracking-[-0.04em] tabular-nums ${
                      contained ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {blastScore}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm text-slate-500">/ 100</span>
              </div>
              <p className="mt-1 text-[12px] text-slate-400">
                {contained
                  ? "Contained · 1 hop · proof-ready"
                  : `${impactCount} objects in blast path`}
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="mt-10 md:mt-12">
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#060B14] p-3 shadow-[0_40px_100px_rgba(0,0,0,0.45)] md:p-6">
            {/* Contained pulse overlay */}
            <AnimatePresence>
              {contained && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(16,185,129,0.16),transparent_50%)]"
                />
              )}
            </AnimatePresence>

            <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
              <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
                {/* soft rings */}
                <circle
                  cx="50"
                  cy="48"
                  r="28"
                  fill="none"
                  stroke="rgba(148,163,184,0.08)"
                  strokeWidth="0.2"
                  strokeDasharray="1 1.2"
                />
                <circle
                  cx="50"
                  cy="48"
                  r="38"
                  fill="none"
                  stroke="rgba(148,163,184,0.06)"
                  strokeWidth="0.15"
                  strokeDasharray="0.8 1.4"
                />

                {EDGES.map(([a, b]) => {
                  const na = nodeById(a);
                  const nb = nodeById(b);
                  const key = `${a}-${b}`;
                  const lit = hotEdges.has(key);
                  return (
                    <motion.line
                      key={key}
                      x1={na.x}
                      y1={na.y}
                      x2={nb.x}
                      y2={nb.y}
                      stroke={
                        contained && lit
                          ? "#34D399"
                          : lit
                            ? "#F87171"
                            : "rgba(148,163,184,0.22)"
                      }
                      strokeWidth={lit ? 0.55 : 0.25}
                      strokeLinecap="round"
                      animate={{
                        opacity: lit ? 1 : 0.45,
                      }}
                      transition={{ duration: 0.25 }}
                    />
                  );
                })}

                {/* infection / contain halo on active */}
                {active && (
                  <motion.circle
                    cx={nodeById(active).x}
                    cy={nodeById(active).y}
                    r={contained ? 8 : 12}
                    fill={contained ? "rgba(16,185,129,0.12)" : "rgba(248,113,113,0.14)"}
                    initial={false}
                    animate={{ r: contained ? [7, 9, 7] : [10, 14, 10] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </svg>

              {/* HTML nodes for hit targets + labels */}
              {NODES.map((n) => {
                const isHot = hot.has(n.id);
                const isActive = active === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onMouseEnter={() => {
                      setActive(n.id);
                      setContained(false);
                    }}
                    onFocus={() => {
                      setActive(n.id);
                      setContained(false);
                    }}
                    onClick={() => {
                      setActive(n.id);
                      setContained(false);
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0"
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                    aria-label={n.label}
                  >
                    <motion.span
                      animate={{
                        scale: isActive ? 1.15 : isHot ? 1.05 : 1,
                      }}
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full border text-[9px] font-bold tracking-wide transition-colors duration-300 sm:h-12 sm:w-12 sm:text-[10px] ${
                        contained && isHot
                          ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-200 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
                          : isHot
                            ? "border-red-400/50 bg-red-500/20 text-red-100 shadow-[0_0_24px_rgba(248,113,113,0.35)]"
                            : "border-white/15 bg-white/5 text-slate-300"
                      }`}
                    >
                      {n.label.slice(0, 2).toUpperCase()}
                    </motion.span>
                    <span
                      className={`mt-1.5 block whitespace-nowrap text-center text-[9px] font-medium sm:text-[10px] ${
                        isHot ? "text-white" : "text-slate-500"
                      }`}
                    >
                      {n.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[11px] tracking-[0.12em] text-slate-500 uppercase">
                {active ? (
                  <>
                    Focus · <span className="text-slate-300">{nodeById(active).label}</span>
                  </>
                ) : (
                  "Hover a node to start"
                )}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActive("checkout");
                    setContained(false);
                  }}
                  className="rounded-full border border-white/15 px-4 py-2 text-[12px] font-medium text-slate-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  Reset infection
                </button>
                <motion.button
                  type="button"
                  onClick={() => setContained(true)}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-full px-5 py-2 text-[12px] font-semibold transition-all ${
                    contained
                      ? "bg-emerald-400 text-[#04120c] shadow-[0_10px_40px_rgba(16,185,129,0.35)]"
                      : "bg-white text-[#0B1220] hover:shadow-[0_10px_40px_rgba(6,182,212,0.3)]"
                  }`}
                >
                  {contained ? "Contained by Jataka" : "Contain with Jataka"}
                </motion.button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
