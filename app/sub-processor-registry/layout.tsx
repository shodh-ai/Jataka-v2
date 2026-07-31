import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sub-processor Registry",
  description: "Third-party processors Jataka uses to deliver the Service.",
  alternates: { canonical: "https://jataka.io/sub-processor-registry" },
  openGraph: {
    title: "Sub-processor Registry | Jataka",
    description: "Third-party processors Jataka uses to deliver the Service.",
    url: "https://jataka.io/sub-processor-registry",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sub-processor Registry | Jataka",
    description: "Third-party processors Jataka uses to deliver the Service.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
