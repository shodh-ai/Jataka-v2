// JSON-LD Schema definitions for Jataka.io
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Jataka",
  "url": "https://jataka.io",
  "logo": "https://jataka.io/logo.png",
  "description": "AI-powered Salesforce development platform that helps teams catch Governor Limit breaches, automatically heal UI tests, and predict blast radius of code changes.",
  "foundingDate": "2024",
  "founders": [
    {
      "@type": "Person",
      "name": "Jataka Team"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-415-555-0123",
    "contactType": "sales",
    "availableLanguage": ["English"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "addressCountry": "US",
    "postalCode": "94105"
  },
  "sameAs": [
    "https://twitter.com/jatakaio",
    "https://linkedin.com/company/jataka",
    "https://github.com/jataka"
  ]
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Jataka",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web-based",
  "offers": [
    {
      "@type": "Offer",
      "name": "Team Plan",
      "price": "12000",
      "priceCurrency": "USD",
      "billingDuration": "P1Y",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer", 
      "name": "Enterprise Plan",
      "price": "36000",
      "priceCurrency": "USD",
      "billingDuration": "P1Y",
      "availability": "https://schema.org/InStock"
    }
  ],
  "featureList": [
    "Governor Limit Profiling",
    "Self-Healing UI Tests",
    "Blast Radius Prediction",
    "Kamikaze Pods",
    "Vision AI",
    "Neo4j Dependency Graph",
    "Automated Code Review",
    "Runtime Testing"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const webPageSchema = (title: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": title,
  "description": description,
  "url": `https://jataka.io${url}`,
  "inLanguage": "en-US",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Jataka",
    "url": "https://jataka.io"
  },
  "about": {
    "@type": "Thing",
    "name": "Salesforce Development Platform"
  },
  "publisher": organizationSchema,
  "dateModified": new Date().toISOString().split('T')[0]
});

export const breadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": `https://jataka.io${crumb.url}`
  }))
});

export const articleSchema = (title: string, description: string, url: string, datePublished: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "url": `https://jataka.io${url}`,
  "datePublished": datePublished,
  "dateModified": new Date().toISOString().split('T')[0],
  "author": {
    "@type": "Organization",
    "name": "Jataka Team",
    "url": "https://jataka.io"
  },
  "publisher": organizationSchema,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://jataka.io${url}`
  },
  "image": "https://jataka.io/og-image.png",
  "inLanguage": "en-US"
});

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Salesforce Development Platform",
  "description": "AI-powered platform for Salesforce development including Governor limit monitoring, automated testing, and code analysis",
  "provider": organizationSchema,
  "serviceType": "Software Development",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Jataka Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Governor Limit Monitoring",
          "description": "Real-time monitoring and prevention of Salesforce Governor limit breaches"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Automated UI Testing",
          "description": "Self-healing UI tests that automatically adapt to code changes"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Blast Radius Prediction",
          "description": "AI-powered prediction of code change impact across Salesforce org"
        }
      }
    ]
  }
};

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareCompany",
  "name": "Jataka",
  "description": "AI-powered Salesforce development platform",
  "url": "https://jataka.io",
  "telephone": "+1-415-555-0123",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Market Street",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94105",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "$$$",
  "sameAs": [
    "https://twitter.com/jatakaio",
    "https://linkedin.com/company/jataka"
  ]
};
