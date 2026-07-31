"use client";

import { FadeIn } from "./FadeIn";
import { RevealHeading } from "./RevealHeading";

export default function HomeFeatures() {
  return (
    <section id="features" className="relative overflow-hidden bg-[var(--home-bg)]">
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 pt-20 pb-8 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[760px] text-center">
          <FadeIn>
            <p className="mb-4 text-[12px] font-semibold tracking-[0.18em] text-[var(--home-accent)] uppercase">
              Core Capabilities
            </p>
          </FadeIn>
          <RevealHeading
            as="h2"
            align="center"
            className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--home-ink)]"
            lines={[
              { content: "The First Autonomous" },
              { content: "Runtime Governance Engine" },
              { content: "for Salesforce." },
            ]}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] space-y-5 px-6 pb-24 md:px-10">
        <FadeIn className="mt-8 grid grid-cols-1 overflow-hidden rounded-[22px] border border-[var(--home-border)] bg-white shadow-[0_16px_50px_rgba(17,17,17,0.05)] lg:grid-cols-2">
          <div className="p-8 md:p-11">
            <div className="mb-5 inline-block rounded-full bg-[var(--home-accent-soft)] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[var(--home-accent)] uppercase">
              The Wedge
            </div>
            <h3 className="font-semibold tracking-tight mb-4 text-[24px] leading-[1.1] text-[var(--home-ink)] uppercase">
              Automated Governor
              <br />
              Limit Profiling
            </h3>
            <p className="text-[14.5px] leading-[1.75] text-[var(--home-muted)]">
              We don&apos;t just test the frontend illusion; we test the backend truth. When a
              developer opens a PR, Jataka executes the business process in an isolated Sandbox. We
              dynamically pull the Tooling API to measure the exact Governor Limits consumed.
              <strong className="font-semibold text-[var(--home-ink)]">
                {" "}
                If a PR hits 90% of your SOQL limits, we block the deployment.
              </strong>
            </p>
            <p className="mt-5 text-[12px] font-semibold tracking-[0.12em] text-[var(--home-accent)] uppercase">
              Before it hits production
            </p>
          </div>
          <div className="bg-[#0D1117] p-5 md:p-6">
            <div className="overflow-hidden rounded-[14px] border border-[#30363D]">
              <div className="flex items-center gap-2 border-b border-[#30363D] bg-[#161B22] px-3 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                <span className="ml-2 text-[11px] text-white/55">
                  jataka-bot / PR #247 , feature/convert-lead-flow
                </span>
              </div>
              <div className="p-4">
                <div className="mb-3 flex items-start gap-2.5 rounded-[10px] border border-[rgba(255,36,36,0.35)] bg-[rgba(255,36,36,0.12)] p-3">
                  <div className="shrink-0 text-[17px] text-[var(--home-accent)]">❌</div>
                  <div className="flex-1">
                    <div className="mb-1 text-[12.5px] font-bold text-white">
                      Jataka Quality Gate , BLOCKED
                    </div>
                    <div className="text-[11.5px] text-white/60">
                      UI Test: ✅ PASSED | Runtime Governance: ❌ FAILED
                    </div>
                    <div className="mt-3">
                      <div className="mb-1 flex justify-between text-[10.5px] text-white/60">
                        <span>SOQL Query Limit</span>
                        <span className="font-bold text-[var(--home-accent)]">96 / 100 (96%)</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[#333]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#FF8800] to-[#2563EB]"
                          style={{ width: "96%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-[10px] border border-[#30363D] bg-[#161B22] p-3 font-mono text-[10.5px] leading-relaxed text-white/60">
                  ❌ <strong className="text-white">Blocked:</strong> UI Test Passed, but execution
                  consumed <strong className="text-[var(--home-accent)]">96/100 SOQL queries</strong>.
                  <br />
                  Root cause: N+1 loop in{" "}
                  <code className="rounded bg-[rgba(126,231,135,0.12)] px-1 text-[#7EE787]">
                    LeadConversionService.cls
                  </code>{" "}
                  line 84.
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FadeIn delay={0.05} className="rounded-[20px] border border-[var(--home-border)] bg-white p-8 md:p-10">
            <h3 className="font-semibold tracking-tight mb-4 text-[21px] leading-[1.1] text-[var(--home-ink)] uppercase">
              AI-Powered Root
              <br />
              Cause Analysis
            </h3>
            <p className="text-[14.5px] leading-[1.75] text-[var(--home-muted)]">
              Reading a 20MB Apex Debug Log is a nightmare. Jataka&apos;s AI does it in milliseconds.
              If a limit is breached, our AI{" "}
              <strong className="font-semibold text-[var(--home-ink)]">
                pinpoints the exact line causing the N+1 loop
              </strong>
              , explains the trigger chain, and posts the bulkified code fix directly as a comment on
              the GitHub PR.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="rounded-[20px] border border-[var(--home-border)] bg-[var(--home-soft)] p-8 md:p-10">
            <h3 className="font-semibold tracking-tight mb-4 text-[21px] leading-[1.1] text-[var(--home-ink)] uppercase">
              Hybrid SOQL
              <br />
              Assertions
            </h3>
            <p className="text-[14.5px] leading-[1.75] text-[var(--home-muted)]">
              We don&apos;t trust the UI. After Jataka clicks &quot;Convert Lead&quot; on the screen,
              our engine automatically executes a REST SOQL query to verify that
              <strong className="font-semibold text-[var(--home-ink)]">
                {" "}
                asynchronous @future methods and background jobs
              </strong>{" "}
              actually updated the database correctly.
            </p>
          </FadeIn>
        </div>

        {[
          {
            title: (
              <>
                Zero-Maintenance
                <br />
                Contextual Testing
              </>
            ),
            body: (
              <>
                Stop writing brittle test scripts. Connect Jataka to your Org and we ingest your
                entire schema into our{" "}
                <strong className="font-semibold text-[var(--home-ink)]">Knowledge Graph Database</strong>.
                When a Jira ticket is opened, Jataka understands the blast radius and autonomously
                generates robust JSON test suites that
                <strong className="font-semibold text-[var(--home-ink)]">
                  {" "}
                  self-heal when admins change page layouts.
                </strong>
              </>
            ),
            panel: (
              <>
                Salesforce architecture is a black box.
                <br />
                <br />
                <span className="font-semibold tracking-tight text-[18px] text-[var(--home-accent)] uppercase">
                  WE DECODED IT.
                  <br />
                  WE PROTECT IT.
                </span>
              </>
            ),
          },
          {
            title: (
              <>
                Active Tech-Debt
                <br />
                & Org Bloat Prevention
              </>
            ),
            body: (
              <>
                Stop hitting the 500-field limit. Before a developer merges a redundant custom field
                (like Invoice_Sum__c when Total_Amount__c already exists), Jataka&apos;s
                <strong className="font-semibold text-[var(--home-ink)]"> Knowledge Graph</strong> flags
                the duplication and blocks the PR. It enforces Flow-vs-Apex rules, identifies Orphan
                Nodes, and autonomously generates the exact{" "}
                <strong className="font-semibold text-[var(--home-ink)]">destructiveChanges.xml</strong>{" "}
                files to safely delete 10 years of legacy code.
              </>
            ),
            panel: (
              <>
                10 years of legacy code.
                <br />
                <br />
                <span className="font-semibold tracking-tight text-[18px] text-[var(--home-accent)] uppercase">
                  CLEANED IN 10 MINUTES.
                </span>
              </>
            ),
          },
        ].map((block, i) => (
          <FadeIn
            key={i}
            className="grid grid-cols-1 overflow-hidden rounded-[22px] border border-[var(--home-border)] lg:grid-cols-2"
          >
            <div className="bg-white p-8 md:p-11">
              <h3 className="font-semibold tracking-tight mb-4 text-[21px] leading-[1.1] text-[var(--home-ink)] uppercase">
                {block.title}
              </h3>
              <p className="text-[14.5px] leading-[1.75] text-[var(--home-muted)]">{block.body}</p>
            </div>
            <div className="flex items-center justify-center bg-[var(--home-ink)] p-10 text-center md:p-12">
              <p className="text-[15px] leading-[1.8] text-white/60">{block.panel}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
