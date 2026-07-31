"use client";

import { Play } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { RevealHeading } from "./RevealHeading";

const panelShell =
  "flex h-full flex-col overflow-hidden rounded-xl border border-[#111]/08 bg-white";
const panelBody = "flex min-h-[168px] flex-1 flex-col";

function UserIntentPanel() {
  return (
    <div className={panelShell}>
      <div className="flex items-center justify-between border-b border-[#111]/08 px-3 py-2.5">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-[#9A9AA3] uppercase">
          01 · User Intent
        </p>
        <span className="rounded bg-red-500 px-1.5 py-0.5 text-[9px] font-semibold text-white">
          S1
        </span>
      </div>
      <div className={`${panelBody} p-3`}>
        <div className="flex h-full flex-col rounded-lg border border-[#111]/06 bg-[#FAFAFA] p-3.5">
          <p className="font-mono text-[12px] text-[#5F5F66]">#incident</p>
          <p className="mt-3 text-[13px] leading-[1.65] text-[#111]">
            <span className="font-semibold">priya.m:</span> Checkout is throwing 500s for EU
            customers — orders stuck in PENDING_AUTH.
          </p>
          <p className="mt-auto pt-4 font-mono text-[10px] tracking-[0.08em] text-[#9A9AA3] uppercase">
            Sev-1 · EU checkout · PENDING_AUTH
          </p>
        </div>
      </div>
    </div>
  );
}

function BlastRadiusPanel() {
  return (
    <div className={panelShell}>
      <div className="flex items-center justify-between border-b border-[#111]/08 px-3 py-2.5">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-[#9A9AA3] uppercase">
          02 · Graph Blast Radius
        </p>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
          contained
        </span>
      </div>
      <div className={`${panelBody} bg-[#F8FAFC] p-2`}>
        <svg viewBox="0 0 280 140" className="h-full w-full" aria-hidden>
          <line x1="140" y1="70" x2="60" y2="35" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="140" y1="70" x2="220" y2="32" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="140" y1="70" x2="55" y2="105" stroke="#86EFAC" strokeWidth="1.5" />
          <line x1="140" y1="70" x2="225" y2="110" stroke="#93C5FD" strokeWidth="1.5" />
          <circle cx="140" cy="70" r="12" fill="#111" />
          <circle cx="60" cy="35" r="8" fill="#60A5FA" />
          <circle cx="220" cy="32" r="8" fill="#60A5FA" />
          <circle cx="55" cy="105" r="7" fill="#34D399" />
          <circle cx="225" cy="110" r="7" fill="#38BDF8" />
        </svg>
      </div>
    </div>
  );
}

function AstPatchPanel() {
  const lines = [
    { type: "-", text: "return null;" },
    { type: "+", text: "throw new AuthMissing();" },
    { type: "+", text: "retryIdempotent(o.id);" },
  ] as const;

  return (
    <div className={panelShell}>
      <div className="flex items-center justify-between border-b border-[#111]/08 px-3 py-2.5">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-[#9A9AA3] uppercase">
          03 · AST Patch
        </p>
        <span className="font-mono text-[10px] text-emerald-600">+7 / −4</span>
      </div>
      <div
        className={`${panelBody} justify-center bg-[#0F172A] p-3.5 font-mono text-[12px] leading-[1.85]`}
      >
        {lines.map((line) => (
          <div
            key={line.text}
            className={
              line.type === "-"
                ? "rounded-sm bg-red-500/15 px-1.5 text-red-300"
                : "rounded-sm bg-emerald-500/15 px-1.5 text-emerald-300"
            }
          >
            <span className="inline-block w-3">{line.type}</span> {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function DeltaBoxPanel() {
  return (
    <div className={panelShell}>
      <div className="flex items-center justify-between border-b border-[#111]/08 px-3 py-2.5">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-[#9A9AA3] uppercase">
          04 · DeltaBox Proof
        </p>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
          passed 41/41
        </span>
      </div>
      <div className={`${panelBody} relative items-center justify-center bg-[#0B1220]`}>
        <Play className="h-7 w-7 fill-white text-white" />
        <span className="absolute bottom-3 left-3 font-mono text-[10px] text-red-400">
          ● REC 00:47
        </span>
      </div>
    </div>
  );
}

function DashboardUI() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[14px] bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-[#111]/08 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF5F56]" />
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#FFBD2E]" />
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#27C93F]" />
          <span className="ml-1 truncate font-mono text-[10px] text-[#6B7280]">
            JATAKA · LIVE
          </span>
        </div>
        <span className="shrink-0 text-[9px] font-semibold tracking-[0.08em] text-emerald-600 uppercase">
          ● RESOLVED
        </span>
      </div>

      <div className="flex gap-1 border-b border-[#111]/06 px-2 py-1.5">
        {[0, 1, 2, 3].map((id) => (
          <div key={id} className="h-1 flex-1 rounded-full bg-[#2563EB]" />
        ))}
      </div>

      {/* Mobile: stack */}
      <div className="grid gap-2 p-2.5 md:hidden">
        <UserIntentPanel />
        <BlastRadiusPanel />
        <AstPatchPanel />
        <DeltaBoxPanel />
      </div>

      {/* Desktop: equal compact cards, no tall empty shell */}
      <div className="hidden gap-2.5 p-2.5 md:grid md:grid-cols-2 lg:grid-cols-4">
        <UserIntentPanel />
        <BlastRadiusPanel />
        <AstPatchPanel />
        <DeltaBoxPanel />
      </div>
    </div>
  );
}

export default function HomeDashboard() {
  return (
    <section id="dashboard" className="relative bg-[#F3F3F4] px-4 py-12 sm:px-6 md:px-8 md:py-16">
      <div className="relative mx-auto max-w-[1100px]">
        <div className="mx-auto mb-8 max-w-[720px] text-center md:mb-10">
          <RevealHeading
            as="h2"
            align="center"
            className="text-[clamp(2.15rem,7.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#111]"
            lines={[
              { content: "One incident." },
              { content: "Full situational awareness." },
            ]}
          />
          <FadeIn delay={0.12}>
            <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-[1.7] text-[#5F5F66]">
              Stop blindly approving code. Jataka isolates the noise and delivers the complete
              diagnostic payload in a single, unified control plane.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <div className="overflow-hidden rounded-[18px] border border-[#111]/10 bg-white shadow-[0_24px_60px_rgba(17,17,17,0.08)]">
            <DashboardUI />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
