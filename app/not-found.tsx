"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MarketingShell,
  PageHero,
  ContentSection,
} from "./components/marketing";
import { FadeIn } from "./components/home/FadeIn";

const destinations = [
  { title: "Governor Limits", description: "Prevent runtime crashes", href: "/use-cases/limit-firewall" },
  { title: "PR Reviews", description: "Automated code analysis", href: "/use-cases/automated-pr-reviews" },
  { title: "UI Tests", description: "Self-healing test automation", href: "/use-cases/self-healing-ui-tests" },
  { title: "Documentation", description: "Architecture guides and product docs", href: "/docs" },
  { title: "Compare", description: "See how Jataka compares", href: "/compare" },
  { title: "Book a pilot", description: "14-day Shadow Mode briefing", href: "/book-pilot" },
];

export default function NotFound() {
  const pathname = usePathname();

  return (
    <MarketingShell>
      <PageHero
        eyebrow="404"
        title="Page"
        italicWord="not found"
        subtitle="This URL doesn’t exist — or it moved. Even our runtime protection can’t prevent broken links."
        ctas={[
          { label: "Back home →", href: "/", primary: true },
          { label: "Browse docs", href: "/docs" },
        ]}
      />

      <ContentSection title="Requested" italicWord="path" align="center">
        <FadeIn>
          <p className="mx-auto max-w-[640px] rounded-[16px] border border-[#111]/08 bg-white px-5 py-4 font-mono text-[13px] text-[#5F5F66] break-all">
            {pathname || "/"}
          </p>
        </FadeIn>
      </ContentSection>

      <ContentSection title="Popular" italicWord="destinations">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <FadeIn key={d.href} delay={i * 0.04}>
              <Link
                href={d.href}
                className="block h-full rounded-[18px] border border-[#111]/08 bg-white p-5 shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-colors hover:border-[#2563EB]/30"
              >
                <h3 className="text-[16px] font-semibold text-[#111]">{d.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#5F5F66]">{d.description}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </ContentSection>
    </MarketingShell>
  );
}
