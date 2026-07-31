import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VIP Briefing",
  description: "Confidential VIP briefing materials.",
  alternates: { canonical: "https://jataka.io/insider/data-room-bot/brief" },
  openGraph: {
    title: "VIP Briefing | Jataka",
    description: "Confidential VIP briefing materials.",
    url: "https://jataka.io/insider/data-room-bot/brief",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIP Briefing | Jataka",
    description: "Confidential VIP briefing materials.",
    images: ["/og-image.png"],
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
