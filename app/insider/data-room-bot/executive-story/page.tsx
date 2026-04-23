"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowDown, Zap, Lock } from "lucide-react";

// --- Custom Brand Logos (Accurate SVGs) ---
function JiraLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.75 18.25 9 12 15.25 5.75 9z" />
      <path d="M12 8.75 18.25 15 12 21.25 5.75 15z" opacity="0.72" />
      <path d="M6.75 8 10.75 12 6.75 16 2.75 12z" opacity="0.9" />
    </svg>
  );
}

function GithubLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function SalesforceLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7.2 18.25c-2.3 0-4.2-1.66-4.2-3.82 0-2 1.6-3.6 3.65-3.8A5.67 5.67 0 0 1 12 5.75c2.35 0 4.44 1.4 5.32 3.5 2.11.15 3.68 1.76 3.68 3.83 0 2.15-1.87 3.92-4.2 3.92H7.2z" />
    </svg>
  );
}

// --- Shared Components ---
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#FF2424]/20 bg-[#FF2424]/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#FF2424]">
      {children}
    </span>
  );
}

export default function ExecutiveStoryPage() {
  return (
    <main className="relative min-h-screen bg-[#F7F1E8] text-[#1A1A1A]">
      <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(circle_at_top,_rgba(255,36,36,0.12),_transparent_60%)]" />

      {/* ========================================================
          SECTION 1: THE PROBLEM (THE BLINDFOLDED BUILDER)
          ======================================================== */}
      <section className="relative px-6 pb-20 pt-10 md:px-10 lg:px-16 lg:pt-14">
        <div className="mx-auto max-w-[1240px]">
          <Link
            href="/insider/data-room-bot"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#555] transition hover:text-[#1A1A1A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Data Room
          </Link>

          <div className="mt-14 max-w-[1080px]">
            <div className="inline-flex items-center gap-[9px] rounded-[4px] border border-[#FF2424]/25 bg-[#FF2424]/10 px-[18px] py-[7px] text-[11px] font-bold uppercase tracking-[3px] text-[#FF2424]">
              <Lock className="h-[13px] w-[13px]" />
              Confidential: Executive Briefing Prepared for BOT Consulting
            </div>
            <p className="mt-6 font-mono text-[11.5px] font-bold uppercase tracking-[3px] text-[#666]">
              The era of generating code is over. The era of governing it is here.
            </p>
            <h1 className="mt-5 max-w-[980px] font-archivo text-[clamp(34px,5.6vw,64px)] leading-[1.02] tracking-[-2px] uppercase text-[#1A1A1A]">
              The World&apos;s First <br />
              <span className="text-[#FF2424]">Context Engine</span> for <br />
              Enterprise Architecture.
            </h1>
            <p className="mt-8 max-w-[760px] text-[18px] leading-[1.7] text-[#4B4B4B] md:text-[20px]">
              Right now, the enterprise is obsessed with speed. AI and offshore teams are writing code
              faster than ever before. But there is a fatal flaw: <strong>They are building blindfolded.</strong>
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(460px,1.08fr)] lg:items-stretch">
            <div className="rounded-[32px] border-l-4 border-[#FF2424] bg-white p-8 shadow-[0_22px_60px_rgba(26,26,26,0.06)] md:p-12">
              <h2 className="font-archivo text-[28px] leading-none tracking-[-0.8px] uppercase text-[#1A1A1A]">
                The Problem: The Blindfolded Builder
              </h2>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.8] text-[#4B4B4B]">
                <p>
                  When a developer or an AI agent writes a piece of code, they look at a single file in a vacuum.
                </p>
                <ul className="list-inside list-disc space-y-2 marker:text-[#FF2424]">
                  <li>They don't know that deleting a "Lead Status" dropdown will silently break the SAP Billing system.</li>
                  <li>They don't know that a line of code working perfectly for 10 records will crash the entire company system on Black Friday when it hits 150,000 records.</li>
                </ul>
                <p className="font-semibold text-[#1A1A1A]">
                  In enterprise software, a perfect line of code without context is a multi-million dollar outage waiting to happen.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-[#1A1A1A]/10 bg-[linear-gradient(180deg,#fff_0%,#fff7f5_100%)] p-6 shadow-[0_28px_70px_rgba(255,36,36,0.08)] md:p-8">
              <div className="relative h-full rounded-[24px] border border-[#1A1A1A]/8 bg-[radial-gradient(circle_at_center,_rgba(255,36,36,0.08),_transparent_58%),linear-gradient(180deg,#fff_0%,#fffaf8_100%)] p-6 md:p-8">
                <div className="mx-auto flex max-w-[220px] items-center justify-center rounded-2xl bg-[#1A1A1A] px-5 py-4 text-center text-white shadow-[0_18px_40px_rgba(26,26,26,0.22)]">
                  <div>
                    <div className="font-archivo text-[18px] uppercase leading-none tracking-[-0.4px]">Developer or AI Agent</div>
                    <div className="mt-2 text-[13px] leading-[1.5] text-white/70">Changes Lead Status Dropdown</div>
                  </div>
                </div>

                <div className="mx-auto h-14 w-px bg-gradient-to-b from-[#1A1A1A] to-[#FF2424]" />

                <div className="relative mx-auto flex h-[180px] w-[180px] items-center justify-center rotate-45 rounded-[30px] border border-[#1A1A1A]/12 bg-[#1F1F1F] text-center text-white shadow-[0_24px_50px_rgba(26,26,26,0.18)]">
                  <div className="-rotate-45 px-5">
                    <div className="font-archivo text-[22px] uppercase leading-none tracking-[-0.5px]">Builds in Vacuum</div>
                    <div className="mt-2 text-[13px] uppercase tracking-[1px] text-white/80">No Enterprise Context</div>
                  </div>
                </div>

                <div className="relative mx-auto mt-8 hidden h-[120px] max-w-[560px] lg:block">
                  <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-[#1A1A1A]" />
                  <div className="absolute left-[12%] top-8 h-px w-[38%] rotate-[24deg] bg-[#1A1A1A]" />
                  <div className="absolute left-[31%] top-10 h-px w-[23%] rotate-[58deg] bg-[#1A1A1A]" />
                  <div className="absolute right-[31%] top-10 h-px w-[23%] -rotate-[58deg] bg-[#1A1A1A]" />
                  <div className="absolute right-[12%] top-8 h-px w-[38%] -rotate-[24deg] bg-[#1A1A1A]" />
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-[20px] border border-[#FF2424]/20 bg-white px-4 py-4 text-center shadow-sm">
                    <div className="font-mono text-[10px] uppercase tracking-[1.6px] text-[#FF2424]">Silent Breakage</div>
                    <div className="mt-2 font-archivo text-[16px] uppercase leading-tight tracking-[-0.3px] text-[#1A1A1A]">
                      SAP Billing Integration Fails
                    </div>
                  </div>
                  <div className="rounded-[20px] border border-[#FF2424]/20 bg-white px-4 py-4 text-center shadow-sm">
                    <div className="font-mono text-[10px] uppercase tracking-[1.6px] text-[#FF2424]">Silent Breakage</div>
                    <div className="mt-2 font-archivo text-[16px] uppercase leading-tight tracking-[-0.3px] text-[#1A1A1A]">
                      Marketing Flow Breaks
                    </div>
                  </div>
                  <div className="rounded-[20px] border border-[#FF2424]/20 bg-white px-4 py-4 text-center shadow-sm">
                    <div className="font-mono text-[10px] uppercase tracking-[1.6px] text-[#FF2424]">Silent Breakage</div>
                    <div className="mt-2 font-archivo text-[16px] uppercase leading-tight tracking-[-0.3px] text-[#1A1A1A]">
                      VP Dashboard Corrupts
                    </div>
                  </div>
                  <div className="rounded-[20px] border border-[#FF2424] bg-[#FF2424] px-4 py-4 text-center text-white shadow-[0_12px_30px_rgba(255,36,36,0.22)]">
                    <div className="font-mono text-[10px] uppercase tracking-[1.6px] text-white/75">Business Stops</div>
                    <div className="mt-2 font-archivo text-[16px] uppercase leading-tight tracking-[-0.3px]">
                      Revenue Impact
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: THE SOLUTION (TRIANGULATION DIAGRAM)
          ======================================================== */}
      <section className="relative border-y border-[#1A1A1A]/8 bg-[#FDFBF7] px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center">
            <Eyebrow>The Solution</Eyebrow>
            <h2 className="mt-6 font-archivo text-[clamp(34px,5vw,56px)] leading-[1] tracking-[-1.5px] uppercase">
              Triangulation of Context
            </h2>
            <p className="mx-auto mt-5 max-w-[760px] text-[17px] leading-[1.8] text-[#4B4B4B]">
              To solve this, we didn't build a testing tool. We built a Brain. Jataka ingests real-time data 
              from your three most critical platforms to build a perfectly safe, omniscient Context Engine.
            </p>
          </div>

          {/* DIAGRAM LAYOUT */}
          <div className="mt-20 flex flex-col items-center gap-12 xl:flex-row xl:items-stretch xl:justify-center">
            
            {/* LEFT COLUMN: THE 3 LOGO INPUTS */}
            <div className="flex w-full max-w-[390px] flex-col justify-center gap-6">
              
              {/* Jira */}
              <div className="relative grid min-h-[112px] grid-cols-[72px_1fr] items-center gap-5 rounded-[20px] border border-[#155EEF]/20 bg-white px-6 py-5 shadow-sm">
                <div className="flex h-[62px] w-[62px] flex-shrink-0 items-center justify-center rounded-[16px] bg-[#155EEF]/10 text-[#155EEF]">
                  <JiraLogo className="h-9 w-9" />
                </div>
                <div className="self-center">
                  <div className="font-archivo text-[18px] uppercase leading-tight tracking-[-0.4px]">Jira feeds</div>
                  <div className="text-[14px] text-[#555]">Business Intent (The "Why")</div>
                </div>
              </div>

              {/* GitHub */}
              <div className="relative grid min-h-[112px] grid-cols-[72px_1fr] items-center gap-5 rounded-[20px] border border-[#1A1A1A]/15 bg-white px-6 py-5 shadow-sm">
                <div className="flex h-[62px] w-[62px] flex-shrink-0 items-center justify-center rounded-[16px] bg-[#1A1A1A]/5 text-[#1A1A1A]">
                  <GithubLogo className="h-8 w-8" />
                </div>
                <div className="self-center">
                  <div className="font-archivo text-[18px] uppercase leading-tight tracking-[-0.4px]">GitHub feeds</div>
                  <div className="text-[14px] text-[#555]">Architecture Map (The "Where")</div>
                </div>
              </div>

              {/* Salesforce */}
              <div className="relative grid min-h-[112px] grid-cols-[72px_1fr] items-center gap-5 rounded-[20px] border border-[#00A1E0]/20 bg-white px-6 py-5 shadow-sm">
                <div className="flex h-[62px] w-[62px] flex-shrink-0 items-center justify-center rounded-[16px] bg-[#00A1E0]/10 text-[#00A1E0]">
                  <SalesforceLogo className="h-9 w-9" />
                </div>
                <div className="self-center">
                  <div className="font-archivo text-[18px] uppercase leading-tight tracking-[-0.4px]">Salesforce feeds</div>
                  <div className="text-[14px] text-[#555]">Live Physics (The "Scale")</div>
                </div>
              </div>

            </div>

            {/* MIDDLE: ARROWS (Hidden on small screens, horizontal on desktop) */}
            <div className="hidden flex-col justify-center gap-[76px] xl:flex">
              <ArrowRight className="h-8 w-8 text-[#FF2424]/60" />
              <ArrowRight className="h-8 w-8 text-[#FF2424]/60" />
              <ArrowRight className="h-8 w-8 text-[#FF2424]/60" />
            </div>
            {/* Mobile Arrow */}
            <div className="flex xl:hidden">
              <ArrowDown className="h-10 w-10 text-[#FF2424]/60" />
            </div>

            {/* RIGHT COLUMN: JATAKA ENGINE */}
            <div className="flex w-full max-w-[760px] flex-col justify-center xl:w-auto xl:flex-1">
              <div className="mb-8 flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF2424]/12 text-[#FF2424]">
                  <Zap className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-archivo text-[clamp(26px,3.5vw,40px)] leading-[1] tracking-[-1px] uppercase text-[#1A1A1A]">
                    The Jataka <br className="hidden sm:block" />Context Engine
                  </h3>
                  <p className="mt-3 max-w-[620px] text-[16px] leading-[1.7] text-[#4B4B4B]">
                    By combining Business, Architecture, and Physics, Jataka becomes an omniscient Chief Architect that sits between your developers and your live business, preventing human error.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-[16px] md:grid-cols-3">
                <div className="flex h-full flex-col rounded-[12px] border border-[#1A1A1A]/8 bg-white p-[22px]">
                  <div className="mb-[14px] inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-[#155EEF]/10 text-[#155EEF]">
                    <JiraLogo className="h-5 w-5" />
                  </div>
                  <p className="mb-[6px] font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#FF2424]">
                    Business Context
                  </p>
                  <h4 className="mb-[10px] font-archivo text-[16px] uppercase leading-[1.25] tracking-[-0.3px] text-[#1A1A1A]">
                    Business Intent &amp; Process Logic
                  </h4>
                  <p className="text-[13.5px] leading-[1.65] text-[#444]">
                    Jataka reads your Jira acceptance criteria and catches process-rule violations before deploy.
                  </p>
                </div>

                <div className="flex h-full flex-col rounded-[12px] border border-[#1A1A1A]/8 bg-white p-[22px]">
                  <div className="mb-[14px] inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-[#1A1A1A]/6 text-[#1A1A1A]">
                    <GithubLogo className="h-5 w-5" />
                  </div>
                  <p className="mb-[6px] font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#FF2424]">
                    Architectural Context
                  </p>
                  <h4 className="mb-[10px] font-archivo text-[16px] uppercase leading-[1.25] tracking-[-0.3px] text-[#1A1A1A]">
                    The Blast Radius Map
                  </h4>
                  <p className="text-[13.5px] leading-[1.65] text-[#444]">
                    Jataka maps dependencies across the codebase and flags every downstream system a change could break.
                  </p>
                </div>

                <div className="flex h-full flex-col rounded-[12px] border border-[#1A1A1A]/8 bg-white p-[22px]">
                  <div className="mb-[14px] inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-[#00A1E0]/10 text-[#00A1E0]">
                    <SalesforceLogo className="h-5 w-5" />
                  </div>
                  <p className="mb-[6px] font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#FF2424]">
                    Runtime Context
                  </p>
                  <h4 className="mb-[10px] font-archivo text-[16px] uppercase leading-[1.25] tracking-[-0.3px] text-[#1A1A1A]">
                    The Physics of Scale
                  </h4>
                  <p className="text-[13.5px] leading-[1.65] text-[#444]">
                    We simulate production data shape and Black Friday volumes before merge so the architecture holds at peak load.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1040px]">
          <div className="rounded-[34px] border border-[#FF2424]/15 bg-[#121212] p-8 text-white shadow-[0_30px_90px_rgba(255,36,36,0.12)] md:p-12">
            <Eyebrow>What It Unlocks</Eyebrow>
            <h2 className="mt-6 max-w-[860px] font-archivo text-[clamp(32px,4.4vw,58px)] leading-[1.02] tracking-[-1.6px] uppercase">
              Because we have solved the Context Problem at the foundational level, we have unlocked <span className="text-[#FF2424]">superhuman capabilities</span> for the enterprise.
            </h2>

            <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-archivo text-[clamp(26px,3vw,40px)] uppercase leading-[1] tracking-[-1px]">
                  See the Applications Powered by the Context Engine
                </div>
              </div>
              <Link
                href="/insider/data-room-bot/applications"
                className="inline-flex items-center gap-3 rounded-full bg-[#FF2424] px-6 py-3 font-archivo text-[15px] uppercase tracking-[0.4px] text-white transition hover:bg-[#e61f1f]"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
