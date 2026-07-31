import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catching Sev-1 Limits Demo",
  description: "See Jataka catch SOQL/CPU limit breaches before they cause production incidents.",
  alternates: { canonical: "https://jataka.io/demos/catching-sev1-limits" },
  openGraph: {
    title: "Catching Sev-1 Limits Demo | Jataka",
    description: "See Jataka catch SOQL/CPU limit breaches before they cause production incidents.",
    url: "https://jataka.io/demos/catching-sev1-limits",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catching Sev-1 Limits Demo | Jataka",
    description: "See Jataka catch SOQL/CPU limit breaches before they cause production incidents.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
