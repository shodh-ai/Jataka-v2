import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPU Timeout Anti-Pattern",
  description: "How Apex CPU timeouts happen \u2014 and how Jataka profiles them pre-merge.",
  alternates: { canonical: "https://jataka.io/anti-patterns/cpu-timeout" },
  openGraph: {
    title: "CPU Timeout Anti-Pattern | Jataka",
    description: "How Apex CPU timeouts happen \u2014 and how Jataka profiles them pre-merge.",
    url: "https://jataka.io/anti-patterns/cpu-timeout",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPU Timeout Anti-Pattern | Jataka",
    description: "How Apex CPU timeouts happen \u2014 and how Jataka profiles them pre-merge.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
