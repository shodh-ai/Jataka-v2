import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mutual Action Plan",
  description: "14-day pilot success criteria checklist for Enterprise License evaluation.",
  alternates: { canonical: "https://jataka.io/mutual-action-plan" },
  openGraph: {
    title: "Mutual Action Plan | Jataka",
    description: "14-day pilot success criteria checklist for Enterprise License evaluation.",
    url: "https://jataka.io/mutual-action-plan",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutual Action Plan | Jataka",
    description: "14-day pilot success criteria checklist for Enterprise License evaluation.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
