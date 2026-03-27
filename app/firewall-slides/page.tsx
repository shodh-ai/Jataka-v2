"use client";

import { useState } from "react";
import Link from "next/link";

const LOOM_EMBED_URL = "https://www.loom.com/embed/REPLACE_WITH_APEX_RECIPES_VIDEO_ID";

const glassCard =
  "rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] backdrop-blur-[14px]";

export default function FirewallSlidesPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] px-6 pb-20 pt-24 text-[#EAEFF8] md:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(90,120,255,0.14),transparent_42%),radial-gradient(circle_at_78%_34%,rgba(0,184,255,0.1),transparent_46%),radial-gradient(circle_at_52%_78%,rgba(255,95,122,0.08),transparent_42%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10">
          <header className={`flex flex-wrap items-center justify-between gap-4 px-5 py-4 ${glassCard}`}>
            <Link
              href="/"
              className="text-sm font-medium text-[#AAB8CF] transition-colors hover:text-[#EAF2FF]"
            >
              Back to Home
            </Link>
            <Link
              href="/book-pilot"
              className="rounded-xl border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.04)] px-5 py-2 text-sm font-medium text-[#EAF2FF] transition hover:bg-[rgba(255,255,255,0.08)]"
            >
              Book Pilot
            </Link>
          </header>

          <section className={`px-6 py-16 text-center md:px-10 md:py-20 ${glassCard}`}>
            <h1 className="text-[clamp(44px,7vw,92px)] font-semibold leading-[0.95] tracking-[-0.03em]">
              Jataka
            </h1>
            <h2 className="mt-4 text-[clamp(20px,3vw,36px)] font-medium tracking-[-0.02em] text-[#C9D7EE]">
              The Pre-Production Runtime Firewall for Salesforce
            </h2>
            <h3 className="mt-7 text-[clamp(18px,2.6vw,30px)] font-normal tracking-[-0.01em] text-[#DDE8FB]">
              Stop deploying 101 SOQL crashes.
            </h3>
          </section>

          <section className={`grid items-center gap-8 px-6 py-8 md:grid-cols-2 md:px-8 md:py-10 ${glassCard}`}>
            <div className="space-y-5">
              <h2 className="text-[13px] font-medium tracking-[0.02em] text-[#8EA8CF]">Section 2 · The Problem</h2>
              <h3 className="text-[clamp(30px,4vw,54px)] font-semibold leading-[1] tracking-[-0.03em]">
                75% Code Coverage is a Vanity Metric
              </h3>
              <ul className="space-y-3 text-[15px] leading-[1.65] text-[#B8C7DE]">
                <li>Static scanners (PMD, Copado) read text and miss runtime loops.</li>
                <li>Triggers + Flows + Managed Packages can fail only when composed under data load.</li>
                <li>Code passes QA, then breaches 101 SOQL or CPU at production volume.</li>
                <li>Result: weekend rollbacks, margin loss, and Sev-1 outages.</li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)]">
              <img
                src="/firewall-soql-log.svg"
                alt="Salesforce System LimitException 101 SOQL error log"
                className="h-full w-full object-cover"
              />
            </div>
          </section>

          <section className={`grid items-center gap-8 px-6 py-8 md:grid-cols-2 md:px-8 md:py-10 ${glassCard}`}>
            <div className="overflow-hidden rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)]">
              <img
                src="/firewall-pipeline-diagram.svg"
                alt="GitHub to Kamikaze pod to Salesforce Tooling API flow"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-5">
              <h2 className="text-[13px] font-medium tracking-[0.02em] text-[#8EA8CF]">Section 3 · The Firewall</h2>
              <h3 className="text-[clamp(30px,4vw,54px)] font-semibold leading-[1] tracking-[-0.03em]">We test execution, not just syntax</h3>
              <ul className="space-y-3 text-[15px] leading-[1.65] text-[#B8C7DE]">
                <li>Spin Up: PR opens and Jataka launches an isolated Kubernetes pod.</li>
                <li>Execute: The transaction runs inside staging sandbox.</li>
                <li>Profile: Tooling API telemetry is pulled in real time.</li>
                <li>Block: At 90% limit usage (SOQL, DML, CPU), merge is blocked.</li>
              </ul>
            </div>
          </section>

          <section className={`grid items-center gap-8 px-6 py-8 md:grid-cols-2 md:px-8 md:py-10 ${glassCard}`}>
            <div className="space-y-5">
              <h2 className="text-[13px] font-medium tracking-[0.02em] text-[#8EA8CF]">Section 4 · The Proof</h2>
              <h3 className="text-[clamp(30px,4vw,54px)] font-semibold leading-[1] tracking-[-0.03em]">Mathematical Guardrails. Zero Snake Oil.</h3>
              <ul className="space-y-3 text-[15px] leading-[1.65] text-[#B8C7DE]">
                <li>No admin rights required: advisory mode via GitHub comments.</li>
                <li>AI reads debug logs and pinpoints the exact limit-spiking line.</li>
                <li>PR receives a red runtime report card before production risk appears.</li>
              </ul>
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-[#E6405E] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#f05672]"
              >
                Watch the 60-Second Live Demo
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)]">
              <img
                src="/firewall-report-card.svg"
                alt="Jataka GitHub PR comment showing SOQL limit score at 98 out of 100"
                className="h-full w-full object-cover"
              />
            </div>
          </section>

          <section className={`px-6 py-16 text-center md:px-10 md:py-20 ${glassCard}`}>
            <h2 className="text-[13px] font-medium tracking-[0.02em] text-[#8EA8CF]">Section 5 · The Ask</h2>
            <h3 className="mt-4 text-[clamp(30px,4vw,56px)] font-semibold leading-[1.02] tracking-[-0.03em]">
              The 14-Day Staging Pilot
            </h3>
            <ul className="mx-auto mt-7 max-w-3xl space-y-3 text-[15px] leading-[1.7] text-[#B8C7DE]">
              <li>Protect margins and clients from limit-based deployment failures.</li>
              <li>Increase offshore developer velocity with the Cursor and VS Code plugin.</li>
              <li>Grant read-only lower-sandbox access for a 14-day silent runtime pilot.</li>
            </ul>
            <Link
              href="/book-pilot"
              className="mx-auto mt-10 inline-flex items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.2)] bg-[linear-gradient(135deg,#f4f7ff_0%,#dbe6ff_100%)] px-10 py-4 text-[13px] font-semibold text-[#0A1220] transition hover:scale-[1.02]"
            >
              Book Your 14-Day Staging Pilot
            </Link>
          </section>
        </div>
      </main>

      {isVideoOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-[rgba(5,7,12,0.78)] px-4 backdrop-blur-sm">
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.14)] bg-[#0D1118] shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-5 py-3">
              <h3 className="text-sm font-medium text-[#C5D3EA]">Apex-Recipes Runtime Block Demo</h3>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="rounded-lg border border-[rgba(255,255,255,0.18)] px-3 py-1 text-xs text-[#D8E3F4]"
              >
                Close
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src={LOOM_EMBED_URL}
                title="Jataka runtime firewall Loom demo"
                className="h-full w-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
