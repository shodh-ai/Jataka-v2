"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Database, GitPullRequest, Ticket, Shield, Link2, Trash2, Bot, Zap, Hexagon, ChevronDown, ChevronUp, Cpu, Lock, AlertTriangle, CheckCircle, Code, MessageSquare, GitBranch, GitMerge, Eye, FileVideo, Database as DatabaseIcon, ChevronRight, Layers, Terminal, BadgeCheck, Users, Activity, Workflow } from "lucide-react";

export default function KnowledgeGraphPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const useCases = [
    {
      id: "limit-firewall",
      icon: Shield,
      color: "#FF2424",
      bgColor: "bg-[#FF2424]/10",
      title: "The Limit Firewall",
      description: "Stops Production crashes",
      features: [
        { icon: AlertTriangle, text: "Prevent SOQL & DML Loops: Block database queries inside loops at the PR level" },
        { icon: Cpu, text: "Catch CPU Timeouts: Profile complex Apex and Flows in sub-seconds" },
        { icon: Lock, text: "Detect Data Skew: Flag row-locking errors before deployment" },
        { icon: Activity, text: "Enforce API Limits: Catch outbound integrations exceeding Salesforce limits" }
      ]
    },
    {
      id: "tech-debt",
      icon: Trash2,
      color: "#F59E0B",
      bgColor: "bg-[#F59E0B]/10",
      title: "Tech Debt & Architecture",
      description: "Cleans up 10 years of legacy bloat",
      features: [
        { icon: Layers, text: "Duplicate Field Prevention: Block the creation of redundant custom fields" },
        { icon: GitBranch, text: "Orphan Node Discovery: Identify 100% dead metadata safe for deletion" },
        { icon: BadgeCheck, text: "Architecture Enforcement: Auto-reject simple Triggers in favor of Flows" },
        { icon: ChevronRight, text: "Autonomous Cleanup: Auto-generate XML files to delete dead weight" },
        { icon: Code, text: "Apex Bulkification: Autonomously refactor messy code into bulk-safe logic" },
        { icon: CheckCircle, text: "Enforce business logic: Check every PR for any violation of business logic" },
        { icon: Terminal, text: "Maintaining best practice: Every code pushed will be checked for best architecture and practices" }
      ]
    },
    {
      id: "autonomous-qa",
      icon: Bot,
      color: "#10B981",
      bgColor: "bg-[#10B981]/10",
      title: "Autonomous QA",
      description: "Self-healing UI tests",
      features: [
        { icon: Eye, text: "Self-Healing UI Tests: Vision AI fixes broken element selectors dynamically" },
        { icon: FileVideo, text: "Video Logs: Auto-record test executions for audits" },
        { icon: DatabaseIcon, text: "Smart Data Seeding: Generate minimal test records without bloating sandbox storage" },
        { icon: CheckCircle, text: "Verification Protocol: Mathematically prove refactored code maintains the original business logic" }
      ]
    },
    {
      id: "dev-experience",
      icon: Code,
      color: "#6366F1",
      bgColor: "bg-[#6366F1]/10",
      title: "Developer Experience",
      description: "Supercharge your workflow",
      features: [
        { icon: Terminal, text: "IDE Integration: Query the blast radius directly inside Cursor before saving" },
        { icon: MessageSquare, text: "Slack Bot: Ask plain-English questions about org architecture" },
        { icon: Ticket, text: "Jira Alignment: Verify PR code fulfills original Jira acceptance criteria" }
      ]
    },
    {
      id: "enterprise",
      icon: Users,
      color: "#8B5CF6",
      bgColor: "bg-[#8B5CF6]/10",
      title: "Enterprise Use Cases",
      description: "Powered by Context Engine",
      features: [
        { icon: GitMerge, text: "M&A Org Merge Mapping: Compare two orgs and map metadata overlap for mergers" },
        { icon: Lock, text: "Security Audits: Trace exact user access to sensitive data across all profiles for compliance" },
        { icon: Link2, text: "API Contract Guardian: Block field changes that break external ERP integrations" },
        { icon: Activity, text: "Synthetic Monitoring: Run background tests on Production to detect live outages" },
        { icon: Workflow, text: "Legacy Migration: Autonomously translate retiring Workflow Rules into modern Flows" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Navigation */}
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
        <Link href="/book-pilot" className="bg-[#FF2424] text-white px-[20px] py-[8px] font-archivo text-[11px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">
          Book a Demo
        </Link>
      </nav>

      {/* Main Content */}
      <div className="pt-[100px] pb-[80px] px-[24px] md:px-[48px]">
        {/* Header */}
        <div className="text-center mb-[80px]">
          <div className="inline-flex items-center gap-[9px] bg-[#FF2424]/10 border border-[#FF2424]/20 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#FF2424]">
            <span className="text-[8px]">▶</span> Architecture Intelligence
          </div>
          <h1 className="font-archivo text-[clamp(36px,5vw,64px)] leading-[0.93] tracking-[-2px] uppercase mb-[16px] text-[#1a1a1a]">
            The Jataka Knowledge Graph
          </h1>
          <p className="text-[17px] text-[#666] max-w-[600px] mx-auto">
            We map the entire enterprise architecture into a real-time context engine.
          </p>
        </div>

        {/* Diagram Section */}
        <div className="max-w-[1600px] mx-auto relative">
          {/* Visual Arrow Connections - Desktop */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            {/* Left to Center Arrow */}
            <svg className="absolute left-[33%] top-[200px] w-[14%] h-[200px]" viewBox="0 0 200 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="arrowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: '#FF2424', stopOpacity: 0.1}} />
                  <stop offset="100%" style={{stopColor: '#FF2424', stopOpacity: 0.8}} />
                </linearGradient>
              </defs>
              <path d="M 0 100 Q 100 100 180 100" stroke="url(#arrowGradient1)" strokeWidth="3" fill="none" strokeDasharray="8 4" className="animate-pulse"/>
              <polygon points="180,95 195,100 180,105" fill="#FF2424" className="animate-pulse"/>
            </svg>

            {/* Center to Right Arrow */}
            <svg className="absolute right-[33%] top-[200px] w-[14%] h-[200px]" viewBox="0 0 200 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="arrowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: '#FF2424', stopOpacity: 0.8}} />
                  <stop offset="100%" style={{stopColor: '#FF2424', stopOpacity: 0.1}} />
                </linearGradient>
              </defs>
              <path d="M 20 100 Q 100 100 200 100" stroke="url(#arrowGradient2)" strokeWidth="3" fill="none" strokeDasharray="8 4" className="animate-pulse"/>
              <polygon points="200,95 215,100 200,105" fill="#FF2424" className="animate-pulse"/>
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-[32px] items-start">
            
            {/* Left Side - Inputs */}
            <div className="space-y-[24px]">
              <div className="text-[12px] font-bold uppercase tracking-[2.5px] text-[#666] mb-[16px]">The Inputs / The Chaos</div>
              
              {/* Salesforce */}
              <div className="bg-white p-[32px] rounded-[8px] border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/20 transition-all relative group">
                <div className="absolute -right-[32px] top-1/2 -translate-y-1/2 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-[24px] h-[24px] text-[#FF2424]" />
                </div>
                <div className="flex items-center gap-[12px] mb-[12px]">
                  <div className="w-[48px] h-[48px] rounded-[8px] bg-[#00A1E0]/10 flex items-center justify-center">
                    <Database className="w-[24px] h-[24px] text-[#00A1E0]" />
                  </div>
                  <h3 className="font-archivo text-[18px] uppercase tracking-[-0.3px] text-[#1a1a1a]">Salesforce</h3>
                </div>
                <p className="text-[14px] text-[#666] leading-[1.6]">Data Shape & Metadata</p>
              </div>

              {/* GitHub */}
              <div className="bg-white p-[32px] rounded-[8px] border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/20 transition-all relative group">
                <div className="absolute -right-[32px] top-1/2 -translate-y-1/2 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-[24px] h-[24px] text-[#FF2424]" />
                </div>
                <div className="flex items-center gap-[12px] mb-[12px]">
                  <div className="w-[48px] h-[48px] rounded-[8px] bg-[#1a1a1a]/10 flex items-center justify-center">
                    <GitPullRequest className="w-[24px] h-[24px] text-[#1a1a1a]" />
                  </div>
                  <h3 className="font-archivo text-[18px] uppercase tracking-[-0.3px] text-[#1a1a1a]">GitHub</h3>
                </div>
                <p className="text-[14px] text-[#666] leading-[1.6]">Pull Requests & Code</p>
              </div>

              {/* Jira */}
              <div className="bg-white p-[32px] rounded-[8px] border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/20 transition-all relative group">
                <div className="absolute -right-[32px] top-1/2 -translate-y-1/2 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-[24px] h-[24px] text-[#FF2424]" />
                </div>
                <div className="flex items-center gap-[12px] mb-[12px]">
                  <div className="w-[48px] h-[48px] rounded-[8px] bg-[#0052CC]/10 flex items-center justify-center">
                    <Ticket className="w-[24px] h-[24px] text-[#0052CC]" />
                  </div>
                  <h3 className="font-archivo text-[18px] uppercase tracking-[-0.3px] text-[#1a1a1a]">Jira</h3>
                </div>
                <p className="text-[14px] text-[#666] leading-[1.6]">Business Intent & Rules</p>
              </div>
            </div>

            {/* Center - The Brain */}
            <div className="flex flex-col items-center justify-center sticky top-[120px]">
              <div className="relative">
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,36,36,0.2)_0%,transparent_70%)] rounded-full blur-3xl"></div>
                
                {/* Hexagon container */}
                <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] bg-[#1a1a1a] rounded-[24px] flex items-center justify-center border border-[#FF2424]/30 shadow-[0_0_60px_rgba(255,36,36,0.3)]">
                  <div className="text-center p-[32px]">
                    <Hexagon className="w-[64px] h-[64px] text-[#FF2424] mx-auto mb-[16px]" />
                    <h2 className="font-archivo text-[24px] md:text-[28px] uppercase tracking-[-1px] text-white mb-[8px] leading-[1.1]">
                      The Jataka<br/>Knowledge Graph
                    </h2>
                    <div className="w-[48px] h-[1px] bg-[#FF2424] mx-auto mb-[12px]"></div>
                    <p className="text-[12px] text-white/70 leading-[1.5]">
                      Real-time Context Engine
                    </p>
                  </div>
                </div>

                {/* Pulse animation */}
                <div className="absolute inset-0 rounded-[24px] border-2 border-[#FF2424]/20 animate-pulse"></div>
              </div>

              <p className="text-[14px] text-[#666] max-w-[280px] text-center mt-[24px] leading-[1.6]">
                We map the entire enterprise architecture into a real-time context engine.
              </p>
            </div>

            {/* Right Side - Outputs */}
            <div className="space-y-[16px]">
              <div className="text-[12px] font-bold uppercase tracking-[2.5px] text-[#666] mb-[16px]">The Outputs / GCC Use Cases</div>

              {useCases.map((useCase) => {
                const Icon = useCase.icon;
                const isExpanded = expandedCard === useCase.id;
                
                return (
                  <div
                    key={useCase.id}
                    className="bg-white rounded-[8px] border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/20 transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => toggleCard(useCase.id)}
                      className="w-full p-[24px] flex items-center gap-[12px] text-left"
                    >
                      <div className={`w-[48px] h-[48px] rounded-[8px] ${useCase.bgColor} flex items-center justify-center shrink-0`}>
                        <Icon className="w-[24px] h-[24px]" style={{ color: useCase.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-archivo text-[16px] uppercase tracking-[-0.3px] text-[#1a1a1a] mb-[4px]">
                          {useCase.title}
                        </h3>
                        <p className="text-[13px] text-[#666] leading-[1.5]">{useCase.description}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-[20px] h-[20px] text-[#666] shrink-0" />
                      ) : (
                        <ChevronDown className="w-[20px] h-[20px] text-[#666] shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-[24px] pb-[24px] border-t border-[#1a1a1a]/10 pt-[16px]">
                        <ul className="space-y-[12px]">
                          {useCase.features.map((feature, idx) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <li key={idx} className="flex items-start gap-[12px]">
                                <FeatureIcon className="w-[16px] h-[16px] text-[#FF2424] shrink-0 mt-[2px]" />
                                <span className="text-[13px] text-[#444] leading-[1.6]">{feature.text}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Business Impact / ROI Section */}
        <div className="max-w-[1200px] mx-auto mt-[100px] border-t border-[#1a1a1a]/10 pt-[100px]">
          <div className="text-center mb-[64px]">
            <div className="inline-flex items-center gap-[9px] bg-[#1a1a1a]/5 border border-[#1a1a1a]/10 px-[18px] py-[6px] mb-[24px] text-[11.5px] font-bold uppercase tracking-[2.5px] text-[#1a1a1a]">
              Business Impact
            </div>
            <h2 className="font-archivo text-[clamp(28px,4vw,48px)] leading-[1.1] tracking-[-1px] uppercase mb-[16px] text-[#1a1a1a]">
              The GCC Advantage
            </h2>
            <p className="text-[16px] text-[#666] max-w-[600px] mx-auto leading-[1.7]">
              Transform your delivery center from a cost-center into a competitive weapon. This is what mathematically verified delivery does for your bottom line.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {/* Impact Card 1 */}
            <div className="bg-white p-[40px] rounded-[12px] border border-[#1a1a1a]/10 hover:border-[#FF2424]/30 hover:shadow-[0_10px_40px_rgba(255,36,36,0.05)] transition-all">
              <div className="text-[48px] font-archivo font-bold text-[#FF2424] mb-[8px] leading-[1]">
                Zero
              </div>
              <h3 className="font-archivo text-[18px] uppercase tracking-[-0.3px] text-[#1a1a1a] mb-[12px]">
                Deployment Rollbacks
              </h3>
              <p className="text-[14px] text-[#666] leading-[1.6]">
                Eliminate SLA penalties and revenue leakage. By catching Data Skew and API integration breaks before they merge, P1 production outages become a thing of the past.
              </p>
            </div>

            {/* Impact Card 2 */}
            <div className="bg-white p-[40px] rounded-[12px] border border-[#1a1a1a]/10 hover:border-[#10B981]/30 hover:shadow-[0_10px_40px_rgba(16,185,129,0.05)] transition-all">
              <div className="text-[48px] font-archivo font-bold text-[#10B981] mb-[8px] leading-[1]">
                +40%
              </div>
              <h3 className="font-archivo text-[18px] uppercase tracking-[-0.3px] text-[#1a1a1a] mb-[12px]">
                Developer Velocity
              </h3>
              <p className="text-[14px] text-[#666] leading-[1.6]">
                Stop wasting developer hours on debugging Governor Limits. With 1-Click GitHub Remediation, days of architecture debugging are reduced to a single click.
              </p>
            </div>

            {/* Impact Card 3 */}
            <div className="bg-white p-[40px] rounded-[12px] border border-[#1a1a1a]/10 hover:border-[#6366F1]/30 hover:shadow-[0_10px_40px_rgba(99,102,241,0.05)] transition-all">
              <div className="text-[48px] font-archivo font-bold text-[#6366F1] mb-[8px] leading-[1]">
                80%
              </div>
              <h3 className="font-archivo text-[18px] uppercase tracking-[-0.3px] text-[#1a1a1a] mb-[12px]">
                QA Cost Reduction
              </h3>
              <p className="text-[14px] text-[#666] leading-[1.6]">
                Replace brittle UI scripts and manual offshore QA teams with an autonomous, self-healing visual agent. Lower your delivery costs while increasing test coverage.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-[600px] mx-auto mt-[100px] text-center">
          <h2 className="font-archivo text-[clamp(28px,4vw,42px)] leading-[1.1] tracking-[-1px] uppercase mb-[16px] text-[#1a1a1a]">
            Ready to map your architecture?
          </h2>
          <p className="text-[16px] text-[#666] mb-[32px] leading-[1.7]">
            Connect your Salesforce org, GitHub repository, and Jira workspace to Jataka. We'll build your Knowledge Graph in minutes.
          </p>
          <Link href="/book-pilot" className="inline-flex items-center gap-[12px] bg-[#FF2424] text-white px-[32px] py-[14px] font-archivo text-[13px] uppercase tracking-[1.5px] rounded-[4px] hover:bg-[#d91f1f] transition-colors">
            <Zap className="w-[16px] h-[16px]" />
            Start Your Pilot
          </Link>
        </div>
      </div>
    </div>
  );
}
