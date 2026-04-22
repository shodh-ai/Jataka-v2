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
      description: "Jataka recognizes UI elements the way a human does, by visual appearance, position, and context. No brittle CSS selectors that break on every release."
    },
    {
      title: "Automatic Test Healing",
      description: "When an element changes, we update the selector in real-time. The test passes, and you get a notification about the change. Zero manual maintenance."
    },
    {
      title: "Works with Any Framework",
      description: "Playwright, Selenium, Cypress, Jataka's Vision AI works with all major testing frameworks. No rewrite required."
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
      title: "Vision Engine Intercepts",
      description: "Jataka's Vision Engine detects Playwright test failure and instantly captures DOM state of Salesforce UI. It analyzes the page visually, not just at the code level."
    },
    {
      step: 3,
      title: "Element Matching",
      description: "The Vision AI compares the current UI against its visual model. It recognizes the button by its position, label, color, and context, not by the changed selector."
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
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                  The test starts to fail. Jataka's Vision Engine intercepts, analyzes the page visually, identifies the button by its 
                  position, label, and context, updates the selector in real-time, and the test passes, <strong className="text-[#FF2424]">without any human intervention.</strong>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-stretch">
              {keyTakeaways.map((takeaway) => (
                <Reveal key={takeaway.title} delay={200} className="h-full min-h-0">
                  <div className="group bg-white rounded-[12px] p-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 h-full flex flex-col">
                    <h3 className="font-archivo text-[16px] uppercase tracking-[0.5px] mb-[12px]">
                      {takeaway.title}
                    </h3>
                    <p className="text-[15px] leading-[1.7] text-[#555] flex-1">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] items-stretch">
              {relatedDemos.map((demo) => (
                <Reveal key={demo.slug} delay={200} className="h-full min-h-0">
                  <button
                    onClick={() => router.push(`/demos/${demo.slug}`)}
                    className="group w-full h-full min-h-0 text-left bg-white rounded-[12px] p-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#1a1a1a]/5 hover:shadow-[0_8px_30px_rgba(255,36,36,0.08)] hover:border-[#FF2424]/20 transition-all duration-300 flex flex-col justify-between gap-[16px]"
                  >
                    <div className="flex items-center justify-between gap-[16px]">
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
