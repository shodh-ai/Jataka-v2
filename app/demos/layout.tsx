import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://jataka.ai/blog",
  },
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
