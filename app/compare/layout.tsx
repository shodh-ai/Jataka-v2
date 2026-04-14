import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Jataka | Salesforce DevSecOps Tools",
  description: "Compare Jataka with other Salesforce testing and deployment tools like Copado, Provar, and Clayton. See why Jataka's AI-powered approach is different.",
  alternates: {
    canonical: "https://jataka.io/compare",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
