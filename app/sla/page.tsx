import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Shield, CreditCard } from "lucide-react";

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

export default function SLAPage() {
  const lines = SLA_TEXT.split("\n");

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">
      <header className="fixed top-0 left-0 right-0 z-[200] h-[64px] bg-[#FAF8F3]/90 backdrop-blur-[14px] border-b border-[#1a1a1a]/10 px-[24px] md:px-[48px] flex items-center justify-between">
        <Link
          href="/"
          className="text-[13px] font-semibold uppercase tracking-[1.6px] text-[#666] hover:text-[#1a1a1a] transition-colors"
        >
          ← Back to Home
        </Link>
        <Link
          href="/book-pilot"
          className="bg-[#FF2424] text-white px-[16px] py-[8px] text-[11px] font-semibold uppercase tracking-[1.4px] rounded-[4px] hover:bg-[#d91f1f] transition-colors"
        >
          Book Demo
        </Link>
      </header>

      <main className="mx-auto max-w-[980px] px-[24px] md:px-[40px] pt-[112px] pb-[80px]">
        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <p className="inline-flex items-center gap-[8px] bg-[#22c55e]/10 border border-[#22c55e]/20 px-[12px] py-[5px] text-[11px] font-bold uppercase tracking-[2px] text-[#22c55e]">
            <Shield className="w-[14px] h-[14px]" />
            Enterprise Support
          </p>
          <h1 className="mt-[16px] font-archivo text-[clamp(30px,5vw,48px)] leading-[1] tracking-[-1.2px] uppercase">
            Service Level Agreement
          </h1>
          <p className="mt-[12px] text-[15px] text-[#555]">
            Uptime Guarantee, Support Response Times, and Service Credits
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
                <Clock className="w-[20px] h-[20px] text-[#22c55e]" />
              </div>
              <div>
                <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[4px]">
                  99.9% Uptime
                </h3>
                <p className="text-[13px] text-[#666]">
                  ~43 minutes downtime/month allowed
                </p>
              </div>
            </div>
            <div className="flex items-start gap-[12px]">
              <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-[20px] h-[20px] text-[#22c55e]" />
              </div>
              <div>
                <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[4px]">
                  Priority Support
                </h3>
                <p className="text-[13px] text-[#666]">
                  Sev-1: 2hrs, Sev-2: 8hrs, Sev-3: 24hrs
                </p>
              </div>
            </div>
            <div className="flex items-start gap-[12px]">
              <div className="w-[40px] h-[40px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-[20px] h-[20px] text-[#22c55e]" />
              </div>
              <div>
                <h3 className="font-archivo text-[16px] tracking-[-0.3px] uppercase mb-[4px]">
                  Service Credits
                </h3>
                <p className="text-[13px] text-[#666]">
                  5-20% credit for SLA failures
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
