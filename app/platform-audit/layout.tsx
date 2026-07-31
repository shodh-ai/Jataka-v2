import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Audit",
  description:
    "Jataka Complete Platform Audit: the autonomous Salesforce governance engine. From Limit Firewall to Tech Debt, QA, Developer Experience, and Enterprise use cases.",
  keywords: [
    "Jataka platform audit",
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
    title: "Platform Audit",
    description:
      "The autonomous Salesforce governance engine. From code review to compliance, Jataka guards your org at every stage of the development lifecycle.",
    url: "https://jataka.io/platform-audit",
    siteName: "Jataka",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jataka Complete Platform Audit",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Audit",
    description:
      "Jataka: the autonomous Salesforce governance engine. Complete capability audit across 5 modules.",
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
