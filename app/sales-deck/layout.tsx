import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Deck | Jataka",
  description: "Jataka sales presentation deck for enterprise Salesforce teams. Learn about our AI-powered DevSecOps platform, pricing, and customer success stories.",
  alternates: {
    canonical: "https://jataka.io/sales-deck",
  },
};

export default function SalesDeckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
