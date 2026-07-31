"use client";

import { Zap, Shield, MapPin, Lock } from "lucide-react";
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

export default function CatchingSev1LimitsDemo() {
  return (
    <MarketingShell>
      <PageHero
        title="Catching Sev-1"
        italicWord="limits"
        subtitle="Watch Jataka catch a SOQL query inside a for loop before it causes a production incident — real-time limit profiling during PR review with automatic merge blocking."
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
              title: "Real-time Limit Profiling",
              body: "Jataka profiles Governor Limits during PR review, not after deployment. Every SOQL query, DML statement, and CPU millisecond is measured in a real execution environment.",
              icon: Zap,
            },
            {
              title: "Automatic Merge Blocking",
              body: "When a threshold is breached, the PR is automatically blocked. No manual intervention required. The developer gets immediate feedback with a detailed limit report.",
              icon: Shield,
            },
            {
              title: "Line-by-Line Attribution",
              body: "When we catch a limit breach, we tell you exactly which line of code caused it — so fixes are minutes, not hours of debug-log archaeology.",
              icon: MapPin,
            },
            {
              title: "Measured, Not Guessed",
              body: "Limits come from actual Sandbox execution against Production-like data volumes. If we say 97/100 SOQL, that's a fact — not a static analysis estimate.",
              icon: Lock,
            },
          ]}
        />
      </ContentSection>

      <PageCta
        title="See it on your"
        italicWord="org"
        subtitle="14-day Shadow Mode. Zero risk. We prove value before you pay."
        secondaryLabel="Runtime limit protection"
        secondaryHref="/use-cases/limit-firewall"
      />
    </MarketingShell>
  );
}
