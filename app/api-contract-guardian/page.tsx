"use client";

import { Link2, AlertTriangle, GitBranch, Globe } from "lucide-react";
import { ProductPageTemplate } from "../components/marketing";

export default function ApiContractGuardianPage() {
  return (
    <ProductPageTemplate
      title="API contract"
      italicWord="guardian"
      subtitle="For MuleSoft and ERP architects. Prevent silent integration failures. Jataka flags Salesforce fields mapped to external SAP/ERP systems and blocks PRs that alter their data types or API names."
      problemBody="A developer renames a field or changes its type. Salesforce deploys fine. Downstream SAP, MuleSoft, or Workday integrations silently fail. Nobody notices until invoices stop syncing or orders get stuck. Integration contracts are tribal knowledge, not enforced at the PR level."
      features={[
        {
          title: "Integration Mapping",
          body: "Jataka automatically maps which Salesforce fields are consumed by external systems like SAP, MuleSoft, Workday, and custom ERP integrations.",
          icon: Link2,
        },
        {
          title: "Contract Violation Detection",
          body: "When a developer opens a PR that changes a field's data type, API name, or deletes a field that external systems depend on, Jataka instantly blocks the merge.",
          icon: AlertTriangle,
        },
        {
          title: "Dependency Mapping",
          body: "Visualize the complete web of dependencies between your Salesforce org and external systems. See which integrations will break before you deploy.",
          icon: GitBranch,
        },
        {
          title: "Cross-System Impact Analysis",
          body: "Understand the blast radius of changes across your entire enterprise architecture, not just within Salesforce.",
          icon: Globe,
        },
      ]}
      resultBody="Zero silent failures. Integration contracts are enforced at the PR level, preventing cascading failures that occur when Salesforce changes break external systems."
      related={[
        { label: "Architecture Agent", href: "/architecture-agent" },
        { label: "Knowledge Graph", href: "/knowledge-graph" },
        { label: "Blast Radius Demo", href: "/demos/blast-radius-prediction" },
      ]}
    />
  );
}
