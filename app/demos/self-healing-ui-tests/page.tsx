"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Shield, Clock, ArrowLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

// Scroll reveal hook
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Light grid background component
function LightGridBg() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(26,26,26,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(26,26,26,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px'
      }}
    />
  );
}

// Floating accent blob
function FloatingBlob({ className }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <div className="w-[300px] h-[300px] rounded-full bg-[#FF2424]/5 blur-[100px] animate-pulse" />
    </div>
  );
}

// Reveal wrapper component
function Reveal({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Self-Healing UI Tests - Jataka Demo",
  "description": "Watch Jataka's Vision AI automatically heal UI tests when Salesforce releases break Selenium scripts. Zero maintenance for UI changes.",
  "thumbnailUrl": "https://jataka.io/thumbnails/self-healing-ui-tests.png",
  "uploadDate": "2024-01-15",
  "duration": "PT2M18S",
  "contentUrl": "https://www.youtube.com/watch?v=SdXRbVhZMzg",
  "embedUrl": "https://www.youtube.com/embed/SdXRbVhZMzg",
  "publisher": {
    "@type": "Organization",
    "name": "Jataka",
    "logo": {
      "@type": "ImageObject",
      "url": "https://jataka.io/logo.png"
    }
  },
  "about": {
    "@type": "SoftwareApplication",
    "name": "Jataka",
    "applicationCategory": "DeveloperApplication"
  }
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://jataka.io"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Demos",
      "item": "https://jataka.io/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Self-Healing UI Tests",
      "item": "https://jataka.io/demos/self-healing-ui-tests"
    }
  ]
};

