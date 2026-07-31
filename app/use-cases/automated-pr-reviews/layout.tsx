import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offshore Agency Use Case",
  description: "How offshore development agencies use Jataka to reduce architect review time, improve code quality, and increase billing efficiency.",
  alternates: { canonical: "https://jataka.io/use-cases/agency" },
  openGraph: {
    title: "Offshore Agency Use Case | Jataka",
    description: "How offshore development agencies use Jataka to reduce architect review time, improve code quality, and increase billing efficiency.",
    url: "https://jataka.io/use-cases/agency",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Offshore Agency Use Case | Jataka",
    description: "How offshore development agencies use Jataka to reduce architect review time, improve code quality, and increase billing efficiency.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
