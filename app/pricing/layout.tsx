import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Jataka - Enterprise Salesforce DevSecOps Platform",
  description: "Enterprise pricing for Jataka's AI-powered Salesforce DevSecOps platform. $30,000/year for Enterprise Velocity Tier with 30 Developer Seats, 3 Salesforce environments, and 99.9% uptime SLA.",
  alternates: {
    canonical: "https://jataka.io/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
