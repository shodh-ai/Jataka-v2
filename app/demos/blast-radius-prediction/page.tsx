"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, BrainCircuit, Clock, ArrowLeft, ChevronRight } from "lucide-react";
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
  "name": "AI-Assisted Blast Radius Prediction - Jataka Demo",
  "description": "Watch Jataka's Knowledge dependency graph calculate the blast radius of code changes before they're made. Integration with Cursor IDE via MCP protocol.",
  "thumbnailUrl": "https://jataka.io/thumbnails/blast-radius-prediction.png",
  "uploadDate": "2024-01-15",
  "duration": "PT2M52S",
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
      "name": "Blast Radius Prediction",
      "item": "https://jataka.io/demos/blast-radius-prediction"
    }
  ]
};

export default function BlastRadiusPredictionDemo() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const keyTakeaways = [
    {
      title: "Real-Time Dependency Graph",
      description: "Jataka maintains a Knowledge graph of your entire Salesforce org's dependencies. Every class, trigger, flow, and integration is mapped and queryable."
    },
    {
      title: "Cursor IDE Integration",
      description: "Ask questions via MCP protocol directly in Cursor. 'If I change this trigger, what breaks?' Get answers before writing a single line of code."
    },
    {
      title: "Predictive Impact Analysis",
      description: "Know the blast radius before you change. See every downstream class, flow, and integration that will be affected."
    },
    {
      title: "Prevent Cascading Failures",
      description: "Catch cascading deployment failures before they happen. Warn developers of risky changes during planning, not during rollback."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Developer Opens File",
      description: "A developer opens AccountTrigger.trigger in Cursor IDE. They're contemplating adding an after update handler."
    },
    {
      step: 2,
      title: "Developer Asks Question",
      description: "The developer asks via MCP: 'If I add an after update handler, what breaks?' The query is sent to Jataka's Knowledge graph."
    },
    {
      step: 3,
      title: "Graph Query Executes",
      description: "Jataka queries the dependency graph for all nodes connected to AccountTrigger. It traces downstream dependencies recursively."
    },
    {
      step: 4,
      title: "Blast Radius Calculated",
      description: "The graph returns: 3 Apex classes that call this trigger, 12 Flows that depend on the output, 2 integrations that sync on update."
    },
    {
      step: 5,
      title: "Critical Bug Identified",
      description: "Jataka also identifies 1 critical bug in ClassB that will cascade if the trigger is modified. The developer is warned before writing code."
    },
    {
      step: 6,
      title: "Disaster Averted",
      description: "Armed with exact blast radius, developer safely refactors code to avoid triggering downstream ClassB bug. A 4-hour Sev-2 rollback is prevented before a single line of code is merged."
    }
  ];

  const dependencyExample = [
    { type: "Apex Class", name: "AccountService", risk: "Medium", description: "Calls AccountTrigger.newCases" },
    { type: "Apex Class", name: "CaseAssignmentHandler", risk: "High", description: "Depends on trigger output order" },
    { type: "Flow", name: "Account_Update_Sync", risk: "Low", description: "Triggers on Account update" },
    { type: "Integration", name: "SAP_Sync_Integration", risk: "High", description: "Syncs on Account after update" },
    { type: "Known Bug", name: "ClassB.queryBug", risk: "Critical", description: "Will cascade if trigger fires" },
  ];

  const relatedDemos = [
    { slug: "catching-sev1-limits", title: "Catching Sev-1 Limits", duration: "2:45" },
    { slug: "self-healing-ui-tests", title: "Self-Healing UI Tests", duration: "2:18" },
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
                  <BrainCircuit className="w-[24px] h-[24px] text-[#FF2424]" />
                </div>
                <div>
                  <p className="text-[12px] font-mono uppercase tracking-[2px] text-[#888]">Demo 03</p>
                  <p className="text-[14px] text-[#FF2424] font-medium">Developer Experience</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px]">
                AI-Assisted Blast Radius<br />
                <span className="text-[#FF2424]">Prediction</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#444] max-w-[680px] mb-[20px]">
                Watch a developer using Cursor IDE contemplate changing a critical Apex Trigger. 
                <strong className="text-[#1a1a1a] font-semibold"> Before they even save the file, Jataka has already calculated the blast radius.</strong>
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex items-center gap-[16px] text-[14px] text-[#666]">
                <div className="flex items-center gap-[6px]">
                  <Clock className="w-[14px] h-[14px]" />
                  <span>2:52</span>
                </div>
                <span className="text-[#1a1a1a]/20">|</span>
                <span>Knowledge • MCP • Cursor IDE • Dependency Graph</span>
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
                  title="AI-Assisted Blast Radius Prediction"
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
                  The developer opens <code className="bg-[#1a1a1a]/5 px-[6px] py-[2px] rounded-[4px] text-[14px]">AccountTrigger.trigger</code> in Cursor. 
                  They ask via MCP: <em>"If I add an after update handler, what breaks?"</em>
                </p>
                <p className="text-[17px] leading-[1.7] text-[#444] mb-[24px]">
                  Jataka queries the Knowledge graph, which contains the entire org's dependency map. It returns: 
                  <strong className="text-[#FF2424"> 3 Apex classes that call this trigger, 12 Flows that depend on the output, 
                  2 integrations that sync on update, and 1 critical bug in ClassB that will cascade.</strong>
                </p>
                <p className="text-[17px] leading-[1.7] text-[#444]">
                  The developer is warned before writing a single line of code.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <div className="bg-[#FF2424]/5 border-l-[3px] border-[#FF2424] p-[24px] rounded-[4px]">
                  <p className="text-[14px] font-medium uppercase tracking-[1px] text-[#FF2424] mb-[12px]">Without Jataka</p>
                  <p className="text-[15px] leading-[1.7] text-[#444]">
                    Developer makes the change. Deploys. ClassB crashes in production. Cascading failures across 
                    3 integrations. 4-hour rollback. Sev-2 incident.
                  </p>
                </div>
                <div className="bg-[#1a1a1a]/5 border-l-[3px] border-[#1a1a1a] p-[24px] rounded-[4px]">
                  <p className="text-[14px] font-medium uppercase tracking-[1px] text-[#1a1a1a] mb-[12px]">With Jataka</p>
                  <p className="text-[15px] leading-[1.7] text-[#444]">
                    Developer sees the blast radius before coding. Fixes ClassB first. Deploys safely. 
                    Zero incidents. Zero rollback.
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
                <span className="text-[#FF2424]">informed decisions.</span>
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

        {/* ── DEPENDENCY TABLE ── */}
        <section className="relative border-t border-[#1a1a1a]/10 overflow-hidden">
          <LightGridBg />
          
          <div className="relative z-10 max-w-[1000px] mx-auto px-[40px] md:px-[80px] lg:px-[120px] py-[80px] md:py-[120px]">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#666] mb-[30px]">Example Output</p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(32px,4.5vw,48px)] leading-[1] tracking-[-1.5px] uppercase mb-[50px]">
                What the graph<br />
                <span className="text-[#FF2424]">reveals.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1a1a1a]/10">
                      <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#888]">Type</th>
                      <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#888]">Name</th>
                      <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#888]">Risk</th>
                      <th className="text-left py-[16px] px-[16px] text-[12px] font-medium uppercase tracking-[2px] text-[#888]">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dependencyExample.map((row) => (
                      <tr key={row.name} className="border-b border-[#1a1a1a]/5">
                        <td className="py-[16px] px-[16px] text-[13px] text-[#666]">{row.type}</td>
                        <td className="py-[16px] px-[16px] text-[14px] font-medium text-[#1a1a1a]">{row.name}</td>
                        <td className="py-[16px] px-[16px]">
                          <span className={`text-[12px] font-medium uppercase tracking-[1px] px-[10px] py-[4px] rounded-[4px] ${
                            row.risk === 'Critical' ? 'bg-[#FF2424]/10 text-[#FF2424]' :
                            row.risk === 'High' ? 'bg-[#FF2424]/10 text-[#FF2424]' :
                            row.risk === 'Medium' ? 'bg-[#FFA500]/10 text-[#FFA500]' :
                            'bg-[#1a1a1a]/5 text-[#666]'
                          }`}>
                            {row.risk}
                          </span>
                        </td>
                        <td className="py-[16px] px-[16px] text-[13px] text-[#555]">{row.description}</td>
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
                See Your Blast Radius
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Book a demo and see<br />
                <span className="text-[#FF2424]">your dependency graph.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                We'll map your Salesforce org's dependencies and show you exactly what will be affected before you make changes.
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
