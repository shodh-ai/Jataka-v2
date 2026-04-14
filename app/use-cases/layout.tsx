import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases | Jataka",
  description: "See how enterprise Salesforce teams, development agencies, and QA teams use Jataka to eliminate Sev-1 incidents, reduce test maintenance, and accelerate development.",
  alternates: {
    canonical: "https://jataka.io/use-cases",
  },
};

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
