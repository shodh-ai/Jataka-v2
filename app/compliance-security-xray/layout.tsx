import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance & Security Audit",
  description: "Audit Salesforce compliance and security posture with Jataka.",
  alternates: { canonical: "https://jataka.io/compliance-security-xray" },
  openGraph: {
    title: "Compliance & Security Audit | Jataka",
    description: "Audit Salesforce compliance and security posture with Jataka.",
    url: "https://jataka.io/compliance-security-xray",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compliance & Security Audit | Jataka",
    description: "Audit Salesforce compliance and security posture with Jataka.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
