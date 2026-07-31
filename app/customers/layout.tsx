import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "See how Salesforce design partners use Jataka to prevent Sev-1s, heal broken tests, and save engineering hours — with proof.",
  alternates: {
    canonical: "https://jataka.io/customers",
  },
};

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
