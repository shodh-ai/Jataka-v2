import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers | Jataka",
  description: "See how enterprise Salesforce teams trust Jataka to eliminate Sev-1 incidents, reduce test maintenance, and accelerate development velocity.",
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
