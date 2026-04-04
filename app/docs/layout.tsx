import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://jataka.io/docs",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
