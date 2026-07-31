"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../home/FadeIn";
import { RevealHeading } from "../home/RevealHeading";

const stories = [
  {
    n: "01",
    quote:
      "We had a 101 SOQL limit breach take down our CPQ quoting engine on the last day of the quarter. Since installing Jataka's runtime firewall, we haven't had a single limit-related rollback. It caught 14 potential Sev-1s in our first month.",
    author: "Lead Salesforce Architect",
    company: "Fortune 500 Manufacturing Company",
    situation: "CPQ quoting engine crashed on quarter-end due to SOQL 101",
    impact: "$150K+ in lost deals and 4 hours of downtime",
    result: "Zero limit-related rollbacks since Jataka installation",
    metric: "14 Sev-1s prevented",
  },
  {
    n: "02",
    quote:
      "Our QA team was spending 20 hours a week fixing broken Selenium scripts every time Salesforce updated a Lightning component. Jataka's Vision AI healed 45 broken tests automatically last sprint. It's magic.",
    author: "QA Automation Director",
    company: "Enterprise SaaS Company",
    situation: "20 hours/week on test maintenance after Lightning updates",
    impact: "QA bottleneck slowing release velocity",
    result: "45 broken tests healed automatically",
    metric: "20 hrs/week saved",
  },
  {
    n: "03",
    quote:
      "We deployed a trigger that worked fine in dev but hit CPU timeout in production because of data skew. Jataka caught it in the PR review before it ever touched staging. The blast radius graph showed us exactly which accounts would have been affected.",
    author: "Senior Technical Architect",
    company: "Global Financial Services Firm",
    situation: "CPU timeout risk from data skew in trigger deployment",
    impact: "Would have caused production outage for 50K+ accounts",
    result: "Caught in PR before staging deployment",
    metric: "50K+ accounts protected",
  },
  {
    n: "04",
    quote:
      "Our offshore team was pushing code that passed PMD but crashed in production. Jataka's runtime profiler caught a DML 151 that static analysis completely missed. We've now made Jataka a required check before any merge.",
    author: "VP of Engineering",
    company: "Mid-Market Healthcare Technology",
    situation: "Static analysis passing code that crashed in production",
    impact: "Repeated rollbacks and production incidents",
    result: "Jataka now required before merge",
    metric: "Zero rollbacks in 3 months",
  },
];

export default function CustomersStories() {
  return (
    <section className="relative overflow-hidden bg-[#F3F3F4] px-6 py-16 md:px-10 md:py-24">
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.26]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <RevealHeading
          as="h2"
          align="center"
          className="mx-auto max-w-[640px] text-[clamp(2rem,4.5vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#111]"
          lines={[
            {
              content: (
                <>
                  Customer{" "}
                  <span className="font-instrument font-normal italic text-[#8A93A3]">stories</span>.
                </>
              ),
            },
          ]}
        />

        <div className="mt-14 space-y-6 md:mt-16 md:space-y-8">
          {stories.map((story, i) => (
            <FadeIn key={story.n} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="overflow-hidden rounded-[22px] border border-[#111]/08 bg-white shadow-[0_16px_48px_rgba(17,17,17,0.04)]"
              >
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <span className="font-instrument text-[2rem] leading-none italic text-[#C8CCD4]">
                      {story.n}
                    </span>
                    <span className="rounded-full bg-[#EFF6FF] px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-[#2563EB] uppercase">
                      {story.metric}
                    </span>
                  </div>

                  <p className="max-w-[820px] text-[clamp(1.05rem,2vw,1.25rem)] leading-[1.7] text-[#3A3A42]">
                    <span className="font-instrument text-[1.35em] italic text-[#8A93A3]">“</span>
                    {story.quote}
                    <span className="font-instrument text-[1.35em] italic text-[#8A93A3]">”</span>
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-[11px] font-semibold text-white">
                      {story.author
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#111]">{story.author}</p>
                      <p className="text-[13px] text-[#8A93A3]">{story.company}</p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 border-t border-[#111]/06 pt-6 md:grid-cols-3 md:gap-4">
                    {[
                      { label: "Situation", text: story.situation },
                      { label: "Impact", text: story.impact },
                      { label: "Result", text: story.result },
                    ].map((cell) => (
                      <div
                        key={cell.label}
                        className="rounded-[14px] border border-[#111]/06 bg-[#F8FAFC] p-4"
                      >
                        <p className="text-[10px] font-semibold tracking-[0.16em] text-[#8A93A3] uppercase">
                          {cell.label}
                        </p>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-[#4B4B53]">
                          {cell.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
