"use client";

import { FadeIn } from "./FadeIn";
import { RevealHeading } from "./RevealHeading";

const steps = [
  {
    n: "01",
    tag: "Trigger",
    title: "Code is Pushed",
    body: "Developer opens a PR in GitHub or initiates a deployment in Copado.",
  },
  {
    n: "02",
    tag: "Intercept",
    title: "Jataka Intercepts",
    body: 'As a native Quality Gate, Jataka triggers an isolated "Kamikaze" Kubernetes Pod to run the test in a Sandbox.',
  },
  {
    n: "03",
    tag: "Profile",
    title: "Runtime Profiling",
    body: "Jataka correlates UI actions with the Salesforce Tooling API to count limits and measure latency.",
  },
  {
    n: "04",
    tag: "Verdict",
    title: "Pass or Block",
    body: "Safe code gets merged. Limit-breaching code gets blocked with an AI-generated fix sent back to the developer.",
  },
];

export default function HomePipeline() {
  return (
    <section id="pipeline" className="relative overflow-hidden bg-[var(--home-soft)]">
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto mb-12 max-w-[680px] text-center">
          <FadeIn>
            <p className="mb-4 text-[12px] font-semibold tracking-[0.18em] text-[var(--home-accent)] uppercase">
              Integration
            </p>
          </FadeIn>
          <RevealHeading
            as="h2"
            align="center"
            className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--home-ink)]"
            lines={[
              { content: "Plugs Directly Into" },
              { content: "Your Existing Pipeline." },
            ]}
          />
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-5 max-w-[520px] text-[17px] text-[var(--home-muted)]">
              No rip-and-replace. Works natively with Copado, Gearset, and GitHub Actions as a Quality
              Gate.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn
              key={step.n}
              delay={i * 0.06}
              className="rounded-[18px] border border-[var(--home-border)] bg-white p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-semibold tracking-tight text-[28px] text-[var(--home-accent)]">{step.n}</span>
                <span className="rounded-full bg-[var(--home-soft)] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[var(--home-muted)] uppercase">
                  {step.tag}
                </span>
              </div>
              <h3 className="font-semibold tracking-tight mb-2 text-[15px] text-[var(--home-ink)] uppercase">
                {step.title}
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-[var(--home-muted)]">{step.body}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
