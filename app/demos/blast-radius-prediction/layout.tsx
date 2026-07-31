import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blast Radius Prediction Demo",
  description: "See Jataka calculate blast radius of Salesforce code changes before they ship.",
  alternates: { canonical: "https://jataka.io/demos/blast-radius-prediction" },
  openGraph: {
    title: "Blast Radius Prediction Demo | Jataka",
    description: "See Jataka calculate blast radius of Salesforce code changes before they ship.",
    url: "https://jataka.io/demos/blast-radius-prediction",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blast Radius Prediction Demo | Jataka",
    description: "See Jataka calculate blast radius of Salesforce code changes before they ship.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
