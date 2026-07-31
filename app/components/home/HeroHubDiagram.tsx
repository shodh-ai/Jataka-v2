"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type NodeDef = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  delay: number;
  icon: "slack" | "salesforce" | "github" | "kamikaze" | "brum";
};

const NODES: NodeDef[] = [
  { id: "slack", label: "SLACK", sub: "Signals", x: 16, y: 18, delay: 0.35, icon: "slack" },
  { id: "sf", label: "SALESFORCE", sub: "Org & Metadata", x: 78, y: 16, delay: 0.45, icon: "salesforce" },
  { id: "gh", label: "GITHUB", sub: "Code & CI/CD", x: 88, y: 50, delay: 0.55, icon: "github" },
  { id: "kam", label: "KAMIKAZE", sub: "Test & Heal", x: 72, y: 84, delay: 0.65, icon: "kamikaze" },
  { id: "brum", label: "BRUM", sub: "Knowledge Graph", x: 16, y: 80, delay: 0.75, icon: "brum" },
];

const CENTER = { x: 48, y: 50 };

function SlackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden>
      <path fill="#E01E5A" d="M6.5 14.5a2 2 0 1 1-2-2h2v2Zm1 0a2 2 0 1 1 4 0v5a2 2 0 1 1-4 0v-5Z" />
      <path fill="#36C5F0" d="M9.5 6.5a2 2 0 1 1 2-2v2h-2Zm0 1a2 2 0 1 1 0 4h-5a2 2 0 1 1 0-4h5Z" />
      <path fill="#2EB67D" d="M17.5 9.5a2 2 0 1 1 2 2h-2v-2Zm-1 0a2 2 0 1 1-4 0v-5a2 2 0 1 1 4 0v5Z" />
      <path fill="#ECB22E" d="M14.5 17.5a2 2 0 1 1-2 2v-2h2Zm0-1a2 2 0 1 1 0-4h5a2 2 0 1 1 0 4h-5Z" />
    </svg>
  );
}

function SalesforceIcon() {
  return (
    <svg viewBox="0 0 64 44" className="h-5 w-8 sm:h-6 sm:w-9" aria-hidden>
      <path
        fill="#00A1E0"
        d="M26.2 8.4c1.9-2 4.6-3.2 7.5-3.2 3.6 0 6.7 1.8 8.5 4.6 1.5-.7 3.2-1.1 5-1.1 6.2 0 11.2 5 11.2 11.2 0 .4 0 .8-.1 1.2 3.6 1.3 6.2 4.7 6.2 8.7C64.5 36.5 58.5 42.5 51.2 42.5H14.6C6.5 42.5 0 36 0 27.9c0-6.5 4.2-12 10.1-14.1C11.2 8.2 16.6 4.2 22.9 4.2c1.2 0 2.3.1 3.3.4z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7" fill="#111" aria-hidden>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6A4.7 4.7 0 0 1 5.5 7c-.1-.3-.5-1.5.1-3.1 0 0 1.1-.3 3.4 1.3a11.7 11.7 0 0 1 6.2 0C17.5 3.6 18.6 4 18.6 4c.6 1.6.2 2.8.1 3.1a4.7 4.7 0 0 1 1.3 3.3c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

function KamikazeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden>
      <circle cx="24" cy="24" r="5" fill="#10B981" />
      <circle cx="12" cy="14" r="3.5" fill="#34D399" />
      <circle cx="36" cy="14" r="3.5" fill="#34D399" />
      <circle cx="12" cy="34" r="3.5" fill="#6EE7B7" />
      <circle cx="36" cy="34" r="3.5" fill="#6EE7B7" />
      <path
        d="M24 19V15M24 29v4M19 24H15M29 24h4M20.5 20.5l-2.5-2.5M27.5 27.5l2.5 2.5M27.5 20.5l2.5-2.5M20.5 27.5l-2.5 2.5"
        stroke="#059669"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const BRUM_NODES = [
  { x: 38, y: 24 },
  { x: 31, y: 11.88 },
  { x: 17, y: 11.88 },
  { x: 10, y: 24 },
  { x: 17, y: 36.12 },
  { x: 31, y: 36.12 },
] as const;

function BrumIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden>
      <circle cx="24" cy="24" r="4.5" fill="#3B82F6" />
      {BRUM_NODES.map((n) => (
        <g key={`${n.x}-${n.y}`}>
          <line x1="24" y1="24" x2={n.x} y2={n.y} stroke="#93C5FD" strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="3" fill="#60A5FA" />
        </g>
      ))}
    </svg>
  );
}

function JatakaMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" aria-hidden>
      <circle cx="32" cy="18" r="7" fill="#2563EB" />
      <circle cx="18" cy="42" r="7" fill="#3B82F6" />
      <circle cx="46" cy="42" r="7" fill="#38BDF8" />
      <path
        d="M32 25L18 35M32 25l14 10M18 42h28"
        stroke="#1D4ED8"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NodeIcon({ icon }: { icon: NodeDef["icon"] }) {
  switch (icon) {
    case "slack":
      return <SlackIcon />;
    case "salesforce":
      return <SalesforceIcon />;
    case "github":
      return <GithubIcon />;
    case "kamikaze":
      return <KamikazeIcon />;
    case "brum":
      return <BrumIcon />;
  }
}

const r2 = (n: number) => Math.round(n * 100) / 100;

