import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Firewall Slides | Jataka",
  description: "Jataka Backend Firewall presentation slides. Learn how our platform catches Governor Limit breaches before deployment and prevents Sev-1 incidents.",
  alternates: {
    canonical: "https://jataka.io/firewall-slides",
  },
};

export default function FirewallSlidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
