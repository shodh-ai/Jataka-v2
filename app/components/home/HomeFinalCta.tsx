"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { RevealHeading } from "./RevealHeading";

type ArmState = "idle" | "arming" | "ready" | "flash";

function ShadowModeButton() {
  const router = useRouter();
  const [state, setState] = useState<ArmState>("idle");
  const progress = useMotionValue(0);
  const fillWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const holdRef = useRef<ReturnType<typeof animate> | null>(null);
  const flashTimer = useRef<number | null>(null);
  const armedRef = useRef(false);

  useEffect(() => {
    return () => {
      holdRef.current?.stop();
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    };
  }, []);

  const stopHold = useCallback(() => {
    holdRef.current?.stop();
    holdRef.current = null;
  }, []);

  const reset = useCallback(() => {
    if (armedRef.current || state === "flash") return;
    stopHold();
    setState("idle");
    animate(progress, 0, { duration: 0.28 });
  }, [progress, state, stopHold]);

  const startHold = useCallback(() => {
    if (armedRef.current || state === "flash") return;
    setState("arming");
    stopHold();
    holdRef.current = animate(progress, 1, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        armedRef.current = true;
        setState("ready");
      },
    });
  }, [progress, state, stopHold]);

  const fire = useCallback(() => {
    if (!armedRef.current && state !== "ready") return;
    setState("flash");
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => {
      router.push("/book-pilot");
    }, 380);
  }, [router, state]);

  const onRelease = useCallback(() => {
    if (armedRef.current || state === "ready") {
      fire();
      return;
    }
    reset();
  }, [fire, reset, state]);

  const label =
    state === "arming"
      ? "Arming sandbox…"
      : state === "ready" || state === "flash"
        ? "Shadow Mode ready"
        : "Hold to arm Shadow Mode";

  return (
    <div className="relative flex flex-col items-center">
      {state === "flash" && (
        <motion.div
          initial={{ opacity: 0.65 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none fixed inset-0 z-[300] bg-[radial-gradient(circle_at_center,rgba(165,243,252,0.55),transparent_55%)]"
        />
      )}

      <motion.button
        type="button"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture?.(e.pointerId);
          startHold();
        }}
        onPointerUp={onRelease}
        onPointerCancel={reset}
        onLostPointerCapture={reset}
        whileTap={{ scale: 0.98 }}
        className={`relative inline-flex h-[52px] min-w-[270px] items-center justify-center overflow-hidden rounded-full border border-white/10 px-10 text-sm font-semibold tracking-wide select-none ${
          state === "ready" || state === "flash"
            ? "bg-cyan-300 text-[#030712] shadow-[0_14px_50px_rgba(34,211,238,0.5)]"
            : "bg-white text-[#030712] shadow-[0_10px_40px_rgba(6,182,212,0.22)]"
        }`}
        aria-label={label}
      >
        {/* Arming fill */}
        <motion.span
          aria-hidden
          className="absolute inset-y-0 left-0 bg-cyan-200/80"
          style={{ width: fillWidth }}
        />

        <span className="relative z-[1] flex items-center gap-2.5">
          {(state === "arming" || state === "ready" || state === "flash") && (
            <span
              className={`h-2 w-2 rounded-full ${
                state === "arming" ? "animate-pulse bg-cyan-600" : "bg-[#030712]"
              }`}
            />
          )}
          {label}
        </span>
      </motion.button>

      <p className="mt-3 text-center text-[11px] tracking-[0.1em] text-slate-500 uppercase">
        {state === "ready" ? "Release to enter · zero risk" : "Press & hold · 30-day sandbox"}
      </p>
    </div>
  );
}

export default function HomeFinalCta() {
  return (
    <section id="final-cta" className="relative overflow-hidden bg-[#030712] px-6 py-24 md:px-10 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[760px] text-center">
        <RevealHeading
          as="h2"
          align="center"
          className="text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white"
          lines={[{ content: "Stop guessing." }, { content: "Start proving." }]}
        />
        <FadeIn delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            Deploy Jataka in 30-Day Read-Only Shadow Mode. If we don&apos;t catch your bugs, you
            don&apos;t pay.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5">
            <ShadowModeButton />
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-7 py-3.5 text-sm font-medium text-slate-300 transition-colors hover:border-white/30 hover:text-white"
            >
              View Enterprise Pricing
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
