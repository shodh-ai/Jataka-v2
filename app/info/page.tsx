import Link from "next/link";

const defenseLayers = [
  {
    title: "The Context Engine",
    subtitle: "Mapping the Blast Radius",
    body: "Jataka connects to your Salesforce Org via OAuth and ingests metadata, Flow dependencies, and Apex Triggers through the Tooling API into a Neo4j graph. Your team gets a live map of how a decade of architecture is actually wired.",
  },
  {
    title: "Shift-Left Guardrails",
    subtitle: "Cursor MCP Integration",
    body: "We stream architecture context directly into AI copilots using MCP. Before code is written, the copilot is warned about dangerous patterns (like DML in CPQ-sensitive paths), making enterprise AI coding safer by default.",
  },
  {
    title: "The Production Firewall",
    subtitle: "CI/CD PR Blocker",
    body: "On every pull request, Jataka launches an isolated Kamikaze pod, executes the workflow in Sandbox, profiles Apex Debug Logs, and blocks merges when usage breaches 90% of SOQL, CPU, or Flow limits.",
  },
];

const differentiators = [
  "Runtime simulation instead of syntax-only analysis.",
  "Backend validation: UI action + DB verification + async limit monitoring.",
  "Built-in outbound ERP mocking for safe integration tests.",
  "Autonomous self-healing when layouts/UI change in Salesforce.",
];

export default function JatakaInfoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 pb-20 pt-28 md:px-12">
      <div className="grid-bg" />
      <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,36,36,0.16)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[8px] border border-[var(--border)] bg-[rgba(6,12,22,0.78)] px-4 py-3 backdrop-blur-lg md:px-6">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[1.7px] text-[var(--text-dim)] transition-colors hover:text-[var(--text)]"
          >
            ← Back to Home
          </Link>
          <Link href="/book-pilot" className="nav-cta rounded-[4px]">
            Book Demo
          </Link>
        </div>

        <section className="mb-12 rounded-[10px] border border-[var(--border)] bg-[linear-gradient(155deg,rgba(255,36,36,0.08)_0%,rgba(6,12,22,0.92)_50%,rgba(8,16,29,1)_100%)] p-8 md:p-12">
          <p className="mb-4 inline-flex items-center gap-2 border border-[rgba(255,36,36,0.28)] bg-[var(--accent-red-dim)] px-3 py-1 text-[11px] font-bold uppercase tracking-[2.2px] text-[var(--accent-red)]">
            Runtime Confidence Layer for Salesforce CI/CD
          </p>

          <h1 className="font-archivo text-[clamp(34px,7vw,72px)] uppercase leading-[0.92] tracking-[-2px]">
            <span className="cut-white">75% Code Coverage</span>
            <span className="cut-red">Is an Illusion.</span>
          </h1>

          <p className="mt-6 max-w-4xl text-[15px] leading-[1.8] text-[var(--text-dim)] md:text-[17px]">
            Static scanners read text. They cannot predict runtime behavior under real data volume.
            Jataka executes your actual business process in Sandbox, captures Apex debug telemetry, and
            rejects risky pull requests before Production sees them.
          </p>
        </section>

        <section className="mb-12 grid gap-6 md:grid-cols-3">
          {defenseLayers.map((layer) => (
            <article
              key={layer.title}
              className="group rounded-[8px] border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-transform duration-200 hover:-translate-y-1 hover:border-[rgba(255,36,36,0.32)]"
            >
              <p className="font-mono text-[11px] uppercase tracking-[1.8px] text-[var(--accent-red)]">
                {layer.subtitle}
              </p>
              <h2 className="mt-3 font-archivo text-[24px] uppercase leading-[1.05] tracking-[-0.8px] text-[var(--text)]">
                {layer.title}
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.7] text-[var(--text-dim)]">{layer.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-12 grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[8px] border border-[var(--border)] bg-[var(--bg-card)] p-7 md:p-9">
            <p className="s-label">Why Jataka Wins</p>
            <h3 className="mb-4 font-archivo text-[clamp(28px,3.8vw,46px)] uppercase leading-[0.95] tracking-[-1.5px]">
              We Test Runtime, Not Just Syntax.
            </h3>
            <ul className="space-y-3 text-[15px] leading-[1.7] text-[var(--text-dim)]">
              {differentiators.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[3px] text-[var(--accent-red)]">▣</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-[8px] border border-[rgba(255,36,36,0.28)] bg-[rgba(255,36,36,0.08)] p-7 md:p-9">
            <p className="font-mono text-[12px] uppercase tracking-[1.8px] text-[var(--accent-red)]">
              The Result
            </p>
            <p className="mt-4 font-archivo text-[clamp(24px,4vw,42px)] uppercase leading-[1.02] tracking-[-1px]">
              Zero 101 SOQL errors.
              <br />
              Zero weekend rollbacks.
              <br />
              Full architectural confidence.
            </p>
            <p className="mt-5 text-[14px] leading-[1.7] text-[var(--text-dim)]">
              Jataka turns PR review into a production-grade runtime gate for the Agentic Era.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
