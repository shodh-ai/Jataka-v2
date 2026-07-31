import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Story",
  description: "Executive narrative for the Jataka Context Engine.",
  alternates: { canonical: "https://jataka.io/insider/data-room-bot/executive-story" },
  openGraph: {
    title: "Executive Story | Jataka",
    description: "Executive narrative for the Jataka Context Engine.",
    url: "https://jataka.io/insider/data-room-bot/executive-story",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Story | Jataka",
    description: "Executive narrative for the Jataka Context Engine.",
    images: ["/og-image.png"],
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
