import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Demos | Jataka",
  description: "Watch Jataka in action. See how we catch Sev-1 Governor Limit breaches, automatically heal UI tests, and predict blast radius before code changes.",
  alternates: {
    canonical: "https://jataka.io/demos",
  },
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
