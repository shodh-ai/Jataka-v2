import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator | Jataka",
  description: "Calculate your ROI with Jataka. See how much time and money you can save by eliminating Sev-1 incidents, reducing test maintenance, and accelerating development.",
  alternates: {
    canonical: "https://jataka.io/roi-calculator",
  },
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
