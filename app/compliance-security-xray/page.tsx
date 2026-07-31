"use client";

import { Eye, Lock, FileSearch, Shield } from "lucide-react";
import { ProductPageTemplate } from "../components/marketing";

export default function ComplianceSecurityAuditPage() {
  return (
    <ProductPageTemplate
      title="Compliance & security"
      italicWord="audit"
      subtitle="For CISOs and SOX/GDPR auditors. Instantly trace exact User, Profile, and Permission Set access to sensitive PII fields across your Salesforce org. Turn a 3-week manual audit into a 3-second query."
      problemBody="Manual Salesforce security audits take weeks. Tracing which Users, Profiles, and Permission Sets can access SSN, credit card, or health fields means hunting through nested permission chains by hand. Overprivileged access goes unnoticed until an auditor finds it."
      features={[
        {
          title: "PII Field Discovery",
          body: "Jataka automatically scans your entire Org schema to identify sensitive fields containing PII data like SSN, credit card numbers, and personal health information.",
          icon: Eye,
        },
        {
          title: "Access Path Tracing",
          body: "Trace exactly which Users, Profiles, and Permission Sets have read or write access to each sensitive field. See the complete permission chain in seconds.",
          icon: Lock,
        },
        {
          title: "Compliance Reporting",
          body: "Generate audit-ready reports for SOX, GDPR, and HIPAA compliance. Document field-level security for auditors with a single query.",
          icon: FileSearch,
        },
        {
          title: "Violation Detection",
          body: "Automatically flag overprivileged access. Detect when non-admin users have access to sensitive PII they shouldn't see.",
          icon: Shield,
        },
      ]}
      resultBody="Complete access audit in 3 seconds. No manual tracing required. Pass your next SOX, GDPR, or HIPAA review with field-level evidence ready for auditors."
      related={[
        { label: "Architecture Agent", href: "/architecture-agent" },
        { label: "API Contract Guardian", href: "/api-contract-guardian" },
        { label: "Knowledge Graph", href: "/knowledge-graph" },
      ]}
    />
  );
}
