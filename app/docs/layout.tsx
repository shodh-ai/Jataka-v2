import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://jataka.ai/docs",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
