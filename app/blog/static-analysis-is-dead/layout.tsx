import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Static Analysis is Dead",
  description: "Why static analysis alone isn't enough for Salesforce development. Learn how runtime profiling catches the 70% of issues that static tools miss.",
  alternates: { canonical: "https://jataka.io/blog/static-analysis-is-dead" },
  openGraph: {
    title: "Static Analysis is Dead | Jataka",
    description: "Why static analysis alone isn't enough for Salesforce development. Learn how runtime profiling catches the 70% of issues that static tools miss.",
    url: "https://jataka.io/blog/static-analysis-is-dead",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Static Analysis is Dead | Jataka",
    description: "Why static analysis alone isn't enough for Salesforce development. Learn how runtime profiling catches the 70% of issues that static tools miss.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
