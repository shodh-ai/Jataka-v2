"use client";

import {
  CustomersHero,
  CustomersStats,
  CustomersStories,
  CustomersCta,
} from "../components/customers";
import { MarketingShell } from "../components/marketing";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Jataka Customer Stories - Design Partner Results",
  description:
    "See how Salesforce teams use Jataka to prevent Governor Limit breaches and save engineering hours. Real results from design partners.",
  url: "https://jataka.io/customers",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://jataka.io",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Customers",
      item: "https://jataka.io/customers",
    },
  ],
};

export default function CustomersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <MarketingShell>
        <CustomersHero />
        <CustomersStats />
        <CustomersStories />
        <CustomersCta />
      </MarketingShell>
    </>
  );
}
