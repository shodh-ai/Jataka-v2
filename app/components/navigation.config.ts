export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavDropdown = {
  label: string;
  items: NavItem[];
};

export const PRODUCT_DROPDOWN: NavDropdown = {
  label: "Product",
  items: [
    { label: "Autonomous Support (L1–L3)", href: "/autonomous-support" },
    { label: "Bitemporal Knowledge Graph", href: "/knowledge-graph" },
    { label: "DeltaBox Sandboxing", href: "/deltabox" },
    { label: "Sovereign Audit & Approvals", href: "/sovereign-audit" },
    { label: "M&A Org Merge & Tech Debt", href: "/ma-org-merge-intelligence" },
    { label: "Enterprise Governance", href: "/enterprise-governance" },
  ],
};

/** Hidden for now (senior request) — keep export for easy restore */
export const COMPARE_DROPDOWN: NavDropdown = {
  label: "Compare",
  items: [
    { label: "vs. Copado", href: "/compare/copado" },
    { label: "vs. Clayton", href: "/compare/clayton" },
    { label: "vs. Provar", href: "/compare/provar" },
  ],
};

export const RESOURCES_DROPDOWN: NavDropdown = {
  label: "Resources",
  items: [
    { label: "Shadow Mode Pilot", href: "/shadow-mode" },
    { label: "Trust & Security Center", href: "/security" },
    { label: "ROI & Margin Calculator", href: "/roi-calculator" },
    { label: "Anti-Patterns Library", href: "/anti-patterns" },
    { label: "Engineering Blog", href: "/blog" },
  ],
};

/** Standalone Docs link — shown next to Resources */
export const DOCS_ITEM: NavItem = {
  label: "Docs",
  href: "/docs",
};

/** Hidden for now: Customers, Pricing */
export const DESKTOP_LINKS: NavItem[] = [];

export const MOBILE_SECTIONS: NavDropdown[] = [
  PRODUCT_DROPDOWN,
  RESOURCES_DROPDOWN,
];

export const LOGIN_ITEM: NavItem = {
  label: "Log In",
  href: "https://app.jataka.io",
  external: true,
};

export const PRIMARY_CTA = {
  label: "Book Pilot",
  href: "/book-pilot",
};
