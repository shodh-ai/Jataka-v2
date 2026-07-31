import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Self-Healing UI Tests",
  description: "Automatically heal Salesforce UI tests when releases break selectors.",
  alternates: { canonical: "https://jataka.io/use-cases/self-healing-ui-tests" },
  openGraph: {
    title: "Self-Healing UI Tests | Jataka",
    description: "Automatically heal Salesforce UI tests when releases break selectors.",
    url: "https://jataka.io/use-cases/self-healing-ui-tests",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Self-Healing UI Tests | Jataka",
    description: "Automatically heal Salesforce UI tests when releases break selectors.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
