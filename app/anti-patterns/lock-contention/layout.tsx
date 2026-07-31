import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lock Contention Anti-Pattern",
  description: "Row lock contention in Salesforce \u2014 detect and prevent with Jataka.",
  alternates: { canonical: "https://jataka.io/anti-patterns/lock-contention" },
  openGraph: {
    title: "Lock Contention Anti-Pattern | Jataka",
    description: "Row lock contention in Salesforce \u2014 detect and prevent with Jataka.",
    url: "https://jataka.io/anti-patterns/lock-contention",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lock Contention Anti-Pattern | Jataka",
    description: "Row lock contention in Salesforce \u2014 detect and prevent with Jataka.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
