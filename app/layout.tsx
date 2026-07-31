import type { Metadata, Viewport } from "next";
import { Inter, Archivo_Black, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import RouteScrollManager from "./components/RouteScrollManager";


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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jataka.io"),
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
    "Knowledge Salesforce",
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
    url: "https://jataka.io",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/TabLogo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://jataka.io",
  },
  category: "Software Development Tools",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <RouteScrollManager />
        <SiteHeader />
        <div className="pt-[64px]">{children}</div>
      </body>
    </html>
  );
}
