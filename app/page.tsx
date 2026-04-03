"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JatakaLandingPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    "url": "https://jataka.ai",
    "logo": "https://jataka.ai/WhiteLOGO.svg",
    "description": "AI-Powered Salesforce Development Platform - Catch Governor Limit breaches before deployment, automatically heal UI tests, and predict blast radius of code changes.",
    "sameAs": [
      "https://twitter.com/jataka_ai",
      "https://www.linkedin.com/company/jataka"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "url": "https://jataka.ai/book-pilot"
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
      <nav className="fixed top-0 left-0 right-0 z-[200] h-[64px] bg-[rgba(6,12,22,0.88)] backdrop-blur-[14px] border-b border-[rgba(255,255,255,0.06)] px-[24px] md:px-[48px] flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("hero")}>
          <svg className="h-[22px] w-auto block" viewBox="489.5 574 2305.4 484.92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M877.432 574C930.994 574 974.419 617.425 974.419 670.987C974.418 697.813 963.525 722.093 945.923 739.648C924.44 761.073 901.681 786.114 901.681 816.454C901.681 846.795 924.441 871.837 945.923 893.264C963.526 910.822 974.418 935.105 974.419 961.932C974.419 1015.49 930.994 1058.92 877.432 1058.92C850.604 1058.92 826.319 1048.02 808.76 1030.42C787.337 1008.94 762.298 986.181 731.959 986.181C701.621 986.181 676.582 1008.94 655.159 1030.42C637.6 1048.02 613.315 1058.92 586.487 1058.92C532.925 1058.92 489.5 1015.49 489.5 961.932C489.502 908.371 532.926 864.953 586.487 864.953C613.316 864.954 637.601 875.848 655.159 893.453C676.582 914.934 701.622 937.691 731.959 937.691C762.297 937.691 787.402 914.81 808.854 893.357C830.307 871.902 853.191 846.795 853.191 816.454C853.191 786.114 830.432 761.074 808.949 739.649C791.346 722.093 780.454 697.813 780.453 670.987C780.453 617.426 823.871 574.002 877.432 574Z" fill="#E8E4DC"/>
            <path d="M877.508 908.275C878.976 937.203 902.175 960.398 931.103 961.862L934.013 961.933C902.769 961.933 877.44 987.265 877.437 1018.51C877.435 987.266 852.105 961.933 820.862 961.933C852.106 961.931 877.437 936.601 877.437 905.358L877.508 908.275Z" fill="#FF2424"/>
            <path d="M1292.08 685.6V907.648C1292.08 932.992 1285.03 952.72 1270.92 966.832C1257.09 980.944 1237.36 988 1211.73 988H1156V931.84H1191.86C1204.53 931.84 1213.6 928.96 1219.08 923.2C1224.55 917.152 1227.28 907.792 1227.28 895.12V685.6H1292.08Z" fill="#E8E4DC"/>
            <path d="M1332.31 988L1442.9 685.6H1520.66L1630.39 988H1560.83L1537.51 921.904H1422.59L1399.27 988H1332.31ZM1439.87 869.632H1519.79L1479.62 754.72L1439.87 869.632Z" fill="#E8E4DC"/>
            <path d="M1621.19 685.6H1860.52V741.328H1773.26V988H1708.46V741.328H1621.19V685.6Z" fill="#E8E4DC"/>
            <path d="M1851.07 988L1961.66 685.6H2039.42L2149.15 988H2079.6L2056.27 921.904H1941.36L1918.03 988H1851.07ZM1958.64 869.632H2038.56L1998.38 754.72L1958.64 869.632Z" fill="#E8E4DC"/>
            <path d="M2199.4 686.032H2264.2V821.68L2385.16 686.032H2463.79L2352.76 810.448L2471.13 988H2393.37L2306.97 860.56L2264.2 908.512V988H2199.4V686.032Z" fill="#E8E4DC"/>
            <path d="M2496.82 988L2607.41 685.6H2685.17L2794.9 988H2725.35L2702.02 921.904H2587.11L2563.78 988H2496.82ZM2604.39 869.632H2684.31L2644.13 754.72L2604.39 869.632Z" fill="#E8E4DC"/>
          </svg>
        </div>
        
        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
          <li><button onClick={() => scrollToSection("problem")} className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Problem</button></li>
          <li><button onClick={() => scrollToSection("features")} className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Features</button></li>
          <li><button onClick={() => router.push("/docs")} className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Docs</button></li>
          <li><button onClick={() => router.push("/use-cases")} className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</button></li>
          <li><button onClick={() => router.push("/book-pilot")} className="nav-cta rounded-[4px]">Book Demo</button></li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-[64px] left-0 w-full bg-[var(--bg-surface)] border-b border-[var(--border)] p-6 flex flex-col gap-6 md:hidden shadow-2xl animate-in slide-in-from-top-2 z-[190]">
            <button onClick={() => scrollToSection("problem")} className="text-left text-lg font-medium text-[var(--text)] py-2 border-b border-[var(--border)]">Problem</button>
            <button onClick={() => scrollToSection("features")} className="text-left text-lg font-medium text-[var(--text)] py-2 border-b border-[var(--border)]">Features</button>
            <button onClick={() => router.push("/docs")} className="text-left text-lg font-medium text-[var(--text)] py-2 border-b border-[var(--border)]">Docs</button>
            <button onClick={() => router.push("/use-cases")} className="text-left text-lg font-medium text-[var(--text)] py-2 border-b border-[var(--border)]">Use Cases</button>
            <button onClick={() => router.push("/book-pilot")} className="w-full py-4 mt-2 rounded-md bg-[var(--accent-red)] text-white font-archivo uppercase tracking-widest text-sm flex items-center justify-center">
              Book a Demo
            </button>
          </div>
        )}
      </nav>

      {/* ── SECTION 1: HERO ── */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-[40px] pt-[128px] pb-[100px] relative overflow-hidden">
        <div className="grid-bg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(255,36,36,0.055)_0%,transparent_68%)] pointer-events-none z-0"></div>
        
        <div className="relative z-10 inline-flex items-center gap-[9px] bg-[var(--accent-red-dim)] border border-[rgba(255,36,36,0.28)] px-[18px] py-[6px] mb-[36px] text-[11.5px] font-bold uppercase tracking-[2.5px] color-[var(--accent-red)] text-[#FF2424]">
          <span className="text-[8px]">▶</span> Runtime Governance Engine for Salesforce
        </div>

        <h1 className="hero-hl font-archivo text-[clamp(44px,6.5vw,84px)] leading-[0.93] tracking-[-3px] uppercase mb-[32px] max-w-[920px] relative z-10">
          <span className="cut-white">Stop Salesforce</span>
          <span className="cut-white">Rollbacks Before</span>
          <span className="cut-red">They Hit Production.</span>
        </h1>

        <p className="hero-sub text-[clamp(16px,1.5vw,18.5px)] leading-[1.72] text-[var(--text-dim)] max-w-[660px] mb-[52px] relative z-10">
          Traditional UI tests check if buttons click. Static scanners guess if your code works. 
          <strong className="text-[var(--text)] font-bold"> Jataka physically executes your PRs in a Sandbox</strong>, profiles your Apex Debug Logs, 
          and automatically <strong className="text-[var(--text)] font-bold">blocks deployments that breach Governor Limits.</strong>
        </p>

        <div className="hero-ctas flex gap-[16px] flex-wrap justify-center mb-[72px] relative z-10 flex-col md:flex-row w-full md:w-auto">
          <button onClick={() => router.push("/book-pilot")} className="btn-primary w-full md:w-auto justify-center rounded-[4px]">
            &#9654;&nbsp; Book a Demo
          </button>
          <a href="#" className="btn-secondary w-full md:w-auto justify-center rounded-[4px]">
            ⬡&nbsp; Install GitHub Action
          </a>
        </div>

        {/* ── VIDEO SECTION ── */}
        <div id="demo" className="relative z-10 w-full max-w-[1000px] aspect-video mb-[72px] rounded-[8px] overflow-hidden border border-[var(--border)] bg-black shadow-[0_0_40px_rgba(255,36,36,0.1)]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/SdXRbVhZMzg?rel=0"
            title="Jataka Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="trust-bar relative z-10 flex flex-col items-center gap-[16px]">
          <span className="text-[10.5px] font-bold uppercase tracking-[2.5px] text-[var(--text-muted)]">Works seamlessly as a Quality Gate for</span>
          <div className="flex gap-[12px] flex-wrap justify-center">
            {["Copado", "Gearset", "GitHub", "Bitbucket", "AppExchange"].map((logo) => (
              <span key={logo} className="font-archivo text-[11.5px] tracking-[1px] uppercase text-[var(--text-muted)] px-[16px] py-[7px] border border-[var(--border)] transition-all duration-200 hover:text-[var(--text-dim)] hover:border-[var(--border-strong)] rounded-[4px]">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PROBLEM ── */}
      <section id="problem" className="relative overflow-hidden bg-[var(--bg-surface)] border-y border-[var(--border)]">
        <div className="grid-bg opacity-50"></div>
        <div className="s-inner">
          <div className="s-label">The Status Quo is Broken</div>
          
          <div className="font-archivo text-[clamp(88px,13vw,152px)] leading-[0.82] tracking-[-6px] uppercase mb-[24px] inline-block cut-white">
            75%
          </div>
          <h2 className="s-hl">Code Coverage<br/>is an Illusion.</h2>
          <p className="s-sub">Your tests are passing. Your architecture is bleeding. Here is exactly how.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] mt-[48px]">
            <div className="p-[40px] md:p-[48px] md:border-r border-[var(--border)] border-b md:border-b-0">
              <div className="text-[10.5px] font-bold uppercase tracking-[2.5px] text-[var(--text-muted)] mb-[22px]">01 — Scanner</div>
              <h3 className="font-archivo text-[19px] uppercase tracking-[-0.3px] text-[var(--text)] mb-[14px] leading-[1.2]">Static Scanners<br/>Only Guess</h3>
              <p className="text-[14.5px] leading-[1.72] text-[var(--text-dim)]">Tools like SonarQube and PMD read text. They cannot calculate runtime execution paths, hidden loops, or trigger-chains hidden inside managed packages.</p>
            </div>
            <div className="p-[40px] md:p-[48px] md:border-r border-[var(--border)] border-b md:border-b-0">
              <div className="text-[10.5px] font-bold uppercase tracking-[2.5px] text-[var(--text-muted)] mb-[22px]">02 — UI Testing</div>
              <h3 className="font-archivo text-[19px] uppercase tracking-[-0.3px] text-[var(--text)] mb-[14px] leading-[1.2]">UI Testing<br/>is Blind</h3>
              <p className="text-[14.5px] leading-[1.72] text-[var(--text-dim)]">Selenium and standard QA bots only test the screen. If a user clicks a button and your code consumes 99 out of 100 SOQL queries, the UI test passes. But your architecture is bleeding.</p>
            </div>
            <div className="p-[40px] md:p-[48px] bg-[var(--accent-red-dim)] border-l-[3px] border-[var(--accent-red)] md:border-l-[3px] md:border-r-0 md:border-t-0 md:border-b-0 border-t border-[var(--border)]">
              <div className="text-[10.5px] font-bold uppercase tracking-[2.5px] text-[var(--text-muted)] mb-[22px]">03 — The Result</div>
              <h3 className="font-archivo text-[19px] uppercase tracking-[-0.3px] text-[var(--accent-red)] mb-[14px] leading-[1.2]">101 SOQL<br/>Errors</h3>
              <p className="text-[14.5px] leading-[1.72] text-[var(--text-dim)]">Your tests pass, Copado deploys the code, a real user clicks the button with slightly heavier data, the Governor Limit breaks, and your entire Org crashes.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row border border-[var(--border)] mt-[1px]">
            <div className="flex-1 p-[32px] md:p-[36px] border-b md:border-b-0 md:border-r border-[var(--border)]">
              <div className="font-archivo text-[46px] leading-[1] tracking-[-2px] text-[var(--accent-red)] mb-[8px]">96/100</div>
              <div className="text-[12px] font-bold uppercase tracking-[1px] text-[var(--text-dim)] leading-[1.4]">SOQL Queries consumed<br/>in a "passing" test</div>
            </div>
            <div className="flex-1 p-[32px] md:p-[36px] border-b md:border-b-0 md:border-r border-[var(--border)]">
              <div className="font-archivo text-[46px] leading-[1] tracking-[-2px] text-[var(--accent-red)] mb-[8px]">0ms</div>
              <div className="text-[12px] font-bold uppercase tracking-[1px] text-[var(--text-dim)] leading-[1.4]">Warning time before<br/>Governor Limit crash</div>
            </div>
            <div className="flex-1 p-[32px] md:p-[36px] border-b md:border-b-0 md:border-r border-[var(--border)]">
              <div className="font-archivo text-[46px] leading-[1] tracking-[-2px] text-[var(--accent-red)] mb-[8px]">100%</div>
              <div className="text-[12px] font-bold uppercase tracking-[1px] text-[var(--text-dim)] leading-[1.4]">Of limit breaches<br/>that were preventable</div>
            </div>
            <div className="flex-1 p-[32px] md:p-[36px]">
              <div className="font-archivo text-[46px] leading-[1] tracking-[-2px] text-[var(--accent-red)] mb-[8px]">$0</div>
              <div className="text-[12px] font-bold uppercase tracking-[1px] text-[var(--text-dim)] leading-[1.4]">Revenue earned<br/>during an Org outage</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: FEATURES ── */}
      <section id="features" className="relative overflow-hidden bg-[var(--bg)]">
        <div className="s-inner pb-0">
          <div className="s-label">Core Capabilities</div>
          <h2 className="s-hl">The First Autonomous Runtime<br/>Governance Engine for Salesforce.</h2>
          <p className="s-sub">We built the X-Ray machine your CI/CD pipeline never had.</p>
        </div>

        <div className="max-w-[1200px] mx-auto px-[24px] md:px-[48px] py-[40px] pb-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--border)] border border-[var(--border)]">
            
            {/* The Wedge */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[64px] bg-[var(--bg-surface)] p-[40px] md:p-[56px] transition-colors duration-200 hover:bg-[var(--bg-card-hover)]">
              <div>
                <div className="font-mono text-[11px] text-[var(--text-muted)] tracking-[2px] mb-[18px]">// 01</div>
                <div className="inline-block bg-[var(--accent-red)] text-white font-archivo text-[9.5px] tracking-[2px] uppercase px-[10px] py-[4px] mb-[18px] -skew-x-[5deg]">The Wedge</div>
                <h3 className="font-archivo text-[21px] uppercase tracking-[-0.4px] text-[var(--text)] mb-[16px] leading-[1.18]">Automated Governor<br/>Limit Profiling</h3>
                <p className="text-[14.5px] leading-[1.75] text-[var(--text-dim)]">
                  We don't just test the frontend illusion; we test the backend truth. 
                  When a developer opens a PR, Jataka executes the business process in an isolated Sandbox. 
                  We dynamically pull the Tooling API to measure the exact Governor Limits consumed. 
                  <strong className="text-[var(--text)] font-bold"> If a PR hits 90% of your SOQL limits, we block the deployment.</strong>
                </p>
                <div className="rev-kill">BEFORE IT HITS PRODUCTION</div>
              </div>

              {/* PR Mockup */}
              <div className="w-full">
                <div className="pr-mockup">
                  <div className="pr-bar">
                    <span className="dot dot-r"></span>
                    <span className="dot dot-y"></span>
                    <span className="dot dot-g"></span>
                    <span className="ml-[8px]">jataka-bot &nbsp;/&nbsp; PR #247 — feature/convert-lead-flow</span>
                  </div>
                  <div className="p-[16px]">
                    <div className="flex items-start gap-[10px] p-[12px] bg-[rgba(255,36,36,0.07)] border border-[rgba(255,36,36,0.22)] rounded-[5px] mb-[12px]">
                      <div className="text-[var(--accent-red)] text-[17px] leading-[1.45] shrink-0">❌</div>
                      <div className="flex-1">
                        <div className="text-[#F0F6FC] font-bold mb-[5px] text-[12.5px]">Jataka Quality Gate — BLOCKED</div>
                        <div className="text-[#8B949E] text-[11.5px] leading-[1.5]">UI Test: &nbsp;✅ PASSED &nbsp;&nbsp;|&nbsp;&nbsp; Runtime Governance: &nbsp;❌ FAILED</div>
                        <div className="mt-[9px]">
                          <div className="flex justify-between text-[#8B949E] text-[10.5px] mb-[4px]"><span>SOQL Query Limit</span><span className="text-[var(--accent-red)] font-bold">96 / 100 &nbsp;(96%)</span></div>
                          <div className="h-[4px] bg-[#21262D] rounded-[2px] overflow-hidden"><div className="h-full bg-gradient-to-r from-[#FF8800] to-[var(--accent-red)] rounded-[2px]" style={{width: "96%"}}></div></div>
                        </div>
                        <div className="mt-[7px]">
                          <div className="flex justify-between text-[#8B949E] text-[10.5px] mb-[4px]"><span>Heap Size</span><span className="text-[var(--accent-red)] font-bold">5.8MB / 6MB &nbsp;(97%)</span></div>
                          <div className="h-[4px] bg-[#21262D] rounded-[2px] overflow-hidden"><div className="h-full bg-gradient-to-r from-[#FF8800] to-[var(--accent-red)] rounded-[2px]" style={{width: "97%"}}></div></div>
                        </div>
                        <div className="mt-[7px]">
                          <div className="flex justify-between text-[#8B949E] text-[10.5px] mb-[4px]"><span>CPU Time Limit</span><span className="text-[var(--accent-red)] font-bold">9.1s / 10s &nbsp;(91%)</span></div>
                          <div className="h-[4px] bg-[#21262D] rounded-[2px] overflow-hidden"><div className="h-full bg-gradient-to-r from-[#FF8800] to-[var(--accent-red)] rounded-[2px]" style={{width: "91%"}}></div></div>
                        </div>
                      </div>
                    </div>

                    <div className="p-[12px] bg-[#161B22] border border-[#30363D] rounded-[5px]">
                      <div className="inline-flex items-center gap-[7px] text-[#8B949E] text-[10.5px] mb-[9px]">
                        <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-[var(--accent-red)] to-[#FF8800] flex items-center justify-center text-[9px] text-white font-bold">J</div>
                        <span>jataka-bot commented 2 minutes ago</span>
                      </div>
                      <div className="text-[#C9D1D9] text-[11.5px] leading-[1.65]">
                        ❌ <strong className="text-[#F0F6FC]">Blocked:</strong> UI Test Passed, but execution consumed <strong className="text-[var(--accent-red)]">96/100 SOQL queries</strong>.<br/>
                        Root cause: N+1 loop detected in <code className="text-[#7EE787] bg-[rgba(126,231,135,0.1)] px-[5px] py-[1px] rounded-[3px]">LeadConversionService.cls</code> line&nbsp;84.<br/>
                        <a href="#" className="text-[#58A6FF] no-underline">→ View Full Debug Log Analysis</a>
                      </div>
                      <div className="bg-[#0D1117] border border-[#30363D] rounded-[4px] p-[9px] text-[10.5px] text-[#7EE787] mt-[10px] leading-[1.6]">
                        <span className="text-[#8B949E]">// AI Fix: Bulkify — move SOQL outside the loop</span><br/>
                        List&lt;Account&gt; accs = [SELECT Id FROM Account WHERE OwnerId IN :ownerIds];<br/>
                        Map&lt;Id, Account&gt; accMap = new Map&lt;Id, Account&gt;(accs);
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-[var(--bg-card)] p-[40px] md:p-[56px] transition-colors duration-200 hover:bg-[var(--bg-card-hover)]">
              <div className="font-mono text-[11px] text-[var(--text-muted)] tracking-[2px] mb-[18px]">// 02</div>
              <h3 className="font-archivo text-[21px] uppercase tracking-[-0.4px] text-[var(--text)] mb-[16px] leading-[1.18]">AI-Powered Root<br/>Cause Analysis</h3>
              <p className="text-[14.5px] leading-[1.75] text-[var(--text-dim)]">
                Reading a 20MB Apex Debug Log is a nightmare. Jataka's AI does it in milliseconds. 
                If a limit is breached, our AI <strong className="text-[var(--text)] font-bold">pinpoints the exact line causing the N+1 loop</strong>, 
                explains the trigger chain, and posts the bulkified code fix directly as a comment on the GitHub PR.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[var(--bg-card)] p-[40px] md:p-[56px] transition-colors duration-200 hover:bg-[var(--bg-card-hover)]">
              <div className="font-mono text-[11px] text-[var(--text-muted)] tracking-[2px] mb-[18px]">// 03</div>
              <h3 className="font-archivo text-[21px] uppercase tracking-[-0.4px] text-[var(--text)] mb-[16px] leading-[1.18]">Hybrid SOQL<br/>Assertions</h3>
              <p className="text-[14.5px] leading-[1.75] text-[var(--text-dim)]">
                We don't trust the UI. After Jataka clicks "Convert Lead" on the screen, our engine 
                automatically executes a REST SOQL query to verify that 
                <strong className="text-[var(--text)] font-bold"> asynchronous @future methods and background jobs</strong> 
                actually updated the database correctly.
              </p>
            </div>

            {/* Feature 4 Bottom Wide */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-[40px] lg:gap-[64px] items-center bg-[var(--bg-card)] p-[40px] md:p-[56px] transition-colors duration-200 hover:bg-[var(--bg-card-hover)]">
              <div>
                <div className="font-mono text-[11px] text-[var(--text-muted)] tracking-[2px] mb-[18px]">// 04</div>
                <h3 className="font-archivo text-[21px] uppercase tracking-[-0.4px] text-[var(--text)] mb-[16px] leading-[1.18]">Zero-Maintenance<br/>Contextual Testing</h3>
                <p className="text-[14.5px] leading-[1.75] text-[var(--text-dim)]">
                  Stop writing brittle test scripts. Connect Jataka to your Org and we ingest your entire 
                  schema into our <strong className="text-[var(--text)] font-bold">Neo4j Graph Database</strong>. When a Jira ticket is opened, Jataka 
                  understands the blast radius and autonomously generates robust JSON test suites that 
                  <strong className="text-[var(--text)] font-bold"> self-heal when admins change page layouts.</strong>
                </p>
              </div>
              <div className="fortress">
                <div className="fortress-txt">
                  Salesforce is the hardest<br/>fortress on Earth.<br/><br/>
                  <span>WE BROKE IT.<br/>WE NOW OWN IT.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: PIPELINE ── */}
      <section id="pipeline" className="relative overflow-hidden bg-[var(--bg-surface)] border-y border-[var(--border)]">
        <div className="grid-bg opacity-40"></div>
        <div className="s-inner">
          <div className="s-label">Integration</div>
          <h2 className="s-hl">Plugs Directly Into<br/>Your Existing Pipeline.</h2>
          <p className="s-sub">No rip-and-replace. Works natively with Copado, Gearset, and GitHub Actions as a Quality Gate.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] lg:gap-0 relative mt-[48px]">
            <div className="hidden lg:block absolute top-[35px] left-[64px] right-[64px] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-red)] to-transparent z-0"></div>
            
            <div className="relative z-10 pr-0 lg:pr-[28px]">
              <div className="w-[70px] h-[70px] border-2 border-[var(--accent-red)] flex items-center justify-center mb-[28px] bg-[var(--bg-surface)] relative before:content-[''] before:absolute before:inset-[4px] before:bg-[var(--accent-red-dim)] rounded-none">
                <span className="font-archivo text-[22px] text-[var(--accent-red)] relative z-10">01</span>
              </div>
              <div className="inline-block bg-[var(--accent-red)] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Trigger</div>
              <h3 className="font-archivo text-[15px] uppercase tracking-[-0.2px] text-[var(--text)] mb-[10px]">Code is Pushed</h3>
              <p className="text-[13.5px] leading-[1.65] text-[var(--text-dim)]">Developer opens a PR in GitHub or initiates a deployment in Copado.</p>
            </div>

            <div className="relative z-10 pr-0 lg:pr-[28px]">
              <div className="w-[70px] h-[70px] border-2 border-[var(--accent-red)] flex items-center justify-center mb-[28px] bg-[var(--bg-surface)] relative before:content-[''] before:absolute before:inset-[4px] before:bg-[var(--accent-red-dim)] rounded-none">
                <span className="font-archivo text-[22px] text-[var(--accent-red)] relative z-10">02</span>
              </div>
              <div className="inline-block bg-[var(--accent-red)] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Intercept</div>
              <h3 className="font-archivo text-[15px] uppercase tracking-[-0.2px] text-[var(--text)] mb-[10px]">Jataka Intercepts</h3>
              <p className="text-[13.5px] leading-[1.65] text-[var(--text-dim)]">As a native Quality Gate, Jataka triggers an isolated "Kamikaze" Kubernetes Pod to run the test in a Sandbox.</p>
            </div>

            <div className="relative z-10 pr-0 lg:pr-[28px]">
              <div className="w-[70px] h-[70px] border-2 border-[var(--accent-red)] flex items-center justify-center mb-[28px] bg-[var(--bg-surface)] relative before:content-[''] before:absolute before:inset-[4px] before:bg-[var(--accent-red-dim)] rounded-none">
                <span className="font-archivo text-[22px] text-[var(--accent-red)] relative z-10">03</span>
              </div>
              <div className="inline-block bg-[var(--accent-red)] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Profile</div>
              <h3 className="font-archivo text-[15px] uppercase tracking-[-0.2px] text-[var(--text)] mb-[10px]">Runtime Profiling</h3>
              <p className="text-[13.5px] leading-[1.65] text-[var(--text-dim)]">Jataka correlates UI actions with the Salesforce Tooling API to count limits and measure latency.</p>
            </div>

            <div className="relative z-10 pr-0">
              <div className="w-[70px] h-[70px] border-2 border-[var(--accent-red)] flex items-center justify-center mb-[28px] bg-[var(--bg-surface)] relative before:content-[''] before:absolute before:inset-[4px] before:bg-[var(--accent-red-dim)] rounded-none">
                <span className="font-archivo text-[22px] text-[var(--accent-red)] relative z-10">04</span>
              </div>
              <div className="inline-block bg-[var(--accent-red)] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[10px] rounded-[2px]">Verdict</div>
              <h3 className="font-archivo text-[15px] uppercase tracking-[-0.2px] text-[var(--text)] mb-[10px]">Pass or Block</h3>
              <p className="text-[13.5px] leading-[1.65] text-[var(--text-dim)]">Safe code gets merged. Limit-breaching code gets blocked with an AI-generated fix sent back to the developer.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: DEVELOPER BRAIN ── */}
      <section id="brain" className="relative overflow-hidden bg-[var(--bg)]">
        <div className="s-inner">
          <div className="s-label">Developer Tools</div>
          <h2 className="s-hl">The Ultimate Salesforce Co-Pilot<br/>for Your IDE and Slack.</h2>
          <p className="text-[18px] leading-[1.72] text-[var(--text-dim)] max-w-[700px] mb-[48px]">
            Because Jataka maps your entire Salesforce architecture into a Graph Database, 
            <strong className="text-[var(--text)] font-bold"> we know your specific Org better than any generic AI model.</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[40px] md:p-[46px] relative overflow-hidden rounded-[4px]">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[var(--accent-red)]"></div>
              <span className="text-[28px] block mb-[20px]">⬡</span>
              <h3 className="font-archivo text-[19px] uppercase text-[var(--text)] mb-[12px]">IDE Context (MCP)</h3>
              <p className="text-[14.5px] leading-[1.72] text-[var(--text-dim)]">
                Pipe your proprietary Salesforce data model directly into Cursor. Write Apex that 
                actually understands your custom objects, field relationships, and validation rules — 
                not generic boilerplate.
              </p>
            </div>
            
            <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[40px] md:p-[46px] relative overflow-hidden rounded-[4px]">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[var(--accent-red)]"></div>
              <span className="text-[28px] block mb-[20px]">◈</span>
              <h3 className="font-archivo text-[19px] uppercase text-[var(--text)] mb-[12px]">Senior Deflection in Slack</h3>
              <p className="text-[14.5px] leading-[1.72] text-[var(--text-dim)]">
                Junior developers stuck on an error? They ask the Jataka Slack bot. It analyzes 
                your Org's architecture and historic Jira tickets to give the right answer, 
                protecting your Senior Architects' time.
              </p>
            </div>
          </div>

          <div className="mt-[80px] p-[40px] md:p-[52px] bg-[var(--bg-card)] border border-[var(--border)] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-[40px] md:gap-[48px] items-center rounded-[4px]">
            <div>
              <div className="arena">JATAKA IS THE OPERATING SYSTEM</div>
              <p className="mt-[20px] text-[15.5px] text-[var(--text-dim)] max-w-[480px] leading-[1.65]">
                Making enterprises autonomous. The chaos is over. When your entire Salesforce 
                architecture lives in a Knowledge Graph, every tool — your IDE, your CI/CD, your 
                Slack — gets smarter with every deployment.
              </p>
            </div>
            <div className="text-left lg:text-right border-t border-[var(--border)] lg:border-t-0 pt-[20px] lg:pt-0">
              <div className="font-archivo text-[clamp(52px,7vw,88px)] text-[var(--accent-red)] leading-[0.84] uppercase">
                JATAKA<br/>ENDS IT
              </div>
              <div className="mt-[10px] text-[11px] uppercase tracking-[2px] text-[var(--text-muted)] font-bold leading-[1.5]">
                We do not watch the agents.<br/>We command them.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: AUTONOMOUS SDLC ── */}
      <section id="sdlc" className="relative overflow-hidden bg-[var(--bg-surface)] border-y border-[var(--border)]">
        <div className="grid-bg opacity-40"></div>
        <div className="s-inner">
          <div className="s-label">Highest-Value IP</div>
          <h2 className="s-hl">The Autonomous SDLC.</h2>
          <p className="s-sub">Jataka doesn't just wait for pull requests. It manages the entire lifecycle.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] lg:gap-[32px] mt-[48px]">
            {/* Intent */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[32px] relative overflow-hidden rounded-[4px]">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[#FF2424]"></div>
              <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center mb-[20px]">
                <span className="text-[20px]">📋</span>
              </div>
              <div className="inline-block bg-[#FF2424] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[12px] rounded-[2px]">Step 1</div>
              <h3 className="font-archivo text-[17px] uppercase tracking-[-0.3px] text-[var(--text)] mb-[10px]">Intent (Jira)</h3>
              <p className="text-[14px] leading-[1.7] text-[var(--text-dim)]">
                Jataka reads the Jira ticket and updates the Neo4j graph with the business intent. Your feature requirements become structured context.
              </p>
            </div>

            {/* Code */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[32px] relative overflow-hidden rounded-[4px]">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[#FF6B35]"></div>
              <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FF6B35]/10 flex items-center justify-center mb-[20px]">
                <span className="text-[20px]">⌨️</span>
              </div>
              <div className="inline-block bg-[#FF6B35] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[12px] rounded-[2px]">Step 2</div>
              <h3 className="font-archivo text-[17px] uppercase tracking-[-0.3px] text-[var(--text)] mb-[10px]">Code (Cursor)</h3>
              <p className="text-[14px] leading-[1.7] text-[var(--text-dim)]">
                Through our MCP, your developer asks Cursor how to build the feature. Jataka feeds Cursor the exact blast radius and safe code patterns.
              </p>
            </div>

            {/* Verify */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[32px] relative overflow-hidden rounded-[4px]">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[#FFB800]"></div>
              <div className="w-[48px] h-[48px] rounded-[8px] bg-[#FFB800]/10 flex items-center justify-center mb-[20px]">
                <span className="text-[20px]">🔍</span>
              </div>
              <div className="inline-block bg-[#FFB800] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[12px] rounded-[2px]">Step 3</div>
              <h3 className="font-archivo text-[17px] uppercase tracking-[-0.3px] text-[var(--text)] mb-[10px]">Verify (GitHub)</h3>
              <p className="text-[14px] leading-[1.7] text-[var(--text-dim)]">
                The developer opens a PR. Jataka's API Firewall and Kamikaze Pods test the limits and the UI automatically.
              </p>
            </div>

            {/* Resolve */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[32px] relative overflow-hidden rounded-[4px]">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[#22c55e]"></div>
              <div className="w-[48px] h-[48px] rounded-[8px] bg-[#22c55e]/10 flex items-center justify-center mb-[20px]">
                <span className="text-[20px]">✅</span>
              </div>
              <div className="inline-block bg-[#22c55e] text-white font-archivo text-[9px] tracking-[2px] uppercase px-[8px] py-[2px] mb-[12px] rounded-[2px]">Step 4</div>
              <h3 className="font-archivo text-[17px] uppercase tracking-[-0.3px] text-[var(--text)] mb-[10px]">Resolve (Jira)</h3>
              <p className="text-[14px] leading-[1.7] text-[var(--text-dim)]">
                If limits breach, Jataka sends feedback back to Cursor. If it passes, Jataka updates the Jira ticket to "Ready for Deployment" with attached video proof.
              </p>
            </div>
          </div>

          <div className="mt-[48px] p-[40px] md:p-[48px] bg-[var(--bg-card)] border border-[var(--border)] rounded-[4px]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-[40px] items-center">
              <div>
                <h3 className="font-archivo text-[24px] uppercase tracking-[-0.5px] text-[var(--text)] mb-[16px]">The Result</h3>
                <p className="text-[15.5px] leading-[1.7] text-[var(--text-dim)]">
                  Your developers stay in their IDE. Jataka handles the <strong className="text-[var(--text)] font-bold">orchestration</strong>, 
                  the <strong className="text-[var(--text)] font-bold">testing</strong>, and the <strong className="text-[var(--text)] font-bold">ticket management</strong>. 
                  This closed loop — Jira to Cursor to GitHub to Jataka back to Jira — is your highest-value intellectual property. 
                  You aren't just catching limits; you are automating the entire Software Development Life Cycle.
                </p>
                <button 
                  onClick={() => router.push("/use-cases/autonomous-sdlc")} 
                  className="mt-[24px] inline-flex items-center gap-[8px] text-[13px] font-archivo uppercase tracking-[1.5px] text-[#FF2424] hover:text-[#d91f1f] transition-colors"
                >
                  See Full Use Case →
                </button>
              </div>
              <div className="bg-[var(--bg)] rounded-[4px] p-[24px] border border-[var(--border)]">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[1px] text-[var(--text-muted)] mb-[16px]">
                  <span>Closed Loop</span>
                  <span className="text-[#22c55e]">● Active</span>
                </div>
                <div className="flex items-center justify-center gap-[12px] text-[var(--text)]">
                  <div className="text-center">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#FF2424]/10 flex items-center justify-center mx-auto mb-[6px] text-[16px]">📋</div>
                    <span className="text-[10px] uppercase tracking-[0.5px]">Jira</span>
                  </div>
                  <span className="text-[#FF2424]">→</span>
                  <div className="text-center">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-[6px] text-[16px]">⌨️</div>
                    <span className="text-[10px] uppercase tracking-[0.5px]">Cursor</span>
                  </div>
                  <span className="text-[#FF2424]">→</span>
                  <div className="text-center">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#FFB800]/10 flex items-center justify-center mx-auto mb-[6px] text-[16px]">🔍</div>
                    <span className="text-[10px] uppercase tracking-[0.5px]">GitHub</span>
                  </div>
                  <span className="text-[#FF2424]">→</span>
                  <div className="text-center">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#FF2424]/20 flex items-center justify-center mx-auto mb-[6px] text-[16px] font-bold text-[#FF2424]">J</div>
                    <span className="text-[10px] uppercase tracking-[0.5px]">Jataka</span>
                  </div>
                  <span className="text-[#22c55e]">↩</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FINAL CTA ── */}
      <section id="final-cta" className="relative overflow-hidden bg-[var(--bg-surface)] border-t border-[var(--border)]">
        <div className="grid-bg"></div>
        <div className="max-w-[1200px] mx-auto px-[24px] md:px-[48px] py-[130px] text-center relative z-10">
          <div className="s-label justify-center">Zero Deployment Rollbacks</div>
          <h2 className="font-archivo text-[clamp(36px,5.5vw,72px)] leading-[0.93] tracking-[-2px] uppercase mb-[28px]">
            <span className="cut-white">Don't Let Invisible</span>
            <span className="cut-white">Limits Crash</span>
            <span className="cut-red">Your Revenue.</span>
          </h2>
          <p className="text-[17px] text-[var(--text-dim)] max-w-[520px] mx-auto mb-[52px] leading-[1.65]">
            Join the top-tier Salesforce teams who trust Jataka to guarantee zero deployment rollbacks.
          </p>
          <button onClick={() => router.push("/book-pilot")} className="btn-primary text-[16px] px-[52px] py-[20px] mx-auto rounded-[4px]">
            &#9654;&nbsp; Book a Technical Deep-Dive
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[var(--bg)] border-t border-[var(--border)] px-[24px] md:px-[48px] py-[40px] flex flex-col md:flex-row items-center justify-between gap-[20px]">
        <div className="flex items-center gap-[14px]">
          <svg className="h-[19px] w-auto" viewBox="489.5 574 2305.4 484.92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M877.432 574C930.994 574 974.419 617.425 974.419 670.987C974.418 697.813 963.525 722.093 945.923 739.648C924.44 761.073 901.681 786.114 901.681 816.454C901.681 846.795 924.441 871.837 945.923 893.264C963.526 910.822 974.418 935.105 974.419 961.932C974.419 1015.49 930.994 1058.92 877.432 1058.92C850.604 1058.92 826.319 1048.02 808.76 1030.42C787.337 1008.94 762.298 986.181 731.959 986.181C701.621 986.181 676.582 1008.94 655.159 1030.42C637.6 1048.02 613.315 1058.92 586.487 1058.92C532.925 1058.92 489.5 1015.49 489.5 961.932C489.502 908.371 532.926 864.953 586.487 864.953C613.316 864.954 637.601 875.848 655.159 893.453C676.582 914.934 701.622 937.691 731.959 937.691C762.297 937.691 787.402 914.81 808.854 893.357C830.307 871.902 853.191 846.795 853.191 816.454C853.191 786.114 830.432 761.074 808.949 739.649C791.346 722.093 780.454 697.813 780.453 670.987C780.453 617.426 823.871 574.002 877.432 574Z" fill="#3A4F6A"/>
            <path d="M1292.08 685.6V907.648C1292.08 932.992 1285.03 952.72 1270.92 966.832C1257.09 980.944 1237.36 988 1211.73 988H1156V931.84H1191.86C1204.53 931.84 1213.6 928.96 1219.08 923.2C1224.55 917.152 1227.28 907.792 1227.28 895.12V685.6H1292.08Z" fill="#3A4F6A"/>
            <path d="M1332.31 988L1442.9 685.6H1520.66L1630.39 988H1560.83L1537.51 921.904H1422.59L1399.27 988H1332.31ZM1439.87 869.632H1519.79L1479.62 754.72L1439.87 869.632Z" fill="#3A4F6A"/>
            <path d="M1621.19 685.6H1860.52V741.328H1773.26V988H1708.46V741.328H1621.19V685.6Z" fill="#3A4F6A"/>
            <path d="M1851.07 988L1961.66 685.6H2039.42L2149.15 988H2079.6L2056.27 921.904H1941.36L1918.03 988H1851.07ZM1958.64 869.632H2038.56L1998.38 754.72L1958.64 869.632Z" fill="#3A4F6A"/>
            <path d="M2199.4 686.032H2264.2V821.68L2385.16 686.032H2463.79L2352.76 810.448L2471.13 988H2393.37L2306.97 860.56L2264.2 908.512V988H2199.4V686.032Z" fill="#3A4F6A"/>
            <path d="M2496.82 988L2607.41 685.6H2685.17L2794.9 988H2725.35L2702.02 921.904H2587.11L2563.78 988H2496.82ZM2604.39 869.632H2684.31L2644.13 754.72L2604.39 869.632Z" fill="#3A4F6A"/>
          </svg>
          <div className="font-archivo text-[11px] uppercase tracking-[2px] text-[var(--text-muted)]">jataka.shodh.ai</div>
        </div>
        <div className="text-[13px] text-[var(--text-muted)] text-center md:text-right">
          &copy; 2025 Jataka · Runtime Governance for Salesforce · All rights reserved.
        </div>
      </footer>
    </>
  );
};