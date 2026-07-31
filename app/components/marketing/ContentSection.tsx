"use client";

import type { ReactNode } from "react";
import { FadeIn } from "../home/FadeIn";
import { RevealHeading } from "../home/RevealHeading";

export default function ContentSection({
  id,
  title,
  italicWord,
  subtitle,
  children,
  align = "left",
}: {
  id?: string;
  title?: ReactNode;
  italicWord?: string;
  subtitle?: ReactNode;
  children: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-[#F3F3F4] px-5 py-12 sm:px-6 md:px-10 md:py-16"
    >
      <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {title ? (
          <div className={align === "center" ? "mx-auto mb-10 max-w-[720px] text-center md:mb-12" : "mb-10 max-w-[720px] md:mb-12"}>
            <RevealHeading
              as="h2"
              align={align}
              className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#111]"
              lines={[
                {
                  content: italicWord ? (
                    <>
                      {title}{" "}
                      <span className="font-instrument font-normal italic text-[#8A93A3]">
                        {italicWord}
                      </span>
                      .
                    </>
                  ) : (
                    <>{title}</>
                  ),
                },
              ]}
            />
            {subtitle ? (
              <FadeIn delay={0.08}>
                <p
                  className={`mt-4 text-[15px] leading-[1.7] text-[#5F5F66] ${
                    align === "center" ? "mx-auto max-w-[560px]" : "max-w-[560px]"
                  }`}
                >
                  {subtitle}
                </p>
              </FadeIn>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
