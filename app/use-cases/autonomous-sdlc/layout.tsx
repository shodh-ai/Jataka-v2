import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autonomous SDLC",
  description: "Autonomous Salesforce SDLC with runtime governance and CI/CD gates.",
  alternates: { canonical: "https://jataka.io/use-cases/autonomous-sdlc" },
  openGraph: {
    title: "Autonomous SDLC | Jataka",
    description: "Autonomous Salesforce SDLC with runtime governance and CI/CD gates.",
    url: "https://jataka.io/use-cases/autonomous-sdlc",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonomous SDLC | Jataka",
    description: "Autonomous Salesforce SDLC with runtime governance and CI/CD gates.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
