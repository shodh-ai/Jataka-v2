import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salesforce Anti-Patterns",
  description: "Learn about common Salesforce Governor Limit anti-patterns like SOQL 101, DML 151, Mixed DML, CPU Timeout, and Lock Contention. See how Jataka helps you avoid them.",
  alternates: {
    canonical: "https://jataka.io/anti-patterns",
  },
};

export default function AntiPatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