export default function SelfHealingUITestsDemo() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const keyTakeaways = [
    {
      title: "Visual Element Recognition",
      description: "Jataka recognizes UI elements the way a human does—by visual appearance, position, and context. No brittle CSS selectors that break on every release."
    },
    {
      title: "Automatic Test Healing",
      description: "When an element changes, we update the selector in real-time. The test passes, and you get a notification about the change. Zero manual maintenance."
    },
    {
      title: "Works with Any Framework",
      description: "Playwright, Selenium, Cypress—Jataka's Vision AI works with all major testing frameworks. No rewrite required."
    },
    {
      title: "90% Maintenance Reduction",
      description: "QA teams report 90% reduction in test maintenance overhead. Tests stay green through Salesforce releases without human intervention."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Test Starts Failing",
      description: "A Playwright test is clicking a 'Submit Order' button. Salesforce's weekly release changed the button's data-testid from 'submit-btn' to 'submit-order-btn'. The test fails."
    },
    {
      step: 2,
      title: "Vision AI Wakes Up",
      description: "Jataka's Vision AI detects the test failure and captures the current state of the Salesforce UI. It analyzes the page visually."
    },
    {
      step: 3,
      title: "Element Matching",
      description: "The Vision AI compares the current UI against its visual model. It recognizes the button by its position, label, color, and context—not by the changed selector."
    },
    {
      step: 4,
      title: "Selector Updated",
      description: "Jataka automatically updates the selector in real-time. The test is re-run with the new selector. It passes."
    },
    {
      step: 5,
      title: "Notification Sent",
      description: "You get a notification: 'Submit Order button selector updated. Test healed automatically.' No human intervention required."
    }
  ];

  const salesforceReleases = [
    { release: "Spring '24", change: "LWC component updates, new button IDs", testsBroken: "150+", jatakaResult: "0 broken" },
    { release: "Summer '24", change: "Lightning page layout changes", testsBroken: "200+", jatakaResult: "0 broken" },
    { release: "Winter '25", change: "Color scheme updates, DOM restructuring", testsBroken: "180+", jatakaResult: "0 broken" },
  ];

  const relatedDemos = [
    { slug: "catching-sev1-limits", title: "Catching Sev-1 Limits", duration: "2:45" },
    { slug: "blast-radius-prediction", title: "Blast Radius Prediction", duration: "2:52" },
  ];

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">
        {/* ── NAV ── */}
        <nav className="fixed top-0 left-0 right-0 z-[200] h-[64px] bg-[#FAF8F3]/90 backdrop-blur-[14px] border-b border-[#1a1a1a]/10 px-[24px] md:px-[48px] flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
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
          <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
            <li><button onClick={() => router.push("/")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Home</button></li>
            <li><button onClick={() => router.push("/blog")} className="text-[#1a1a1a] font-medium text-[13.5px] tracking-[0.4px]">Demos</button></li>
            <li><button onClick={() => router.push("/use-cases")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</button></li>
            <li><button onClick={() => router.push("/docs")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Docs</button></li>
            <li><button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book Demo</button></li>
          </ul>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-[#1a1a1a] p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="absolute top-[64px] left-0 w-full bg-[#FAF8F3] border-b border-[#1a1a1a]/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl z-[190]">
              <button onClick={() => router.push("/")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Home</button>
              <button onClick={() => router.push("/blog")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Demos</button>
              <button onClick={() => router.push("/use-cases")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Use Cases</button>
              <button onClick={() => router.push("/docs")} className="text-left text-lg font-medium text-[#1a1a1a] py-2 border-b border-[#1a1a1a]/10">Docs</button>
              <button onClick={() => router.push("/book-pilot")} className="w-full py-4 mt-2 rounded-md bg-[#FF2424] text-white font-archivo uppercase tracking-widest text-sm flex items-center justify-center">
                Book a Demo
              </button>
            </div>
          )}
        </nav>

        {/* ── HERO SECTION ── */}
        <section className="relative min-h-[60vh] flex flex-col justify-center px-[40px] md:px-[80px] lg:px-[120px] xl:px-[160px] pt-[120px] pb-[60px] overflow-hidden">
          <LightGridBg />
          <FloatingBlob className="top-[20%] right-[10%]" />
          <FloatingBlob className="bottom-[30%] left-[5%]" />
          
          <div className="relative z-10 max-w-[1000px]">
            {/* Back Link */}
            <Reveal>
              <button 
                onClick={() => router.push("/blog")} 
                className="flex items-center gap-[8px] text-[#666] hover:text-[#FF2424] transition-colors mb-[40px] text-[14px]"
              >
                <ArrowLeft className="w-[14px] h-[14px]" />
                Back to All Demos
              </button>
            </Reveal>

            <Reveal delay={50}>
              <div className="flex items-center gap-[16px] mb-[30px]">
                <div className="w-[56px] h-[56px] rounded-[12px] bg-[#FF2424]/10 flex items-center justify-center">
                  <Shield className="w-[24px] h-[24px] text-[#FF2424]" />
                </div>
                <div>
                  <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888]">Demo 02</p>
                  <p className="text-[14px] text-[#FF2424] font-medium">Kamikaze Engine</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px]">
                Self-Healing UI Tests<br />
                <span className="text-[#FF2424]">Zero Maintenance</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[20px]">
                See what happens when Salesforce releases a UI update that changes a Lightning Web Component button's ID and styling. 
                <strong className="text-[#1a1a1a] font-semibold"> Jataka's Vision AI heals the test automatically.</strong>
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex items-center gap-[16px] text-[14px] text-[#666]">
                <div className="flex items-center gap-[6px]">
                  <Clock className="w-[14px] h-[14px]" />
                  <span>2:18</span>
                </div>
                <span className="text-[#1a1a1a]/20">|</span>
                <span>Vision AI • Self-Healing • Playwright • LWC Testing</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── VIDEO SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden bg-[#F5F0E8]">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px]">
            <Reveal>
              <div className="relative aspect-video bg-[#1a1a1a] rounded-[12px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/SdXRbVhZMzg"
                  title="Self-Healing UI Tests"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── THE SCENARIO SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">The Scenario</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(32px,4.5vw,48px)] leading-[1] tracking-[-1.5px] uppercase mb-[40px]">
                What you'll see<br />
                <span className="text-[#FF2424]">in this demo.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-white rounded-[12px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 mb-[40px]">
                <p className="text-[17px] leading-[1.7] text-[#444] mb-[24px]">
                  A Playwright test is clicking a 'Submit Order' button. Salesforce's weekly release changes the button's 
                  <code className="bg-[#1a1a1a]/5 px-[6px] py-[2px] rounded-[4px] text-[14px]">data-testid</code> from 
                  <code className="bg-[#1a1a1a]/5 px-[6px] py-[2px] rounded-[4px] text-[14px]">'submit-btn'</code> to 
                  <code className="bg-[#1a1a1a]/5 px-[6px] py-[2px] rounded-[4px] text-[14px]">'submit-order-btn'</code>.
                </p>
                <p className="text-[17px] leading-[1.7] text-[#444] mb-[24px]">
                  The test starts to fail. Jataka's Vision AI wakes up, analyzes the page visually, identifies the button by its 
                  position, label, and context, updates the selector in real-time, and the test passes—<strong className="text-[#FF2424]">without any human intervention.</strong>
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <div className="bg-[#FF2424]/5 border-l-[3px] border-[#FF2424] p-[24px] rounded-[4px]">
                  <p className="text-[14px] font-medium uppercase tracking-[1px] text-[#FF2424] mb-[12px]">Without Jataka</p>
                  <p className="text-[15px] leading-[1.7] text-[#444]">
                    200+ Selenium scripts break. QA team spends 2 sprints fixing selectors. New features go untested while 
                    old tests get fixed. QA becomes a maintenance team.
                  </p>
                </div>
                <div className="bg-[#1a1a1a]/5 border-l-[3px] border-[#1a1a1a] p-[24px] rounded-[4px]">
                  <p className="text-[14px] font-medium uppercase tracking-[1px] text-[#1a1a1a] mb-[12px]">With Jataka</p>
                  <p className="text-[15px] leading-[1.7] text-[#444]">
                    Test heals automatically. QA team gets a notification. Zero maintenance overhead. QA focuses on testing 
                    new features, not fixing old tests.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── HOW IT WORKS SECTION ── */}
        <section className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">How It Works</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(32px,4.5vw,48px)] leading-[1] tracking-[-1.5px] uppercase mb-[60px]">
                Five steps to<br />
                <span className="text-[#FF2424]">zero maintenance.</span>
              </h2>
            </Reveal>

            <div className="space-y-[24px]">
              {howItWorks.map((step, index) => (
                <Reveal key={step.step} delay={200 + index * 50}>
                  <div className="flex gap-[20px] items-start">
                    <div className="flex-shrink-0 w-[40px] h-[40px] rounded-[8px] bg-[#FF2424]/10 flex items-center justify-center">
                      <span className="font-archivo text-[16px] text-[#FF2424]">{step.step}</span>
                    </div>
                    <div className="flex-1 pt-[6px]">
                      <h3 className="font-archivo text-[16px] uppercase tracking-[0.5px] mb-[6px]">
                        {step.title}
                      </h3>
                      <p className="text-[15px] leading-[1.7] text-[#555]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SALESFORCE RELEASES TABLE ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">Real Results</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(32px,4.5vw,48px)] leading-[1] tracking-[-1.5px] uppercase mb-[50px]">
                Tests stay green<br />
                <span className="text-[#FF2424]">through every release.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1a1a1a]/10">
                      <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#888]">Release</th>
                      <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#888]">Changes</th>
                      <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#FF2424]">Without Jataka</th>
                      <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#1a1a1a]">With Jataka</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesforceReleases.map((row) => (
                      <tr key={row.release} className="border-b border-[#1a1a1a]/5">
                        <td className="py-[20px] px-[16px] text-[14px] font-medium text-[#1a1a1a]">{row.release}</td>
                        <td className="py-[20px] px-[16px] text-[14px] text-[#666]">{row.change}</td>
                        <td className="py-[20px] px-[16px] text-[14px] text-[#FF2424]">{row.testsBroken}</td>
                        <td className="py-[20px] px-[16px] text-[14px] text-[#1a1a1a] font-medium">{row.jatakaResult}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── KEY TAKEAWAYS SECTION ── */}
        <section className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">Key Takeaways</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(32px,4.5vw,48px)] leading-[1] tracking-[-1.5px] uppercase mb-[60px]">
                What makes this<br />
                <span className="text-[#FF2424]">different.</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {keyTakeaways.map((takeaway, index) => (
                <Reveal key={takeaway.title} delay={200 + index * 50}>
                  <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300">
                    <h3 className="font-archivo text-[16px] uppercase tracking-[0.5px] mb-[12px]">
                      {takeaway.title}
                    </h3>
                    <p className="text-[15px] leading-[1.7] text-[#555]">
                      {takeaway.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED DEMOS SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">Related Demos</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1] tracking-[-1px] uppercase mb-[40px]">
                Watch more demos.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              {relatedDemos.map((demo) => (
                <Reveal key={demo.slug} delay={200}>
                  <button
                    onClick={() => router.push(`/demos/${demo.slug}`)}
                    className="group w-full text-left bg-white rounded-[12px] p-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-archivo text-[18px] uppercase tracking-[0.5px] mb-[8px] group-hover:text-[#FF2424] transition-colors">
                          {demo.title}
                        </h3>
                        <p className="text-[13px] text-[#666] flex items-center gap-[6px]">
                          <Clock className="w-[12px] h-[12px]" />
                          {demo.duration}
                        </p>
                      </div>
                      <ChevronRight className="w-[20px] h-[20px] text-[#666] group-hover:text-[#FF2424] group-hover:translate-x-[4px] transition-all" />
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="relative bg-[#1a1a1a] overflow-hidden">
          <LightGridBg />
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[100px] text-center">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                Kill Test Maintenance
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Book a demo and see<br />
                <span className="text-[#FF2424]">Vision AI heal your tests.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                We'll show you how Jataka's Vision AI can automatically heal your UI tests when Salesforce releases break your selectors.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row gap-[16px] justify-center">
                <button 
                  onClick={() => router.push("/book-pilot")} 
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Book a Demo
                  <svg className="w-[16px] h-[16px] group-hover:translate-x-[4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button 
                  onClick={() => router.push("/docs")} 
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Read the Docs
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
