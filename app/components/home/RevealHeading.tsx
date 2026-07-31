"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export type RevealLine = {
  content: ReactNode;
  className?: string;
};

type RevealHeadingProps = {
  as?: "h1" | "h2" | "h3";
  lines: RevealLine[];
  className?: string;
  /** "mount" for hero load-in; "view" for scroll sections */
  mode?: "mount" | "view";
  delay?: number;
  stagger?: number;
  duration?: number;
  align?: "left" | "center";
};

export function RevealHeading({
  as: Tag = "h2",
  lines,
  className = "",
  mode = "view",
  delay = 0.08,
  stagger = 0.12,
  duration = 0.95,
  align = "left",
}: RevealHeadingProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [scrollVisible, setScrollVisible] = useState(false);
  const [mountReady, setMountReady] = useState(false);

  // Hero: wait one frame so initial y:110% paints, then animate up
  useEffect(() => {
    if (mode !== "mount") return;
    if (reduceMotion) {
      setMountReady(true);
      return;
    }
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setMountReady(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [mode, reduceMotion]);

  // Scroll sections: Lenis / IO backup so text never stays stuck
  useEffect(() => {
    if (mode === "mount" || reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 40) {
        setScrollVisible(true);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    const t = window.setTimeout(check, 120);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.clearTimeout(t);
    };
  }, [mode, reduceMotion]);

  const show =
    !!reduceMotion ||
    (mode === "mount" ? mountReady : inView || scrollVisible);

  return (
    <Tag
      ref={ref}
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {lines.map((line, index) => (
        <span
          key={index}
          className={`block overflow-hidden py-[0.06em] pr-[0.04em] ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          <motion.span
            className={`inline-block will-change-transform ${line.className ?? ""}`}
            initial={reduceMotion ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            animate={show ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : duration,
              delay: reduceMotion || !show ? 0 : delay + index * stagger,
              ease,
            }}
          >
            {line.content}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
