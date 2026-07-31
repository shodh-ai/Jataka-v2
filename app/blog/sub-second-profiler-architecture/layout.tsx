import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sub-Second Profiler Architecture",
  description: "Deep dive into Jataka's sub-second profiler architecture for Salesforce. Learn how we achieve real-time Governor limit monitoring with Tooling API and debug log parsing.",
  alternates: { canonical: "https://jataka.io/blog/sub-second-profiler-architecture" },
  openGraph: {
    title: "Sub-Second Profiler Architecture | Jataka",
    description: "Deep dive into Jataka's sub-second profiler architecture for Salesforce. Learn how we achieve real-time Governor limit monitoring with Tooling API and debug log parsing.",
    url: "https://jataka.io/blog/sub-second-profiler-architecture",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sub-Second Profiler Architecture | Jataka",
    description: "Deep dive into Jataka's sub-second profiler architecture for Salesforce. Learn how we achieve real-time Governor limit monitoring with Tooling API and debug log parsing.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
