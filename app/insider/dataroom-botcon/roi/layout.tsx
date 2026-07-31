import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GCC Business Impact",
  description: "ROI and GCC business impact narrative for Jataka.",
  alternates: { canonical: "https://jataka.io/insider/dataroom-botcon/roi" },
  openGraph: {
    title: "GCC Business Impact | Jataka",
    description: "ROI and GCC business impact narrative for Jataka.",
    url: "https://jataka.io/insider/dataroom-botcon/roi",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GCC Business Impact | Jataka",
    description: "ROI and GCC business impact narrative for Jataka.",
    images: ["/og-image.png"],
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
