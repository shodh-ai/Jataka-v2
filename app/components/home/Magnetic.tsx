"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const spring = { stiffness: 220, damping: 22, mass: 0.4 };

export default function Magnetic({
  children,
  className = "",
  strength = 0.35,
  radius = 20,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const padded =
        e.clientX >= rect.left - radius &&
        e.clientX <= rect.right + radius &&
        e.clientY >= rect.top - radius &&
        e.clientY <= rect.bottom + radius;

      if (padded) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [radius, strength, x, y]);

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
