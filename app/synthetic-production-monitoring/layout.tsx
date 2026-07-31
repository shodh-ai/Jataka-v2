import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synthetic Production Monitoring",
  description: "Synthetic monitoring for Salesforce production workflows.",
  alternates: { canonical: "https://jataka.io/synthetic-production-monitoring" },
  openGraph: {
    title: "Synthetic Production Monitoring | Jataka",
    description: "Synthetic monitoring for Salesforce production workflows.",
    url: "https://jataka.io/synthetic-production-monitoring",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synthetic Production Monitoring | Jataka",
    description: "Synthetic monitoring for Salesforce production workflows.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
