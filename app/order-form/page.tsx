import type { Metadata } from "next";
import Link from "next/link";
import { FileText, DollarSign, Calendar, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Form",
  description:
    "Jataka Order Form for Enterprise License purchase - $30,000/year with Net 30 billing terms and 99.9% uptime SLA.",
  alternates: {
    canonical: "https://jataka.io/order-form",
  },
  openGraph: {
    title: "Order Form | Jataka",
    description:
      "Jataka Order Form for Enterprise License purchase - $30,000/year with Net 30 billing terms and 99.9% uptime SLA.",
    url: "https://jataka.io/order-form",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Order Form | Jataka",
    description:
      "Jataka Order Form for Enterprise License purchase - $30,000/year with Net 30 billing terms and 99.9% uptime SLA.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function OrderFormPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">
      

      <main className="mx-auto max-w-[1000px] px-[24px] md:px-[40px] pt-[112px] pb-[80px]">
        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <p className="inline-flex items-center gap-[8px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[12px] py-[5px] text-[11px] font-bold uppercase tracking-[2px] text-[#FF2424]">
            <FileText className="w-[14px] h-[14px]" />
            Sales
          </p>
          <h1 className="mt-[16px] font-archivo text-[clamp(30px,5vw,48px)] leading-[1] tracking-[-1.2px] uppercase">
            Order Form
          </h1>
          <p className="mt-[12px] text-[15px] text-[#555]">
            Jataka Enterprise License Purchase Agreement
          </p>
        </section>

        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <div className="flex items-center gap-[12px] mb-[24px]">
            <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
              <DollarSign className="w-[20px] h-[20px] text-[#FF2424]" />
            </div>
            <h2 className="font-archivo text-[22px] tracking-[-0.5px] uppercase">
              Order Details
            </h2>
          </div>

          <div className="space-y-[16px]">
            <div className="flex justify-between items-center py-[16px] border-b border-[#1a1a1a]/10">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#22c55e]" />
                <span className="text-[15px] font-medium text-[#1a1a1a]">Product</span>
              </div>
              <span className="font-semibold text-[16px]">Jataka Enterprise Tier</span>
            </div>

            <div className="flex justify-between items-center py-[16px] border-b border-[#1a1a1a]/10">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#22c55e]" />
                <span className="text-[15px] font-medium text-[#1a1a1a]">Price</span>
              </div>
              <span className="font-semibold text-[16px]">$30,000 / year</span>
            </div>

            <div className="flex justify-between items-center py-[16px] border-b border-[#1a1a1a]/10">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#22c55e]" />
                <span className="text-[15px] font-medium text-[#1a1a1a]">Billing</span>
              </div>
              <span className="font-semibold text-[16px]">Net 30 Days</span>
            </div>

            <div className="flex justify-between items-center py-[16px] border-b border-[#1a1a1a]/10">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#22c55e]" />
                <span className="text-[15px] font-medium text-[#1a1a1a]">Commitment</span>
              </div>
              <span className="font-semibold text-[16px]">1-Year Minimum</span>
            </div>

            <div className="flex justify-between items-center py-[16px] border-b border-[#1a1a1a]/10">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#22c55e]" />
                <span className="text-[15px] font-medium text-[#1a1a1a]">Renewal</span>
              </div>
              <span className="font-semibold text-[16px]">Auto-Renew (30-day notice)</span>
            </div>

            <div className="flex justify-between items-center py-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#22c55e]" />
                <span className="text-[15px] font-medium text-[#1a1a1a]">Support</span>
              </div>
              <span className="font-semibold text-[16px]">Enterprise Support Included</span>
            </div>
          </div>
        </section>

        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <div className="flex items-center gap-[12px] mb-[20px]">
            <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center">
              <CheckCircle className="w-[20px] h-[20px] text-[#22c55e]" />
            </div>
            <h2 className="font-archivo text-[22px] tracking-[-0.5px] uppercase">
              Enterprise Tier Includes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <div className="flex items-start gap-[12px] p-[16px] bg-[#FAF8F3] rounded-[8px]">
              <CheckCircle className="w-[20px] h-[20px] text-[#22c55e] flex-shrink-0 mt-[2px]" />
              <span className="text-[14px] text-[#2c2c2c]">Up to 3 Connected Salesforce Environments (e.g., Dev, Staging, UAT)</span>
            </div>
            <div className="flex items-start gap-[12px] p-[16px] bg-[#FAF8F3] rounded-[8px]">
              <CheckCircle className="w-[20px] h-[20px] text-[#22c55e] flex-shrink-0 mt-[2px]" />
              <span className="text-[14px] text-[#2c2c2c]">Real-time Governor Limit monitoring</span>
            </div>
            <div className="flex items-start gap-[12px] p-[16px] bg-[#FAF8F3] rounded-[8px]">
              <CheckCircle className="w-[20px] h-[20px] text-[#22c55e] flex-shrink-0 mt-[2px]" />
              <span className="text-[14px] text-[#2c2c2c]">AI-powered technical debt remediation</span>
            </div>
            <div className="flex items-start gap-[12px] p-[16px] bg-[#FAF8F3] rounded-[8px]">
              <CheckCircle className="w-[20px] h-[20px] text-[#22c55e] flex-shrink-0 mt-[2px]" />
              <span className="text-[14px] text-[#2c2c2c]">Automated PR testing in Kamikaze Pods</span>
            </div>
            <div className="flex items-start gap-[12px] p-[16px] bg-[#FAF8F3] rounded-[8px]">
              <CheckCircle className="w-[20px] h-[20px] text-[#22c55e] flex-shrink-0 mt-[2px]" />
              <span className="text-[14px] text-[#2c2c2c]">Knowledge Graph schema mapping</span>
            </div>
            <div className="flex items-start gap-[12px] p-[16px] bg-[#FAF8F3] rounded-[8px]">
              <CheckCircle className="w-[20px] h-[20px] text-[#22c55e] flex-shrink-0 mt-[2px]" />
              <span className="text-[14px] text-[#2c2c2c]">Self-healing UI test automation</span>
            </div>
            <div className="flex items-start gap-[12px] p-[16px] bg-[#FAF8F3] rounded-[8px]">
              <CheckCircle className="w-[20px] h-[20px] text-[#22c55e] flex-shrink-0 mt-[2px]" />
              <span className="text-[14px] text-[#2c2c2c]">SSO & advanced security features</span>
            </div>
            <div className="flex items-start gap-[12px] p-[16px] bg-[#FAF8F3] rounded-[8px]">
              <CheckCircle className="w-[20px] h-[20px] text-[#22c55e] flex-shrink-0 mt-[2px]" />
              <span className="text-[14px] text-[#2c2c2c]">Priority enterprise support (SLA)</span>
            </div>
          </div>
        </section>

        <section className="rounded-[12px] border border-[#FF2424]/20 bg-[#FF2424]/5 p-[24px] md:p-[36px]">
          <div className="flex items-center gap-[12px] mb-[20px]">
            <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/20 flex items-center justify-center">
              <FileText className="w-[20px] h-[20px] text-[#FF2424]" />
            </div>
            <h2 className="font-archivo text-[22px] tracking-[-0.5px] uppercase text-[#1a1a1a]">
              Legal Agreement
            </h2>
          </div>

          <p className="text-[15px] leading-[1.8] text-[#2c2c2c] mb-[16px]">
            By signing this Order Form, Customer agrees to be bound by the Master Subscription Agreement located at <Link href="/msa" className="text-[#FF2424] underline hover:text-[#d91f1f]">jataka.io/msa</Link> and the Data Processing Agreement at <Link href="/dpa" className="text-[#FF2424] underline hover:text-[#d91f1f]">jataka.io/dpa</Link>.
          </p>

          <div className="bg-white rounded-[8px] p-[20px] border border-[#1a1a1a]/10">
            <p className="text-[13px] text-[#666] mb-[16px]">
              Please review the following documents before signing:
            </p>
            <div className="space-y-[12px]">
              <Link
                href="/msa"
                className="flex items-center gap-[12px] text-[14px] font-medium text-[#1a1a1a] hover:text-[#FF2424] transition-colors"
              >
                <FileText className="w-[16px] h-[16px]" />
                Master Subscription Agreement (MSA)
              </Link>
              <Link
                href="/dpa"
                className="flex items-center gap-[12px] text-[14px] font-medium text-[#1a1a1a] hover:text-[#FF2424] transition-colors"
              >
                <FileText className="w-[16px] h-[16px]" />
                Data Processing Agreement (DPA)
              </Link>
              <Link
                href="/sub-processor-registry"
                className="flex items-center gap-[12px] text-[14px] font-medium text-[#1a1a1a] hover:text-[#FF2424] transition-colors"
              >
                <FileText className="w-[16px] h-[16px]" />
                Sub-processor Registry
              </Link>
              <Link
                href="/sla"
                className="flex items-center gap-[12px] text-[14px] font-medium text-[#1a1a1a] hover:text-[#FF2424] transition-colors"
              >
                <FileText className="w-[16px] h-[16px]" />
                Service Level Agreement (SLA)
              </Link>
            </div>
          </div>

          <div className="mt-[24px] flex flex-col md:flex-row gap-[16px]">
            <a
              href="/book-pilot"
              className="flex-1 bg-[#FF2424] text-white px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 text-center"
            >
              Contact Sales to Sign
            </a>
            <a
              href="/pricing"
              className="flex-1 bg-transparent text-[#1a1a1a] px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] border border-[#1a1a1a]/20 hover:border-[#FF2424]/50 transition-all duration-300 text-center"
            >
              View Full Pricing
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
