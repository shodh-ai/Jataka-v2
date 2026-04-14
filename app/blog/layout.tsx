import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Jataka",
  description: "Technical articles and insights about Salesforce DevSecOps, Governor Limits, automated testing, and AI-powered development tools.",
  alternates: {
    canonical: "https://jataka.io/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
