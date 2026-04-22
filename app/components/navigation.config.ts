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
    { label: "Limit Firewall", href: "/use-cases/limit-firewall" },
    { label: "Automated PR Reviews", href: "/use-cases/automated-pr-reviews" },
    { label: "Self-Healing UI Tests", href: "/use-cases/self-healing-ui-tests" },
    { label: "Blast Radius Prediction", href: "/demos/blast-radius-prediction" },
    { label: "Architecture Agent", href: "/architecture-agent" },
    { label: "Compliance & Security Audit", href: "/compliance-security-xray" },
    { label: "API Contract Guardian", href: "/api-contract-guardian" },
    { label: "M&A Org Merge Analysis", href: "/ma-org-merge-intelligence" },
    { label: "Synthetic Production Monitoring", href: "/synthetic-production-monitoring" },
  ],
};

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
    { label: "Documentation", href: "https://docs.jataka.io", external: true },
    { label: "Anti-Patterns Library", href: "/anti-patterns" },
    { label: "Engineering Blog", href: "/blog" },
    { label: "ROI Calculator", href: "/roi-calculator" },
  ],
};

export const DESKTOP_LINKS: NavItem[] = [
  { label: "Customers", href: "/customers" },
  { label: "Pricing", href: "/pricing" },
];

export const MOBILE_SECTIONS: NavDropdown[] = [
  PRODUCT_DROPDOWN,
  COMPARE_DROPDOWN,
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
