import type { Metadata } from "next";
import {
  LegalDocument,
  LegalHeading,
  LegalParagraph,
  LegalQuote,
} from "../components/marketing";

export const metadata: Metadata = {
  title: "Data Processing Agreement",
  description:
    "Jataka Data Processing Agreement (DPA) governing how we process customer data, including zero data retention for AI and ephemeral execution.",
  alternates: {
    canonical: "https://jataka.io/dpa",
  },
};

const DPA_TEXT = `DATA PROCESSING AGREEMENT (DPA)
Last Updated: April 13, 2026
This Data Processing Agreement ("DPA") forms part of the Master Subscription Agreement or other written or electronic agreement ("Agreement") between Jataka Inc. ("Jataka", "Processor", or "Service Provider") and the customer ("Customer", "Controller", or "Business") for the use of Jataka's DevSecOps and Runtime Governance Services.
DEFINITIONS
"Customer Data" means all code, Salesforce metadata, schema configurations, Jira ticket context, and test data provided by the Customer to Jataka via API or OAuth connections.
"Kamikaze Pods" means Jataka's ephemeral Kubernetes execution environments used to run Sandbox tests and profile Apex Debug Logs.
"Personal Data" (or "Personal Information") means any information relating to an identified or identifiable natural person processed by Jataka on behalf of Customer.
"Production Data" means live consumer data, Protected Health Information (PHI), Payment Card Industry (PCI) data, or real end-user Personal Data residing in Customer's production Salesforce Org.
"Sandbox Data" means mock, anonymized, or synthetic data residing in Customer's non-production Salesforce environments (e.g., Staging, Integration).
"Sub-processor" means any third-party data processor engaged by Jataka to assist in fulfilling its obligations with respect to providing the Services.
SCOPE AND NATURE OF PROCESSING
2.1 Purpose of Processing. Jataka provides an automated Salesforce Runtime Governance engine, static analysis, and Technical Debt remediation service. Jataka processes Customer Data solely to construct a Knowledge Graph of Customer's Salesforce schema, execute Pull Request (PR) tests in Sandbox environments, profile Governor Limits, and generate AI-driven code fixes.
2.2 Prohibition of Production Data. Jataka is not designed to process Production Data or live consumer Personal Data. Customer agrees to scope Jataka's OAuth access strictly to lower-level Sandboxes. Any processing of Personal Data is strictly incidental and limited to developer contact information (e.g., GitHub usernames, employee email addresses). If Customer inadvertently transmits Production Data into the Services (e.g., via UI test video artifacts), Jataka will treat such data in accordance with this DPA, but Customer remains fully responsible for such unauthorized submission.
2.3 Applicability of US Privacy Laws (CCPA). To the extent Jataka processes Personal Information subject to the California Consumer Privacy Act (CCPA) and other applicable US State Privacy Laws, Jataka acts as a "Service Provider." Jataka shall not sell or share Customer Personal Information, nor retain, use, or disclose it for any purpose other than providing the Services specified in the Agreement.
2.4 Applicability of India DPDP Act (2023). To the extent Jataka processes Personal Data in India or of Indian residents, Jataka acts as a "Data Processor" under the Digital Personal Data Protection Act, 2023 (DPDP Act). Jataka shall process such Personal Data solely in accordance with Customer's lawful instructions and for the limited purposes specified in this DPA. Jataka shall implement appropriate technical and organizational measures to ensure compliance with the DPDP Act, including restrictions on cross-border data transfers, data retention requirements, and data subject rights. Jataka shall not process Personal Data for any purpose other than providing the Services.
ARCHITECTURE AND DATA RETENTION
3.1 Ephemeral Execution. Jataka shall execute test runs and Apex Debug Log profiling using ephemeral Kamikaze Kubernetes Pods. Upon the completion of a PR test and the generation of the limit report, Jataka shall instantly terminate the pod and destroy all associated runtime memory.
3.2 Zero Data Retention for AI. Jataka utilizes Enterprise-grade Large Language Models (LLMs) for Root Cause Analysis and code remediation. Jataka guarantees that all integrations with LLM Sub-processors operate under strict Zero Data Retention (ZDR) agreements. Customer's proprietary Apex code, schema, and Jira context are processed for inference only and shall never be used to train public or private third-party AI models.
3.3 Persistent Storage. Jataka's persistent storage is strictly limited to:
Salesforce metadata, custom object definitions, dependency graphs, and test execution history stored in Jataka's encrypted Knowledge Graph Database.
Visual test artifacts, including UI test screenshots and MP4 video recordings, securely stored in Jataka's cloud buckets and automatically deleted after a standard retention period (e.g., 30 days).
Encrypted credentials (e.g., OAuth tokens, GitHub access keys) stored in AWS/GCP Secrets Manager.
SECURITY MEASURES & INCIDENT RESPONSE
4.1 Technical and Organizational Measures. Jataka shall implement and maintain enterprise-grade security practices, including:
Encryption at Rest: All stored credentials and Knowledge Graph data are encrypted using AES-256.
Key Rotation: Automatic rotation of encryption keys every 90 days.
Isolation: Container and database isolation per Customer tenant.
Access Control: Jataka personnel do not have programmatic access to Customer's raw Sandbox data or version control repositories beyond what is required for automated Service execution and authorized technical support.
4.2 Security Incident Notification. If Jataka becomes aware of a confirmed, unauthorized disclosure, alteration, or destruction of Customer Data ("Security Incident"), Jataka will notify Customer without undue delay, and in no event later than forty-eight (48) hours after discovery.
4.3 Data Subject Requests (DSAR). If Jataka receives a direct request from a data subject regarding their Personal Data, Jataka will not respond directly (unless legally required) and will promptly forward the request to Customer.
SUB-PROCESSORS
5.1 Authorized Sub-processors. Customer provides a general authorization for Jataka to engage Sub-processors (e.g., Cloud Hosts, Knowledge Graph Databases, Enterprise LLMs) to deliver the Service. A current list of Sub-processors is maintained at Jataka's Sub-processor Registry.
5.2 Sub-processor Obligations. Jataka shall enter into written agreements with all Sub-processors containing data protection obligations not less protective than those in this DPA. Jataka remains fully liable to the Customer for the performance of the Sub-processors' data protection obligations.
5.3 Notice of Changes. Jataka will provide Customer with at least thirty (30) days' notice of any new Sub-processor. Customer may object to a new Sub-processor on reasonable data protection grounds. If Jataka is unable to provide the Services without the objected-to Sub-processor, Jataka will notify the Customer. The Customer may then terminate the applicable Order Form with respect to those Services within thirty (30) days, and receive a pro-rata refund of any prepaid, unused fees.
CUSTOMER AUDIT RIGHTS
6.1 Audits and Penetration Tests. Upon Customer's written request (no more than once annually), Jataka shall make available its most current security compliance documentation, which may include SOC 2 Type I reports, SOC 2 Type II reports (upon completion of applicable observation periods), annual third-party Penetration Testing summaries, and Security Architecture Whitepapers.
DATA DELETION AND RETURN
7.1 Deletion upon Termination. Upon termination of the Agreement, or upon Customer's written request, Jataka shall permanently delete all Customer Data (including Knowledge Graph metadata, stored credentials, test execution history, and video artifacts) from its systems within thirty (30) days, unless retention is required by law.
INTERNATIONAL DATA TRANSFERS (GDPR/UK GDPR)
8.1 Standard Contractual Clauses. To the extent that the processing involves the transfer of Personal Data from the European Economic Area (EEA), Switzerland, or the UK to Jataka in the United States, the parties agree that the applicable EU Standard Contractual Clauses (Module Two: Transfer controller to processor) are incorporated by reference. For transfers from the UK, the UK International Data Transfer Addendum shall also apply.`;

function renderLines(text: string) {
  return text.split("\n").map((line, idx) => {
    if (!line.trim()) return <div key={idx} className="h-2" />;
    if (line === "DATA PROCESSING AGREEMENT (DPA)" || line.startsWith("Last Updated:")) {
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

export default function DataProcessingAgreementPage() {
  return (
    <LegalDocument
      title="Data Processing"
      italicWord="Agreement"
      subtitle="How Jataka processes Customer Data: sandbox-only OAuth, ephemeral execution, and Zero Data Retention for AI."
      updated="April 13, 2026"
    >
      {renderLines(DPA_TEXT)}
    </LegalDocument>
  );
}
