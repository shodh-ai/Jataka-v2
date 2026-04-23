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

function ProblemFlowDiagram() {
  const outcomes = [
    { label: "Silent Breakage", title: "SAP Billing Integration Fails" },
    { label: "Silent Breakage", title: "Marketing Flow Breaks" },
    { label: "Silent Breakage", title: "VP Dashboard Corrupts" },
    { label: "Business Stops", title: "Revenue Impact", critical: true },
  ];

  return (
    <div className="overflow-hidden rounded-[32px] border border-[#1A1A1A]/10 bg-[linear-gradient(180deg,#fff_0%,#fff7f5_100%)] p-5 shadow-[0_28px_70px_rgba(255,36,36,0.08)] md:p-8">
      <div className="relative h-full rounded-[24px] border border-[#1A1A1A]/8 bg-[radial-gradient(circle_at_center,_rgba(255,36,36,0.1),_transparent_62%),linear-gradient(180deg,#fff_0%,#fffaf8_100%)] px-4 py-6 md:px-8 md:py-8">
        <div className="absolute inset-x-0 bottom-0 mx-auto h-24 w-40 rounded-full bg-[#FF2424]/10 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-[280px] items-center justify-center rounded-[18px] bg-[#1A1A1A] px-5 py-4 text-center text-white shadow-[0_18px_40px_rgba(26,26,26,0.2)]">
          <div>
            <div className="font-archivo text-[16px] uppercase leading-[1.05] tracking-[-0.4px] md:text-[17px]">Developer or AI Agent</div>
            <div className="mt-2 text-[11px] leading-[1.45] text-white/72 md:text-[12px]">Changes Lead Status Dropdown</div>
          </div>
        </div>

        <div className="relative mx-auto flex h-14 w-10 items-center justify-center">
          <div className="h-full w-px bg-gradient-to-b from-[#1A1A1A] via-[#5E5E5E] to-[#FF2424]" />
          <div className="absolute bottom-[5px] h-0 w-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#FF2424]" />
        </div>

        <div className="relative mx-auto flex h-[188px] w-[188px] items-center justify-center rotate-45 rounded-[32px] border border-white/25 bg-[#FF2424] shadow-[0_26px_50px_rgba(255,36,36,0.32)] md:h-[196px] md:w-[196px]">
          <div className="absolute inset-[14px] rounded-[24px] border border-white/20" />
          <div className="-rotate-45 px-5 text-center text-white">
            <div className="font-archivo text-[21px] uppercase leading-[0.96] tracking-[-0.6px] md:text-[24px]">Builds in Vacuum</div>
            <div className="mt-2 text-[11px] font-medium uppercase tracking-[1.3px] text-white/80 md:text-[12px]">No Enterprise Context</div>
          </div>
        </div>

        <div className="relative mx-auto mt-8 hidden h-[86px] w-full max-w-[620px] lg:block">
          <div className="absolute left-1/2 top-0 h-[18px] w-px -translate-x-1/2 bg-[#1A1A1A]/45" />
          <div className="absolute left-[12%] top-[34px] h-px w-[38%] origin-right rotate-[-18deg] bg-gradient-to-r from-[#FF2424]/0 via-[#1A1A1A]/45 to-[#1A1A1A]/45" />
          <div className="absolute left-[29%] top-[24px] h-px w-[22%] origin-right rotate-[-39deg] bg-gradient-to-r from-[#FF2424]/0 via-[#1A1A1A]/45 to-[#1A1A1A]/45" />
          <div className="absolute right-[29%] top-[24px] h-px w-[22%] origin-left rotate-[39deg] bg-gradient-to-l from-[#FF2424]/0 via-[#1A1A1A]/45 to-[#1A1A1A]/45" />
          <div className="absolute right-[12%] top-[34px] h-px w-[38%] origin-left rotate-[18deg] bg-gradient-to-l from-[#FF2424]/0 via-[#1A1A1A]/45 to-[#1A1A1A]/45" />
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4">
          {outcomes.map((outcome) => (
            <div
              key={outcome.title}
              className={outcome.critical
                ? "flex flex-col overflow-hidden rounded-[20px] border border-[#FF2424] bg-[#FF2424] px-3 py-4 text-center text-white shadow-[0_14px_34px_rgba(255,36,36,0.24)] md:px-4"
                : "flex flex-col overflow-hidden rounded-[20px] border border-[#FF2424]/18 bg-white/95 px-3 py-4 text-center shadow-[0_12px_30px_rgba(26,26,26,0.05)] backdrop-blur md:px-4"
              }
            >
              <div className={outcome.critical ? "font-mono text-[9px] uppercase tracking-[1.4px] text-white/75" : "font-mono text-[9px] uppercase tracking-[1.4px] text-[#FF2424]"}>
                {outcome.label}
              </div>
              <div className={outcome.critical ? "mt-2 break-words font-archivo text-[12px] uppercase leading-[1.15] tracking-[-0.2px] md:text-[13px]" : "mt-2 break-words font-archivo text-[12px] uppercase leading-[1.15] tracking-[-0.2px] text-[#1A1A1A] md:text-[13px]"}>
                {outcome.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
            href="/insider/dataroom-botcon"
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
                  AI and offshore teams can ship faster than ever, but without enterprise context they are still building blindfolded.
                </p>
                <ul className="list-inside list-disc space-y-2 marker:text-[#FF2424]">
                  <li>Small code changes can silently break ERP workflows, billing, and downstream integrations.</li>
                  <li>Code that works on 10 records can fail catastrophically at 150,000 records under real production load.</li>
                  <li>Clients lose revenue, GCCs absorb SLA penalties, and senior architects become the manual safety net.</li>
                  <li>AI and junior developers move fast, but without tribal knowledge they generate risk at scale.</li>
                </ul>
                <p className="font-semibold text-[#1A1A1A]">
                  Speed without context turns otherwise correct code into multi-million-dollar outages.
                </p>
              </div>
            </div>

            <ProblemFlowDiagram />
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
          <div className="mt-20 rounded-[36px] border border-[#1A1A1A]/8 bg-[linear-gradient(180deg,#fff_0%,#fffaf6_100%)] p-6 shadow-[0_30px_80px_rgba(26,26,26,0.06)] md:p-8 xl:p-10">
            <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start xl:gap-10">
              <div className="flex flex-col justify-center gap-5 xl:pt-6">
                <div className="group relative grid min-h-[116px] grid-cols-[72px_1fr_30px] items-center gap-4 rounded-[22px] border border-[#155EEF]/18 bg-white px-5 py-5 shadow-[0_12px_34px_rgba(21,94,239,0.08)] transition hover:-translate-y-0.5">
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#155EEF]/10 text-[#155EEF]">
                    <JiraLogo className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="font-archivo text-[18px] uppercase leading-tight tracking-[-0.4px] text-[#1A1A1A]">Jira feeds</div>
                    <div className="mt-1 text-[14px] text-[#666]">Business Intent (The "Why")</div>
                  </div>
                  <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#FF2424]/10 text-[#FF2424] xl:flex">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>

                <div className="group relative grid min-h-[116px] grid-cols-[72px_1fr_30px] items-center gap-4 rounded-[22px] border border-[#1A1A1A]/12 bg-white px-5 py-5 shadow-[0_12px_34px_rgba(26,26,26,0.05)] transition hover:-translate-y-0.5">
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#1A1A1A]/5 text-[#1A1A1A]">
                    <GithubLogo className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="font-archivo text-[18px] uppercase leading-tight tracking-[-0.4px] text-[#1A1A1A]">GitHub feeds</div>
                    <div className="mt-1 text-[14px] text-[#666]">Architecture Map (The "Where")</div>
                  </div>
                  <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#FF2424]/10 text-[#FF2424] xl:flex">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>

                <div className="group relative grid min-h-[116px] grid-cols-[72px_1fr_30px] items-center gap-4 rounded-[22px] border border-[#00A1E0]/18 bg-white px-5 py-5 shadow-[0_12px_34px_rgba(0,161,224,0.08)] transition hover:-translate-y-0.5">
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#00A1E0]/10 text-[#00A1E0]">
                    <SalesforceLogo className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="font-archivo text-[18px] uppercase leading-tight tracking-[-0.4px] text-[#1A1A1A]">Salesforce feeds</div>
                    <div className="mt-1 text-[14px] text-[#666]">Live Physics (The "Scale")</div>
                  </div>
                  <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#FF2424]/10 text-[#FF2424] xl:flex">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex justify-center xl:hidden">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF2424]/10 text-[#FF2424]">
                    <ArrowDown className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-0 top-[86px] hidden h-px w-10 bg-gradient-to-r from-[#FF2424]/0 to-[#FF2424]/35 xl:block" />
                <div className="rounded-[30px] border border-[#1A1A1A]/8 bg-[radial-gradient(circle_at_top,_rgba(255,36,36,0.12),_transparent_38%),linear-gradient(180deg,#ffffff_0%,#fff8f5_100%)] p-6 shadow-[0_22px_70px_rgba(255,36,36,0.08)] md:p-8">
                  <div className="flex flex-col gap-6 border-b border-[#1A1A1A]/8 pb-8 md:flex-row md:items-start">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[18px] bg-[#FF2424]/12 text-[#FF2424] shadow-[0_14px_30px_rgba(255,36,36,0.14)]">
                      <Zap className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-[2.4px] text-[#FF2424]">The Jataka Core</div>
                      <h3 className="mt-3 font-archivo text-[clamp(28px,3.5vw,44px)] leading-[0.96] tracking-[-1.2px] uppercase text-[#1A1A1A]">
                        The Jataka <br className="hidden sm:block" />Context Engine
                      </h3>
                      <p className="mt-4 max-w-[620px] text-[16px] leading-[1.72] text-[#4B4B4B]">
                        By combining Business, Architecture, and Physics, Jataka becomes an omniscient Chief Architect that sits between your developers and your live business, preventing human error.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="flex h-full flex-col rounded-[22px] border border-[#155EEF]/14 bg-white p-5 shadow-[0_12px_34px_rgba(21,94,239,0.06)]">
                      <div className="mb-4 inline-flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#155EEF]/10 text-[#155EEF]">
                        <JiraLogo className="h-5 w-5" />
                      </div>
                      <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#FF2424]">
                        Business Context
                      </p>
                      <h4 className="mb-3 font-archivo text-[20px] uppercase leading-[1.05] tracking-[-0.5px] text-[#1A1A1A]">
                        Business Intent &amp; Process Logic
                      </h4>
                      <div className="mt-5 rounded-[16px] bg-[#155EEF]/5 px-4 py-4">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#155EEF]">Contains</div>
                        <div className="mt-3 space-y-2 text-[13px] leading-[1.55] text-[#2B2B2B]">
                          <div>✓ Approval Workflows (e.g., VP Discount limits)</div>
                          <div>✓ Compliance Rules (e.g., SOX/GDPR routing)</div>
                          <div>✓ Feature Acceptance Criteria</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-full flex-col rounded-[22px] border border-[#1A1A1A]/10 bg-white p-5 shadow-[0_12px_34px_rgba(26,26,26,0.05)]">
                      <div className="mb-4 inline-flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#1A1A1A]/6 text-[#1A1A1A]">
                        <GithubLogo className="h-5 w-5" />
                      </div>
                      <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#FF2424]">
                        Architectural Context
                      </p>
                      <h4 className="mb-3 font-archivo text-[20px] uppercase leading-[1.05] tracking-[-0.5px] text-[#1A1A1A]">
                        The Blast Radius Map
                      </h4>
                      <div className="mt-5 rounded-[16px] bg-[#1A1A1A]/4 px-4 py-4">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#1A1A1A]">Contains</div>
                        <div className="mt-3 space-y-2 text-[13px] leading-[1.55] text-[#2B2B2B]">
                          <div>✓ External Integrations (e.g., SAP, MuleSoft)</div>
                          <div>✓ Hidden Dependencies (e.g., Forgotten Flows)</div>
                          <div>✓ Legacy Tech Debt</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-full flex-col rounded-[22px] border border-[#00A1E0]/14 bg-white p-5 shadow-[0_12px_34px_rgba(0,161,224,0.06)]">
                      <div className="mb-4 inline-flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#00A1E0]/10 text-[#00A1E0]">
                        <SalesforceLogo className="h-5 w-5" />
                      </div>
                      <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#FF2424]">
                        Runtime Context
                      </p>
                      <h4 className="mb-3 font-archivo text-[20px] uppercase leading-[1.05] tracking-[-0.5px] text-[#1A1A1A]">
                        The Physics of Scale
                      </h4>
                      <div className="mt-5 rounded-[16px] bg-[#00A1E0]/6 px-4 py-4">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-[#0078A7]">Contains</div>
                        <div className="mt-3 space-y-2 text-[13px] leading-[1.55] text-[#2B2B2B]">
                          <div>✓ Peak Data Volumes (e.g., 150k record skews)</div>
                          <div>✓ Hard Governor Limits (e.g., CPU/SOQL caps)</div>
                          <div>✓ Database Row-Locks</div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                href="/insider/dataroom-botcon/applications"
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
