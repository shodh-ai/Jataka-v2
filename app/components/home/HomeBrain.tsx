"use client";

import { FadeIn } from "./FadeIn";
import { RevealHeading } from "./RevealHeading";

export default function HomeBrain() {
  return (
    <section id="brain" className="relative overflow-hidden bg-[var(--home-bg)]">
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto mb-12 max-w-[720px] text-center">
          <FadeIn>
            <p className="mb-4 text-[12px] font-semibold tracking-[0.18em] text-[var(--home-accent)] uppercase">
              Developer Tools
            </p>
          </FadeIn>
          <RevealHeading
            as="h2"
            align="center"
            className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--home-ink)]"
            lines={[
              { content: "The Ultimate Salesforce" },
              { content: "Co-Pilot for Your IDE" },
              { content: "and Slack." },
            ]}
          />
          <FadeIn delay={0.18}>
            <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-[1.7] text-[var(--home-muted)]">
              Because Jataka maps your entire Salesforce architecture into a Graph Database,
              <strong className="font-semibold text-[var(--home-ink)]">
                {" "}
                we know your specific Org better than any generic AI model.
              </strong>
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FadeIn className="rounded-[20px] border border-[var(--home-border)] bg-white p-9 md:p-11">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--home-soft)] text-[20px]">
              ⬡
            </div>
            <h3 className="font-semibold tracking-tight mb-3 text-[19px] text-[var(--home-ink)] uppercase">
              IDE Context (MCP)
            </h3>
            <p className="text-[14.5px] leading-[1.72] text-[var(--home-muted)]">
              Pipe your proprietary Salesforce data model directly into Cursor. Write Apex that
              actually understands your custom objects, field relationships, and validation rules ,
              not generic boilerplate.
            </p>
          </FadeIn>
          <FadeIn delay={0.08} className="rounded-[20px] border border-[var(--home-border)] bg-white p-9 md:p-11">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--home-accent-soft)] text-[20px] text-[var(--home-accent)]">
              ◈
            </div>
            <h3 className="font-semibold tracking-tight mb-3 text-[19px] text-[var(--home-ink)] uppercase">
              Senior Deflection in Slack
            </h3>
            <p className="text-[14.5px] leading-[1.72] text-[var(--home-muted)]">
              Junior developers stuck on an error? They ask the Jataka Slack bot. It analyzes your
              Org&apos;s architecture and historic Jira tickets to give the right answer, protecting
              your Senior Architects&apos; time.
            </p>
          </FadeIn>
        </div>

        <FadeIn
          delay={0.1}
          className="mt-4 grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[22px] bg-[var(--home-ink)] p-9 md:p-12 lg:grid-cols-[1.2fr_1fr]"
        >
          <div>
            <div className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-[var(--home-accent)] uppercase">
              JATAKA IS THE OPERATING SYSTEM
            </div>
            <p className="max-w-[480px] text-[15.5px] leading-[1.65] text-white/60">
              Making enterprises autonomous. The chaos is over. When your entire Salesforce
              architecture lives in a Knowledge Graph, every tool , your IDE, your CI/CD, your Slack
              , gets smarter with every deployment.
            </p>
          </div>
          <div className="lg:text-right">
            <div className="font-semibold tracking-tight text-[clamp(40px,6vw,64px)] leading-[0.9] text-[var(--home-accent)] uppercase">
              JATAKA
              <br />
              ENDS IT
            </div>
            <div className="mt-4 text-[11px] leading-[1.5] font-semibold tracking-[0.12em] text-white/35 uppercase">
              We do not watch the agents.
              <br />
              We command them.
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
