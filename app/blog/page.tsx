"use client";

import Link from "next/link";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home";

const posts = [
  {
    href: "/blog/static-analysis-is-dead",
    title: "Static analysis is dead",
    subtitle: "Why text scanners miss runtime Governor Limit failures",
    meta: "12 min read · Engineering",
  },
  {
    href: "/blog/sub-second-profiler-architecture",
    title: "Sub-second profiler architecture",
    subtitle: "How we profile Salesforce transactions without touching production data",
    meta: "15 min read · Architecture",
  },
];

const demos = [
  {
    href: "/demos/catching-sev1-limits",
    title: "Catching Sev-1 Limits Before the Merge",
    body: "SOQL in a loop. Jataka blocks the PR before production feels it.",
  },
  {
    href: "/demos/self-healing-ui-tests",
    title: "Self-Healing UI Tests",
    body: "Salesforce ships a UI change. Vision AI heals the suite automatically.",
  },
  {
    href: "/demos/blast-radius-prediction",
    title: "Blast Radius Prediction",
    body: "See downstream impact before you save the file.",
  },
];

export default function BlogPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Engineering"
        italicWord="blog"
        subtitle="Deep dives on runtime profiling, Salesforce DevSecOps, and the architecture behind Jataka."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "Anti-patterns", href: "/anti-patterns" },
        ]}
      />

      <ContentSection title="Latest" italicWord="posts">
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post, i) => (
            <FadeIn key={post.href} delay={i * 0.06}>
              <Link
                href={post.href}
                className="group flex h-full flex-col rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-colors hover:border-[#111]/2 md:p-7"
              >
                <p className="font-mono text-[11px] tracking-[0.16em] text-[#8A93A3] uppercase">
                  {post.meta}
                </p>
                <h3 className="mt-3 text-[1.25rem] font-semibold tracking-[-0.02em] text-[#111]">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-[1.65] text-[#5F5F66]">
                  {post.subtitle}
                </p>
                <span className="mt-5 text-[13px] font-medium text-[#111] transition-transform group-hover:translate-x-0.5">
                  Read article →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Product"
        italicWord="demos"
        subtitle="Short videos of Jataka catching real failures."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {demos.map((demo, i) => (
            <FadeIn key={demo.href} delay={i * 0.05}>
              <Link
                href={demo.href}
                className="group flex h-full flex-col rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-colors hover:border-[#111]/2"
              >
                <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-[#111]">
                  {demo.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-[1.65] text-[#5F5F66]">{demo.body}</p>
                <span className="mt-4 text-[13px] font-medium text-[#111]">Watch demo →</span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <PageCta
        title="See it on your"
        italicWord="org"
        subtitle="14-day Shadow Mode. Zero risk. We prove value before you pay."
      />
    </MarketingShell>
  );
}
