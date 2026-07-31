import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jataka vs Clayton",
  description: "Compare Jataka runtime firewall to Clayton for Salesforce code quality.",
  alternates: { canonical: "https://jataka.io/compare/clayton" },
  openGraph: {
    title: "Jataka vs Clayton | Jataka",
    description: "Compare Jataka runtime firewall to Clayton for Salesforce code quality.",
    url: "https://jataka.io/compare/clayton",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jataka vs Clayton | Jataka",
    description: "Compare Jataka runtime firewall to Clayton for Salesforce code quality.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
