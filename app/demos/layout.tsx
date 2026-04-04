import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://jataka.io/blog",
  },
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
