"use client";

import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
  FeatureGrid,
} from "../components/marketing";
import { FadeIn } from "../components/home/FadeIn";

const EMBED_URL = "https://www.youtube.com/embed/SdXRbVhZMzg";

const pillars = [
  {
    title: "Pre-production runtime firewall",
    body: "Every PR spins an isolated Kamikaze pod against your Sandbox. Limits are profiled from real Debug Logs — not guessed from static text.",
    meta: "CI/CD gate",
  },
  {
    title: "Governor limit certainty",
    body: "SOQL, CPU, heap, and Flow limits measured under production-like volume. Merges that would Sev-1 are blocked before they ship.",
    meta: "Zero rollbacks",
  },
  {
    title: "Architecture-aware context",
    body: "Knowledge graph + MCP feed your IDE the blast radius before code is written — so AI copilots stop inventing dangerous patterns.",
    meta: "Shift-left",
  },
];

export default function FirewallSlidesPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Runtime firewall"
        title="The pre-production"
        italicWord="firewall"
        subtitle="Jataka is the runtime confidence layer for Salesforce CI/CD — execute, profile, and block risky PRs before Production ever sees them."
        ctas={[
          { label: "Book a pilot →", href: "/book-pilot", primary: true },
          { label: "See demos", href: "/demos" },
        ]}
      />

      <ContentSection title="Watch the" italicWord="overview" align="center">
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
            Product overview video. Book a pilot for a live walkthrough of the firewall on your org.
          </p>
        </FadeIn>
      </ContentSection>

      <ContentSection title="What the firewall" italicWord="does">
        <FeatureGrid features={pillars} columns={3} />
      </ContentSection>

      <PageCta
        title="Put the firewall"
        italicWord="in front of Production"
        subtitle="14-day Shadow Mode. Sandbox OAuth only. Prove value before you buy."
        primaryLabel="Book a pilot →"
        primaryHref="/book-pilot"
        secondaryLabel="View pricing"
        secondaryHref="/pricing"
      />
    </MarketingShell>
  );
}
