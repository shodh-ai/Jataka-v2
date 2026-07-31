"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FadeIn } from "./FadeIn";
import { RevealHeading } from "./RevealHeading";

gsap.registerPlugin(ScrollTrigger);

const RAG_WORDS = [
  "webhook",
  "timeout",
  "retry",
  "SOQL",
  "governor",
  "checkout",
  "trigger",
  "flow",
  "Guest",
  "PII",
  "deploy",
  "rollback",
  "logs",
  "maybe",
  "similar",
  "vector",
];

const AST_NODES = [
  { x: 160, y: 120, r: 14, fill: "#2563EB" },
  { x: 70, y: 55, r: 9, fill: "#6366F1" },
  { x: 250, y: 50, r: 9, fill: "#6366F1" },
  { x: 50, y: 170, r: 8, fill: "#10B981" },
  { x: 270, y: 175, r: 8, fill: "#06B6D4" },
  { x: 160, y: 210, r: 7, fill: "#94A3B8" },
  { x: 110, y: 140, r: 6, fill: "#CBD5E1" },
  { x: 210, y: 145, r: 6, fill: "#CBD5E1" },
];

const AST_EDGES: [number, number, number, number][] = [
  [160, 120, 70, 55],
  [160, 120, 250, 50],
  [160, 120, 50, 170],
  [160, 120, 270, 175],
  [160, 120, 160, 210],
  [70, 55, 110, 140],
  [250, 50, 210, 145],
];

