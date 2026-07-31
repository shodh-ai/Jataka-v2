import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOQL 101 Anti-Pattern",
  description: "How SOQL-in-loop causes Salesforce Sev-1s \u2014 and how Jataka catches them.",
  alternates: { canonical: "https://jataka.io/anti-patterns/soql-101" },
  openGraph: {
    title: "SOQL 101 Anti-Pattern | Jataka",
    description: "How SOQL-in-loop causes Salesforce Sev-1s \u2014 and how Jataka catches them.",
    url: "https://jataka.io/anti-patterns/soql-101",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOQL 101 Anti-Pattern | Jataka",
    description: "How SOQL-in-loop causes Salesforce Sev-1s \u2014 and how Jataka catches them.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
