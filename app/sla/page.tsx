import type { Metadata } from "next";
import {
  LegalDocument,
  LegalHeading,
  LegalParagraph,
  LegalQuote,
} from "../components/marketing";

export const metadata: Metadata = {
  title: "Service Level Agreement",
  description:
    "Jataka Service Level Agreement (SLA) defining uptime guarantees, support response times, and service credits for Enterprise customers.",
  alternates: {
    canonical: "https://jataka.io/sla",
  },
  openGraph: {
    title: "Service Level Agreement | Jataka",
    description:
      "Jataka Service Level Agreement (SLA) defining uptime guarantees, support response times, and service credits for Enterprise customers.",
    url: "https://jataka.io/sla",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Level Agreement | Jataka",
    description:
      "Jataka Service Level Agreement (SLA) defining uptime guarantees, support response times, and service credits for Enterprise customers.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const SLA_TEXT = `SERVICE LEVEL AGREEMENT (SLA)
Last Updated: April 13, 2026

This Service Level Agreement ("SLA") is incorporated into and forms part of the Master Subscription Agreement between Jataka Inc. ("Jataka") and the customer ("Customer") for the Jataka Enterprise Tier Services. This SLA applies only to Enterprise Tier customers and defines the service levels, support response times, and remedies for service failures.

1. UPTIME GUARANTEE
1.1 Service Availability. Jataka warrants that the Services will be available with a Monthly Uptime Percentage of at least 99.9% (the "Uptime Guarantee").
1.2 Calculation of Monthly Uptime Percentage. Monthly Uptime Percentage is calculated as: (Total Minutes in a Month - Downtime Minutes) / Total Minutes in a Month × 100. "Downtime Minutes" means the total number of minutes during which the Services are unavailable, excluding Scheduled Maintenance (defined below) and Force Majeure events.
1.3 Exclusions. The Uptime Guarantee does not apply to: (a) Scheduled Maintenance periods announced at least 24 hours in advance; (b) Force Majeure events (e.g., natural disasters, acts of war, third-party infrastructure or third-party upstream AI/LLM API failures); (c) outages caused by Customer's own systems, networks, or integrations; (d) outages resulting from Customer's failure to implement Jataka's recommended security patches or updates; or (e) beta features or services designated as experimental.

2. SUPPORT RESPONSE TIMES
2.1 Severity Levels. Support requests are categorized by severity as follows:
Sev-1 (Critical): The Services are completely down or unavailable, preventing Customer from conducting business operations. Response Time: Within 2 hours of ticket submission.
Sev-2 (High): A major feature is broken or significantly impaired, but Customer can continue limited operations. Response Time: Within 8 hours of ticket submission.
Sev-3 (Medium): General questions, non-critical bugs, or minor feature issues. Response Time: Within 24 hours of ticket submission.

2.2 Support Channels. Enterprise Tier customers may submit support requests via: (a) Slack support channel for Sev-1 and Sev-2 issues; (b) Email to support@jataka.io for all severity levels; (c) Customer portal ticketing system.

2.3 Response Time Measurement. Response Time is measured from the time Customer submits a valid support request to the time Jataka provides an initial response acknowledging the issue and assigning a support engineer.

3. SERVICE CREDITS
3.1 Sole and Exclusive Remedy. Customer's sole and exclusive remedy for any failure by Jataka to meet the Uptime Guarantee or Support Response Times is the receipt of Service Credits as specified in this Section. Customer waives any right to seek damages, terminate the Agreement, or pursue any other remedy for service failures.

3.2 Uptime Service Credits. If the Monthly Uptime Percentage falls below 99.9%, Customer shall be entitled to a Service Credit calculated as follows:
Monthly Uptime Percentage of 99.0% to < 99.9%: 5% Service Credit
Monthly Uptime Percentage of 95.0% to < 99.0%: 10% Service Credit
Monthly Uptime Percentage of < 95.0%: 20% Service Credit

3.3 Response Time Service Credits. If Jataka fails to meet the Support Response Times for a Sev-1 or Sev-2 issue, Customer shall be entitled to a 5% Service Credit for the applicable month, provided Customer submits a written claim within 30 days of the response time failure.

3.4 Service Credit Application. Service Credits will be applied as a credit to Customer's next invoice. Service Credits are non-refundable and may not be exchanged for cash. Service Credits may not exceed thirty percent (30%) of any single month's fees (calculated as 1/12th of the annual Subscription Fee, if billed annually) in the aggregate.

3.5 Claim Process. To receive a Service Credit, Customer must submit a written claim to billing@jataka.io within 30 days of the end of the applicable month, including: (a) the date and duration of the outage or support delay; (b) evidence of the service failure; and (c) the applicable Service Credit calculation. Jataka will review and respond to all claims within 15 business days.

4. MAINTENANCE
4.1 Scheduled Maintenance. Jataka may perform Scheduled Maintenance to maintain, upgrade, or improve the Services. Scheduled Maintenance will be announced at least 24 hours in advance via email or Slack notification and will be scheduled during off-peak hours (typically 10:00 PM to 6:00 AM Eastern Time on weekends) to the extent reasonably practicable.

4.2 Emergency Maintenance. Jataka may perform Emergency Maintenance without prior notice to address critical security vulnerabilities or immediate service failures. Emergency Maintenance will be documented and communicated to Customer after completion.

5. GENERAL PROVISIONS
5.1 Modifications. Jataka reserves the right to modify this SLA upon 30 days' written notice to Customer. Modified terms will become effective upon the date specified in the notice.
5.2 Entire Agreement. This SLA is incorporated into the Master Subscription Agreement. In the event of any conflict between this SLA and the Master Subscription Agreement, the Master Subscription Agreement shall prevail.
5.3 Governing Law. This SLA shall be governed by the laws of the State of Delaware, without regard to its conflict of laws principles.`;

function renderLines(text: string) {
  return text.split("\n").map((line, idx) => {
    if (!line.trim()) return <div key={idx} className="h-2" />;
    if (line === "SERVICE LEVEL AGREEMENT (SLA)" || line.startsWith("Last Updated:")) {
      return null;
    }
    if (/^\d+\.\s[A-Z]/.test(line) || /^[A-Z][A-Z\s&()/]+$/.test(line)) {
      return <LegalHeading key={idx}>{line}</LegalHeading>;
    }
    if (/^\d+\.\d+\s/.test(line)) {
      const space = line.indexOf(" ");
      return (
        <LegalParagraph key={idx}>
          <span className="font-semibold text-[#111]">{line.slice(0, space + 1)}</span>
          {line.slice(space + 1)}
        </LegalParagraph>
      );
    }
    if (line.startsWith('"')) {
      return <LegalQuote key={idx}>{line}</LegalQuote>;
    }
    if (line.includes(":")) {
      const parts = line.split(":");
      if (parts.length === 2 && parts[0].length < 50) {
        return (
          <LegalParagraph key={idx}>
            <span className="font-semibold text-[#111]">{parts[0]}:</span>
            {parts[1]}
          </LegalParagraph>
        );
      }
    }
    return <LegalParagraph key={idx}>{line}</LegalParagraph>;
  });
}

export default function SLAPage() {
  return (
    <LegalDocument
      title="Service Level"
      italicWord="Agreement"
      subtitle="Enterprise uptime guarantee, support response times, and service credits."
      updated="April 13, 2026"
    >
      {renderLines(SLA_TEXT)}
    </LegalDocument>
  );
}
