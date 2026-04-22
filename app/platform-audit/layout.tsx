import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Audit - Shodh AI / Jataka | Complete Capability Report",
  description:
    "Shodh AI Complete Platform Audit: the autonomous Salesforce governance engine. From Limit Firewall to Tech Debt, QA, Developer Experience, and Enterprise use cases.",
  keywords: [
    "Shodh AI platform audit",
    "Jataka platform audit",
    "Salesforce governance platform",
    "Salesforce Limit Firewall",
    "Salesforce tech debt",
    "Salesforce autonomous QA",
    "Salesforce M&A org merge",
    "Salesforce security audit",
    "Salesforce API contract guardian",
    "Salesforce synthetic monitoring",
  ],
  alternates: {
    canonical: "https://jataka.io/platform-audit",
  },
  openGraph: {
    title: "Platform Audit - Shodh AI / Jataka",
    description:
      "The autonomous Salesforce governance engine. From code review to compliance, Shodh AI guards your org at every stage of the development lifecycle.",
    url: "https://jataka.io/platform-audit",
    siteName: "Jataka",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shodh AI Complete Platform Audit",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Audit - Shodh AI / Jataka",
    description:
      "Shodh AI: the autonomous Salesforce governance engine. Complete capability audit across 5 modules.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function PlatformAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
