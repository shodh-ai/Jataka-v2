import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo | Jataka",
  description: "Schedule a demo of Jataka's AI-powered Salesforce DevSecOps platform. See how we catch Governor Limit breaches, automatically heal UI tests, and predict blast radius.",
  alternates: {
    canonical: "https://jataka.io/book-pilot",
  },
};

export default function BookPilotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
