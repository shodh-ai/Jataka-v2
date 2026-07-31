import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Contract Guardian",
  description: "Guard Salesforce API contracts before breaking changes reach production.",
  alternates: { canonical: "https://jataka.io/api-contract-guardian" },
  openGraph: {
    title: "API Contract Guardian | Jataka",
    description: "Guard Salesforce API contracts before breaking changes reach production.",
    url: "https://jataka.io/api-contract-guardian",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Contract Guardian | Jataka",
    description: "Guard Salesforce API contracts before breaking changes reach production.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
