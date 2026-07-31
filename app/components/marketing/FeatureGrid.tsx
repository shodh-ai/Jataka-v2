"use client";

import type { LucideIcon } from "lucide-react";
import { FadeIn } from "../home/FadeIn";

export type FeatureCard = {
  title: string;
  body: string;
  icon?: LucideIcon;
  meta?: string;
};

export default function FeatureGrid({
  features,
  columns = 2,
}: {
  features: FeatureCard[];
  columns?: 2 | 3 | 4;
}) {
  const cols =
    columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : columns === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2";

  return (
    <div className={`grid gap-4 ${cols}`}>
      {features.map((feature, i) => {
        const Icon = feature.icon;
        return (
          <FadeIn key={feature.title} delay={i * 0.05}>
            <article className="h-full rounded-[20px] border border-[#111]/08 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-7">
              <div className="mb-4 flex items-start justify-between gap-3">
                {Icon ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#111]/08 bg-[#F8FAFC] text-[#2563EB]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                ) : (
                  <span className="font-mono text-[12px] text-[#C4C4CC]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                {feature.meta ? (
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-[#8A93A3] uppercase">
                    {feature.meta}
                  </span>
                ) : null}
              </div>
              <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[#111]">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-[1.65] text-[#5F5F66]">{feature.body}</p>
            </article>
          </FadeIn>
        );
      })}
    </div>
  );
}
