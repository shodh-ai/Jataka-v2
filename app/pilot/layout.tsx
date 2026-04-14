import { Metadata } from "next";

export const metadata: Metadata = {
  title: "14-Day Pilot | Jataka",
  description: "Try Jataka free for 14 days. Run our platform on your actual Salesforce codebase and see exactly what Governor Limit risks we find before committing.",
  alternates: {
    canonical: "https://jataka.io/pilot",
  },
};

export default function PilotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
