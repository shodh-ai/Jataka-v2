import type { Metadata } from "next";
import { Inter, Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "900"],
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo-black",
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jataka.ai"),
  title: {
    default: "Jataka — AI-Powered Salesforce Development Platform | Stop Rollbacks Before They Happen",
    template: "%s | Jataka"
  },
  description: "Jataka helps Salesforce teams catch Governor Limit breaches before deployment, automatically heal UI tests, and predict blast radius of code changes. Zero Sev-1s. 90% less test maintenance. Deploy with confidence.",
  keywords: [
    "Salesforce Governor Limits",
    "Salesforce testing",
    "Apex testing",
    "Salesforce CI/CD",
    "Salesforce deployment",
    "Salesforce code review",
    "Salesforce automation",
    "Playwright Salesforce",
    "Selenium Salesforce",
    "Salesforce QA",
    "Salesforce development tools",
    "Apex debugging",
    "Salesforce runtime governance",
    "Salesforce backend firewall",
    "Vision AI testing",
    "Self-healing tests",
    "Salesforce dependency graph",
    "Neo4j Salesforce",
    "Cursor IDE Salesforce",
    "MCP Salesforce"
  ],
  authors: [{ name: "Jataka" }],
  creator: "Jataka",
  publisher: "Jataka",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jataka.ai",
    siteName: "Jataka",
    title: "Jataka — AI-Powered Salesforce Development Platform",
    description: "Catch Governor Limit breaches before deployment. Automatically heal UI tests. Predict blast radius of code changes. Zero Sev-1s. Deploy with confidence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jataka - AI-Powered Salesforce Development Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jataka — AI-Powered Salesforce Development Platform",
    description: "Catch Governor Limit breaches before deployment. Automatically heal UI tests. Predict blast radius of code changes.",
    images: ["/og-image.png"],
    creator: "@jataka_ai",
  },
  icons: {
    icon: "/WhiteLOGO.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://jataka.ai",
  },
  category: "Software Development Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
