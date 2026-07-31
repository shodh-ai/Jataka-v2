import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Autonomous Support", href: "/autonomous-support" },
      { label: "Knowledge Graph", href: "/knowledge-graph" },
      { label: "DeltaBox", href: "/deltabox" },
      { label: "Enterprise Governance", href: "/enterprise-governance" },
    ],
  },
  {
    title: "Security",
    links: [
      { label: "Trust & Security Center", href: "/security" },
      { label: "Sovereign Audit", href: "/sovereign-audit" },
      { label: "DPA", href: "/dpa" },
      { label: "MSA", href: "/msa" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Shadow Mode Pilot", href: "/shadow-mode" },
      { label: "Engineering Blog", href: "/blog" },
      { label: "ROI Calculator", href: "/roi-calculator" },
      { label: "Anti-Patterns", href: "/anti-patterns" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Customers", href: "/customers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Start a Pilot", href: "/book-pilot" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#020617] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <p className="text-lg font-semibold tracking-tight text-white">Jataka</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              The Autonomous Enterprise IT Brain. Investigate, patch, and prove—under human
              authority.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 transition-colors hover:text-slate-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-500 transition-colors hover:text-slate-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-slate-600">© 2026 Jataka. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
            <Link href="/terms-of-use" className="hover:text-slate-300">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/sla" className="hover:text-slate-300">
              SLA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
