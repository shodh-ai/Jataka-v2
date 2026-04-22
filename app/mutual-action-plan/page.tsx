import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Circle, Target, Clock, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Mutual Action Plan",
  description:
    "Jataka Mutual Action Plan (MAP) - A 14-day pilot success criteria checklist for Enterprise License evaluation.",
  alternates: {
    canonical: "https://jataka.io/mutual-action-plan",
  },
  openGraph: {
    title: "Mutual Action Plan | Jataka",
    description:
      "Jataka Mutual Action Plan (MAP) - A 14-day pilot success criteria checklist for Enterprise License evaluation.",
    url: "https://jataka.io/mutual-action-plan",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutual Action Plan | Jataka",
    description:
      "Jataka Mutual Action Plan (MAP) - A 14-day pilot success criteria checklist for Enterprise License evaluation.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const successCriteria = [
  {
    title: "Governor Limit Detection",
    metric: "Jataka identifies at least one Governor Limit breach in active Pull Requests, OR within the retroactive Day-0 Audit of the last 30 days of previously merged code",
    description: "Jataka identifies at least one Governor Limit breach that would have caused a production Sev-1, either in active development or through historical code analysis",
    icon: Target,
  },
  {
    title: "Orphan Field Mapping",
    metric: "Map 50+ Orphan Fields",
    description: "Jataka maps and catalogs at least 50 orphan fields across the Salesforce org",
    icon: Circle,
  },
  {
    title: "Technical Debt Identification",
    metric: "Identify 10+ Technical Debt issues",
    description: "Jataka identifies at least 10 actionable technical debt items with remediation suggestions",
    icon: CheckCircle,
  },
];

const customerActions = [
  {
    title: "Day 1",
    action: "Provide Sandbox Access",
    description: "Grant Jataka OAuth access to Staging/Integration sandbox",
  },
  {
    title: "Day 1-3",
    action: "Connect GitHub Repository",
    description: "Link primary Salesforce repository for Pull Request analysis",
  },
  {
    title: "Day 7",
    action: "Mid-Pilot Review",
    description: "Review initial findings and adjust scope if needed",
  },
  {
    title: "Day 14",
    action: "Go/No-Go Decision",
    description: "Evaluate success criteria and determine Enterprise License purchase",
  },
];

const jatakaActions = [
  {
    title: "Day 1",
    action: "Onboarding & Setup",
    description: "Configure Jataka agents and establish baseline metrics",
  },
  {
    title: "Day 1-14",
    action: "Active Monitoring",
    description: "Continuous analysis of PRs, limits, and technical debt",
  },
  {
    title: "Day 7",
    action: "Progress Report",
    description: "Deliver mid-pilot findings and recommendations",
  },
  {
    title: "Day 14",
    action: "Final Report",
    description: "Comprehensive analysis with ROI calculation and next steps",
  },
];

