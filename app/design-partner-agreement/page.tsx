import type { Metadata } from "next";
import Link from "next/link";
import { Handshake, MessageSquare, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Design Partner Agreement",
  description:
    "Jataka Design Partner Agreement - A lightweight agreement for early design partners to receive free or discounted Enterprise Tier software in exchange for product feedback and case study participation.",
  alternates: {
    canonical: "https://jataka.io/design-partner-agreement",
  },
  openGraph: {
    title: "Design Partner Agreement | Jataka",
    description:
      "Jataka Design Partner Agreement - A lightweight agreement for early design partners to receive free or discounted Enterprise Tier software in exchange for product feedback and case study participation.",
    url: "https://jataka.io/design-partner-agreement",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Partner Agreement | Jataka",
    description:
      "Jataka Design Partner Agreement - A lightweight agreement for early design partners to receive free or discounted Enterprise Tier software in exchange for product feedback and case study participation.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const DPA_TEXT = `DESIGN PARTNER AGREEMENT
Last Updated: April 13, 2026

This Design Partner Agreement ("DPA") is entered into by and between Jataka Inc. ("Jataka") and the customer identified in the signup form ("Customer") for the purpose of establishing a design partnership to provide early access to Jataka's DevSecOps and Runtime Governance platform.

1. PROGRAM OVERVIEW
1.1 Design Partner Program. Jataka invites Customer to participate in its Design Partner Program to provide early access to Jataka's Enterprise Tier software and help shape product development through active feedback and collaboration.
1.2 Term. This Agreement shall commence on the Effective Date and continue for a period of six (6) months (the "Design Partner Term"), unless terminated earlier in accordance with Section 5.
1.3 Incorporation of DPA. The Data Processing Agreement (DPA) available at jataka.io/dpa is incorporated by reference into this Agreement and shall govern the processing of Customer Data by Jataka.

2. SOFTWARE LICENSE AND PRICING
2.1 Free or Discounted Access. During the Design Partner Term, Jataka will provide Customer with access to the Enterprise Tier of the Jataka platform at no cost (or at a discounted rate as specified in the signup form).
2.2 Enterprise Tier Features. Customer will receive access to all Enterprise Tier features, including automated Salesforce Runtime Governance, static analysis, Technical Debt remediation, AI-driven code fixes, and priority support.
2.3 User Seats. Customer may use up to thirty (30) Developer Seats during the Design Partner Term.
2.4 Salesforce Environments. Customer may connect up to three (3) Salesforce environments (e.g., Dev, Staging, UAT) during the Design Partner Term.
2.5 AS-IS Provision. The Software is provided "AS-IS" and "AS AVAILABLE" without any Service Level Agreement (SLA), warranties, or uptime guarantees. Jataka makes no commitments regarding service availability, response times, or performance levels.

3. CUSTOMER COMMITMENTS
3.1 Product Feedback. Customer agrees to provide regular, substantive feedback on the Software, including but not limited to: (a) feature requests and prioritization; (b) bug reports and usability issues; (c) suggestions for product improvements; and (d) insights on how Customer uses the Software in its Salesforce development workflow.
3.2 Bi-Weekly Sync Calls. Customer agrees to participate in bi-weekly 30-minute sync calls with Jataka's product team to discuss feedback, roadmap, and feature development. Customer will designate a primary point of contact for these calls.
3.3 Testing of New Features. Customer agrees to test new features and beta releases of the Software as requested by Jataka and provide feedback within a reasonable timeframe.
3.4 Reasonable Cooperation. Customer agrees to cooperate with Jataka in a good faith manner to help improve the Software and ensure it meets the needs of Salesforce DevSecOps teams.

4. MARKETING AND CASE STUDY
4.1 Logo Usage. If Customer is satisfied with the Software and the partnership, Customer grants Jataka a non-exclusive, royalty-free license to use Customer's company logo on Jataka's website, marketing materials, and sales presentations.
4.2 Case Study Participation. If Customer is satisfied with the Software and the partnership, Customer agrees to participate in a case study or testimonial, which may include: (a) a written quote about Customer's experience with Jataka; (b) metrics or results achieved using the Software; and (c) a brief interview or discussion about Customer's Salesforce DevSecOps journey.
4.3 Approval. Jataka will provide Customer with a draft of any marketing materials or case study content for Customer's review and approval prior to publication. Customer may request reasonable changes to ensure accuracy and alignment with Customer's brand guidelines.
4.4 Opt-Out. If Customer is not satisfied with the Software or the partnership, Customer may opt out of marketing and case study participation by providing written notice to Jataka at least thirty (30) days before the end of the Design Partner Term.

5. TERMINATION
5.1 Termination for Convenience. Either party may terminate this Agreement at any time by providing thirty (30) days' written notice to the other party.
5.2 Termination for Cause. Either party may terminate this Agreement immediately if the other party materially breaches this Agreement and fails to cure such breach within fifteen (15) days of written notice.
5.3 Effect of Termination. Upon termination, Customer's access to the Software will cease. Jataka will delete all Customer Data in accordance with the incorporated DPA. Customer will not be entitled to any refund or compensation for early termination.
5.4 Transition to Paid Subscription. Upon the end of the Design Partner Term, Customer may transition to a paid subscription by executing Jataka's Master Subscription Agreement and an Order Form. If Customer does not execute a paid subscription, all Customer Data will be deleted in accordance with the incorporated DPA.

6. DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY
6.1 AS-IS Basis. The Software is provided "AS-IS" and "AS AVAILABLE" without any warranties of any kind, whether express, implied, statutory, or otherwise. Jataka disclaims all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, and uptime.
6.2 No SLA. This Agreement does not include any Service Level Agreement (SLA) or uptime guarantees. Jataka makes no commitments regarding service availability, response times, or performance levels.
6.3 Advisory Nature. Customer acknowledges that Jataka is an automated DevSecOps and static analysis tool. AI agents may produce false positives, false negatives, or logically flawed code. Customer is solely responsible for reviewing, testing, and verifying any code or suggestions before deployment.
6.4 Limitation of Liability. Jataka's aggregate liability arising out of this Agreement shall not exceed the amount paid by Customer, if any, for the Software during the Design Partner Term. In no event shall Jataka be liable for any lost profits, revenues, data, or for any indirect, special, incidental, consequential, or punitive damages.

7. CONFIDENTIALITY
7.1 Mutual Confidentiality. Each party agrees to keep the other party's Confidential Information confidential and to use it only for the purposes of this Design Partner Program.
7.2 Definition. "Confidential Information" includes all non-public information disclosed by either party, including Customer Data, source code, product roadmaps, and business strategies.

8. GENERAL PROVISIONS
8.1 Governing Law. This Agreement shall be governed by the laws of the State of Delaware, without regard to its conflict of laws principles.
8.2 Entire Agreement. This Agreement, together with the incorporated DPA, constitutes the entire agreement between the parties.
8.3 Amendment. No amendment to this Agreement shall be effective unless in writing and signed by both parties.
8.4 Assignment. Neither party may assign this Agreement without the other party's prior written consent.
8.5 Severability. If any provision is deemed void, the remaining provisions will remain in effect.

9. ACCEPTANCE
9.1 By clicking "Accept" or by accessing or using the Software during the Design Partner Term, Customer agrees to be bound by this Agreement and the incorporated DPA.
9.2 Effective Date. This Agreement becomes effective on the date Customer accepts these terms or first accesses the Software.`;

export default function DesignPartnerAgreementPage() {
  const lines = DPA_TEXT.split("\n");

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">
      

      <main className="mx-auto max-w-[980px] px-[24px] md:px-[40px] pt-[112px] pb-[80px]">
        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <p className="inline-flex items-center gap-[8px] bg-[#22c55e]/10 border border-[#22c55e]/20 px-[12px] py-[5px] text-[11px] font-bold uppercase tracking-[2px] text-[#22c55e]">
            <Handshake className="w-[14px] h-[14px]" />
            Early Access Program
          </p>
          <h1 className="mt-[16px] font-archivo text-[clamp(30px,5vw,48px)] leading-[1] tracking-[-1.2px] uppercase">
            Design Partner Agreement
          </h1>
          <p className="mt-[12px] text-[15px] text-[#555]">
            Free Enterprise Tier access in exchange for product feedback and case study participation
          </p>
        </section>

        <section className="rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[22px] md:p-[36px]">
          <div className="space-y-[12px]">
            {lines.map((line, idx) => {
              if (!line.trim()) {
                return <div key={idx} className="h-[2px]" />;
              }

              if (/^\d+\.\s[A-Z]/.test(line)) {
                return (
                  <h2
                    key={idx}
                    className="pt-[12px] font-archivo text-[20px] md:text-[24px] leading-[1.1] tracking-[-0.5px] uppercase"
                  >
                    {line}
                  </h2>
                );
              }

              if (/^\d+\.\d+\s/.test(line)) {
                return (
                  <p
                    key={idx}
                    className="text-[14px] md:text-[15px] leading-[1.85] text-[#2c2c2c]"
                  >
                    <span className="font-semibold text-[#1a1a1a]">{line.slice(0, line.indexOf(" ") + 1)}</span>
                    {line.slice(line.indexOf(" ") + 1)}
                  </p>
                );
              }

              if (line.startsWith('"')) {
                return (
                  <p
                    key={idx}
                    className="pl-[12px] border-l-2 border-[#1a1a1a]/10 text-[14px] md:text-[15px] leading-[1.85] text-[#2c2c2c]"
                  >
                    {line}
                  </p>
                );
              }

              return (
                <p key={idx} className="text-[14px] md:text-[15px] leading-[1.85] text-[#2c2c2c]">
                  {line}
                </p>
              );
            })}
          </div>
        </section>

        <section className="mt-[24px] rounded-[12px] border border-[#22c55e]/20 bg-[#22c55e]/5 p-[24px] md:p-[36px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            <div className="flex items-start gap-[12px]">
              <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-[20px] h-[20px] text-[#22c55e]" />
              </div>
              <div>
                <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[4px]">
                  Free Enterprise Tier
                </h3>
                <p className="text-[13px] text-[#666]">
                  6 months free access to Enterprise features
                </p>
              </div>
            </div>
            <div className="flex items-start gap-[12px]">
              <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-[20px] h-[20px] text-[#22c55e]" />
              </div>
              <div>
                <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[4px]">
                  Product Feedback
                </h3>
                <p className="text-[13px] text-[#666]">
                  Bi-weekly 30-min sync calls with product team
                </p>
              </div>
            </div>
            <div className="flex items-start gap-[12px]">
              <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                <Handshake className="w-[20px] h-[20px] text-[#22c55e]" />
              </div>
              <div>
                <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[4px]">
                  Case Study
                </h3>
                <p className="text-[13px] text-[#666]">
                  Logo and quote usage (if successful)
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
