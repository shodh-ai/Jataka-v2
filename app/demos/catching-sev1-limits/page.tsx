"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Zap, Clock, ArrowLeft, ChevronRight } from "lucide-react";
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
  "name": "Catching Sev-1 Limits Before the Merge - Jataka Demo",
  "description": "Watch Jataka catch a SOQL query inside a for loop before it causes a production incident. Real-time limit profiling during PR review with automatic merge blocking.",
  "thumbnailUrl": "https://jataka.io/thumbnails/catching-sev1-limits.png",
  "uploadDate": "2024-01-15",
  "duration": "PT2M45S",
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
      "name": "Catching Sev-1 Limits",
      "item": "https://jataka.io/demos/catching-sev1-limits"
    }
  ]
};

export default function CatchingSev1LimitsDemo() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const keyTakeaways = [
    {
      title: "Real-time Limit Profiling",
      description: "Jataka profiles Governor Limits during PR review, not after deployment. Every SOQL query, DML statement, and CPU millisecond is measured in a real execution environment."
    },
    {
      title: "Automatic Merge Blocking",
      description: "When a threshold is breached, the PR is automatically blocked. No manual intervention required. The developer gets immediate feedback with a detailed limit report."
    },
    {
      title: "Line-by-Line Attribution",
      description: "Jataka tells you exactly which line caused the breach. No more hunting through debug logs trying to find the culprit."
    },
    {
      title: "Zero False Positives",
      description: "We don't estimate. We execute. If we say you're at 147/100 SOQL queries, that's a measured fact from actual execution, not a static analysis guess."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Developer Pushes Code",
      description: "A developer pushes a PR containing a SOQL query inside a for loop. The code compiles. Tests pass. Everything looks fine."
    },
    {
      step: 2,
      title: "Kamikaze Pod Spins Up",
      description: "Jataka receives the webhook and spins up an isolated Sandbox environment with Production-like data volumes."
    },
    {
      step: 3,
      title: "Real Transaction Execution",
      description: "The Apex code is executed against actual Sandbox data volumes. Triggers fire. Flows run. The SOQL query inside the for loop is physically executed 147 times."
    },
    {
      step: 4,
      title: "Limit Headers Parsed",
      description: "Jataka parses the Sforce-Limit-Info headers from the debug logs. The result: 147 SOQL queries against a limit of 100."
    },
    {
      step: 5,
      title: "PR Blocked Automatically",
      description: "The PR status is set to failed. A detailed limit report is posted as a PR comment showing exactly which line caused the breach."
    },
    {
      step: 6,
      title: "Developer Fixes & Repushes",
      description: "The developer sees the report, moves the SOQL outside the loop, and repushes. This time, the PR passes."
    }
  ];

  const relatedDemos = [
    { slug: "self-healing-ui-tests", title: "Self-Healing UI Tests", duration: "2:18" },
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
                  <Zap className="w-[24px] h-[24px] text-[#FF2424]" />
                </div>
                <div>
                  <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888]">Demo 01</p>
                  <p className="text-[14px] text-[#FF2424] font-medium">API Engine</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px]">
                Catching Sev-1 Limits<br />
                <span className="text-[#FF2424]">Before the Merge</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[20px]">
                Watch a developer make a critical mistake, placing a SOQL query inside a for loop. 
                <strong className="text-[#1a1a1a] font-semibold"> Jataka catches it before the merge, preventing a production incident.</strong>
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex items-center gap-[16px] text-[14px] text-[#666]">
                <div className="flex items-center gap-[6px]">
                  <Clock className="w-[14px] h-[14px]" />
                  <span>2:45</span>
                </div>
                <span className="text-[#1a1a1a]/20">|</span>
                <span>Governor Limits • PR Blocking • SOQL Analysis</span>
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
                  title="Catching Sev-1 Limits Before the Merge"
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
                  The developer pushes the code to GitHub. Within 5 seconds, Jataka's Kamikaze Pod spins up, 
                  executes the transaction in an isolated Sandbox, and parses the Sforce-Limit-Info headers.
                </p>
                <p className="text-[17px] leading-[1.7] text-[#444] mb-[24px]">
                  <strong className="text-[#FF2424]">The result:</strong> 147 SOQL queries against a limit of 100. 
                </p>
                <p className="text-[17px] leading-[1.7] text-[#444]">
                  The PR is automatically blocked with a detailed limit report showing exactly which line caused the breach.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <div className="bg-[#FF2424]/5 border-l-[3px] border-[#FF2424] p-[24px] rounded-[4px]">
                  <p className="text-[14px] font-medium uppercase tracking-[1px] text-[#FF2424] mb-[12px]">Without Jataka</p>
                  <p className="text-[15px] leading-[1.7] text-[#444]">
                    Code deploys to production. During peak hours, the sales portal crashes. Sev-1 incident. 
                    4-8 hours to rollback and restore. $50K+/hr in lost revenue.
                  </p>
                </div>
                <div className="bg-[#1a1a1a]/5 border-l-[3px] border-[#1a1a1a] p-[24px] rounded-[4px]">
                  <p className="text-[14px] font-medium uppercase tracking-[1px] text-[#1a1a1a] mb-[12px]">With Jataka</p>
                  <p className="text-[15px] leading-[1.7] text-[#444]">
                    PR is blocked before merge. Developer gets instant feedback. Fixes the issue in 5 minutes. 
                    Zero production impact. Zero revenue lost.
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
                Six steps to<br />
                <span className="text-[#FF2424]">zero Sev-1s.</span>
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

        {/* ── KEY TAKEAWAYS SECTION ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
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
        <section className="relative bg-[#F5F0E8] border-t border-[#1a1a1a]/10 overflow-hidden">
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
                See It In Your Org
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Book a demo and see<br />
                <span className="text-[#FF2424]">Jataka catch your limits.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                We'll run Jataka on your actual Salesforce codebase and show you exactly what Governor Limit risks we find.
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
