import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://jataka.ai/use-cases",
  },
};

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
