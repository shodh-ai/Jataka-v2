"use client";

import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Network,
  Sparkles,
  Gauge,
  GitBranch,
  ShieldCheck,
  Workflow,
  Search,
  Waypoints,
  TestTube2,
  Video,
  Database,
  Eye,
  Code2,
  MessageSquareText,
  TicketCheck,
  Merge,
  Lock,
  Activity,
  RefreshCcw,
} from "lucide-react";

type Application = {
  id: string;
  eyebrow: string;
  title: string;
  impact: string;
  summary: string;
  accent: string;
  bullets: { icon: ComponentType<{ className?: string }>; title: string; body: string }[];
};

const applications: Application[] = [
  {
    id: "limit-firewall",
    eyebrow: "Application 01",
    title: "The Limit Firewall",
    impact: "Impact: stop production crashes before merge and mathematically protect Salesforce at peak scale.",
    summary:
      "Jataka uses Runtime Context to model real production data shape, query pressure, and transaction behavior before code reaches production.",
    accent: "#FF2424",
    bullets: [
      {
        icon: Gauge,
        title: "Prevent SOQL & DML Loops",
        body: "Block database queries inside loops at the PR level before they ever consume production governor limits.",
      },
      {
        icon: Activity,
        title: "Catch CPU Timeouts",
        body: "Profile complex Apex and Flows in sub-seconds so costly CPU spikes are surfaced before deployment.",
      },
      {
        icon: GitBranch,
        title: "Detect Data Skew",
        body: "Flag row-locking risks and skew-driven contention before the org sees concurrency failures.",
      },
      {
        icon: Network,
        title: "Enforce API Limits",
        body: "Catch outbound integrations that would exceed Salesforce platform limits under real traffic.",
      },
    ],
  },
  {
    id: "tech-debt-architecture",
    eyebrow: "Application 02",
    title: "Tech Debt & Architecture",
    impact: "Impact: reduce maintenance drag, remove dead weight safely, and enforce a cleaner enterprise architecture over time.",
    summary:
      "Jataka uses Architectural Context plus Business Context to understand what is still alive, what is redundant, and what should never be merged.",
    accent: "#1A1A1A",
    bullets: [
      {
        icon: Search,
        title: "Duplicate Field Prevention",
        body: "Block the creation of redundant custom fields before teams add another layer of metadata sprawl.",
      },
      {
        icon: Waypoints,
        title: "Orphan Node Discovery",
        body: "Identify dead metadata with confidence so unused objects, fields, and logic can be removed safely.",
      },
      {
        icon: Workflow,
        title: "Architecture Enforcement",
        body: "Auto-reject low-quality implementation choices like simple Triggers where governed patterns should be used.",
      },
      {
        icon: Sparkles,
        title: "Autonomous Cleanup",
        body: "Generate deletion-ready XML and cleanup actions to remove dead architecture without manual toil.",
      },
      {
        icon: Code2,
        title: "Apex Bulkification",
        body: "Autonomously refactor messy logic into bulk-safe, scalable patterns that align with Salesforce best practice.",
      },
      {
        icon: ShieldCheck,
        title: "Business Logic Enforcement",
        body: "Check every PR for violations of business logic and maintain architectural best practice on every push.",
      },
    ],
  },
  {
    id: "autonomous-qa",
    eyebrow: "Application 03",
    title: "Autonomous QA",
    impact: "Impact: shrink QA overhead, keep regression coverage alive as the UI changes, and prove refactors preserve intent.",
    summary:
      "Jataka combines Business Context with Vision AI to test like a human, heal like an agent, and verify outcomes against enterprise logic.",
    accent: "#8B1E1E",
    bullets: [
      {
        icon: Eye,
        title: "Self-Healing UI Tests",
        body: "Vision AI dynamically repairs broken element selectors when the interface changes.",
      },
      {
        icon: Video,
        title: "Video Logs",
        body: "Automatically record test executions for audit trails, debugging, and enterprise traceability.",
      },
      {
        icon: Database,
        title: "Smart Data Seeding",
        body: "Generate the minimum viable test records without bloating sandbox storage or corrupting test realism.",
      },
      {
        icon: TestTube2,
        title: "Verification Protocol",
        body: "Mathematically prove refactored code still preserves the original business logic and expected outcomes.",
      },
    ],
  },
  {
    id: "developer-experience",
    eyebrow: "Application 04",
    title: "Developer Experience",
    impact: "Impact: give every engineer instant enterprise awareness so safe decisions happen before code is even saved.",
    summary:
      "Jataka turns the Context Engine into an everyday developer surface across IDEs, chat, and workflow tools.",
    accent: "#155EEF",
    bullets: [
      {
        icon: Code2,
        title: "IDE Integration",
        body: "Query blast radius and architecture impact directly inside Cursor before saving a file.",
      },
      {
        icon: MessageSquareText,
        title: "Slack Bot",
        body: "Ask plain-English questions about org architecture and get governed answers instantly.",
      },
      {
        icon: TicketCheck,
        title: "Jira Alignment",
        body: "Verify that PR code actually fulfills the original Jira acceptance criteria before merge.",
      },
    ],
  },
  {
    id: "enterprise-use-cases",
    eyebrow: "Application 05",
    title: "Enterprise Use Cases with Our Context",
    impact: "Impact: compress high-cost enterprise programs from months into days while reducing architectural risk and compliance exposure.",
    summary:
      "Once the Context Engine exists, Jataka can power cross-org reasoning, production governance, and modernization use cases that point tools cannot do.",
    accent: "#00A1E0",
    bullets: [
      {
        icon: Merge,
        title: "M&A Org Merge Mapping",
        body: "Compare two orgs and map metadata overlap instantly to accelerate merger planning and integration design.",
      },
      {
        icon: Lock,
        title: "Security Audits",
        body: "Trace exact user access to sensitive data across profiles and permission structures for compliance readiness.",
      },
      {
        icon: Shield,
        title: "API Contract Guardian",
        body: "Block field or contract changes that would break external ERP integrations and downstream systems.",
      },
      {
        icon: Activity,
        title: "Synthetic Monitoring",
        body: "Run governed background tests against production behavior to surface live outages before users escalate them.",
      },
      {
        icon: RefreshCcw,
        title: "Legacy Migration",
        body: "Autonomously translate retiring Workflow Rules into modern Flows without losing enterprise logic.",
      },
    ],
  },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#FF2424]/20 bg-[#FF2424]/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#FF2424]">
      {children}
    </span>
  );
}

