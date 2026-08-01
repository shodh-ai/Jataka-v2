"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLenisScroll } from "./SmoothScroll";
import {
  currentScrollY,
  saveScrollPosition,
  scrollKey,
} from "../scrollHistory";
import { DOCS_URL } from "../navigation.config";

const columns = [
  {
    title: "PRODUCT",
    links: [
      { label: "Autonomous Support", href: "/autonomous-support" },
      { label: "Knowledge Graph", href: "/knowledge-graph" },
      { label: "DeltaBox", href: "/deltabox" },
      { label: "Enterprise Governance", href: "/enterprise-governance" },
    ],
  },
  {
    title: "TRUST",
    links: [
      { label: "Security", href: "/security" },
      { label: "WORM Ledger", href: "/#trust" },
      { label: "DPA", href: "/dpa" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "Manifesto", href: "/#manifesto" },
      { label: "Customers", href: "/customers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Book a briefing", href: "/book-pilot" },
    ],
  },
  {
    title: "CONTACT",
    links: [
      { label: "sachin@jataka.io", href: "mailto:sachin@jataka.io" },
      { label: "Docs", href: DOCS_URL, external: true },
      { label: "Compare", href: "/compare" },
    ],
  },
];

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollToId } = useLenisScroll();

  const className = "text-[13px] text-[#4B4B53] transition-colors hover:text-[#111]";

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }

  // In-page hash: /#section or #section
  const hashMatch = href.match(/^\/?#([\w-]+)$/);
  if (hashMatch) {
    const id = hashMatch[1];
    return (
      <a
        href={`/#${id}`}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          // Snapshot current view (e.g. footer) before hash changes
          saveScrollPosition(scrollKey(pathname, window.location.hash), currentScrollY());
          if (pathname === "/") {
            window.history.pushState(null, "", `/#${id}`);
            scrollToId(id, { immediate: true });
            window.setTimeout(() => scrollToId(id, { immediate: true }), 80);
            window.setTimeout(() => scrollToId(id), 200);
          } else {
            router.push(`/#${id}`);
          }
        }}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className} scroll={false}>
      {label}
    </Link>
  );
}

export default function HomeFooter() {
  return (
    <footer
      id="final-cta"
      className="relative overflow-hidden bg-[#F7F7F8] px-5 pt-12 pb-8 sm:px-6 md:px-10 md:pt-16 md:pb-10"
    >
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid gap-10 md:gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#9A9AA3] uppercase">
              Endpoint — Request Access
            </p>
            <h2 className="mt-5 text-[clamp(1.85rem,4.5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#111]">
              Meet Jataka.
              <br />
              <span className="font-instrument font-normal italic">Sixty</span>{" "}
              <span className="home-hero-gradient-text">seconds</span> from now.
            </h2>
            <p className="mt-5 max-w-[460px] text-[14px] leading-[1.7] text-[#5F5F66] sm:text-[15px]">
              Book an executive briefing with our founders. We&apos;ll walk your team through a live
              sandbox on a real incident from your domain — under NDA — in under thirty minutes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:sachin@jataka.io"
                className="btn-primary-bloom inline-flex items-center justify-center rounded-full bg-[#111] px-5 py-3.5 text-center text-[13px] font-medium text-white sm:px-6"
              >
                Book briefing → sachin@jataka.io
              </a>
              <Link
                href="/security"
                className="inline-flex items-center justify-center rounded-full border border-[#111]/15 bg-white px-5 py-3.5 text-[13px] font-medium text-[#111] transition-colors hover:border-[#111]/3 sm:px-6"
              >
                Security overview
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8 lg:gap-6">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-3 text-[10px] font-semibold tracking-[0.18em] text-[#9A9AA3] uppercase sm:mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink
                        href={link.href}
                        label={link.label}
                        external={"external" in link ? link.external : false}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#111]/08 pt-6 md:mt-16 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-[3px] bg-[#111] text-[10px] font-bold text-white">
              J
            </span>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-[#6B7280] uppercase">
              Jataka · The Autonomous Enterprise IT Brain
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-semibold tracking-[0.12em] text-[#9A9AA3] uppercase">
            <span>© 2026 Jataka Systems Inc.</span>
            <span>Engine Build 2.0.184271</span>
            <span className="inline-flex items-center gap-1.5 text-[#6B7280]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              All Systems Nominal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
