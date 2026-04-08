"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Code, Search, Play, AlertTriangle, CheckCircle, Clock, User } from "lucide-react";

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

// Reveal component
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
      className={className}
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

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Why Static Analysis Can't Catch Runtime Errors: A CTO's Guide to Salesforce DevSecOps",
  "description": "Static analysis tools like PMD and SonarQube scan text, not runtime behavior. Learn why they miss Governor Limit errors and what to do about it.",
  "author": {
    "@type": "Organization",
    "name": "Jataka"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Jataka",
    "logo": {
      "@type": "ImageObject",
      "url": "https://jataka.io/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://jataka.io/blog/static-analysis-is-dead"
  }
};

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
      "name": "Blog",
      "item": "https://jataka.io/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Static Analysis is Dead",
      "item": "https://jataka.io/blog/static-analysis-is-dead"
    }
  ]
};

const staticLimitations = [
  {
    limit: "SOQL 101",
    staticResult: "Flags SOQL in loop (maybe)",
    runtimeResult: "Measures 127 queries vs 100 limit",
    verdict: "Runtime wins"
  },
  {
    limit: "DML 151",
    staticResult: "Flags DML in loop (maybe)",
    runtimeResult: "Measures 187 DML vs 150 limit",
    verdict: "Runtime wins"
  },
  {
    limit: "CPU Timeout",
    staticResult: "No detection possible",
    runtimeResult: "Measures 12,847ms vs 10,000ms",
    verdict: "Runtime wins"
  },
  {
    limit: "Data Skew",
    staticResult: "No detection possible",
    runtimeResult: "Analyzes 52,847 child records",
    verdict: "Runtime wins"
  },
  {
    limit: "Mixed DML",
    staticResult: "No detection possible",
    runtimeResult: "Detects Setup/non-Setup conflict",
    verdict: "Runtime wins"
  }
];

const codeExample = `// This code passes static analysis
// It crashes in production

public void processAccounts(List<Id> accountIds) {
    for (Id accId : accountIds) {
        // Static analysis: "SOQL in loop - potential issue"
        // Runtime profiling: "127 queries executed, limit is 100"
        List<Contact> contacts = [
            SELECT Id, Name, Email
            FROM Contact
            WHERE AccountId = :accId
        ];
        
        for (Contact c : contacts) {
            c.Email = c.Email.toLowerCase();
        }
        update contacts;
    }
}`;

export default function StaticAnalysisIsDeadPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-[200] h-[64px] bg-[#FAF8F3]/90 backdrop-blur-[14px] border-b border-[#1a1a1a]/10 px-[24px] md:px-[48px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/Final-1 (6).svg" alt="Jataka" className="h-[22px] w-auto block" />
          </Link>

          <ul className="hidden md:flex gap-[36px] list-none items-center m-0 p-0">
            <li><button onClick={() => router.push("/")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Home</button></li>
            <li><button onClick={() => router.push("/blog")} className="text-[#1a1a1a] font-medium text-[13.5px] tracking-[0.4px]">Blog</button></li>
            <li><button onClick={() => router.push("/use-cases")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</button></li>
            <li><button onClick={() => router.push("/anti-patterns")} className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Anti-Patterns</button></li>
            <li><button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book Demo</button></li>
          </ul>

          <button 
            className="md:hidden p-[8px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="fixed top-[64px] left-0 right-0 z-[150] bg-[#FAF8F3] border-b border-[#1a1a1a]/10 md:hidden">
            <div className="px-[24px] py-[20px] flex flex-col gap-[16px]">
              <button onClick={() => router.push("/")} className="text-[#666] text-[14px] font-medium">Home</button>
              <button onClick={() => router.push("/blog")} className="text-[#1a1a1a] font-medium text-[14px]">Blog</button>
              <button onClick={() => router.push("/use-cases")} className="text-[#666] text-[14px] font-medium">Use Cases</button>
              <button onClick={() => router.push("/anti-patterns")} className="text-[#666] text-[14px] font-medium">Anti-Patterns</button>
              <button onClick={() => router.push("/book-pilot")} className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px]">Book Demo</button>
            </div>
          </div>
        )}

        {/* ARTICLE */}
        <article className="pt-[100px] pb-[80px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[800px] mx-auto relative z-10">
            {/* META */}
            <Reveal>
              <div className="flex items-center gap-[16px] mb-[30px] text-[13px] text-[#666]">
                <div className="flex items-center gap-[6px]">
                  <Clock className="w-[14px] h-[14px]" />
                  <span>12 min read</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <User className="w-[14px] h-[14px]" />
                  <span>Jataka Engineering</span>
                </div>
                <span>January 15, 2024</span>
              </div>
            </Reveal>

            {/* TITLE */}
            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(32px,5vw,48px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[30px]">
                Why Static Analysis Can't Catch<br />
                <span className="text-[#FF2424]">Runtime Errors</span>
              </h1>
            </Reveal>

            {/* INTRO */}
            <Reveal delay={200}>
              <p className="text-[18px] leading-[1.8] text-[#333] mb-[40px]">
                Your CI pipeline runs PMD, SonarQube, or Clayton. They catch naming convention violations, 
                security vulnerabilities, and code smells. You feel safe. Then a developer merges code 
                with a SOQL query inside a for loop. Static analysis flags it as a "potential issue." 
                You ship it anyway. Production crashes at 2:00 AM with 127 SOQL queries against a limit of 100.
              </p>
            </Reveal>

            {/* THE PROBLEM */}
            <Reveal delay={300}>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                The Fundamental Problem
              </h2>
            </Reveal>

            <Reveal delay={400}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[20px]">
                Static analysis tools scan your source code as text. They parse the abstract syntax tree, 
                apply pattern-matching rules, and flag violations. This is excellent for catching:
              </p>
            </Reveal>

            <Reveal delay={500}>
              <ul className="space-y-[12px] mb-[30px]">
                <li className="flex items-start gap-[10px]">
                  <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">Unused variables and dead code paths</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">Security vulnerabilities like SOQL injection</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">Naming convention violations</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <CheckCircle className="w-[16px] h-[16px] text-[#22c55e] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">Cyclomatic complexity thresholds</span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={600}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[30px]">
                But static analysis <strong className="text-[#FF2424]">cannot</strong> predict runtime behavior because 
                it doesn't execute your code. It doesn't know:
              </p>
            </Reveal>

            <Reveal delay={700}>
              <ul className="space-y-[12px] mb-[40px]">
                <li className="flex items-start gap-[10px]">
                  <AlertTriangle className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">How many records are in your production org</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <AlertTriangle className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">What other triggers fire when you update a record</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <AlertTriangle className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">How long your nested loops will actually take</span>
                </li>
                <li className="flex items-start gap-[10px]">
                  <AlertTriangle className="w-[16px] h-[16px] text-[#FF2424] flex-shrink-0 mt-[4px]" />
                  <span className="text-[15px] text-[#444]">Whether your DML operations conflict with Setup objects</span>
                </li>
              </ul>
            </Reveal>

            {/* CODE EXAMPLE */}
            <Reveal>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                A Concrete Example
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[20px]">
                Consider this code that passes static analysis but crashes in production:
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#1a1a1a] rounded-[12px] overflow-hidden mb-[30px]">
                <div className="flex items-center justify-between px-[20px] py-[12px] border-b border-[#333]">
                  <span className="text-[12px] font-mono text-[#888]">AccountTriggerHandler.cls</span>
                  <span className="text-[10px] uppercase tracking-[1px] text-[#FF6B35] font-bold">Passes Static Analysis</span>
                </div>
                <pre className="p-[20px] text-[13px] font-mono text-[#e0e0e0] overflow-x-auto leading-[1.6]">
                  {codeExample}
                </pre>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[8px] p-[20px] mb-[40px]">
                <p className="text-[14px] text-[#444]">
                  <strong className="text-[#FF2424]">Static analysis says:</strong> "SOQL inside for loop - potential issue."<br /><br />
                  <strong className="text-[#22c55e]">Runtime profiling says:</strong> "127 SOQL queries executed against a limit of 100. Transaction will fail in production."
                </p>
              </div>
            </Reveal>

            {/* COMPARISON TABLE */}
            <Reveal>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                Static vs Runtime: The Scorecard
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-white rounded-[12px] border border-[#1a1a1a]/5 overflow-hidden mb-[40px]">
                <div className="grid grid-cols-4 bg-[#1a1a1a]/5 p-[16px] text-[11px] font-bold uppercase tracking-[1px] text-[#666]">
                  <div>Error Type</div>
                  <div>Static Analysis</div>
                  <div>Runtime Profiling</div>
                  <div>Winner</div>
                </div>

                {staticLimitations.map((row, index) => (
                  <div 
                    key={row.limit}
                    className={`grid grid-cols-4 p-[16px] text-[13px] ${index !== staticLimitations.length - 1 ? 'border-b border-[#1a1a1a]/5' : ''}`}
                  >
                    <div className="font-medium">{row.limit}</div>
                    <div className="text-[#666]">{row.staticResult}</div>
                    <div className="text-[#666]">{row.runtimeResult}</div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[1px] px-[8px] py-[3px] rounded-[4px] bg-[#FF2424]/10 text-[#FF2424]">
                        {row.verdict}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* THE SOLUTION */}
            <Reveal>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                The Solution: Runtime Profiling
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[20px]">
                Runtime profiling executes your code in an isolated environment with production-scale data. 
                It measures what actually happens:
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="space-y-[16px] mb-[40px]">
                <li className="flex items-start gap-[12px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 mt-[2px]">
                    <span className="text-[12px] font-bold text-[#FF2424]">1</span>
                  </div>
                  <div>
                    <strong className="text-[#1a1a1a]">Actual SOQL count</strong> ,  Not "potential SOQL in loop" but "127 queries executed"
                  </div>
                </li>
                <li className="flex items-start gap-[12px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 mt-[2px]">
                    <span className="text-[12px] font-bold text-[#FF2424]">2</span>
                  </div>
                  <div>
                    <strong className="text-[#1a1a1a]">Actual CPU time</strong> ,  Not "nested loops detected" but "12,847ms consumed"
                  </div>
                </li>
                <li className="flex items-start gap-[12px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 mt-[2px]">
                    <span className="text-[12px] font-bold text-[#FF2424]">3</span>
                  </div>
                  <div>
                    <strong className="text-[#1a1a1a]">Actual DML operations</strong> ,  Not "DML in loop" but "187 statements vs 150 limit"
                  </div>
                </li>
                <li className="flex items-start gap-[12px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 mt-[2px]">
                    <span className="text-[12px] font-bold text-[#FF2424]">4</span>
                  </div>
                  <div>
                    <strong className="text-[#1a1a1a]">Actual data model impact</strong> ,  Not "possible contention" but "52,847 child records on parent"
                  </div>
                </li>
              </ul>
            </Reveal>

            {/* CONCLUSION */}
            <Reveal>
              <h2 className="font-archivo text-[24px] tracking-[-0.5px] uppercase mb-[20px] mt-[50px]">
                What This Means for Your Team
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[16px] leading-[1.8] text-[#444] mb-[20px]">
                Static analysis isn't dead, it's just incomplete. You still need it for code quality, security 
                scanning, and style enforcement. But you also need runtime profiling for the things static 
                analysis can't see.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[12px] p-[24px] mb-[40px]">
                <p className="text-[15px] text-[#444] leading-[1.7]">
                  <strong className="text-[#22c55e]">Best practice for Salesforce DevSecOps:</strong><br /><br />
                  Run static analysis (PMD, Clayton, SonarQube) for code quality.<br />
                  Run runtime profiling (Jataka) for Governor Limit safety.<br />
                  Use both. Your production environment will thank you.
                </p>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="bg-[#1a1a1a] rounded-[12px] p-[32px] text-center mt-[60px]">
                <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[20px]">
                  See runtime profiling in action
                </p>
                <h3 className="font-archivo text-[28px] tracking-[-1px] uppercase mb-[16px] text-white">
                  Book a Demo
                </h3>
                <p className="text-[15px] text-[#999] mb-[24px]">
                  Watch Jataka catch the errors your static analysis tools miss.
                </p>
                <button 
                  onClick={() => router.push("/book-pilot")} 
                  className="group bg-[#FF2424] text-white px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 inline-flex items-center gap-[10px]"
                >
                  Book a Demo
                  <ArrowRight className="w-[12px] h-[12px] group-hover:translate-x-[4px] transition-transform" />
                </button>
              </div>
            </Reveal>
          </div>
        </article>
      </div>
    </>
  );
}
