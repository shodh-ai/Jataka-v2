import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jataka vs Provar",
  description: "Compare Jataka to Provar for Salesforce testing and deployment safety.",
  alternates: { canonical: "https://jataka.io/compare/provar" },
  openGraph: {
    title: "Jataka vs Provar | Jataka",
    description: "Compare Jataka to Provar for Salesforce testing and deployment safety.",
    url: "https://jataka.io/compare/provar",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jataka vs Provar | Jataka",
    description: "Compare Jataka to Provar for Salesforce testing and deployment safety.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
