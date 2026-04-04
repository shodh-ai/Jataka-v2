"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JatakaLandingPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const targetSection = sessionStorage.getItem("targetSection");
    if (targetSection) {
      setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("targetSection");
      }, 100);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // JSON-LD Schema for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Jataka",
    "url": "https://jataka.io",
    "logo": "https://jataka.io/WhiteLOGO.svg",
    "description": "AI-Powered Salesforce Development Platform - Catch Governor Limit breaches before deployment, automatically heal UI tests, and predict blast radius of code changes.",
    "sameAs": [
      "https://twitter.com/jataka_ai",
      "https://www.linkedin.com/company/jataka"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "url": "https://jataka.io/book-pilot"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Jataka",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web-based",
    "description": "Backend Firewall and Developer Experience platform for Salesforce. Helps teams catch Governor Limit breaches before deployment, automatically heal UI tests, and predict blast radius of code changes.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Book a demo to discuss pricing"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "47"
    },
    "featureList": [
      "Governor Limit Profiling",
      "Self-Healing UI Tests",
      "Blast Radius Prediction",
      "Kamikaze Pods",
      "Vision AI",
      "Neo4j Dependency Graph",
      "MCP Protocol Integration"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Jataka?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jataka is a Backend Firewall and Developer Experience platform for Salesforce. It helps teams catch Governor Limit breaches before deployment, automatically heal UI tests when Salesforce releases break selectors, and predict the blast radius of code changes before they're made."
        }
      },
      {
        "@type": "Question",
        "name": "How does Jataka catch Governor Limit breaches?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jataka uses Kamikaze Pods - isolated Sandbox environments that execute Apex code with Production-like data volumes. We parse Debug Logs and Sforce-Limit-Info headers to measure actual SOQL queries, DML statements, and CPU milliseconds. PRs are automatically blocked when thresholds are exceeded."
        }
      },
      {
        "@type": "Question",
        "name": "What testing frameworks does Jataka's Vision AI work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jataka's Vision AI works with all major testing frameworks including Playwright, Selenium, and Cypress. It recognizes UI elements visually and automatically heals tests when Salesforce releases break selectors."
        }
      },
      {
        "@type": "Question",
        "name": "How does blast radius prediction work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jataka maintains a Neo4j dependency graph of your entire Salesforce org. Every Apex class, trigger, flow, and integration is mapped. Integration with Cursor IDE via MCP protocol lets developers ask 'What breaks if I change this?' and get answers before writing code."
        }
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-[200] h-[64px] bg-[#FAF8F3]/90 backdrop-blur-[14px] border-b border-[#1a1a1a]/10 px-[24px] md:px-[48px] flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("hero")}>
          <svg className="h-[22px] w-auto block" viewBox="489.5 574 2305.4 484.92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M877.432 574C930.994 574 974.419 617.425 974.419 670.987C974.418 697.813 963.525 722.093 945.923 739.648C924.44 761.073 901.681 786.114 901.681 816.454C901.681 846.795 924.441 871.837 945.923 893.264C963.526 910.822 974.418 935.105 974.419 961.932C974.419 1015.49 930.994 1058.92 877.432 1058.92C850.604 1058.92 826.319 1048.02 808.76 1030.42C787.337 1008.94 762.298 986.181 731.959 986.181C701.621 986.181 676.582 1008.94 655.159 1030.42C637.6 1048.02 613.315 1058.92 586.487 1058.92C532.925 1058.92 489.5 1015.49 489.5 961.932C489.502 908.371 532.926 864.953 586.487 864.953C613.316 864.954 637.601 875.848 655.159 893.453C676.582 914.934 701.622 937.691 731.959 937.691C762.297 937.691 787.402 914.81 808.854 893.357C830.307 871.902 853.191 846.795 853.191 816.454C853.191 786.114 830.432 761.074 808.949 739.649C791.346 722.093 780.454 697.813 780.453 670.987C780.453 617.426 823.871 574.002 877.432 574Z" fill="#1a1a1a"/>
            <path d="M877.508 908.275C878.976 937.203 902.175 960.398 931.103 961.862L934.013 961.933C902.769 961.933 877.44 987.265 877.437 1018.51C877.435 987.266 852.105 961.933 820.862 961.933C852.106 961.931 877.437 936.601 877.437 905.358L877.508 908.275Z" fill="#FF2424"/>
            <path d="M1292.08 685.6V907.648C1292.08 932.992 1285.03 952.72 1270.92 966.832C1257.09 980.944 1237.36 988 1211.73 988H1156V931.84H1191.86C1204.53 931.84 1213.6 928.96 1219.08 923.2C1224.55 917.152 1227.28 907.792 1227.28 895.12V685.6H1292.08Z" fill="#1a1a1a"/>
            <path d="M1332.31 988L1442.9 685.6H1520.66L1630.39 988H1560.83L1537.51 921.904H1422.59L1399.27 988H1332.31ZM1439.87 869.632H1519.79L1479.62 754.72L1439.87 869.632Z" fill="#1a1a1a"/>
            <path d="M1621.19 685.6H1860.52V741.328H1773.26V988H1708.46V741.328H1621.19V685.6Z" fill="#1a1a1a"/>
            <path d="M1851.07 988L1961.66 685.6H2039.42L2149.15 988H2079.6L2056.27 921.904H1941.36L1918.03 988H1851.07ZM1958.64 869.632H2038.56L1998.38 754.72L1958.64 869.632Z" fill="#1a1a1a"/>
            <path d="M2199.4 686.032H2264.2V821.68L2385.16 686.032H2463.79L2352.76 810.448L2471.13 988H2393.37L2306.97 860.56L2264.2 908.512V988H2199.4V686.032Z" fill="#1a1a1a"/>
            <path d="M2496.82 988L2607.41 685.6H2685.17L2794.9 988H2725.35L2702.02 921.904H2587.11L2563.78 988H2496.82ZM2604.39 869.632H2684.31L2644.13 754.72L2604.39 869.632Z" fill="#1a1a1a"/>
          </svg>
        </div>
        
        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-[24px] list-none items-center m-0 p-0">
          <li className="relative group">
            <button onClick={() => setDropdownOpen('product')} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px] flex items-center gap-[6px]">
              Product
              <svg className="w-[12px] h-[12px] transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6m0 0l6 6m-6-6v6m0 0l-6-6v6"/>
              </svg>
            </button>
            {/* Product Dropdown */}
            {dropdownOpen === 'product' && (
              <div className="absolute top-full left-0 mt-[8px] w-[200px] bg-white rounded-[8px] shadow-lg border border-[#1a1a1a]/10 py-[8px] z-[150]">
                <button onClick={() => router.push('/use-cases/limit-firewall')} className="w-full text-left px-[16px] py-[8px] hover:bg-[#FAF8F3] text-[13px] text-[#1a1a1a] transition-colors">Limit Firewall</button>
                <button onClick={() => router.push('/use-cases/automated-pr-reviews')} className="w-full text-left px-[16px] py-[8px] hover:bg-[#FAF8F3] text-[13px] text-[#1a1a1a] transition-colors">Automated PR Reviews</button>
                <button onClick={() => router.push('/use-cases/self-healing-ui-tests')} className="w-full text-left px-[16px] py-[8px] hover:bg-[#FAF8F3] text-[13px] text-[#1a1a1a] transition-colors">Self-Healing UI Tests</button>
              </div>
            )}
          </li>
          <li className="relative group">
            <button onClick={() => setDropdownOpen('compare')} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px] flex items-center gap-[6px]">
              Compare
              <svg className="w-[12px] h-[12px] transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6m0 0l6 6m-6-6v6m0 0l-6-6v6"/>
              </svg>
            </button>
            {/* Compare Dropdown */}
            {dropdownOpen === 'compare' && (
              <div className="absolute top-full left-0 mt-[8px] w-[200px] bg-white rounded-[8px] shadow-lg border border-[#1a1a1a]/10 py-[8px] z-[150]">
                <button onClick={() => router.push('/compare/copado')} className="w-full text-left px-[16px] py-[8px] hover:bg-[#FAF8F3] text-[13px] text-[#1a1a1a] transition-colors">vs. Copado</button>
                <button onClick={() => router.push('/compare/provar')} className="w-full text-left px-[16px] py-[8px] hover:bg-[#FAF8F3] text-[13px] text-[#1a1a1a] transition-colors">vs. Provar</button>
                <button onClick={() => router.push('/compare/clayton')} className="w-full text-left px-[16px] py-[8px] hover:bg-[#FAF8F3] text-[13px] text-[#1a1a1a] transition-colors">vs. Clayton</button>
              </div>
            )}
          </li>
          <li className="relative group">
            <button onClick={() => setDropdownOpen('resources')} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px] flex items-center gap-[6px]">
              Resources
              <svg className="w-[12px] h-[12px] transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6m0 0l6 6m-6-6v6m0 0l-6-6v6"/>
              </svg>
            </button>
            {/* Resources Dropdown */}
            {dropdownOpen === 'resources' && (
              <div className="absolute top-full left-0 mt-[8px] w-[200px] bg-white rounded-[8px] shadow-lg border border-[#1a1a1a]/10 py-[8px] z-[150]">
                <button onClick={() => window.open('https://docs.jataka.io', '_blank')} className="w-full text-left px-[16px] py-[8px] hover:bg-[#FAF8F3] text-[13px] text-[#1a1a1a] transition-colors">Docs</button>
                <button onClick={() => router.push('/anti-patterns')} className="w-full text-left px-[16px] py-[8px] hover:bg-[#FAF8F3] text-[13px] text-[#1a1a1a] transition-colors">Anti-Patterns Library</button>
              </div>
            )}
          </li>
          <li><button onClick={() => window.open('https://app.jataka.io', '_blank')} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Log In</button></li>
          <li><button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book a Demo</button></li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} className="text-[#1a1a1a]" /> : <Menu size={24} className="text-[#1a1a1a]" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-[64px] left-0 w-full bg-[#FAF8F3] border-b border-[#1a1a1a]/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl z-[190]">
            <button onClick={() => scrollToSection("problem")} className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Problem</button>
            <button onClick={() => scrollToSection("features")} className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Features</button>
            <button onClick={() => router.push("/pricing")} className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Pricing</button>
            <button onClick={() => router.push("/security")} className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Security</button>
            <button onClick={() => router.push("/customers")} className="text-left text-[15px] font-medium text-[#1a1a1a] py-2">Customers</button>
            <button onClick={() => router.push("/pilot")} className="w-full py-3 mt-2 rounded-[4px] bg-[#FF2424] text-white font-archivo uppercase tracking-[1.5px] text-[12px] flex items-center justify-center">
              Start Pilot
            </button>
          </div>
        )}
      </nav>

      {/* ── SECTION 1: HERO ── */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-[40px] pt-[128px] pb-[100px] relative overflow-hidden bg-[#FAF8F3]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(255,36,36,0.055)_0%,transparent_68%)] pointer-events-none z-0"></div>
        
        <div className="relative z-10 inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[36px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
          <span className="text-[8px]">▶</span> Runtime Governance Engine for Salesforce
        </div>

        <h1 className="font-archivo text-[clamp(44px,6.5vw,84px)] leading-[0.93] tracking-[-3px] uppercase mb-[32px] max-w-[920px] relative z-10 text-[#1a1a1a]">
          <span>Stop Salesforce</span><br />
          <span>Rollbacks Before</span><br />
          <span className="text-[#FF2424]">They Hit Production.</span>
        </h1>

        <p className="text-[clamp(16px,1.5vw,18.5px)] leading-[1.72] text-[#444] max-w-[660px] mb-[52px] relative z-10">
          Traditional UI tests check if buttons click. Static scanners guess if your code works. 
          <strong className="text-[#1a1a1a] font-bold"> Jataka physically executes your PRs in a Sandbox</strong>, profiles your Apex Debug Logs, 
          and automatically <strong className="text-[#1a1a1a] font-bold">blocks deployments that breach Governor Limits.</strong>
        </p>

        <div className="flex gap-[16px] flex-wrap justify-center mb-[72px] relative z-10 flex-col md:flex-row w-full md:w-auto">
          <button onClick={() => router.push("/pilot")} className="bg-[#FF2424] text-white px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors w-full md:w-auto justify-center">
            ▶ Start Your Pilot
          </button>
          <button onClick={() => router.push("/docs")} className="bg-[#1a1a1a] text-white px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#333] transition-colors w-full md:w-auto justify-center">
            ⬡ Read the Docs
          </button>
        </div>

        {/* ── VIDEO SECTION ── */}
        <div id="demo" className="relative z-10 w-full max-w-[1000px] aspect-video mb-[72px] rounded-[8px] overflow-hidden border border-[#1a1a1a]/10 bg-black shadow-[0_0_40px_rgba(255,36,36,0.1)]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/SdXRbVhZMzg?rel=0"
            title="Jataka Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-[16px]">
          <span className="text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#666]">Works seamlessly as a Quality Gate for</span>
          <div className="flex gap-[12px] flex-wrap justify-center">
            {["Copado", "Gearset", "GitHub", "Bitbucket", "AppExchange"].map((logo) => (
              <span key={logo} className="font-archivo text-[11.5px] tracking-[1px] uppercase text-[#666] px-[16px] py-[7px] border border-[#1a1a1a]/10 transition-all duration-200 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/20 rounded-[4px] bg-white">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PROBLEM ── */}
      <section id="problem" className="relative overflow-hidden bg-white border-y border-[#1a1a1a]/10">
        <div className="max-w-[1200px] mx-auto px-[24px] md:px-[48px] py-[80px]">
          <div className="text-[12px] font-bold uppercase tracking-[2.5px] text-[#FF2424] mb-[24px]">The Status Quo is Broken</div>
          
          <div className="font-archivo text-[clamp(88px,13vw,152px)] leading-[0.82] tracking-[-6px] uppercase mb-[24px] text-[#1a1a1a]">
            75%
          </div>
          <h2 className="font-archivo text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-1px] uppercase mb-[16px] text-[#1a1a1a]">Code Coverage<br/>is an Illusion.</h2>
          <p className="text-[17px] text-[#666] max-w-[600px] mb-[48px]">Your tests are passing. Your architecture is bleeding. Here is exactly how.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#1a1a1a]/10 rounded-[8px] overflow-hidden">
            <div className="p-[40px] md:p-[48px] md:border-r border-[#1a1a1a]/10 border-b md:border-b-0">
              <div className="text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#666] mb-[22px]">01 — Scanner</div>
              <h3 className="font-archivo text-[19px] uppercase tracking-[-0.3px] text-[#1a1a1a] mb-[14px] leading-[1.2]">Static Scanners<br/>Only Guess</h3>
              <p className="text-[14.5px] leading-[1.72] text-[#444]">Tools like SonarQube and PMD read text. They cannot calculate runtime execution paths, hidden loops, or trigger-chains hidden inside managed packages.</p>
            </div>
            <div className="p-[40px] md:p-[48px] md:border-r border-[#1a1a1a]/10 border-b md:border-b-0">
              <div className="text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#666] mb-[22px]">02 — UI Testing</div>
              <h3 className="font-archivo text-[19px] uppercase tracking-[-0.3px] text-[#1a1a1a] mb-[14px] leading-[1.2]">UI Testing<br/>is Blind</h3>
              <p className="text-[14.5px] leading-[1.72] text-[#444]">Selenium and standard QA bots only test the screen. If a user clicks a button and your code consumes 99 out of 100 SOQL queries, the UI test passes. But your architecture is bleeding.</p>
            </div>
            <div className="p-[40px] md:p-[48px] bg-[#FF2424]/5 border-l-[3px] border-[#FF2424]">
              <div className="text-[10.5px] font-bold uppercase tracking-[2.5px] text-[#666] mb-[22px]">03 — The Result</div>
              <h3 className="font-archivo text-[19px] uppercase tracking-[-0.3px] text-[#FF2424] mb-[14px] leading-[1.2]">101 SOQL<br/>Errors</h3>
              <p className="text-[14.5px] leading-[1.72] text-[#444]">Your tests pass, Copado deploys the code, a real user clicks the button with slightly heavier data, the Governor Limit breaks, and your entire Org crashes.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row border border-[#1a1a1a]/10 rounded-[8px] overflow-hidden mt-[16px]">
            <div className="flex-1 p-[32px] md:p-[36px] border-b md:border-b-0 md:border-r border-[#1a1a1a]/10">
              <div className="font-archivo text-[46px] leading-[1] tracking-[-2px] text-[#FF2424] mb-[8px]">96/100</div>
              <div className="text-[12px] font-bold uppercase tracking-[1px] text-[#666] leading-[1.4]">SOQL Queries consumed<br/>in a "passing" test</div>
            </div>
            <div className="flex-1 p-[32px] md:p-[36px] border-b md:border-b-0 md:border-r border-[#1a1a1a]/10">
              <div className="font-archivo text-[46px] leading-[1] tracking-[-2px] text-[#FF2424] mb-[8px]">0ms</div>
              <div className="text-[12px] font-bold uppercase tracking-[1px] text-[#666] leading-[1.4]">Warning time before<br/>Governor Limit crash</div>
            </div>
            <div className="flex-1 p-[32px] md:p-[36px] border-b md:border-b-0 md:border-r border-[#1a1a1a]/10">
              <div className="font-archivo text-[46px] leading-[1] tracking-[-2px] text-[#FF2424] mb-[8px]">100%</div>
              <div className="text-[12px] font-bold uppercase tracking-[1px] text-[#666] leading-[1.4]">Of limit breaches<br/>that were preventable</div>
            </div>
            <div className="flex-1 p-[32px] md:p-[36px]">
              <div className="font-archivo text-[46px] leading-[1] tracking-[-2px] text-[#FF2424] mb-[8px]">$0</div>
              <div className="text-[12px] font-bold uppercase tracking-[1px] text-[#666] leading-[1.4]">Revenue earned<br/>during an Org outage</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: FEATURES ── */}
      <section id="features" className="relative overflow-hidden bg-[#FAF8F3]">
        <div className="max-w-[1200px] mx-auto px-[24px] md:px-[48px] py-[80px] pb-0">
          <div className="text-[12px] font-bold uppercase tracking-[2.5px] text-[#FF2424] mb-[24px]">Core Capabilities</div>
          <h2 className="font-archivo text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-1px] uppercase mb-[16px] text-[#1a1a1a]">The First Autonomous Runtime<br/>Governance Engine for Salesforce.</h2>
        </div>

        <div className="max-w-[1200px] mx-auto px-[24px] md:px-[48px] py-[40px] pb-[80px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            
            {/* The Wedge */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[48px] bg-white p-[40px] md:p-[48px] rounded-[8px] border border-[#1a1a1a]/5">
              <div>
                <div className="inline-block bg-[#FF2424] text-white font-archivo text-[9.5px] tracking-[2px] uppercase px-[10px] py-[4px] mb-[18px] rounded-[2px]">The Wedge</div>
                <h3 className="font-archivo text-[21px] uppercase tracking-[-0.4px] text-[#1a1a1a] mb-[16px] leading-[1.18]">Automated Governor<br/>Limit Profiling</h3>
                <p className="text-[14.5px] leading-[1.75] text-[#444]">
                  We don't just test the frontend illusion; we test the backend truth. 
                  When a developer opens a PR, Jataka executes the business process in an isolated Sandbox. 
                  We dynamically pull the Tooling API to measure the exact Governor Limits consumed. 
                  <strong className="text-[#1a1a1a] font-bold"> If a PR hits 90% of your SOQL limits, we block the deployment.</strong>
                </p>
                <p className="text-[11px] uppercase tracking-[1.5px] text-[#FF2424] font-bold mt-[16px]">BEFORE IT HITS PRODUCTION</p>
              </div>

              {/* PR Mockup */}
              <div className="w-full">
                <div className="bg-[#1a1a1a] rounded-[8px] overflow-hidden">
                  <div className="flex items-center gap-[8px] px-[12px] py-[8px] bg-[#2a2a2a]">
                    <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F56]"></span>
                    <span className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]"></span>
                    <span className="w-[10px] h-[10px] rounded-full bg-[#27C93F]"></span>
                    <span className="ml-[8px] text-[11px] text-white/60">jataka-bot / PR #247 — feature/convert-lead-flow</span>
                  </div>
                  <div className="p-[16px]">
                    <div className="flex items-start gap-[10px] p-[12px] bg-[rgba(255,36,36,0.1)] border border-[rgba(255,36,36,0.3)] rounded-[5px] mb-[12px]">
                      <div className="text-[#FF2424] text-[17px] shrink-0">❌</div>
                      <div className="flex-1">
                        <div className="text-white font-bold mb-[5px] text-[12.5px]">Jataka Quality Gate — BLOCKED</div>
                        <div className="text-white/60 text-[11.5px] leading-[1.5]">UI Test: ✅ PASSED | Runtime Governance: ❌ FAILED</div>
                        <div className="mt-[9px]">
                          <div className="flex justify-between text-white/60 text-[10.5px] mb-[4px]"><span>SOQL Query Limit</span><span className="text-[#FF2424] font-bold">96 / 100 (96%)</span></div>
                          <div className="h-[4px] bg-[#333] rounded-[2px] overflow-hidden"><div className="h-full bg-gradient-to-r from-[#FF8800] to-[#FF2424] rounded-[2px]" style={{width: "96%"}}></div></div>
                        </div>
                      </div>
                    </div>

                    <div className="p-[12px] bg-[#222] border border-[#333] rounded-[5px]">
                      <div className="text-white/60 text-[10.5px] mb-[8px]">
                        ❌ <strong className="text-white">Blocked:</strong> UI Test Passed, but execution consumed <strong className="text-[#FF2424]">96/100 SOQL queries</strong>.<br/>
                        Root cause: N+1 loop in <code className="text-[#7EE787] bg-[rgba(126,231,135,0.1)] px-[4px] py-[1px] rounded-[2px]">LeadConversionService.cls</code> line 84.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-[40px] md:p-[48px] rounded-[8px] border border-[#1a1a1a]/5">
              <h3 className="font-archivo text-[21px] uppercase tracking-[-0.4px] text-[#1a1a1a] mb-[16px] leading-[1.18]">AI-Powered Root<br/>Cause Analysis</h3>
              <p className="text-[14.5px] leading-[1.75] text-[#444]">
                Reading a 20MB Apex Debug Log is a nightmare. Jataka's AI does it in milliseconds. 
                If a limit is breached, our AI <strong className="text-[#1a1a1a] font-bold">pinpoints the exact line causing the N+1 loop</strong>, 
                explains the trigger chain, and posts the bulkified code fix directly as a comment on the GitHub PR.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-[40px] md:p-[48px] rounded-[8px] border border-[#1a1a1a]/5">
              <h3 className="font-archivo text-[21px] uppercase tracking-[-0.4px] text-[#1a1a1a] mb-[16px] leading-[1.18]">Hybrid SOQL<br/>Assertions</h3>
              <p className="text-[14.5px] leading-[1.75] text-[#444]">
                We don't trust the UI. After Jataka clicks "Convert Lead" on the screen, our engine 
                automatically executes a REST SOQL query to verify that 
                <strong className="text-[#1a1a1a] font-bold"> asynchronous @future methods and background jobs</strong> 
                actually updated the database correctly.
              </p>
            </div>

            {/* Feature 4 Bottom Wide */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-[40px] items-center bg-white p-[40px] md:p-[48px] rounded-[8px] border border-[#1a1a1a]/5">
              <div>
                <h3 className="font-archivo text-[21px] uppercase tracking-[-0.4px] text-[#1a1a1a] mb-[16px] leading-[1.18]">Zero-Maintenance<br/>Contextual Testing</h3>
                <p className="text-[14.5px] leading-[1.75] text-[#444]">
                  Stop writing brittle test scripts. Connect Jataka to your Org and we ingest your entire 
                  schema into our <strong className="text-[#1a1a1a] font-bold">Neo4j Graph Database</strong>. When a Jira ticket is opened, Jataka 
                  understands the blast radius and autonomously generates robust JSON test suites that 
                  <strong className="text-[#1a1a1a] font-bold"> self-heal when admins change page layouts.</strong>
                </p>
              </div>
              <div className="bg-[#1a1a1a] rounded-[8px] p-[32px] text-center">
                <p className="text-white/60 text-[14px] leading-[1.8]">
                  Salesforce is the hardest<br/>fortress on Earth.<br/><br/>
                  <span className="text-[#FF2424] font-archivo text-[18px] uppercase">WE BROKE IT.<br/>WE NOW OWN IT.</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: PIPELINE ── */}
      <section id="pipeline" className="relative overflow-hidden bg-white border-y border-[#1a1a1a]/10">
        <div className="max-w-[1200px] mx-auto px-[24px] md:px-[48px] py-[80px]">
          <div className="text-[12px] font-bold uppercase tracking-[2.5px] text-[#FF2424] mb-[24px]">Integration</div>
          <h2 className="font-archivo text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-1px] uppercase mb-[16px] text-[#1a1a1a]">Plugs Directly Into<br/>Your Existing Pipeline.</h2>
          <p className="text-[17px] text-[#666] max-w-[600px] mb-[48px]">No rip-and-replace. Works natively with Copado, Gearset, and GitHub Actions as a Quality Gate.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] lg:gap-[24px] relative">
            <div className="hidden lg:block absolute top-[35px] left-[64px] right-[64px] h-[1px] bg-gradient-to-r from-transparent via-[#FF2424] to-transparent z-0"></div>
            
            <div className="relative z-10">
              <div className="w-[60px] h-[60px] border-2 border-[#FF2424] flex items-center justify-center mb-[20px] bg-white rounded-[8px]">
                <span className="font-archivo text-[20px] text-[#FF2424]">01</span>
              </div>
              <div className="inline-block bg-[#FF2424] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Trigger</div>
              <h3 className="font-archivo text-[15px] uppercase tracking-[-0.2px] text-[#1a1a1a] mb-[10px]">Code is Pushed</h3>
              <p className="text-[13.5px] leading-[1.65] text-[#444]">Developer opens a PR in GitHub or initiates a deployment in Copado.</p>
            </div>

            <div className="relative z-10">
              <div className="w-[60px] h-[60px] border-2 border-[#FF2424] flex items-center justify-center mb-[20px] bg-white rounded-[8px]">
                <span className="font-archivo text-[20px] text-[#FF2424]">02</span>
              </div>
              <div className="inline-block bg-[#FF2424] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Intercept</div>
              <h3 className="font-archivo text-[15px] uppercase tracking-[-0.2px] text-[#1a1a1a] mb-[10px]">Jataka Intercepts</h3>
              <p className="text-[13.5px] leading-[1.65] text-[#444]">As a native Quality Gate, Jataka triggers an isolated "Kamikaze" Kubernetes Pod to run the test in a Sandbox.</p>
            </div>

            <div className="relative z-10">
              <div className="w-[60px] h-[60px] border-2 border-[#FF2424] flex items-center justify-center mb-[20px] bg-white rounded-[8px]">
                <span className="font-archivo text-[20px] text-[#FF2424]">03</span>
              </div>
              <div className="inline-block bg-[#FF2424] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Profile</div>
              <h3 className="font-archivo text-[15px] uppercase tracking-[-0.2px] text-[#1a1a1a] mb-[10px]">Runtime Profiling</h3>
              <p className="text-[13.5px] leading-[1.65] text-[#444]">Jataka correlates UI actions with the Salesforce Tooling API to count limits and measure latency.</p>
            </div>

            <div className="relative z-10">
              <div className="w-[60px] h-[60px] border-2 border-[#FF2424] flex items-center justify-center mb-[20px] bg-white rounded-[8px]">
                <span className="font-archivo text-[20px] text-[#FF2424]">04</span>
              </div>
              <div className="inline-block bg-[#FF2424] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Verdict</div>
              <h3 className="font-archivo text-[15px] uppercase tracking-[-0.2px] text-[#1a1a1a] mb-[10px]">Pass or Block</h3>
              <p className="text-[13.5px] leading-[1.65] text-[#444]">Safe code gets merged. Limit-breaching code gets blocked with an AI-generated fix sent back to the developer.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: DEVELOPER BRAIN ── */}
      <section id="brain" className="relative overflow-hidden bg-[#FAF8F3]">
        <div className="max-w-[1200px] mx-auto px-[24px] md:px-[48px] py-[80px]">
          <div className="text-[12px] font-bold uppercase tracking-[2.5px] text-[#FF2424] mb-[24px]">Developer Tools</div>
          <h2 className="font-archivo text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-1px] uppercase mb-[16px] text-[#1a1a1a]">The Ultimate Salesforce Co-Pilot<br/>for Your IDE and Slack.</h2>
          <p className="text-[17px] leading-[1.72] text-[#666] max-w-[700px] mb-[48px]">
            Because Jataka maps your entire Salesforce architecture into a Graph Database, 
            <strong className="text-[#1a1a1a] font-bold"> we know your specific Org better than any generic AI model.</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div className="bg-white border border-[#1a1a1a]/5 p-[40px] md:p-[48px] relative overflow-hidden rounded-[8px] h-full">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[#FF2424]"></div>
              <span className="text-[28px] block mb-[20px]">⬡</span>
              <h3 className="font-archivo text-[19px] uppercase text-[#1a1a1a] mb-[12px]">IDE Context (MCP)</h3>
              <p className="text-[14.5px] leading-[1.72] text-[#444]">
                Pipe your proprietary Salesforce data model directly into Cursor. Write Apex that 
                actually understands your custom objects, field relationships, and validation rules — 
                not generic boilerplate.
              </p>
            </div>
            
            <div className="bg-white border border-[#1a1a1a]/5 p-[40px] md:p-[48px] relative overflow-hidden rounded-[8px] h-full">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[#FF2424]"></div>
              <span className="text-[28px] block mb-[20px]">◈</span>
              <h3 className="font-archivo text-[19px] uppercase text-[#1a1a1a] mb-[12px]">Senior Deflection in Slack</h3>
              <p className="text-[14.5px] leading-[1.72] text-[#444]">
                Junior developers stuck on an error? They ask the Jataka Slack bot. It analyzes 
                your Org's architecture and historic Jira tickets to give the right answer, 
                protecting your Senior Architects' time.
              </p>
            </div>
          </div>

          <div className="mt-[60px] p-[40px] md:p-[48px] bg-[#1a1a1a] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-[40px] md:gap-[48px] items-center rounded-[8px]">
            <div>
              <div className="text-[11px] uppercase tracking-[2px] text-[#FF2424] font-bold mb-[12px]">JATAKA IS THE OPERATING SYSTEM</div>
              <p className="text-[15.5px] text-white/60 max-w-[480px] leading-[1.65]">
                Making enterprises autonomous. The chaos is over. When your entire Salesforce 
                architecture lives in a Knowledge Graph, every tool — your IDE, your CI/CD, your 
                Slack — gets smarter with every deployment.
              </p>
            </div>
            <div className="text-left lg:text-right border-t border-white/10 lg:border-t-0 pt-[20px] lg:pt-0">
              <div className="font-archivo text-[clamp(48px,6vw,72px)] text-[#FF2424] leading-[0.9] uppercase">
                JATAKA<br/>ENDS IT
              </div>
              <div className="mt-[10px] text-[11px] uppercase tracking-[2px] text-white/40 font-bold leading-[1.5]">
                We do not watch the agents.<br/>We command them.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: AUTONOMOUS SDLC ── */}
      <section id="sdlc" className="relative overflow-hidden bg-white border-y border-[#1a1a1a]/10">
        <div className="max-w-[1200px] mx-auto px-[24px] md:px-[48px] py-[80px]">
          <div className="text-[12px] font-bold uppercase tracking-[2.5px] text-[#FF2424] mb-[24px]">Highest-Value IP</div>
          <h2 className="font-archivo text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-1px] uppercase mb-[16px] text-[#1a1a1a]">The Autonomous SDLC.</h2>
          <p className="text-[17px] text-[#666] max-w-[600px] mb-[48px]">Jataka doesn't just wait for pull requests. It manages the entire lifecycle.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
            {/* Intent */}
            <div className="bg-[#FAF8F3] border border-[#1a1a1a]/5 p-[28px] relative overflow-hidden rounded-[8px]">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[#FF2424]"></div>
              <div className="w-[44px] h-[44px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center mb-[16px]">
                <span className="text-[18px]">📋</span>
              </div>
              <div className="inline-block bg-[#FF2424] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Step 1</div>
              <h3 className="font-archivo text-[16px] uppercase tracking-[-0.3px] text-[#1a1a1a] mb-[8px]">Intent (Jira)</h3>
              <p className="text-[13px] leading-[1.65] text-[#555]">
                Jataka reads the Jira ticket and updates the Neo4j graph with the business intent. Your feature requirements become structured context.
              </p>
            </div>

            {/* Code */}
            <div className="bg-[#FAF8F3] border border-[#1a1a1a]/5 p-[28px] relative overflow-hidden rounded-[8px]">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[#FF6B35]"></div>
              <div className="w-[44px] h-[44px] rounded-[8px] bg-[#FF6B35]/10 flex items-center justify-center mb-[16px]">
                <span className="text-[18px]">⌨️</span>
              </div>
              <div className="inline-block bg-[#FF6B35] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Step 2</div>
              <h3 className="font-archivo text-[16px] uppercase tracking-[-0.3px] text-[#1a1a1a] mb-[8px]">Code (Cursor)</h3>
              <p className="text-[13px] leading-[1.65] text-[#555]">
                Through our MCP, your developer asks Cursor how to build the feature. Jataka feeds Cursor the exact blast radius and safe code patterns.
              </p>
            </div>

            {/* Verify */}
            <div className="bg-[#FAF8F3] border border-[#1a1a1a]/5 p-[28px] relative overflow-hidden rounded-[8px]">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[#FFB800]"></div>
              <div className="w-[44px] h-[44px] rounded-[8px] bg-[#FFB800]/10 flex items-center justify-center mb-[16px]">
                <span className="text-[18px]">🔍</span>
              </div>
              <div className="inline-block bg-[#FFB800] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Step 3</div>
              <h3 className="font-archivo text-[16px] uppercase tracking-[-0.3px] text-[#1a1a1a] mb-[8px]">Verify (GitHub)</h3>
              <p className="text-[13px] leading-[1.65] text-[#555]">
                The developer opens a PR. Jataka's API Firewall and Kamikaze Pods test the limits and the UI automatically.
              </p>
            </div>

            {/* Resolve */}
            <div className="bg-[#FAF8F3] border border-[#1a1a1a]/5 p-[28px] relative overflow-hidden rounded-[8px]">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[#22c55e]"></div>
              <div className="w-[44px] h-[44px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center mb-[16px]">
                <span className="text-[18px]">✅</span>
              </div>
              <div className="inline-block bg-[#22c55e] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Step 4</div>
              <h3 className="font-archivo text-[16px] uppercase tracking-[-0.3px] text-[#1a1a1a] mb-[8px]">Resolve (Jira)</h3>
              <p className="text-[13px] leading-[1.65] text-[#555]">
                If limits breach, Jataka sends feedback back to Cursor. If it passes, Jataka updates the Jira ticket to "Ready for Deployment" with attached video proof.
              </p>
            </div>
          </div>

          <div className="mt-[40px] p-[36px] md:p-[40px] bg-[#1a1a1a] rounded-[8px]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-[32px] items-center">
              <div>
                <h3 className="font-archivo text-[22px] uppercase tracking-[-0.5px] text-white mb-[14px]">The Result</h3>
                <p className="text-[14px] leading-[1.7] text-white/60">
                  Your developers stay in their IDE. Jataka handles the <strong className="text-white font-bold">orchestration</strong>, 
                  the <strong className="text-white font-bold">testing</strong>, and the <strong className="text-white font-bold">ticket management</strong>. 
                  This closed loop — Jira to Cursor to GitHub to Jataka back to Jira — is your highest-value intellectual property. 
                  You aren't just catching limits; you are automating the entire Software Development Life Cycle.
                </p>
                <a 
                  href="/use-cases/autonomous-sdlc"
                  className="mt-[20px] inline-flex items-center gap-[8px] text-[12px] font-archivo uppercase tracking-[1.5px] text-[#FF2424] hover:text-[#ff6666] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See Full Use Case →
                </a>
              </div>
              <div className="bg-[#2a2a2a] rounded-[8px] p-[24px]">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[1px] text-white/40 mb-[16px]">
                  <span>Closed Loop</span>
                  <span className="text-[#22c55e]">● Active</span>
                </div>
                <div className="flex items-center justify-center gap-[12px] text-white">
                  <div className="text-center">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#FF2424]/10 flex items-center justify-center mx-auto mb-[6px] text-[14px]">📋</div>
                    <span className="text-[9px] uppercase tracking-[0.5px]">Jira</span>
                  </div>
                  <span className="text-[#FF2424]">→</span>
                  <div className="text-center">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-[6px] text-[14px]">⌨️</div>
                    <span className="text-[9px] uppercase tracking-[0.5px]">Cursor</span>
                  </div>
                  <span className="text-[#FF2424]">→</span>
                  <div className="text-center">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#FFB800]/10 flex items-center justify-center mx-auto mb-[6px] text-[14px]">🔍</div>
                    <span className="text-[9px] uppercase tracking-[0.5px]">GitHub</span>
                  </div>
                  <span className="text-[#FF2424]">→</span>
                  <div className="text-center">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#FF2424]/20 flex items-center justify-center mx-auto mb-[6px] text-[14px] font-bold text-[#FF2424]">J</div>
                    <span className="text-[9px] uppercase tracking-[0.5px]">Jataka</span>
                  </div>
                  <span className="text-[#22c55e]">↩</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FINAL CTA ── */}
      <section id="final-cta" className="relative overflow-hidden bg-[#1a1a1a]">
        <div className="max-w-[1000px] mx-auto px-[24px] md:px-[48px] py-[100px] text-center relative z-10">
          <div className="text-[12px] font-bold uppercase tracking-[2.5px] text-[#FF2424] mb-[30px]">Zero Deployment Rollbacks</div>
          <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
            Don't Let Invisible<br />
            Limits Crash<br />
            <span className="text-[#FF2424]">Your Revenue.</span>
          </h2>
          <p className="text-[17px] text-white/60 max-w-[520px] mx-auto mb-[40px] leading-[1.65]">
            Join the top-tier Salesforce teams who trust Jataka to guarantee zero deployment rollbacks.
          </p>
          <button onClick={() => router.push("/pilot")} className="bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">
            ▶ Start Your Pilot
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#FAF8F3] border-t border-[#1a1a1a]/10 px-[24px] md:px-[48px] py-[40px] flex flex-col md:flex-row items-center justify-between gap-[20px]">
        <div className="flex items-center gap-[14px]">
          <svg className="h-[19px] w-auto" viewBox="489.5 574 2305.4 484.92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M877.432 574C930.994 574 974.419 617.425 974.419 670.987C974.418 697.813 963.525 722.093 945.923 739.648C924.44 761.073 901.681 786.114 901.681 816.454C901.681 846.795 924.441 871.837 945.923 893.264C963.526 910.822 974.418 935.105 974.419 961.932C974.419 1015.49 930.994 1058.92 877.432 1058.92C850.604 1058.92 826.319 1048.02 808.76 1030.42C787.337 1008.94 762.298 986.181 731.959 986.181C701.621 986.181 676.582 1008.94 655.159 1030.42C637.6 1048.02 613.315 1058.92 586.487 1058.92C532.925 1058.92 489.5 1015.49 489.5 961.932C489.502 908.371 532.926 864.953 586.487 864.953C613.316 864.954 637.601 875.848 655.159 893.453C676.582 914.934 701.622 937.691 731.959 937.691C762.297 937.691 787.402 914.81 808.854 893.357C830.307 871.902 853.191 846.795 853.191 816.454C853.191 786.114 830.432 761.074 808.949 739.649C791.346 722.093 780.454 697.813 780.453 670.987C780.453 617.426 823.871 574.002 877.432 574Z" fill="#1a1a1a"/>
            <path d="M877.508 908.275C878.976 937.203 902.175 960.398 931.103 961.862L934.013 961.933C902.769 961.933 877.44 987.265 877.437 1018.51C877.435 987.266 852.105 961.933 820.862 961.933C852.106 961.931 877.437 936.601 877.437 905.358L877.508 908.275Z" fill="#FF2424"/>
            <path d="M1292.08 685.6V907.648C1292.08 932.992 1285.03 952.72 1270.92 966.832C1257.09 980.944 1237.36 988 1211.73 988H1156V931.84H1191.86C1204.53 931.84 1213.6 928.96 1219.08 923.2C1224.55 917.152 1227.28 907.792 1227.28 895.12V685.6H1292.08Z" fill="#1a1a1a"/>
            <path d="M1332.31 988L1442.9 685.6H1520.66L1630.39 988H1560.83L1537.51 921.904H1422.59L1399.27 988H1332.31ZM1439.87 869.632H1519.79L1479.62 754.72L1439.87 869.632Z" fill="#1a1a1a"/>
            <path d="M1621.19 685.6H1860.52V741.328H1773.26V988H1708.46V741.328H1621.19V685.6Z" fill="#1a1a1a"/>
            <path d="M1851.07 988L1961.66 685.6H2039.42L2149.15 988H2079.6L2056.27 921.904H1941.36L1918.03 988H1851.07ZM1958.64 869.632H2038.56L1998.38 754.72L1958.64 869.632Z" fill="#1a1a1a"/>
            <path d="M2199.4 686.032H2264.2V821.68L2385.16 686.032H2463.79L2352.76 810.448L2471.13 988H2393.37L2306.97 860.56L2264.2 908.512V988H2199.4V686.032Z" fill="#1a1a1a"/>
            <path d="M2496.82 988L2607.41 685.6H2685.17L2794.9 988H2725.35L2702.02 921.904H2587.11L2563.78 988H2496.82ZM2604.39 869.632H2684.31L2644.13 754.72L2604.39 869.632Z" fill="#1a1a1a"/>
          </svg>
          <div className="font-archivo text-[11px] uppercase tracking-[2px] text-[#666]">jataka.io</div>
        </div>
        <div className="text-[13px] text-[#666] text-center md:text-right">
          &copy; 2025 Jataka · Runtime Governance for Salesforce · All rights reserved.
        </div>
      </footer>
    </>
  );
};