"use client";

import { FadeIn } from "./FadeIn";
import { RevealHeading } from "./RevealHeading";

const steps = [
  {
    n: "01",
    tag: "Step 1",
    title: "Intent (Jira)",
    color: "#2563EB",
    body: "Jataka reads the Jira ticket and updates the Knowledge graph with the business intent. Your feature requirements become structured context.",
  },
  {
    n: "02",
    tag: "Step 2",
    title: "Code (Cursor)",
    color: "#FF6B35",
    body: "Through our MCP, your developer asks Cursor how to build the feature. Jataka feeds Cursor the exact blast radius and safe code patterns.",
  },
  {
    n: "03",
    tag: "Step 3",
    title: "Verify (GitHub)",
    color: "#FFB800",
    body: "The developer opens a PR. Jataka's API Firewall and Kamikaze Pods test the limits and the UI automatically.",
  },
  {
    n: "04",
    tag: "Step 4",
    title: "Resolve (Jira)",
    color: "#22c55e",
    body: 'If limits breach, Jataka sends feedback back to Cursor. If it passes, Jataka updates the Jira ticket to "Ready for Deployment" with attached video proof.',
  },
];

export default function HomeSdlc() {
  return (
    <section id="sdlc" className="relative overflow-hidden bg-[var(--home-soft)]">
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <FadeIn>
            <p className="mb-4 text-[12px] font-semibold tracking-[0.18em] text-[var(--home-accent)] uppercase">
              Highest-Value IP
            </p>
          </FadeIn>
          <RevealHeading
            as="h2"
            align="center"
            className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--home-ink)]"
            lines={[{ content: "The Autonomous SDLC." }]}
          />
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-5 max-w-[520px] text-[17px] text-[var(--home-muted)]">
              Jataka doesn&apos;t just wait for pull requests. It manages the entire lifecycle.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn
              key={step.n}
              delay={i * 0.05}
              className="overflow-hidden rounded-[18px] border border-[var(--home-border)] bg-white"
            >
              <div className="h-1.5 w-full" style={{ background: step.color }} />
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-semibold tracking-tight text-[14px]" style={{ color: step.color }}>
                    {step.n}
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-[var(--home-faint)] uppercase">
                    {step.tag}
                  </span>
                </div>
                <h3 className="font-semibold tracking-tight mb-2 text-[15px] text-[var(--home-ink)] uppercase">
                  {step.title}
                </h3>
                <p className="text-[13px] leading-[1.65] text-[var(--home-muted)]">{step.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn
          delay={0.1}
          className="mt-4 grid grid-cols-1 gap-8 rounded-[22px] bg-[var(--home-ink)] p-9 md:p-11 lg:grid-cols-2"
        >
          <div>
            <h3 className="font-semibold tracking-tight mb-4 text-[22px] tracking-[-0.03em] text-white uppercase">
              The Result
            </h3>
            <p className="text-[14px] leading-[1.7] text-white/55">
              Your developers stay in their IDE. Jataka handles the{" "}
              <strong className="font-semibold text-white">orchestration</strong>, the{" "}
              <strong className="font-semibold text-white">testing</strong>, and the{" "}
              <strong className="font-semibold text-white">ticket management</strong>. This closed loop
              , Jira to Cursor to GitHub to Jataka back to Jira , is your highest-value intellectual
              property. You aren&apos;t just catching limits; you are automating the entire Software
              Development Life Cycle.
            </p>
            <a
              href="/use-cases/autonomous-sdlc"
              className="font-semibold tracking-tight mt-6 inline-flex items-center gap-2 text-[12px] tracking-[1.5px] text-[var(--home-accent)] uppercase transition-colors hover:text-[#60A5FA]"
              target="_blank"
              rel="noopener noreferrer"
            >
              See Full Use Case →
            </a>
          </div>
          <div className="flex flex-col justify-center rounded-[16px] bg-white/5 p-6">
            <div className="mb-5 flex items-center justify-between text-[11px] tracking-[0.1em] text-white/35 uppercase">
              <span>Closed Loop</span>
              <span className="text-[#22c55e]">● Active</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-white sm:gap-4">
              {[
                { n: "01", label: "Jira", c: "#2563EB" },
                { n: "02", label: "Cursor", c: "#FF6B35" },
                { n: "03", label: "GitHub", c: "#FFB800" },
                { n: "J", label: "Jataka", c: "#2563EB" },
              ].map((node, i, arr) => (
                <div key={node.label} className="contents">
                  <div className="text-center">
                    <div
                      className="mx-auto mb-1.5 flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ background: `${node.c}22`, border: `1px solid ${node.c}55` }}
                    >
                      <span className="font-semibold tracking-tight text-[12px] font-bold" style={{ color: node.c }}>
                        {node.n}
                      </span>
                    </div>
                    <span className="text-[9px] tracking-[0.5px] uppercase">{node.label}</span>
                  </div>
                  {i < arr.length - 1 && <span className="text-[var(--home-accent)]">→</span>}
                </div>
              ))}
              <span className="text-[#22c55e]">↩</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
