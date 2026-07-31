"use client";

import { Eye, RefreshCw, Layers, Clock } from "lucide-react";
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

export default function SelfHealingUiTestsDemo() {
  return (
    <MarketingShell>
      <PageHero
        title="Self-healing UI"
        italicWord="tests"
        subtitle="Watch Jataka's Vision AI automatically heal UI tests when Salesforce releases break Selenium scripts. Zero maintenance for UI changes."
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
              title: "Visual Element Recognition",
              body: "Jataka recognizes UI elements the way a human does — by visual appearance, position, and context. No brittle CSS selectors that break on every release.",
              icon: Eye,
            },
            {
              title: "Automatic Test Healing",
              body: "When an element changes, we update the selector in real-time. The test passes, and you get a notification about the change. Zero manual maintenance.",
              icon: RefreshCw,
            },
            {
              title: "Works with Any Framework",
              body: "Built for Playwright and modern browser automation against Salesforce Lightning — so your suite stays green through Spring, Summer, and Winter releases.",
              icon: Layers,
            },
            {
              title: "Zero Maintenance Cycles",
              body: "Salesforce ships 3 major updates a year. With Jataka, UI tests stay green through all of them — no more sprint-killing selector chase.",
              icon: Clock,
            },
          ]}
        />
      </ContentSection>

      <PageCta
        title="See it on your"
        italicWord="org"
        subtitle="14-day Shadow Mode. Zero risk. We prove value before you pay."
        secondaryLabel="Self-healing use case"
        secondaryHref="/use-cases/self-healing-ui-tests"
      />
    </MarketingShell>
  );
}
