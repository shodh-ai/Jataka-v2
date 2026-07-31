import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description: "Jataka's security framework: SOC 2 Type II compliance, zero data retention, sandbox-only execution, and enterprise-grade security for Salesforce development.",
  alternates: { canonical: "https://jataka.io/security" },
  openGraph: {
    title: "Security | Jataka",
    description: "Jataka's security framework: SOC 2 Type II compliance, zero data retention, sandbox-only execution, and enterprise-grade security for Salesforce development.",
    url: "https://jataka.io/security",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security | Jataka",
    description: "Jataka's security framework: SOC 2 Type II compliance, zero data retention, sandbox-only execution, and enterprise-grade security for Salesforce development.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
