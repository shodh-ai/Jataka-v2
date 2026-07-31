import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Architecture guides, product docs, and Salesforce runtime governance references for Jataka.",
  alternates: {
    canonical: "https://jataka.io/docs",
  },
  openGraph: {
    title: "Documentation | Jataka",
    description:
      "Architecture guides, product docs, and Salesforce runtime governance references for Jataka.",
    url: "https://jataka.io/docs",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation | Jataka",
    description:
      "Architecture guides, product docs, and Salesforce runtime governance references for Jataka.",
    images: ["/og-image.png"],
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
