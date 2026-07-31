"use client";

import { BrainCircuit, GitBranch, AlertTriangle, Shield } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
  FeatureGrid,
} from "../../components/marketing";
import { FadeIn } from "../../components/home/FadeIn";

const EMBED_URL = "https://www.youtube.com/embed/SdXRbVhZMzg";
const OVERVIEW_NOTE =
  "Product overview video. Book a pilot for a live walkthrough of this workflow on your org.";

export default function BlastRadiusPredictionDemo() {
  return (
    <MarketingShell>
      <PageHero
        title="Blast radius"
        italicWord="prediction"
        subtitle="Watch Jataka's Knowledge dependency graph calculate the blast radius of code changes before they're made — with Cursor IDE integration via MCP."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "All demos", href: "/demos" },
        ]}
      />

      <ContentSection title="Watch the" italicWord="demo" align="center">
        <FadeIn>
          <div className="mx-auto aspect-video max-w-[900px] overflow-hidden rounded-[20px] border border-[#111]/08 bg-black shadow-[0_12px_36px_rgba(17,17,17,0.08)]">
            <iframe
              src={EMBED_URL}
              title="Jataka product overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-[13px] leading-relaxed text-[#8A93A3]">
            {OVERVIEW_NOTE}
          </p>
        </FadeIn>
      </ContentSection>

      <ContentSection title="Key" italicWord="takeaways" align="left">
        <FeatureGrid
          features={[
            {
              title: "Real-Time Dependency Graph",
              body: "Jataka maintains a Knowledge graph of your entire Salesforce org's dependencies. Every class, trigger, flow, and integration is mapped and queryable.",
              icon: GitBranch,
            },
            {
              title: "Cursor IDE Integration",
              body: "Ask questions via MCP protocol directly in Cursor. 'If I change this trigger, what breaks?' Get answers before writing a single line of code.",
              icon: BrainCircuit,
            },
            {
              title: "Predictive Impact Analysis",
              body: "Know the blast radius before you change. See every downstream class, flow, and integration that will be affected.",
              icon: AlertTriangle,
            },
            {
              title: "Prevent Cascading Failures",
              body: "Catch cascading deployment failures before they happen. Warn developers of risky changes during planning, not during rollback.",
              icon: Shield,
            },
          ]}
        />
      </ContentSection>

      <PageCta
        title="See it on your"
        italicWord="org"
        subtitle="14-day Shadow Mode. Zero risk. We prove value before you pay."
        secondaryLabel="All demos"
        secondaryHref="/demos"
      />
    </MarketingShell>
  );
}
