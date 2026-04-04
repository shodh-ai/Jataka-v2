"use client";

import { generateJsonLd } from "../lib/seo";

interface JsonLdProps {
  schemas: any[];
}

export function JsonLd({ schemas }: JsonLdProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
