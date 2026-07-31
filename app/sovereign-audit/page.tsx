"use client";

import { LayoutDashboard, Shield, Lock } from "lucide-react";
import { FadeIn } from "../components/home";
import { ProductPageTemplate } from "../components/marketing";

function AuditVisual() {
  return (
    <FadeIn>
      <div className="overflow-hidden rounded-[22px] border border-[#111]/08 bg-white shadow-[0_18px_50px_rgba(17,17,17,0.05)]">
        <div className="border-b border-[#111]/08 px-5 py-3">
          <p className="font-mono text-[10px] tracking-[0.18em] text-[#8A93A3] uppercase">
            Air-Traffic Control · Approval payload
          </p>
        </div>
        <div className="grid gap-px bg-[#111]/08 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Intent", body: "EMEA Opportunity save failing for reps" },
            { label: "Blast radius", body: "3 Flows · 1 Trigger · 12 profiles" },
            { label: "Code diff", body: "+14 / −3 · AST-verified patch" },
            { label: "Sandbox video", body: "MP4 · 00:42 · PASSED" },
          ].map((panel) => (
            <div key={panel.label} className="bg-white p-5">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-[#8A93A3] uppercase">
                {panel.label}
              </p>
              <p className="mt-2 text-[13px] leading-[1.55] text-[#3A3A42]">{panel.body}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-[#111]/08 bg-[#F8FAFC] px-5 py-3 font-mono text-[11px] text-[#5F5F66]">
          SHA-256 · a7f3…9c21 · S3 Object Lock · WORM · immutable
        </div>
      </div>
    </FadeIn>
  );
}

export default function SovereignAuditPage() {
  return (
    <ProductPageTemplate
      eyebrow="Sovereign Audit & Approvals"
      title="AI Speed. Human Authority."
      italicWord="Auditor Approved"
      subtitle='Cure "Alert Fatigue." Jataka empowers IT Managers with rich, video-backed approval dashboards and secures every action in a WORM-compliant cryptographic ledger.'
      visual={<AuditVisual />}
      problemTitle="Black-box AI fails"
      problemItalic="SOC2"
      problemBody={
        'CISOs won\'t approve AI that operates in a "Black Box." Simple Postgres databases fail SOC2 audits because they can be edited by humans.'
      }
      featuresTitle="The Trust"
      featuresItalic="Firewall"
      features={[
        {
          title: "The Rich Approval UX",
          body: 'Stop blindly clicking "Yes." Managers receive a 4-part payload: the original intent, the visual blast radius, the code diff, and a video of the sandbox test.',
          icon: LayoutDashboard,
        },
        {
          title: "TEE Inference",
          body: "High-risk code generation is routed through GCP Confidential Space (Hardware Trusted Execution Environments) to prove the prompt was never tampered with.",
          icon: Shield,
        },
        {
          title: "WORM Cryptographic Ledgers",
          body: "Every approved action is hashed (SHA-256) and locked into AWS S3 Object Lock (Write-Once-Read-Many). Your SOC2 auditor gets a read-only portal to verify the math.",
          icon: Lock,
        },
      ]}
      resultTitle="Speed without"
      resultItalic="blind trust"
      resultBody="Every autonomous action is human-approved with full evidence—and sealed in an immutable ledger auditors can verify without asking anyone to unlock a database."
      primaryCtaLabel="View the Auditor Dashboard →"
      primaryCtaHref="/book-pilot"
      secondaryCtaLabel="Trust & Security Center"
      secondaryCtaHref="/security"
      related={[
        { label: "DeltaBox Sandboxing", href: "/deltabox" },
        { label: "Autonomous Support", href: "/autonomous-support" },
        { label: "Trust & Security Center", href: "/security" },
      ]}
      bottomCtaTitle="Put human authority in front of"
      bottomCtaItalic="every patch"
      bottomCtaSubtitle="See the four-part approval payload and WORM ledger on a live walkthrough."
    />
  );
}
