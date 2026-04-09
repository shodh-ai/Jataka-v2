"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Shield, Lock, Eye, FileSearch } from "lucide-react";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Compliance & Security Audit - Salesforce SOX/GDPR Audit Tool",
  "description": "Instantly trace exact User, Profile, and Permission Set access to sensitive PII fields across your Salesforce org. Turn a 3-week manual audit into a 3-second query.",
  "url": "https://jataka.io/compliance-security-xray"
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
      "name": "Architecture Agent",
      "item": "https://jataka.io/architecture-agent"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Compliance & Security Audit",
      "item": "https://jataka.io/compliance-security-xray"
    }
  ]
};

const features = [
  {
    icon: Eye,
    title: "PII Field Discovery",
    description: "Jataka automatically scans your entire Org schema to identify sensitive fields containing PII data like SSN, credit card numbers, and personal health information.",
    color: "#FF2424"
  },
  {
    icon: Lock,
    title: "Access Path Tracing",
    description: "Trace exactly which Users, Profiles, and Permission Sets have read or write access to each sensitive field. See the complete permission chain in seconds.",
    color: "#FF6B35"
  },
  {
    icon: FileSearch,
    title: "Compliance Reporting",
    description: "Generate audit-ready reports for SOX, GDPR, and HIPAA compliance. Document field-level security for auditors with a single query.",
    color: "#FFB800"
  },
  {
    icon: Shield,
    title: "Violation Detection",
    description: "Automatically flag overprivileged access. Detect when non-admin users have access to sensitive PII they shouldn't see.",
    color: "#22c55e"
  }
];

export default function ComplianceSecurityAuditPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#FAF8F3] text-[#1a1a1a]">
        <nav className="fixed top-0 left-0 right-0 z-[200] h-[64px] bg-[#FAF8F3]/90 backdrop-blur-[14px] border-b border-[#1a1a1a]/10 px-[24px] md:px-[48px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
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
          </Link>

          <ul className="hidden md:flex gap-[24px] list-none items-center m-0 p-0">
            <li><Link href="/" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Home</Link></li>
            <li><Link href="/architecture-agent" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Architecture Agent</Link></li>
            <li><Link href="/use-cases" className="text-[#666] hover:text-[#1a1a1a] transition-colors text-[13.5px] font-medium tracking-[0.4px]">Use Cases</Link></li>
            <li><Link href="/book-pilot" className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">Book Demo</Link></li>
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
              <Link href="/" className="text-[#666] text-[14px] font-medium">Home</Link>
              <Link href="/architecture-agent" className="text-[#666] text-[14px] font-medium">Architecture Agent</Link>
              <Link href="/use-cases" className="text-[#666] text-[14px] font-medium">Use Cases</Link>
              <Link href="/book-pilot" className="bg-[#FF2424] text-white px-[20px] py-[12px] font-archivo text-[12px] uppercase tracking-[1.5px] rounded-[4px] text-center">Book Demo</Link>
            </div>
          </div>
        )}

        <section className="pt-[120px] pb-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
                <Shield className="w-[14px] h-[14px]" />
                Add-On Module
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-1.5px] uppercase mb-[24px]">
                Compliance &<br />
                <span className="text-[#FF2424]">Security Audit</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[18px] leading-[1.7] text-[#444] max-w-[800px] mx-auto mb-[30px]">
                For CISOs and SOX/GDPR Auditors. Instantly trace exact 
                User, Profile, and Permission Set access to sensitive PII fields across your Salesforce org. Turn a 3-week manual audit into a 3-second query.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-[60px] px-[24px] md:px-[48px] bg-white relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1100px] mx-auto relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[20px] text-center">
                Four Pillars of<br />
                <span className="text-[#FF2424]">Security Intelligence</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mt-[60px]">
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={100 + index * 100}>
                  <div className="bg-[#FAF8F3] rounded-[12px] p-[28px] border-l-[4px] h-full" style={{ borderLeftColor: feature.color }}>
                    <div className="flex items-center gap-[16px] mb-[20px]">
                      <div 
                        className="w-[60px] h-[60px] rounded-[12px] flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${feature.color}10` }}
                      >
                        <feature.icon className="w-[28px] h-[28px]" style={{ color: feature.color }} />
                      </div>
                      <h3 className="font-archivo text-[20px] tracking-[-0.5px] uppercase">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-[14px] text-[#555] leading-[1.6]">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-[60px] px-[24px] md:px-[48px] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[900px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="font-archivo text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-1px] uppercase mb-[30px]">
                The Audit That Takes<br />
                <span className="text-[#FF2424]">3 Seconds</span>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-[#1a1a1a] rounded-[12px] p-[32px] text-left mb-[30px]">
                <p className="text-white/60 text-[13px] uppercase tracking-[2px] mb-[16px]">How It Works</p>
                <p className="text-white/40 text-[13px] mt-[16px]">
                  Jataka maps every User, Profile, and Permission Set relationship in your Salesforce org. 
                  Query any field to see exactly who has access. Complete access audit in 3 seconds. No manual tracing required.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
                <div className="bg-[#FF2424]/5 border border-[#FF2424]/20 rounded-[8px] p-[20px]">
                  <p className="font-archivo text-[32px] text-[#FF2424] mb-[8px]">3 weeks</p>
                  <p className="text-[13px] text-[#666]">Manual audit time</p>
                </div>
                <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-[8px] p-[20px]">
                  <p className="font-archivo text-[32px] text-[#22c55e] mb-[8px]">3 seconds</p>
                  <p className="text-[13px] text-[#666]">With Jataka Audit</p>
                </div>
                <div className="bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-[8px] p-[20px]">
                  <p className="font-archivo text-[32px] text-[#FFB800] mb-[8px]">99.97%</p>
                  <p className="text-[13px] text-[#666]">Time reduction</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-[100px] px-[24px] md:px-[48px] bg-[#1a1a1a] relative overflow-hidden">
          <LightGridBg />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <Reveal>
              <p className="text-[12px] font-medium uppercase tracking-[3px] text-[#FF2424] mb-[30px]">
                For CISOs and Compliance Teams
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-archivo text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-1.5px] uppercase mb-[20px] text-white">
                Pass Your Next Audit<br />
                <span className="text-[#FF2424]">In 3 Seconds.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[17px] leading-[1.7] text-[#999] max-w-[600px] mx-auto mb-[40px]">
                Book a demo to see how Jataka traces PII access across your entire Salesforce org instantly.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row gap-[16px] justify-center">
                <Link 
                  href="/book-pilot"
                  className="group bg-[#FF2424] text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Book a Demo
                  <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" />
                </Link>
                <Link 
                  href="/architecture-agent"
                  className="group bg-transparent text-white px-[40px] py-[16px] font-archivo text-[14px] uppercase tracking-[1.5px] rounded-[4px] border border-[#333] hover:border-[#FF2424]/50 transition-all duration-300 flex items-center justify-center gap-[12px]"
                >
                  Back to Architecture Agent
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
