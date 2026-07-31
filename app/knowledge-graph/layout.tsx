import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Graph",
  description: "Live dependency graph of your Salesforce org \u2014 Apex, Flows, integrations.",
  alternates: { canonical: "https://jataka.io/knowledge-graph" },
  openGraph: {
    title: "Knowledge Graph | Jataka",
    description: "Live dependency graph of your Salesforce org \u2014 Apex, Flows, integrations.",
    url: "https://jataka.io/knowledge-graph",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Graph | Jataka",
    description: "Live dependency graph of your Salesforce org \u2014 Apex, Flows, integrations.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
