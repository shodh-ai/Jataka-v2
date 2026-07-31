import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Jataka",
  description: "Learn about Jataka - the AI-powered Salesforce DevSecOps platform that helps teams catch Governor Limit breaches, automatically heal UI tests, and predict blast radius.",
  alternates: {
    canonical: "https://jataka.io/info",
  },
};

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
