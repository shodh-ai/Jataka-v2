import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Form",
  description: "Jataka Enterprise License order form \u2014 $30,000/year with Net 30 billing.",
  alternates: { canonical: "https://jataka.io/order-form" },
  openGraph: {
    title: "Order Form | Jataka",
    description: "Jataka Enterprise License order form \u2014 $30,000/year with Net 30 billing.",
    url: "https://jataka.io/order-form",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Order Form | Jataka",
    description: "Jataka Enterprise License order form \u2014 $30,000/year with Net 30 billing.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
