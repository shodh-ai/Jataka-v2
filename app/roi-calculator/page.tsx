"use client";

import { useEffect, useState } from "react";
import { Ticket, Clock, DollarSign, CheckCircle, TrendingUp } from "lucide-react";
import {
  MarketingShell,
  PageHero,
  PageCta,
  ContentSection,
} from "../components/marketing";
import { FadeIn } from "../components/home";

function SliderField({
  icon: Icon,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  hint,
}: {
  icon: typeof Ticket;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <label className="mb-3 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[14px] font-medium text-[#111]">
          <Icon className="h-4 w-4 text-[#2563EB]" />
          {label}
        </span>
        <span className="font-mono text-[14px] font-semibold text-[#111]">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E8E8EC] accent-[#111]"
      />
      {hint ? <p className="mt-2 text-[12px] text-[#8A93A3]">{hint}</p> : null}
    </div>
  );
}

export default function ROICalculatorPage() {
  const [incidents, setIncidents] = useState(120);
  const [mttrHours, setMttrHours] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(150);
  const [automationRate] = useState(0.5);

  const [outputs, setOutputs] = useState({
    wastedSpend: 0,
    downtimeCost: 0,
    marginExpansion: 0,
    total: 0,
  });

  useEffect(() => {
    const annualIncidents = incidents * 12;
    const wastedSpend = annualIncidents * mttrHours * hourlyRate;
    const downtimeCost = annualIncidents * 0.35 * mttrHours * hourlyRate * 2.5;
    const automatedHours = annualIncidents * mttrHours * automationRate;
    const marginExpansion = automatedHours * hourlyRate;
    setOutputs({
      wastedSpend: Math.round(wastedSpend),
      downtimeCost: Math.round(downtimeCost),
      marginExpansion: Math.round(marginExpansion),
      total: Math.round(wastedSpend * automationRate + downtimeCost * 0.5),
    });
  }, [incidents, mttrHours, hourlyRate, automationRate]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <MarketingShell>
      <PageHero
        eyebrow="ROI & Margin Calculator"
        title="Calculate the True Cost of Your Escalation"
        italicWord="Queue"
        subtitle="See exactly how much margin you are losing to manual L1–L3 triage, and how Jataka transforms your Managed Services profitability."
        ctas={[
          { label: "Get a Custom Value Assessment →", href: "/book-pilot", primary: true },
          { label: "Shadow Mode Pilot", href: "/shadow-mode" },
        ]}
      />

      <ContentSection>
        <div className="grid gap-4 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-8">
              <h2 className="mb-6 text-[1.15rem] font-semibold tracking-[-0.02em] text-[#111]">
                The interactive tool
              </h2>

              <SliderField
                icon={Ticket}
                label="L2/L3 Salesforce incidents / month"
                value={incidents}
                onChange={setIncidents}
                min={10}
                max={500}
                step={5}
                hint="Input 1 · Volume of escalated Salesforce incidents"
              />
              <SliderField
                icon={Clock}
                label="Average time to resolution (hours)"
                value={mttrHours}
                onChange={setMttrHours}
                min={1}
                max={40}
                hint="Input 2 · Manual investigation + fix time"
              />
              <SliderField
                icon={DollarSign}
                label="Outsourced / internal blended hourly rate"
                value={hourlyRate}
                onChange={setHourlyRate}
                min={50}
                max={400}
                step={5}
                prefix="$"
                hint="Input 3 · GSI or internal blended rate"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="flex h-full flex-col rounded-[20px] border border-[#111]/08 bg-[#0C1320] p-6 text-white shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-8">
              <h2 className="mb-6 text-[1.15rem] font-semibold tracking-[-0.02em]">
                Annual output
              </h2>

              <div className="mb-6 rounded-[16px] bg-white px-6 py-7 text-center text-[#111]">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-[#8A93A3] uppercase">
                  Recoverable value (50% automation)
                </p>
                <p className="mt-2 text-[clamp(2.2rem,4vw,3rem)] font-semibold tracking-[-0.04em]">
                  {formatCurrency(outputs.total)}
                </p>
              </div>

              <div className="flex-1 space-y-3">
                {[
                  { label: "Wasted Investigation Spend", value: outputs.wastedSpend },
                  { label: "Cost of Downtime", value: outputs.downtimeCost },
                  { label: "Jataka Margin Expansion", value: outputs.marginExpansion },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-[14px] text-white/85">{row.label}</span>
                    </div>
                    <span className="text-[15px] font-semibold">{formatCurrency(row.value)}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 border-t border-white/10 pt-5 text-[13px] leading-[1.6] text-white/55">
                Automating 50% of the workload instantly doubles GSI profit margins on the
                remaining managed-services capacity.
              </p>
            </div>
          </FadeIn>
        </div>
      </ContentSection>

      <ContentSection title="Why it" italicWord="matters">
        <FadeIn>
          <div className="flex items-start gap-3 rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-8">
            <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" />
            <p className="max-w-[680px] text-[16px] leading-[1.75] text-[#5F5F66]">
              Stop paying engineers $150/hour to read logs and guess blast radiuses. Shift your
              engineering budget from maintenance to innovation.
            </p>
          </div>
        </FadeIn>
      </ContentSection>

      <PageCta
        title="Get a custom value"
        italicWord="assessment"
        subtitle="We'll model your ticket volume, MTTR, and contract margins under NDA."
        primaryLabel="Get a Custom Value Assessment →"
        primaryHref="/book-pilot"
        secondaryLabel="M&A Tech Debt"
        secondaryHref="/ma-org-merge-intelligence"
      />
    </MarketingShell>
  );
}
