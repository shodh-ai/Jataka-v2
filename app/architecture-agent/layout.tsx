import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture Agent",
  description: "Map Salesforce architecture risk and blast radius before you ship.",
  alternates: { canonical: "https://jataka.io/architecture-agent" },
  openGraph: {
    title: "Architecture Agent | Jataka",
    description: "Map Salesforce architecture risk and blast radius before you ship.",
    url: "https://jataka.io/architecture-agent",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture Agent | Jataka",
    description: "Map Salesforce architecture risk and blast radius before you ship.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