export default function MutualActionPlanPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">
      

      <main className="mx-auto max-w-[1000px] px-[24px] md:px-[40px] pt-[112px] pb-[80px]">
        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <p className="inline-flex items-center gap-[8px] bg-[#22c55e]/10 border border-[#22c55e]/20 px-[12px] py-[5px] text-[11px] font-bold uppercase tracking-[2px] text-[#22c55e]">
            <Target className="w-[14px] h-[14px]" />
            Pilot Success Criteria
          </p>
          <h1 className="mt-[16px] font-archivo text-[clamp(30px,5vw,48px)] leading-[1] tracking-[-1.2px] uppercase">
            Mutual Action Plan
          </h1>
          <p className="mt-[12px] text-[15px] text-[#555]">
            14-Day Pilot Success Criteria Checklist
          </p>
        </section>

        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <div className="flex items-center gap-[12px] mb-[20px]">
            <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
              <Target className="w-[20px] h-[20px] text-[#FF2424]" />
            </div>
            <h2 className="font-archivo text-[22px] tracking-[-0.5px] uppercase">
              Success Criteria
            </h2>
          </div>
          <p className="text-[14px] text-[#666] mb-[24px]">
            If Jataka achieves the following criteria during the 14-day pilot, the Success Criteria will be deemed met, and the parties intend to proceed to final execution of the Jataka Enterprise License ($30,000/year).
          </p>
          
          <div className="space-y-[16px]">
            {successCriteria.map((item, idx) => (
              <div key={idx} className="flex gap-[16px] p-[20px] bg-[#FAF8F3] rounded-[8px] border border-[#1a1a1a]/5">
                <div className="w-[48px] h-[48px] rounded-[10px] bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-[22px] h-[22px] text-[#FF2424]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[4px]">
                    {item.title}
                  </h3>
                  <p className="text-[14px] font-semibold text-[#FF2424] mb-[6px]">
                    {item.metric}
                  </p>
                  <p className="text-[14px] text-[#555]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[24px]">
          <section className="rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
            <div className="flex items-center gap-[12px] mb-[20px]">
              <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center">
                <Circle className="w-[20px] h-[20px] text-[#22c55e]" />
              </div>
              <h2 className="font-archivo text-[20px] tracking-[-0.5px] uppercase">
                Customer Actions
              </h2>
            </div>
            
            <div className="space-y-[16px]">
              {customerActions.map((item, idx) => (
                <div key={idx} className="border-l-2 border-[#22c55e] pl-[16px]">
                  <div className="flex items-center gap-[8px] mb-[4px]">
                    <Clock className="w-[14px] h-[14px] text-[#22c55e]" />
                    <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#22c55e]">
                      {item.title}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[15px] text-[#1a1a1a] mb-[4px]">
                    {item.action}
                  </h3>
                  <p className="text-[13px] text-[#666]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
            <div className="flex items-center gap-[12px] mb-[20px]">
              <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
                <CheckCircle className="w-[20px] h-[20px] text-[#FF2424]" />
              </div>
              <h2 className="font-archivo text-[20px] tracking-[-0.5px] uppercase">
                Jataka Actions
              </h2>
            </div>
            
            <div className="space-y-[16px]">
              {jatakaActions.map((item, idx) => (
                <div key={idx} className="border-l-2 border-[#FF2424] pl-[16px]">
                  <div className="flex items-center gap-[8px] mb-[4px]">
                    <Clock className="w-[14px] h-[14px] text-[#FF2424]" />
                    <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#FF2424]">
                      {item.title}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[15px] text-[#1a1a1a] mb-[4px]">
                    {item.action}
                  </h3>
                  <p className="text-[13px] text-[#666]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-[12px] border border-[#1a1a1a]/10 bg-[#1a1a1a] p-[24px] md:p-[36px] text-white">
          <div className="flex items-center gap-[12px] mb-[20px]">
            <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/20 flex items-center justify-center">
              <DollarSign className="w-[20px] h-[20px] text-[#FF2424]" />
            </div>
            <h2 className="font-archivo text-[22px] tracking-[-0.5px] uppercase">
              Enterprise License Terms
            </h2>
          </div>
          
          <div className="space-y-[16px]">
            <div className="flex justify-between items-center py-[12px] border-b border-white/10">
              <span className="text-[15px] text-white/80">Product</span>
              <span className="font-semibold text-[16px]">Jataka Enterprise Tier</span>
            </div>
            <div className="flex justify-between items-center py-[12px] border-b border-white/10">
              <span className="text-[15px] text-white/80">Annual Price</span>
              <span className="font-semibold text-[16px]">$30,000 / year</span>
            </div>
            <div className="flex justify-between items-center py-[12px] border-b border-white/10">
              <span className="text-[15px] text-white/80">Billing Terms</span>
              <span className="font-semibold text-[16px]">Net 30 Days</span>
            </div>
            <div className="flex justify-between items-center py-[12px]">
              <span className="text-[15px] text-white/80">Commitment</span>
              <span className="font-semibold text-[16px]">1-Year Minimum</span>
            </div>
          </div>

          <div className="mt-[24px] p-[16px] bg-[#FF2424]/10 border border-[#FF2424]/30 rounded-[8px]">
            <p className="text-[13px] text-white/90">
              <span className="font-bold text-[#FF2424]">Note:</span> This Mutual Action Plan is a non-binding checklist for pilot success evaluation. Formal commitment requires execution of the Master Subscription Agreement and Order Form.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
