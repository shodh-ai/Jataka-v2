"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home";

const plans = [
  {
    name: "Team / Agency",
    price: "$1,000",
    period: "/month",
    description: "For growing Salesforce teams and consulting agencies.",
    features: [
      { text: "Up to 10 Developer Seats", included: true },
      { text: "Slack Bot & VS Code MCP access", included: true },
      { text: "1,000 PR limit analyses/month", included: true },
      { text: "500 Kamikaze UI Tests/month", included: true },
      { text: "1 K8s Pod (sequential tests)", included: true },
      { text: "$0.10 per additional PR check", included: true },
      { text: "Day 0 Retroactive Audit", included: false },
      { text: "Knowledge Blast Radius Graph", included: false },
    ],
    cta: "Start Pilot",
    highlight: false,
  },
  {
    name: "Enterprise Velocity",
    price: "$3,000",
    period: "/month",
    description: "For large Salesforce orgs with complex deployments.",
    features: [
      { text: "Up to 30 Developer Seats", included: true },
      { text: "Up to 3 Connected Salesforce Environments", included: true },
      { text: "Slack Bot & VS Code MCP access", included: true },
      { text: "4,000 PR limit analyses/month", included: true },
      { text: "2,000 Kamikaze UI Tests/month", included: true },
      { text: "3 K8s Pods (parallel tests)", included: true },
      { text: "Day 0 Retroactive Risk Audit", included: true },
      { text: "Knowledge Blast Radius Graph", included: true },
      { text: "Priority support & SLA", included: true },
    ],
    cta: "Start Pilot",
    highlight: true,
  },
  {
    name: "Custom",
    price: "Let's Talk",
    period: "",
    description: "For enterprises with unique requirements.",
    features: [
      { text: "Unlimited Developer Seats", included: true },
      { text: "Custom PR analysis volume", included: true },
      { text: "Dedicated K8s cluster", included: true },
      { text: "Private Azure OpenAI / AWS Bedrock routing", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated success manager", included: true },
      { text: "24/7 support", included: true },
      { text: "Custom SLA", included: true },
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const faqs = [
  {
    question: "What happens if I exceed my PR analysis limit?",
    answer:
      "You're charged $0.10 per additional PR check. We'll notify you at 80% capacity so there are no surprises.",
  },
  {
    question: "Can I switch plans mid-contract?",
    answer:
      "Yes. Upgrade anytime. Downgrades take effect at the next billing cycle. No penalties either way.",
  },
  {
    question: "What's the difference between 1 Pod and 3 Pods?",
    answer:
      "With 1 Pod, tests run sequentially. With 3 Pods, tests run in parallel — faster CI/CD for enterprise velocity.",
  },
  {
    question: "Do you offer annual discounts?",
    answer:
      "Yes. Annual contracts get 2 months free (pay for 10, get 12). Enterprise becomes $30,000/year instead of $36,000.",
  },
  {
    question: "What's the pilot commitment?",
    answer:
      "14 days. Zero cost. No credit card. We run in Shadow Mode and prove value before you pay.",
  },
];

export default function PricingPage() {
  return (
    <MarketingShell>
      <PageHero
        title="Transparent"
        italicWord="pricing"
        subtitle="Runtime security for Salesforce teams. No hidden fees. Start with a 14-day Shadow Mode pilot."
        ctas={[
          { label: "Start pilot →", href: "/book-pilot", primary: true },
          { label: "Talk to sales", href: "/book-pilot" },
        ]}
      />

      <ContentSection>
        <div className="mb-6 flex justify-center">
          <span className="rounded-full border border-[#111]/1 bg-white px-4 py-1.5 text-[12px] font-medium text-[#5F5F66]">
            Annual contracts · 2 months free
          </span>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.06}>
              <article
                className={`flex h-full flex-col rounded-[22px] border p-6 md:p-7 ${
                  plan.highlight
                    ? "border-[#111] bg-[#111] text-white shadow-[0_24px_60px_rgba(17,17,17,0.25)]"
                    : "border-[#111]/08 bg-white shadow-[0_12px_36px_rgba(17,17,17,0.04)]"
                }`}
              >
                <p
                  className={`text-[11px] font-semibold tracking-[0.16em] uppercase ${
                    plan.highlight ? "text-white/55" : "text-[#8A93A3]"
                  }`}
                >
                  {plan.name}
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-[clamp(2rem,3vw,2.5rem)] font-semibold tracking-[-0.04em]">
                    {plan.price}
                  </span>
                  {plan.period ? (
                    <span className={plan.highlight ? "text-white/45" : "text-[#8A93A3]"}>
                      {plan.period}
                    </span>
                  ) : null}
                </div>
                <p
                  className={`mt-3 text-[14px] leading-relaxed ${
                    plan.highlight ? "text-white/65" : "text-[#5F5F66]"
                  }`}
                >
                  {plan.description}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5 text-[13.5px]">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          f.included
                            ? plan.highlight
                              ? "text-emerald-300"
                              : "text-[#2563EB]"
                            : plan.highlight
                              ? "text-white/25"
                              : "text-[#D1D5DB]"
                        }`}
                        strokeWidth={2}
                      />
                      <span
                        className={
                          f.included
                            ? plan.highlight
                              ? "text-white/85"
                              : "text-[#3A3A42]"
                            : plan.highlight
                              ? "text-white/30 line-through"
                              : "text-[#C4C4CC] line-through"
                        }
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book-pilot"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-[13px] font-medium transition-colors ${
                    plan.highlight
                      ? "bg-white text-[#111] hover:bg-white/90"
                      : "bg-[#111] text-white hover:bg-[#222]"
                  }`}
                >
                  {plan.cta} →
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Frequently" italicWord="asked" align="center">
        <div className="mx-auto max-w-[720px] space-y-3">
          {faqs.map((faq, i) => (
            <FadeIn key={faq.question} delay={i * 0.04}>
              <details className="group rounded-[16px] border border-[#111]/08 bg-white px-5 py-4 open:shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
                <summary className="cursor-pointer list-none text-[15px] font-semibold text-[#111] [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-[#8A93A3] transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-[14px] leading-[1.7] text-[#5F5F66]">{faq.answer}</p>
              </details>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      <PageCta
        title="Start a pilot. See the"
        italicWord="value"
        subtitle="14 days. Shadow Mode. Zero risk."
      />
    </MarketingShell>
  );
}
