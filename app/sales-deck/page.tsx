"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MarketingShell } from "../components/marketing";

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

// Animated counter
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal(0.5);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <span ref={ref} className="font-semibold tracking-tight text-[#2563EB]">
      {count}
      {suffix}
    </span>
  );
}

// Reveal wrapper component
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function SalesDeckPage() {
  const router = useRouter();

  return (
    <MarketingShell>
      <div className="min-h-screen bg-[#F3F3F4] text-[#111111]">
        {/* ── SECTION 1: THE BIG CHANGE ── */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16 sm:px-6 md:px-10 md:pt-32 md:pb-20">
          <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.3]" aria-hidden />
          <div className="pointer-events-none absolute top-[42%] left-1/2 h-[min(420px,70vw)] w-[min(420px,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

          <div className="relative z-10 mx-auto w-full max-w-[920px] text-center">
            <Reveal>
              <p className="mb-[40px] text-[12px] font-medium tracking-[3px] text-[#5F5F66] uppercase">
                01 , The Big Change
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mb-[40px] text-[clamp(40px,6vw,72px)] leading-[1] font-semibold tracking-[-2px]">
                We have entered the
                <br />
                <span className="font-instrument font-normal text-[#2563EB] italic">
                  Era of AI-Generated Code.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mb-[50px] max-w-[680px] text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#5F5F66]">
                Developers are using tools like{" "}
                <strong className="font-semibold text-[#111]">Cursor</strong> and{" "}
                <strong className="font-semibold text-[#111]">Agentforce</strong> to write and
                deploy code 10x faster than humans ever could.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="mx-auto max-w-[680px] border-l-[3px] border-[#2563EB] pl-[24px] text-left text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#5F5F66]">
                But there is a massive problem:{" "}
                <strong className="font-semibold text-[#111]">
                  The speed of development has officially outpaced the safety of enterprise
                  infrastructure.
                </strong>
              </p>
            </Reveal>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-[40px] left-1/2 flex -translate-x-1/2 transform animate-bounce flex-col items-center gap-[8px]">
            <span className="text-[10px] tracking-[2px] text-[#9A9AA3] uppercase">Scroll</span>
            <svg
              className="h-[20px] w-[20px] text-[#2563EB]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* ── SECTION 2: THE UNADDRESSED RISK ── */}
        <section className="relative overflow-hidden border-t border-[#111]/10 px-5 py-16 sm:px-6 md:px-10 md:py-24">

          {/* Large background text */}
          <div className="pointer-events-none absolute top-[50%] right-[-10%] -translate-y-1/2 transform text-[200px] font-semibold tracking-[-10px] text-[#111]/[0.02] uppercase select-none md:text-[300px]">
            RISK
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[920px] text-center">
            <Reveal>
              <p className="mb-[40px] text-[12px] font-medium tracking-[3px] text-[#5F5F66] uppercase">
                02 , The Unaddressed Risk
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mb-[30px] text-[clamp(36px,5vw,60px)] leading-[1] font-semibold tracking-[-1.5px]">
                Syntax is perfect.
                <br />
                <span className="font-instrument font-normal text-[#2563EB] italic">
                  Runtime is fatal.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mb-[60px] max-w-[700px] text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#5F5F66]">
                In modern Salesforce environments, code rarely fails in isolation. A single
                deployment interacts with years of legacy Triggers, complex Flows, and heavy Managed
                Packages.
              </p>
            </Reveal>

            <div className="mx-auto max-w-[720px] space-y-[16px] text-left">
              <Reveal delay={300}>
                <div className="group flex cursor-default items-start gap-[30px] rounded-[12px] p-[24px] transition-all duration-300 hover:bg-[#111]/[0.02]">
                  <span className="mt-[2px] text-[24px] text-[#2563EB] transition-transform group-hover:translate-x-[8px]">
                    →
                  </span>
                  <div>
                    <h3 className="mb-[8px] text-[18px] font-semibold tracking-[0.5px]">
                      The Test Passes
                    </h3>
                    <p className="text-[16px] leading-[1.6] text-[#5F5F66]">
                      When tested in a vacuum, the code passes. Unit tests green. Static analysis
                      clean.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="group flex cursor-default items-start gap-[30px] rounded-[12px] p-[24px] transition-all duration-300 hover:bg-[#111]/[0.02]">
                  <span className="mt-[2px] text-[24px] text-[#2563EB] transition-transform group-hover:translate-x-[8px]">
                    →
                  </span>
                  <div>
                    <h3 className="mb-[8px] text-[18px] font-semibold tracking-[0.5px]">
                      Reality Hits
                    </h3>
                    <p className="text-[16px] leading-[1.6] text-[#5F5F66]">
                      When subjected to real-world data volumes, it triggers cascading loops and
                      breaches governor limits.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="group flex cursor-default items-start gap-[30px] rounded-[12px] border border-[#2563EB]/10 bg-[#2563EB]/5 p-[24px] transition-all duration-300 hover:bg-[#2563EB]/10">
                  <span className="mt-[2px] text-[24px] text-[#2563EB] transition-transform group-hover:translate-x-[8px]">
                    →
                  </span>
                  <div>
                    <h3 className="mb-[8px] text-[18px] font-semibold tracking-[0.5px] text-[#2563EB]">
                      Production Crashes
                    </h3>
                    <p className="text-[16px] leading-[1.6] text-[#5F5F66]">
                      The cost of catching these failures in Production is measured in{" "}
                      <strong className="text-[#111]">destroyed profit margins</strong> and{" "}
                      <strong className="text-[#111]">lost client trust</strong>.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: THE PROMISED LAND ── */}
        <section className="relative overflow-hidden border-t border-[#111]/10 bg-[#F7F7F8] px-5 py-16 sm:px-6 md:px-10 md:py-24">

          <div className="relative z-10 mx-auto w-full max-w-[920px] text-center">
            <div className="grid grid-cols-1 items-start gap-[48px] lg:grid-cols-2 lg:gap-[64px] lg:text-left">
              <div className="lg:text-left">
                <Reveal>
                  <p className="mb-[40px] text-[12px] font-medium tracking-[3px] text-[#5F5F66] uppercase">
                    03 , The Promised Land
                  </p>
                </Reveal>

                <Reveal delay={100}>
                  <h2 className="mb-[40px] text-[clamp(36px,5vw,60px)] leading-[1.05] font-semibold tracking-[-1.5px]">
                    Imagine deploying at the
                    <br />
                    speed of AI, with
                    <br />
                    <span className="font-instrument font-normal text-[#2563EB] italic">
                      zero fear of rollbacks.
                    </span>
                  </h2>
                </Reveal>

                <Reveal delay={200}>
                  <p className="mx-auto mb-[50px] max-w-[640px] text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#5F5F66] lg:mx-0">
                    What if you could{" "}
                    <strong className="font-semibold text-[#111]">mathematically guarantee</strong>{" "}
                    that a governor limit breach would never reach your Production org again?
                  </p>
                </Reveal>
              </div>

              {/* Animated stats */}
              <div className="lg:pt-[100px]">
                <Reveal delay={300}>
                  <div className="rounded-[16px] border border-[#111]/08 bg-white p-[32px] shadow-[0_14px_40px_rgba(17,17,17,0.04)]">
                    <div className="grid grid-cols-2 gap-[32px]">
                      <div className="text-center">
                        <div className="mb-[8px] text-[42px] font-semibold tracking-tight text-[#2563EB]">
                          <AnimatedCounter end={99} suffix="%" />
                        </div>
                        <p className="text-[12px] tracking-[1px] text-[#5F5F66] uppercase">
                          Breach Prevention
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="mb-[8px] text-[42px] font-semibold tracking-tight text-[#2563EB]">
                          <AnimatedCounter end={10} suffix="x" />
                        </div>
                        <p className="text-[12px] tracking-[1px] text-[#5F5F66] uppercase">
                          Faster Detection
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="mb-[8px] text-[42px] font-semibold tracking-tight text-[#2563EB]">
                          <AnimatedCounter end={0} />
                        </div>
                        <p className="text-[12px] tracking-[1px] text-[#5F5F66] uppercase">
                          Weekend Rollbacks
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="mb-[8px] text-[42px] font-semibold tracking-tight text-[#2563EB]">
                          <AnimatedCounter end={24} suffix="/7" />
                        </div>
                        <p className="text-[12px] tracking-[1px] text-[#5F5F66] uppercase">
                          Monitoring
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={400}>
              <div className="mt-[60px] flex flex-wrap justify-center gap-x-[40px] gap-y-[20px]">
                <div className="group flex cursor-default items-center gap-[12px]">
                  <span className="h-[8px] w-[8px] rounded-full bg-[#2563EB] transition-transform group-hover:scale-150" />
                  <span className="text-[16px] text-[#5F5F66]">No more weekend rollbacks</span>
                </div>
                <div className="group flex cursor-default items-center gap-[12px]">
                  <span className="h-[8px] w-[8px] rounded-full bg-[#2563EB] transition-transform group-hover:scale-150" />
                  <span className="text-[16px] text-[#5F5F66]">No more destroyed profit margins</span>
                </div>
                <div className="group flex cursor-default items-center gap-[12px]">
                  <span className="h-[8px] w-[8px] rounded-full bg-[#2563EB] transition-transform group-hover:scale-150" />
                  <span className="text-[16px] text-[#5F5F66]">Pure, uncompromised velocity</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── SECTION 4: INTRODUCING JATAKA ── */}
        <section className="relative overflow-hidden border-t border-[#111]/10 px-5 py-16 sm:px-6 md:px-10 md:py-24">

          {/* Large watermark */}
          <div className="pointer-events-none absolute top-[50%] left-[-5%] -translate-y-1/2 transform text-[180px] font-semibold tracking-[-10px] text-[#111]/[0.02] uppercase select-none md:text-[250px]">
            FIREWALL
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[920px] text-center">
            <Reveal>
              <p className="mb-[40px] text-[12px] font-medium tracking-[3px] text-[#5F5F66] uppercase">
                04 , Introducing Jataka
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mb-[30px] text-[clamp(36px,5vw,60px)] leading-[1] font-semibold tracking-[-1.5px]">
                Meet Jataka.
                <br />
                <span className="font-instrument font-normal text-[#2563EB] italic">
                  The Pre-Production Runtime Firewall.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mb-[60px] text-[clamp(18px,1.8vw,22px)] leading-[1.6] text-[#5F5F66]">
                Jataka is the bridge to the Promised Land.{" "}
                <strong className="font-semibold text-[#111]">
                  We don&apos;t just read your code; we execute it.
                </strong>
              </p>
            </Reveal>

            <div className="grid grid-cols-1 items-stretch gap-[24px] md:grid-cols-3">
              <Reveal delay={300} className="h-full min-h-0">
                <div className="group flex h-full cursor-default flex-col rounded-[16px] border border-[#111]/08 bg-white p-[28px] shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-all duration-300 hover:border-[#2563EB]/20 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)]">
                  <div className="mb-[20px] flex h-[48px] w-[48px] items-center justify-center rounded-[8px] bg-[#2563EB]/10 transition-colors group-hover:bg-[#2563EB]/20">
                    <svg
                      className="h-[24px] w-[24px] text-[#2563EB]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="mb-[12px] font-mono text-[12px] tracking-[2px] text-[#8A93A3] uppercase">
                    Kamikaze Pod
                  </p>
                  <p className="flex-1 text-[15px] leading-[1.7] text-[#5F5F66]">
                    When a PR is opened, Jataka spawns an isolated pod, executes the transaction, and
                    blocks the merge if limits hit 90%.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300} className="h-full min-h-0">
                <div className="group flex h-full cursor-default flex-col rounded-[16px] border border-[#111]/08 bg-white p-[28px] shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-all duration-300 hover:border-[#2563EB]/20 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)]">
                  <div className="mb-[20px] flex h-[48px] w-[48px] items-center justify-center rounded-[8px] bg-[#2563EB]/10 transition-colors group-hover:bg-[#2563EB]/20">
                    <svg
                      className="h-[24px] w-[24px] text-[#2563EB]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <p className="mb-[12px] font-mono text-[12px] tracking-[2px] text-[#8A93A3] uppercase">
                    Tooling API
                  </p>
                  <p className="flex-1 text-[15px] leading-[1.7] text-[#5F5F66]">
                    Correlates every UI click with the Salesforce Tooling API to profile async
                    Governor Limits in real-time.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300} className="h-full min-h-0">
                <div className="group flex h-full cursor-default flex-col rounded-[16px] border border-[#111]/08 bg-white p-[28px] shadow-[0_12px_36px_rgba(17,17,17,0.04)] transition-all duration-300 hover:border-[#2563EB]/20 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)]">
                  <div className="mb-[20px] flex h-[48px] w-[48px] items-center justify-center rounded-[8px] bg-[#2563EB]/10 transition-colors group-hover:bg-[#2563EB]/20">
                    <svg
                      className="h-[24px] w-[24px] text-[#2563EB]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <p className="mb-[12px] font-mono text-[12px] tracking-[2px] text-[#8A93A3] uppercase">
                    Knowledge + MCP
                  </p>
                  <p className="flex-1 text-[15px] leading-[1.7] text-[#5F5F66]">
                    Dependency Graph feeds your architecture into Cursor via MCP, stopping
                    conflicting logic before it&apos;s saved.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: VIDEO DEMO ── */}
        <section className="relative overflow-hidden border-t border-[#111]/10 bg-[#F3F3F4] px-5 py-16 sm:px-6 md:px-10 md:py-24">
          <div className="relative z-10 mx-auto w-full max-w-[920px] text-center">
            <Reveal>
              <p className="mb-[40px] text-[12px] font-medium tracking-[3px] text-[#2563EB] uppercase">
                See It In Action
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mb-[20px] text-[clamp(36px,5vw,60px)] leading-[1] font-semibold tracking-[-1.5px] text-[#111]">
                Watch The Demo.
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mb-[60px] max-w-[600px] text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-[#5F5F66]">
                See how Jataka catches governor limit breaches before they reach Production.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mx-auto aspect-video max-w-[900px] overflow-hidden rounded-[16px] border border-[#111]/10 bg-black shadow-[0_14px_40px_rgba(17,17,17,0.08)]">
                <iframe
                  src="https://www.youtube.com/embed/SdXRbVhZMzg"
                  title="Jataka product overview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <p className="mx-auto mt-4 max-w-[520px] text-[13px] leading-relaxed text-[#8A93A3]">
                Product overview video.{" "}
                <button
                  type="button"
                  onClick={() => router.push("/demos")}
                  className="font-medium text-[#2563EB] underline-offset-2 hover:underline"
                >
                  Browse all demos
                </button>{" "}
                or book a pilot for a live walkthrough.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── SECTION 6: BUSINESS OUTCOME & ASK ── */}
        <section className="relative overflow-hidden border-t border-[#111]/10 bg-[#F7F7F8] px-5 py-16 sm:px-6 md:px-10 md:py-24">

          {/* Large watermark */}
          <div className="pointer-events-none absolute top-[50%] right-[-10%] -translate-y-1/2 transform text-[180px] font-semibold tracking-[-10px] text-[#111]/[0.02] uppercase select-none md:text-[250px]">
            RESULTS
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[920px] text-center">
            <Reveal>
              <p className="mb-[40px] text-[12px] font-medium tracking-[3px] text-[#5F5F66] uppercase">
                05 , The Outcome
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mb-[50px] text-[clamp(36px,5vw,60px)] leading-[1] font-semibold tracking-[-1.5px]">
                Deploy with
                <br />
                <span className="font-instrument font-normal text-[#2563EB] italic">
                  absolute certainty.
                </span>
              </h2>
            </Reveal>

            <div className="mx-auto mb-[80px] max-w-[720px] space-y-[16px] text-left">
              <Reveal delay={200}>
                <div className="group flex items-start gap-[20px] rounded-[12px] p-[24px] transition-all duration-300 hover:bg-white/50">
                  <div className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-[8px] bg-[#2563EB]/10 transition-colors group-hover:bg-[#2563EB]/20">
                    <svg
                      className="h-[24px] w-[24px] text-[#2563EB]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[18px] leading-[1.6] text-[#5F5F66]">
                      <strong className="font-semibold text-[#111]">Eliminate Rollbacks.</strong>{" "}
                      Stop limit-based deployment failures before they reach Production.
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <div className="group flex items-start gap-[20px] rounded-[12px] p-[24px] transition-all duration-300 hover:bg-white/50">
                  <div className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-[8px] bg-[#2563EB]/10 transition-colors group-hover:bg-[#2563EB]/20">
                    <svg
                      className="h-[24px] w-[24px] text-[#2563EB]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[18px] leading-[1.6] text-[#5F5F66]">
                      <strong className="font-semibold text-[#111]">Protect Margins.</strong>{" "}
                      Guarantee uptime and protect US/EU client revenue from Sev-1 outages.
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="group flex items-start gap-[20px] rounded-[12px] p-[24px] transition-all duration-300 hover:bg-white/50">
                  <div className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-[8px] bg-[#2563EB]/10 transition-colors group-hover:bg-[#2563EB]/20">
                    <svg
                      className="h-[24px] w-[24px] text-[#2563EB]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[18px] leading-[1.6] text-[#5F5F66]">
                      <strong className="font-semibold text-[#111]">Shift-Left Guardrails.</strong>{" "}
                      Increase offshore developer velocity with our free IDE plugin.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* CTA */}
            <Reveal delay={500}>
              <div className="border-t border-[#111]/20 pt-[40px]">
                <div className="rounded-[16px] border border-[#111]/08 bg-white p-[40px] shadow-[0_14px_40px_rgba(17,17,17,0.04)] md:p-[60px]">
                  <p className="mb-[20px] text-[12px] font-medium tracking-[3px] text-[#2563EB] uppercase">
                    Limited Availability
                  </p>
                  <h3 className="mb-[20px] text-[clamp(28px,3.5vw,42px)] leading-[1] font-semibold tracking-[-1px]">
                    Book a 14 Day Pilot
                  </h3>
                  <p className="mx-auto mb-[30px] max-w-[500px] text-[17px] leading-[1.6] text-[#5F5F66]">
                    Join the enterprise teams who have eliminated production rollbacks. Experience
                    the Runtime Firewall firsthand.
                  </p>
                  <button
                    onClick={() => router.push("/book-pilot")}
                    className="group mx-auto flex items-center gap-[12px] rounded-full bg-[#111] px-[40px] py-[16px] text-[14px] font-semibold tracking-[0.02em] text-white transition-all duration-300 hover:bg-[#222]"
                  >
                    Book a 14 Day Pilot
                    <svg
                      className="h-[16px] w-[16px] transition-transform group-hover:translate-x-[4px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </MarketingShell>
  );
}
