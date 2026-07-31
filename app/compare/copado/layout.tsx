import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jataka vs Copado - Salesforce Development Platform Comparison",
  description: "Compare Jataka vs Copado for Salesforce development. See how Jataka's real-time profiling and AI-powered automation differs from Copado's static analysis approach.",
  alternates: { canonical: "https://jataka.io/compare/copado" },
  openGraph: {
    title: "Jataka vs Copado - Salesforce Development Platform Comparison | Jataka",
    description: "Compare Jataka vs Copado for Salesforce development. See how Jataka's real-time profiling and AI-powered automation differs from Copado's static analysis approach.",
    url: "https://jataka.io/compare/copado",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jataka vs Copado - Salesforce Development Platform Comparison | Jataka",
    description: "Compare Jataka vs Copado for Salesforce development. See how Jataka's real-time profiling and AI-powered automation differs from Copado's static analysis approach.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
