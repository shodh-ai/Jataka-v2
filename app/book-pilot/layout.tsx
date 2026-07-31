import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Pilot",
  description: "Schedule a 14-day Shadow Mode pilot of Jataka's Salesforce runtime firewall. See how we catch Governor Limit breaches, heal UI tests, and predict blast radius.",
  alternates: {
    canonical: "https://jataka.io/book-pilot",
  },
};

export default function BookPilotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
