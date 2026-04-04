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
        <article className="pt-[100px] pb-[80px] px-[24px] md:px-[48px]">
          <div className="max-w-[800px] mx-auto">
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
                    <strong className="text-[#1a1a1a]">Actual SOQL count</strong> — Not "potential SOQL in loop" but "127 queries executed"
                  </div>
                </li>
                <li className="flex items-start gap-[12px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 mt-[2px]">
                    <span className="text-[12px] font-bold text-[#FF2424]">2</span>
                  </div>
                  <div>
                    <strong className="text-[#1a1a1a]">Actual CPU time</strong> — Not "nested loops detected" but "12,847ms consumed"
                  </div>
                </li>
                <li className="flex items-start gap-[12px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 mt-[2px]">
                    <span className="text-[12px] font-bold text-[#FF2424]">3</span>
                  </div>
                  <div>
                    <strong className="text-[#1a1a1a]">Actual DML operations</strong> — Not "DML in loop" but "187 statements vs 150 limit"
                  </div>
                </li>
                <li className="flex items-start gap-[12px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#FF2424]/10 flex items-center justify-center flex-shrink-0 mt-[2px]">
                    <span className="text-[12px] font-bold text-[#FF2424]">4</span>
                  </div>
                  <div>
                    <strong className="text-[#1a1a1a]">Actual data model impact</strong> — Not "possible contention" but "52,847 child records on parent"
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
                Static analysis isn't dead—it's just incomplete. You still need it for code quality, security 
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
