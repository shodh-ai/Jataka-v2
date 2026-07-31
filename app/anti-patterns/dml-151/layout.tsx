import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DML 151 Anti-Pattern",
  description: "How DML limit breaches crash Salesforce orgs \u2014 and how Jataka prevents them.",
  alternates: { canonical: "https://jataka.io/anti-patterns/dml-151" },
  openGraph: {
    title: "DML 151 Anti-Pattern | Jataka",
    description: "How DML limit breaches crash Salesforce orgs \u2014 and how Jataka prevents them.",
    url: "https://jataka.io/anti-patterns/dml-151",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DML 151 Anti-Pattern | Jataka",
    description: "How DML limit breaches crash Salesforce orgs \u2014 and how Jataka prevents them.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
