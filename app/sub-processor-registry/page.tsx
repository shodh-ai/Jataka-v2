import type { Metadata } from "next";
import Link from "next/link";
import { Database, Cpu, Globe, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Sub-processor Registry",
  description:
    "Jataka's Sub-processor Registry listing all third-party data processors including cloud providers, databases, and enterprise LLMs with zero data retention guarantees.",
  alternates: {
    canonical: "https://jataka.io/sub-processor-registry",
  },
  openGraph: {
    title: "Sub-processor Registry | Jataka",
    description:
      "Jataka's Sub-processor Registry listing all third-party data processors including cloud providers, databases, and enterprise LLMs with zero data retention guarantees.",
    url: "https://jataka.io/sub-processor-registry",
    siteName: "Jataka",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jataka" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sub-processor Registry | Jataka",
    description:
      "Jataka's Sub-processor Registry listing all third-party data processors including cloud providers, databases, and enterprise LLMs with zero data retention guarantees.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const cloudInfrastructure = [
  {
    name: "Google Cloud Platform (GCP)",
    role: "Cloud Hosting, Kubernetes Execution (Kamikaze Pods), Secrets Management",
    location: "United States / Configurable",
  },
  {
    name: "Neo4j (Aura)",
    role: "Knowledge Graph Database processing and persistence for Salesforce schema mapping",
    location: "United States",
  },
];

const enterpriseAI = [
  {
    name: "Google (Gemini)",
    role: "Enterprise LLM API for Code Analysis (Strict ZDR Mode)",
    location: "United States",
  },
  {
    name: "OpenAI",
    role: "Enterprise LLM API for Code Analysis (Strict ZDR Mode)",
    location: "United States",
  },
  {
    name: "Anthropic",
    role: "Enterprise LLM API for Code Analysis (Strict ZDR Mode)",
    location: "United States",
  },
];

const integrations = [
  "GitHub (Version Control API, Pull Request orchestration)",
  "Bitbucket (Version Control API, Pull Request orchestration)",
  "GitLab (Version Control API, Pull Request orchestration)",
  "Salesforce (CRM & Metadata APIs)",
];

export default function SubProcessorRegistryPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">
      

      <main className="mx-auto max-w-[1000px] px-[24px] md:px-[40px] pt-[112px] pb-[80px]">
        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <p className="inline-flex items-center gap-[8px] bg-[#22c55e]/10 border border-[#22c55e]/20 px-[12px] py-[5px] text-[11px] font-bold uppercase tracking-[2px] text-[#22c55e]">
            <Lock className="w-[14px] h-[14px]" />
            Trust Center
          </p>
          <h1 className="mt-[16px] font-archivo text-[clamp(30px,5vw,48px)] leading-[1] tracking-[-1.2px] uppercase">
            Sub-processor Registry
          </h1>
          <p className="mt-[16px] text-[15px] leading-[1.7] text-[#555]">
            Last Updated: April 13, 2026
          </p>
        </section>

        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <p className="text-[15px] leading-[1.8] text-[#2c2c2c] mb-[16px]">
            To support the delivery of Jataka's DevSecOps and Runtime Governance platform, Jataka Inc. ("Jataka") engages and uses third-party data processors with access to certain Customer Data (each, a "Sub-processor").
          </p>
          <p className="text-[15px] leading-[1.8] text-[#2c2c2c]">
            We perform rigorous security due diligence on all Sub-processors prior to engagement, ensuring they maintain SOC 2, ISO 27001, or equivalent enterprise security standards.
          </p>
        </section>

        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <div className="flex items-center gap-[12px] mb-[20px]">
            <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
              <Database className="w-[20px] h-[20px] text-[#FF2424]" />
            </div>
            <h2 className="font-archivo text-[22px] tracking-[-0.5px] uppercase">
              Cloud Infrastructure & Storage
            </h2>
          </div>
          <p className="text-[14px] leading-[1.7] text-[#555] mb-[20px]">
            These Sub-processors host the core Jataka application, execute our ephemeral Kamikaze Pods, and securely store metadata and test artifacts.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1a1a1a]/10">
                  <th className="py-[12px] px-[12px] text-[12px] font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
                    Sub-Processor
                  </th>
                  <th className="py-[12px] px-[12px] text-[12px] font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
                    Role / Purpose
                  </th>
                  <th className="py-[12px] px-[12px] text-[12px] font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
                    Processing Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {cloudInfrastructure.map((item, idx) => (
                  <tr key={idx} className="border-b border-[#1a1a1a]/5 last:border-0">
                    <td className="py-[16px] px-[12px] text-[14px] font-semibold text-[#1a1a1a]">
                      {item.name}
                    </td>
                    <td className="py-[16px] px-[12px] text-[14px] text-[#2c2c2c]">
                      {item.role}
                    </td>
                    <td className="py-[16px] px-[12px] text-[14px] text-[#2c2c2c]">
                      {item.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <div className="flex items-center gap-[12px] mb-[20px]">
            <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
              <Cpu className="w-[20px] h-[20px] text-[#FF2424]" />
            </div>
            <h2 className="font-archivo text-[22px] tracking-[-0.5px] uppercase">
              Enterprise Artificial Intelligence (LLMs)
            </h2>
          </div>
          <p className="text-[14px] leading-[1.7] text-[#555] mb-[20px]">
            Jataka utilizes enterprise-grade Large Language Models (LLMs) to perform Root Cause Analysis and generate technical debt remediation code.
          </p>
          
          <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[8px] p-[16px] mb-[20px]">
            <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#22c55e] mb-[8px]">
              Zero Data Retention (ZDR) Guarantee
            </p>
            <p className="text-[14px] leading-[1.7] text-[#2c2c2c]">
              Jataka maintains strict Enterprise B2B agreements with the following AI Sub-processors. Customer code, metadata, and schema are processed ephemerally for inference only via API. No customer data is ever used to train public or private AI models.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1a1a1a]/10">
                  <th className="py-[12px] px-[12px] text-[12px] font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
                    Sub-Processor
                  </th>
                  <th className="py-[12px] px-[12px] text-[12px] font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
                    Role / Purpose
                  </th>
                  <th className="py-[12px] px-[12px] text-[12px] font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
                    Processing Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {enterpriseAI.map((item, idx) => (
                  <tr key={idx} className="border-b border-[#1a1a1a]/5 last:border-0">
                    <td className="py-[16px] px-[12px] text-[14px] font-semibold text-[#1a1a1a]">
                      {item.name}
                    </td>
                    <td className="py-[16px] px-[12px] text-[14px] text-[#2c2c2c]">
                      {item.role}
                    </td>
                    <td className="py-[16px] px-[12px] text-[14px] text-[#2c2c2c]">
                      {item.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[16px] text-[13px] italic text-[#666]">
            (Note: The specific LLM utilized may route dynamically based on availability, latency, and the specific Jataka autonomous agent executing the task.)
          </p>
        </section>

        <section className="mb-[24px] rounded-[12px] border border-[#1a1a1a]/10 bg-white p-[24px] md:p-[36px]">
          <div className="flex items-center gap-[12px] mb-[20px]">
            <div className="w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
              <Globe className="w-[20px] h-[20px] text-[#FF2424]" />
            </div>
            <h2 className="font-archivo text-[22px] tracking-[-0.5px] uppercase">
              Integrations & Version Control (Non-Sub-processors)
            </h2>
          </div>
          <div className="bg-[#1a1a1a]/5 border border-[#1a1a1a]/10 rounded-[8px] p-[16px] mb-[20px]">
            <p className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#1a1a1a] mb-[8px]">
              Important Note
            </p>
            <p className="text-[14px] leading-[1.7] text-[#2c2c2c]">
              Jataka securely interacts with the following platforms via API to orchestrate Pull Requests and fetch code context. Because Customer holds the primary enterprise relationship and licensing with these entities, they are deemed "Integrations" rather than Jataka Sub-processors.
            </p>
          </div>
          
          <ul className="space-y-[12px]">
            {integrations.map((item, idx) => (
              <li key={idx} className="flex items-start gap-[10px]">
                <div className="w-[6px] h-[6px] rounded-full bg-[#FF2424] flex-shrink-0 mt-[8px]" />
                <span className="text-[14px] text-[#2c2c2c]">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[12px] border border-[#1a1a1a]/10 bg-[#22c55e]/5 p-[24px] md:p-[36px]">
          <h3 className="font-archivo text-[18px] tracking-[-0.5px] uppercase mb-[12px]">
            Subscribe to Updates
          </h3>
          <p className="text-[14px] leading-[1.7] text-[#2c2c2c] mb-[16px]">
            As our platform evolves, our Sub-processor list may change. Jataka will provide existing customers with at least thirty (30) days prior written notice of any new Sub-processors. To subscribe to notifications regarding updates to this list, please email privacy@jataka.io with the subject line "Sub-processor Notification Subscription".
          </p>
          <a
            href="mailto:privacy@jataka.io?subject=Sub-processor%20Notification%20Subscription"
            className="inline-flex items-center gap-[8px] bg-[#22c55e] text-white px-[20px] py-[10px] text-[12px] font-semibold uppercase tracking-[1.4px] rounded-[4px] hover:bg-[#16a34a] transition-colors"
          >
            Subscribe to Notifications
          </a>
        </section>
      </main>
    </div>
  );
}