export default function HomeParadigm() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const ragRef = useRef<HTMLDivElement>(null);
  const astRef = useRef<HTMLDivElement>(null);
  const guessRef = useRef<HTMLSpanElement>(null);
  const proveRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      const rag = ragRef.current;
      const ast = astRef.current;
      if (!section || !stage || !rag || !ast) return;

      const words = rag.querySelectorAll("[data-rag-word]");
      const edges = ast.querySelectorAll("[data-ast-edge]");
      const nodes = ast.querySelectorAll("[data-ast-node]");

      const mm = gsap.matchMedia();

      // Desktop: pin + scrub dissolve RAG → compile AST
      mm.add("(min-width: 768px)", () => {
        gsap.set(ast, { opacity: 0.15, filter: "blur(6px)" });
        edges.forEach((el) => {
          const line = el as SVGLineElement;
          const len = Math.hypot(
            Number(line.getAttribute("x2")) - Number(line.getAttribute("x1")),
            Number(line.getAttribute("y2")) - Number(line.getAttribute("y1"))
          );
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(nodes, { scale: 0, opacity: 0, transformOrigin: "50% 50%" });
        gsap.set(proveRef.current, { opacity: 0.2 });
        gsap.set(arrowRef.current, { opacity: 0.35, scale: 0.9 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=130%",
            scrub: 0.75,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          words,
          {
            opacity: 0,
            y: -18,
            filter: "blur(8px)",
            stagger: { each: 0.02, from: "random" },
            duration: 0.45,
            ease: "none",
          },
          0
        )
          .to(
            rag,
            { opacity: 0.2, filter: "blur(10px)", scale: 0.96, duration: 0.4, ease: "none" },
            0.15
          )
          .to(guessRef.current, { opacity: 0.25, duration: 0.25 }, 0.2)
          .to(arrowRef.current, { opacity: 1, scale: 1, duration: 0.2 }, 0.35)
          .to(proveRef.current, { opacity: 1, duration: 0.25 }, 0.4)
          .to(ast, { opacity: 1, filter: "blur(0px)", duration: 0.35, ease: "none" }, 0.35)
          .to(
            edges,
            { strokeDashoffset: 0, duration: 0.4, stagger: 0.03, ease: "none" },
            0.4
          )
          .to(
            nodes,
            { scale: 1, opacity: 1, duration: 0.3, stagger: 0.03, ease: "none" },
            0.5
          );
      });

      // Mobile: both cards fully visible — no blank RAG waiting on scroll
      mm.add("(max-width: 767px)", () => {
        gsap.set(rag, { opacity: 1, filter: "none", scale: 1 });
        words.forEach((el, i) => {
          gsap.set(el, {
            opacity: 0.5 + (i % 5) * 0.1,
            filter: "blur(0.4px)",
            y: 0,
          });
        });
        gsap.set(ast, { opacity: 1, filter: "blur(0px)" });
        gsap.set(edges, { strokeDasharray: "none", strokeDashoffset: 0 });
        gsap.set(nodes, { scale: 1, opacity: 1 });
        gsap.set(guessRef.current, { opacity: 0.55 });
        gsap.set(proveRef.current, { opacity: 1 });
        gsap.set(arrowRef.current, { opacity: 1, scale: 1 });
      });

      const t = window.setTimeout(() => ScrollTrigger.refresh(), 250);
      return () => {
        window.clearTimeout(t);
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="paradigm" className="home-hero relative overflow-hidden bg-[#F3F3F4]">
      <div
        ref={stageRef}
        className="relative flex min-h-0 flex-col justify-center px-5 py-12 sm:px-6 md:min-h-[78svh] md:px-10 md:py-16"
      >
        <div className="home-hero-grain pointer-events-none absolute inset-0 opacity-[0.28]" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-[1100px]">
          <RevealHeading
            as="h2"
            className="max-w-[820px] text-[clamp(2.25rem,8vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#111]"
            lines={[
              { content: "Incumbents guess." },
              { content: "We compile.", className: "home-hero-gradient-text" },
            ]}
          />

          <FadeIn delay={0.12}>
            <p className="mt-5 max-w-[620px] text-[clamp(15px,1.5vw,17px)] leading-[1.7] text-[#5F5F66] md:mt-6">
              Standard AI relies on text-based Vector RAG. If an incident spans 5 architectural hops,
              they hallucinate. Jataka ingests the exact Abstract Syntax Tree (AST) of your Salesforce
              org — we don&apos;t predict the next word; we compute the exact structural logic.
            </p>
          </FadeIn>

          <div
            ref={flipRef}
            className="mt-8 flex items-center justify-center gap-3 text-[13px] font-semibold tracking-[0.18em] uppercase md:mt-12"
          >
            <span ref={guessRef} className="text-[#9A9AA3]">
              Guess
            </span>
            <span ref={arrowRef} className="text-[#2563EB]">
              →
            </span>
            <span ref={proveRef} className="home-hero-gradient-text">
              Prove
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:mt-8 md:grid-cols-2 md:gap-5">
            {/* RAG — dissolves */}
            <div
              ref={ragRef}
              className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[22px] border border-[#111]/08 bg-white p-5 shadow-[0_18px_50px_rgba(17,17,17,0.05)] will-change-transform sm:min-h-[260px] md:min-h-[340px] md:p-6"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(148,163,184,0.15),transparent_65%)]" />
              <div className="relative flex flex-wrap content-center justify-center gap-x-2.5 gap-y-2 px-1 pb-6">
                {RAG_WORDS.map((word, i) => (
                  <span
                    key={word}
                    data-rag-word
                    className="font-mono text-[12px] tracking-wide text-[#6B7280] md:text-[13px]"
                    style={{
                      opacity: 0.45 + (i % 5) * 0.1,
                      transform: `rotate(${(i % 7) - 3}deg) scale(${0.85 + (i % 4) * 0.08})`,
                      filter: "blur(0.6px)",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-3 left-3 rounded-full bg-[#F3F3F4] px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-[#9A9AA3] uppercase md:bottom-4 md:left-4">
                Vector RAG · probabilistic
              </div>
            </div>

            {/* AST — compiles */}
            <div
              ref={astRef}
              className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[22px] border border-[#111]/08 bg-white p-3 shadow-[0_18px_50px_rgba(17,17,17,0.05)] will-change-transform sm:min-h-[260px] md:min-h-[340px] md:p-4"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.1),transparent_55%)]" />
              <svg viewBox="0 0 320 260" className="relative z-[1] h-full w-full max-h-[240px] md:max-h-[300px]" aria-hidden>
                {AST_EDGES.map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    data-ast-edge
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#93C5FD"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                ))}
                {AST_NODES.map((n, i) => (
                  <circle
                    key={i}
                    data-ast-node
                    cx={n.x}
                    cy={n.y}
                    r={n.r}
                    fill={n.fill}
                  />
                ))}
              </svg>
              <div className="absolute bottom-4 left-4 rounded-full bg-[#EFF6FF] px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-[#2563EB] uppercase">
                AST graph · deterministic
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
