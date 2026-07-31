import type { Metadata } from "next";
import { LegalDocument, renderLegalLines } from "../components/marketing";

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

export default function Page() {
  return (
    <LegalDocument
      title="Design Partner"
      italicWord="Agreement"
      subtitle="Terms for Jataka design-partner collaboration and early access."
    >
      {renderLegalLines(DPA_TEXT, ['DESIGN PARTNER', 'Last Updated:', 'Last updated:'])}
    </LegalDocument>
  );
}
