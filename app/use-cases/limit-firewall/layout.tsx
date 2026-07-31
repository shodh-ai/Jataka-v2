import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Use Case",
  description: "How enterprise Salesforce teams use Jataka to prevent Sev-1 incidents, ensure compliance, and accelerate development while maintaining security.",
  alternates: { canonical: "https://jataka.io/use-cases/enterprise" },
  openGraph: {
    title: "Enterprise Use Case | Jataka",
    description: "How enterprise Salesforce teams use Jataka to prevent Sev-1 incidents, ensure compliance, and accelerate development while maintaining security.",
    url: "https://jataka.io/use-cases/enterprise",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Use Case | Jataka",
    description: "How enterprise Salesforce teams use Jataka to prevent Sev-1 incidents, ensure compliance, and accelerate development while maintaining security.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
