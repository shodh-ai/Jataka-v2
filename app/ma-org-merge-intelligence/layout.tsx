import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "M&A Org Merge Intelligence",
  description: "Analyze Salesforce org mergers with architecture and risk intelligence.",
  alternates: { canonical: "https://jataka.io/ma-org-merge-intelligence" },
  openGraph: {
    title: "M&A Org Merge Intelligence | Jataka",
    description: "Analyze Salesforce org mergers with architecture and risk intelligence.",
    url: "https://jataka.io/ma-org-merge-intelligence",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M&A Org Merge Intelligence | Jataka",
    description: "Analyze Salesforce org mergers with architecture and risk intelligence.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
