import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Briefing Story",
  description: "Executive briefing story for Jataka.",
  alternates: { canonical: "https://jataka.io/insider/data-room-bot/briefstory" },
  openGraph: {
    title: "Briefing Story | Jataka",
    description: "Executive briefing story for Jataka.",
    url: "https://jataka.io/insider/data-room-bot/briefstory",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Briefing Story | Jataka",
    description: "Executive briefing story for Jataka.",
    images: ["/og-image.png"],
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
