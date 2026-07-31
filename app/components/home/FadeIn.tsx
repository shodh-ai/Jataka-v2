"use client";

import { motion, type MotionProps } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function FadeIn({
  children,
  className,
  delay = 0,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
