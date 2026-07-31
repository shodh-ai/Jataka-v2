import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mixed DML Anti-Pattern",
  description: "Mixed DML failures in Salesforce \u2014 detection and prevention with Jataka.",
  alternates: { canonical: "https://jataka.io/anti-patterns/mixed-dml" },
  openGraph: {
    title: "Mixed DML Anti-Pattern | Jataka",
    description: "Mixed DML failures in Salesforce \u2014 detection and prevention with Jataka.",
    url: "https://jataka.io/anti-patterns/mixed-dml",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mixed DML Anti-Pattern | Jataka",
    description: "Mixed DML failures in Salesforce \u2014 detection and prevention with Jataka.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