const NETWORK_DOTS = Array.from({ length: 42 }, (_, i) => {
  const angle = (i / 42) * Math.PI * 2;
  const ring = 0.22 + (i % 5) * 0.12;
  return {
    x: r2(50 + Math.cos(angle + i * 0.2) * ring * 100),
    y: r2(50 + Math.sin(angle * 1.1) * ring * 92),
    r: r2((0.7 + (i % 3) * 0.35) * 0.35),
    opacity: r2(0.25 + (i % 4) * 0.08),
  };
});

function NetworkBg() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="hub-fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#93C5FD" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#hub-fade)" />
      <circle cx="48" cy="50" r="28" fill="none" stroke="#BFDBFE" strokeWidth="0.15" strokeDasharray="1.2 1.4" opacity="0.55" />
      <circle cx="48" cy="50" r="36" fill="none" stroke="#DBEAFE" strokeWidth="0.12" strokeDasharray="0.8 1.6" opacity="0.45" />
      {NETWORK_DOTS.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#60A5FA" opacity={d.opacity} />
      ))}
      {NETWORK_DOTS.slice(0, 28).map((d, i) => {
        const n = NETWORK_DOTS[(i + 7) % NETWORK_DOTS.length];
        return (
          <line
            key={`l-${i}`}
            x1={d.x}
            y1={d.y}
            x2={n.x}
            y2={n.y}
            stroke="#93C5FD"
            strokeWidth="0.12"
            opacity="0.22"
          />
        );
      })}
      <circle cx="22" cy="30" r="4" fill="#BFDBFE" opacity="0.18" />
      <circle cx="80" cy="62" r="5.5" fill="#93C5FD" opacity="0.14" />
      <circle cx="70" cy="28" r="3.2" fill="#DBEAFE" opacity="0.22" />
    </svg>
  );
}

export default function HeroHubDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  // Soft center focus by default so the story reads before hover
  const focus = active ?? "center";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative h-full w-full select-none">
      {mounted ? <NetworkBg /> : (
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(147,197,253,0.18),transparent_60%)]" />
      )}

      {/* Spoke lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
        {NODES.map((node) => {
          const highlighted = focus === node.id || focus === "center";
          const dimmed = focus !== "center" && focus !== node.id;
          return (
            <motion.path
              key={`spoke-${node.id}`}
              d={`M ${CENTER.x} ${CENTER.y} L ${node.x} ${node.y}`}
              stroke={highlighted ? "#2563EB" : "#3B82F6"}
              strokeWidth={focus === node.id ? 1.1 : focus === "center" ? 0.7 : 0.45}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: dimmed ? 0.16 : focus === node.id ? 0.95 : 0.55,
              }}
              transition={{ duration: 0.35, ease }}
            />
          );
        })}
      </svg>

      {/* Satellite nodes */}
      {NODES.map((node) => {
        const highlighted = focus === node.id;
        const dimmed = focus !== "center" && focus !== node.id;
        return (
          <motion.div
            key={node.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: dimmed ? 0.4 : 1, scale: 1 }}
            transition={{ duration: 0.35, ease }}
          >
            <button
              type="button"
              onMouseEnter={() => setActive(node.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(node.id)}
              onBlur={() => setActive(null)}
              className="group flex cursor-pointer flex-col items-center gap-1.5 border-0 bg-transparent p-0 outline-none sm:gap-2"
              aria-label={`${node.label} ${node.sub}`}
            >
              <span
                className={`relative flex h-14 w-14 items-center justify-center rounded-full border bg-white transition-all duration-300 sm:h-16 sm:w-16 md:h-[76px] md:w-[76px] ${
                  highlighted
                    ? "scale-110 border-[#2563EB]/35 shadow-[0_0_0_6px_rgba(37,99,235,0.12),0_18px_40px_rgba(37,99,235,0.28)]"
                    : "border-white/80 shadow-[0_14px_32px_rgba(37,99,235,0.12),0_4px_12px_rgba(15,23,42,0.06)]"
                }`}
              >
                <NodeIcon icon={node.icon} />
              </span>
              <span className="text-center leading-tight">
                <span
                  className={`block text-[10px] font-bold tracking-[0.08em] transition-colors duration-300 sm:text-[11px] md:text-[12px] ${
                    highlighted ? "text-[#2563EB]" : "text-[#111]"
                  }`}
                >
                  {node.label}
                </span>
                <span className="block text-[9px] font-medium text-[#6B7280] sm:text-[10px] md:text-[11px]">
                  {node.sub}
                </span>
              </span>
            </button>
          </motion.div>
        );
      })}

      {/* Center hub */}
      <motion.div
        className="absolute left-[48%] top-[50%] z-20 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.15, ease }}
      >
        <button
          type="button"
          onMouseEnter={() => setActive("center")}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive("center")}
          onBlur={() => setActive(null)}
          className="cursor-pointer border-0 bg-transparent p-0 outline-none"
          aria-label="Jataka hub"
        >
          <span
            className={`relative flex h-[88px] w-[88px] items-center justify-center rounded-full border bg-white transition-all duration-300 sm:h-[104px] sm:w-[104px] md:h-[120px] md:w-[120px] ${
              focus === "center"
                ? "scale-[1.04] border-[#2563EB]/35 shadow-[0_0_0_8px_rgba(37,99,235,0.12),0_28px_60px_rgba(37,99,235,0.26)]"
                : "scale-100 border-white/80 shadow-[0_18px_40px_rgba(37,99,235,0.12),0_6px_16px_rgba(15,23,42,0.06)]"
            }`}
          >
            <span className="absolute inset-3 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(191,219,254,0.55),transparent_55%)]" />
            <JatakaMark />
          </span>
        </button>
      </motion.div>
    </div>
  );
}