export default function JatakaApplicationsPage() {
  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#1A1A1A]">
      <section className="relative overflow-hidden px-6 pb-20 pt-10 md:px-10 lg:px-16 lg:pt-14">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(255,36,36,0.14),_transparent_62%)]" />
        <div className="relative mx-auto max-w-[1280px]">
          <Link
            href="/insider/data-room-bot/executive-story"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#555] transition hover:text-[#1A1A1A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Executive Story
          </Link>

          <div className="mt-14 max-w-[1080px]">
            <Eyebrow>Jataka Applications</Eyebrow>
            <h1 className="mt-8 max-w-[1080px] font-archivo text-[clamp(38px,6vw,78px)] uppercase leading-[0.95] tracking-[-2px]">
              Applications Powered By The <span className="text-[#FF2424]">Context Engine</span>
            </h1>
            <p className="mt-8 max-w-[860px] text-[18px] leading-[1.8] text-[#4B4B4B] md:text-[20px]">
              Once Jataka has solved context at the foundation, it can unlock an application layer that protects revenue, cleans architecture, accelerates developers, and powers strategic enterprise programs.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3 xl:grid-cols-5">
            {applications.map((app) => (
              <a
                key={app.id}
                href={`#${app.id}`}
                className="rounded-[24px] border border-[#1A1A1A]/10 bg-white p-5 shadow-[0_18px_50px_rgba(26,26,26,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(255,36,36,0.12)]"
              >
                <div className="font-mono text-[10px] uppercase tracking-[1.8px] text-[#FF2424]">{app.eyebrow}</div>
                <div className="mt-3 font-archivo text-[20px] uppercase leading-[1.05] tracking-[-0.6px]">
                  {app.title}
                </div>
                <div className="mt-3 text-[14px] leading-[1.6] text-[#666]">{app.impact}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
          {applications.map((app, index) => (
            <article
              key={app.id}
              id={app.id}
              className="overflow-hidden rounded-[34px] border border-[#1A1A1A]/10 bg-white shadow-[0_24px_70px_rgba(26,26,26,0.06)]"
            >
              <div className="grid gap-0 xl:grid-cols-[360px_1fr]">
                <div
                  className="flex flex-col justify-between p-8 text-white md:p-10"
                  style={{
                    background: `linear-gradient(180deg, ${app.accent} 0%, #1A1A1A 100%)`,
                  }}
                >
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[2px] text-white/70">
                      {app.eyebrow}
                    </div>
                    <h2 className="mt-4 font-archivo text-[clamp(30px,4vw,46px)] uppercase leading-[0.96] tracking-[-1px]">
                      {index + 1}. {app.title}
                    </h2>
                    <p className="mt-6 text-[16px] leading-[1.8] text-white/78">{app.summary}</p>
                  </div>
                  <div className="mt-8 rounded-[24px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                    <div className="font-mono text-[10px] uppercase tracking-[1.8px] text-[#FFB0B0]">Impact</div>
                    <div className="mt-3 font-archivo text-[18px] uppercase leading-[1.15] tracking-[-0.4px]">
                      {app.impact.replace("Impact: ", "")}
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  <div className="grid gap-4 md:grid-cols-2">
                    {app.bullets.map((bullet) => {
                      const Icon = bullet.icon;
                      return (
                        <div
                          key={bullet.title}
                          className="rounded-[24px] border border-[#1A1A1A]/10 bg-[#FCFAF7] p-5"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF2424]/10 text-[#FF2424]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="mt-4 font-archivo text-[20px] uppercase leading-[1.05] tracking-[-0.4px] text-[#1A1A1A]">
                            {bullet.title}
                          </h3>
                          <p className="mt-3 text-[15px] leading-[1.75] text-[#555]">{bullet.body}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1180px] rounded-[34px] border border-[#FF2424]/15 bg-[#121212] p-8 text-white shadow-[0_30px_90px_rgba(255,36,36,0.12)] md:p-12">
          <Eyebrow>Enterprise Impact</Eyebrow>
          <h2 className="mt-6 max-w-[880px] font-archivo text-[clamp(32px,4.4vw,58px)] uppercase leading-[1.02] tracking-[-1.6px]">
            Jataka turns context into an operating layer for <span className="text-[#FF2424]">governed enterprise acceleration</span>.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <div className="font-archivo text-[48px] leading-none tracking-[-2px] text-[#FF2424]">0</div>
              <div className="mt-4 font-archivo text-[18px] uppercase tracking-[-0.3px]">Blind Merges</div>
              <div className="mt-2 text-[14px] leading-[1.6] text-white/65">
                Every code change is checked against runtime, architecture, and business context before release.
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <div className="font-archivo text-[48px] leading-none tracking-[-2px] text-[#FF2424]">-80%</div>
              <div className="mt-4 font-archivo text-[18px] uppercase tracking-[-0.3px]">QA Overhead</div>
              <div className="mt-2 text-[14px] leading-[1.6] text-white/65">
                Self-healing automation and mathematical verification remove repetitive regression work.
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <div className="font-archivo text-[48px] leading-none tracking-[-2px] text-[#FF2424]">Faster</div>
              <div className="mt-4 font-archivo text-[18px] uppercase tracking-[-0.3px]">Modernization</div>
              <div className="mt-2 text-[14px] leading-[1.6] text-white/65">
                Cleanups, migrations, and architecture decisions move from consulting timelines to software speed.
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <div className="font-archivo text-[48px] leading-none tracking-[-2px] text-[#FF2424]">10x</div>
              <div className="mt-4 font-archivo text-[18px] uppercase tracking-[-0.3px]">Safer Scale</div>
              <div className="mt-2 text-[14px] leading-[1.6] text-white/65">
                AI agents, offshore teams, and internal developers can all move faster with a governed safety net.
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <Link
              href="/insider/data-room-bot"
              className="inline-flex items-center gap-3 rounded-full bg-[#FF2424] px-6 py-3 font-archivo text-[15px] uppercase tracking-[0.4px] text-white transition hover:bg-[#e61f1f]"
            >
              Back to Data Room
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
