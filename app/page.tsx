"use client";

import { useEffect } from "react";
import {
  HomeHero,
  HomePillars,
  HomeProblem,
  HomeParadigm,
  HomeDashboard,
  HomeMarquee,
  HomeSuperpowers,
  HomeTrust,
  HomeManifesto,
  HomeFooter,
  SmoothScroll,
  GlobalGrain,
} from "./components/home";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Jataka",
  url: "https://jataka.io",
  logo: "https://jataka.io/WhiteLOGO.svg",
  description:
    "AI-Powered Salesforce Development Platform - Catch Governor Limit breaches before deployment, automatically heal UI tests, and predict blast radius of code changes.",
  sameAs: ["https://twitter.com/jataka_ai", "https://www.linkedin.com/company/jataka"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://jataka.io/book-pilot",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Jataka",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web-based",
  description:
    "Backend Firewall and Developer Experience platform for Salesforce. Helps teams catch Governor Limit breaches before deployment, automatically heal UI tests, and predict blast radius of code changes.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Book a demo to discuss pricing",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "47",
  },
  featureList: [
    "Governor Limit Profiling",
    "Self-Healing UI Tests",
    "Blast Radius Prediction",
    "Kamikaze Pods",
    "Vision AI",
    "Knowledge Dependency Graph",
    "MCP Protocol Integration",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Jataka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jataka is a Backend Firewall and Developer Experience platform for Salesforce. It helps teams catch Governor Limit breaches before deployment, automatically heal UI tests when Salesforce releases break selectors, and predict the blast radius of code changes before they're made.",
      },
    },
    {
      "@type": "Question",
      name: "How does Jataka catch Governor Limit breaches?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jataka uses Kamikaze Pods - isolated Sandbox environments that execute Apex code with Production-like data volumes. We parse Debug Logs and Sforce-Limit-Info headers to measure actual SOQL queries, DML statements, and CPU milliseconds. PRs are automatically blocked when thresholds are exceeded.",
      },
    },
    {
      "@type": "Question",
      name: "What testing frameworks does Jataka's Vision AI work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jataka's Vision AI works with all major testing frameworks including Playwright, Selenium, and Cypress. It recognizes UI elements visually and automatically heals tests when Salesforce releases break selectors.",
      },
    },
    {
      "@type": "Question",
      name: "How does blast radius prediction work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jataka maintains a Knowledge dependency graph of your entire Salesforce org. Every Apex class, trigger, flow, and integration is mapped. Integration with Cursor IDE via MCP protocol lets developers ask 'What breaks if I change this?' and get answers before writing code.",
      },
    },
  ],
};

export default function JatakaLandingPage() {
  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    const prevColor = document.body.style.color;
    document.body.style.backgroundColor = "#F3F3F4";
    document.body.style.color = "#111111";
    document.documentElement.classList.add("home-route");

    return () => {
      document.body.style.backgroundColor = prevBg;
      document.body.style.color = prevColor;
      document.documentElement.classList.remove("home-route");
    };
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SmoothScroll>
        <GlobalGrain />
        <main className="home-theme">
          <HomeHero />
          <HomePillars />
          <HomeProblem />
          <HomeParadigm />
          <HomeDashboard />
          <HomeMarquee />
          <HomeSuperpowers />
          <HomeTrust />
          <HomeManifesto />
          <HomeFooter />
        </main>
      </SmoothScroll>
    </>
  );
}
