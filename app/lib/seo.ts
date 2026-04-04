import { Metadata } from "next";
import { webPageSchema, breadcrumbSchema, articleSchema, organizationSchema, softwareApplicationSchema } from "./schemas";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  breadcrumbs?: Array<{name: string, url: string}>;
  article?: {
    datePublished: string;
    author?: string;
    category?: string;
  };
  faq?: Array<{question: string, answer: string}>;
  noIndex?: boolean;
}

const siteConfig = {
  name: "Jataka",
  domain: "https://jataka.io",
  logo: "/logo.png",
  ogImage: "/og-image.png",
  twitterHandle: "@jatakaio",
  defaultKeywords: [
    "Salesforce development",
    "Governor limits", 
    "Apex testing",
    "Salesforce CI/CD",
    "Salesforce automation",
    "AI-powered development"
  ]
};

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = siteConfig.ogImage,
    ogType = "website",
    breadcrumbs,
    article,
    noIndex = false
  } = config;

  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const allKeywords = [...keywords, ...siteConfig.defaultKeywords];
  const canonicalUrl = canonical ? `${siteConfig.domain}${canonical}` : siteConfig.domain;

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [{ 
        url: ogImage, 
        width: 1200, 
        height: 630, 
        alt: title 
      }],
      locale: "en_US",
      type: ogType,
      ...(article && {
        publishedTime: article.datePublished,
        authors: [article.author || siteConfig.name],
        section: article.category,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      site: siteConfig.twitterHandle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...(article && {
      authors: [{ name: article.author || siteConfig.name }],
      publishedTime: article.datePublished,
    }),
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || "google-site-verification-code",
    },
  };
}

export function generateJsonLd(config: SEOConfig) {
  const { title, description, canonical, breadcrumbs, article } = config;
  const canonicalUrl = canonical ? `${siteConfig.domain}${canonical}` : siteConfig.domain;

  const schemas = [];

  // Organization schema for all pages
  schemas.push(organizationSchema);

  // WebPage schema
  schemas.push(webPageSchema(title, description, canonical || ""));

  // Breadcrumb schema if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(breadcrumbSchema(breadcrumbs));
  }

  // Article schema for blog posts
  if (article) {
    schemas.push(articleSchema(title, description, canonical || "", article.datePublished));
  }

  // SoftwareApplication schema for main pages
  if (!article) {
    schemas.push(softwareApplicationSchema);
  }

  return schemas;
}

export { siteConfig };
