"use client";

import { useEffect } from "react";
import {
  MarketingShell,
  PageHero,
  ContentSection,
  PageCta,
} from "./components/marketing";
import { FadeIn } from "./components/home/FadeIn";
import { DOCS_URL } from "./components/navigation.config";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MarketingShell>
      <PageHero
        eyebrow="Error"
        title="Something"
        italicWord="went wrong"
        subtitle="We hit an unexpected issue loading this page. You can try again, or head back to the homepage."
        ctas={[
          { label: "Back home →", href: "/", primary: true },
          { label: "Contact support", href: "mailto:sachin@jataka.io" },
        ]}
      />

      <ContentSection title="Try" italicWord="again" align="center">
        <FadeIn>
          <div className="mx-auto flex max-w-[480px] flex-col items-center gap-4">
            {error.digest ? (
              <p className="font-mono text-[12px] text-[#8A93A3]">Digest: {error.digest}</p>
            ) : null}
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-full bg-[#111] px-7 py-3.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Retry this page
            </button>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-[14px] font-medium text-[#2563EB] hover:underline">
              Browse documentation →
            </a>
          </div>
        </FadeIn>
      </ContentSection>

      <PageCta
        title="Need a"
        italicWord="hand"
        subtitle="Email support with the page URL and we’ll dig in."
        primaryLabel="Email support →"
        primaryHref="mailto:sachin@jataka.io"
        secondaryLabel="Book a pilot"
        secondaryHref="/book-pilot"
      />
    </MarketingShell>
  );
}
