import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Room - Jataka | The Enterprise Context Engine",
  description:
    "Jataka is the world's first Context Engine for Enterprise Architecture. A Platform + Apps data room for GCC operators and Fortune 500 CIOs.",
  keywords: [
    "Jataka data room",
    "Enterprise Context Engine",
    "Platform and Apps",
    "Salesforce Context Engine",
    "GCC advantage",
    "Zero Risk Engineering",
    "Jataka knowledge graph",
  ],
  alternates: {
    canonical: "https://jataka.io/insider/data-room-bot",
  },
  openGraph: {
    title: "Data Room - Jataka | The Enterprise Context Engine",
    description:
      "The Platform + Apps pitch. The Context Engine. The Applications. The GCC Advantage.",
    url: "https://jataka.io/insider/data-room-bot",
    siteName: "Jataka",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Jataka Data Room" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Room - Jataka",
    description:
      "The world's first Context Engine for Enterprise Architecture.",
    images: ["/og-image.png"],
  },
  robots: { index: false, follow: false },
};

export default function DataRoomBotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
