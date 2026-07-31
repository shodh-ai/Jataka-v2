import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insider Data Room",
  description: "Confidential Jataka data room for BOT Consulting.",
  alternates: { canonical: "https://jataka.io/insider/dataroom-botcon" },
  openGraph: {
    title: "Insider Data Room | Jataka",
    description: "Confidential Jataka data room for BOT Consulting.",
    url: "https://jataka.io/insider/dataroom-botcon",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insider Data Room | Jataka",
    description: "Confidential Jataka data room for BOT Consulting.",
    images: ["/og-image.png"],
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
